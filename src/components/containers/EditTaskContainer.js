import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchTaskThunk, editTaskThunk } from '../../store/thunks';

class EditTaskContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            description: "",
            priorityLevel: "",
            employeeId: null,
            redirect: false,
            redirectId: null
        };
    }

    componentDidMount() {
        //getting task ID from url
        this.props.fetchTaskThunk(this.props.match.params.id);
        this.setState({
            descrption: this.props.task.description,
            priorityLevel: this.props.task.priorityLevel,
            instructorId: this.props.task.employeeId,
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.perventDefault();
        //get new info for task from form input
        let task = {
            id: this.props.task.id,
            description: this.state.description,
            priorityLevel: this.props.priorityLevel,
            employeeId: this.props.employeeId
        };

        this.props.editTask(task);

        this.setState({
            redirect:true,
            redirectId: this.props.task.id
        });

    }

    componentWillUnmount(){
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        //got to single task view of the edited task
            if(this.state.redirect) {
                return (<Redirect to={'/task/${this.state.redirectId}`}'}/>)
            }

            return (
                <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Description: </label>
                <input type="text" name="description" value={this.state.description} onChange ={(e) => this.handleChange(e)}/>
                <br/>

                <label style={{color:'#11153e', fontWeight: 'bold'}}>Priority Level: </label>
                <input type="text" name="priorityLevel" value={this.state.priorityLevel} onChange={(e) => this.handleChange(e)}/>
                <br/>
    
                <label style={{color:'#11153e', fontWeight: 'bold'}}>employeeId: </label>
                <input type="text" name="employeeId" value={this.state.employeeId} onChange={(e) => this.handleChange(e)} />
                <br/>
    
                <button type="submit">
                Submit
                </button>

            </form>
            )
    }
}

// Map state to props
const mapState = (state) => {
    return {
        task: state.task,
    };
};

const mapDispatch = (dispatch) => {
    return ({
        editTask: (task) => dispatch(editTaskThunk(task)),
        fethcTask: (id) => dispatch(fetchTaskThunk(id)),
    })
}

export default connect(mapState, mapDispatch)(EditTaskContainer);