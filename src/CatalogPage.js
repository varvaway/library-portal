import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './images/logo192.png';

function CatalogPage() {
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

        {/* Здесь будет содержимое страницы каталога */}
        <div className="catalog-content">
          <p>Здесь будет список книг или другие элементы каталога.</p>
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