$("#header").load("public.html #header");
$("#footer").load("public.html #footer");
$(function(){
	//鼠标触摸下拉菜单，出现遮罩层
	$("#meizu").on("mouseover","li",function(){
		var index= $(this).index();
		$(this).parent().find("li").find("#mark").addClass("mark");
		$(this).find("#mark").removeClass("mark");
	});
//	//购物车
//	var phone=getCookie("phone");
//	console.log(phone.length)
//	$(".count").html(phone.length);
});
//鼠标触摸菜单出现下拉菜单
	var Textcolor="";
	$.ajax({
		type:"get",
		url:"./title.json",
		success:function(res){
			$(".menu li:has(div)").mouseenter(function(){
				Textcolor=$(".menu-li").find("a").css("color");
				$(".menu-li").find("a").css("color","#000");
				$(this).children("div").stop().slideDown(800,function(){
					if($(this).find("ul").find("li").length==0){
						var name=$(this).find("ul").data("class");
						var html="";
						var arr=res[name].list;
						for(var i  in arr ){
							html =`<li class="drop-down-li">
										<a>
										<img src="img/title/${arr[i].src}"/>
										<p>${arr[i].name}</p>
										<span id="mark"></span>
										</a>
									</li>`;
							$(this).find("ul").append(function(){
								$(this).find("li").animate({"margin-left":25},1000)
								return html;
							});
						}
					}
				}.bind(this));
				
			}).mouseleave(function(){
				$(this).children("div").stop().slideUp(800,function(){
					$(this).find("ul").html("");
					$(".menu-li").find("a").css("color",Textcolor);
					Textcolor="";
				});
			})
		}
	});
	
	var timer = setInterval(autoPlay,5000);
    var index = 0;
    function autoPlay(){
     	index++;
     	if(index == 5){
     		index = 0;
     	}
     	var colorarr=["#666","#FFF","#FFF","#FFF","#666"];
     	$(".Carousel ol li").css({"background":colorarr[index]})
     	$(".Carousel ol li").eq(index).addClass("active").siblings().removeClass("active");
     	$(".Carousel ul li").eq(index).animate({"left":0},1500,function(){
     		if(Textcolor==""){
     			$(".menu-li").find("a").css("color",colorarr[index]);
     		}
     		$(this).css("z-index",0).siblings().css({"z-index":1,"left":1920})
     	})
    }
 //鼠标滑动偏移手机图片
$("#phone—conf").on("mouseenter","a",function(){
	$(this).find(".before").stop().animate({"left":50},500);
	$(this).find(".after").stop().animate({"left":-50},500);
});
$("#phone—conf").on("mouseleave","a",function(){
	$(this).find(".before").stop().animate({"left":0},500);
	$(this).find(".after").stop().animate({"left":-0},500);
});
//鼠标滑动到是 显示点击的按钮
$(".Switching-figure").mouseenter(function(){
	$(".figure-right,.figure-left").show();
}).mouseleave(function(){
	$(".figure-right,.figure-left").hide();
})
//鼠标滑动到按钮  改变按钮的颜色
$(".figure-left").mouseover(function(){
	$(".figure-right,.figure-left").css({"opacity":1});
}).mouseout(function(){
	$(".figure-right,.figure-left").css({"opacity":0.1});
})
//鼠标滑动到按钮  改变按钮的颜色
$(".figure-right").mouseover(function(){
	$(".figure-right,.figure-left").css({"opacity":1});
}).mouseout(function(){
	$(".figure-right,.figure-left").css({"opacity":0.1});
})
//点击按钮时，轮转图片
var index1=1;
$(".figure-left").click(function(){
	if(index1 === 1){
		$(".figure").animate({"left":-1270*index1},300);
		index1++;
	}
	else if(index1 === 2){
		$(".figure").animate({"left":-1270*index1},300);
		index1++;
	}else{
		return;
	}
});
$(".figure-right").click(function(){
	if(index1 == 2){
		$(".figure").animate({"left":0},300);
		index1--;
	}
	else if(index1 ==3){
		$(".figure").animate({"left":-1270},300);
		index1--;
	}
});
//鼠标触摸切换图片
$(".Touch li a").mouseenter(function(){
	$(this).find(".before").fadeOut(200);
	$(this).find(".after").fadeIn(200);
}).mouseleave(function(){
	$(this).find(".before").fadeIn(200);
	$(this).find(".after").fadeOut(200);
});

//吸顶效果的菜单
$(window).scroll(function(){
	sTop =$(document).scrollTop();
	if(sTop>340){
		$(".accessory-nav").slideDown(500);
		$(".accessory-nav").css({"top":0,"position": "fixed"});
	}
	else{
		$(".accessory-nav").slideUp(500);
	}
})

