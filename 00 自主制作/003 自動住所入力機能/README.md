# 自動住所入力機能
## 概要
ユーザーが入力した郵便番号から自動で住所が入力される機能を実装する<br>

## 設定フィールド
| Type | 必須 | 重複禁止 | フィールド名 | フィールドコード |
| --- | --- | --- | --- | --- |
| SINGLE_LINE_TEXT | ◯ | - | 郵便番号 | zipcode |
| SINGLE_LINE_TEXT | - | - | 都道府県 | pref |
| SINGLE_LINE_TEXT | - | - | 市区町村 | city |
| SINGLE_LINE_TEXT | - | - | 地域 | town |
| SINGLE_LINE_TEXT | - | - | 市区町村＆地域 | address |
| SINGLE_LINE_TEXT | - | - | 都道府県＆市区町村＆地域 | fullAddress |

## 解説
入力された郵便番号から住所検索APIを使用し、各フィールドに自動で値を入力する<br>
都道府県、市区町村、地域、市区町村＆地域、都道府県＆市区町村＆地域と用意されていたため、<br>
今回、それぞれのフィールドに値を設定するよう実装した<br>

## 参考文献
【簡単すぎる】kintoneで郵便番号から住所検索！<br>
https://blogs.techvan.co.jp/kintone/2020/02/26/%E3%80%90%E7%B0%A1%E5%8D%98%E3%81%99%E3%81%8E%E3%82%8B%E3%80%91%E9%83%B5%E4%BE%BF%E7%95%AA%E5%8F%B7%E3%81%A7%E4%BD%8F%E6%89%80%E6%A4%9C%E7%B4%A2%EF%BC%81/<br>

## イメージ
![スクリーンショット](https://github.com/MizukiOkushima/kintone/assets/95268598/1597b3ff-eaad-4b30-94a0-e5f8e270fb13)
