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

    const thTag = `
      <div class="recordlist-header-cell-inner-wrapper-gaia"><span class="recordlist-header-label-gaia" style="margin-right: -5px;
padding: 6px 8px;">ここ</span><div>
    `;

    // メインのthと追従用のthにタグを追加する
    targetTh[0].innerHTML = thTag;
    targetTh[1].innerHTML = thTag;

    return event;

  });

})();