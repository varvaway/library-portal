const express = require('express');
const sql = require('mssql/msnodesqlv8');
const cors = require('cors');
const app = express();
const port = 5001;

// Включаем CORS
app.use(cors({
  origin: 'http://localhost:3000', // Укажите адрес вашего фронтенда
  credentials: true,
}));

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

// Авторизация пользователя
app.post('/api/login', async (req, res) => {
  const { fullName, password } = req.body;
  console.log('Полученные данные:', { fullName, password });

  try {
    const request = new sql.Request();
    const result = await request
      .input('fullName', sql.NVarChar, fullName)
      .input('password', sql.NVarChar, password)
      .query(
        `SELECT * FROM Пользователи WHERE CONCAT(Имя, ' ', Фамилия) = @fullName AND ХэшПароля = @password`
      );

    console.log('Результат запроса:', result.recordset);

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      res.json({ success: true, user });
    } else {
      console.log('Неверные данные:', fullName, password);
      res.status(401).json({ success: false, message: 'Неверные данные' });
    }
  } catch (err) {
    console.error('Ошибка при выполнении запроса:', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
});

// Обработка GET-запросов на /api/login
app.get('/api/login', (req, res) => {
  res.status(405).json({ message: 'Метод GET не поддерживается. Используйте POST.' });
});

// Получение списка книг
// Получение списка книг с авторами
app.get('/api/books', async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.query(`
      SELECT 
        Книги.КодКниги,
        Книги.Название,
        Книги.Описание,
        Книги.ГодИздания,
        Книги.ISBN,
        Книги.Статус,
        Авторы.Имя AS АвторИмя,
        Авторы.Фамилия AS АвторФамилия
      FROM Книги
      LEFT JOIN КнигиАвторы ON Книги.КодКниги = КнигиАвторы.КодКниги
      LEFT JOIN Авторы ON КнигиАвторы.КодАвтора = Авторы.КодАвтора
    `);

    console.log('Данные получены:', result.recordset);
    res.json(result.recordset);
  } catch (err) {
    console.error('Ошибка при выполнении запроса:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Получение бронирований пользователя
app.get('/api/reservations/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const request = new sql.Request();
    const result = await request
      .input('userId', sql.Int, userId)
      .query(
        `SELECT * FROM Бронирования WHERE КодПользователя = @userId`
      );

    res.json(result.recordset);
  } catch (err) {
    console.error('Ошибка при выполнении запроса:', err);
    res.status(500).send('Ошибка сервера');
  }
});

//Для профиля
app.get('/api/reservations/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const request = new sql.Request();
    const result = await request
      .input('userId', sql.Int, userId)
      .query(
        `SELECT Бронирования.*, Книги.Название, Авторы.Имя AS АвторИмя, Авторы.Фамилия AS АвторФамилия
         FROM Бронирования
         JOIN Книги ON Бронирования.КодКниги = Книги.КодКниги
         JOIN КнигиАвторы ON Книги.КодКниги = КнигиАвторы.КодКниги
         JOIN Авторы ON КнигиАвторы.КодАвтора = Авторы.КодАвтора
         WHERE Бронирования.КодПользователя = @userId`
      );

    console.log('Результат запроса:', result.recordset); // Логирование
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