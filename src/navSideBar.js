import React from 'react';
import ModalBox from './modalBox'; 
import {Link} from 'react-router-dom'; 
import './navSideBar.css'; 
import './modalBox.css'; 
import {db} from './App'; 
import 'firebase/firestore'; 

class NavSideBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rightArrowClassName: 'right-arrow',
            projectListClassName: 'project-list',
            modalBoxClassName: 'modalBox inactive',
            text: '',
            priorityText: '', 
            projects: []
         
        }
        this.rotateArrow = this.rotateArrow.bind(this); 
        this.openModal = this.openModal.bind(this); 
        this.cancelModal = this.cancelModal.bind(this); 
        this.addProject = this.addProject.bind(this);
        this.handleProjectInput = this.handleProjectInput.bind(this);
        this.handlePriorityInput = this.handlePriorityInput.bind(this); 
        

    }
    componentDidMount() {
        db.collection(`users/${this.props.user.uid}/taskProjects`).onSnapshot(snapshot => {
            const docs = []; 
            snapshot.forEach(doc => {
              docs.push({
                ...doc.data(),
                id: doc.id
              }); 
            }); 
            this.setState({
              projects: docs
            }); 
          }) 
    }
    rotateArrow() {
        if (this.state.rightArrowClassName === 'right-arrow'){
            this.setState({
                rightArrowClassName: 'right-arrow rotate',
                projectListClassName: 'project-list-active'
            }); 
        } else {
            this.setState({
                rightArrowClassName: 'right-arrow',
                projectListClassName: 'project-list'
            });
        } 
    }
    openModal() {
        this.setState({
            modalBoxClassName: 'modalBox',
        }); 
    }
    cancelModal() {
        this.setState({
            modalBoxClassName: "modalBox inactive",
        })
    }
    addProject() { //need to add to database 
        if (!this.state.text.length | !this.state.priorityText.length) {
            return; 
        }
     
        db.collection(`users/${this.props.user.uid}/taskProjects`)
        .doc(`${this.state.text}`)
        .set(({
            category: `${this.state.priorityText}`
        }))
      
        this.cancelModal(); 
    }
    handleProjectInput(e){
        this.setState({
            text: e.target.value

        });
    }
    handlePriorityInput(e){
        this.setState({
            priorityText: e.target.value
        }); 
    }
 
    render() {
        return (
            <div className ="navSideBar-wrapper">
            <ModalBox 
                className ={this.state.modalBoxClassName} 
                buttonMethod ={this.cancelModal} 
                submitMethod ={this.addProject}
                handleProjectInput = {this.handleProjectInput}
                handlePriorityInput = {this.handlePriorityInput}
                text = {this.state.text}
                priorityText = {this.state.priorityText}
            />
            <div style ={{display: this.props.responsive ? 'block' : 'none'}} className ='navSideBar-Container'>
                <div className='panel-wrapper'>
                <div className ="expansionPanel">
                    <header id="navSideBar-header">
                        <button className ={this.state.rightArrowClassName} onClick= {this.rotateArrow}>&#8250;</button>
                        <button id="projectsButton">Projects</button>
                        <i onClick = {this.openModal} id="plus" className = 'fas fa-plus'></i>
                    </header>
                    <ul className= {this.state.projectListClassName}>
                        {this.state.projects && this.state.projects.map(project => (
                            <Link to ={`/Projects/${project.id}`} key={project.id} onClick={this.props.clickHam}><li className="project-item">{project.id}</li></Link>
                          /*
                          <ul>
                               <a href={`/Projects/${project.id}`}>{project.id}</a>
                            </ul> */ 
                        ))}
                        
                    </ul>
                </div>
                <div className ="expansionPanel"></div>
                <div className ="expansionPanel"></div>
                </div>
            </div>
            </div>
        )
    }

}

export default NavSideBar; 


//expansionPanel needs it's own component & module reduce lines of codein this module
