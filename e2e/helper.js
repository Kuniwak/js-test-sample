var Fs = require('fs');
var Path = require('path');



// afterEach フックから失敗時にスクリーンショットを作成する関数。
// スクリーンショットは環境変数 SCREENSHOT_OUT へ保存される。
//
// 使い方は、WebDriverインスタンスを持つ context オブジェクトを引数にして、
// afterEach フックに関数を登録するだけ:
//
//   afterEach(takeScreenshotIfFailed(context));
//
module.exports = function takeScreenshotIfFailed(context) {
  // 環境変数が設定されていなければ何もしない関数を返す。
  if (!process.env.SCREENSHOT_OUT) {
    return function() {};
  }


  // afterEach フックへ登録される関数。
  return function() {
    // テストケースの名前からスクリーンショットのファイル名を作成する。
    var basename = encodeURIComponent(this.currentTest.fullTitle()) + '.png';
    var filePath = Path.join(process.env.SCREENSHOT_OUT, basename);

    // スクリーンショットを取得する。取得された画像は、takeScreenshot の返す
    // Promise から、Base64 エンコードされた文字列として取り出せる。
    return context.driver.takeScreenshot()
      .then(function(image) {
        // 環境変数で指定されたディレクトリの配下に画像を保存する。
        Fs.writeFileSync(filePath, image, { encoding: 'base64' });
      });
  };
};
