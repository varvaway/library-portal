import React, { useState } from 'react';
import './App.css';

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
    setIsSubmitted(true); // Показываем сообщение
  };

  // Закрытие всплывающего сообщения
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
        <div className="search-bar">
          <input type="text" placeholder="Найти нужную книгу..." />
        </div>
        <div className="account">
          <button>Вход в аккаунт</button>
        </div>
      </header>

      <main>
        <h1>Юношеская библиотека им. А. П. Гайдара</h1>
        {/* Текст под заголовком */}
        <p className="library-description">
          Юношеская библиотека имени Аркадия Петровича Гайдара — одна из старейших библиотек Петроградского района. Благодаря сотрудникам библиотеки здесь сохранились исторические помещения с подлинной лепниной и прекрасными печами, а также уникальный балкон.
        </p>
        <nav>
          <a href="/events">ДОП СТРАНИЦА 1</a>
          <a href="/other">ДОП СТРАНИЦА 2</a>
        </nav>

        {/* Секция "Как стать читателем?" */}
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

        {/* Секция "Как нас найти" */}
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

        {/* Секция с контактной информацией */}
        <section className="contact-section">
          <h1>Контактная информация</h1>
          <div className="contact-info">
            <p><strong>Адрес:</strong> Большой проспект П.С., 18, лит. А, Санкт-Петербург, Россия</p>
            <p><strong>Телефон:</strong> +7 (812) 00000000</p>
            <p><strong>Часы работы:</strong> C 9:00 до 17:00</p>
            <p><strong>E-mail:</strong> simpletemplate@example.ru</p>
            <p><strong>WhatsApp:</strong> WhatsApp</p>
            <p><strong>Telegram:</strong> Telegram (помощник)</p>
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