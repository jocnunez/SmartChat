var $ = require("jquery");

function getMessageBodyInput() {
  return $("#message-body-input");
}

function getSendMessage() {
  return $("#send-message");
}

function getTypingIndicator() {
  return $("#typing-indicator span");
}

let State = {
  typingMembers: undefined,
};

let Events = {
  onTyping: undefined,
};

function initialize(State) {
  State.typingMembers = new Set();
  getMessageBodyInput().on("keydown", function (e) {
    if (e.keyCode === 13) {
      getSendMessage().click();
    } else if (State.activeChannel) {
      Events.onTyping ? Events.onTyping() : "";
    }
  });
}

function onTyping(handler) {
  Events.onTyping = handler;
}

function addTypingMember(member) {
  State.typingMembers.add(member);
  updateTypingIndicator();
}

function deleteTypingMember(member) {
  State.typingMembers.delete(member);
  updateTypingIndicator();
}

function updateTypingIndicator() {
  var message = "Typing: ";
  var names = Array.from(State.typingMembers).slice(0, 3);

  if (State.typingMembers.size) {
    message += names.join(", ");
  }

  if (State.typingMembers.size > 3) {
    message += ", and " + (State.typingMembers.size - 3) + "more";
  }

  if (State.typingMembers.size) {
    message += "...";
  } else {
    message = "";
  }
  getTypingIndicator().text(message);
}

module.exports = {
  addTypingMember,
  deleteTypingMember,
  getMessageBodyInput,
  getSendMessage,
  initialize,
  onTyping,
};