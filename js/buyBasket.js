var BuyBasket = {
	CheckBuyed:function(btnId) {
		var buyedItemsId = window.localStorage? localStorage.getItem("buyedItems"): Cookie.read("buyedItems");

		if (buyedItemsId != null && buyedItemsId.indexOf(btnId) >= 0)
			return true;
		return false;
	},

	BuyedNumber:function() {
		var buyedItemsId = window.localStorage? localStorage.getItem("buyedItems"): Cookie.read("buyedItems");
		var buyArray = new Array();

		if (!buyedItemsId)
			return;
		buyArray = buyedItemsId.split(',');
		return buyArray.length - 1;
	},

	DeleteBuyItem:function(btnId) {
		var buyedItemsId = window.localStorage? localStorage.getItem("buyedItems"): Cookie.read("buyedItems");
		var saveItems = buyedItemsId.replace(btnId+',', "");
		if (window.localStorage) {
			localStorage.setItem("buyedItems", saveItems);
		} else {
			Cookie.write("buyedItems", saveItems);
		}
	},

	UpdateBuyBasket:function() {
		var buyedItemsId = window.localStorage? localStorage.getItem("buyedItems"): Cookie.read("buyedItems");
		var buyArray = new Array();

		if (this.BuyedNumber() > 0) {
			animatedcollapse.showhide("goldlikBasket", "show");
		}
		else {
			animatedcollapse.showhide("goldlikBasket", "hide");
		}

		/* 1. clear all li.. */
		$("#goldlikBasketUl").empty();

		/* 2. add li according to localStorage.buyedItems.. */
		if (!buyedItemsId)
			return;
		buyArray = buyedItemsId.split(',');
		for (var i = 0; i < buyArray.length - 1; i++) {
			var picFileName = buyArray[i].replace("BUYBTN-", "");
			var liElement = "<li id="+buyArray[i]+" class='pic savm' style='visibility: visible;' data-id='60055245435'><a href='javascript:;'><img class='product-img-small' alt='' src='/images/product/thumnail/" + picFileName +".jpg' style=''><i class='main-icon icon-product-item-close'></i></a></li>";
			var $li_1=$(liElement);
			$("#goldlikBasketUl").append($li_1);
			$("li.savm").die().live("click", function(){
				BuyBasket.DeleteBuyItem($(this).attr('id'));
				BuyBasket.UpdateBuyBasket();
				$("a.buyedBtn").each(function(){
					var btnId = $(this).attr('id');
					$(this).removeClass();
					if (BuyBasket.CheckBuyed(btnId) == true) {
						$(this).addClass('buyedBtn');
						$(this).text("Inquiry Added");
					}
					else {
						$(this).addClass('buyBtn');
						$(this).text("Inquiry Price");
					}
				})
			});
		}
	},
	
	init:function(){
	},
}

$(document).ready(function() {
	BuyBasket.UpdateBuyBasket();

	$("a.buyBtn").each(function(){
		var btnId = $(this).attr('id');
		$(this).removeClass();
		if (BuyBasket.CheckBuyed(btnId) == true) {
			$(this).addClass('buyedBtn');
			$(this).text("Inquiry Added");
		}
		else {
			$(this).addClass('buyBtn');
			$(this).text("Inquiry Price");
		}
	})

	$("a").click( function(){
		if (this.id.substring(0, 6) != "BUYBTN")
			return;

		var buyedItems = window.localStorage? localStorage.getItem("buyedItems"): Cookie.read("buyedItems");

		/*Already buyed: remove... */
		if (BuyBasket.CheckBuyed(this.id) == true) {
			var saveItems = buyedItems.replace(this.id+',', "");
			if (window.localStorage) {
				localStorage.setItem("buyedItems", saveItems);
			} else {
				Cookie.write("buyedItems", saveItems);
			}
			$(this).removeClass('buyedBtn');
			$(this).addClass('buyBtn');
			$(this).text("Inquiry Price");
		}
		/* Not buyed: add... */
		else {
			if (buyedItems == null) {
				var saveItems = this.id + ',';
			}
			else {
				var saveItems = buyedItems + this.id + ',';
			}

			if (window.localStorage) {
				localStorage.setItem("buyedItems", saveItems);
			} else {
				Cookie.write("buyedItems", saveItems);
			}

			$(this).removeClass('buyBtn');
			$(this).addClass('buyedBtn');
			$(this).text("Inquiry Added");
		}
		
		BuyBasket.UpdateBuyBasket();
	});

	$("#inquiryButtonId").click(function(){
		window.location="./InquiryPrice.html";
	});
});

BuyBasket.init()

