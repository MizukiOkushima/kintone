(function () {
  "use strict";

  //レコード作成・編集イベント
  const events_create = [
    'app.record.create.show',
    'app.record.edit.show'
  ];

  // 一覧編集イベント
  const events_index_edit = [
    'app.record.index.edit.show'
  ];

  // 汎用エラーメッセージ
  const COMMON_ERROR_MESSAGE = 'エラーが発生しました。システム担当者に連絡してください。';

  //
  // レコード作成・編集イベント
  //
  kintone.events.on(events_create, async (event) => {

    try {

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

      return event;

    } catch (error) {

      console.log(error);
      event.error = COMMON_ERROR_MESSAGE;

      return event;
    
    }

  });


  //
  // 一覧編集イベント
  // 
  kintone.events.on(events_index_edit, (event) => {

    try {

      // フィールド名の項目を比活性にする
      event.record['フィールド'].disabled = true;

      return event;

    } catch (error) {

      console.log(error);
      event.error = COMMON_ERROR_MESSAGE;

      return event;
      
    }

  });

})();