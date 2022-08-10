const { ApolloError } = require("apollo-server");

/**
 * class Creator the main factory for creating new objects
 * @param {mongooseModel} model the mongoose model to create the objects from
 * @param {object} data the data to create the object from
 */
module.exports = class Creator {
  model;
  data;
  //   updateQuery: UpdateQuery<T>;

  constructor(model, data) {
    this.model = model;
    this.data = data;
    // this.updateQuery = {
    //   $set: this.data,
    // };
  }

  /**
   * create a new object in the database
   * @returns {Promise<T>} the created object
   */
  async create() {
    const res = await new this.model(this.data).save();
    return res;
  }

  /**
   * find an object by id
   * @returns {Promise<T>} the created object
   */
  async findById() {
    const res = await this.model
      .findById(this.data.id)
      .$where("this.status == 'ACTIVE'");
    this.returnNotFound(res);
    return res;
  }

  /**
   * find by a specific property
   * @param {*} attribute the attribute to search for
   * @returns return the found object based on the attribute
   * @throws {ApolloError} if no object is found or attribute is not in the model
   * @example
   * const res = new Creator(Model, { city: "London" });
   * return res.findBy("city") //returns all objects with the city London
   */
  async findBy(attribute) {
    if (this.model.hasOwnProperty(attribute) || !this.data[attribute])
      throw new ApolloError("Attribute is not in model", "500");
    const reg = new RegExp(this.data[attribute], "i");
    const res = await this.model.find({ [attribute]: reg, status: "ACTIVE" });
    this.returnNotFound(res);
    return res;
  }

  /**
   * find all objects in the database
   * @returns {Promise<T>} all the objects in the database
   */
  async findAll() {
    const res = await this.model.find({ status: "ACTIVE" });
    this.returnNotFound(res);
    return res;
  }

  /**
   * update an object in the database
   * @returns {Promise<T>} the updated object
   * @throws {ApolloError} if no object is found or attribute is not in the model
   * @example
   * const res = new Creator(Model, { id: "5e8f8f8f8f8f8f8f8f8f8f8f", city: "London" });
   * return res.update() //returns the updated object
   * @example
   * //id is not in the model
   * const res = new Creator(Model, { id: "4e8f8f8f8f8f8f8f8f8f8f8f", city: "London" });
   * return res.update() //throws an error
   */
  async update() {
    const res = await this.findById();

    Object.keys(this.data).forEach((key) => {
      res[key] = this.data[key];
    });
    return await res.save();
  }

  /**
   * inactive an object in the database if property status is not in model then delete the object
   * @returns {Promise<T>} the deleted object
   * @throws {ApolloError} if no id is found or attribute is not in the model
   * @example
   * const res = new Creator(Model, { id: "5e8f8f8f8f8f8f8f8f8f8f8f" });
   * return res.inactive() //returns the object with the id 5e8f8f8f8f8f8f8f8f8f8f and the status INACTIVE
   * @example
   * //id is not in the model
   * const res = new Creator(Model, { id: "4e8f8f8f8f8f8f8f8f8f8f8f" });
   * return res.inactive() //throws an error
   */
  async delete() {
    //validate if this.data has status property
    if (!this.data.hasOwnProperty("status")) {
      const res = await this.findById();
      res.status = "INACTIVE";
      return await res.save();
    }
    try {
      await this.model.findByIdAndDelete(this.data.id);
      return true;
    } catch (error) {
      throw new ApolloError(error, "500");
    }
  }

  /**
   * return an error if no object is found, otherwise return the object, used for findById and findBy
   * @param {T} res the found object
   * @throws {ApolloError} if no object is found
   * @example
   * const res = new Creator(Model, { id: "5e8f8f8f8f8f8f8f8f8f8f8f" });
   * return res.findById() //returns the object with the id 5e8f8f8f8f8f8f8f8f8f8f
   * @example
   * //id is not in the model
   * const res = new Creator(Model, { id: "4e8f8f8f8f8f8f8f8f8f8f8f" });
   * return res.findById() //throws an error
   */
  returnNotFound(value) {
    if (Array.isArray(value) && value.length === 0) {
      throw new ApolloError("Object not found", "404");
    }
    if (!value) {
      throw new ApolloError("Not found", "404");
    }
  }
};
