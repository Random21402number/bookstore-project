const client = require('./db');

async function main() {
  try {
    await client.connect();
    const db = client.db('bookstore');

    console.log("=== READ OPERATIONS ===");
    
    // Извличане на всички документи от колекция authors
    const allAuthors = await db.collection("authors").find().toArray();
    console.log("Всички автори:", allAuthors);

    // Извличане на всички документи от колекция books
    const allBooks = await db.collection("books").find().toArray();
    console.log("Всички книги:", allBooks);

    // Извличане на всички документи от колекция customers
    const allCustomers = await db.collection("customers").find().toArray();
    console.log("Всички клиенти:", allCustomers);

    // Извличане на всички документи от колекция orders
    const allOrders = await db.collection("orders").find().toArray();
    console.log("Всички поръчки:", allOrders);

    // Извличане на всички документи от колекция reviews
    const allReviews = await db.collection("reviews").find().toArray();
    console.log("Всички отзиви:", allReviews);

    // Филтриране по едно поле - автори от България
    const bulgarianAuthors = await db.collection("authors").find({ nationality: "България" }).toArray();
    console.log("Български автори:", bulgarianAuthors);

    // Филтриране по едно поле - книги с жанр "Програмиране"
    const progBooks = await db.collection("books").find({ genres: "Програмиране" }).toArray();
    console.log("Програмни книги:", progBooks);

    // Филтриране по едно поле - регистрирани клиенти
    const registeredCustomers = await db.collection("customers").find({ registered: true }).toArray();
    console.log("Регистрирани клиенти:", registeredCustomers);

    // Филтриране по едно поле - поръчки с количество повече от 1
    const multipleItemOrders = await db.collection("orders").find({ quantity: { $gt: 1 } }).toArray();
    console.log("Поръчки с повече от 1 бройка:", multipleItemOrders);

    // Филтриране по едно поле - отзиви с оценка 5
    const fiveStarReviews = await db.collection("reviews").find({ rating: 5 }).toArray();
    console.log("Отзиви с 5 звезди:", fiveStarReviews);

    // Филтриране по множество полета - български автори родени след 1985
    const youngBulgarianAuthors = await db.collection("authors").find({ 
      nationality: "България", 
      birth_year: { $gt: 1985 } 
    }).toArray();
    console.log("Млади български автори:", youngBulgarianAuthors);

    // Филтриране по множество полета - програмни книги под 25 лв
    const cheapProgBooks = await db.collection("books").find({ 
      genres: "Програмиране", 
      price: { $lt: 25 } 
    }).toArray();
    console.log("Евтини програмни книги:", cheapProgBooks);

    // Филтриране по множество полета - клиенти от София, които са регистрирани
    const sofiaCustomers = await db.collection("customers").find({ 
      "address.city": "София", 
      registered: true 
    }).toArray();
    console.log("Регистрирани клиенти от София:", sofiaCustomers);

    // Филтриране по множество полета - поръчки от 2024 с количество 2
    const specificOrders = await db.collection("orders").find({ 
      quantity: 2,
      order_date: { $gte: new Date(2024, 0, 1), $lt: new Date(2025, 0, 1) }
    }).toArray();
    console.log("Поръчки от 2024 с количество 2:", specificOrders);

    // Филтриране по множество полета - отзиви с оценка над 3 за конкретна книга
    const goodBookReviews = await db.collection("reviews").find({ 
      rating: { $gt: 3 },
      book_title: "MongoDB за начинаещи"
    }).toArray();
    console.log("Добри отзиви за MongoDB книгата:", goodBookReviews);

    console.log("\n=== UPDATE OPERATIONS ===");

    // Актуализация на автор - промяна на националност
    const authorUpdate = await db.collection("authors").updateOne(
      { name: "Джон Доу" },
      { $set: { nationality: "Канада" } }
    );
    console.log("Актуализиран автор:", authorUpdate.modifiedCount);

    // Актуализация на книга - промяна на цена
    const bookUpdate = await db.collection("books").updateOne(
      { title: "MongoDB за начинаещи" },
      { $set: { price: 27.99 } }
    );
    console.log("Актуализирана книга:", bookUpdate.modifiedCount);

    // Актуализация на клиент - промяна на адрес
    const customerUpdate = await db.collection("customers").updateOne(
      { name: "Клиент 1" },
      { $set: { "address.city": "Пловдив" } }
    );
    console.log("Актуализиран клиент:", customerUpdate.modifiedCount);

    // Актуализация на поръчка - промяна на количество
    const orderUpdate = await db.collection("orders").updateOne(
      { customer_name: "Клиент 1" },
      { $set: { quantity: 5 } }
    );
    console.log("Актуализирана поръчка:", orderUpdate.modifiedCount);

    // Актуализация на отзив - промяна на оценка и коментар
    const reviewUpdate = await db.collection("reviews").updateOne(
      { reviewer: "Клиент 1" },
      { $set: { rating: 5, comment: "Отлична книга! Много препоръчвам!" } }
    );
    console.log("Актуализиран отзив:", reviewUpdate.modifiedCount);

    console.log("\n=== DELETE OPERATIONS ===");

    // Изтриване на автор по условие
    const authorDelete = await db.collection("authors").deleteOne({ birth_year: { $lt: 1970 } });
    console.log("Изтрит автор:", authorDelete.deletedCount);

    // Изтриване на книга по условие
    const bookDelete = await db.collection("books").deleteOne({ price: { $lt: 16 } });
    console.log("Изтрита книга:", bookDelete.deletedCount);

    // Изтриване на клиент по условие
    const customerDelete = await db.collection("customers").deleteOne({ name: "Клиент 10" });
    console.log("Изтрит клиент:", customerDelete.deletedCount);

    // Изтриване на поръчка по условие
    const orderDelete = await db.collection("orders").deleteOne({ quantity: 1 });
    console.log("Изтрита поръчка:", orderDelete.deletedCount);

    // Изтриване на отзив по условие
    const reviewDelete = await db.collection("reviews").deleteOne({ reviewer: "Клиент 2" });
    console.log("Изтрит отзив:", reviewDelete.deletedCount);

    console.log("\n=== AGGREGATION OPERATIONS ===");

    // Агрегация за authors - групиране по националност с броене
    const authorsByNationality = await db.collection("authors").aggregate([
      { $group: { _id: "$nationality", count: { $sum: 1 }, avgBirthYear: { $avg: "$birth_year" } } },
      { $sort: { count: -1 } }
    ]).toArray();
    console.log("Автори по националност:", authorsByNationality);

    // Агрегация за books - групиране по жанр със средна цена
    const avgPriceByGenre = await db.collection("books").aggregate([
      { $unwind: "$genres" },
      { $group: { _id: "$genres", avgPrice: { $avg: "$price" }, count: { $sum: 1 } } },
      { $sort: { avgPrice: -1 } }
    ]).toArray();
    console.log("Средна цена по жанр:", avgPriceByGenre);

    // Агрегация за customers - групиране по град
    const customersByCity = await db.collection("customers").aggregate([
      { $group: { _id: "$address.city", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();
    console.log("Клиенти по градове:", customersByCity);

    // Агрегация за orders - групиране по клиент с обща сума поръчки
    const ordersByCustomer = await db.collection("orders").aggregate([
      { $group: { _id: "$customer_name", totalOrders: { $sum: 1 }, totalQuantity: { $sum: "$quantity" } } },
      { $sort: { totalOrders: -1 } }
    ]).toArray();
    console.log("Поръчки по клиент:", ordersByCustomer);

    // Агрегация за reviews - групиране по книга със средна оценка
    const avgRatingByBook = await db.collection("reviews").aggregate([
      { $group: { _id: "$book_title", avgRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
      { $sort: { avgRating: -1 } }
    ]).toArray();
    console.log("Средна оценка по книга:", avgRatingByBook);

  } finally {
    await client.close();
  }
}

main().catch(console.error);
