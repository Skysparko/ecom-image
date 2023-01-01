const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");

const expect = require("chai").expect;

describe("Testing name validation", () => {
  it("return true for a valid name", () => {
    expect(validateName("shubham")).to.equal(true);
  });
  it("return false for a valid name", () => {
    expect(validateName("shubham rakhecha hun mai bhai")).to.equal(false);
  });
});

describe("Testing email validation", () => {
  it("return true for a valid mail", () => {
    expect(validateEmail("shubham@gmail.com")).to.equal(true);
  });
  it("return true for a valid mail", () => {
    expect(validateEmail("sfhsb763jbf@gmail.com")).to.equal(true);
  });
  it("return false for a valid mail", () => {
    expect(validateEmail("shubhamgmail.com")).to.equal(false);
  });
  it("return false for a valid mail", () => {
    expect(validateEmail("sfhsb763jbf@@gmail..com")).to.equal(false);
  });
});

describe("Testing password validation", () => {
  it("return true for a valid password", () => {
    expect(validatePassword("sfhiS@$1243")).to.equal(true);
  });
  it("return true for a valid password", () => {
    expect(validatePassword("Ubuntu@!@$532")).to.equal(true);
  });
  it("return false for a valid password", () => {
    expect(validatePassword("shubham")).to.equal(false);
  });
  it("return false for a valid password", () => {
    expect(validatePassword("sfhsb763jbf@@gmail..com")).to.equal(false);
  });
});
