import { Navigate, Outlet } from "react-router-dom";

//searches for cookie with input string
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
  }

function Protected(){

	var auth = {'token': false};

	//checks if session cookie still exists and naviagates accordingly
	try {
		if (getCookie('loggedin')){
			const userpass = {
				name: getCookie('name'),
				email: getCookie('email')
			}
			auth.token = true;
			console.log(auth.token)
		}
	}	catch(err) {
		
	}
	
	//sends user back to front page if not logged in
	return(
		auth.token ? <Outlet/> : <Navigate to='/'/>
	)
};


export default Protected;