db = new Mongo().getDB('salessystem');

db.createCollection('roles', { capped: false });
db.createCollection('users', { capped: false });

const role =
  db.roles.findOne({ name: 'ROLE_ADMIN' }) ||
  db.roles.insertOne({
    name: 'ROLE_ADMIN',
    description: 'Administrador',
  });

db.users.findOne({ name: 'admin' }) ||
  db.users.insertOne({
    name: 'admin',
    fullName: 'Administrator',
    email: 'admin@admin.com',
    password: '$2b$10$LDgghD.HhTxU3pNEqTpHFuUvhKFQv3hc0WtbXmqs5mU8wkpZhBNgG',
    role: role.insertedId,
  });
