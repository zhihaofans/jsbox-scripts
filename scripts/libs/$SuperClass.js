class SuperString extends String {
  constructor(_inputString) {
    super(_inputString);
  }
  format() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  }
}
module.exports = {
  SuperString
};
