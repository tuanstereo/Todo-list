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
import { produce } from 'immer'
import { ContextTheme } from './constant/constContext'
const App = () => {
  const handleChangeTheme = useContext(ContextTheme).handleChangeTheme

  const todoListRef = useRef()
  const headerRef = useRef()
  const [jobs, dispatch] = useReducer(reducerJobs, initvalueJob)
  const [listJobs, setListJobs] = useState([])
  const [filterJob, setFilterJobs] = useState(statusJob.fillterAll)
  const handleCRUDJob = (payload, action) => {

    switch (action) {
      case ADD_JOB:
        todoListRef.current.refScroll.current.scrollTop = 0
        checkScroll.check = false
        dispatch({ type: action, payload: { job: payload, type: filterJob } })
        filterJob !== statusJob.active && setListJobs([payload, ...listJobs].slice(0, pageSize))
        break;
      case UPDATE_VALUE_JOB:
        dispatch({ type: action, payload: { job: payload, type: filterJob } })
        setListJobs(produce(listJobs, draft => {
          const index = draft.findIndex(todo => todo.id === payload.id)
          index !== -1 && (draft[index].valueJob = payload.value)
        }))
        break;
      default:
        console.log("Lỗi")
        break;
    }
  }
  const handleUpdateJobs = (payload, action) => {

    switch (action) {
      case DELETE_JOB:
        dispatch({ type: action, payload: { job: payload, type: filterJob } })
        setListJobs(produce(listJobs, draft => {
          const index = draft.findIndex(todo => todo.id === payload.id)
          index !== -1 && (draft.splice(index, 1))
        }))
        break;
      case UPDATE_STATUS_JOB:
        dispatch({ type: action, payload: { job: payload, type: filterJob } });
        setListJobs(produce(listJobs, draft => {
          const index = draft.findIndex(todo => todo.id === payload.id)
          index !== -1 && (draft[index].done = !draft[index].done)
        }))
        break;
      case SCROLL_JOB:
        setListJobs(jobs.slice(0, payload))
        break;
      default:
        headerRef.current.showJob(payload.id, payload.valueJob)
        break;
    }
  }
  const handleUpdateStateJob = (action) => {
    todoListRef.current.refScroll.current.scrollTop = 0
    checkScroll.check = false
    let newArrayJob = fillterArrJob(arrayJob, action)
    dispatch({ type: FILLTER_LIST_JOB, payload: newArrayJob })
    setFilterJobs(action)
    setListJobs(newArrayJob.slice(0, pageSize))
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
          <Header handleCRUDJob={handleCRUDJob} ref={headerRef} />
          <TodosList
            ref={todoListRef}
            handleUpdateJobs={handleUpdateJobs}
            jobs={listJobs}
            toTalJob={jobs}
          />
          <ToDoFooter
            filterJob={filterJob}
            handleUpdateStateJob={handleUpdateStateJob}

          />
        </div>
      </div>
    </>
  )
}

export default App

