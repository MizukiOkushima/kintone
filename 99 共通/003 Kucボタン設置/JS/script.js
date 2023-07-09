(function () {
  // CDNを利用すること
  // https://unpkg.com/kintone-ui-component/umd/kuc.min.js
  // バージョン指定の場合
  // https://unpkg.com/kintone-ui-component@1.0.0/umd/kuc.min.js

  "use strict";

  // ヘッダー変数設定(レコード一覧画面の場合)
  let myHeaderMenuSpaceElement1 = kintone.app.getHeaderMenuSpaceElement();

  // ヘッダー変数設定(レコード詳細画面の場合)
  let myHeaderMenuSpaceElement2 = $(".gaia-argoui-app-toolbar-statusmenu");

  const Kuc = Kucs["1.8.0"];
  const btnDownload = new Kuc.Button({
    text: text,
    type: type,
    id: id,
  });

  // レコード詳細画面の場合、前後レコード移動ボタンを押すと、
  // 前ページで読み込んだボタンが残ってしまうので初期化する
  if ($("#btnDownload").length) {
    $("#btnDownload").remove();
  }

  // ボタン追加
  myHeaderMenuSpaceElement2.append(btnDownload);

  // ボタンクリックイベント
  btnDownload.addEventListener("click", async () => {
    // 処理内容
  });

})();
