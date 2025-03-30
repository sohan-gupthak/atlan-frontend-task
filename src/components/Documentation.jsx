import React from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, Alert } from 'react-bootstrap';
import { FaCode, FaTable, FaHistory, FaSearch, FaClipboard, FaBell, FaDatabase } from 'react-icons/fa';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Documentation = () => {
	return (
		<Container fluid className="documentation-container py-4">
			<Row className="mb-4">
				<Col>
					<h1 className="mb-4">SQL Query Runner Documentation</h1>
					<Alert variant="info">
						This documentation provides a comprehensive guide to using the SQL Query Runner application.
					</Alert>
				</Col>
			</Row>

			<Row className="mb-4">
				<Col>
					<Card className="mb-4">
						<Card.Header as="h2">Getting Started</Card.Header>
						<Card.Body>
							<p>
								SQL Query Runner is a DataGrip-like web application designed for data analysts to write,
								execute, and analyze SQL queries. The application provides a modern, user-friendly
								interface with features that enhance productivity and improve the query workflow.
							</p>
							<h4>Application Layout</h4>
							<p>The application is divided into several key sections:</p>
							<ListGroup variant="flush" className="mb-3">
								<ListGroup.Item>
									<strong>
										<FaDatabase className="me-2" />
										Sidebar:
									</strong>{' '}
									Navigate between tables, view query history, and access saved queries
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>
										<FaCode className="me-2" />
										Query Editor:
									</strong>{' '}
									Write and execute SQL queries with syntax highlighting
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>
										<FaTable className="me-2" />
										Results Table:
									</strong>{' '}
									View query results with sorting, filtering, and pagination
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row className="mb-4">
				<Col>
					<Card className="mb-4">
						<Card.Header as="h2">Features</Card.Header>
						<Card.Body>
							<h4 className="mb-3">
								SQL Query Editor <Badge bg="primary">Core Feature</Badge>
							</h4>
							<p>
								The SQL Query Editor is powered by Ace Editor, providing a feature-rich environment for
								writing SQL queries.
							</p>
							<ListGroup variant="flush" className="mb-4">
								<ListGroup.Item>Syntax highlighting for SQL</ListGroup.Item>
								<ListGroup.Item>Auto-completion for SQL keywords</ListGroup.Item>
								<ListGroup.Item>
									Execute queries with the Run button or keyboard shortcuts
								</ListGroup.Item>
								<ListGroup.Item>Resize the editor to your preference</ListGroup.Item>
							</ListGroup>

							<h4 className="mb-3">
								Results Table <Badge bg="primary">Core Feature</Badge>
							</h4>
							<p>The Results Table displays the output of your queries in a clean, organized format.</p>
							<ListGroup variant="flush" className="mb-4">
								<ListGroup.Item>Sort columns by clicking on column headers</ListGroup.Item>
								<ListGroup.Item>Filter results with the global search box</ListGroup.Item>
								<ListGroup.Item>Paginate through large result sets</ListGroup.Item>
								<ListGroup.Item>View execution time and row count metrics</ListGroup.Item>
							</ListGroup>

							<h4 className="mb-3">
								Table Navigation <Badge bg="success">Sidebar</Badge>
							</h4>
							<p>
								The Tables section in the sidebar allows you to browse and select tables from the
								database.
							</p>
							<ListGroup variant="flush" className="mb-4">
								<ListGroup.Item>Click on a table name to load its data</ListGroup.Item>
								<ListGroup.Item>View table structure with the DDL viewer</ListGroup.Item>
								<ListGroup.Item>Copy DDL statements to the clipboard</ListGroup.Item>
							</ListGroup>

							<h4 className="mb-3">
								Query History <Badge bg="success">Sidebar</Badge>
							</h4>
							<p>The Query History section keeps track of your previously executed queries.</p>
							<ListGroup variant="flush" className="mb-4">
								<ListGroup.Item>View timestamps for each executed query</ListGroup.Item>
								<ListGroup.Item>
									Click on a history item to load the query into the editor
								</ListGroup.Item>
								<ListGroup.Item>History is maintained during your session</ListGroup.Item>
							</ListGroup>

							<h4 className="mb-3">
								Predefined Queries <Badge bg="info">Productivity</Badge>
							</h4>
							<p>The application comes with a set of predefined queries to help you get started.</p>
							<ListGroup variant="flush" className="mb-4">
								<ListGroup.Item>Select from common query templates</ListGroup.Item>
								<ListGroup.Item>Load predefined queries with a single click</ListGroup.Item>
								<ListGroup.Item>Modify predefined queries to suit your needs</ListGroup.Item>
							</ListGroup>

							<h4 className="mb-3">
								Toast Notifications <Badge bg="info">UX</Badge>
							</h4>
							<p>
								Toast notifications provide feedback for user actions, such as copying DDL to the
								clipboard.
							</p>
							<ListGroup variant="flush" className="mb-4">
								<ListGroup.Item>Visual confirmation of successful actions</ListGroup.Item>
								<ListGroup.Item>Error notifications when actions fail</ListGroup.Item>
								<ListGroup.Item>Automatically dismiss after a short period</ListGroup.Item>
							</ListGroup>

							<h4 className="mb-3">
								Download Options <Badge bg="info">Export</Badge>
							</h4>
							<p>
								The application allows you to download query results and SQL queries for offline use or sharing.
							</p>
							<ListGroup variant="flush" className="mb-4">
								<ListGroup.Item><FaTable className="me-2" />Export query results as CSV files</ListGroup.Item>
								<ListGroup.Item><FaCode className="me-2" />Download SQL queries as .sql files</ListGroup.Item>
								<ListGroup.Item>One-click download without additional configuration</ListGroup.Item>
								<ListGroup.Item>Maintain data integrity during export</ListGroup.Item>
							</ListGroup>

							<h4 className="mb-3">
								Query Formatter <Badge bg="info">Productivity</Badge>
							</h4>
							<p>
								The SQL Query Formatter helps you maintain clean, consistent SQL code.
							</p>
							<ListGroup variant="flush" className="mb-4">
								<ListGroup.Item>Format messy SQL queries with a single click</ListGroup.Item>
								<ListGroup.Item>Consistent indentation and keyword capitalization</ListGroup.Item>
								<ListGroup.Item>Improved readability for complex queries</ListGroup.Item>
								<ListGroup.Item>Customizable formatting options</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row className="mb-4">
				<Col>
					<Card className="mb-4">
						<Card.Header as="h2">Workflow Examples</Card.Header>
						<Card.Body>
							<h4 className="mb-3">Basic Query Workflow</h4>
							<ol>
								<li>Select a table from the sidebar or write a custom query in the editor</li>
								<li>Click the "Run" button or press Ctrl+Enter to execute the query</li>
								<li>View the results in the Results Table</li>
								<li>Sort, filter, or paginate through the results as needed</li>
							</ol>

							<h4 className="mb-3">Working with Table DDL</h4>
							<ol>
								<li>Navigate to the Tables section in the sidebar</li>
								<li>Click the "View DDL" icon next to a table name</li>
								<li>Review the DDL statement in the modal</li>
								<li>Click "Copy to Clipboard" to copy the DDL</li>
								<li>A toast notification will confirm the successful copy</li>
							</ol>

							<h4 className="mb-3">Example Queries</h4>
							<p>Here are some example queries you can try:</p>

							<h5>Basic SELECT Query</h5>
							<SyntaxHighlighter language="sql" style={docco}>
								{`SELECT * FROM products;`}
							</SyntaxHighlighter>

							<h5>JOIN Query</h5>
							<SyntaxHighlighter language="sql" style={docco}>
								{`SELECT o.OrderID, o.OrderDate, p.ProductName, s.CompanyName as Supplier
FROM orders o
JOIN products p ON o.ProductID = p.ProductID
JOIN suppliers s ON p.SupplierID = s.SupplierID
LIMIT 10;`}
							</SyntaxHighlighter>

							<h5>Aggregation Query</h5>
							<SyntaxHighlighter language="sql" style={docco}>
								{`SELECT s.CompanyName, COUNT(p.ProductID) as ProductCount, AVG(p.UnitPrice) as AvgPrice
FROM products p
JOIN suppliers s ON p.SupplierID = s.SupplierID
GROUP BY s.CompanyName
ORDER BY ProductCount DESC;`}
							</SyntaxHighlighter>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row className="mb-4">
				<Col>
					<Card>
						<Card.Header as="h2">System Architecture</Card.Header>
						<Card.Body>
							<h4 className="mb-3">Component Overview</h4>
							<p>
								The application follows a component-based architecture with React, using a centralized
								state management approach in the App component.
							</p>
							<ListGroup variant="flush" className="mb-4">
								<ListGroup.Item>
									<strong>App (App.jsx):</strong> Main container component that manages application
									state and data flow
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>QueryEditor (QueryEditor.jsx):</strong> Handles SQL input, query execution,
									and provides syntax highlighting
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>ResultsTable (ResultsTable.jsx):</strong> Displays query results with
									sorting, pagination, and search capabilities
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Sidebar (Sidebar.jsx):</strong> Provides navigation between tables, query
									history, and saved queries
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Navbar (Navbar.jsx):</strong> Application header with branding and
									navigation links
								</ListGroup.Item>
							</ListGroup>

							<h4 className="mb-3">Data Flow</h4>
							<ol>
								<li>User selects a table or enters a custom SQL query</li>
								<li>The App component processes the query and loads the appropriate data</li>
								<li>Data is parsed from CSV files using PapaParse</li>
								<li>Processed data is passed to the ResultsTable component for display</li>
								<li>Query history is updated and displayed in the Sidebar</li>
							</ol>

							<h4 className="mb-3">Database Schema</h4>
							<p>
								The application works with a relational database schema consisting of the following
								tables:
							</p>
							<ListGroup variant="flush" className="mb-4">
								<ListGroup.Item>
									<strong>Products:</strong> Product information including name, price, and stock
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Orders:</strong> Order details including customer, date, and shipping
									information
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Suppliers:</strong> Supplier information including company name and contact
									details
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Shippers:</strong> Shipping company information
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Regions:</strong> Geographic region information
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Territories:</strong> Territory information linked to regions
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Documentation;
