npm install express mssql

const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

// Configuration for your SQL Server
const dbConfig = {
  user: 'your_db_user',
  password: 'your_db_password',
  server: 'your_server_name', // e.g., 'localhost'
  database: 'your_db_name',
};

// Middleware to parse JSON requests
app.use(express.json());

// POST endpoint to add a new item
app.post('/api/items', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    await sql.connect(dbConfig);

    const request = new sql.Request();
    request.input('Name', sql.NVarChar, name);

    const result = await request.query('INSERT INTO items (name) VALUES (@Name)');

    console.log(`Inserted item with ID ${result.rowsAffected[0]}`);
    res.status(201).json({ message: 'Item added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    sql.close();
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



"scripts": {
    "start": "npm run start-frontend & npm run start-backend"
    "start-frontend": "cd frontend && npm start",
    "start-backend": "node server.js"
  }
  
