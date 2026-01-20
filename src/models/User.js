import Model from './Model.js';

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static async findByEmail(email) {
    // Model.query() uses the connected knex instance access
    // Assuming Model.query() returns knex(tableName)
    return this.query().where({ email }).first();
  }
}

export default User;
