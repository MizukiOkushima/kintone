(function () {

    'use strict'

    // レコード作成・編集イベント
    const events_create_edit = [
        'app.record.create.show',
        'app.record.edit.show'
    ];

    // 汎用エラーメッセージ
    const COMMON_ERROR_MESSAGE = 'エラーが発生しました。システム担当者に連絡してください。';


    //
    //　レコード作成・編集イベント
    //

    kintone.events.on(events_create_edit, (event) => {

        try {

            // 項目を非活性にする
            event.record['左辺'].disabled = true;
            event.record['右辺'].disabled = true;


            return event;

        } catch (error) {

            console.log(error);
            event.error = COMMON_ERROR_MESSAGE + '/n' + error.message;
            return event;

        }

    });



})();