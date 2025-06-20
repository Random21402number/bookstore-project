const client = require('./db');

async function main() {
  try {
    await client.connect();
    const db = client.db('bookstore');

    const authors = [
      { _id: 1, name: "Джон Доу", birth_year: 1980, nationality: "САЩ" },
      { _id: 2, name: "Джейн Смит", birth_year: 1975, nationality: "Великобритания" },
      { _id: 3, name: "Иван Иванов", birth_year: 1990, nationality: "България" },
      { _id: 4, name: "Мария Петрова", birth_year: 1985, nationality: "България" },
      { _id: 5, name: "Люси Харт", birth_year: 1965, nationality: "Канада" },
      { _id: 6, name: "Анна Браун", birth_year: 1972, nationality: "Германия" },
      { _id: 7, name: "Робърт Джоунс", birth_year: 1992, nationality: "САЩ" },
      { _id: 8, name: "Клара Дюпон", birth_year: 1988, nationality: "Франция" },
      { _id: 9, name: "Петър Колев", birth_year: 1995, nationality: "България" },
      { _id: 10, name: "Силвия Стоянова", birth_year: 1983, nationality: "България" },
    ];
    await db.collection("authors").insertMany(authors);

    const books = [
      { title: "MongoDB за начинаещи", author_id: 1, genres: ["Бази данни"], price: 25.99 },
      { title: "Node.js в действие", author_id: 2, genres: ["Програмиране", "Node.js"], price: 29.99 },
      { title: "Тайните на JavaScript", author_id: 3, genres: ["Програмиране"], price: 19.99 },
      { title: "Програмиране на Python", author_id: 4, genres: ["Python"], price: 21.99 },
      { title: "C++ за напреднали", author_id: 5, genres: ["Програмиране", "C++"], price: 34.50 },
      { title: "История на България", author_id: 6, genres: ["История"], price: 18.00 },
      { title: "Фантастични светове", author_id: 7, genres: ["Фантастика"], price: 15.00 },
      { title: "CSS дизайн", author_id: 8, genres: ["Уеб дизайн"], price: 22.00 },
      { title: "Основи на Linux", author_id: 9, genres: ["Операционни системи"], price: 20.00 },
      { title: "Data Science с Python", author_id: 10, genres: ["Наука за данни", "Python"], price: 28.00 },
    ];
    await db.collection("books").insertMany(books);

    const customers = Array.from({ length: 10 }).map((_, i) => ({
      name: `Клиент ${i + 1}`,
      email: `client${i + 1}@mail.bg`,
      address: {
        city: "София",
        street: `Ул. Примерна ${i + 1}`,
      },
      registered: true,
    }));
    await db.collection("customers").insertMany(customers);

    const orders = Array.from({ length: 10 }).map((_, i) => ({
      customer_name: `Клиент ${i + 1}`,
      book_title: books[i % books.length].title,
      quantity: Math.ceil(Math.random() * 3),
      order_date: new Date(2024, i % 12, (i + 1)),
    }));
    await db.collection("orders").insertMany(orders);

    const reviews = Array.from({ length: 10 }).map((_, i) => ({
      book_title: books[i % books.length].title,
      reviewer: `Клиент ${i + 1}`,
      rating: Math.ceil(Math.random() * 5),
      comment: "Добра книга!"
    }));
    await db.collection("reviews").insertMany(reviews);

    console.log("Всички данни са успешно вмъкнати.");
  } finally {
    await client.close();
  }
}

main();