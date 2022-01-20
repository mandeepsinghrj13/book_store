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

  it.only("givenValidBook_ValidTokenAndNegativeQuantityShouldReturn201StatusCode", (done) => {
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
