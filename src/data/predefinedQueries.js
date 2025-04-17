export const predefinedQueries = [
  {
    name: "All Amazon Reviews",
    query: "SELECT * FROM amazon",
    tableName: "amazon"
  },
  {
    name: "All Products",
    query: "SELECT * FROM products",
    tableName: "products"
  },
  {
    name: "All Orders",
    query: "SELECT * FROM orders",
    tableName: "orders"
  },
  {
    name: "All Suppliers",
    query: "SELECT * FROM suppliers",
    tableName: "suppliers"
  },
  {
    name: "All Shippers",
    query: "SELECT * FROM shippers",
    tableName: "shippers"
  },
  {
    name: "All Regions",
    query: "SELECT * FROM regions",
    tableName: "regions"
  },
  {
    name: "All Territories",
    query: "SELECT * FROM territories",
    tableName: "territories"
  },
  {
    name: "All Categories",
    query: "SELECT * FROM categories",
    tableName: "categories"
  },
  {
    name: "All Customers",
    query: "SELECT * FROM customers",
    tableName: "customers"
  },
  {
    name: "All Employees",
    query: "SELECT * FROM employees",
    tableName: "employees"
  },
  {
    name: "All Order Details",
    query: "SELECT * FROM order_details",
    tableName: "order_details"
  },
  {
    name: "All Employee Territories",
    query: "SELECT * FROM employee_territories",
    tableName: "employee_territories"
  },
  {
    name: "Products with low stock",
    query: "SELECT productID, productName, unitsInStock, reorderLevel FROM products WHERE unitsInStock < reorderLevel",
    tableName: "products"
  },
  {
    name: "Orders by country",
    query: "SELECT shipCountry, COUNT(*) as orderCount FROM orders GROUP BY shipCountry ORDER BY orderCount DESC",
    tableName: "orders"
  },
  {
    name: "Suppliers by country",
    query: "SELECT country, COUNT(*) as supplierCount FROM suppliers GROUP BY country ORDER BY supplierCount DESC",
    tableName: "suppliers"
  },
  {
    name: "Products by category",
    query: "SELECT categoryID, COUNT(*) as productCount FROM products GROUP BY categoryID ORDER BY productCount DESC",
    tableName: "products"
  },
  {
    name: "Employees by region",
    query: "SELECT region, COUNT(*) as employeeCount FROM employees GROUP BY region ORDER BY employeeCount DESC",
    tableName: "employees"
  },
  {
    name: "Order details by product",
    query: "SELECT productID, SUM(quantity) as totalQuantity FROM order_details GROUP BY productID ORDER BY totalQuantity DESC",
    tableName: "order_details"
  }
];
