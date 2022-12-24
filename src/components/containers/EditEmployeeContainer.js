import { tsImportEqualsDeclaration } from '@babel/types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { fetchEmployeeThunk, editEmployeeThunk, fetchAllTasksThunk  } from '../../store/thunks';


/*
IMPORTANT: comments regarding implementation details!!
=====================================================
You'll see that we have two ways of interacting with the UI
in order to change the task's employee

The dropdown menu is straighforward, it's pretty much the same 
as having the input field for the employeeId but allows us
to actually see the available employees as well as their names, 
not just their IDs. We did have to connect to the allEmployees state
from the Redux store, as well as fetchAllEmployees in componentDidMount().
This was done so we could get the other employees in the database.
We filter out the current employee from the array at the beginning of 
the render function, and use this array to populate the dropdown menu
options. Because it's part of the form, we don't need to modify the 
handleSubmit function. On redirect to the TaskView we will see the 
updates.

You will see below the form there is another part of the UI that is
also changing the current task's employee. This structure is similar
to how changing assigned tasks is done in the EmployeeView. There is
a slight drawback to using this approach in this context. When we perform
an EDIT_TASK action (initiated by calling the editTaskThunk), this action
is sent to the allTasks reducer, not the task reducer. For that reason, 
we will not see the updates in the single task view unless there is another 
call to the fetchTaskThunk. This is done once when we redirect after form
submission, which is why the data is shown without needing to refresh. 
If we want that same functionality within the container, we need to make
a call to fetchTask after each editTask. We see that in the onClick
functionality of the buttons controlling that portion of the UI. 

*/

class EditEmployeeContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          firstName: "", 
          lastName: "",
          taskId: null, 
          redirect: false, 
          redirectId: null,
          error: ""
        };
    }

    componentDidMount() {
        //getting employee ID from url
        this.props.fetchEmployee(this.props.match.params.id);
        this.props.fetchTasks();
        this.setState({
            firstName: this.props.task.firstName, 
            lastName: this.props.task.lastName,
            taskId: this.props.task.taskId, 
        });
      }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSelectChange = event => {
      //handle change for the dropdown menu
      //want to set the employeeId based on the selected choice
      //when the form gets submitted, this is how we can change
      //assigned employee without having to manually enter in the 
      //employeeId like before
      if (event.target.value === "task") {
        this.setState({taskId:null});
      } else {
        this.setState({taskId: event.target.value})
      }
    }

    handleSubmit = event => {
        event.preventDefault();
        //implementing form validation
        if (this.state.firstName === "" && this.state.lastName==="") {
          this.setState({error: "Error: Name cannot be empty"});
          return;
        }

        //get new info for task from form input
        let employee = {
            id: this.props.task.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            taskId: this.state.taskId
        };
        
        this.props.editEmployee(employee);

        this.setState({
          redirect: true, 
          redirectId: this.props.employee.id
        });

    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});

    }

    render() {
        let { employee, allTasks, editEmployee, fetchEmployee} = this.props;
        let assignedTask = task.taskId;

        let otherTasks = allTasks.filter(task => task.id!==assignedTask);
      
        //go to single employee view of the edited task
        if(this.state.redirect) {
          return (<Redirect to={`/employee/${this.state.redirectId}`}/>)
        }

        return (
        <div>
        <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
            <input type="text" name="firstName" value={this.state.firstName || ''} placeholder={employee.firstName} onChange ={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
            <input type="text" name="lastName" value={this.state.lastName || ''} placeholder={employee.lastName} onChange={(e) => this.handleChange(e)}/>
            <br/>

            <select onChange={(e) => this.handleSelectChange(e)}>
              {employee.task!==null ?
                <option value={employee.taskId}>{employee.task.description+" (current)"}</option>
              : <option value="task">Task</option>
              }
              {otherTasks.map(task => {
                return (
                  <option value={task.id} key={task.id}>{task.description}</option>
                )
              })}
              {employee.task!==null && <option value="task">Task</option>}
            </select>
  
            <button type="submit">
              Submit
            </button>

          </form>
          { this.state.error !=="" && <p>{this.state.error}</p> }

          {employee.taskId !== null ?
            <div> Current Task:  
            <Link to={`/task/${employee.taskId}`}>{employee.task.description}</Link>
            <button onClick={async () => {await editEmployee({id:employee.id, taskId: null});  fetchTask(employee.id)}}>Unassign</button>
            </div>
            : <div> No task currently assigned </div>
          }

          <div> Other Tasks
          {otherTasks.map(task => {
            return (
            <div key={task.id}>
                <Link to={`/task/${task.id}`}>
                  <h4>{task.description}</h4>
                </Link>
                <button onClick={async() => {await editEmployee({id:employee.id, taskId: task.id}); fetchTask(employee.id)}}>Assign this task</button>
            </div>
            )})
          }
          </div>
        </div>
        )
    }
}

// map state to props
const mapState = (state) => {
    return {
      employee: state.employee,
      allTasks: state.allTasks
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editEmployee: (employee) => dispatch(editEmployeeThunk(employee)),
        fetchEmployee: (id) => dispatch(fetchEmployeeThunk(id)),
        fetchTasks: () => dispatch(fetchAllTasksThunk()),

    })
}

export default connect(mapState, mapDispatch)(EditEmployeeContainer);