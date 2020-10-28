let autoInstallScript = (url, name) => {
  $addin.save({
    name: name,
    data: $data({
      string: "$ui.alert('Hey!')"
    }),
    handler: function (success) {

    }
  });
};
let downloadScripts = (url, name) => {
  $http.download({
    url: url,
    progress: function (bytesWritten, totalBytes) {
      var percentage = bytesWritten * 1.0 / totalBytes
    },
    handler: function (resp) {}
  });

}
module.exports = {
  sayHello: sayHello
}