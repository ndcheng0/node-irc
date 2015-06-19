// Create the configuration
var config = {
	channels: ["#Mercenary.tw"],
	server: "irc.rizon.net",
	botName: "GGBot",
	Admin:["xChenGx","s932708"]
};

// Get the lib
var irc = require("irc");
var http = require("http");
var https = require("https");
var math =require("mathjs");
var util = require('util');
var Events = require('events');
var emitter = new Events.EventEmitter();
var random = require("random-js")(); // uses the nativeMath engine

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
    nick:config.botName,
	channels: config.channels,
	autoConnect: true,
	autoRejoin: true,
	debug: false
});
var ApiUrl={
Citizen:"https://www.cscpro.org/secura/citizen/",
Battle:"https://www.cscpro.org/secura/battles/",
MMarket:"https://www.cscpro.org/secura/exchange/"
}
var profile={
id:''

}
var autoSpeak =true ;
function connect(from,a,b){
  https.get(ApiUrl.Citizen+from+".json",function(res){
  // 網頁狀態
  //console.log("Got response: " + res.statusCode);
  var body="";
 res.on('data', function (chunk) {
    //console.log(ApiUrl.Citizen+from+".json");
	console.log('connecting...');
    //console.log(chunk);
	body += chunk ;
	console.log('getData');
	
	
  });
  res.on('end',function(){
  var jsonData = JSON.parse(body);
  console.log('getJson');
  // console.log(jsonData.id);
   a=jsonData.id;
   
   console.log('getID');
   if(b==1){
   bot.say(config.channels[0],from+'\'s link : http://secura.e-sim.org/profile.html?id='+a);
   //console.log(id);
  }
  if(b==2){
   bot.say(config.channels[0],'Money : http://secura.e-sim.org/donateMoney.html?id='+a);
   //console.log(id);
  }
  });
  }).on('error', function(e) {
  console.log("Got error: " + e.message);
});


  }
  function connect_nirc(text,b){
  var nick=text.replace(/\@\w{4,6}\s/,"");
  
  https.get(ApiUrl.Citizen+nick+".json",function(res){
  // 網頁狀態
  //console.log("Got response: " + res.statusCode);
  var body="";
 res.on('data', function (chunk) {
    //console.log(ApiUrl.Citizen+from+".json");
	console.log('connecting...');
    //console.log(chunk);
	body += chunk ;
	console.log('getData');
	
	
  });
  res.on('end',function(){
  var jsonData = JSON.parse(body);
  console.log('getJson');
  // console.log(jsonData.id);
   var a=jsonData.id;
   
   console.log('getID');
   if(b==1){
  if(a!=undefined){
   bot.say(config.channels[0],nick+'\'s link : http://secura.e-sim.org/profile.html?id='+a);
   //console.log(id);
  }
  else bot.say(config.channels[0],"你打錯了，我看不懂啦!!");
 }
 if(b==2){
 bot.say(config.channels[0],'Money : http://secura.e-sim.org/donateMoney.html?id='+a);
 }
  });
  }).on('error', function(e) {
  console.log("Got error: " + e.message);
});


  }
   function flood(a){
   bot.activateFloodProtection(a);
   }







