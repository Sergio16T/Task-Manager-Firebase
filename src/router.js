import React, {useState, useEffect} from 'react';
import Project from './newProject'; 
import HomePage from './homePage'; 
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { firebase, db } from './App'; 
import './router.css';
import './App.css'; 
import { motion } from 'framer-motion'; 



function Router() {
    const user = useAuth(); 

        return user? (
            <BrowserRouter basename ={process.env.PUBLIC_URL}>
                <Route path = "/Projects/:projectId" render={(props) => <Project {...props} user={user}/>}></Route> 
                <Redirect from = "/" to ="/Projects/Welcome" render={(props) => <HomePage {...props} user={user}/>} />  
            </BrowserRouter>  
        ) : (
            <Login/> 
        )
    
}

function useAuth() { 
    const [user, setUser] = useState(null); 

    useEffect(()=> {
        return firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                const user = {
                    displayName: firebaseUser.displayName, 
                    photoUrl: firebaseUser.photoURL, 
                    uid: firebaseUser.uid
                }
                setUser(user); 
                db.collection('users') 
                .doc(user.uid)
                .set(user, {merge: true}); 
                db.collection(`users/${user.uid}/taskProjects`)    
                .doc('Welcome')
                .set({
                    category: 'Welcome to Task Manager!'
                }); 
               
            } else {
                setUser(null); //this will beCalled when user logs out causing rerender
            }
        })
    },[])
    return user; 
}


function Login() {

    const styles = {
        background: "#7fffd4",
        borderRadius: 30,
        width: 100, 
        padding: "10px 20px",
        marginTop: "5%",
        color: "#333",
        outline: "none",
        border: "none",
        cursour: "pointer"
    }
    const handleSignIn = async () => {
        const signInProvider = new firebase.auth.GoogleAuthProvider(); 
        await firebase.auth().signInWithPopup(signInProvider); 
       
    }
    return (
        <div className="logInContainer">
            
            <form className="logInDiv">
            <h2>Welcome to Task Manager</h2>
            <motion.button 
                type= "button"
                id = "logInButton"
                onClick ={handleSignIn}
                style ={styles}
                whileHover ={{scale: 1.1}}
                whileTap ={{scale: 0.9, x: "-5px", y: "5px"}}
              >
            Log in! 
              </motion.button>
            </form>
            
        </div>
    )
}


export default Router; 

