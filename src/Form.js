import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { useParams } from 'react-router-dom'; 
import { db } from './App'; 
import './App.css';

export default function Form(props) {

    const [text, setText] = useState(''); 
    let { projectId } = useParams(); 
  
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
        Complete: false,
        author: props.user.uid
      });
    
      setText(''); // resets to empty string ready for next input to use handleChange(e)
      
    }
  
    const handleChange = (e) => {
      setText(e.target.value );
    }
  
    return (
      <form id ="addTaskForm" autoComplete="off" onSubmit={handleSubmit}>
              <input
                placeholder="What needs to be done?"
                id="new-todo"
                onChange={handleChange}
                value={text}
              />
              <motion.button
              id ="formButton" 
              whileHover ={{scale: 1.1}}
              whileTap ={{scale: 0.9, x: "-5px", y: "5px"}}
              >
                <i className="fas fa-plus"></i>
              </motion.button>
            </form>
    )
  }