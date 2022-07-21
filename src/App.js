import React from 'react';
import BookTable from "./components/BookTable";

function App() {
  const columns = [
    { field: 'id', fieldName: 'Дата' },
    { field: 'title', fieldName: 'Название' },
    { field: 'author', fieldName: 'Автор' },
    { field: 'place', fieldName: 'Место' },
  ];

  const data = [
    { id: 1, title: 'Игра в классики', author: 'Хулио Кортасар', place: 'Аргентина' },
    { id: 2, title: 'Генералы песчаных карьеров', author: 'Жоржи Амаду', place: 'Бразилия' },
    { id: 3, title: 'Бронзовое крыло', author: 'Сестры Чан-Нют', place: 'Вьетнам' },
    { id: 4, title: 'Невероятные похождения Алексиса Зорбаса', author: 'Никос Казандзакис', place: 'Греция' },
    { id: 5, title: 'Смилла и ее чувство снега', author: 'Питер Хёг', place: 'Дания' },
    { id: 6, title: 'Торжество возвышенного', author: 'Нагиб Махфуз', place: 'Египет' },
    { id: 7, title: 'Неправильное воспитание', author: 'Абдул Муис', place: 'Индонезия' },
    { id: 8, title: 'Устал рождаться и умирать', author: 'Мо Янь', place: 'Китай' },
    { id: 9, title: 'Колодец', author: 'Регина Эзера', place: 'Латвия' },
    { id: 10, title: 'Смерть Артемио Круса', author: 'Карлос Фуэнтес', place: 'Мексика' },
  ];

  return (
    <>
      <BookTable columns={columns} rows={data} actions />
    </>
  );
}

export default App;
