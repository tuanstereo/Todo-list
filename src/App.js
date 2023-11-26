import React, { useContext, useReducer, useRef, useState } from 'react'
import "../src/css/TodoList.css"
import ToDoFooter from './components/ToDoFooter'
import Header from './components/TodoHeader'
import TodosList from './components/TodosList'
import {
  ADD_JOB,
  DELETE_JOB,
  FILLTER_LIST_JOB,
  SCROLL_JOB,
  UPDATE_STATUS_JOB,
  UPDATE_VALUE_JOB,
  arrayJob,
  checkScroll,
  fillterArrJob,
  initvalueJob,
  reducerJobs
} from './constant/constAndFunctionApp'
import { pageSize, statusJob } from './constant/constJobTodo'
import { ContextTheme } from './constant/constContext'
import { produce } from 'immer'
const useImmerReducer = (reducer, initialState) => {
  return React.useReducer(produce(reducer), initialState);
}
const App = () => {
  const { handleChangeTheme } = useContext(ContextTheme)
  const headerRef = useRef()
  const [jobs, dispatch] = useImmerReducer(reducerJobs, initvalueJob)
  const [filterJob, setFilterJobs] = useState(statusJob.fillterAll)
  const handleCRUDJob = (payload, action) => {
    switch (action) {
      case ADD_JOB:
        dispatch({ type: action, payload: { job: payload, type: filterJob } })
        break;
      case UPDATE_VALUE_JOB:
        dispatch({ type: action, payload: { job: payload, type: filterJob } })
        break;
      case DELETE_JOB:
        dispatch({ type: action, payload: { job: payload, type: filterJob } })
        break;
      case UPDATE_STATUS_JOB:
        dispatch({ type: action, payload: { job: payload, type: filterJob } });
        break;
      case SCROLL_JOB:
        dispatch({type:action, payload:{type : filterJob}})
        break;
      case FILLTER_LIST_JOB:
        let newArray = fillterArrJob(arrayJob, payload).slice(0, pageSize)
        dispatch({ type: FILLTER_LIST_JOB, payload: newArray })
        setFilterJobs(payload)
        break;
      default:
        headerRef.current.showJob(payload.id, payload.valueJob)
        break;

    }
  }
  return (
    <>
      <label>
        <input className="toggle-checkbox" type="checkbox" />
        <div onClick={handleChangeTheme} className="toggle-slot">
          <div className="toggle-button"></div>
        </div>
      </label>
      <div className='d-flex algin-items-center justify-content-center mt-4'>
        <div className={"col-5 text-center "}>
          <h2 >Todo List</h2>
          <Header handleCRUDJob={handleCRUDJob} ref={headerRef} />
          <TodosList
            handleCRUDJob={handleCRUDJob}
            jobs={jobs}
          />
          <ToDoFooter
            filterJob={filterJob}
            handleCRUDJob={handleCRUDJob}

          />
        </div>
      </div>
    </>
  )
}

export default App

