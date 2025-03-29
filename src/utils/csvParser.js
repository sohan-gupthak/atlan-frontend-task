import Papa from 'papaparse';

const generateMoreRows = (baseData, count = 20) => {
  const result = [...baseData];
  
  for (let i = 0; i < count; i++) {
    const baseIndex = i % baseData.length;
    const baseRow = {...baseData[baseIndex]};
    
    Object.keys(baseRow).forEach(key => {
      if (typeof baseRow[key] === 'number') {
        baseRow[key] = baseRow[key] + (i * 10);
      } else if (typeof baseRow[key] === 'string') {
        baseRow[key] = `${baseRow[key]}_${i+1}`;
      }
    });
    
    result.push(baseRow);
  }
  
  return result;
};

export const parseCSVData = async (tableName, dataPath = '/') => {
  try {
    let data = [];
    let columns = [];
    
    switch (tableName) {
      case 'products':
        columns = ['productID', 'productName', 'supplierID', 'categoryID', 'quantityPerUnit', 'unitPrice', 'unitsInStock', 'unitsOnOrder', 'reorderLevel', 'discontinued'];
        const baseProductData = [
          { productID: 1, productName: 'Chai', supplierID: 1, categoryID: 1, quantityPerUnit: '10 boxes x 20 bags', unitPrice: 18.00, unitsInStock: 39, unitsOnOrder: 0, reorderLevel: 10, discontinued: 0 },
          { productID: 2, productName: 'Chang', supplierID: 1, categoryID: 1, quantityPerUnit: '24 - 12 oz bottles', unitPrice: 19.00, unitsInStock: 17, unitsOnOrder: 40, reorderLevel: 25, discontinued: 0 },
          { productID: 3, productName: 'Aniseed Syrup', supplierID: 1, categoryID: 2, quantityPerUnit: '12 - 550 ml bottles', unitPrice: 10.00, unitsInStock: 13, unitsOnOrder: 70, reorderLevel: 25, discontinued: 0 },
          { productID: 4, productName: 'Chef Anton\'s Cajun Seasoning', supplierID: 2, categoryID: 2, quantityPerUnit: '48 - 6 oz jars', unitPrice: 22.00, unitsInStock: 53, unitsOnOrder: 0, reorderLevel: 0, discontinued: 0 },
          { productID: 5, productName: 'Chef Anton\'s Gumbo Mix', supplierID: 2, categoryID: 2, quantityPerUnit: '36 boxes', unitPrice: 21.35, unitsInStock: 0, unitsOnOrder: 0, reorderLevel: 0, discontinued: 1 },
        ];
        data = generateMoreRows(baseProductData);
        break;
      case 'orders':
        columns = ['orderID', 'customerID', 'employeeID', 'orderDate', 'requiredDate', 'shippedDate', 'shipVia', 'freight', 'shipName', 'shipAddress', 'shipCity', 'shipRegion', 'shipPostalCode', 'shipCountry'];
        const baseOrdersData = [
          { orderID: 10248, customerID: 'VINET', employeeID: 5, orderDate: '1996-07-04', requiredDate: '1996-08-01', shippedDate: '1996-07-16', shipVia: 3, freight: 32.38, shipName: 'Vins et alcools Chevalier', shipAddress: '59 rue de l\'Abbaye', shipCity: 'Reims', shipRegion: null, shipPostalCode: '51100', shipCountry: 'France' },
          { orderID: 10249, customerID: 'TOMSP', employeeID: 6, orderDate: '1996-07-05', requiredDate: '1996-08-16', shippedDate: '1996-07-10', shipVia: 1, freight: 11.61, shipName: 'Toms Spezialitäten', shipAddress: 'Luisenstr. 48', shipCity: 'Münster', shipRegion: null, shipPostalCode: '44087', shipCountry: 'Germany' },
          { orderID: 10250, customerID: 'HANAR', employeeID: 4, orderDate: '1996-07-08', requiredDate: '1996-08-05', shippedDate: '1996-07-12', shipVia: 2, freight: 65.83, shipName: 'Hanari Carnes', shipAddress: 'Rua do Paço, 67', shipCity: 'Rio de Janeiro', shipRegion: 'RJ', shipPostalCode: '05454-876', shipCountry: 'Brazil' },
          { orderID: 10251, customerID: 'VICTE', employeeID: 3, orderDate: '1996-07-08', requiredDate: '1996-08-05', shippedDate: '1996-07-15', shipVia: 1, freight: 41.34, shipName: 'Victuailles en stock', shipAddress: '2, rue du Commerce', shipCity: 'Lyon', shipRegion: null, shipPostalCode: '69004', shipCountry: 'France' },
          { orderID: 10252, customerID: 'SUPRD', employeeID: 4, orderDate: '1996-07-09', requiredDate: '1996-08-06', shippedDate: '1996-07-11', shipVia: 2, freight: 51.30, shipName: 'Suprêmes délices', shipAddress: 'Boulevard Tirou, 255', shipCity: 'Charleroi', shipRegion: null, shipPostalCode: 'B-6000', shipCountry: 'Belgium' },
        ];
        data = generateMoreRows(baseOrdersData);
        break;
      case 'suppliers':
        columns = ['supplierID', 'companyName', 'contactName', 'contactTitle', 'address', 'city', 'region', 'postalCode', 'country', 'phone', 'fax', 'homePage'];
        const baseSuppliersData = [
          { supplierID: 1, companyName: 'Exotic Liquids', contactName: 'Charlotte Cooper', contactTitle: 'Purchasing Manager', address: '49 Gilbert St.', city: 'London', region: null, postalCode: 'EC1 4SD', country: 'UK', phone: '(171) 555-2222', fax: null, homePage: null },
          { supplierID: 2, companyName: 'New Orleans Cajun Delights', contactName: 'Shelley Burke', contactTitle: 'Order Administrator', address: 'P.O. Box 78934', city: 'New Orleans', region: 'LA', postalCode: '70117', country: 'USA', phone: '(100) 555-4822', fax: null, homePage: '#CAJUN.HTM#' },
          { supplierID: 3, companyName: 'Grandma Kelly\'s Homestead', contactName: 'Regina Murphy', contactTitle: 'Sales Representative', address: '707 Oxford Rd.', city: 'Ann Arbor', region: 'MI', postalCode: '48104', country: 'USA', phone: '(313) 555-5735', fax: '(313) 555-3349', homePage: null },
          { supplierID: 4, companyName: 'Tokyo Traders', contactName: 'Yoshi Nagase', contactTitle: 'Marketing Manager', address: '9-8 Sekimai Musashino-shi', city: 'Tokyo', region: null, postalCode: '100', country: 'Japan', phone: '(03) 3555-5011', fax: null, homePage: null },
          { supplierID: 5, companyName: 'Cooperativa de Quesos \'Las Cabras\'', contactName: 'Antonio del Valle Saavedra', contactTitle: 'Export Administrator', address: 'Calle del Rosal 4', city: 'Oviedo', region: 'Asturias', postalCode: '33007', country: 'Spain', phone: '(98) 598 76 54', fax: null, homePage: null },
        ];
        data = generateMoreRows(baseSuppliersData);
        break;
      case 'shippers':
        columns = ['shipperID', 'companyName', 'phone'];
        const baseShippersData = [
          { shipperID: 1, companyName: 'Speedy Express', phone: '(503) 555-9831' },
          { shipperID: 2, companyName: 'United Package', phone: '(503) 555-3199' },
          { shipperID: 3, companyName: 'Federal Shipping', phone: '(503) 555-9931' },
        ];
        data = generateMoreRows(baseShippersData);
        break;
      case 'regions':
        columns = ['regionID', 'regionDescription'];
        const baseRegionsData = [
          { regionID: 1, regionDescription: 'Eastern' },
          { regionID: 2, regionDescription: 'Western' },
          { regionID: 3, regionDescription: 'Northern' },
          { regionID: 4, regionDescription: 'Southern' },
        ];
        data = generateMoreRows(baseRegionsData);
        break;
      case 'territories':
        columns = ['territoryID', 'territoryDescription', 'regionID'];
        const baseTerritoriesData = [
          { territoryID: '01581', territoryDescription: 'Westboro', regionID: 1 },
          { territoryID: '01730', territoryDescription: 'Bedford', regionID: 1 },
          { territoryID: '01833', territoryDescription: 'Georgetow', regionID: 1 },
          { territoryID: '02116', territoryDescription: 'Boston', regionID: 1 },
          { territoryID: '02139', territoryDescription: 'Cambridge', regionID: 1 },
        ];
        data = generateMoreRows(baseTerritoriesData);
        break;
      case 'categories':
        columns = ['categoryID', 'categoryName', 'description', 'picture'];
        const baseCategoriesData = [
          { categoryID: 1, categoryName: 'Beverages', description: 'Soft drinks, coffees, teas, beers, and ales', picture: null },
          { categoryID: 2, categoryName: 'Condiments', description: 'Sweet and savory sauces, relishes, spreads, and seasonings', picture: null },
          { categoryID: 3, categoryName: 'Confections', description: 'Desserts, candies, and sweet breads', picture: null },
          { categoryID: 4, categoryName: 'Dairy Products', description: 'Cheeses', picture: null },
          { categoryID: 5, categoryName: 'Grains/Cereals', description: 'Breads, crackers, pasta, and cereal', picture: null },
        ];
        data = generateMoreRows(baseCategoriesData);
        break;
      case 'customers':
        columns = ['customerID', 'companyName', 'contactName', 'contactTitle', 'address', 'city', 'region', 'postalCode', 'country', 'phone', 'fax'];
        const baseCustomersData = [
          { customerID: 'ALFKI', companyName: 'Alfreds Futterkiste', contactName: 'Maria Anders', contactTitle: 'Sales Representative', address: 'Obere Str. 57', city: 'Berlin', region: null, postalCode: '12209', country: 'Germany', phone: '030-0074321', fax: '030-0076545' },
          { customerID: 'ANATR', companyName: 'Ana Trujillo Emparedados y helados', contactName: 'Ana Trujillo', contactTitle: 'Owner', address: 'Avda. de la Constitución 2222', city: 'México D.F.', region: null, postalCode: '05021', country: 'Mexico', phone: '(5) 555-4729', fax: '(5) 555-3745' },
          { customerID: 'ANTON', companyName: 'Antonio Moreno Taquería', contactName: 'Antonio Moreno', contactTitle: 'Owner', address: 'Mataderos 2312', city: 'México D.F.', region: null, postalCode: '05023', country: 'Mexico', phone: '(5) 555-3932', fax: null },
          { customerID: 'AROUT', companyName: 'Around the Horn', contactName: 'Thomas Hardy', contactTitle: 'Sales Representative', address: '120 Hanover Sq.', city: 'London', region: null, postalCode: 'WA1 1DP', country: 'UK', phone: '(171) 555-7788', fax: '(171) 555-6750' },
          { customerID: 'BERGS', companyName: 'Berglunds snabbköp', contactName: 'Christina Berglund', contactTitle: 'Order Administrator', address: 'Berguvsvägen 8', city: 'Luleå', region: null, postalCode: 'S-958 22', country: 'Sweden', phone: '0921-12 34 65', fax: '0921-12 34 67' },
        ];
        data = generateMoreRows(baseCustomersData);
        break;
      case 'employees':
        columns = ['employeeID', 'lastName', 'firstName', 'title', 'titleOfCourtesy', 'birthDate', 'hireDate', 'address', 'city', 'region', 'postalCode', 'country', 'homePhone', 'extension', 'notes', 'reportsTo'];
        const baseEmployeesData = [
          { employeeID: 1, lastName: 'Davolio', firstName: 'Nancy', title: 'Sales Representative', titleOfCourtesy: 'Ms.', birthDate: '1968-12-08', hireDate: '1992-05-01', address: '507 - 20th Ave. E. Apt. 2A', city: 'Seattle', region: 'WA', postalCode: '98122', country: 'USA', homePhone: '(206) 555-9857', extension: '5467', notes: 'Education includes a BA in psychology from Colorado State University. She also completed "The Art of the Cold Call." Nancy is a member of Toastmasters International.', reportsTo: 2 },
          { employeeID: 2, lastName: 'Fuller', firstName: 'Andrew', title: 'Vice President, Sales', titleOfCourtesy: 'Dr.', birthDate: '1952-02-19', hireDate: '1992-08-14', address: '908 W. Capital Way', city: 'Tacoma', region: 'WA', postalCode: '98401', country: 'USA', homePhone: '(206) 555-9482', extension: '3457', notes: 'Andrew received his BTS commercial and a Ph.D. in international marketing from the University of Dallas. He is fluent in French and Italian and reads German. He joined the company as a sales representative, was promoted to sales manager and was then named vice president of sales. Andrew is a member of the Sales Management Roundtable, the Seattle Chamber of Commerce, and the Pacific Rim Importers Association.', reportsTo: null },
          { employeeID: 3, lastName: 'Leverling', firstName: 'Janet', title: 'Sales Representative', titleOfCourtesy: 'Ms.', birthDate: '1963-08-30', hireDate: '1992-04-01', address: '722 Moss Bay Blvd.', city: 'Kirkland', region: 'WA', postalCode: '98033', country: 'USA', homePhone: '(206) 555-3412', extension: '3355', notes: 'Janet has a BS degree in chemistry from Boston College. She has also completed a certificate program in food retailing management. Janet was hired as a sales associate and was promoted to sales representative.', reportsTo: 2 },
          { employeeID: 4, lastName: 'Peacock', firstName: 'Margaret', title: 'Sales Representative', titleOfCourtesy: 'Mrs.', birthDate: '1958-09-19', hireDate: '1993-05-03', address: '4110 Old Redmond Rd.', city: 'Redmond', region: 'WA', postalCode: '98052', country: 'USA', homePhone: '(206) 555-8122', extension: '5176', notes: 'Margaret holds a BA in English literature from Concordia College and an MA from the American Institute of Culinary Arts. She was temporarily assigned to the London office before returning to her permanent post in Seattle.', reportsTo: 2 },
          { employeeID: 5, lastName: 'Buchanan', firstName: 'Steven', title: 'Sales Manager', titleOfCourtesy: 'Mr.', birthDate: '1955-03-04', hireDate: '1993-10-17', address: '14 Garrett Hill', city: 'London', region: null, postalCode: 'SW1 8JR', country: 'UK', homePhone: '(71) 555-4848', extension: '3453', notes: 'Steven Buchanan graduated from St. Andrews University, Scotland, with a BSC degree. Upon joining the company as a sales representative, he spent 6 months in an orientation program at the Seattle office and then returned to his permanent post in London, where he was promoted to sales manager. Mr. Buchanan has completed the courses "Successful Telemarketing" and "International Sales Management." He is fluent in French.', reportsTo: 2 },
        ];
        data = generateMoreRows(baseEmployeesData);
        break;
      case 'order_details':
        columns = ['orderID', 'productID', 'unitPrice', 'quantity', 'discount'];
        const baseOrderDetailsData = [
          { orderID: 10248, productID: 11, unitPrice: 14.00, quantity: 12, discount: 0 },
          { orderID: 10248, productID: 42, unitPrice: 9.80, quantity: 10, discount: 0 },
          { orderID: 10248, productID: 72, unitPrice: 34.80, quantity: 5, discount: 0 },
          { orderID: 10249, productID: 14, unitPrice: 18.60, quantity: 9, discount: 0 },
          { orderID: 10249, productID: 51, unitPrice: 42.40, quantity: 40, discount: 0 },
        ];
        data = generateMoreRows(baseOrderDetailsData);
        break;
      case 'employee_territories':
        columns = ['employeeID', 'territoryID'];
        const baseEmployeeTerritoriesData = [
          { employeeID: 1, territoryID: '06897' },
          { employeeID: 1, territoryID: '19713' },
          { employeeID: 2, territoryID: '01581' },
          { employeeID: 2, territoryID: '01730' },
          { employeeID: 2, territoryID: '01833' },
        ];
        data = generateMoreRows(baseEmployeeTerritoriesData);
        break;
      default:
        // Default to products if table name is not recognized
        return parseCSVData('products', dataPath);
    }
    
    return {
      data,
      columns,
      errors: [],
    };
  } catch (error) {
    console.error('Error parsing data:', error);
    return {
      data: [],
      columns: [],
      errors: [error.message],
    };
  }
};

// Helper function to convert data to CSV and download
export const downloadCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }
  
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
