import React from 'react'; 
import App from './App'; 
import {useParams} from 'react-router-dom'; 
import './App.css';

export default function HomePage({...props}) {
    const homePage = true;  
    const {projectId} = useParams(); 
    return (
        <App homePage={homePage} projectId ={projectId}></App>
    )
   }

   //pass prop to include if 