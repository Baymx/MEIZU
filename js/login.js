$("#Acount-Login").css("color","#32A5E7");
$("#Acount-Login").click(function(){
	$("#Acount-Login").css("color","#32A5E7");
	$("#Code-Login").css("color","#999");
	$(".acount-login").show();
	$(".code-login").hide();
});
$("#Code-Login").click(function(){
	$("#Code-Login").css("color","#32A5E7");
	$("#Acount-Login").css("color","#999");
	$(".acount-login").hide();
	$(".code-login").show();
});
$("#login-footer").load("public.html .footer-info");

$(".button").click(function(){
	var phoneNumber=$(".phone-number").val();
	var psd=$(".psd").val();
	if(phoneNumber.length<=0){
		console.log("22");
	}
});
