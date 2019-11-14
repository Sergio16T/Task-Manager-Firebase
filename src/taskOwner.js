import React, {useState, useEffect} from 'react'; 
import { Search } from './searchBar'; 
import './taskOwner.css';

export function TaskOwner() {
    const [modalIsOpen, setModal] = useState(false); 

    const openModal =() => {
        if(modalIsOpen === false) {
            setModal(true); 
        } else if (modalIsOpen === true) {
            setModal(false)
        }
    }
    return (
        <div className="assignTaskDiv">
            <div className="userButtonDiv">
                <button id="selectUserButton" onClick={openModal}><i className="fas fa-user"></i></button>
            </div> 
            <Search style ={{display: modalIsOpen ? 'block': 'none'}}/>
        </div>
    )
}