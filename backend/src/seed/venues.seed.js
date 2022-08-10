const faker = require("faker");
faker.locale = "es_MX";
const Hotel = require("../models/HotelsModel");
const dotenv = require("dotenv").config();

const connectDB = require("../config/db");

const config = {
  url: "mongodb://localhost:27017/",
}

connectDB(config);


const createHotels = async (quantity = 50) => {
  const Hotels = [];
  try {
    console.log("Creating Hotels...");
    for (let i = 0; i < quantity; i++) {
      const Hotel = new Hotel({
        name: faker.company.companyName(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
      });
      Hotels.push(Hotel);
      await new Hotel(Hotel).save();
    }
    return {
        success: true,
        message: `${quantity} hotel created successfully`,
        data: Hotels,
    }
  } catch (error) {
    console.log(error);
  }
};

console.log(createHotels(30));
