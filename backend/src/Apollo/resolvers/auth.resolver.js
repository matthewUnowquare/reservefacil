const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const { createToken } = require("../../utils/token");
const resolver = {
  Query: {
    Login: async (_, args) => {
      const { email, password } = args;
      const user = await userModel.findOne({ email });
      return returnUser({ user, validatePassword: true, password });
    },
    me: async (_, args) => {
      const { email } = args;
      const user = await userModel.findOne({ email });
      return returnUser({ user });
    },
  },
  Mutation: {
    Register: async (_, args) => {
      const { name, email, password } = args;
      const user = await userModel.findOne({ email });

      if (user) {
        return {
          success: false,
          data: { message: "User already exists" },
          code: 400,
        };
      }
      const newUser = new userModel({
        name,
        email,
        password,
      });
      const result = await newUser.save();
      returnUser({ user: result, password });
    },
  },
};

const returnUser = async ({ user, validatePassword = false, password }) => {
  if (user) {
    if (validatePassword) {
      if (!bcrypt.compareSync(password, user.password)) {
        return {
          __typename: "Error",
          success: false,
          data: { message: "Invalid credentials" },
          code: 401,
        };
      }
      const token = await createToken(user);
      return {
        __typename: "Auth",
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          token,
        },
        code: 200,
      };
    }
    return {
      __typename: "Error",
      success: false,
      data: { message: "Invalid credentials" },
      code: 401,
    };
  }
};

module.exports = { resolver };
