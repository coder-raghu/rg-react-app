import { createContext, useContext,useState } from "react";
import { useNavigate } from "react-router-dom";

export const userContext = createContext({
    user: null,
    logIn: () => {},
    logOut: () => {},
});

var name = localStorage.getItem('shopie-user-name');
var email = localStorage.getItem('shopie-user-email');
var id = localStorage.getItem('shopie-user-id');
var isloggedin = localStorage.getItem('shopie-user-isloggedin');
var loginFlage = true;
if(isloggedin==null){
    loginFlage = false;
}

const USER = { name, email, id, isLoggedIn:loginFlage };

export function UserContextProvider( { children } ){

    const [user, setUser] = useState(USER);
    const navigate = useNavigate();

    function logIn({name,email,id}){

        // console.log("I am loggedin with:" + name);
        setUser({isLoggedIn: true, name, email, id});

        localStorage.setItem('shopie-user-name', name);
        localStorage.setItem('shopie-user-email', email);
        localStorage.setItem('shopie-user-id', id);
        localStorage.setItem('shopie-user-isloggedin', true);
    }
    
    function logOut(){  
        setUser({ name:'', email:'', id:'', isLoggedIn:false });
        localStorage.removeItem('shopie-user-name');
        localStorage.removeItem('shopie-user-email');
        localStorage.removeItem('shopie-user-id');
        localStorage.removeItem('shopie-user-isloggedin');
        navigate('/login');
    }
    
    return( 

        <userContext.Provider value={{ user,logIn, logOut }}>
            {children}
        </userContext.Provider>

    );

}


export function useUserContext(){
    const { user, logIn, logOut } = useContext(userContext);
    return {user, logIn, logOut};
}