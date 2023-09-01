# 請求書発行（UIのみ）
## 概要
各アプリ間の連携を行い、請求書発行が可能なアプリ（画面）を作成する<br>

## 設定フィールド
### アプリ名：工事管理
| Type | 必須 | フィールド名 | フィールドコード or 要素ID |
| --- | --- | --- | --- |
| SINGLE_LINE_TEXT | - | 工事番号 | ConstructionNumber |
| SINGLE_LINE_TEXT | 〇 | 工事名 | ConstructionName |
| NUMBER | 〇 | 契約金額 | iframeSpace |
| NUMBER | - | 累積金額 | CumulativeAmount |

### アプリ名：支払先管理
| Type | 必須 | フィールド名 | フィールドコード or 要素ID |
| --- | --- | --- | --- |
| SINGLE_LINE_TEXT | 〇 | 支払先名 | PaymentDestinationName |

### アプリ名：発行管理
このアプリはview（画面）のみ使用
| viewID | 一覧名 |
| 6468762 | 請求発行 |

## 解説
支払先管理アプリに登録したレコードをアプリ間連携を行い発行管理画面のドロップダウンリストに支払先一覧を表示する<br>
未実装だが具体的な処理は「請求書発行」ボタンに記述することで可能<br>
選択した項目に対して発酵処理ができることを想定して作成

## 環境構築
アプリについてはApp内zipファイルをダウンロードする<br>
ダウンロードしたzipファイルをkintone上の「アプリを追加」へ登録してください<br>
また登録したアプリ「発行管理」アプリのjsファイルのアプリIDを各アプリIDに設定してください。<br>
このアプリIDは登録した環境によって変動するため設定が必要です<br>
アプリIDについては各アプリを開いた際の末尾URLから確認可能です<br>

参考画像
![619b1bbbb7400](https://github.com/MizukiOkushima/kintone/assets/95268598/1b992b45-51cc-4df6-a89d-b11e92c7b255)


```JavaScript

    // アプリ設定 開発
    const appIds = {
        paymentDestination: 1082, // 支払先管理
        issuanceManagement: 1084  // 発行管理
    };

```

## イメージ
![dev-fukuinet cybozu com_k_1084_](https://github.com/MizukiOkushima/kintone/assets/95268598/961dc79c-969f-463b-b2f2-3420149e50fb)
