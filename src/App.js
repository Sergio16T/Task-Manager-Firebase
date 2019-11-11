import React from 'react'; 
import NavSideBar from './navSideBar';
import TodoList from './todoList'; 
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore'; 
import 'firebase/database'; 
import 'firebase/auth'; 
import { firebaseConfig } from './firebaseConfig'; 
import Form from './Form'; 
import WelcomeText from './WelcomeText'; 


firebase.initializeApp(firebaseConfig); 

export const db = firebase.firestore(); 


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: true,
      width: window.innerWidth
    }
    this.openMenu = this.openMenu.bind(this); 
    this.clickHamburger = this.clickHamburger.bind(this); 
  }

_isMounted  = false;

componentDidMount() {
  console.log(this.params);
  this._isMounted  = true; 
  this.clickHamburger();
  window.addEventListener('resize', this.updateDimensions.bind(this));
  document.addEventListener('DOMContentLoaded', this.updateDimensions.bind(this)); // this listener should be on the Document Object? 
  
}



componentWillUnmount() {
  this._isMounted = false; 
  window.removeEventListener('resize', this.updateDimensions.bind(this));
  document.removeEventListener('DOMContentLoaded', this.updateDimensions.bind(this)); 
}


  render() {
    return (
      <div>
        <div className="app-header">
        <i ref ="hamburger" onClick = {this.openMenu} id ="hamburger" className="fas fa-bars"></i>
        <h3>Task Manager</h3>
        <div id="userPhoto" style={{backgroundImage: this.props.user ? `url(${this.props.user.photoUrl})`: ''}}></div>
        <div id="userName">{this.props.user.displayName}</div>
        <button onClick={() => {firebase.auth().signOut();}} id="logOutButton">Log out</button>
        </div>
        <div className ="wrapper">
        <NavSideBar user = {this.props.user} responsive ={this.state.responsive} clickHam ={this.clickHamburger} />
        <div className='listContainer'>
        <WelcomeText homePage ={this.props.homePage}/>
        <Form homePage ={this.props.homePage} user = {this.props.user}/> 
        <TodoList user={this.props.user}/> 
        </div>
        </div>
      </div>
    );
  }
  //Sets state of text to input value on change 

  updateDimensions =() => {
    if(this._isMounted){
      this.setState({
        width: window.innerWidth
      });
      if (this.state.width < 720){
        this.setState({
          responsive: false  
        });
      }
      if (this.state.width >= 720){
        this.setState({
          responsive: true
        });
      }
      // note took this.openMenu() out changed false and true to opposites 
    }
  }

  openMenu() {
   
    if(this.state.responsive) {
      this.setState({
        responsive: false
      });
    } else {
      this.setState({
        responsive: true
      });
    }
    if(this.state.width >= 720) {
    this.setState({
      responsive: true
    });
  }

  }

  clickHamburger(){
    this.refs.hamburger.click(); 
  }


}


export default App;
export { firebase }; 

/*
handleSubmit(e) {
  e.preventDefault();
  if (!this.state.text.length) {
    //prevent's empty text from being added to TO DO
    return;
  }
  db.collection('Projects')
  .doc()

  const newItem = {
    text: this.state.text, // grabs text from state set by handleChange(e)
    id: Date.now()
  };

  this.setState(state => ({
    items: state.items.concat(newItem), // taking value of state.items and using concat which returns a new array of merged (existing array containing object(s) with addition of new object)
    text: '' // resets to empty string ready for next input to use handleChange(e)
  }));
}
*/ 