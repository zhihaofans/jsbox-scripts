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
  copy(locally = true, ttl = 30) {
    $clipboard.copy({
      text: this,
      ttl: ttl,
      locally: locally
    });
  }
}
module.exports = {
  SuperString
};
