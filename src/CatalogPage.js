import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import logo from './images/logo192.png';

function CatalogPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Запрос к API для получения данных
    axios.get('http://localhost:5001/api/books')
      .then(response => {
        console.log('Данные получены:', response.data);
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  return (
    <div className="App">
      {/* Шапка */}
      <header className="App-header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Логотип" className="logo-image" />
          </Link>
        </div>
        <div className="catalog-link">
          <Link to="/catalog">Каталог</Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Найти нужную книгу..." />
        </div>
        <div className="account">
          <button>Вход в аккаунт</button>
        </div>
      </header>

      <main>
        {/* Заголовок "КАТАЛОГ" */}
        <h1 className="catalog-title">КАТАЛОГ</h1>

        {/* Таблица с книгами */}
        <div className="catalog-content">
          <table>
            <thead>
              <tr>
                <th>Код книги</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Год издания</th>
                <th>ISBN</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.КодКниги}>
                  <td>{book.КодКниги}</td>
                  <td>{book.Название}</td>
                  <td>{book.Описание}</td>
                  <td>{book.ГодИздания}</td>
                  <td>{book.ISBN}</td>
                  <td>{book.Статус}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Подвал */}
      <footer className="footer">
        <p>хехе это подвал, а я - автор сайта</p>
      </footer>
    </div>
  );
}

export default CatalogPage;