var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var num = [];
  var ran1;
  
ch:
while(1){
for(var j=0;j<25;j++){
  ran1 = Math.floor(Math.random()*25)+1;
    num.push(ran1);
    change = num.reduce(function(a,b){
      if (a.indexOf(b) < 0 )  //주어진 값과 일치하는 값이 없으면 -1반환
      a.push(b);
      return a;
    },[]);
  }
if(change.length == 25){
  break ch;
 }
}
  res.render('index', { title : '빙고게임' , change });
});

module.exports = router;