const { getDeputyName } = require("./getDeputyName");
const { getDepMessages } = require("./getDepMessages");
const { getDepMessagesByJoin } = require("./getDepMessagesByJoin");
const { postDepMessages } = require("./postDepMessages");
const { answerDepMessage } = require("./answerDepMessage");

module.exports = {
  getDeputyName,
  getDepMessages,
  getDepMessagesByJoin,
  postDepMessages,
  answerDepMessage,
};
