import React, { useRef, useState } from 'react'
import Header from './components/TodoHeader'
import { arrayJob } from './constant/constJobTodo'
import {
  ADD_JOB, UPDATE_VALUE_JOB, FILLTER_LIST_JOB, checkScroll
} from './constant/constAndFunctionApp'
import "../src/css/TodoList.css"
import ToDoFooter from './components/ToDoFooter'
import TodosList from './components/TodosList'

const App = ({ handleChangeTheme }) => {
  const todoListRef = useRef()
  const headerRef = useRef()
  const footerRef = useRef()
  const handleSubmitJob =  (job) => {
     todoListRef.current.handleAddOrUpdate(job, ADD_JOB)

  }

  const handleUpdateJob = (id, value) => {
    todoListRef.current.handleAddOrUpdate({ id, value }, UPDATE_VALUE_JOB)
  }

  const handleUpdateStatusJob = (job) => {
    headerRef.current.showJob(job.id, job.valueJob)
  }

  const filterJobs = (action) => {
    todoListRef.current.handleAddOrUpdate(action, FILLTER_LIST_JOB)

  }
  const updatelengTotalJob = () => {
    footerRef.current.handleUpdatelengthJobs()
  }
  return (
    <>
      <label>
        <input className="toggle-checkbox" type="checkbox" />
        <div onClick={handleChangeTheme} className="toggle-slot">
          <div className="toggle-button"></div>
        </div>
      </label>
      <div className='row d-flex algin-items-center justify-content-center mt-4'>
        <div className={"col-5 text-center "}>
          <h2 >Todo List</h2>
          <Header handleSubmitJob={handleSubmitJob} ref={headerRef} handleUpdateJob={handleUpdateJob} />
          <TodosList updatelengTotalJob= {updatelengTotalJob} ref={todoListRef} handleUpdateStatusJob={handleUpdateStatusJob} />
          <ToDoFooter ref = {footerRef} filterJobs={filterJobs}  />
        </div>
      </div>
    </>
  )
}

export default App

