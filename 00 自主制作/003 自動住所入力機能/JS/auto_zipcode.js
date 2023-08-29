(function () {

	"use strict";

	//郵便番号チェンジイベント 郵便番号入力時に自動で住所入力
	const events_change_zipcode = [
		'app.record.create.change.zipcode',
		'app.record.edit.change.zipcode'
	];

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
					record.address.value = response.data.address;              // 市区町村＆地域
					record.fullAddress.value = response.data.fullAddress;   // 都道府県＆市区町村＆地域
				}
			});

		} catch (error) {

			console.log(error);
			event.error = COMMON_ERROR_MESSAGE;

			return event;
		}

		return event;

	});



})();