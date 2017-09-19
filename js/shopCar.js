

$(function(){
	var phone=JSON.parse(localStorage.getItem("phone"));
	console.log(phone)
	var str="";
	for(var i in phone){
		str+=`<tr>
					<td  data-jname=${phone[i].JsonName} class="cart-col-select" data-path=${phone[i].path}   data-id=${phone[i].id}>
							<input type="checkbox" class="cartcheck magin goods-checkbox"/>
							<img src="${phone[i].src}" class="goods-img"/>
					</td>
					<td class="cart-col-name">
						<a href="goods-details.html?json=${phone[i].path}&name=${phone[i].JsonName}&id=${phone[i].id}">
							<p  class="goods-name">${phone[i].name}</p>
							<span><span class="netType">${phone[i].netType} </span>
								<span class="color">${phone[i].color}</span> 
								<span class="memory">${phone[i].memory}</span>
								</span>
						</a>
					</td>
					<td class="cart-col-price">
						￥<b>${phone[i].price}</b>
					</td>
					<td >
						<div class="mz-adder">
							<a href="javascript:;" class="down">-</a >
							<span class="goods-count">${phone[i].count}</span>
							<a href="javascript:;" class="up">+</a>
						</div>
					</td>
					<td class="cart-col-total" >
						<p>￥<span class="goodstotal-price">${(phone[i].price*phone[i].count).toFixed(2)}<span></p>
					</td>
					<td class="cart-col-ctrl">
						<a href="javascript:;" class="del"></a>
					</tr>`;
	}
	$(".cart-header").append(str);
	//全选
$(".selectAll").click(function(){
	$(".goods-checkbox").prop("checked", $(this).prop("checked"));
	 jiesuan();
})

//添加数量
$(".cart-header").delegate(".up","click",function(){
	var count=$(this).parent().find(".goods-count").html();
	var price= $(this).parent().parent().parent().find("b").html()
	console.log(count)
	if(count==5){
		$(this).parent().find(".goods-count").html("5");
	}else{
		count++;
		$(this).parent().find(".goods-count").html(count);
		$(this).parent().parent().parent().find(".goodstotal-price").html((price*count).toFixed(2))
	}
	changeCookie()
	jiesuan();
})
//减少数量
$(".cart-header").delegate(".down","click",function(){
	var count=$(this).parent().find(".goods-count").html();
	var price= $(this).parent().parent().parent().find("b").html()
	console.log(count)
	if(count==1){
		$(this).parent().find(".goods-count").html("1");
		$(this).parent().parent().parent().find(".goodstotal-price").html((price*1).toFixed(2))
	}else{
		count--;
		$(this).parent().find(".goods-count").html(count);
		$(this).parent().parent().parent().find(".goodstotal-price").html((price*count).toFixed(2))
	}
	changeCookie()
	jiesuan();
})
//删除购物车
$(".cart-header").delegate(".del","click",function(){
	if(confirm("您确定要删除这件商品吗?")){
		delCookie();
		$(this).parent().parent().remove();
	}
	
	jiesuan();
})
//单个结算
$(".cart-header").delegate(".goods-checkbox","click",function(){
	 jiesuan();
})
//结算
function jiesuan(){
	var money=0;
	$(".goods-checkbox:checked").each(function(){
		money += parseInt($(this).parent().parent().find(".goodstotal-price").html())
	})
	$(".total-red").html(money.toFixed(2))
}
//改变cookie的值
function changeCookie(){
	var color =$(".color").html();
	var memory =$(".memory").html();
	var name=$(".cart-col-name p").html();
	var goodsCount=$(".goods-count").html()
	for(var i in phone){
		if( color == phone[i].color && memory == phone[i].memory && name == phone[i].name){
			//操作数组同时，也要改变cookie
			phone[i].count=goodsCount;
			localStorage.setItem('phone',JSON.stringify(phone));
//			setCookie("phone",JSON.stringify(phone));
		}
	}
}
//删除
function delCookie(){
	var color =$(".color").html();
	var memory =$(".memory").html();
	var name=$(".cart-col-name p").html();
	for(var i in phone){
		if( color == phone[i].color && memory == phone[i].memory && name == phone[i].name){
			phone.splice(i,1);
			//操作数组同时，也要改变cookie
			localStorage.setItem('phone',JSON.stringify(phone));
//			setCookie("phone",JSON.stringify(phone));
		}
	}
}

//提交账单结算付款
$(".Submit-bill").click(function(){
	var order={};
	if($(".goods-checkbox:checked").length==0){
		alert("未选择购买的物品")
		return;
	}
	if(confirm("您确定要购买吗?")){
		
	$(".goods-checkbox:checked").each(function(){
		var img =$(this).parent().parent().find(".goods-img").attr("src");
		var name=$(this).parent().parent().find(".goods-name").html();
		var netType=$(this).parent().parent().find(".netType").html();
		var color=$(this).parent().parent().find(".color").html();
		var memory=$(this).parent().parent().find(".memory").html();
		var goodsCount=$(this).parent().parent().find(".goods-count").html();
		var price=$(this).parent().parent().find(".cart-col-price b").html();
		var totalPrice=$(this).parent().parent().find(".goodstotal-price").html();
		var path=$(this).parent().data("path");
		var jname=$(this).parent().data("jname");
		var id=$(this).parent().data("id");
		var arr=[];
		 order={
			"img":img,
			"name":name,
			"netType":netType,
			"color":color,
			"memory":memory,
			"goodsCount":goodsCount,
			"price":price,
			"totalPrice":totalPrice,
			"id":id,
			"JsonName":jname,
			"path":path,
			"time":new Date().toLocaleDateString(),
			"orderNo":new Date().getTime()
		}
		 console.log($(this).parent()[0])
		 delCookie();
		$(this).parent().parent().remove();
		
		var Data=JSON.parse(localStorage.getItem("order")?localStorage.getItem("order") : []);
//		var cookie = getCookie("order");
		console.log(Data)
		arr=Data;
		arr.push(order);
//		setCookie("order",JSON.stringify(arr));
		localStorage.setItem('order',JSON.stringify(arr));
	});
	location.href="order.html";
	
	}
	
	
	
})
});

