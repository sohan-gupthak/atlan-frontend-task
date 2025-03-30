import { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/Sidebar';
import QueryEditor from './components/QueryEditor';
import ResultsTable from './components/ResultsTable';
import Navbar from './components/Navbar';
import Documentation from './components/Documentation';
import { Container, Row, Col } from 'react-bootstrap';
import { parseCSVData } from './utils/csvParser';
import { predefinedQueries } from './data/predefinedQueries';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const [activeTable, setActiveTable] = useState('products');
	const [tableData, setTableData] = useState([]);
	const [columns, setColumns] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentQuery, setCurrentQuery] = useState(predefinedQueries[0].query);
	const [executionTime, setExecutionTime] = useState(null);
	const [queryHistory, setQueryHistory] = useState([]);
	const [showDocs, setShowDocs] = useState(false);
	const [savedQueries, setSavedQueries] = useState(() => {
		const saved = localStorage.getItem('savedQueries');
		return saved ? JSON.parse(saved) : [];
	});

	const availableTables = [
		'products',
		'orders',
		'suppliers',
		'shippers',
		'regions',
		'territories',
		'categories',
		'customers',
		'employees',
		'order_details',
		'employee_territories',
	];

	useEffect(() => {
		// Loading the initial table data
		loadTableData('products');
	}, []);

	const loadTableData = async (tableName, customQuery = null, skipTimeCalculation = false) => {
		setIsLoading(true);
		try {
			// Start measuring execution time (only if not skipping time calculation)
			const startTime = skipTimeCalculation ? 0 : performance.now();

			const data = await parseCSVData(tableName, '/data/');
			setTableData(data.data);
			setColumns(data.columns);
			setActiveTable(tableName);

			if (!customQuery) {
				setCurrentQuery(`SELECT * FROM ${tableName}`);
			}

			if (!skipTimeCalculation) {
				const endTime = performance.now();
				const executionTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2);
				setExecutionTime(parseFloat(executionTimeInSeconds));
			}
		} catch (error) {
			console.error('Error loading table data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Update saved queries when they change in localStorage
	useEffect(() => {
		const handleStorageChange = () => {
			const saved = localStorage.getItem('savedQueries');
			if (saved) {
				setSavedQueries(JSON.parse(saved));
			}
		};

		window.addEventListener('storage', handleStorageChange);

		const interval = setInterval(() => {
			const saved = localStorage.getItem('savedQueries');
			if (saved) {
				const parsedQueries = JSON.parse(saved);
				if (JSON.stringify(parsedQueries) !== JSON.stringify(savedQueries)) {
					setSavedQueries(parsedQueries);
				}
			}
		}, 1000);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
			clearInterval(interval);
		};
	}, [savedQueries]);

	const executeQuery = (query) => {
		setIsLoading(true);

		setQueryHistory((prev) => [{ query, timestamp: new Date().toISOString() }, ...prev.slice(0, 19)]);

		setCurrentQuery(query);

		setTimeout(() => {
			// Start measuring execution time here
			const startTime = performance.now();

			try {
				// This is a simple parser that extracts the table name from the FROM clause
				const tableNameMatch = query.match(/FROM\s+([\w_]+)/i);
				let tableName = 'products'; // Default to products if no match

				// Handle different types of queries
				if (query.trim().toUpperCase().startsWith('SELECT')) {
					if (tableNameMatch && tableNameMatch[1]) {
						tableName = tableNameMatch[1].toLowerCase();
						if (!availableTables.includes(tableName)) {
							const partialMatch = availableTables.find(
								(t) => t.includes(tableName) || tableName.includes(t),
							);
							tableName = partialMatch || 'products';
						}
					} else {
						const matchingQuery = predefinedQueries.find((q) => q.query.trim() === query.trim());
						if (matchingQuery) {
							tableName = matchingQuery.tableName;
						}
					}
				} else {
					// For non-SELECT queries, just use products table
					tableName = 'products';
				}

				// Load the corresponding table data, but pass the custom query to preserve it
				loadTableData(tableName, query, true);
			} catch (error) {
				console.error('Error executing query:', error);
				loadTableData('products', query, true);
			}

			// Calculating execution time after processing the query
			const endTime = performance.now();
			const executionTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2);
			setExecutionTime(parseFloat(executionTimeInSeconds));

			setIsLoading(false);
		}, 500);
	};

	return (
		<div className="app-container">
			<Navbar onDocsClick={(show) => setShowDocs(show)} />
			<ToastContainer />
			<Container fluid className="main-content">
				{showDocs ? (
					<Documentation />
				) : (
					<Row>
					<Col md={3} className="sidebar-container">
						<Sidebar
							activeTable={activeTable}
							onTableSelect={loadTableData}
							queryHistory={queryHistory}
							predefinedQueries={predefinedQueries}
							savedQueries={savedQueries}
							onQuerySelect={(query) => setCurrentQuery(query)}
							tables={availableTables}
						/>
					</Col>
					<Col md={9} className="content-container">
						<QueryEditor query={currentQuery} onQueryChange={setCurrentQuery} onExecute={executeQuery} />
						<ResultsTable
							data={tableData}
							columns={columns}
							isLoading={isLoading}
							executionTime={executionTime}
						/>
					</Col>
				</Row>
				)}
			</Container>
		</div>
	);
}

export default App;
