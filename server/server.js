const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 5656;

app.use(express.static("../server"));
app.use(express.static(path.join(__dirname, "server")));
// database
const oracledb = require("oracledb");
const exp = require("constants");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

//초기화
function init() {
  try {
    oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_19_6" });
    console.log("not");
  } catch (err) {
    console.error("Whoops!");
    console.error(err);
    process.exit(1);
  }
}
const mypw = "smhrd1"; // set mypw to the hr schema password

async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "cgi_7_1_1216",
      password: mypw,
      connectString: "project-db-stu.ddns.net:1524",
    });

    const result = await connection.execute(`select * from t_member`);
    console.log(result.rows[0]);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
app.listen(port, () => {
  console.log(`${port}`, "listening");
});

// app.use = 미들웨어(서버의 요청과 응답사이에 실행할 코드)
// folder라는 파일 안에있느 static파일을 사용하겠다는 의미
// app.use(express.static(path.join(__dirname, "react/build")));
// app.use('/~', express.static(path.join(__dirname, "react/build"))); -> package.json에 서브디렉토리 주소를 입력해야함.
app.use(express.static(path.join(__dirname, "folder")));

// 누가 /로 접속하면 아래 파일을 보내줌.
app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "folder/main.html"));
});

// 리액트 라우터 사용시 추가할 코드
// app.get('*', function(요청, 응답){
//   응답.sendFile(path.join(__dirname, 'react/build/index.html'))
// })
