const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

chai.should();
const token =
  "b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhRm9yVG9rZW4iOnsiaWQiOiI2MWVlMmQwMDcyMWQ1NzY5NTViMDQ2YzYiLCJmaXJzdE5hbWUiOiJhZG1pbiIsImxhc3ROYW1lIjoiYWRtaW4iLCJlbWFpbCI6Im5ld3VzZXJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjQyOTk5MjYyfQ._PBVzGYcSyA7NHocbF50F3almIsi7gOaf_dmSji4KNE";
const Invalidtoken =
  "b yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhRm9yVG9rZW4iOnsiaWQiOiI2MWVlMmQwMDcyMWQ1NzY5NTViMDQ2YzYiLCJmaXJzdE5hbWUiOiJhZG1pbiIsImxhc3ROYW1lIjoiYWRtaW4iLCJlbWFpbCI6Im5ld3VzZXJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjQyOTk5MjYyfQ._PBVzGYcSyA7NHocbF50F3almIsi7gOaf_dmSji4KNE";
const bookId = "61e2ede9c3e5c7f047590d34";
describe("AddToWishList api", () => {
  it("givenValidBook_ValidTokenAndQuantityShould_AddToWishlist", (done) => {
    const qty = {
      qty: 2,
    };
    chai
      .request(server)
      .post("/wishlist/61e2ede9c3e5c7f047590d32")
      .set({ authorization: token })
      .send(qty)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenValidBook_ValidTokenAndNegativeQuantityShouldReturn200(wishList updated)", (done) => {
    const qty = {
      qty: -1,
    };
    chai
      .request(server)
      .post("/wishlist/61e2ede9c3e5c7f047590d32")
      .set({ authorization: token })
      .send(qty)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenValidBook_ValidTokenAndNegativeQuantityShouldReturn401TokenRequired", (done) => {
    const token = "";
    const qty = {
      qty: -1,
    };
    chai
      .request(server)
      .post("/wishlist/61e2ede9c3e5c7f047590d32")
      .set({ authorization: token })
      .send(qty)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it("givenValidBook_ValidTokenAndNegativeQuantityShouldReturn400InvalidToken", (done) => {
    const qty = {
      qty: -1,
    };
    chai
      .request(server)
      .post("/wishlist/61e2ede9c3e5c7f047590d32")
      .set({ authorization: Invalidtoken })
      .send(qty)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
describe("Delete Book From Wishlist api", () => {
  it("givenValidBook_ValidTokenAndShould_AddToWishList", (done) => {
    console.log(bookId);
    chai
      .request(server)
      .post(`/wishlist/${bookId}`)
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenValidToken_ShouldBe_removeBook_FromWishlist", (done) => {
    console.log(bookId);
    chai
      .request(server)
      .delete(`/wishlist/${bookId}`)
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenValidToken_ShouldBe_bookNotFound_Into_Wishlist", (done) => {
    console.log(bookId);
    chai
      .request(server)
      .delete(`/wishlist/${bookId}`)
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("givenInvalidToken_ShouldNot_removeBook", (done) => {
    chai
      .request(server)
      .delete("/wishlist/61e2ede9c3e5c7f047590d34")
      .set({ authorization: Invalidtoken })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
