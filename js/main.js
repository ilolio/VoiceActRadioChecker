function getJSON(targetURL) {
    let req = new XMLHttpRequest();                     // XMLHttpRequest オブジェクトを生成する
    let data;
    req.onreadystatechange = function () {               // XMLHttpRequest オブジェクトの状態が変化した際に呼び出されるイベントハンドラ
        if (req.readyState == 4 && req.status == 200) {   // サーバーからのレスポンスが完了し、かつ、通信が正常に終了した場合

            data = JSON.parse(req.responseText);    // 取得した JSON ファイルの中身を変数へ格納
            // const len = data.length;                      // JSON のデータ数を取得

            // // JSON のデータ数分処理
            // for (let i = 0; i < len; i++) {
            //     console.log("id: " + data[i].id + ", name: " + data[i].name);
            // }

        }
    };
    req.open("GET", targetURL, false);              // HTTPメソッドとアクセスするサーバーのURLを指定
    req.send(null);                                    // 実際にサーバーへリクエストを送信
    return data;
}

function insertData() {
    // 既存の table 要素から tbody を取得する
    var tbody = document.querySelector('#tablelist tbody')

    let json = getJSON("https://script.google.com/macros/s/AKfycbwJmXbxXBVh0E2k03q4lMGUsgNiaDSXJnfdZszZpSQTuKgu4F4/exec?action=show&sheetName=checklist");
    console.log(json);

    // tbody に tr を入れていく
    json.forEach(function (row) {
        var colList = document.createElement('td')
        let colListLink = document.createElement('a');
        colListLink.href = row.URL;
        colListLink.target = "_blank";
        colListLink.text = row.list;
        colList.appendChild(colListLink)


        var colChecked = document.createElement('td')
        let colCheckedTestLink = document.createElement('a');
        colCheckedTestLink.href = 'https://script.google.com/macros/s/AKfycbwJmXbxXBVh0E2k03q4lMGUsgNiaDSXJnfdZszZpSQTuKgu4F4/exec?action=delete&sheetName=checklist&uuid=' + row.uuid;
        colCheckedTestLink.target = "_blank";
        colCheckedTestLink.text = row.viewed == 1 ? '☑' : '□';
        colChecked.appendChild(colCheckedTestLink)

        var tr = document.createElement('tr')
        tr.appendChild(colChecked);
        tr.appendChild(colList);

        tbody.appendChild(tr)
    })
}

function deldata(uid) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbwJmXbxXBVh0E2k03q4lMGUsgNiaDSXJnfdZszZpSQTuKgu4F4/exec?action=delete&sheetName=checklist&uuid=' + uid);
    xhr.send();
}

insertData();