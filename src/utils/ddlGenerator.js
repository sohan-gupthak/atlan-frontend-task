// Defining the table structures to generate DDL
const tableStructures = {
  products: [
    { name: 'product_id', type: 'INTEGER', constraints: 'PRIMARY KEY' },
    { name: 'product_name', type: 'VARCHAR(100)', constraints: 'NOT NULL' },
    { name: 'supplier_id', type: 'INTEGER', constraints: 'REFERENCES suppliers(supplier_id)' },
    { name: 'category_id', type: 'INTEGER', constraints: 'REFERENCES categories(category_id)' },
    { name: 'quantity_per_unit', type: 'VARCHAR(50)', constraints: '' },
    { name: 'unit_price', type: 'DECIMAL(10,2)', constraints: '' },
    { name: 'units_in_stock', type: 'INTEGER', constraints: 'DEFAULT 0' },
    { name: 'units_on_order', type: 'INTEGER', constraints: 'DEFAULT 0' },
    { name: 'reorder_level', type: 'INTEGER', constraints: 'DEFAULT 0' },
    { name: 'discontinued', type: 'BOOLEAN', constraints: 'DEFAULT FALSE' }
  ],
  orders: [
    { name: 'order_id', type: 'INTEGER', constraints: 'PRIMARY KEY' },
    { name: 'customer_id', type: 'VARCHAR(10)', constraints: 'REFERENCES customers(customer_id)' },
    { name: 'employee_id', type: 'INTEGER', constraints: 'REFERENCES employees(employee_id)' },
    { name: 'order_date', type: 'DATE', constraints: 'NOT NULL' },
    { name: 'required_date', type: 'DATE', constraints: '' },
    { name: 'shipped_date', type: 'DATE', constraints: '' },
    { name: 'ship_via', type: 'INTEGER', constraints: 'REFERENCES shippers(shipper_id)' },
    { name: 'freight', type: 'DECIMAL(10,2)', constraints: 'DEFAULT 0' },
    { name: 'ship_name', type: 'VARCHAR(100)', constraints: '' },
    { name: 'ship_address', type: 'VARCHAR(100)', constraints: '' },
    { name: 'ship_city', type: 'VARCHAR(50)', constraints: '' },
    { name: 'ship_region', type: 'VARCHAR(50)', constraints: '' },
    { name: 'ship_postal_code', type: 'VARCHAR(20)', constraints: '' },
    { name: 'ship_country', type: 'VARCHAR(50)', constraints: '' }
  ],
  suppliers: [
    { name: 'supplier_id', type: 'INTEGER', constraints: 'PRIMARY KEY' },
    { name: 'company_name', type: 'VARCHAR(100)', constraints: 'NOT NULL' },
    { name: 'contact_name', type: 'VARCHAR(100)', constraints: '' },
    { name: 'contact_title', type: 'VARCHAR(50)', constraints: '' },
    { name: 'address', type: 'VARCHAR(100)', constraints: '' },
    { name: 'city', type: 'VARCHAR(50)', constraints: '' },
    { name: 'region', type: 'VARCHAR(50)', constraints: '' },
    { name: 'postal_code', type: 'VARCHAR(20)', constraints: '' },
    { name: 'country', type: 'VARCHAR(50)', constraints: '' },
    { name: 'phone', type: 'VARCHAR(20)', constraints: '' },
    { name: 'fax', type: 'VARCHAR(20)', constraints: '' },
    { name: 'homepage', type: 'TEXT', constraints: '' }
  ],
  shippers: [
    { name: 'shipper_id', type: 'INTEGER', constraints: 'PRIMARY KEY' },
    { name: 'company_name', type: 'VARCHAR(100)', constraints: 'NOT NULL' },
    { name: 'phone', type: 'VARCHAR(20)', constraints: '' }
  ],
  regions: [
    { name: 'region_id', type: 'INTEGER', constraints: 'PRIMARY KEY' },
    { name: 'region_description', type: 'VARCHAR(100)', constraints: 'NOT NULL' }
  ],
  territories: [
    { name: 'territory_id', type: 'VARCHAR(20)', constraints: 'PRIMARY KEY' },
    { name: 'territory_description', type: 'VARCHAR(100)', constraints: 'NOT NULL' },
    { name: 'region_id', type: 'INTEGER', constraints: 'REFERENCES regions(region_id)' }
  ],
  categories: [
    { name: 'category_id', type: 'INTEGER', constraints: 'PRIMARY KEY' },
    { name: 'category_name', type: 'VARCHAR(50)', constraints: 'NOT NULL' },
    { name: 'description', type: 'TEXT', constraints: '' },
    { name: 'picture', type: 'BLOB', constraints: '' }
  ],
  customers: [
    { name: 'customer_id', type: 'VARCHAR(10)', constraints: 'PRIMARY KEY' },
    { name: 'company_name', type: 'VARCHAR(100)', constraints: 'NOT NULL' },
    { name: 'contact_name', type: 'VARCHAR(100)', constraints: '' },
    { name: 'contact_title', type: 'VARCHAR(50)', constraints: '' },
    { name: 'address', type: 'VARCHAR(100)', constraints: '' },
    { name: 'city', type: 'VARCHAR(50)', constraints: '' },
    { name: 'region', type: 'VARCHAR(50)', constraints: '' },
    { name: 'postal_code', type: 'VARCHAR(20)', constraints: '' },
    { name: 'country', type: 'VARCHAR(50)', constraints: '' },
    { name: 'phone', type: 'VARCHAR(20)', constraints: '' },
    { name: 'fax', type: 'VARCHAR(20)', constraints: '' }
  ],
  employees: [
    { name: 'employee_id', type: 'INTEGER', constraints: 'PRIMARY KEY' },
    { name: 'last_name', type: 'VARCHAR(50)', constraints: 'NOT NULL' },
    { name: 'first_name', type: 'VARCHAR(50)', constraints: 'NOT NULL' },
    { name: 'title', type: 'VARCHAR(50)', constraints: '' },
    { name: 'title_of_courtesy', type: 'VARCHAR(20)', constraints: '' },
    { name: 'birth_date', type: 'DATE', constraints: '' },
    { name: 'hire_date', type: 'DATE', constraints: '' },
    { name: 'address', type: 'VARCHAR(100)', constraints: '' },
    { name: 'city', type: 'VARCHAR(50)', constraints: '' },
    { name: 'region', type: 'VARCHAR(50)', constraints: '' },
    { name: 'postal_code', type: 'VARCHAR(20)', constraints: '' },
    { name: 'country', type: 'VARCHAR(50)', constraints: '' },
    { name: 'home_phone', type: 'VARCHAR(20)', constraints: '' },
    { name: 'extension', type: 'VARCHAR(10)', constraints: '' },
    { name: 'notes', type: 'TEXT', constraints: '' },
    { name: 'reports_to', type: 'INTEGER', constraints: 'REFERENCES employees(employee_id)' }
  ],
  order_details: [
    { name: 'order_id', type: 'INTEGER', constraints: 'PRIMARY KEY REFERENCES orders(order_id)' },
    { name: 'product_id', type: 'INTEGER', constraints: 'PRIMARY KEY REFERENCES products(product_id)' },
    { name: 'unit_price', type: 'DECIMAL(10,2)', constraints: 'NOT NULL' },
    { name: 'quantity', type: 'INTEGER', constraints: 'NOT NULL DEFAULT 1' },
    { name: 'discount', type: 'DECIMAL(4,2)', constraints: 'NOT NULL DEFAULT 0' }
  ],
  employee_territories: [
    { name: 'employee_id', type: 'INTEGER', constraints: 'PRIMARY KEY REFERENCES employees(employee_id)' },
    { name: 'territory_id', type: 'VARCHAR(20)', constraints: 'PRIMARY KEY REFERENCES territories(territory_id)' }
  ]
};

