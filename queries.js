const client = require('./db');

async function main() {
  try {
    await client.connect();
    const db = client.db('bookstore');

    const allBooks = await db.collection("books").find().toArray();
    console.log("Всички книги:", allBooks);

    const progBooks = await db.collection("books").find({ genres: "Програмиране" }).toArray();
    console.log("Програмни книги:", progBooks);

    const sofiaCustomers = await db.collection("customers").find({ "address.city": "София", registered: true }).toArray();
    console.log("Клиенти от София:", sofiaCustomers);

    await db.collection("customers").updateOne(
      { name: "Клиент 1" },
      { $set: { "address.city": "Пловдив" } }
    );

    await db.collection("reviews").deleteOne({ reviewer: "Клиент 2" });

    const avgByGenre = await db.collection("books").aggregate([
      { $unwind: "$genres" },
      { $group: { _id: "$genres", avgPrice: { $avg: "$price" } } },
      { $sort: { avgPrice: -1 } }
    ]).toArray();
    console.log("Средна цена по жанр:", avgByGenre);

    const ordersByCustomer = await db.collection("orders").aggregate([
      { $group: { _id: "$customer_name", totalOrders: { $sum: 1 } } },
      { $sort: { totalOrders: -1 } }
    ]).toArray();
    console.log("Поръчки по клиент:", ordersByCustomer);
  } finally {
    await client.close();
  }
}

main();