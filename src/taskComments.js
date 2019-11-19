import React from 'react'; 
import './taskComments.css'; 
import { motion } from 'framer-motion'; 

export function TaskComments(){

    const openSidePanel = () => {
        console.log("test"); 
    }
    return (
        <div className="assignCommentsDiv">
            <motion.button 
            id="addCommentButton" 
            onClick={openSidePanel}
            whileTap={{scale: 0.8 }}>
                <i className="far fa-comment"></i>
            </motion.button>
            <span className="tooltiptext">Add Task Notes</span>
        </div>
    )
}