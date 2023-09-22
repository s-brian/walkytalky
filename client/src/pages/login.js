import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function createCookie(user){
    document.cookie = "loggedin=true";
    document.cookie = "user=" + user.name;
    document.cookie = "email=" + user.email;
};

function Login() {

    const navigate = useNavigate();
 
    const logout = (() => {
    googleLogout();
    })
    
    return(

        <div>
            home
            <GoogleLogin
            onSuccess={credentialResponse => {
                console.log('Login Success');
                //decode and create a cookie to store user session login
                const user = jwt_decode(credentialResponse.credential);
                createCookie(user);
                console.log(user.picture)
                const userpass = {
                    name: user.name,
                    email: user.email,
                    picture: user.picture
                };
                //redirect to loggedin page with credentials
                navigate("/loggedin", {state: userpass});                             
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            />
        </div>
    )
}

export default Login;