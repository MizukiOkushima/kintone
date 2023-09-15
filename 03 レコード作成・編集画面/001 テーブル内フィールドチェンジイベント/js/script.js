(function () {

    'use strict'

    // レコード作成・編集イベント
    const events_create_edit = [
        'app.record.create.show',
        'app.record.edit.show'
    ];

    // テーブルチェンジイベント
    const events_change_table = [
        'app.record.create.change.テーブル',
        'app.record.edit.change.テーブル'
    ];

    // チェンジイベント（左辺、右辺、符号）
    const events_changes_table_values = [
        'app.record.create.change.左辺',
        'app.record.edit.change.左辺',
        'app.record.create.change.右辺',
        'app.record.edit.change.右辺',
        'app.record.create.change.符号',
        'app.record.edit.change.符号'
    ];


    // 汎用エラーメッセージ
    const COMMON_ERROR_MESSAGE = 'エラーが発生しました。システム担当者に連絡してください。';


    //
    //　レコード作成・編集イベント
    //

    kintone.events.on(events_create_edit, (event) => {

        try {

            // テーブル内フィールド非活性
            event.record["テーブル"].value.forEach(function (row) {
                // 計算結果のフィールド非活性
                row.value["計算結果"].disabled = true;
            });

            return event;

        } catch (error) {

            console.log(error);
            event.error = COMMON_ERROR_MESSAGE + '/n' + error.message;
            return event;

        }

    });


    //
    //  チェンジイベント（左辺、右辺、符号）
    //

    kintone.events.on(events_changes_table_values, (event) => {

        try {

            // テーブルの取得
            const tableData = event.record['テーブル'].value;

            // 編集イベントの既に作成済の列に関してはevent.changes.row.id取得が可能なため列を指定して処理実行
            if (event.changes.row.id != null) {

                const left_value = event.changes.row.value['左辺'].value;
                const right_value = event.changes.row.value['右辺'].value;
                const sign = event.changes.row.value['符号'].value;

                // 計算結果
                const sumValue = calculateSum(left_value, right_value, sign);

                if (sumValue !== undefined) {
                
                    // 計算結果フィールドに代入
                    event.changes.row.value['計算結果'].value = Number(sumValue);
                
                }

            } else {

                // event.changes.row.idが取得できない場合、テーブルの列をfor文で繰り返す
                for (let i = 0; i < tableData.length; i++) {
                
                    // 編集イベントで既に一度登録した列の場合idが取得でき、
                    // 列内に値を変更したフィールドはないためcontinueでfor文スキップ
                    if (tableData[i].id != null) {
                        continue;
                    }

                    const left_value = tableData[i].value['左辺'].value;
                    const right_value = tableData[i].value['右辺'].value;
                    const sign = tableData[i].value['符号'].value;

                    // 計算結果
                    const sumValue = calculateSum(left_value, right_value, sign);

                    if (sumValue !== undefined) {
                
                        // 計算結果フィールドに代入
                        tableData[i].value['計算結果'].value = Number(sumValue);
                
                    }
                
                }

            }

            function calculateSum(left_value, right_value, sign) {

                // フィールドの値がない場合、undefined
                if (left_value == undefined || right_value == undefined || sign == undefined) {
                    return undefined;
                }

                switch (sign) {
                    case '＋':
                        return left_value + right_value;
                    case 'ー':
                        return left_value - right_value;
                    case 'ｘ':
                        return left_value * right_value;
                    case '÷':
                        return left_value / right_value;
                    default:
                        return undefined;
                }
            }

            return event;


        } catch (error) {

            console.log(error);
            event.error = COMMON_ERROR_MESSAGE + '/n' + error.message;
            return event;

        }

    });


    //
    //  テーブルチェンジイベント
    //

    kintone.events.on(events_change_table, (event) => {

        try {

            // テーブル内フィールド非活性
            event.record["テーブル"].value.forEach(function (row) {
                // 計算結果のフィールド非活性
                row.value["計算結果"].disabled = true;
            });

            return event;

        } catch (error) {

            console.log(error);
            event.error = COMMON_ERROR_MESSAGE + '/n' + error.message;
            return event;

        }

    });

})();