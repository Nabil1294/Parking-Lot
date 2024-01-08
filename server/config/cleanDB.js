const mongoose = require('mongoose');

module.exports = async (collectionName) => {
  try {
    const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();

    if (collections.length > 0) {
      await mongoose.connection.db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};
