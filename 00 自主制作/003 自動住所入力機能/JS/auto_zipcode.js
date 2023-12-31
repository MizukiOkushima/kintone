(function () {

	"use strict";

	//郵便番号チェンジイベント 郵便番号入力時に自動で住所入力
	const events_change_zipcode = [
		'app.record.create.change.zipcode',
		'app.record.edit.change.zipcode'
	];

	// 一覧編集イベント
	const events_index_edit = [
		'app.record.index.edit.show'
	];

	// 汎用エラーメッセージ
	const COMMON_ERROR_MESSAGE = 'エラーが発生しました。システム担当者に連絡してください。';
	
	
	//
	// 郵便番号チェンジイベント 郵便番号入力時に自動で住所入力
	//
	kintone.events.on(events_change_zipcode, (event) => {

		try {

			const record = event.record;
			const zipcode = record.zipcode.value;

			$.ajax({
				//非同期通信
				url: 'https://api.zipaddress.net/?zipcode=' + zipcode,
				dataType: 'json',
				async: false,
				success: function (response) {
					// 取得できた場合、各フィールドにそれぞれの値を設定
					record.pref.value = response.data.pref;                 // 都道府県
					record.city.value = response.data.city;                 // 市区町村
					record.town.value = response.data.town;                 // 地域
					record.address.value = response.data.address;           // 市区町村＆地域
					record.fullAddress.value = response.data.fullAddress;   // 都道府県＆市区町村＆地域
				}
			});

		} catch (error) {

			console.log(error);
			event.error = COMMON_ERROR_MESSAGE + '/n' + error.message;

			return event;
		}

		return event;

	});

	//
	// 一覧編集イベント
	// 

	kintone.events.on(events_index_edit, (event) => {

		try {

			// 項目を比活性にする
			event.record['zipcode'].disabled = true;
			event.record['pref'].disabled = true;
			event.record['city'].disabled = true;
			event.record['town'].disabled = true;
			event.record['address'].disabled = true;
			event.record['fullAddress'].disabled = true;

			return event;

		} catch (error) {

			console.log(error);
			event.error = COMMON_ERROR_MESSAGE;

			return event;

		}

	});

})();
