const localStorage = require('../utils/localStorage');

class LocalModel {
  constructor(tableName, primaryKey) {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
  }

  async findAll(options = {}) {
    return await localStorage.findAll(this.tableName, options);
  }

  async findByPk(id) {
    return await localStorage.findByPk(this.tableName, id);
  }

  async findOne(options = {}) {
    return await localStorage.findOne(this.tableName, options);
  }

  async create(data) {
    return await localStorage.create(this.tableName, data);
  }

  async update(data, options = {}) {
    if (options.where && options.where[this.primaryKey]) {
      return await localStorage.update(this.tableName, options.where[this.primaryKey], data);
    }
    throw new Error('Update requires where condition with primary key');
  }

  async destroy(options = {}) {
    if (options.where && options.where[this.primaryKey]) {
      return await localStorage.destroy(this.tableName, options.where[this.primaryKey]);
    }
    throw new Error('Destroy requires where condition with primary key');
  }

  async count(options = {}) {
    return await localStorage.count(this.tableName, options);
  }

  async sum(field, options = {}) {
    return await localStorage.sum(this.tableName, field, options);
  }

  // Static methods for direct access
  static async findAll(options = {}) {
    return await localStorage.findAll(this.tableName, options);
  }

  static async findByPk(id) {
    return await localStorage.findByPk(this.tableName, id);
  }

  static async findOne(options = {}) {
    return await localStorage.findOne(this.tableName, options);
  }

  static async create(data) {
    return await localStorage.create(this.tableName, data);
  }

  static async update(data, options = {}) {
    if (options.where && options.where[this.primaryKey]) {
      return await localStorage.update(this.tableName, options.where[this.primaryKey], data);
    }
    throw new Error('Update requires where condition with primary key');
  }

  static async destroy(options = {}) {
    if (options.where && options.where[this.primaryKey]) {
      return await localStorage.destroy(this.tableName, options.where[this.primaryKey]);
    }
    throw new Error('Destroy requires where condition with primary key');
  }

  static async count(options = {}) {
    return await localStorage.count(this.tableName, options);
  }

  static async sum(field, options = {}) {
    return await localStorage.sum(this.tableName, field, options);
  }
}

module.exports = LocalModel;
