(function () {
  "use strict";

  //一覧画面表示
  const events_show = ["app.record.index.show"];

  /**
   *  一覧画面表示
   */

  kintone.events.on(events_show, async (event) => {

    // テーブル レコード編集・削除にタイトルをつける

    // 表の最終thを指定
    let targetTh = document.querySelectorAll("table th:last-child");

    // 追加用タグ 他のthは並び替え用ボタン機能のdivタグがあるため省略し、marginとpaddingのみ省いたdivタグからstyleを指定
    const thTag = `
      <div class="recordlist-header-cell-inner-wrapper-gaia">
          <div class="recordlist-header-cell-inner-gaia">
              <span class="recordlist-header-label-gaia">タイトル</span>
          </div>
      <div>
    `;

    // メインのthと追従用のthにタグを追加する
    targetTh[0].innerHTML = thTag;
    targetTh[1].innerHTML = thTag;

  });

})();