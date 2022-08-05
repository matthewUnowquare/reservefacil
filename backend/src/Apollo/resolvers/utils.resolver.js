const resolver = {
  Data: {
    __resolveType(obj) {
      if (obj.message) {
        return "Error";
      }

      return "Auth";
    },
  },
  Auth: {
    password: async (obj) => {
      return ''
    }
  }
};

module.exports = {resolver}