const chai = require("chai");
const chaiHttp = require("chai-http");
require("dotenv").config();

const server = require("../index");
chai.use(chaiHttp);
const should = chai.should();

describe("Testing user signup api call ", () => {
  it("creates a new user", (done) => {
    chai
      .request(process.env.API)
      .post("/api/v1/user/signup")
      .send({
        name: "Shubham",
        email: "shubhamhunmai@gmail.com",
        password: "Shubhamhunmai@13",
        isSeller: false,
      })
      .end((err, res) => {
        console.log(should);
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.contain("user has been created");
      });
    done();
  });
});
