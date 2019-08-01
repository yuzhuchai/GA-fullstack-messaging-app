console.log("hi this is linked!");



$("#navClick").on("click",() => {
	if($(".togglenav").css("display")==="none"){
		$(".togglenav").show()
	} else {
		$(".togglenav").hide()
	}
})




$(document).on("keydown",(e) => {
	console.log("i pressed a key");
	// console.log(e);
		if(e.key === "ArrowLeft"){
			$("#scroll").offset({"left":"+=10"})
		} else if (e.key === 'ArrowRight'){
			$("#scroll").offset({"left":"-=10"})
		}
})