bot.addListener("message",function(from,to,text,message){
//flood(1);

//console.log('Someone talking! I am Listening.');
console.log(to + "  " + from +':'+text);
if(text.valueOf('@test')==('@test')){

}
if(text.valueOf('@link')==('@link')){
//console.log(profile.id);
connect(from,profile.id,1);

}

if(text.indexOf('@cc')>-1){
var num=text.replace(/\@\w{2,2}\s/,"");
console.log(num);
var ans = math.eval(num);
console.log(ans);
bot.say(config.channels[0],ans);
}
if(text.valueOf('@donate')==('@donate')){
//console.log(profile.id);
connect(from,profile.id,2);

}
if(text.indexOf('@donate')>-1 &&text.valueOf('@donate')!=('@donate')){

//var str=text.match(/\s\w+/g);

connect_nirc(text,2);

}
if(text.indexOf('@link')>-1 &&text.valueOf('@link')!=('@link')){

//var str=text.match(/\s\w+/g);

connect_nirc(text,1);

}

if(text.valueOf('GG dance').toLowerCase()==('gg dance')||text.valueOf('GG 跳舞').toLowerCase()==('gg 跳舞')){

console.log('KeyWord:GG dance');
bot.say(config.channels[0],'http://i.imgur.com/IrNl3o1.gif');

}

if( text.valueOf('GG out').toLowerCase()=='gg out'){
var who = from.toString();

if(who==config.Admin[0]){
console.log("Got Admin");
console.log(who);
console.log(config.Admin);
nick.indexOf();
}
}
if(text.valueOf('@Admin')==('@Admin')){
console.log('@Admin');
bot.say(config.channels[0],"Admin list : { "+config.Admin+" }");

}
if(text.indexOf('@channels')>-1){
console.log('@channels');


}
if(from==config.Admin[0]&&text.indexOf('@Broadcast')>-1){
console.log('@Broadcast');
var string = text.toString() ;
console.log(text);
var ch = string.match(/\#\w+\.{0,3}\w+/g);
console.log(ch);
var strText = string.match(/\s\w+/g);
console.log(strText);
//strText=trim.left(strText);
//console.log(strText);
bot.say(ch,strText);

}
/*if(text.valueOf('@hl')==('@hl')){
var nicks=[];
emitter.on('someEvents',function(arg1,arg2){
console.log(arg1);
console.log(arg2);

});
emitter.emit('names',config.channels,nicks);
console.log(nicks.length);
bot.addListener('whois',function(info){
console.log('who');
console.log(info);
}});*/

if(text.valueOf('gg B嘴')==('gg B嘴')||text.valueOf('GG B嘴')==('GG B嘴')){
if( autoSpeak==true){
autoSpeak = false ;
bot.say(config.channels[0],'GG 要安靜了:(');
}
}
if(text.valueOf('gg auto mode')==('gg auto mode')||text.valueOf('GG auto mode')==('GG auto mode')){
if(autoSpeak==false){
autoSpeak = true ;
bot.say(config.channels[0],'自動模式啟動!')
}
}
if(autoSpeak==true){
var value = random.integer(1, 100);
console.log(value);
if (value>=95){
bot.say(config.channels[0],'我知道 poiuwu 有個可愛的女兒~');
}
if(value<=5){
bot.say(config.channels[0],'聽說吉米很會生');
}
if(value<10 && value>5){
bot.say(config.channels[0],'Maid的妹妹是Mayui，奶精沒有妹妹。');

}
if(value<15 && value>10){
bot.say(config.channels[0],'我是GG人，我會跳舞唷。(try :gg dance)');

}
if(text.indexOf('GG')>-1 || text.indexOf('gg')>-1 ){
if( value >90 && value<95){
bot.say(config.channels[0],'阿~~好累唷~~我會不會壞掉:(');

}}
if(value>15 && value<20){
bot.say(config.channels[0],'嫌我太吵得話，可以罵我唷。 (try :gg B嘴)');
}




}


});
// 認證
/*bot.addListener("notice", function (from, to, text, message) {
    // console.log(from + '\n' + to + '\n' + text + '\n' + util.inspect(message, false, null));
    if (from === 'NickServ'
        && to === config.botName
        && text === 'This nickname is registered and protected. If it is your') {
        bot.say('NickServ', 'identify ' + config.password);
    }
    if (from === 'NickServ'
        && to === config.botName
        && text === 'You are now identified for ' + config.botName) {
        console.log('Login success.');
    } else if (from === 'NickServ'
        && to === config.botName
        && text === 'Invalid password for ' + config.botName) {
        console.log('Incorrect password. check you config!');
    }
});*/


