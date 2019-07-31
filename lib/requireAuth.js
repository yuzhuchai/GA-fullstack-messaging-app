module.exports = (req,res,next)=>{

	if(!req.session.loggedIn){
		req.session.message= "you must log in first"
		res.redirect('/')
	}else{
		next()
	}
}