const utils = {};

// Extract exact track link from user message
// utils.extractTrackLink = (userMessage) => {
//   const extractLinkRegex = /(http(s)?:\/\/)?(m\.)?soundcloud\.com(\S*)/i;
//   let extract = userMessage.match(extractLinkRegex);

//   if (extract instanceof Array) {
//     return extract[0];
//   } else {
//     return false;
//   }
// };

module.exports = utils;
