import React from 'react'; 
import { useParams } from 'react-router-dom'; 
import './WelcomeText.css'; 

export default function WelcomeText(props) {
    let { projectId } = useParams(); 

    return (projectId === 'Welcome') ? (
        <div className="welcomeText">
            <p>Hello! Welcome to Task Manager.</p> 
            <p>To get started, create a new Task by clicking the green button!</p>
            <p>To add a new project click on the + sign in the navigation bar on the left! </p>
        </div>
       
   ) : ( null )


 
}
