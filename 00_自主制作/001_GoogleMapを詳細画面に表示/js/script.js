(function () {

    "use strict";

    // 作成・編集イベント
    const events_create_edit = [
        'app.record.create.show',
        'app.record.edit.show',
        'app.record.index.edit.show'
    ];

    // 詳細画面表示
    const events_show = [
        'app.record.detail.show'
    ];

    // 一覧編集イベント
    const events_index_edit = [
        'app.record.index.edit.show'
    ];

    // チェンジイベント
    const events_change_mojiSearch = [
        'app.record.create.change.文字列検索',
        'app.record.edit.change.文字列検索'
    ];

    // 汎用エラーメッセージ
    const COMMON_ERROR_MESSAGE = 'エラーが発生しました。システム担当者に連絡してください。';

    //作成・編集イベント
    kintone.events.on(events_create_edit, (event) => {

        try {

            kintone.app.record.setFieldShown('iframeText', false);

            return event;

        } catch (error) {

            console.log(error);
            event.error = COMMON_ERROR_MESSAGE;

            return event;
        }

    });

    //一覧編集イベント
    kintone.events.on(events_index_edit, (event) => {

        try {

            event.record['文字列検索'].disabled = true;

            event.record['iframeText'].disabled = true;

            return event;

        } catch (error) {

            console.log(error);
            event.error = COMMON_ERROR_MESSAGE;

            return event;
        }

    });

    // 詳細画面表示
    kintone.events.on(events_show, (event) => {

        try {

            let iframeText = '';
            iframeText = event.record.iframeText.value;
            const iframeSpace = kintone.app.record.getSpaceElement('iframeSpace');
            iframeSpace.insertAdjacentHTML('beforeend', iframeText);
            //外部サイトの埋め込みタグ（iframe）を入力するためのフィールドを非表示にする
            kintone.app.record.setFieldShown('iframeText', false);

        } catch (error) {

            console.log(error);
            event.error = COMMON_ERROR_MESSAGE;

        }

    });

    // チェンジイベント
    kintone.events.on(events_change_mojiSearch, (event) => {

        try {

            const searchValue = event.record['文字列検索'].value;

            const iframe = `<iframe src="https://maps.google.co.jp/maps?output=embed&q=${searchValue}" width="900" height="600" frameborder="0" style="border:0" allowfullscreen ></iframe>`;

            event.record['iframeText'].value = iframe;

            const iframeText = event.record['iframeText'].value;

            if(document.getElementById('user-js-iframeSpace').hasChildNodes()) {
                
                document.getElementById('user-js-iframeSpace').innerHTML = ``;

            }
            
            const iframeSpace = kintone.app.record.getSpaceElement('iframeSpace');
            
            iframeSpace.insertAdjacentHTML('beforeend', iframeText);

            return event;

        } catch (error) {

            console.log(error);
            event.error = COMMON_ERROR_MESSAGE;

            return event;

        }

    });

})();