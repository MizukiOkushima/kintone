(function () {

    "use strict";

    // 作成・編集イベント
    const events_create_edit = [
        'app.record.create.show',
        'app.record.edit.show'
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
    const events_change_Search = [
        'app.record.create.change.開始位置',
        'app.record.edit.change.開始位置',
        'app.record.create.change.終了位置',
        'app.record.edit.change.終了位置',
        'app.record.create.change.縮尺率',
        'app.record.edit.change.縮尺率'
    ];

    // 汎用エラーメッセージ
    const COMMON_ERROR_MESSAGE = 'エラーが発生しました。システム担当者に連絡してください。';
    const COMMON_BROWSER_INCOMPATIBLE = 'このブラウザは位置情報取得に対応していません！';

    //作成・編集イベント
    kintone.events.on(events_create_edit, async (event) => {

        try {

            kintone.app.record.setFieldShown('iframeText', false);

            const iframeSpace = event.record['iframeText'].value;

            // 編集時にiframeSpaceにすでに検索結果のタグが挿入されている場合、再描写
            if (event.type == 'app.record.edit.show' && iframeSpace != undefined) {

                document.getElementById('user-js-iframeSpace').innerHTML = iframeSpace;

            }

            // 現在地取得ボタン、クリアボタン設置
            let startElement = $("#user-js-startLocation");
            let endElement = $("#user-js-endLocation");

            const Kuc = Kucs["1.8.0"];

            const btnGetStartLocation = new Kuc.Button({
                text: '現在地取得',
                type: 'submit',
                id: 'btnGetStartLocation'
            });

            const btnClearStartValue = new Kuc.Button({
                text: 'クリア',
                type: 'alert',
                id: 'btnClearStartValue'
            });

            const btnGetEndLocation = new Kuc.Button({
                text: '現在地取得',
                type: 'submit',
                id: 'btnGetEndLocation'
            });

            const btnClearEndValue = new Kuc.Button({
                text: 'クリア',
                type: 'alert',
                id: 'btnClearEndValue'
            });

            if (startElement.length) {

                // ボタン追加
                startElement.append(btnGetStartLocation);
                startElement.append(btnClearStartValue);

            }

            if (endElement.length) {

                // ボタン追加
                endElement.append(btnGetEndLocation);
                endElement.append(btnClearEndValue);

            }

            // 現在地取得処理
            function updateLocation(field, errorMessage) {

                if (navigator.geolocation) {

                    navigator.geolocation.getCurrentPosition(async (position) => {

                        //レコード取得
                        const event = kintone.app.record.get();
                        //緯度
                        const latPosition = position.coords.latitude;
                        //経度
                        const lngPosition = position.coords.longitude;

                        //文字列結合
                        event.record[field].value = `${latPosition}, ${lngPosition}`;

                        // レコード追加イベントは非同期処理非対応のため、kintone.app.record.get/set
                        kintone.app.record.set(event);

                    });

                } else {

                    // ブラウザが位置情報取得に未対応の場合
                    window.alert(errorMessage);

                }
            }

            // クリア処理
            function clearLocationValue(field) {

                // レコード取得
                const event = kintone.app.record.get();

                // クリア
                event.record[field].value = undefined;

                // レコード更新
                kintone.app.record.set(event);

            }

            btnGetStartLocation.addEventListener("click", () => {
                updateLocation('開始位置', COMMON_BROWSER_INCOMPATIBLE);
            });

            btnClearStartValue.addEventListener("click", () => {
                clearLocationValue('開始位置');
            });

            btnGetEndLocation.addEventListener("click", () => {
                updateLocation('終了位置', COMMON_BROWSER_INCOMPATIBLE);
            });

            btnClearEndValue.addEventListener("click", () => {
                clearLocationValue('終了位置');
            });

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

            event.record['開始位置'].disabled = true;

            event.record['終了位置'].disabled = true;

            event.record['縮尺率'].disabled = true;

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
    kintone.events.on(events_change_Search, (event) => {

        try {

            // 生成する地図のサイズ指定
            const width = 900;
            const height = 600;

            const zoom = event.record['縮尺率'].value;
            const startValue = event.record['開始位置'].value;
            const endValue = event.record['終了位置'].value;

            let iframe;

            if (startValue != undefined && endValue != undefined) {

                iframe = `<iframe src="https://maps.google.co.jp/maps?output=embed&saddr=${startValue}&daddr=${endValue}&z=${zoom}" width="${width}" height="${height}" frameborder="0" style="border:0" allowfullscreen ></iframe>`;

            } else if (startValue == undefined && endValue != undefined) {

                iframe = `<iframe src="https://maps.google.co.jp/maps?output=embed&q=${endValue}&z=${zoom}" width="${width}" height="${height}" frameborder="0" style="border:0" allowfullscreen ></iframe>`;

            } else {

                iframe = ``;
            }


            event.record['iframeText'].value = iframe;

            const iframeText = event.record['iframeText'].value;

            if (document.getElementById('user-js-iframeSpace').hasChildNodes()) {

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