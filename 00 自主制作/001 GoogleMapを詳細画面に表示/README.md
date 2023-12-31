# GoogleMapを詳細画面に表示
## 概要
検索用フィールドに表示したい地図を入力し、kintoneの詳細画面にGoogleMapの地図を表示する<br>

## 設定フィールド
| Type | 必須 | フィールド名 | フィールドコード or 要素ID |
| --- | --- | --- | --- |
| SINGLE_LINE_TEXT | ◯ | 文字列検索 | 文字列検索 |
| MULTI_LINE_TEXT | - | iframe | iframeText |
| SPACER | - | - | iframeSpace |

## 解説
GoogleMapのAPIは有料で回数制限があるが、iframeを使用することで無料で使用可能<br>
kintoneのチェンジイベントについては、検索用フィールドからフォーカスが外れるタイミグ、<br>
またはreturnキーを押すことでイベント発生となるので注意<br>

## 参考文献
5分でできる！Googleマップ（地図）やYoutube（動画）をkintone詳細画面に埋め込む方法！<br>
https://create-new-air.com/blog/kintone/4879/<br>

## イメージ
![スクリーンショット 2023-08-21 20 24 43](https://github.com/MizukiOkushima/kintone/assets/95268598/9bfc8582-7759-4d26-a5bf-7917317860ce)

![スクリーンショット 2023-08-21 20 25 03](https://github.com/MizukiOkushima/kintone/assets/95268598/173ca83d-b3f1-4a30-b23e-1030b09e50f5)
