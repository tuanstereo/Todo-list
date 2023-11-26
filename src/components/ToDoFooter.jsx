import React, { memo, useContext } from 'react'
import { statusJob } from '../constant/constJobTodo'
import { ContextTheme } from '../constant/constContext'
import { FILLTER_LIST_JOB, arrayJob } from '../constant/constAndFunctionApp'
const { active, fillterAll, unfinished } = statusJob
const ToDoFooter = ({ filterJob, handleCRUDJob }) => {
  const theme = useContext(ContextTheme).themeActive
  return (
    <div className={'footer ' + theme}>
      <p className='totalJob' htmlFor="">{arrayJob.length} Job </p>
      <div>
        <button className={filterJob === fillterAll ? 'btn btn-active' : 'btn'} onClick={() => { handleCRUDJob(fillterAll, FILLTER_LIST_JOB)}}>All</button>
        <button className={filterJob === active ? 'btn btn-active' : 'btn'} onClick={() => { handleCRUDJob(active, FILLTER_LIST_JOB) }}>Done</button>
        <button className={filterJob === unfinished ? 'btn btn-active' : 'btn'} onClick={() => { handleCRUDJob(unfinished, FILLTER_LIST_JOB)}}>unfinished</button>
      </div>
    </div>
  )

}
export default memo(ToDoFooter)
