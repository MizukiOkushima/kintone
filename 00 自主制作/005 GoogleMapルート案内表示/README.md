# GoogleMapを使用したナビゲーションを詳細画面に表示
## 概要
検索用フィールドに表示したいナビゲーションを入力し、kintoneの詳細画面にGoogleMapのルートを表示する<br>

## 設定フィールド
| Type | 必須 | フィールド名 | フィールドコード or 要素ID |
| --- | --- | --- | --- |
| SINGLE_LINE_TEXT | - | 開始位置 | 開始位置 |
| SINGLE_LINE_TEXT | ◯ | 終了位置 | 終了位置 |
| SPACER | - | - | currentLocation |
| RADIO_BUTTON | ◯ | 縮尺率 | 縮尺率 |
| MULTI_LINE_TEXT | - | iframe | iframeText |
| SPACER | - | - | iframeSpace |

## 解説
GoogleMapのAPIは有料で回数制限があるが、iframeを使用することで無料で使用可能<br>
kintoneのチェンジイベントについては、検索用フィールドからフォーカスが外れるタイミグ、<br>
またはreturnキーを押すことでイベント発生となるので注意<br>
<br>
「開始位置」入力の補助として「現在地取得」ボタンを設置<br>
このボタンを押すことで現在地の緯度と経度を取得し「開始位置」へ挿入することが可能<br>
<br>
ナビゲーション機能を使わないことを想定して「終了位置」のみ入力時は目的地の地図を表示する仕様にした<br>
<br>
調べた限り縮尺率は自動ではなかったため「縮尺率」フィールドを用いて倍率を手動で設定できる仕様にした<br>
日本地図の半分程度のルート案内が縮尺で表示できるように倍率は「7〜17」を採用、初期値は「12」<br>

## 参考文献
住所から地図を表示する<br>
https://cybozudev.zendesk.com/hc/ja/articles/202640950-住所から地図を表示する<br>
<br>
GoogleマップをWebサイトに埋め込んでみよう！<br>
https://guillemot.jp/web/205<br>
<br>
レコード新規追加時　緯度経度付与<br>
https://community.cybozu.dev/t/topic/3544/2<br>

## イメージ
![スクリーンショット 2023-09-10 14 46 50](https://github.com/MizukiOkushima/kintone/assets/95268598/e0693c67-a32e-46d9-adcc-91fbfa98499a)
