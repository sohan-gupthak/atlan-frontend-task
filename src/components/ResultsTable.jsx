import React, { useMemo, useState } from 'react';
import { Card, Table, Spinner, Badge, Pagination, Form, InputGroup, Button } from 'react-bootstrap';
import { FaDownload, FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import Papa from 'papaparse';
import VirtualList from 'rc-virtual-list';

const ResultsTable = ({ data, columns, isLoading, executionTime, pagination, onPageChange }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [sortField, setSortField] = useState(null);
	const [sortDirection, setSortDirection] = useState('asc');
	const [searchTerm, setSearchTerm] = useState('');

	// Filtering the data based on search item
	const filteredData = useMemo(() => {
		if (!data || !searchTerm.trim()) return data || [];

		return data.filter((row) => {
			return Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()));
		});
	}, [data, searchTerm]);

	// Sorting data based on sort field and direction
	const sortedData = useMemo(() => {
		if (!filteredData || !sortField) return filteredData;

		return [...filteredData].sort((a, b) => {
			const aValue = a[sortField];
			const bValue = b[sortField];

			if (aValue === bValue) return 0;

			const comparison = aValue > bValue ? 1 : -1;
			return sortDirection === 'asc' ? comparison : -comparison;
		});
	}, [filteredData, sortField, sortDirection]);

	const paginatedData = useMemo(() => {
		// If server-side pagination is enabled, we're already getting the correct page of data
		if (pagination) {
			return sortedData;
		}
		// Otherwise, do client-side pagination
		const startIndex = (currentPage - 1) * pageSize;
		return sortedData.slice(startIndex, startIndex + pageSize);
	}, [sortedData, currentPage, pageSize, pagination]);

	// Use server-side pagination info if provided, otherwise calculate client-side
	const totalPages = pagination ? pagination.totalPages : Math.ceil((sortedData?.length || 0) / pageSize);

	const handleSort = (field) => {
		if (sortField === field) {
			setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortField(field);
			setSortDirection('asc');
		}
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		// If server-side pagination is enabled, notify parent component
		if (pagination && onPageChange) {
			onPageChange(pageNumber, pageSize);
		}
	};

	const paginationItems = [];
	// If we have server-side pagination, use the current page from there
	const effectiveCurrentPage = pagination ? pagination.page : currentPage;
	const effectiveTotalPages = totalPages || 1;
	const startPage = Math.max(1, Math.min(effectiveCurrentPage - 2, effectiveTotalPages - 4));
	const endPage = Math.min(startPage + 4, effectiveTotalPages);

	for (let i = startPage; i <= endPage; i++) {
		paginationItems.push(
			<Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
				{i}
			</Pagination.Item>,
		);
	}

	const handleExportCSV = () => {
		if (!data || data.length === 0) return;

		const csv = Papa.unparse(data);
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('download', `query_results_${new Date().toISOString().slice(0, 10)}.csv`);
		link.style.visibility = 'hidden';

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	if (isLoading) {
		return (
			<Card className="results-card">
				<Card.Header>Query Results</Card.Header>
				<Card.Body className="text-center py-5">
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
					<p className="mt-3">Executing query...</p>
				</Card.Body>
			</Card>
		);
	}

	if (!data || data.length === 0) {
		return (
			<Card className="results-card">
				<Card.Header>Query Results</Card.Header>
				<Card.Body className="text-center py-5">
					<p>No results to display. Execute a query to see results.</p>
				</Card.Body>
			</Card>
		);
	}

	return (
		<Card className="results-card">
			<Card.Header>
				<div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
					<div className="mb-2 mb-md-0">
						Query Results
						{executionTime !== null && (
							<Badge bg="secondary" className="ms-2">
								{typeof executionTime === 'number' ? executionTime.toFixed(2) : '0.00'}s
							</Badge>
						)}
						<Badge bg="info" className="ms-2">
							{sortedData.length} rows
						</Badge>
					</div>
					<div className="d-flex flex-column flex-sm-row align-items-sm-center">
						<InputGroup size="sm" className="me-sm-2 mb-2 mb-sm-0" style={{ maxWidth: '200px' }}>
							<InputGroup.Text>
								<FaSearch />
							</InputGroup.Text>
							<Form.Control
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search results..."
							/>
						</InputGroup>
						<Form.Select
							size="sm"
							value={pageSize}
							onChange={(e) => {
								setPageSize(Number(e.target.value));
								setCurrentPage(1); // Reset to first page when changing page size
							}}
							style={{ width: '100px' }}
							className="me-sm-2 mb-2 mb-sm-0"
						>
							{[10, 25, 50, 100].map((size) => (
								<option key={size} value={size}>
									Show {size}
								</option>
							))}
						</Form.Select>
						<Button variant="outline-secondary" size="sm" onClick={handleExportCSV}>
							<FaDownload className="me-1" /> Export
						</Button>
					</div>
				</div>
			</Card.Header>
			<Card.Body className="p-0">
				<div className="table-responsive">
					<Table striped bordered hover className="mb-0">
						<thead>
							<tr>
								{columns.map((column) => (
									<th key={column} onClick={() => handleSort(column)} style={{ cursor: 'pointer' }}>
										<div className="d-flex align-items-center">
											{column}
											{sortField === column && (
												<span className="ms-1">
													{sortDirection === 'desc' ? (
														<FaSortAmountDown size={12} />
													) : (
														<FaSortAmountUp size={12} />
													)}
												</span>
											)}
										</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{(Array.isArray(paginatedData) && paginatedData.length > 500) ? (
								<VirtualList
									data={paginatedData}
									height={500}
									itemHeight={40}
									itemKey={(row, idx) => idx}
								>
									{(row, rowIndex) => (
										<tr key={rowIndex}>
											{columns.map((column) => (
												<td key={`${rowIndex}-${column}`}>
													{row[column] !== null && row[column] !== undefined ? row[column] : 'NULL'}
												</td>
											))}
										</tr>
									)}
								</VirtualList>
							) : (
								paginatedData.map((row, rowIndex) => (
									<tr key={rowIndex}>
										{columns.map((column) => (
											<td key={`${rowIndex}-${column}`}>
												{row[column] !== null && row[column] !== undefined ? row[column] : 'NULL'}
											</td>
										))}
									</tr>
								))
							)}
						</tbody>
					</Table>
				</div>
			</Card.Body>
			<Card.Footer>
				<div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
					<div className="mb-2 mb-md-0 text-center text-md-start">
						{pagination
							? `Showing ${paginatedData.length} of ${pagination.totalRows} results (page ${pagination.page} of ${pagination.totalPages})`
							: `Showing ${paginatedData.length} of ${sortedData.length} results`}
					</div>
					<Pagination className="mb-0 justify-content-center justify-content-md-end flex-wrap">
						<Pagination.First onClick={() => handlePageChange(1)} disabled={effectiveCurrentPage === 1} />
						<Pagination.Prev
							onClick={() => handlePageChange(effectiveCurrentPage - 1)}
							disabled={effectiveCurrentPage === 1}
						/>
						{paginationItems}
						<Pagination.Next
							onClick={() => handlePageChange(effectiveCurrentPage + 1)}
							disabled={effectiveCurrentPage === effectiveTotalPages}
						/>
						<Pagination.Last
							onClick={() => handlePageChange(effectiveTotalPages)}
							disabled={effectiveCurrentPage === effectiveTotalPages}
						/>
					</Pagination>
				</div>
			</Card.Footer>
		</Card>
	);
};

export default ResultsTable;
