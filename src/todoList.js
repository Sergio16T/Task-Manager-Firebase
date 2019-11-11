import React, {useState, useEffect} from 'react';
import Button from './button';
import './App.css';
import { db } from './App'; 
import { useParams } from 'react-router-dom'; 

export function useCollection(user){
  const [items, setItems]= useState([]); 
  let { projectId } = useParams(); 

  useEffect(() => {
    setItems([]); 
    return db.collection(`users/${user.uid}/taskProjects`)
    .doc(`${projectId}`) 
    .collection('Tasks')
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
  console.log('line');
  console.log('items:', items);
  return items; 
}

function TodoList(props) {
  const items = useCollection(props.user); 
  let { projectId } = useParams(); 
  
    return (
      <ul>
        {items.map((item, index) => (
          <div key = {`${index}a`} className ='itemContainer'>
          <li className ='listItems' key={item.id}>{item.Task}</li>
          <Button 
          index ={index} 
          taskComplete ={item.Complete} 
          taskId ={item.id}
          projectId ={projectId}
          user = {props.user}
          >
          
          </Button>
          </div>
        ))}
      </ul>
    );
  
}
export default TodoList; 