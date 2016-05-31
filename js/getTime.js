$(document).ready(function() {
	var myDate = new Date();
	myDate.getYear();
	myDate.getFullYear();
	myDate.getMonth();
	myDate.getDate();
	myDate.getDay();
	myDate.getTime();
	myDate.getHours();
	myDate.getMinutes();
	myDate.getSeconds();
	myDate.getMilliseconds();
	myDate.toLocaleDateString(); 
	myDate.toLocaleString( );
	substr = $("h1").text();
	//$("#webTime").text("GOLDLIK Time: "+myDate);
	if (substr.length > 95)
		substr = substr.slice(0, 95);
	$("#webTime").text(substr);
});


//Disable The Right Mouse Key
if (window.Event) 
	document.captureEvents(Event.MOUSEUP);

function nocontextmenu() 
{
	event.cancelBubble = true
		event.returnValue = false;

	return false;
}

function norightclick(e) 
{
	if (window.Event) 
	{
		if (e.which == 2 || e.which == 3)
			return false;
	}
	else
	{
		if (event.button == 2 || event.button == 3) 
		{
			alert("Welcome to Goldlik"); 
		} 
	}

	{
		event.cancelBubble = true;
		event.returnValue = true;
		//return false;
	}
}

document.oncontextmenu = nocontextmenu; // for IE5+
document.onmousedown = norightclick; // for all others
