import React from 'react'; 
import { firebase } from './App'; 

export class AppHeader extends React.Component {
    constructor(props){
      super(props); 
      this.clickHamburger = this.clickHamburger.bind(this);  
    }
    componentDidMount(){
      this.clickHamburger(); 
    }
    clickHamburger(){
      this.refs.hamburger.click(); 
    }
    render(){
      return (
        <div className="app-header">
        <div ref ="hamburger" id="hamburger2" className={this.props.hamburgerClassName} onClick={this.props.openMenu}>
          <div id="top"></div>
          <div id="middle"></div>
          <div id="bottom"></div>
        </div>
        {/* <i ref ="hamburger" onClick = {this.openMenu} id ="hamburger" className="fas fa-bars"></i> */}
        <h3>TaskHub</h3>
        <div id="userPhoto" style={{backgroundImage: this.props.user ? `url(${this.props.user.photoUrl})`: ''}}></div>
        <div id="userName">{this.props.user.displayName}</div>
        <button onClick={() => {firebase.auth().signOut();}} id="logOutButton">Log out</button>
        </div>
      )
    }
  
  }