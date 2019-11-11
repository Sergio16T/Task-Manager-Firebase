import React from 'react';
import App from '../App'; 
import { db } from '../App'; 

class DevToDo extends React.Component {
    constructor() {
        super();
        this.state = {  items: [{text: 'Schedule meeting with senior developer', id: Date.now()}, {text: 'Become a JavaScript Ninja', id: Date.now()}], text: ''};
      }
      /*
      componentDidMount(){

        db.collection('Projects')
        .doc('Development')
        .collection('Tasks')
        .onSnapshot((snapshot) => {
            console.log(snapshot); 
            const tasks = []; 
            snapshot.forEach(task => {
                tasks.push({
                    ...task.data(),
                    id: task.id
                }); 
            }); 
            console.log(tasks); 
        })
      }
      */
    render() {
        return (
            <App items ={this.state.items}></App>
        )
    }
}

export default DevToDo; 

/* use this to add messages 
db.collection('Projects')
        .doc(this.props.Development)
        .collection('Tasks')
        .add({
            
        })
        */