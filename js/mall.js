//点击关闭广告
$(".close").click(function(){
	$(this).parent().slideUp(1000);
});
/*轮播图效果*/
//设置定时器
var timer =setInterval(autoPlay,3000);
var index1=0;
function autoPlay(){
	$(".banner-index li").eq(index1).addClass("index-active").siblings().removeClass("index-active");
	$(".banner-image img").eq(index1).fadeIn(500).siblings().fadeOut(500);
	index1++;
	if(index1==5){
		index1=0;
	}
}
//鼠标触摸效果
$(".banner-index li").mouseover(function(){
	clearInterval(timer);
	index1=$(this).index();
	autoPlay();
}).mouseover(function(){
	timer =setInterval(autoPlay,3000);
})
//点击按钮效果

//请求json数据
//下拉菜单的请求json数据
$(".mall-nav li").mouseenter(function(){
	$(this).find(".Subordinate-menu").show();
	var name=$(this).find("a").data("name");
	var that=$(this);
	$.ajax({
		type:"get",
		url:"./phone.json",
		success:function(res){
			var arr =res[name];
			var str="";
			for(var i  in arr ){
				str=`<div class="menu-content-child">
								<a href="#" class="child-title">${arr[i].title}
								<i class="iconfont">&#xe601;</i>
								</a>
								<div class='child-content child${i}'></div>
						</div>`;
				that.find(".menu-content").append(str);
				var brr=arr[i].list;
				var stb="";
				for(var j  in brr){
					stb+=`<a href="goods-details.html?json=./phone.json&name=${name}&id=${arr[i].id}" class="a">
							<img src="${brr[j].src[0]}"/>
							<span>${brr[j].name}</span>
							</a>`;
				}
				if($(".child+"+i).html()){
				}else{
					$(".child"+i).append(stb);
				}
				
				
			}
			
		}
	});
}).mouseleave(function(){
	$(this).find(".Subordinate-menu").hide();
	$(this).find(".menu-content").html("")
})

//热门推荐

$(function(){
	//请求json数据
	$.ajax({
		type:"get",
		url:"./title.json",
		success:function(res){
			var arr =res["Recommend"].list;
			var str="";
			for( var i in arr){
				str+=`<li>
						<a href="goods-details.html?json=./title.json&name=Recommend&id=${arr[i].id}">
							<img src="${arr[i].src[0]}"/>
							<h4>${arr[i].name}</h4>
							<h5>${arr[i].word}</h5>
							<p class="price-span">
								￥<span>${arr[i].price}</span>起
							</p>
							
						</a>
					</li>`;
			}
			$(".Recommend-pic").html(str);
		}
	});
	//设置动画
	$("#Recommend_left").click(function(){
		var left=parseInt($(".Recommend-pic").css("left"));
		if(left==0){
			$(".Recommend-pic").animate({"left":-1280},1000);
		}
	})
	$("#Recommend_right").click(function(){
		var left=parseInt($(".Recommend-pic").css("left"));
		if(left<0){
			$(".Recommend-pic").animate({"left":0},1000);
		}
	})
	//手机推荐获取数据
	$.ajax({
		type:"get",
		url:"./mall.json",
		success:function(res){
			var arr =res["phone"].list;
			var str ="";
			for( var i in arr){
				str+=`<li>
						<a href="goods-details.html?json=./mall.json&name=phone&id=${arr[i].id}">
							<img src="${arr[i].src[0]}" class="Mall-product-img"/>
							<h4>${arr[i].name}</h4>
							<h5>${arr[i].word}</h5>
							<p class="price-span">
								￥<span>${arr[i].price}</span>起
							</p>
							
						</a>
					</li>`;
			}
			$("#mall-phone").append(str);
		}
	});
	
	//数码设备的json的请求
	$.ajax({
		type:"get",
		url:"./mall.json",
		success:function(res){
			var arr =res["Recommend"].list;
			var str ="";
			for( var i in arr){
				str+=`<li>
						<a href="goods-details.html?json=./mall.json&name=Recommend&id=${arr[i].id}">
							<img src="${arr[i].src[0]}" class="Mall-product-img"/>
							<h4>${arr[i].name}</h4>
							<h5>${arr[i].word}</h5>
							<p class="price-span">
								￥<span>${arr[i].price}</span>起
							</p>
							
						</a>
					</li>`;
			}
			$("#Digital").append(str);
		}
	});
	
	//配件数码触摸切换请求数据
	$(".Accessory a").mouseover(function(){
		var index=$(this).index();
		$(".Accessory a").eq(index).addClass("changecolor").siblings().removeClass("changecolor");
		var name=$(this).data("name");
		$("#Digital").html("");
		$.ajax({
			type:"get",
			url:"./mall.json",
			success:function(res){
				var arr =res[name].list;
				var str ="";
				if(name=="Recommend"){
					str=`<li>
						<a href="#">
							<img src="img/Mall/digital-shop.jpg" id="Mall-shop-ad"/>
						</a>
					</li>`;
				}
				for( var i in arr){
					str+=`<li>
							<a href="goods-details.html?json=./mall.json&name=${name}&id=${arr[i].id}">
								<img src="${arr[i].src[0]}" class="Mall-product-img"/>
								<h4>${arr[i].name}</h4>
								<h5>${arr[i].word}</h5>
								<p class="price-span">
									￥<span>${arr[i].price}</span>起
								</p>
								
							</a>
						</li>`;
				}
				$("#Digital").append(str);
			}
		});
	});
	
	
	//周边生活json的请求
	$.ajax({
		type:"get",
		url:"./mall.json",
		success:function(res){
			var arr =res["Worth"].list;
			var str ="";
			for( var i in arr){
				str+=`<li>
						<a href="goods-details.html?json=./mall.json&name=Worth&id=${arr[i].id}">
							<img src="${arr[i].src[0]}" class="Mall-product-img"/>
							<h4>${arr[i].name}</h4>
							<h5>${arr[i].word}</h5>
							<p class="price-span">
								￥<span>${arr[i].price}</span>起
							</p>
							
						</a>
					</li>`;
			}
			$("#left-Side").append(str);
		}
	});
	
	//生活周边触摸切换请求数据
	$(".Surrounding-life a").mouseover(function(){
		var index=$(this).index();
		$(".Surrounding-life a").eq(index).addClass("changecolor").siblings().removeClass("changecolor");
		var name=$(this).data("name");
		$("#left-Side").html("");
		$.ajax({
			type:"get",
			url:"./mall.json",
			success:function(res){
				var arr =res[name].list;
				var str ="";
				if(name=="Worth"){
					str=`<li>
						<a href="#">
							<img src="img/Mall/left-shop.jpg" id="Mall-shop-ad"/>
						</a>
					</li>`;
				}
				for( var i in arr){
					str+=`<li>
							<a href="goods-details.html?json=./mall.json&name=${name}&id=${arr[i].id}">
								<img src="${arr[i].src[0]}" class="Mall-product-img"/>
								<h4>${arr[i].name}</h4>
								<h5>${arr[i].word}</h5>
								<p class="price-span">
									￥<span>${arr[i].price}</span>起
								</p>
								
							</a>
						</li>`;
				}
				$("#left-Side").append(str);
			}
		});
	});
	
	
});

