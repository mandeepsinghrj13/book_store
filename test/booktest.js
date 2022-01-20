const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");
const { uuid } = require("uuidv4");
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
      .get("/books/61e2c6144726986d2c1eb5fa")
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
      .get("/books/61e2c6144726986d2c1eb5fa")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("searchbook api", () => {
  it("givenImPoperDetails_ShouldSearchBook", (done) => {
    const token = bookDB.book.validToken;
    chai
      .request(server)
      .get("/searchbook/title")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenImPoperDetails_ShouldSearchBookNotFound", (done) => {
    const token = bookDB.book.validToken;
    chai
      .request(server)
      .get("/searchbook/tit")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenInvalidToken_ShouldSearchBookInvalidToken", (done) => {
    const token = bookDB.book.invalidToken;
    chai
      .request(server)
      .get("/searchbook/title")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("Update boook api", () => {
  it("givenPoperDetails_ShouldUpdateBook", (done) => {
    const token = bookDB.book.validToken;
    const updatebook = {
      author: faker.lorem.word(),
      quantity: 100,
      price: 350,
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put("/updatebooks/61e8d2db04c7acfeb5c7b444")
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
      author: "m",
      quantity: 100,
      price: 350,
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put("/updatebooks/61e8d2db04c7acfeb5c7b444")
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
      author: faker.lorem.word(),
      quantity: 100,
      price: 350,
      title: "d",
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put("/updatebooks/61e8d2db04c7acfeb5c7b444")
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
      author: faker.lorem.word(),
      quantity: 100,
      price: 350,
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    chai
      .request(server)
      .put("/updatebooks/61e8d2db04c7acfeb5c7b444")
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
    const id = uuid();
    chai
      .request(server)
      .delete(`/deletebooks/${id}`)
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
      .delete("/deletebooks/61e8e0ba6080d09d3569b079")
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
