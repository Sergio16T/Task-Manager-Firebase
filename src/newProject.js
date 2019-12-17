import React from 'react'; 
import App from './App'; 
import {useParams} from 'react-router-dom'; 
import './App.css';



function Project({...props}) {
    const { projectId } = useParams(); 
     return (
         <App user ={props.user} projectId = {projectId} > </App>
     )
 
}

export default Project; 