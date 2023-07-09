(function () {
  "use strict";

  //作成イベント
  const events_create = [
      'app.record.create.show',
      'app.record.edit.show'
  ];

  kintone.events.on(events_create, async (event) => {
    // フィールド名の項目を非活性にする
    event.record["フィールド名"].disabled = true;

    // テーブルのフィールドを全件非活性
    for (let i = 0; i < event.record["テーブル名"].value.length; i++) {
      event.record["テーブル名"].value[i].value["フィールド名"].disabled = true;
    }

    // テーブルのフィールドを全件非活性(forEachで書く場合)
    event.record["テーブル名"].value.forEach(function (row) {
      // 各請求予定日フィールドの非活性
      row.value["フィールド名"].disabled = true;
    });

  })

})();
