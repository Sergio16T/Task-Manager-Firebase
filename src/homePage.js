import React from 'react'; 
import App from './App'; 

export default function HomePage() {
    const homePage = true;  
    return (
        <App homePage={homePage}></App>
    )
   }

   //pass prop to include if 