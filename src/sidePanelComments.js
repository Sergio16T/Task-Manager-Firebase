import React, {useState, useEffect} from 'react'; 
import './sidePanelComments.css'; 



export function SidePanelComments() {
    const [headerMessage, setHeaderMessage] =useState('Add Comment to Task'); 
    const [comments, setComments] = useState([]); 

    useEffect(()=> {
        return setComments([{
            id: '124gsa03ds2', 
            text: 'First Comment'
        }, {
            id: 'asdgh127r10ff0', 
            text: 'Second Comment'
        }
        ]); 
    },[])

    return (
        
        <div className="sidePanel">
            <div id="closeX">
                <div id="xTop"></div>
                <div id="xBottom"></div>
            </div>
            <h2>{headerMessage}</h2>
            <ul>
                {comments && comments.map(comment => (
                    <div className="commentContainer">
                        <li className="commentItem" key={comment.id}>{comment.text}</li>
                    </div>
                    
                ))}
            </ul>
        </div>
    )
}