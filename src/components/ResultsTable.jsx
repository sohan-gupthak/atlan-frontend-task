import React, { useMemo, useState } from 'react';
import { Card, Table, Spinner, Badge, Pagination, Form, InputGroup } from 'react-bootstrap';
import { FaDownload, FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import Papa from 'papaparse';

const ResultsTable = ({ data, columns, isLoading, executionTime }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtering the data based on search item
  const filteredData = useMemo(() => {
    if (!data || !searchTerm.trim()) return data || [];
    
    return data.filter(row => {
      return Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
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
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);
  
  const totalPages = Math.ceil((sortedData?.length || 0) / pageSize);
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const paginationItems = [];
  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const endPage = Math.min(startPage + 4, totalPages);
  
  for (let i = startPage; i <= endPage; i++) {
    paginationItems.push(
      <Pagination.Item 
        key={i} 
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
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
  }

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
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
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
        <div className="d-flex align-items-center">
          <InputGroup size="sm" className="me-2" style={{ width: '200px' }}>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search results..."
            />
          </InputGroup>
          <Form.Select
            size="sm"
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing page size
            }}
            style={{ width: '100px' }}
            className="me-2"
          >
            {[10, 25, 50, 100].map(size => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </Form.Select>
          <FaDownload 
            className="text-primary" 
            style={{ cursor: 'pointer' }} 
            title="Export Results" 
            onClick={() => handleExportCSV()}
          />
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="table-responsive">
          <Table striped bordered hover className="mb-0">
            <thead>
              <tr>
                {columns.map(column => (
                  <th 
                    key={column} 
                    onClick={() => handleSort(column)}
                    style={{ cursor: 'pointer' }}
                  >
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
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map(column => (
                    <td key={`${rowIndex}-${column}`}>
                      {row[column] !== null && row[column] !== undefined ? row[column] : 'NULL'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            Showing {paginatedData.length} of {sortedData.length} results
          </div>
          <Pagination className="mb-0">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {paginationItems}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ResultsTable;
