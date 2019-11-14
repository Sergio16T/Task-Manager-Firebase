import React from 'react'; 
import { firebase } from './App'; 
import './searchBar.css'; 

export class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            users: [], 
            matches: []
        }
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.getUsers = this.getUsers.bind(this); 
    }
    handleInputChange() {
        const matchArray = findMatches(this.refs.input.value, this.state.users);
        if(this.state.matches.length !== matchArray.length) { 
            this.setState({
                query: this.refs.input.value, 
                matches: matchArray
            }); 
            console.log(this.state.matches); 
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
    

    render(){
        return (
            <div className="searchContainer">
                <input id ="searchUserInput"ref="input" placeholder="Search Users" onChange={this.handleInputChange}/>
                {this.state.users && this.state.matches.map(user => (
                <p className="searchResult" key ={user.uid}>{user.displayName}</p>
                ))}
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