(function () {

    'use strict'

    // レコード作成・編集イベント
    const events_create_edit = [
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
    //　レコード作成・編集イベント
    //

    kintone.events.on(events_create_edit, (event) => {

        try {
            
            if($('.gaia-argoui-app-edit-buttons').length) {
                
                const customTags = '<div id="custom-area"><div id="custom-content-1"><p id="custom-content-1-title">test</p><p id="custom-content-1-value">123456</p></div></div>';
                $('.gaia-argoui-app-edit-buttons').eq(0).append(customTags);
            
            }

            return event;

        } catch (error) {

            console.log(error);
            event.error = COMMON_ERROR_MESSAGE + '/n' + error.message;
            return event;

        }

    });

    //
    // 一覧編集イベント
    //

    kintone.events.on(events_index_edit, (event) => {

        try {

            // 項目を比活性にする
            event.record['左辺'].disabled = true;
            event.record['右辺'].disabled = true;

            return event;

        } catch (error) {

            console.log(error);
            event.error = COMMON_ERROR_MESSAGE;

            return event;

        }

    });

})();