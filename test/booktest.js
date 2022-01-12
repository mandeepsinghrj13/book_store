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

describe("get all book api", () => {
  it("giventoken_whenvalidToken_shouldGetAllbooks", (done) => {
    const token = bookDB.book.validToken;
    chai
      .request(server)
      .get("/getbooks")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenCreateBook_whenInvalidToken_shouldNotbeGet", (done) => {
    const token = bookDB.book.invalidToken;
    chai
      .request(server)
      .get("/getbooks")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("Get Book by Id api", () => {
  it("givenPoperDetails_ShouldGetbookById", (done) => {
    const token = bookDB.book.validToken;
    chai
      .request(server)
      .get("/books/5")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenImpoperToken_ShouldNotGetbook", (done) => {
    const token = bookDB.book.invalidToken;
    chai
      .request(server)
      .get("/books/5")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("givenPoperDetails_ShouldGetbookById", (done) => {
    const token = bookDB.book.validToken;
    chai
      .request(server)
      .get("/books/6")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("Update boook api", () => {
  it("givenPoperDetails_ShouldUpdateBook", (done) => {
    const token = bookDB.book.validToken;
    const updatebook = {
      id: "20",
      author: faker.lorem.word(),
      quantity: 100,
      price: 350,
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put("/updatebooks")
      .set({ authorization: token })
      .send(updatebook)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenNotPoperDetails_ShouldNotUpdateBook_AuthorWrong", (done) => {
    const token = bookDB.book.validToken;
    const updatebook = {
      id: "20",
      author: "m",
      quantity: 100,
      price: 350,
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put("/updatebooks")
      .set({ authorization: token })
      .send(updatebook)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("givenNotPoperDetails_ShouldNotUpdateBook_TitleWrong", (done) => {
    const token = bookDB.book.validToken;
    const updatebook = {
      id: "20",
      author: faker.lorem.word(),
      quantity: 100,
      price: 350,
      title: "d",
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put("/updatebooks")
      .set({ authorization: token })
      .send(updatebook)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("givenInvalidToken_ShouldNotUpdateNote", (done) => {
    const token = bookDB.book.invalidToken;
    const updatebook = {
      id: "20",
      author: faker.lorem.word(),
      quantity: 100,
      price: 350,
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put("/updatebooks")
      .set({ authorization: token })
      .send(updatebook)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("delete book api", () => {
  it("givenImPoperDetails_ShouldDeleteBook", (done) => {
    const token = bookDB.book.validToken;
    chai
      .request(server)
      .delete("/deletebooks/18")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenImPoperDetails_ShouldBookNotFound", (done) => {
    const token = bookDB.book.validToken;
    chai
      .request(server)
      .delete("/deletebooks/19")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("givenInvalidToken_ShouldNotDeleteBook", (done) => {
    const token = bookDB.book.invalidToken;
    chai
      .request(server)
      .delete("/deletebooks/20")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
