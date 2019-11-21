import React, {useState, useEffect} from 'react'; 
import './sidePanelComments.css'; 
import { useParams } from 'react-router-dom'; 
import { db } from './App'; 
import { SidePanelForm} from './sidePanelForm'; 
import formatDate from 'date-fns/format'; 

export function SidePanelComments(props) {
    const [headerMessage] =useState('Add Comments!'); 
    const [taskId, setTaskId] = useState(''); 
    const [comments, setComments] = useState([]); 
    const { projectId } = useParams(); 
    const [text, setText] = useState(''); 
    
    
   

    useEffect(()=> {
        async function setArguments() {
            await setTaskId(props.taskId.toString()); 
        } 
        setArguments(); 
        setComments([]); 

        if (taskId !== '') {
            return db.collection(`users/${props.user.uid}/taskProjects`)
            .doc(`${projectId}`) 
            .collection('Tasks')
            .doc(`${taskId}`)
            .collection('Comments')
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                const comments = []; 
                snapshot.forEach(comment => {
                    comments.push({
                        ...comment.data(),
                        id: comment.id
                    }); 
                }); 
                setComments(comments);
                //console.log(comments);  
                });   
        }
        
    },[props.taskId, projectId, props.user.uid, taskId])

    const submitComment = (comment) => {
        if(taskId !== '') {
        db.collection(`users/${props.user.uid}/taskProjects`)
        .doc(`${projectId}`) 
        .collection('Tasks')
        .doc(`${taskId}`)
        .collection('Comments')
        .add({
            Comment: comment, 
            createdAt: new Date(),
            author: props.user.displayName, 
            authorId: props.user.uid, 
            authorPhoto: props.user.photoUrl
        }); 
        }
        setText(''); 
    }

    const handleChange = (e) => {
        setText(e.target.value); 
    }
    return (
        
        <div className= {props.sidePanelClassName}>
            <div className="sidePanelHeader">
                <div id="closeX" onClick={props.toggleSidePanel}>
                    <div id="xTop"></div>
                    <div id="xBottom"></div>
                </div>  
            </div>
            <h2 id="headerMessage">{headerMessage}</h2>
            <SidePanelForm 
            submitComment ={submitComment}
            handleChange={handleChange}
            inputValue = {text}
            /> 
            <ul>
                {comments && comments.map((comment, index) => (
                    <div className="commentContainer" key={index}>
                        <div className="commentAuthor">
                            <div id="authorPhoto" style ={{backgroundImage: `url(${comment.authorPhoto})`}}></div>
                            <p id="authorLabel">{comment.author}</p>
                            <p id="timeLabel">{formatDate(comment.createdAt.seconds * 1000, 'h:mm aaa')}</p> 
                        </div>
                        <li className="commentItem" key={comment.id}>{comment.Comment}</li>
                        <p id="dateLabel">Created on {new Date(comment.createdAt.seconds * 1000).toLocaleDateString()}</p>
                    </div>
                    
                ))}
            </ul>
        </div>
    )
}

