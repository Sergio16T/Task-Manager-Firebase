import React, { useState, useEffect} from 'react'; 
import './taskComments.css'; 
import { motion } from 'framer-motion'; 
import { useParams } from 'react-router-dom'; 
import { db } from './App'; 

export function TaskComments(props){
    const [count, setCount] = useState(null); 
    const {projectId } = useParams(); 

    useEffect(()=> {
        let isMounted  = true; 
        const getCommentsCount = async (userId, projectId, taskId) => {
            await db.collection(`users/${userId}/taskProjects`)
            .doc(`${projectId}`) 
            .collection('Tasks')
            .doc(`${taskId}`)
            .collection('Comments')
            .onSnapshot((snapshot) => {
                const comments = [];
                snapshot.forEach(comment => {
                    comments.push({
                        data: comment.data(),
                        id: comment.id
                    }); 
                }); 
                if(isMounted) {
                    setCount(comments.length);
                } 
            }); 
        }

        getCommentsCount(props.user.uid, projectId, props.itemId); 

        return () => isMounted = false; 

    }, [props.user.uid, projectId, props.itemId]); 

    return (
        <div className="assignCommentsDiv">
            <motion.button 
            id="addCommentButton" 
            onClick={props.toggleSidePanel}
            whileTap={{scale: 0.8 }}>
                {count !== null && count !==0 && <div id="commentsCount">{count}</div>}<i className="far fa-comment"></i>
            </motion.button>
            <span className="tooltiptext">Add Task Notes</span>
        </div>
    )
}

