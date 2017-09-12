//轮播图
$(function(){
	var  servicetimer= setInterval(auto,2000);
	var serviceIndex=0;
	function auto(){
		console.log(serviceIndex)
		$(".server-banner-img img").eq(serviceIndex).fadeIn(1000).siblings().fadeOut(1000);
		$(".service-btn li").eq(serviceIndex).addClass("active").siblings().removeClass("active");
		serviceIndex++;
		if(serviceIndex==2){
			serviceIndex=0;
		}
	}
	
//触摸换轮播图
	$(".server-banner").mouseenter(function(){
		clearInterval(servicetimer);
		$(".service-btn").on("click","li",function(){
			serviceIndex = $(this).index();
			auto();
		})
	}).mouseleave(function(){
		servicetimer= setInterval(auto,2000);
	})
//点击弹出视频
	$(".video-ul").on("click","a",function(){
		var path=$(this).data("video");
		var str="";
		str=`<video id="video" poster="auto" src="${path}" preload="auto" controls="controls" autoplay="autoplay"></video>
				<img src="img/server/close.png" class="close-video"/>`;
		$("#video-list").show();
		$("#video-list").html(str);
	
	})
	$("#video-list").on("click","img",function(){
		$("#video-list").html("");
		$("#video-list").hide();
	})
})
//