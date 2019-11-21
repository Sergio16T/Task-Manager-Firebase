import React from 'react'; 
import { motion } from 'framer-motion'; 
import './sidePanelForm.css'; 


export class SidePanelForm extends React.Component {
    
    componentDidMount() {
        document.addEventListener('keydown', this.listener); 

    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.listener )
    }
    listener = (e)=> {
            if(e.target.id === 'addCommentInput' && e.keyCode === 13){
                this.refs.submit.click(); 
            }
    }
    render() {
        return (
            <form id="sidePanelForm" autoComplete="off" onSubmit={e => e.preventDefault()}>
                <input placeholder="Add Note" id="addCommentInput" onChange={this.props.handleChange} value={this.props.inputValue}></input>
                <motion.button 
                ref={'submit'}
                id="submitCommentButton"
                type="button" 
                onClick={this.props.submitComment.bind(this, this.props.inputValue)}
                >         
                Update
                </motion.button>
            </form>
        )
    }
        
}