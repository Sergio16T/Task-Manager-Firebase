import React from 'react'; 
import { firebase, db } from './App'; 
import './searchBar.css'; 


export class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            users: [], 
            matches: [],
            selectedUser: '', 
            comments: []
        }
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.getUsers = this.getUsers.bind(this); 
        this.selectUser = this.selectUser.bind(this); 
        this.result = []; 
    }
    handleInputChange() {
        const matchArray = findMatches(this.refs.input.value, this.state.users);
        if(this.state.matches.length !== matchArray.length) { 
            this.setState({
                query: this.refs.input.value, 
                matches: matchArray
            }); 
            
        }
        if(this.refs.input.value === '') {
            this.setState({
                query: '',
                matches: []
            });
        }
    }

    getUsers = async () => {
        const snapshot = await firebase.firestore().collection('users').get(); 
        let users = snapshot.docs.map(doc => doc.data()); 
        let result = [...users];
        this.setState({
            users: result
        });
      }
     
      componentDidMount() {
          this.getUsers(); 
          document.addEventListener('mousedown', this.handleClick); 
      }
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick); 
      }
     
    getTaskDataToUser = async (userID) => { 
        const {projectId, taskId, profileUser} = this.props;
        let result = {}; 
        await db.collection(`users/${profileUser.uid}/taskProjects/${projectId}/Tasks`) 
                    .doc(`${taskId}`).get()
                    .then(snapShot => 
                        result = {...snapShot.data()}
                        ); 
        this.result = result; 
        //console.log(this.result); 
        db.collection(`users/${userID}/taskProjects`)
        .doc(`${projectId}`)
        .collection(`Tasks`)
        .doc(`${taskId}`)
        .set({...this.result});
    }

    selectUser = (e) =>{ 
        const {projectId, taskId, profileUser} = this.props; 
        let userID =e.target.getAttribute('data-key'); // returns reference to user ID in DB

        this.setState({
            selectedUser: e.target.textContent
        }); 
        db.collection(`users/${profileUser.uid}/taskProjects/${projectId}/Tasks`) 
        .doc(`${taskId}`)
        .update({
            assignedUserName: e.target.textContent, 
            assignedUserId: userID,
        });

        db.collection(`users/${userID}/taskProjects`)
        .doc(`${projectId}`)
        .update({
          request: `requested task from ${profileUser.displayName}`
        }); 
        this.getTaskDataToUser(userID); 

       
        async function getComments() {
            let comments = []; 
            if (comments.length) {
                return; // try 
            }
            let taskCollectionRef = db.collection(`users/${profileUser.uid}/taskProjects/${projectId}/Tasks`)
                                    .doc(`${taskId}`).collection('Comments');   
            await taskCollectionRef.get().then(snapshot => 
                snapshot.forEach(doc => {
                    comments.push({
                        data: doc.data(), 
                        commentId: doc.id
                    })
                })); 
                //console.log(comments); 
                let commentCollectionRef= db.collection(`users/${userID}/taskProjects/${projectId}/Tasks`)
                .doc(`${taskId}`).collection('Comments'); 

                comments.forEach(comment => {
                    commentCollectionRef.doc(comment.commentId).set(comment.data); 
                });                
        }
        getComments(); 
        
        this.props.toggleModal(); 
    }

    handleClick = (e) => {
        let avatarNode = this.props.avatarNode; 
        if (this.node.contains(e.target)){
            return; 
        } else if (avatarNode.current === e.target){
            return; 
        }  else if (e.target.className === "fas fa-user" || e.target.id ==="selectUserButton" || e.target.id ==="addUserArrow") {
            return 
        } else {
            this.props.closeModal(); 
        }
    }
    render(){
        return (
            <div className="selectUserContainer">
            <div className="searchContainer" style ={this.props.style} ref ={node => this.node = node}>
                <input autoComplete ="off" id ="searchUserInput"ref="input" placeholder="Search Users" onChange={this.handleInputChange}/> <br/>
                <div id="seperator"></div>
                {this.state.users && this.state.matches.map(user => (
                <p className="searchResult" data-key ={user.uid} key ={user.uid} onClick={this.selectUser}>{user.displayName}</p>
                ))}
            </div>
            </div>
        )
    }
}
            //pass in results state as names prop
function findMatches(nameToMatch, names) {
    return names.filter(user => {
        const regex = new RegExp(nameToMatch, 'gi'); 
        return user.displayName.match(regex); 
    })
}
