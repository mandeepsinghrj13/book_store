const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);
const data = require("./carttest.json");
chai.should();

describe("AddToCart api", () => {
  it("givenValidBook_ValidTokenAndQuantityShould_AddToCart", (done) => {
    const token = data.validToken;
    const qty = {
      qty: 2,
    };
    chai
      .request(server)
      .post("/addToCart/61e2ede9c3e5c7f047590d32")
      .set({ authorization: token })
      .send(qty)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenValidBook_ValidTokenAndNegativeQuantityShouldReturn201StatusCode_AndMessage(Quantity updated)", (done) => {
    const token = data.validToken;
    const qty = {
      qty: -1,
    };
    chai
      .request(server)
      .post("/addToCart/61e2ede9c3e5c7f047590d32")
      .set({ authorization: token })
      .send(qty)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenValidBook_ValidTokenAndNegativeQuantityShouldReturn201StatusCode", (done) => {
    const token = data.invalidToken;
    const qty = {
      qty: -1,
    };
    chai
      .request(server)
      .post("/addToCart/61e2ede9c3e5c7f047590d32")
      .set({ authorization: token })
      .send(qty)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("Get AllCarts", () => {
  it("Getallcart_whenvalidToken_shouldGetAllCards", (done) => {
    const token = data.validToken;
    chai
      .request(server)
      .get("/carts")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("getAllCarts_whenInvalidToken_shouldNotbeGet", (done) => {
    const token = data.invalidToken;
    chai
      .request(server)
      .get("/carts")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("Get cart by ID api", () => {
  it("givenPoperDetails_ShouldGetcart", (done) => {
    const token = data.validToken;
    chai
      .request(server)
      .get("/cart/61e2959a4cc338e59bcb0671")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("giveninvalidDetails_ShouldWrongId", (done) => {
    const token = data.validToken;
    chai
      .request(server)
      .get("/cart/61e2959a4cc338e59bcb067")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("giveninvalidToken_ShouldNotGetcart", (done) => {
    const token = data.invalidToken;
    chai
      .request(server)
      .get("/cart/61e2959a4cc338e59bcb0671")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("placeOrder api", () => {
  it("givenValidToken_ShouldBePurchased", (done) => {
    const token = data.validToken;
    const isPurchased = {
      isPurchased: true,
    };
    chai
      .request(server)
      .put("/placeOrder/61e67486c8033e2f6fe1a56a")
      .set({ authorization: token })
      .send(isPurchased)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenInvalidToken_ShouldNotPurchased", (done) => {
    const token = data.invalidToken;
    const isPurchased = {
      isPurchased: true,
    };
    chai
      .request(server)
      .put("/placeOrder/61e67486c8033e2f6fe1a56a")
      .set({ authorization: token })
      .send(isPurchased)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("removeBookFromCart api", () => {
  it("givenValidBook_ValidTokenAndQuantityShould_AddToCart", (done) => {
    const token = data.validToken;
    const qty = {
      qty: 2,
    };
    chai
      .request(server)
      .post("/addToCart/61e2ede9c3e5c7f047590d32")
      .set({ authorization: token })
      .send(qty)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenValidToken_ShouldBe_removeBookFromCart", (done) => {
    const token = data.validToken;
    const removeBookId = {
      bookId: "61e2ede9c3e5c7f047590d32",
    };
    chai
      .request(server)
      .delete("/removeBookFromCart")
      .set({ authorization: token })
      .send(removeBookId)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenInvalidToken_ShouldNot_removeBookFromCart", (done) => {
    const token = data.invalidToken;
    const removeBookId = {
      bookId: "61e2ede9c3e5c7f047590d32",
    };
    chai
      .request(server)
      .delete("/removeBookFromCart")
      .set({ authorization: token })
      .send(removeBookId)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
