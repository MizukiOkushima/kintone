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

    // チェンジイベント
    const events_change_fields = [
        'app.record.create.change.左辺',
        'app.record.edit.change.左辺',
        'app.record.create.change.右辺',
        'app.record.edit.change.右辺'
    ];

    // ヘッダーに生成する計算フィールド
    const headerArray = ['加算', '減算', '乗算', '除算'];

    // 遅延処理用の予備実行タイマー
    let subSetTimeout;

    // 汎用エラーメッセージ
    const COMMON_ERROR_MESSAGE = 'エラーが発生しました。システム担当者に連絡してください。';

    //
    //　レコード作成・編集イベント
    //

    kintone.events.on(events_create_edit, (event) => {

        try {

            if ($('.gaia-argoui-app-edit-buttons').length && headerArray.length) {

                const customTags = '<div id="custom-area"></div>';

                $('.gaia-argoui-app-edit-buttons').eq(0).append(customTags);

                // 生成する計算フィールドタグ
                let fieldTags = "";

                for (let field of headerArray) {

                    fieldTags += `<div id="custom-content-${field}" class="custom-content"><p id="custom-content-title-${field}" class="custom-content-title">${field}</p><p id="custom-content-value-${field}" class="custom-content-value">0</p></div>`;

                }

                // 生成するタグを追加
                $('#custom-area').append(fieldTags);

                // 関数 計算フィールドの値を取得してHTMLタグに反映する ディレイ0
                setTimeout(updateHTMLTag, 0);

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

    //
    // チェンジイベント
    //

    kintone.events.on(events_change_fields, (event) => {

        if ($('.gaia-argoui-app-edit-buttons').length && headerArray.length) {

            // 予備用セットタイマーをクリア
            // セットしたタイマー（1000ms）の間に上乗せして実行するのを防ぐ
            clearTimeout(subSetTimeout);

            // 関数 計算フィールドの値を取得してHTMLタグに反映する ディレイ120ms
            // 計算フィールドは体感60ms〜80msで取得できているようなので、余裕を見て120msを指定
            setTimeout(updateHTMLTag, 120);

            // 関数 計算フィールドの値を取得してHTMLタグに反映する ディレイ1000ms
            // 予備用タイマーを実行することで、計算フィールドの値の反映が遅延されて表示が変化されないことを防ぐ
            subSetTimeout = setTimeout(updateHTMLTag, 1000);

        }

    });

    // 関数 計算フィールドの値を取得してHTMLタグに反映する
    function updateHTMLTag() {

        const event = kintone.app.record.get();

        // 計算フィールドの配列ループ
        for (let field of headerArray) {

            // 計算フィールドの値を取得 toLocaleString()を使用して3桁のカンマ区切り
            let fieldValue = event.record[field].value ? Number(event.record[field].value).toLocaleString() : "";

            // 空文字（計算結果が異常）の場合、Errorを表示
            if (!fieldValue) {
                fieldValue = `<span class="custom-error">Error</span>`;
            }

            // 生成したタグに計算フィールドの値を代入
            const targetTag = $('#custom-content-value-' + field);
            targetTag.html(fieldValue);

        }

    }

})();