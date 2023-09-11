# 初期表示でコメント表示領域を非表示
## 概要
レコード詳細画面にてコメント表示領域がモニターによっては1/3程使用しているためデフォルトで非表示に設定する<br>

## 設定フィールド
なし

## 解説
コメント表示領域の非表示は、レコード詳細画面にてURL末尾に「&tab=none」を追記することで実現可能<br>
レコード詳細画面の次レコード、前レコードを押すたびに上記パラメータが増えないようjsファイルで処理を記載した<br>
また、kintoneの設定でコメント機能を無効にすることが可能であるが、単純に非表示にしてコメント機能は使えることを今回の目的としている<br>


## 参考文献
レコードのコメント機能を無効にする<br>
https://jp.cybozu.help/k/ja/user/app_settings/app_othersettings/record_comment.html<br>

## イメージ
![スクリーンショット 2023-06-25 14 39 43](https://github.com/MizukiOkushima/kintone/assets/95268598/1d555e83-3718-4864-8fb7-a2a4566f84c5)
![スクリーンショット 2023-06-25 14 37 11](https://github.com/MizukiOkushima/kintone/assets/95268598/bb4a6eab-b70e-4197-9935-c177dfede4a0)
