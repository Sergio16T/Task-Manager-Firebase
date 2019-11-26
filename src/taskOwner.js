import React, {useState, useEffect} from 'react'; 
import { Search } from './searchBar'; 
import './taskOwner.css';
import { db } from './App'; 


export function TaskOwner(props) {
    const [modalIsOpen, setModal] = useState(false); 
    const [queryUser, setQueryUser] = useState([]); 
    const [userPhoto, setUserPhoto] = useState([]); 
    

    const openModal =() => {
        if(modalIsOpen === false) {
            setModal(true); 
        } else if (modalIsOpen === true) {
            setModal(false)
        }
    }
    const closeModal = () => {
        setModal(false); 
    }
    let resultObject = {}; 
    

    useEffect(()=> { // add dependencyArray? 
        let queryUser; 
        let isSubscribed = true; 
        async function getTaskData() { 
            let result = {}; 
            await db.collection(`users/${props.profileUser.uid}/taskProjects/${props.projectId}/Tasks`) 
                        .doc(`${props.taskId}`).get()
                        .then(snapShot => 
                            result = {...snapShot.data()}
                            ); 
            

            if(isSubscribed) {
                //console.log('async1', result); 
                setQueryUser(result.assignedUserId);    
                Object.assign(resultObject, result); 
                //console.log(resultObject); 
                queryUser = result.assignedUserId;          
            }
            if(queryUser) {
                getUserData(); 
            }
          
    }
    getTaskData(); 
    
    async function getUserData() { 
       let query = await db.collection('users').doc(`${queryUser}`).get(); 
       let userData = query.data(); 
       //console.log('async2', userData); 
       setUserPhoto(userData.photoUrl); 
    }
    
    return () => isSubscribed = false; 
     
    }); 

    let avatarNode = React.createRef(); 
    
    return (
        <div className="assignTaskDiv">
            <div className="userButtonDiv">
            {userPhoto && queryUser ? (<button id="selectUserAvatar" ref={avatarNode} onClick={openModal} style ={{backgroundImage: `url(${userPhoto})`}}></button>) : 
            (<button id="selectUserButton" onClick={openModal}><i className="fas fa-plus" id="addUserArrow"></i><i className="fas fa-user"></i></button>)}
            </div> 
            <Search
            taskData = {resultObject}
            avatarNode = {avatarNode}
            closeModal = {closeModal}
            toggleModal = {openModal}
            queryUser = {queryUser} 
            profileUser = {props.profileUser} 
            projectId ={props.projectId} 
            taskId={props.taskId} 
            style ={{display: modalIsOpen ? 'block': 'none'}}
            />
        </div>
    )
}