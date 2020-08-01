const takeShot = require('./takeShot');

const twipic = {};

twipic.make = (imagePath, data = {}) => {
  return takeShot.take(imagePath, data);
};

module.exports = twipic;
