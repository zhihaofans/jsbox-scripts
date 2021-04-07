const $$ = require("$$");
if ($$.Share.isActionOrSafari()) {
  const shareLink = $$.Share.getLink();
  if (shareLink) {
    $app.openURL(shareLink);
  } else {
    $console.error("shareLink is undefined");
    $app.close();
  }
} else {
  $console.error("no share");
  $app.close();
}
