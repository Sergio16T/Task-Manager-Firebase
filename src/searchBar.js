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
            selectedUser: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.getUsers = this.getUsers.bind(this); 
        this.selectUser = this.selectUser.bind(this); 

    }
    handleInputChange() {
        const matchArray = findMatches(this.refs.input.value, this.state.users);
        if(this.state.matches.length !== matchArray.length) { 
            this.setState({
                query: this.refs.input.value, 
                matches: matchArray
            }); 
            //console.log(this.state.matches); 
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
          //console.log(this.state.results); 
      }
     
    selectUser = (e) =>{ 
        let userID =e.target.getAttribute('data-key'); // returns reference to user ID in DB
        let projectId = this.props.projectId; 
        let taskId = this.props.taskId; 
        let profileUser = this.props.profileUser.uid; 

        this.setState({
            selectedUser: e.target.textContent
        }); 
        db.collection(`users/${profileUser}/taskProjects/${projectId}/Tasks`) 
        .doc(`${taskId}`)
        .update({
            assignedUserName: e.target.textContent, 
            assignedUserId: userID  
        }); 
        this.props.toggleModal(); 
        //need to be able to write this task to another user's db tasks need to write another db write operation to add this task to areli's firestore and update in her UI. 
      //inside here add selected user to Task in DB. Including email, displayName, and photoUrl  
    }

    render(){
        return (
            <div className="selectUserContainer">
           {/* this.state.selectedUser && ( <div className="userSelection">{this.state.selectedUser}</div> ) 
            instead here if state not undefined show assigned user from DB query */}
            <div className="searchContainer" style ={this.props.style}>
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
