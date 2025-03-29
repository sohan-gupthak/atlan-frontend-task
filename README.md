# SQL Query Runner - Atlan Frontend Task

A web-based application capable of running SQL queries and displaying the results, created for the Atlan Frontend Internship Task 2025.

## Features

- **SQL Query Editor**: A code editor with syntax highlighting for writing SQL queries
- **Multiple Predefined Queries**: Choose from a set of predefined queries
- **Table Navigation**: Browse through different tables in the database
- **Query History**: View and reuse previously executed queries
- **Results Display**: View query results in a paginated, sortable table
- **Performance Metrics**: See query execution time and row count
- **Search and Filter**: Filter query results with a global search
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **React**: Frontend library for building user interfaces
- **Vite**: Next-generation frontend tooling
- **React Bootstrap**: UI component library
- **React Ace**: Code editor for SQL queries
- **PapaParse**: CSV parsing library
- **React Table**: Table component for displaying query results

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
│   ├── data/         # Predefined queries and mock data
│   ├── utils/        # Utility functions
│   ├── App.jsx       # Main application component
│   ├── main.jsx      # Entry point
│   └── *.css         # Stylesheets
├── index.html        # HTML template
└── package.json      # Project dependencies and scripts
```

## Design Decisions

- **DataGrip-like Interface**: The application mimics the look and feel of DataGrip, a popular database IDE
- **No Backend**: As per requirements, the application doesn't have a backend or query validation
- **Predefined Data**: The application uses CSV files as the data source
- **User Experience**: Focus on creating a smooth experience for data analysts who would use this tool all day

## Future Enhancements

- Add query validation and syntax highlighting
- Implement database schema visualization
- Add export functionality for query results
- Implement query saving and sharing
- Add dark mode support

## License

MIT

