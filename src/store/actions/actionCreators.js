import * as at from './actionTypes';

// ACTION CREATORS;
/** needs to be an action creator
 * for each action type
 */

// All employees
export const fetchAllEmployees = (employees) => {
  return {
    type: at.FETCH_ALL_EMPLOYEES,
    payload: employees,
  };
};

//Add employee
export const addEmployee = (employee) => {
  return {
    type: at.ADD_EMPLOYEE,
    payload: employee,
  };
};

//Delete employee
export const deleteTask = (employeeId) => {
  return {
    type: at.DELETE_EMPLOYEE,
    payload: employeeId,
  };
};

//Edit employee
export const editEmployee = (employee) => {
  return {
    type: at.EDIT_EMPLOYEE,
    payload: employee,
  };
};

//Single employee
export const fetchEmployee = (employee) => {
  return {
    type: at.FETCH_EMPLOYEE,
    payload: employee,
  };
};

//All tasks
export const fetchAllTasks = (tasks) => {
  return {
    type: at.FETCH_ALL_TASKS,
    payload: tasks,
  };
};

//Add task
export const addTask = (task) => {
  return {
    type: at.ADD_TASK,
    payload: task,
  };
};

//Delete task
export const deleteTask = (taskId) => {
  return {
    type: at.DELETE_TASK,
    payload: taskId,
  };
};

//Edit Task
export const editTask = (task) => {
  return {
    type: at.EDIT_TASK,
    payload: task,
  };
};

//Single task
export const fetchTask = (task) => {
  return {
    type: at.FETCH_TASK,
    payload: task,
  };
};