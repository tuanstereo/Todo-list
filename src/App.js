import React, { useCallback, useReducer, useRef } from 'react'
import Header from './components/TodoHeader'
import {
  deleteJob, statusJob, updateJob, theme
} from './constant/constJobTodo'
import {ADD_JOB, UPDATE_VALUE_JOB, UPDATE_STATUS_JOB,
  DELETE_JOB, FILLTER_LIST_JOB, CHANGE_THEME, initState, reducer} from './constant/constAndFunctionApp'
import "../src/css/TodoList.css"
import ToDoFooter from './components/ToDoFooter'
import TodosList from './components/TodosList'
import ScrollHOC from './HOC/ScrollHOC'
const TodoList = ScrollHOC(TodosList)
export const contextTheme = React.createContext()

const App = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  const { arrJob, fillterByStatusJob, themeActive } = state
  const todoListRef = useRef()
  const headerRef = useRef()
  const handleSubmitJob = useCallback( (job) => {
    if (!(fillterByStatusJob === statusJob.active)) {
      todoListRef.current.updateJobs([...arrJob, job])
    }
    dispatch({ type: ADD_JOB, payload: job })
  },[arrJob, fillterByStatusJob])

  const handleUpdateJob = useCallback((id, value) => {
    dispatch({ type: UPDATE_VALUE_JOB, payload: { id, value } })
    todoListRef.current.updateValueJob(true)
  },[])

  const handleUpdateStatusJob = useCallback( (job, action) => {
    switch (action) {
      case deleteJob:
        dispatch({ type: DELETE_JOB, payload: job.id })
        todoListRef.current.updateValueJob(true, job)
        break;
      case statusJob.active:
         todoListRef.current.updateValueJob(true)
          dispatch({ type: UPDATE_STATUS_JOB, payload: job.id })
        break;
      case updateJob:
        headerRef.current.showJob(job.id, job.valueJob)
        break;
      default:
        console.error("Lỗi không tìm thấy action nào cả");
        break;
    }
  },[])

  const handletotalJob = useCallback((action) => {
    const { unfinished, active } = statusJob
    let newJobs = []
    switch (action) {
      case unfinished:
        newJobs = arrJob.reduce((accumulator, currentJob) => {
          if (!currentJob.done) {
            accumulator = [...accumulator, currentJob]
          }
          return accumulator
        }, [])
        todoListRef.current.updateJobs(newJobs, action)
        break;
      case active:

        newJobs = arrJob.reduce((accumulator, currentJob) => {
          if (currentJob.done) {
            accumulator = [...accumulator, currentJob]
          }
          return accumulator
        }, [])

        todoListRef.current.updateJobs(newJobs, action)
        break
      default:
        todoListRef.current.updateJobs(arrJob, action)
    }
    dispatch({ type: FILLTER_LIST_JOB, payload: action })
  }, [arrJob])
  const handleChangeTheme = useCallback(() => {
    themeActive === theme.dark ? dispatch({ type: CHANGE_THEME, payload: theme.light }) : dispatch({ type: CHANGE_THEME, payload: theme.dark })
  }, [themeActive])
  return (
    <contextTheme.Provider value={themeActive}>
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
          <TodoList ref={todoListRef} fillterByStatusJob={fillterByStatusJob} handleUpdateStatusJob={handleUpdateStatusJob} />
          <ToDoFooter handletotalJob={handletotalJob} totalJob={arrJob.length} fillterByStatusJob={fillterByStatusJob} />
        </div>
      </div>
    </contextTheme.Provider>
  )
}

export default App

