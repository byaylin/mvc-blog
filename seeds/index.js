
const seedPost = require('./post-seed');
const seedComments = require('./comment-seed');
const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedPost();
  console.log('\n----- POSTS SEEDED -----\n');
  await seedComments();
  console.log('\n----- COMMENTS SEEDED -----\n');
  process.exit(0);
};

seedAll();