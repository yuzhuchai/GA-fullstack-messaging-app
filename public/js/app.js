console.log("hi this is linked!");



$("#navClick").on("click",() => {
	if($(".togglenav").css("display")==="none"){
		$(".togglenav").show()
	} else {
		$(".togglenav").hide()
	}
})

