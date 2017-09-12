//整体商品请求数据
$(function(){
	function getData(options){
		var options = options || "all";
		$.ajax({
		type:"get",
		url:"./mall.json",
		success:function(res){
			var arr =res[options].list;
			var str ="";
			for( var i in arr){
				str=`<li>
						<a href="goods-details.html?json=./mall.json&name=${options}&id=${arr[i].id}">
							<p>
							<img src="${arr[i].src[0]}" class="goods-image"/>
							</p>
							<div class="goods-imagelist  imagelist${i}">
							</div>
							<h4>${arr[i].name}</h4>
							<h5>${arr[i].word}</h5>
							<p class="price-span">
								￥<span>${arr[i].price}</span>起
							</p>
						</a>
					</li>`;
				$(".goods-list-wrap").append(str);
				var brr=arr[i].src;
				var stb="";
				for(var j in brr){
					stb+=`<img src="${brr[j]}"/>`;
				}
				if($(".imagelist+"+i).html()){
				}else{
					$(".imagelist"+i).append(stb);
				}
			}
			
		}
	});
	}

	
	//点击分类项目获取不同类别数据
	$(".classification-li li").click(function(){
		$(".goods-list-wrap").html("");
		var name=$(this).data("name");
		getData(name);
	});
	
	
	var str = location.href;
	//http://127.0.0.1:8020/MEIZU/goods.html?phone=phone
	console.log(str);
	var arr = str.split("?")[1];
	if(arr){
		var name = arr.split("&")[0].split("=")[1];
		console.log(name)
		if(name.length>0){
			getData(name);
		}
	}
	else{
		//页面加载获取全部商品的信息
		getData();
	}
	
	
});

//鼠标移入图片,换取背景图片
	$(".goods-list-wrap").on("mouseenter","img",function(){
		var str =$(this).attr("src");
		$(this).parent().parent().find(".goods-image").attr("src",str);
	})
	
	
//调用获取数据
getRecommendData();
//为您推荐的获取数据
function getRecommendData(){
	$.ajax({
			type:"get",
			url:"./mall.json",
			success:function(res){
				var arr =res["Recommend-for-you"].list;
				var str ="";
				console.log(arr);
				for( var i in arr){
					str+=`<li>
						<a href="goods-details.html?json=./mall.json&name=Recommend-for-you&id=${arr[i].id}">
							<img src="${arr[i].src[0]}"/>
							<h4>${arr[i].name}</h4>
							<h5>${arr[i].word}</h5>
							<p class="price-span">
								￥<span>${arr[i].price}</span>起
							</p>
							
						</a>
					</li>`;
				}
				$(".goods-recommendation-pic").html(str);
			}
	});
}


