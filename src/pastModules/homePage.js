import React from 'react';
import App from './App'; 
import './App.css';


class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [{text: 'Welcome! Create a task!', id: Date.now()}, {text: 'Become a JavaScript Ninja', id: Date.now()}], text: '' };
    }
   render() {
       return (
           <App items ={this.state.items}></App>
       )
   }
}
  

  export default HomePage;