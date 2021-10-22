db = new Mongo().getDB('salessystem');

db.createCollection('roles', { capped: false });
db.createCollection('users', { capped: false });

const role =
  db.roles.findOne({ name: 'ADMIN' }) ||
  db.roles.insertOne({
    name: 'ADMIN',
    description: 'Administrador',
    isAdmin: true,
  });

db.users.findOne({ name: 'admin' }) ||
  db.users.insertOne({
    name: 'admin',
    fullName: 'Administrator',
    email: 'admin@admin.com',
    password: '$2b$10$LDgghD.HhTxU3pNEqTpHFuUvhKFQv3hc0WtbXmqs5mU8wkpZhBNgG',
    role: role.insertedId,
  });

db.resources.findOne({ name: 'users' }) ||
  db.resources.insertOne({
    name: 'users',
    translatedName: 'Usuários',
    availableActions: ['create', 'read', 'update', 'delete'],
  });

db.resources.findOne({ name: 'products' }) ||
  db.resources.insertOne({
    name: 'products',
    translatedName: 'Produtos',
    availableActions: ['create', 'read', 'update', 'delete'],
  });

db.resources.findOne({ name: 'clients' }) ||
  db.resources.insertOne({
    name: 'clients',
    translatedName: 'Clientes',
    availableActions: ['create', 'read', 'update', 'delete'],
  });

db.resources.findOne({ name: 'orders' }) ||
  db.resources.insertOne({
    name: 'orders',
    translatedName: 'Pedidos',
    availableActions: ['create', 'read', 'update', 'delete'],
  });

db.resources.findOne({ name: 'invoices' }) ||
  db.resources.insertOne({
    name: 'invoices',
    translatedName: 'Notas Fiscais',
    availableActions: ['create', 'read', 'update', 'delete'],
  });

db.resources.findOne({ name: 'roles' }) ||
  db.resources.insertOne({
    name: 'roles',
    translatedName: 'Nível de Acesso',
    availableActions: ['create', 'read', 'update', 'delete'],
  });
