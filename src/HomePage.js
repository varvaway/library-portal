import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import logo from './images/logo192.png';
import contactPhoto from './images/contact-photo.png';

function HomePage() {
  // Состояния для полей формы
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    setName('');
    setPhone('');
    setIsChecked(false);
    setIsSubmitted(true); 
  };

  const closePopup = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="App">
      {/* Всплывающее сообщение */}
      {isSubmitted && (
        <div className="popup">
          <div className="popup-content">
            <p>Ваша заявка была принята, ожидайте звонка в ближайшее время.</p>
            <button onClick={closePopup}>ОК</button>
          </div>
        </div>
      )}

      {/* Шапка */}
      <header className="App-header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Логотип" className="logo-image" /> {/* Используем изображение */}
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
        {/* Блок с фоновым изображением */}
        <div className="hero-section">
          <h1>Юношеская библиотека им. А. П. Гайдара</h1>
          <p className="library-description">
            Юношеская библиотека имени Аркадия Петровича Гайдара — одна из старейших библиотек Петроградского района. Благодаря сотрудникам библиотеки здесь сохранились исторические помещения с подлинной лепниной и прекрасными печами, а также уникальный балкон.
          </p>
        </div>

        {/* Остальные секции */}
        <section className="form-section">
          <h1>Как стать читателем?</h1>
          <p>Оставьте заявку прямо сейчас, мы свяжемся с Вами незамедлительно!</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Фамилия и имя</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  required
                />
                пока хз путь будет
              </label>
            </div>
            <button type="submit">Оставить заявку</button>
          </form>
        </section>

        <section className="map-section">
          <h1>Как нас найти</h1>
          <div className="map-container">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=30.294030%2C59.954912&mode=search&oid=1004990641&ol=biz&z=16.54"
              width="100%"
              height="400"
              frameBorder="0"
              title="Карта библиотеки"
            ></iframe>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-container">
            <div className="contact-left">
              <div className="contact-photo">
                <img src={contactPhoto} alt="Дзынь!" />
              </div>
              <div className="contact-info">
                <h1>Контактная информация</h1>
                <p><strong>Адрес:</strong> Большой пр. П.С., д. 18 (4-й этаж)</p>
                <p><strong>Телефон:</strong> 8 (812) 235-35-96</p>
                <p><strong>E-mail:</strong> gaidara-spb@mail.ru</p>
                <p><strong>Социальные сети:</strong></p>
                <div className="social-links">
                  <a href="https://vk.com/gaidaralib" target="_blank" rel="noopener noreferrer">gaidaralib</a>
                  <a href="https://t.me/gaidarlibrary" target="_blank" rel="noopener noreferrer">gaidaralibrary</a>
                </div>
              </div>
            </div>
            <div className="contact-right">
              <h2>Режим работы</h2>
              <p>Понедельник - пятница: 12.00-20.00</p>
              <p>Суббота: 11.00-19.00</p>
              <p>Выходные дни: воскресенье</p>
              <p>Санитарный день - последний четверг месяца</p>
            </div>
          </div>
        </section>
      </main>

      {/* Подвал */}
      <footer className="footer">
        <p>хехе это подвал, а я - автор сайта</p>
      </footer>
    </div>
  );
}

export default HomePage;