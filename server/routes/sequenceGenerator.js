const Sequence = require('../models/sequence');

class SequenceGenerator {
  constructor() {
    this.sequenceId = null;

    // Initialize sequence
    this.init();
  }

  async init() {
    try {
      const sequence = await Sequence.findOne(); // Use `await` instead of callback
      if (!sequence) {
        throw new Error('Sequence document not found');
      }
      this.sequenceId = sequence._id;
    } catch (err) {
      console.error('Failed to initialize sequence generator:', err);
    }
  }

  async nextId(collectionName) {
    try {
      const sequence = await Sequence.findOneAndUpdate(
        { _id: this.sequenceId },
        { $inc: { [`max${collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}Id`]: 1 } },
        { new: true, useFindAndModify: false } // Return updated sequence
      );

      if (!sequence) {
        throw new Error(`Sequence for ${collectionName} not found`);
      }

      return sequence[`max${collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}Id`];
    } catch (err) {
      console.error(`Failed to generate next ID for ${collectionName}:`, err);
      throw err;
    }
  }
}

module.exports = new SequenceGenerator();

