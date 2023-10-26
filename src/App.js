import React, { Component } from 'react'
import Header from './components/TodoHeader'
import TodosList from './components/TodosList'
import { deleteJob, statusJob, updateJob } from './constant/constJobTodo'
import "../src/css/TodoList.css"
import ToDoFooter from './components/ToDoFooter'
export default class App extends Component {
  
  state = {
    arrJob: [],
    fillterByStatusJob: statusJob.fillterAll,
    updateStatus: false,
  }
  headerRef = React.createRef()
  todoListRef = React.createRef()
  handleSubmitJob = job => {
    if (!(this.state.fillterByStatusJob === statusJob.active)) {
      this.todoListRef.current.updateJobs([...this.state.arrJob, job])
    } 
    this.setState({
      arrJob: [...this.state.arrJob, job],
      updateStatus: false
    })
  }
  handleUpdateJob = (id, value) => {
    this.state.arrJob.find(JobItem => JobItem.id === id && (JobItem.valueJob = value))
    this.setState({
      updateStatus: false
    })
    this.todoListRef.current.updateValueJob(true)
  }
  handleUpdateStatusJob = (job, action) => {
    const { arrJob } = this.state
    switch (action) {
      case deleteJob:
        arrJob.find((item, index) => item.id === job.id && arrJob.splice(index, 1))
        this.setState({
          arrJob: this.state.arrJob
        })
      this.todoListRef.current.updateValueJob(true, job)
        break;
      case statusJob.active:
        arrJob.find( item => item.id === job.id && (item.done = !item.done))
        this.todoListRef.current.updateValueJob(true)
        break;
      case updateJob:
        this.headerRef.current.showJob(job.id, job.valueJob)
        break;
      default:
        console.error("Lỗi không tìm thấy action nào cả");
        break;
    }
   
  }
  handleUpdateFilter = (action) => {
    this.setState({
      fillterByStatusJob: action
    })
  }
  handletotalJob = (action) => {
    const { arrJob } = this.state
    const {unfinished,active} = statusJob
    let newJobs = []
    switch (action) {
      case unfinished:
         newJobs = arrJob.reduce((accumulator, currentJob) => {
          if (!currentJob.done) {
            accumulator = [...accumulator, currentJob]
          }
          return accumulator
         }, [])
        this.todoListRef.current.updateJobs(newJobs, action)
        break;
      case active:
        newJobs = arrJob.reduce((accumulator, currentJob) => {
          if (currentJob.done) {
            accumulator = [...accumulator, currentJob]
          }
          return accumulator
         }, [])
         this.todoListRef.current.updateJobs(newJobs, action)
        break
      default:
        this.todoListRef.current.updateJobs(arrJob, action)
    }
    this.setState({
      fillterByStatusJob: action
    })
  }
  render() {
    const { updateStatus, arrJob, fillterByStatusJob } = this.state
    console.log(fillterByStatusJob);
    const { todoListRef, headerRef, handletotalJob, handleSubmitJob, handleUpdateJob, handleUpdateStatusJob, handleUpdateFilter } = this
    return (
      <>
        <div className='row d-flex algin-items-center justify-content-center mt-4'>
          <div className='col-5 text-center'>
            <h2>Todo List</h2>
            <Header handleSubmitJob={handleSubmitJob} updateStatus={updateStatus} ref={headerRef} handleUpdateJob={handleUpdateJob} />
            <TodosList  ref={todoListRef} fillterByStatusJob={fillterByStatusJob} handleUpdateStatusJob={handleUpdateStatusJob} />
            <ToDoFooter handleUpdateFilter={handleUpdateFilter} handletotalJob={handletotalJob} totalJob={arrJob.length} />
          </div>
        </div>
      </>

    )
  }
}

