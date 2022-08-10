import { ApolloError } from "apollo-server";
import { Document, Model, UpdateQuery } from "mongoose";

/**
 * class Creator the main factory for creating new objects
 * @param {mongooseModel} model the mongoose model to create the objects from
 * @param {object} data the data to create the object from
 */
export class Creator<T extends Document> {
  model: Model<T>;
  data: T;
  updateQuery: UpdateQuery<T>;

  constructor(model: Model<T>, data: T) {
    this.model = model;
    this.data = data;
    this.updateQuery = {
      $set: this.data,
    };
  }

  async create() {
    const res = await new this.model(this.data).save();
    return res;
  }

  async findById() {
    const res = (await this.model.findById(this.data.id)) as T;
    this.#returnNotFound(res);
    return res;
  }

  async update() {
    const res = (await this.model.findByIdAndUpdate(
      this.data.id,
      this.updateQuery
    )) as T;
    this.#returnNotFound(res);
    return res;
  }

  async delete() {
    //validate if this.data has status property
    if (!this.data.hasOwnProperty("status")) {
      const res = await this.model.findByIdAndUpdate(this.data.id, {
        $set: {
          status: "INACTIVE",
        },
      });
      return res;
    }
    try {
      await this.model.findByIdAndDelete(this.data.id);
      return true;
    } catch (error) {
      throw new ApolloError(error, "500");
    }
  }

  async findAll(){
    const res = await this.model.find() as T[];
    this.#returnNotFound(res);
    return res;
  }

  #returnNotFound(value: T | T[]) {
    if (!value) {
      throw new ApolloError("Not found", "404");
    }
  }
}
