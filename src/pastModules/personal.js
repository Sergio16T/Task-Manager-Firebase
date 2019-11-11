import React from 'react'; 
import App from '../App'; 

class Personal extends React.Component {
    constructor(){
        super();
        this.state = {items:[{text: 'Schedule a dentist appointment', id: Math.random()}], text: ''}
    }
    render() {
        return (
            <App items ={this.state.items}/>
        )
    }
}

export default Personal; 