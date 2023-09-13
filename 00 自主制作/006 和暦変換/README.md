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
令和時の対応において、令和直前だったり、開発用ブラウザのバージョンのみ先行して対応されたり<br>
対応に遅れる可能性があるため、今回ライブラリを作成した<br>
<br>

## ライブラリ:japaneseEraConverterについて
引数については年月日をそれぞれ数値型に変換可能な値を設定すること<br>
戻り値は年号、年、月、日である<br>
また1年の場合、元年になる仕様である<br>
そのため、年のフィールドはDATEではなくSINGLE_LINE_TEXTを使用すること<br>
<br>

## 年号を追加する場合の対応について
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
