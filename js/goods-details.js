//鼠标移入切换图片
$(".small-pic li").mouseover(function(){
	var a =$(this).index();
	var src =$(this).find("img").attr("src");
	$(this).parent().find("li").eq(a).addClass("current").siblings().removeClass("current");
	$(".big-pic").attr("src",src);
});

$(".goods-pic").on("mouseover","li",function(){
	var a =$(this).index();
	var src =$(this).find("img").attr("src");
	$(this).parent().find("li").eq(a).addClass("current").siblings().removeClass("current");
	$(".big-pic").attr("src",src);
})
//添加或者减少数量

//添加数量
$(".up").click(function(){
	var num =$(".input").html();
	if(num==5){
		$(".input").html("5");
	}else{
		num++;
		$(".input").html(num);
	}
});
//减少数量
$(".down").click(function(){
	var num =$(".input").html();
	if(num==1){
		$(".input").html("1");
	}else{
		num--;
		$(".input").html(num);
	}
});

$(".goods-info-title li").click(function(){
	var a =$(this).index();
	$(this).addClass("broder-bottom").siblings().removeClass("broder-bottom");
	$(".goods-info-details div").eq(a).css("display","block").siblings().css("display","none")
})

//商品选择
$(".property-set dl").on("click","a",function(){
	$(this).parent().find("span").html($(this).html());
	$(this).css("border","1px solid #00C3F5").siblings().css("border","1px solid #dcdcdc")
});

$(function(){
	var url=location.href;
	var arr=url.split("?")[1];
	var path=arr.split("&")[0].split("=")[1];
	var name=arr.split("&")[1].split("=")[1];
	var id=arr.split("&")[2].split("=")[1];
	$.ajax({
		type:"get",
		url:path,
		success:function(res){
			var brr =res[name].list;
			var str="";
			var phonetype="";
			for(var i in brr){
				if(brr[i].id==id){
					str=`<p>
							<img src="${brr[i].src[0]}" class="big-pic"/>
						</p>
						<ul class="small-pic">
						</ul>`;
					phonetype=`<span>${brr[i].name}</span>`;
					$(".goods-pic").html(str);
					$(".phone-name").html(phonetype);
					var crr=brr[i].src;
					var imglist="";
					for(var j  in crr){
						if(j==0){
							imglist+=`<li class="current">
								<img src="${crr[j]}"/>
							</li>`;
						}
						else{
							imglist+=`<li>
								<img src="${crr[j]}"/>
							</li>`;
						}
					}
					$(".small-pic").html(imglist);
					var phonetitle=`<h1>${brr[i].name}</h1>
							<p>${brr[i].word}</p>`;
					$(".property-name").html(phonetitle);
					var propertyprice=`<span>￥</span>
									<span id="price">${brr[i].price}.00</span>`;
					$(".property-price-list").html(propertyprice);
					
					var stages3=(brr[i].price/3).toFixed(2);
					var stages6=(brr[i].price/6).toFixed(2);
					var stages12=(brr[i].price/12).toFixed(2);
					var stages=`
								<a href="#">
									<span class="huabei-price">¥<i>${stages3}</i>×3期</span>
									<span class="huabei-stages">免手续费</span>
								</a>
								<a href="#">
									<span class="huabei-price">¥<i>${stages6}</i>×6期</span>
									<span class="huabei-stages">免手续费</span>
								</a>
								<a href="#">
									<span class="huabei-price">¥<i>${stages12}</i>×12期</span>
									<span class="huabei-stages">免手续费</span>
								</a>`;
					$(".huabei-by-stages").html(stages);
					break;
				}
			}
		}
	});
	
	
	
})
//添加购物车
$(".add").click(function(){
	var url=location.href;
	var arr=url.split("?")[1];
	var path=arr.split("&")[0].split("=")[1];
	var JsonName=arr.split("&")[1].split("=")[1];
	var id=arr.split("&")[2].split("=")[1];
	var name=$(".property-name h1").html();
	var netType=$(".net-span").html();
	var memory=$(".memory-span").html();
	var color=$(".color-span").html();
	var phonePackage=$(".tao-span").html();
	var src=$(".big-pic").attr("src");
	var num=$(".input").html();
	var price=$("#price").html();
	if(netType.length==0||memory.length==0||color.length==0||phonePackage.length==0){
		alert("请填写购买商品的型号!")
		return;
	}
	var arr=[];
	var flag = true;//可以向数组中添加数据
	var res={
		"path":path,
		"JsonName":JsonName,
		"name":name,
		"id":id,
		"netType":netType,
		"memory":memory,
		"color":color,
		"phonePackage":phonePackage,
		"src":src,
		"price":price,
//		"num":num,
		"count":1
	}
	console.log(res);
	var localData=JSON.parse(localStorage.getItem('phone')?localStorage.getItem('phone'):[]);
	console.log(localData)
	console.log(typeof(localData))
	if(localData!=0){
		arr = localData;
		for(var i in arr){
			if(res.netType == arr[i].netType && res.memory == arr[i].memory&&res.color == arr[i].color){
					arr[i].count++;
					flag = false;
					break;
				}
		}
		
	}
	if(flag){
			arr.push(res);
		}
	localStorage.setItem('phone',JSON.stringify(arr));
	alert("添加购物车成功!");
	console.log(localStorage.getItem('phone'))
})
	
//	
	
	
	
	
	
	
	//当再次点击按钮时，cookie信息被覆盖  解决 ： 先取出cookie数据 存入到数组中，然后在把新增的商品存入到数组中
	/*var cookieInfo = getCookie("phone");
	if( cookieInfo.length != 0 ){//表示cookie中有数据
			arr = cookieInfo;
			//点击相同商品时，需要做商品数量的累加    用当前点击的商品编号id   和  取出来的cookie的 数据中商品id做比较 发现有相等的，count++
			for(var i in arr){
				if(res.netType == arr[i].netType && res.memory == arr[i].memory&&res.color == arr[i].color){
					arr[i].count++;
					flag = false;
					break;
				}
			}
		}
	if(flag){
			arr.push(res);
		}
	setCookie("phone",JSON.stringify(arr));
	alert("添加购物车成功!");
})*/
