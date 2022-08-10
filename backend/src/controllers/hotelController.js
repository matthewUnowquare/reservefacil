const Creator = require("./Creator");

class Hotel extends Creator {
  constructor(model, data) {
    super(model, data);
  }
  async findBy() {
    const res = await this.model.find({ name: this.data.name });
    this.returnNotFound(res);
    return res;
  }
}
