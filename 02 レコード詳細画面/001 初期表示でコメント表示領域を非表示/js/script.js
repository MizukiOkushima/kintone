(function () {

  'use strict'

  //詳細画面表示
  const events_show = [
    'app.record.detail.show'
  ];

  /**
   *  詳細画面表示
   */

  kintone.events.on(events_show, async (event) => {

    //コメント入力領域をページ読み込み時に非表示
    hiddenSidebar();

  });

  // 関数 コメント入力領域を非表示
  function hiddenSidebar() {

      const url = window.location;

      // 本来URLSearchParamsはURLパラメーターに使用するが、'='と'&'の判定が容易なため使用
      // →ただしURLハッシュの先頭の文字'#'は無視されないため、URLハッシュの先頭の1文字目の除外処理をする
      const params = new URLSearchParams(url.hash.slice(1));
      const paraName = 'tab';
      const paraValue = 'none';

      // リロード対策。既に'tab'パラメーターが存在していれば何もしない
      if (params.has(paraName)) {
          return;
      }

      // サイドバーのスタイル変更
      const sidebar = document.getElementsByClassName('gaia-argoui-app-show-sidebar-dragged')[0];
      sidebar.style.display = paraValue;

      // 'tab'パラメータをセットして、URLハッシュを更新する
      params.set(paraName, paraValue);
      url.hash = params.toString();

  }

}());
