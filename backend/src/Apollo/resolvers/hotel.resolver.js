const HotelModel = require("../../models/hotelsModel");
const { ApolloError } = require("apollo-server");
const ErrorMessages = require("../../constants/Errors");
const Creator = require("../../controllers/Creator");

const resolver = {
  Query: {
    searchHotels: async (_, args) => {
      const res = new Creator(HotelModel, args);
      return await res.findBy("name");
    },
    getHotels: async (_, _1) => {
      const Hotels = new Creator(HotelModel, {});
      return await Hotels.findAll();
    },
    getHotel: async (root, args) => {
      const Hotel = new Creator(HotelModel, { id: args.id });
      return await Hotel.findById();
    },
    getHotelByCity: async (_, args) => {
      const res = new Creator(HotelModel, { city: args.city });
      return await res.findBy("city");
    },
  },
  Mutation: {
    createHotel: async (_, args) => {
      const Hotel = new Creator(HotelModel, args);
      return await Hotel.create();
    },
    updateHotel: async (_, args) => {
      const Hotel = new Creator(HotelModel, args);
      return await Hotel.update();
    },
    deleteHotel: async (_, args) => {
      const Hotel = new Creator(HotelModel, args);
      return await Hotel.delete();
    },
  },
};

const updateHotel = async (Hotel, args) => {
  Hotel = {
    ...Hotel,
    ...args,
  };
  await Hotel.save();
  return Hotel;
};

const returnNotFound = (Hotel) => {
  if (!Hotel) throw new ApolloError("Hotel not found", ErrorMessages.NOT_FOUND);
  return;
};

module.exports = resolver;
