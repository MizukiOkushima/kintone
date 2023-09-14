# 和暦変換
## 概要
kintoneで使用できる「日付」フィールドを元に、和暦へ変換可能なライブラリを作成する<br>

## 設定フィールド
| Type | 必須 | フィールド名 | フィールドコード or 要素ID | 初期値 | 設定値 |
| --- | --- | --- | --- | --- | --- |
| DATE | ◯ | 西暦 | 西暦 | - | - |
| SINGLE_LINE_TEXT | - | 和暦 | 和暦 | - | - |
| SINGLE_LINE_TEXT | - | 年 | 年 | - | - |
| LABEL | - | 年 | - | - | - |
| NUMBER | - | 月 | 月 | - | - |
| NUMBER | - | 日 | 日 | - | - |
| SINGLE_LINE_TEXT | - | 和暦 & 年月日 | 和暦年月日 | - | - |

## 解説
kintone開発にて、和暦を必要とする案件が出てきたため作成することにした<br>
和暦にする関数toLocaleString()など、予めJavaScriptで用意されているが、<br>
令和時の対応において、令和直前にJavaScript内でようやく使用可能になったり、開発用ブラウザのバージョンのみ先行して対応されたり<br>
対応に遅れる可能性があるため、今回ライブラリを作成した<br>
自前のライブラリのため、任意のタイミングで修正が可能なため、迅速に新年号にも対応できるメリットがある<br>
<br>

## ライブラリ:japaneseEraConverterについて
### 使用方法
kintoneの導入したいアプリにて、「JavaScript/CSSカスタマイズ」の「PC用のJavaScript / CSSファイル」に、<br>
「アップロードして追加」から「japaneseEraConverter.js」を追加する<br>
<br>
![0001](https://github.com/MizukiOkushima/kintone/assets/95268598/79262ed9-f979-4452-9a27-a334c1c7bfcd)
<br>

### ライブラリの仕様
#### 引数
・第一引数：year　　型：数値<br>
・第二引数：month　型：数値<br>
・第三引数：day　　型：数値<br>
<br>
kintoneの日付フィールドを使用する場合、下記のように文字列変換を行って数値型へ変換できる引数を使用してください<br>
ゼロパディングがある場合、ゼロ詰めとしてNumber()関数を使用してください<br>
```JavaScript
// 日付フィールドの取得
const western_calendar = event.record['日付'].value;
// Date型チェック
const dateCheck = new Date(western_calendar);
if (isNaN(dateCheck.getDate())) {
    throw new Error("西暦を正しく入力してください。");
};
// 西暦の年月日 Number型へ変換でゼロ詰め
let date_year = Number(western_calendar.slice(0, 4));
let date_month = Number(western_calendar.slice(5, 7));
let date_day = Number(western_calendar.slice(8, 10));
```
<br>

#### 戻り値
・{era_name: '西暦', era_year: '年', month: '月', day: '日'}　型：オブジェクト<br>
<br>

#### インスタンス
下記のようなクラスのインスタンスを使用してください<br>
```JavaScript
// クラスのインスタンスを生成
const converter = new JapaneseEraConverter();
// 和暦変換
const japanese_era = converter.convertToJapaneseEra(date_year, date_month, date_day);
```
<br>

#### 年号を追加する場合の対応について
ライブラリ:japaneseEraConverter.jsの下記の箇所に規定に従って新しい年号を追記すること<br>
```JavaScript
this.japaneseEras = [
  // 現在以降は終了日を9999年としておく
  { name: "令和", startYear: 2019, startMonth: 5, startDay: 1, endYear: 9999 },
  { name: "平成", startYear: 1989, startMonth: 1, startDay: 8, endYear: 2019 },
  { name: "昭和", startYear: 1926, startMonth: 12, startDay: 25, endYear: 1989 },
  { name: "大正", startYear: 1912, startMonth: 7, startDay: 30, endYear: 1926 },
  { name: "明治", startYear: 1868, startMonth: 1, startDay: 25, endYear: 1912 },
];
```
## 参考文献
なし

## イメージ
![スクリーンショット 2023-09-13 23 44 19](https://github.com/MizukiOkushima/kintone/assets/95268598/9971436d-e87e-4e23-9d9c-0d7192b5d265)
