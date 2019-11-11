import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { useParams } from 'react-router-dom'; 
import { db } from './App'; 

export default function Form(props) {

    const [text, setText] = useState(''); 
    let { projectId } = useParams(); 
  
    const styles = {
      background: "#7fffd4",
      borderRadius: 30,
      width: 100, 
      padding: "10px 20px",
      margin: "0vh 2vh",
      color: "#333",
      outline: "none",
      border: "none",
      cursour: "pointer"
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!text.length) {
        //prevent's empty text from being added to TO DO
        return;
      }
      db.collection(`users/${props.user.uid}/taskProjects`)
      .doc(`${projectId}`)
      .collection('Tasks')
      .add({
        Task: text, // grabs text from state set by handleChange(e)
        createdAt: Date.now(),
        Complete: false
      });
    
      setText(''); // resets to empty string ready for next input to use handleChange(e)
      
    }
  
    const handleChange = (e) => {
      setText(e.target.value );
    }
  
    return (
      <form onSubmit={handleSubmit}>
              <label id= "inputLabel" htmlFor="new-todo">
                What needs to be done?
              </label>
              <input
                id="new-todo"
                onChange={handleChange}
                value={text}
              />
              <motion.button 
              style ={styles}
              whileHover ={{scale: 1.1}}
              whileTap ={{scale: 0.9, x: "-5px", y: "5px"}}
              >
                <i className="fas fa-plus"></i>
              </motion.button>
            </form>
    )
  }