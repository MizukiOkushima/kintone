class JapaneseEraConverter {
  constructor() {
    this.japaneseEras = [
      // 現在以降は終了日を9999年としておく
      { name: "令和", startYear: 2019, startMonth: 5, startDay: 1, endYear: 9999 },
      { name: "平成", startYear: 1989, startMonth: 1, startDay: 8, endYear: 2019 },
      { name: "昭和", startYear: 1926, startMonth: 12, startDay: 25, endYear: 1989 },
      { name: "大正", startYear: 1912, startMonth: 7, startDay: 30, endYear: 1926 },
      { name: "明治", startYear: 1868, startMonth: 1, startDay: 25, endYear: 1912 },
    ];
  }

  convertToJapaneseEra(fieldValue) {

		// 入力したフィールドの値のバリデーションチェック
		// Date型チェック
    const dateCheck = new Date(fieldValue);
    if (isNaN(dateCheck.getTime())) {
      throw new Error("西暦を正しく入力してください。");
    };

    // 西暦の年月日 parseInt関数でゼロ詰め
    const year = parseInt(fieldValue.slice(0, 4), 10);
    const month = parseInt(fieldValue.slice(5, 7), 10);
    const day = parseInt(fieldValue.slice(8, 10), 10);

    // japaneseErasのループ
    for (let i = 0; i < this.japaneseEras.length; i++) {
      const era = this.japaneseEras[i];
      if (
        (year > era.startYear ||
          (year == era.startYear &&
            (month > era.startMonth ||
              (month == era.startMonth && day >= era.startDay))))
      ) {
        const eraName = era.name;
        let eraYear = year - era.startYear + 1;

        // 元年処理
        if (eraYear == 1) {
          eraYear = "元";
        }

        return { 年号: eraName, 年: eraYear, 月: month, 日: day };
      }
    }
    throw new Error("該当する和暦がありません。");
  }
}