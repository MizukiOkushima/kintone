# 和暦変換（和暦管理から取得）
## 概要
kintoneで使用できる「日付」フィールドを元に、和暦管理アプリの最初のレコードから年号を取得する<br>

## 設定フィールド
### アプリ名：和暦管理
| Type | 必須 | フィールド名 | フィールドコード or 要素ID | 初期値 | 設定値 |
| --- | --- | --- | --- | --- | --- |
| SUBTABLE | - | 和暦管理 | 和暦管理 | - | - |
| SINGLE_LINE_TEXT | ◯ | 年号 | 年号 | - | - |
| DATETIME | ◯ | 年号開始日 | 年号開始日 | - | - |
<br>

### アプリ名：和暦変換(和暦管理から取得)
| Type | 必須 | フィールド名 | フィールドコード or 要素ID | 初期値 | 設定値 |
| --- | --- | --- | --- | --- | --- |
| DATETIME | ◯ | 日付 | 日付 | - | - |
| SPACER | - | - | btn | - | - |
<br>

## 解説
kintone開発にて、和暦を必要とする案件が出てきたため作成することにした<br>
和暦変換ライブラリと異なり、アプリ内で和暦を管理してユーザーが和暦の管理できるようにしたいとの要望だったので作成<br>
<br>

## 参考文献
なし

## イメージ
<img width="375" alt="スクリーンショット 2023-09-23 10 44 45" src="https://github.com/MizukiOkushima/kintone/assets/95268598/bc0a98ab-3244-4280-8f4b-db39802b6cb1">
<img width="900" alt="スクリーンショット 2023-09-23 10 44 25" src="https://github.com/MizukiOkushima/kintone/assets/95268598/c10094c3-accc-4214-a164-39f48e2f1832">
