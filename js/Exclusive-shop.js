$(".index-content-nav").on("click","a",function(){
	var index=$(this).index();
	$(".index-content-nav a").eq(index).addClass("nav-active").siblings().removeClass("nav-active");
	$(".shop-address div").eq(index).show().siblings().hide();
})
