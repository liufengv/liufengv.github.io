$(function(){
	$("#SearchBtn").click(function(){                                            
		searchString = "site:goldlik.com "+$("input[name='txtSearch']").val();                       
		window.open("https://www.google.com/?gws_rd=cr,ssl#newwindow=1&safe=strict&q="+searchString);
	});
})
