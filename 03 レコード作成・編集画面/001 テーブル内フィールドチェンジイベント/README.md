# テーブル内フィールドチェンジイベント
## 概要
テーブル内のフィールドチェンジイベントにて、値が変更された列を取得して処理を行う<br>

## 設定フィールド
| Type | 必須 | フィールド名 | フィールドコード or 要素ID | 初期値 | 設定値 |
| --- | --- | --- | --- | --- | --- |
| SUBTABLE | - | テーブル | テーブル | - | - |
| NUMBER | ◯ | 左辺 | 左辺 | 0 | - |
| DROP_DOWN | ◯ | 符号 | 符号 | - | ＋, ー, ｘ, ÷ |
| NUMBER | ◯ | 右辺 | 右辺 | 0 | - |
| NUMBER | - | 計算結果 | 計算結果 | - | - |

## 解説
何列目のフィールドでチェンジイベントが着火したかはevent.changes.row.idから取得可能<br>
ただし、idは既に登録されたレコードの列のみ値があるため、<br>
新規レコード作成や、編集画面で「＋」ボタンから追加した列に関してはidの値はない<br>
条件分岐にて全列に対して処理を行わず最小限の処理で行う処理を実装した<br>

```JavaScript
// 編集イベントの既に作成済の列に関してはevent.changes.row.id取得が可能なため列を指定して処理実行
if (event.changes.row.id != null) {

    // idありの列の処理

} else {

    // event.changes.row.idが取得できない場合、テーブルの列をfor文で繰り返す
    for (let i = 0; i < tableData.length; i++) {
    
        // 編集イベントで既に一度登録した列の場合idが取得でき、
        // 列内に値を変更したフィールドはないためcontinueでfor文スキップ
        if (tableData[i].id != null) {
            continue;
        }

        // idなしの列の処理
    
    }

}
```


## 参考文献
サブテーブルの追加行を特定したい<br>
https://community.cybozu.dev/t/topic/1043?_gl=1*1njy3p6*_ga*MTkxNTk3MzIzMi4xNjU2NjM4OTQ3*_ga_Z03HX98WC8*MTY5NDU5MDQ5OS4xNjAuMS4xNjk0NTkxOTA1LjYwLjAuMA..<br>
<br>
https://www.digitalocean.com/community/tutorials/js-filter-array-method-ja<br>
<br>

## イメージ
![スクリーンショット 2023-09-15 22 41 00](https://github.com/MizukiOkushima/kintone/assets/95268598/f644a743-284b-4c25-b65c-fa28109e977e)
