import React, { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import logo from './images/logo192.png';
import axios from 'axios';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);

      // Получаем бронирования пользователя
      axios.get(`http://localhost:5001/api/reservations/${storedUser.КодПользователя}`)
        .then(response => {
          setReservations(response.data);
        })
        .catch(error => {
          console.error('Ошибка при получении бронирований:', error);
        });
    }
  }, []);

  if (!user) {
    return <div>Пользователь не авторизован</div>;
  }

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
              <p><strong>ФИО:</strong> {user.Имя} {user.Фамилия}</p>
              <p><strong>Email:</strong> {user.ЭлектроннаяПочта}</p>
            </div>

            <div className="borrowed-books">
              <h2>Бронирования</h2>
              {reservations.length > 0 ? (
                <ul>
                  {reservations.map((reservation, index) => (
                    <li key={index}>
                      <strong>Код бронирования:</strong> {reservation.КодБронирования}
                      <br />
                      <strong>Дата бронирования:</strong> {new Date(reservation.ДатаБронирования).toLocaleDateString()}
                      <br />
                      <strong>Статус:</strong> {reservation.Статус}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>У вас нет активных бронирований.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
      <p>с 2025 ООО "Кнороз&Со" Все права защищены. Перепечатка и любое использование материалов возможно только при наличии ссылки на первоисточник.</p>
      </footer>
    </div>
  );
}

export default ProfilePage;