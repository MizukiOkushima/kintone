(function () {
  "use strict";

  //一覧画面表示
  const events_show = ["app.record.index.show"];

  /**
   *  一覧画面表示
   */

  kintone.events.on(events_show, async (event) => {

    // テーブル レコード編集・削除にタイトルをつける

    // 追記タイトル
    const title = 'タイトル';

    // 追加用タグ
    const thTag = `
      <div class="recordlist-header-cell-inner-wrapper-gaia">
          <div class="recordlist-header-cell-inner-gaia">
              <span class="recordlist-header-label-gaia">${title}</span>
          </div>
      <div>
    `;

    // 表の最終thを指定
    let targetTh = document.querySelectorAll("table th:last-child");

    // メインのthと追従用のthの2つにタグを追加
    if (targetTh.length !== 0) {
      for (let target of targetTh) {
        if (target.childNodes.length === 0) {
          target.style.width = '78px';
          target.innerHTML = thTag;
        }
      }
    }

  });

})();