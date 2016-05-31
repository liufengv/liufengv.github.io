var type=navigator.appName
if (type=="Netscape"){
var lang = navigator.language
}
else{
var lang = navigator.userLanguage
}
var lang = lang.substr(0,2)
if (lang == "en"){
window.location.href ="http://www.goldlik.com/indexen.html"
}
else if (lang == "zh"){
//window.location="http://www.goldlik.com/index.html"
}
else{
	window.location.href="http://www.goldlik.com/index.html"
}
