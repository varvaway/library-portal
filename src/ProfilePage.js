import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import logo from './images/logo192.png';

function ProfilePage() {
  // Пример данных пользователя
  const user = {
    fullName: 'Варвара Кнороз',
    email: 'varvara@example.com',
    phone: '+7 (123) 456-78-90',
    borrowedBooks: [
      { title: '1984', author: 'Джордж Оруэлл', dueDate: '2023-12-01' },
      { title: 'Мастер и Маргарита', author: 'Михаил Булгаков', dueDate: '2023-11-25' },
    ],
    readingHistory: [
      { title: 'Преступление и наказание', author: 'Фёдор Достоевский', returnedDate: '2023-10-15' },
      { title: 'Война и мир', author: 'Лев Толстой', returnedDate: '2023-09-20' },
    ],
  };

  return (
    <div className="App">
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
          <Link to="/profile">Профиль</Link>
        </div>
      </header>

      <main>
        <section className="profile-section">
          <h1>Профиль пользователя</h1>
          <div className="profile-info">
            <div className="profile-details">
              <h2>Личная информация</h2>
              <p><strong>ФИО:</strong> {user.fullName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Телефон:</strong> {user.phone}</p>
            </div>

            <div className="borrowed-books">
              <h2>Взятые книги</h2>
              {user.borrowedBooks.length > 0 ? (
                <ul>
                  {user.borrowedBooks.map((book, index) => (
                    <li key={index}>
                      <strong>{book.title}</strong> - {book.author} (до {book.dueDate})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>У вас нет взятых книг.</p>
              )}
            </div>

            <div className="reading-history">
              <h2>История чтения</h2>
              {user.readingHistory.length > 0 ? (
                <ul>
                  {user.readingHistory.map((book, index) => (
                    <li key={index}>
                      <strong>{book.title}</strong> - {book.author} (возвращена {book.returnedDate})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>История чтения пуста.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>хехе это подвал, а я - автор сайта</p>
      </footer>
    </div>
  );
}

export default ProfilePage;