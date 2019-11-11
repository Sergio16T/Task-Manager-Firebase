import React  from 'react';
import { motion } from 'framer-motion'; 
import { db } from './App'; 

/* need to see db and if status complete or incomplete? 
then set state accordingly. 
*/



class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggled: this.props.taskComplete
        }
        //this.setToggle = this.setToggle.bind(this); 
        this.setTaskComplete = this.setTaskComplete.bind(this); 
        this.projectId = props.projectId; 
        this.taskId = props.taskId; 
        this.userId = props.user.uid; 
    }
  
   setTaskComplete() {
        let task = this.state.isToggled; 
        let newValue = ''; 
        if (task) {
            newValue = false; 
        } else {
            newValue = true
        }
          db.collection(`users/${this.userId}/taskProjects`)
          .doc(`${this.projectId}`) 
          .collection('Tasks')
          .doc(`${this.taskId}`)
          .update({
            Complete: newValue
          });     
          this.setState({
              isToggled: newValue
          })  
    }
    render() {
    const styles1 = {
        borderRadius: 30,
        width: 65,
        height: 65,
        padding: 10,
        margin:"auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white", 
        cursor: "pointer"
        }; 
        const variants = {
        active: {
            opacity: 1, 
            background: "#7fffd4",
            x: "-10px",
            scale: 1.15,
        },
        inactive: {
            opacity: 1,
            background: "#f95c5c",
            x: "30px",
            scale: 1,
        }
        };
        return (
            <motion.div
            type="button"
            key = {this.props.index}
            className="toggleButton"
            onClick={() => this.setTaskComplete()}
            style ={styles1}
            animate ={this.state.isToggled ? "active" : "inactive"}
            variants ={variants}
          >
            <span style ={{color: this.state.isToggled ? "#333" : "white"}}>{this.state.isToggled? "Complete" : "Not Complete"}</span>
          </motion.div>
        )
    }
}

export default Button; 