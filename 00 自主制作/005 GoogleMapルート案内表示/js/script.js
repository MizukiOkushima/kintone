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

    //作成・編集イベント
    kintone.events.on(events_create_edit, async (event) => {

        try {

            kintone.app.record.setFieldShown('iframeText', false);

            const iframeSpace = event.record['iframeText'].value;

            // 編集時にiframeSpaceにすでに検索結果のタグが挿入されている場合、再描写
            if (event.type == 'app.record.edit.show' && iframeSpace != undefined) {

                document.getElementById('user-js-iframeSpace').innerHTML = iframeSpace;

            }

            // 現在地取得ボタン設置
            let spaceElement = $("#user-js-currentLocation");

            const Kuc = Kucs["1.8.0"];

            const btnGetLocation = new Kuc.Button({
                text: '現在地取得',
                type: 'normal',
                id: 'btnGetLocation',
            });

            if (spaceElement.length) {

                // ボタン追加
                spaceElement.append(btnGetLocation);

            }

            // ボタンクリックイベント
            btnGetLocation.addEventListener("click", async () => {

                // ブラウザが位置情報取得に対応する場合
                if (navigator.geolocation) {

                    navigator.geolocation.getCurrentPosition(function (position) {

                        //レコード取得
                        let event = kintone.app.record.get();

                        //緯度
                        const latPosition = position.coords.latitude;

                        //経度
                        const lngPosition = position.coords.longitude;

                        //文字列結合
                        event.record['開始位置'].value = latPosition + ', ' + lngPosition;

                        // レコード追加イベントは非同期処理非対応のため、kintone.app.record.get/set
                        kintone.app.record.set(event);

                    });

                } else {

                    // ブラウザが位置情報取得に未対応の場合
                    window.alert('このブラウザーは位置情報取得に対応していません！');

                }

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

                iframe = `<iframe src="https://maps.google.co.jp/maps?output=embed&q=${endValue}" width="${width}" height="${height}" frameborder="0" style="border:0" allowfullscreen ></iframe>`;

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