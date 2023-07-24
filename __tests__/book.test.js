process.env.NODE_ENV = "test"

const request = require("supertest");

const app =  require("../app");
const db = require("../db");

let isbn;


// before each test add a book to db
beforeEach(async function() {
    let res = await db.query(`
    INSERT INTO
    books (isbn, amazon_url,author,language,pages,publisher,title,year)
    VALUES(
      '123432122',
      'https://amazon.com/taco',
      'Elie',
      'English',
      100,
      'Nothing publishers',
      'my first book', 2008)
    RETURNING isbn 
    `);
    isbn = res.rows[0];
});

describe("POST /books", () => {
    test("makes new book", async () => {
        const res = await request(app)
            .post(`/books`)
            .send({
                isbn: '32794782',
                amazon_url: "https://taco.com",
                author: "mctest",
                language: "english",
                pages: 1000,
                publisher: "yeah right",
                title: "amazing times",
                year: 2000
            });
            expect(res.statusCode).toBe(201);
    })
});

afterEach(async function () {
    await db.query("DELETE FROM BOOKS");
  });
  
  
  afterAll(async function () {
    await db.end()
  });
// get the patterns will turn in w/ first commit

// note - ran into some issues because I forgot to create the test_db, 
// and also forgot to make the book table in psql test-db, now tests pass!