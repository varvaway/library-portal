const express = require('express');
const sql = require('mssql');
const cors = require('cors'); // Импортируем cors
const app = express();
const port = 5001; // Измените порт, если нужно

// Включаем CORS
app.use(cors());

// Конфигурация подключения к SQL Server
//const config = {
//  server: 'MISS\SQLEXPRESS03', 
//  database: 'LibraryDB', 
//  options: {
//    encrypt: false, 
//    trustServerCertificate: true,
//  },
//};

const config = {
    server: 'localhost\\SQLEXPRESS03', // или '.\SQLEXPRESS03'
    database: 'LibraryDB',
    options: {
      encrypt: false,
      trustServerCertificate: true,
      integratedSecurity: true, 
    },
  };

// Подключение к базе данных
sql.connect(config, (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключение к базе данных успешно установлено');
  }
});

// Middleware для обработки JSON
app.use(express.json());

// Пример API для получения данных
app.get('/api/books', async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.query('SELECT * FROM Книги'); // Замените на ваш запрос
    res.json(result.recordset);
  } catch (err) {
    console.error('Ошибка при выполнении запроса:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});