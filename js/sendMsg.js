$.fn.transferMsg= function() {
	$(this).click(function(){
		 window.location.href='./InquiryPrice.html'+'?msg='+$("#msgText").val(); 
	});
};
$(function(){ 
	$("#sendMsg").transferMsg();
   })
