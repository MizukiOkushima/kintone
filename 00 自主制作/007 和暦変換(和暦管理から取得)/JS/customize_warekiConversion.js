(function () {

	"use strict";

	// アプリ設定　開発
	const AppIds = {
		wareki: 1388         // 和暦管理
	};

	// レコード詳細画面
	const events_detail = [
		'app.record.detail.show'
	];

	// レコード作成・編集イベント
	const events_create = [
		'app.record.create.show',
		'app.record.edit.show'
	];

	// 汎用エラーメッセージ
	const COMMON_ERROR_MESSAGE = 'エラーが発生しました。<br>システム担当者に連絡してください。';


	//
	//　レコード詳細画面
	//

	kintone.events.on(events_detail, async (event) => {

		try {

			// スペース変数設定
			let mySpaceId = `btn`
			let myButtonSpaceElement = kintone.app.record.getSpaceElement(mySpaceId);

			const Kuc = Kucs['1.8.0'];
			const btn = new Kuc.Button({
				text: "レコード詳細画面のボタン",
				type: "normal",
				id: "btn"
			});

			// ボタン追加
			myButtonSpaceElement.append(btn);

			// ボタンクリックイベント
			btn.addEventListener("click", async () => {

				try {

					// レコード取得
					const event = kintone.app.record.get();

					// 日付の取得
					const fieldDateValue = event.record['日付'].value;

					// 日付の和暦変換
					const warekiDate = await convertToJapaneseEra(fieldDateValue, '日付');

					// 和暦変換後の使用
					alert("日付のフィールの和暦は" + warekiDate.eraName + warekiDate.eraYear + "年" + warekiDate.month + "月" + warekiDate.day + "日です！");

				} catch (error) {

					console.log(error);
					// ポップアップ表示
					return new kintone.Promise(function () {

						Swal.fire({
							icon: 'error',
							html: COMMON_ERROR_MESSAGE + '<br>' + error.message,
							confirmButtonColor: '#3085d6',
							confirmButtonText: 'とじる',
						}).then(() => {
							return event;
						})
					});

				}

			});

			return event;

		} catch (error) {

			console.log(error);
			event.error = COMMON_ERROR_MESSAGE + '/n' + error.message;
			return event;

		}

	});


	//
	// レコード作成・編集イベント
	//

	kintone.events.on(events_create, async (event) => {

		try {

			// スペース変数設定
			let mySpaceId = `btn`
			let myButtonSpaceElement = kintone.app.record.getSpaceElement(mySpaceId);

			const Kuc = Kucs['1.8.0'];
			const btn = new Kuc.Button({
				text: "レコード作成・編集のボタン",
				type: "submit",
				id: "btn"
			});

			// ボタン追加
			myButtonSpaceElement.append(btn);

			// ボタンクリックイベント
			btn.addEventListener("click", async () => {

				try {

					// レコード取得
					const event = kintone.app.record.get();

					// 日付の取得
					const fieldDateValue = event.record['日付'].value;

					// 日付の和暦変換 convertToJapaneseEra関数（第一引数：変換するフィールドの値, 第二引数：フィールド名（String））
					const warekiDate = await convertToJapaneseEra(fieldDateValue, '日付');

					// 和暦変換後の使用方法 オブジェクト型{ "eraName": 年号, "eraYear": 年, "month": 月, "day": 日 }
					alert("日付のフィールの和暦は" + warekiDate.eraName + warekiDate.eraYear + "年" + warekiDate.month + "月" + warekiDate.day + "日です！");

				} catch (error) {

					console.log(error);
					// ポップアップ表示
					return new kintone.Promise(function () {

						Swal.fire({
							icon: 'error',
							html: COMMON_ERROR_MESSAGE + '<br>' + error.message,
							confirmButtonColor: '#3085d6',
							confirmButtonText: 'とじる',
						}).then(() => {
							return event;
						})
					});

				}

			});

			return event;

		} catch (error) {

			console.log(error);
			event.error = COMMON_ERROR_MESSAGE + '/n' + error.message;
			return event;

		}

	});


	//----------------------------------------------------------------------------------------
	//　<< 関数 >>	和暦変換
	// ---------------------------------------------------------------------------------------
	//	第一引数：fieldDateValue 日付フィールドの値(String)
	//	第二引数：fieldName		 和暦へ変換するフィールド名(String)
	//	戻り値	：オブジェクト型  { "eraName": 年号, "eraYear": 年, "month": 月, "day": 日 }
	//		   					※年が「1」年の場合：「元」年
	//----------------------------------------------------------------------------------------

	async function convertToJapaneseEra(fieldDateValue, fieldName) {

		// 入力したフィールドの値のバリデーションチェック
		// Date型チェック
		const dateCheckValue = new Date(fieldDateValue);
		if (isNaN(dateCheckValue.getTime())) {
			throw new Error(`${fieldName}を正しく入力してください。`);
		};

		// 会社情報アプリからレコード取得
		let client = new KintoneRestAPIClient();
		let param = {};
		param.app = AppIds.wareki;
		const warekiResp = await client.record.getAllRecords(param);

		// 年号開始日を降順に並べ替え（和暦管理テーブルの年号開始日が正しい順序で登録されていない場合の対策）
		const warekiTable = warekiResp[0]['和暦管理'].value.sort((a, b) => {
			const dateA = new Date(a.value["年号開始日"].value);
			const dateB = new Date(b.value["年号開始日"].value);
			return dateB - dateA;
		});

		// 入力したフィールドの各年月日変換 parseInt関数でゼロ詰め(ex.01 → 1)
		const fieldYear = parseInt((fieldDateValue.slice(0, 4)), 10);
		const fieldMonth = parseInt((fieldDateValue.slice(5, 7)), 10);
		const fieldDay = parseInt((fieldDateValue.slice(8, 10)), 10);

		// 和暦管理テーブルループ
		for (const [index, element] of Object.entries(warekiTable)) {

			// 和暦管理の生年月日 parseInt関数でゼロ詰め(ex.01 → 1)
			const warekiYear = parseInt(element.value['年号開始日'].value.slice(0, 4), 10);
			const warekiMonth = parseInt(element.value['年号開始日'].value.slice(5, 7), 10);
			const warekiDay = parseInt(element.value['年号開始日'].value.slice(8, 10), 10);

			// 年号開始日と入力したフィールドの比較
			if (
				(fieldYear > warekiYear ||
					(fieldYear == warekiYear &&
						(fieldMonth > warekiMonth ||
							(fieldMonth == warekiMonth && fieldDay >= warekiDay))))
			) {
				const eraName = element.value['年号'].value;
				let eraYear = fieldYear - warekiYear + 1;

				// 元年処理
				if (eraYear == 1) {
					eraYear = "元";
				}

				return { "eraName": eraName, "eraYear": eraYear, "month": fieldMonth, "day": fieldDay };
			}

		}

		throw new Error(`${fieldName}に該当する和暦がありません。`);

	}

})();