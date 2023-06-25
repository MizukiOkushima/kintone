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
    document.getElementsByClassName('gaia-argoui-app-show-sidebar-dragged')[0].style.display = "none";
    location.replace(document.URL + "&tab=none");
  });

}());