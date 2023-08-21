# GoogleMapを詳細画面に表示
## 概要
検索用フィールドに表示したい地図を入力し、kintoneの詳細画面にGoogleMapの地図を表示する

## 設定フィールド
・文字列（１行） 文字列検索（フィールド名） 必須項目 文字列検索（フィールドコード）
・文字列（複数行） iframe（フィールド名） iframeText（フィールドコード）
・スペース iframeSpace（要素ID）

## 解説
GoogleMapのAPIは有料で回数制限があるが、iframeを使用することで無料で使用可能
kintoneのチェンジイベントについては、検索用フィールドからフォーカスが外れるタイミグ、
またはreturnキーを押すことでイベント発生となるので注意

## イメージ
![スクリーンショット 2023-08-21 20 24 43](https://github.com/MizukiOkushima/kintone/assets/95268598/9bfc8582-7759-4d26-a5bf-7917317860ce)

![スクリーンショット 2023-08-21 20 25 03](https://github.com/MizukiOkushima/kintone/assets/95268598/173ca83d-b3f1-4a30-b23e-1030b09e50f5)
