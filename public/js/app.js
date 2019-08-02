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
	$(document).blur()
	$("#scroll").focus(() => {
		console.log(`i am focused`);
	})
	// console.log(e);
		if(e.key === "ArrowLeft"){
			$("#scroll").focus()
			$("#scroll").offset({"left":"+=10"})
			// e.preventDefault()
			// $("#galleryFloor").css({"width":"-=10"})

		} else if (e.key === 'ArrowRight'){
			// e.preventDefault()
			$("#scroll").focus()
			$("#scroll").offset({"left":"-=10"})
			// $("#galleryFloor").css({"width":"+=10px"})
		}
})
