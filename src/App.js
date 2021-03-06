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
import { AppHeader } from './AppHeader'; 
import { SidePanelComments} from './sidePanelComments'; 



firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore(); 

// research drag and drop feature for tasks to move into project pages.. 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: true,
      width: window.innerWidth,
      hamburgerClassName: '', 
      navSideBarClassName: 'navSideBar-Container',
      sidePanelCommentsIsOpen: 'sidePanel', 
      taskId : '',
      commentsOpen: false

    }
  }

  _isMounted  = false;

  componentDidMount() {
    this._isMounted  = true; 
    window.addEventListener('resize', this.updateDimensions.bind(this));
    document.addEventListener('DOMContentLoaded', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false; 
    window.removeEventListener('resize', this.updateDimensions.bind(this));
    document.removeEventListener('DOMContentLoaded', this.updateDimensions.bind(this)); 
  }

  render() {
    return (  
      <div className ="wrapper">
      <AppHeader
      hamburgerClassName ={this.state.hamburgerClassName}
      openMenu={this.openMenu}
      user = {this.props.user}
      /> 
      <div className ="horizontalWrapper">
      <NavSideBar 
      navClass ={this.state.navSideBarClassName} 
      activeHamburger ={this.state.hamburgerClassName} 
      user = {this.props.user} 
      responsive ={this.state.responsive} 
      clickHam ={this.openMenu} 
      />
      <div className='listContainer'> 
      <WelcomeText homePage ={this.props.homePage}/>
      <Form homePage ={this.props.homePage} user = {this.props.user}/> 
      <TodoList 
      user={this.props.user} 
      toggleSidePanel={this.toggleSidePanel} 
      sidePanelClassName={this.state.sidePanelCommentsIsOpen}
      />  
      </div>
      </div>
      <SidePanelComments
      projectId = {this.props.projectId}
      commentsOpen = {this.state.commentsOpen}
      user = {this.props.user}
      toggleSidePanel={this.toggleSidePanel} 
      sidePanelClassName={this.state.sidePanelCommentsIsOpen}
      taskId={this.state.taskId}
      />
      </div>
    );
  }
 
  toggleSidePanel = (itemId) => {
    if(this.state.sidePanelCommentsIsOpen === 'sidePanel') {
      this.setState({
        sidePanelCommentsIsOpen: 'sidePanelActive', 
        taskId: itemId, 
        commentsOpen: true
      }); 
    } else {
      this.setState({
        sidePanelCommentsIsOpen: 'sidePanel',
        commentsOpen: false
      }); 
    }
    
  }

  updateDimensions =() => {
    if(this._isMounted){
      this.setState({
        width: window.innerWidth
      });
      if (this.state.width < 800){
        this.setState({
          responsive: false
        });
      }
      if (this.state.width >= 800){
        this.setState({
          responsive: true
        });
      }
    }
  }

  openMenu = () => {
    if(this.state.responsive) {
      this.setState({
        responsive: false,
        hamburgerClassName: '',
        navSideBarClassName: 'navSideBar-Container'
        
      });
    } else {
        this.setState({
          responsive: true,
          hamburgerClassName: 'active', 
          navSideBarClassName: 'navSideBar-Containeractive'
        
        });
    }
    if(this.state.width >= 800) {
      this.setState({
        responsive: true
      });
    }
  }

}


export default App;
export { firebase }; 