export const generateTableDDL = (tableName) => {
  const tableStructure = tableStructures[tableName.toLowerCase()];
  
  if (!tableStructure) {
    return `-- No DDL available for table: ${tableName}`;
  }
  
  const columnDefinitions = tableStructure.map(column => {
    return `  ${column.name} ${column.type}${column.constraints ? ' ' + column.constraints : ''}`;
  }).join(',\n');
  
  return `CREATE TABLE ${tableName} (\n${columnDefinitions}\n);`;
};


export const generateSampleInserts = (tableName) => {
  const tableStructure = tableStructures[tableName.toLowerCase()];
  
  if (!tableStructure) {
    return '';
  }
  
  const columnNames = tableStructure.map(col => col.name).join(', ');
  
  let inserts = '';
  for (let i = 1; i <= 3; i++) {
    const values = tableStructure.map(col => {
      if (col.type.includes('VARCHAR') || col.type.includes('TEXT')) {
        return `'Sample ${col.name} ${i}'`;
      } else if (col.type.includes('INTEGER')) {
        return i;
      } else if (col.type.includes('DECIMAL')) {
        return (i * 10.5).toFixed(2);
      } else if (col.type.includes('DATE')) {
        return `'2023-0${i}-01'`;
      } else if (col.type.includes('BOOLEAN')) {
        return 'FALSE';
      }
      return 'NULL';
    }).join(', ');
    
    inserts += `INSERT INTO ${tableName} (${columnNames}) VALUES (${values});\n`;
  }
  
  return inserts;
};

export const generateCompleteDDL = (tableName) => {
  const createTable = generateTableDDL(tableName);
  const sampleInserts = generateSampleInserts(tableName);
  
  return `${createTable}\n\n-- Sample data\n${sampleInserts}`;
};
