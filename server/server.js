const express = require('express');
const sql = require('mssql/msnodesqlv8');
//const cors = require('cors');
const app = express();
const port = 5001;

// Включаем CORS
//app.use(cors());

// Конфигурация подключения к SQL Server
const config = {
  user: 'test',
  password: '1003',
  server: 'localhost\\SQLEXPRESS03', 
  database: 'LibraryDB',
  driver: 'msnodesqlv8',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    integratedSecurity: true, 
    connectTimeout: 30000,
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
    console.log('Попытка подключения к базе данных...');
    const request = new sql.Request();
    console.log('Выполнение SQL-запроса...');
    const result = await request.query('SELECT * FROM Книги'); 
    console.log('Данные получены:', result.recordset);
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