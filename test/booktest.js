const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");

chai.use(chaiHttp);
const bookDB = require("./booktest.json");
chai.should();

describe("create book api", () => {
  it("givenAddBook_whenValidToken_shouldBeCreated", (done) => {
    const token = bookDB.book.validToken;
    const createBook = {
      author: faker.lorem.word(),
      quantity: 100,
      price: 350,
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .post("/books")
      .set({ authorization: token })
      .send(createBook)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenAddBook_whenInvalidToken_shouldNotbeCreated", (done) => {
    const token = bookDB.book.invalidToken;
    const createBook = {
      author: faker.lorem.word(),
      quantity: 100,
      price: 350,
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .post("/books")
      .set({ authorization: token })
      .send(createBook)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
