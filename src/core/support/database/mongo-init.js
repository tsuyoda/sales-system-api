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

db.resources.findOne({ name: 'customers' }) ||
  db.resources.insertOne({
    name: 'customers',
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

db.resources.findOne({ name: 'providers' }) ||
  db.resources.insertOne({
    name: 'providers',
    translatedName: 'Fornecedores',
    availableActions: ['create', 'read', 'update', 'delete'],
  });

db.resources.findOne({ name: 'scores' }) ||
  db.resources.insertOne({
    name: 'scores',
    translatedName: 'Pontuações',
    availableActions: ['create', 'read', 'update', 'delete'],
  });

db.resources.findOne({ name: 'scoreLevels' }) ||
  db.resources.insertOne({
    name: 'scoreLevels',
    translatedName: 'Nível de pontuação',
    availableActions: ['create', 'read', 'update', 'delete'],
  });

db.resources.findOne({ name: 'benefits' }) ||
  db.resources.insertOne({
    name: 'benefits',
    translatedName: 'Benefícios',
    availableActions: ['create', 'read', 'update', 'delete'],
  });

db.resources.findOne({ name: 'orderManagement' }) ||
  db.resources.insertOne({
    name: 'orderManagement',
    translatedName: 'Gerenciamento de pedidos',
    availableActions: ['read', 'interact', 'notification'],
  });
