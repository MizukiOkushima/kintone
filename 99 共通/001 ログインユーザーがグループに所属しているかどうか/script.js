(function () {
  "use strict";

  // グループ名
  const groupA = "groupA"; // Aグループ

  // ログインユーザーがグループに所属しているかチェックする
  const record = event.record;
  const user = kintone.getLoginUser();
  return kintone
    .api("/v1/user/groups", "GET", { code: user.code })
    .then((resp) => {
      const groups = resp.groups;
      for (const group of groups) {
        const { code } = group;
        if (code === groupA) {
          // 処理内容
        }
      }
      return event;
    })
    .catch((error) => {
      console.log(error);
      return event;
    });
})();
