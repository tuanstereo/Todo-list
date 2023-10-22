import React, { Component } from 'react'
import Header from './components/TodoHeader'
import TodosList from './components/TodosList'
import { active, deleteJob, updateJob } from './constant/constJobTodo'
import "../src/css/TodoList.css"
import ToDoFooter from './components/ToDoFooter'
export default class App extends Component {
  state = {
    job: [],
    arrJob: [],
    fillterByStatusJob: "",
    updateStatus: false,
  }
  handleSubmitJob = job => {
    this.setState({
      arrJob: [...this.state.arrJob, job],
      updateStatus: false
    })
  }
  handleUpdateJob = (id, value) => {
     this.state.arrJob.some(JobItem => JobItem.id === id && (JobItem.valueJob = value))
    this.setState({
      updateStatus: false
    })
  }
  handleUpdateStatusJob = (id, action) => {
    switch (action) {
      case deleteJob:
        this.state.arrJob.some((Job, index) => Job.id === id && this.state.arrJob.splice(index, 1))
        this.setState({
          arrJob: this.state.arrJob
        })
        break;
      case active:
        this.state.arrJob.some(Job => Job.id === id && (Job.done = !Job.done))
        this.setState({
          arrJob: this.state.arrJob
        })
        break;
      case updateJob:
        this.state.arrJob.some( JobItem => {
          JobItem.id === id && (this.setState({
            updateStatus: !this.state.updateStatus,
            job: JobItem
          }))
        })
        break;
      default:
        console.error("Lỗi không tìm thấy action nào cả");
        break;
    }
   
  }
  handleUpdateFilter = (action) => {
   this.setState({
    fillterByStatusJob : action
   })
  }
  render() {
    const {updateStatus, arrJob, fillterByStatusJob, job} = this.state
    const {handleSubmitJob, handleUpdateJob, handleUpdateStatusJob, handleUpdateFilter} = this
    return (
      <>
       <div className='row d-flex algin-items-center justify-content-center mt-4'>
        <div className='col-5 text-center'>
          <h2>Todo List</h2>
        <Header handleSubmitJob={handleSubmitJob} updateStatus={updateStatus} job={job} handleUpdateJob={handleUpdateJob} />
        <TodosList fillterByStatusJob={fillterByStatusJob} arrJob={arrJob} handleUpdateStatusJob={handleUpdateStatusJob} />
        <ToDoFooter  handleUpdateFilter = {handleUpdateFilter} totalJob = {arrJob.length} />
        </div>
       </div>
      </>

    )
  }
}

