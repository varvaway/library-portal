import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import logo from './images/logo192.png';

function CatalogPage() {
  const [books, setBooks] = useState([]);
  const [sortType, setSortType] = useState('title'); // Тип сортировки: title, author, year
  const [sortDirection, setSortDirection] = useState('asc'); // Направление: asc, desc

  useEffect(() => {
    axios.get('http://localhost:5001/api/books')
      .then(response => {
        console.log('Данные получены:', response.data);
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  // Функция для сортировки книг
  const sortBooks = (type, direction) => {
    const sortedBooks = [...books].sort((a, b) => {
      let valueA, valueB;

      switch (type) {
        case 'title':
          valueA = a.Название.toLowerCase();
          valueB = b.Название.toLowerCase();
          break;
        case 'author':
          valueA = (a.АвторИмя + ' ' + a.АвторФамилия).toLowerCase();
          valueB = (b.АвторИмя + ' ' + b.АвторФамилия).toLowerCase();
          break;
        case 'year':
          valueA = a.ГодИздания;
          valueB = b.ГодИздания;
          break;
        default:
          valueA = a.Название.toLowerCase();
          valueB = b.Название.toLowerCase();
      }

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setBooks(sortedBooks);
  };

  // Обработчик изменения типа сортировки
  const handleSortTypeChange = (e) => {
    const type = e.target.value;
    setSortType(type);
    sortBooks(type, sortDirection);
  };

  // Обработчик изменения направления сортировки
  const handleSortDirectionChange = (e) => {
    const direction = e.target.value;
    setSortDirection(direction);
    sortBooks(sortType, direction);
  };

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

        {/* Фильтры */}
        <div className="filters">
          <label>
            Сортировать по:
            <select value={sortType} onChange={handleSortTypeChange}>
              <option value="title">Названию</option>
              <option value="author">Автору</option>
              <option value="year">Году издания</option>
            </select>
          </label>

          <label>
            Направление:
            <select value={sortDirection} onChange={handleSortDirectionChange}>
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>
            </select>
          </label>
        </div>

        {/* Таблица с книгами */}
        <div className="catalog-content">
          <table>
            <thead>
              <tr>
                <th>Код книги</th>
                <th>Название</th>
                <th>Автор</th>
                <th>Описание</th>
                <th>Год издания</th>
                <th>ISBN</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map(Книги => (
                  <tr key={Книги.КодКниги}>
                    <td>{Книги.КодКниги}</td>
                    <td>{Книги.Название}</td>
                    <td>{Книги.АвторИмя} {Книги.АвторФамилия}</td>
                    <td>{Книги.Описание}</td>
                    <td>{Книги.ГодИздания}</td>
                    <td>{Книги.ISBN}</td>
                    <td>{Книги.Статус}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Нет данных</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Подвал */}
      <footer className="footer">
        <p>с 2025 ООО "Кнороз&Со" Все права защищены. Перепечатка и любое использование материалов возможно только при наличии ссылки на первоисточник.</p>
      </footer>
    </div>
  );
}

export default CatalogPage;