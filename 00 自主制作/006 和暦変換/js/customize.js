(() => {

    'use strict'

    if (window == null || window == undefined) {
        return
    }

    // チェンジイベント
    const events_change_westernCalendar = [
        'app.record.create.change.西暦',
        'app.record.edit.change.西暦',
    ];

    // 作成・編集イベント
    const events_create_edit = [
        'app.record.create.show',
        'app.record.edit.show'
    ];

    //レコード詳細表示イベント
    const eventEditDetail = [
        'app.record.detail.show'
    ];

    // 汎用エラーメッセージ
    const COMMON_ERROR_MESSAGE = 'エラーが発生しました。システム担当者に連絡してください。';

    //
    //  チェンジイベント
    //

    kintone.events.on(events_change_westernCalendar, (event) => {

        try {

            // 西暦の取得
            const western_calendar = event.record['西暦'].value;

            // Date型チェック
            const dateCheck = new Date(western_calendar);
            if (isNaN(dateCheck.getDate())) {

                throw new Error("西暦を正しく入力してください。");

            };

            // 西暦の年月日 Number型へ変換でゼロ詰め
            let date_year = Number(western_calendar.slice(0, 4));
            let date_month = Number(western_calendar.slice(5, 7));
            let date_day = Number(western_calendar.slice(8, 10));

            // クラスのインスタンスを生成
            const converter = new JapaneseEraConverter();

            // 和暦変換
            const japanese_era = converter.convertToJapaneseEra(date_year, date_month, date_day);

            // 返ってきた値
            const era_name = japanese_era.年号;
            const era_year = japanese_era.年;
            const month = japanese_era.月;
            const day = japanese_era.日;

            // 各フィールドに代入
            event.record['和暦'].value = era_name;
            event.record['年'].value = era_year;
            event.record['月'].value = month;
            event.record['日'].value = day;

            // 和暦フィールドに文字列結合した値を代入
            event.record['和暦年月日'].value = era_name + era_year + "年" + month + "月" + day + "日";

            return event;

        } catch (error) {

            console.log(error);
            event.error = COMMON_ERROR_MESSAGE + '/n' + error.message;
            return event;

        }

    });

    //
    // 作成・編集イベント
    //

    kintone.events.on(events_create_edit, async (event) => {

        // 各フィールドの非活性
        event.record['和暦'].disabled = true;
        event.record['年'].disabled = true;
        event.record['月'].disabled = true;
        event.record['日'].disabled = true;
        event.record['和暦年月日'].disabled = true;

    });

    //
    //  レコード詳細表示イベント
    //

    kintone.events.on(eventEditDetail, async (event) => {

        // 「年」ラベル非表示
        document.getElementsByClassName('control-label-field-gaia')[0].style.display = 'none';

        // 各フィールドの非活性
        event.record['西暦'].disabled = true;
        event.record['和暦'].disabled = true;
        event.record['年'].disabled = true;
        event.record['月'].disabled = true;
        event.record['日'].disabled = true;
        event.record['和暦年月日'].disabled = true;

    });

})();