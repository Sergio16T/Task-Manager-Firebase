import React, {useState, useEffect} from 'react';
import Button from './button';
import './App.css';
import './toDoList.css';
import { db } from './App'; 
import { useParams } from 'react-router-dom'; 
import { TaskOwner } from './taskOwner'; 
import { TaskComments } from './taskComments'; 

export function useCollection(user){
  const [items, setItems]= useState([]); 
  let { projectId } = useParams(); 
 
  useEffect(() => {
    setItems([]); 
    return db.collection(`users/${user.uid}/taskProjects`)
    .doc(`${projectId}`) 
    .collection('Tasks')
    .orderBy('createdAt')
    .onSnapshot((snapshot) => {
        const tasks = []; 
        snapshot.forEach(task => {
            tasks.push({
                ...task.data(),
                id: task.id
            }); 
        }); 
        setItems(tasks); 
      });   
  },[projectId, user.uid]);
  // console.log('line');
  // console.log('items:', items);
  return items; 
}

function TodoList(props) {
  const items = useCollection(props.user); 
  let { projectId } = useParams(); 

    return (
      
      <ul className="unorderedListWrapper">
        {items.map((item, index) => (
            <div key ={item.id} className="taskRow">
          <div key = {`${index}a`} className ='itemContainer'>
            <li className ='listItems' key={item.id}>{item.Task}</li>
            <Button 
            index ={index} 
            taskComplete ={item.Complete} 
            taskId ={item.id} //use this as reference for taskId to add comments collection to this task in DB and then comments doc's added. 
            projectId ={projectId}
            user = {props.user}
            >
            </Button>
            </div>
            <TaskOwner 
            profileUser ={props.user} 
            projectId ={projectId} 
            taskId ={item.id}  
            /> 
            <TaskComments
            user = {props.user}
            itemId = {item.id}
            toggleSidePanel = {props.toggleSidePanel.bind(this, item.id)}
            /> 
            </div>     
        ))}   
      </ul>

    );
  
}


export default TodoList; 

