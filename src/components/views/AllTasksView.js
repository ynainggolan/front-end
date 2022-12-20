import { Link } from "react-router-dom";

const AllTaskView = (props) => {
    let {tasks, deleteTasks} = props;
    //tasks = [{id: 300, description: "hello"}]
    if (!tasks.length){
        return (
            <div>
                <p>There are no tasks.</p>
                <Link to={'/newTask'}>
                    <button>Add New Task</button>
                </Link>
            </div>
        );
    }

    return (
        <div>
          {tasks.map((task) => {
            let description = task.description;
            return (
              <div key={task.id}>
              <Link to={`/task/${task.id}`}>
                <h1>{description}</h1>
              </Link>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            );
          }
          )}
          <Link to={`/newTask`}>
            <button>Add New Task</button>
          </Link>
        </div>
      );
};

export default AllTaskView;