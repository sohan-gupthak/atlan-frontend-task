# SQL Query Runner - Atlan Frontend Task

A DataGrip-like web-based application capable of running SQL queries and displaying the results, created for the Atlan Frontend Internship Task 2025. The application provides a modern, user-friendly interface for data analysts to work with SQL queries efficiently.

## Features

- **SQL Query Editor**: A powerful code editor with syntax highlighting and auto-completion for writing SQL queries
- **Multiple Predefined Queries**: Choose from a set of predefined queries with a single click
- **Table Navigation**: Browse through different tables in the database via an intuitive sidebar
- **Query History**: View and reuse previously executed queries with execution timestamps
- **Results Display**: View query results in a paginated, sortable, and filterable table
- **Performance Metrics**: See query execution time and row count for performance analysis
- **Search and Filter**: Filter query results with a global search functionality
- **Table DDL Viewer**: View and copy the DDL (Data Definition Language) for any table
- **Toast Notifications**: Receive feedback for actions like copying DDL to clipboard
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- **React 19**: Latest version of the React library for building user interfaces
- **Vite 6**: Next-generation frontend tooling for fast development
- **React Bootstrap 2**: UI component library for consistent design
- **React Ace 14**: Feature-rich code editor for SQL queries with syntax highlighting
- **Ace Builds**: Core editor functionality for React Ace
- **PapaParse 5**: CSV parsing library for handling data files
- **@tanstack/react-table 8**: Modern table component for displaying query results
- **React Icons 5**: Comprehensive icon library for UI elements
- **React Syntax Highlighter 15**: Code syntax highlighting for DDL statements
- **React Toastify 11**: Toast notification system for user feedback

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/atlan-frontend-task.git
   cd atlan-frontend-task
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── public/           # Public assets and CSV data files
├── src/              # Source code
│   ├── components/   # React components
│   │   ├── Navbar.jsx           # Application navigation bar
│   │   ├── QueryEditor.jsx      # SQL editor with execution controls
│   │   ├── ResultsTable.jsx     # Data display with sorting and pagination
│   │   └── Sidebar.jsx          # Navigation and table selection
│   ├── data/         # Predefined queries and mock data
│   │   └── predefinedQueries.js # Collection of sample SQL queries
│   ├── utils/        # Utility functions
│   │   ├── csvParser.js         # Functions for parsing CSV data
│   │   └── ddlGenerator.js      # Functions for generating table DDL
│   ├── App.jsx       # Main application component and state management
│   ├── App.css       # Application-wide styles
│   ├── theme.css     # Theme variables and customizations
│   ├── main.jsx      # Entry point
│   └── index.css     # Base styles
├── index.html        # HTML template
└── package.json      # Project dependencies and scripts
```

## System Design

### Architecture

The application follows a component-based architecture with React, using a centralized state management approach in the App component. The system is designed to be modular, maintainable, and extensible.

### Key Components

1. **App (App.jsx)**: The main container component that manages application state and data flow
2. **QueryEditor**: Handles SQL input, query execution, and provides syntax highlighting
3. **ResultsTable**: Displays query results with sorting, pagination, and search capabilities
4. **Sidebar**: Provides navigation between tables, query history, and saved queries
5. **Navbar**: Application header with branding and navigation links

### Data Flow

1. User selects a table or enters a custom SQL query
2. The App component processes the query and loads the appropriate data
3. Data is parsed from CSV files using PapaParse
4. Processed data is passed to the ResultsTable component for display
5. Query history is updated and displayed in the Sidebar

### ER Diagram (Conceptual Model)

The application works with the following database schema:

```
+-------------+     +-------------+     +-------------+
|   Products  |     |    Orders   |     |  Suppliers  |
+-------------+     +-------------+     +-------------+
| ProductID   |<----| OrderID     |     | SupplierID  |
| ProductName |     | CustomerID  |     | CompanyName |
| SupplierID  |---->| EmployeeID  |     | ContactName |
| CategoryID  |     | OrderDate   |     | Address     |
| UnitPrice   |     | RequiredDate|     | City        |
| UnitsInStock|     | ShippedDate |     | Region      |
+-------------+     | ShipVia     |---->+-------------+
                    | Freight     |     
                    +-------------+     +-------------+
                                        |   Shippers  |
                    +-------------+     +-------------+
                    |   Regions   |     | ShipperID   |
                    +-------------+     | CompanyName |
                    | RegionID    |     | Phone       |
                    | RegionDesc  |     +-------------+
                    +-------------+     
                          ↑             
                    +-------------+     
                    | Territories |     
                    +-------------+     
                    | TerritoryID |     
                    | Description |     
                    | RegionID    |-----+
                    +-------------+     
```

## Design Decisions

- **DataGrip-like Interface**: The application mimics the look and feel of DataGrip, a popular database IDE used by data professionals
- **No Backend**: As per requirements, the application doesn't have a backend or query validation, focusing on frontend functionality
- **Predefined Data**: The application uses CSV files as the data source, allowing for realistic data interaction
- **User Experience**: Focus on creating a smooth experience for data analysts who would use this tool all day
- **Modern UI**: Clean, intuitive interface with consistent styling and responsive design
- **Performance Optimization**: Efficient data handling and rendering for large result sets

## Future Enhancements

- **Advanced Query Validation**: Implement real-time SQL syntax checking and error highlighting
- **Interactive Database Schema**: Visual schema explorer with relationship diagrams
- **Export Functionality**: Export query results to various formats (CSV, Excel, JSON)
- **Query Optimization Suggestions**: AI-powered recommendations for query performance
- **Collaborative Features**: Share queries and results with team members
- **Dark Mode**: Full dark mode support for reduced eye strain during extended use
- **Query Templates**: Customizable templates for common query patterns
- **Advanced Filtering**: Column-specific filters and advanced search capabilities
- **Data Visualization**: Integrated charts and graphs for query results
- **Keyboard Shortcuts**: Comprehensive keyboard shortcuts for power users

## License

MIT

