import React, {useState, useEffect, useRef} from 'react'; 
import './sidePanelComments.css'; 
import { useParams } from 'react-router-dom'; 
import { db } from './App'; 
import { SidePanelForm} from './sidePanelForm'; 
import formatDate from 'date-fns/format'; 

export function SidePanelComments(props) {
    const [taskId, setTaskId] = useState(''); 
    const [comments, setComments] = useState([]); 
    const { projectId } = useParams(); 
    const [text, setText] = useState(''); 
    const [assignedUser, setAssignedUser] = useState(''); 
    const [author, setAuthor] = useState(''); 
    const [commentsComplete, setComplete] = useState(false); 
    const scrollerRef = useRef(); 
    const shouldScrollRef = useRef(true); 

    useEffect(()=> { 
        //console.log('profileUser', props.user.uid)   
        shouldScrollRef.current= true; 
        let result = {}; 
        let taskData = {}; 
        async function setArguments() {
            await setTaskId(props.taskId.toString()); 
        }
        
        async function getTaskAuthor() {
            await db.collection(`users/${props.user.uid}/taskProjects`)
            .doc(`${projectId}`)
            .collection('Tasks')
            .doc(`${taskId}`).get()
            .then(snapshot => {
                taskData = {...snapshot.data()}
            }); 
            setAuthor(taskData.author); 
            
        } 
        async function getAssignedUser() {
            await db.collection(`users/${props.user.uid}/taskProjects`)
            .doc(`${projectId}`)
            .collection('Tasks')
            .doc(`${taskId}`).get()
            .then(snapshot => {
                result ={...snapshot.data()}; 
            }); 
            setAssignedUser(result.assignedUserId); 
        }
        const setUserComments = async (userId, projectId, taskId) => {
            await db.collection(`users/${userId}/taskProjects`)
            .doc(`${projectId}`) 
            .collection('Tasks')
            .doc(`${taskId}`)
            .collection('Comments')
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                const comments = [];
                snapshot.forEach(comment => {
                    comments.push({
                        data: comment.data(),
                        id: comment.id
                    }); 
                }); 
                setComments(comments);
                if(shouldScrollRef.current) {
                    const node = scrollerRef.current;
                    node.scrollTop = node.scrollHeight; 
                }
                //console.log('setComments', comments); 
                setComplete(true);  
                if (commentsComplete && assignedUser && assignedUser!== props.user.uid){
                    comments.forEach(comment => {
                        db.collection(`users/${assignedUser}/taskProjects`)
                        .doc(`${projectId}`) 
                        .collection('Tasks')
                        .doc(`${taskId}`)
                        .collection('Comments')
                        .doc(comment.id)
                        .set({...comment.data})
                    })
                    //console.log('update');   
                }
                if (commentsComplete && author && author !== props.user.uid) {
                    comments.forEach(comment => {
                        db.collection(`users/${author}/taskProjects`)
                        .doc(`${projectId}`) 
                        .collection('Tasks')
                        .doc(`${taskId}`)
                        .collection('Comments')
                        .doc(comment.id)
                        .set({...comment.data})
                    })
                }
            }); 
        }
       
        setArguments(); 
        setComments([]); 

        if (taskId !== '') {
            getAssignedUser();
            //console.log(assignedUser);                
        }
        if (taskId !== '' && assignedUser){
            setUserComments(props.user.uid, projectId, taskId);  
            getTaskAuthor();  
            //console.log('author', author);        
        }
    
        
    },[props.taskId, projectId, props.user.uid, taskId, assignedUser, commentsComplete, author])

    const handleScroll = () => {
        const node = scrollerRef.current; 
        const { scrollTop, clientHeight, scrollHeight} = node; 
        const isAtBottom = scrollTop + clientHeight === scrollHeight; 
        shouldScrollRef.current = isAtBottom; 
    }

    const submitComment = async (comment) => {
        if (comment === '') {
            return; 
        }
        if(taskId !== '' && assignedUser) {
            await db.collection(`users/${props.user.uid}/taskProjects`)
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
            
            //console.log('submit', comments);  
        } 
        setText('');  
    }

    const handleChange = (e) => {
        setText(e.target.value); 
    }

    return (
        
        <div className= {props.sidePanelClassName} ref={scrollerRef} onScroll={handleScroll}>
            <div className="sidePanelHeader">
                <div id="closeX" onClick={props.toggleSidePanel}>
                    <div id="xTop"></div>
                    <div id="xBottom"></div>
                </div>  
            
            </div>
            <div className="commentListWrapper">
            <ul>
                {comments.length ? comments.map((comment, index) => (
                    <div className="commentContainer" key={index}>
                        <div className="commentAuthor">
                            <div id="authorPhoto" style ={{backgroundImage: `url(${comment.data.authorPhoto})`}}></div>
                            <p id="authorLabel">{comment.data.author}</p>
                            <p id="timeLabel">{formatDate(comment.data.createdAt.seconds * 1000, 'h:mm aaa')}</p> 
                        </div>
                        <li className="commentItem" key={comment.id}>{comment.data.Comment}</li>
                        <p id="dateLabel">Created on {new Date(comment.data.createdAt.seconds * 1000).toLocaleDateString()}</p>
                    </div>
                    
                )) : (
                    <div>
                        <p> Add your first comment! </p>
                    </div>
                )}
            </ul>
            </div>
            <div className="commentBox">
                <SidePanelForm 
                submitComment ={submitComment}
                handleChange={handleChange}
                inputValue = {text}
                /> 
            </div>
        </div>
    )
}

