const fs = require('fs').promises;
const path = require('path');

class LocalStorage {
  constructor() {
    this.dataDir = path.join(__dirname, '../../data');
    this.ensureDataDirectory();
  }

  async ensureDataDirectory() {
    try {
      await fs.access(this.dataDir);
    } catch {
      await fs.mkdir(this.dataDir, { recursive: true });
    }
  }

  getFilePath(tableName) {
    return path.join(this.dataDir, `${tableName}.json`);
  }

  async readData(tableName) {
    try {
      const filePath = this.getFilePath(tableName);
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist, return empty array
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async writeData(tableName, data) {
    const filePath = this.getFilePath(tableName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  async findAll(tableName, options = {}) {
    let data = await this.readData(tableName);
    
    if (options.where) {
      data = data.filter(item => {
        return Object.keys(options.where).every(key => {
          const condition = options.where[key];
          if (typeof condition === 'object' && condition[Symbol.for('op')]) {
            const op = condition[Symbol.for('op')];
            const value = condition[Symbol.for('value')];
            
            switch (op) {
              case 'eq':
                return item[key] === value;
              case 'ne':
                return item[key] !== value;
              case 'gt':
                return item[key] > value;
              case 'gte':
                return item[key] >= value;
              case 'lt':
                return item[key] < value;
              case 'lte':
                return item[key] <= value;
              case 'like':
                return item[key].toLowerCase().includes(value.toLowerCase());
              case 'iLike':
                return item[key].toLowerCase().includes(value.toLowerCase());
              case 'between':
                return item[key] >= value[0] && item[key] <= value[1];
              case 'in':
                return value.includes(item[key]);
              default:
                return item[key] === value;
            }
          }
          return item[key] === condition;
        });
      });
    }

    if (options.order) {
      data.sort((a, b) => {
        for (const [field, direction] of options.order) {
          const aVal = a[field];
          const bVal = b[field];
          if (aVal < bVal) return direction === 'ASC' ? -1 : 1;
          if (aVal > bVal) return direction === 'ASC' ? 1 : -1;
        }
        return 0;
      });
    }

    if (options.limit) {
      data = data.slice(0, options.limit);
    }

    return data;
  }

  async findByPk(tableName, id) {
    const data = await this.readData(tableName);
    const primaryKey = this.getPrimaryKey(tableName);
    return data.find(item => item[primaryKey] == id) || null;
  }

  async findOne(tableName, options = {}) {
    const results = await this.findAll(tableName, options);
    return results[0] || null;
  }

  async create(tableName, newItem) {
    const data = await this.readData(tableName);
    const primaryKey = this.getPrimaryKey(tableName);
    
    // Generate new ID
    const maxId = data.length > 0 ? Math.max(...data.map(item => item[primaryKey] || 0)) : 0;
    newItem[primaryKey] = maxId + 1;
    
    // Add timestamps
    const now = new Date().toISOString();
    newItem.created_at = now;
    newItem.updated_at = now;
    
    data.push(newItem);
    await this.writeData(tableName, data);
    return newItem;
  }

  async update(tableName, id, updateData) {
    const data = await this.readData(tableName);
    const primaryKey = this.getPrimaryKey(tableName);
    const index = data.findIndex(item => item[primaryKey] == id);
    
    if (index === -1) {
      throw new Error('Record not found');
    }
    
    updateData.updated_at = new Date().toISOString();
    data[index] = { ...data[index], ...updateData };
    await this.writeData(tableName, data);
    return data[index];
  }

  async destroy(tableName, id) {
    const data = await this.readData(tableName);
    const primaryKey = this.getPrimaryKey(tableName);
    const index = data.findIndex(item => item[primaryKey] == id);
    
    if (index === -1) {
      throw new Error('Record not found');
    }
    
    data.splice(index, 1);
    await this.writeData(tableName, data);
    return true;
  }

  async count(tableName, options = {}) {
    const data = await this.findAll(tableName, options);
    return data.length;
  }

  async sum(tableName, field, options = {}) {
    const data = await this.findAll(tableName, options);
    return data.reduce((sum, item) => sum + (item[field] || 0), 0);
  }

  getPrimaryKey(tableName) {
    const primaryKeys = {
      'Users': 'user_id',
      'Roles': 'role_id',
      'Products': 'product_id',
      'Categories': 'category_id',
      'Orders': 'order_id',
      'Order_Items': 'item_id',
      'Inventory': 'inventory_id',
      'Customers': 'customer_id',
      'Suppliers': 'supplier_id',
      'Payments': 'payment_id',
      'Reports': 'id',
      'audit_logs': 'log_id'
    };
    return primaryKeys[tableName] || 'id';
  }

  // Sequelize-like operators
  static Op = {
    eq: (value) => ({ [Symbol.for('op')]: 'eq', [Symbol.for('value')]: value }),
    ne: (value) => ({ [Symbol.for('op')]: 'ne', [Symbol.for('value')]: value }),
    gt: (value) => ({ [Symbol.for('op')]: 'gt', [Symbol.for('value')]: value }),
    gte: (value) => ({ [Symbol.for('op')]: 'gte', [Symbol.for('value')]: value }),
    lt: (value) => ({ [Symbol.for('op')]: 'lt', [Symbol.for('value')]: value }),
    lte: (value) => ({ [Symbol.for('op')]: 'lte', [Symbol.for('value')]: value }),
    like: (value) => ({ [Symbol.for('op')]: 'like', [Symbol.for('value')]: value }),
    iLike: (value) => ({ [Symbol.for('op')]: 'iLike', [Symbol.for('value')]: value }),
    between: (values) => ({ [Symbol.for('op')]: 'between', [Symbol.for('value')]: values }),
    in: (values) => ({ [Symbol.for('op')]: 'in', [Symbol.for('value')]: values }),
    or: (conditions) => ({ [Symbol.for('op')]: 'or', [Symbol.for('value')]: conditions })
  };
}

module.exports = new LocalStorage();
