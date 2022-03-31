const express = require('express');
const fs = require('fs');
const app = express();
const port = 0333;

// database 
const oracledb = require('oracledb'); 

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

// 초기화 
function init() { 
    try {
        oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_19_6'});
        console.log("not")
      } catch (err) {
        console.error('Whoops!');
        console.error(err);
        process.exit(1);
      }
    
    }
const mypw = "smhrd1"  // set mypw to the hr schema password

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : "cgi_7_1_1216",
      password      : mypw,
      connectString : "project-db-stu.ddns.net:1524"
    });


    const result = await connection.execute(
      `select * from t_member`
      
    );
    console.log(result.rows);

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
app.listen(port, () =>{
    console.log(`${port}`, "listening");
});
