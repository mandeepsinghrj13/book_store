const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const server = require("../server");
chai.use(chaiHttp);
const registrationData = require("./user.json");

chai.should();

describe("user registartion", () => {
  it("givenRegistrationDetails_whenProper_shouldSaveInDB", (done) => {
    const registerfaker = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: "Password@123",
      role: "user",
    };
    chai
      .request(server)
      .post("/userRegistration")
      .send(registerfaker)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("givenRegistrationDetails_whenNoProper_NotSaveInDB", (done) => {
    chai
      .request(server)
      .post("/userRegistration")
      .send(registrationData.user.registrationNotProperDetails)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("admin registartion", () => {
  it("givenRegistrationDetails_whenProper_shouldSaveInDB", (done) => {
    const registerfaker = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: "Password@123",
      role: "admin",
    };
    chai
      .request(server)
      .post("/adminRegistration")
      .send(registerfaker)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("givenAdminRegistrationDetails_whenNotProper_thenNotSaveInDB", (done) => {
    chai
      .request(server)
      .post("/adminRegistration")
      .send(registrationData.user.registrationNotProperDetails)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("login", () => {
  it("givenLoginDetails_whenProper_shouldAbleToLogin", (done) => {
    chai
      .request(server)
      .post("/login")
      .send(registrationData.user.login)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("givenUserLoginDetails_whenImproper_shouldUnableToLogin", (done) => {
    chai
      .request(server)
      .post("/login")
      .send(registrationData.user.loginWithWrongDetails)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });
});
