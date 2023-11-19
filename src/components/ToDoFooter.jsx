import React, { memo, useContext } from 'react'
import { statusJob } from '../constant/constJobTodo'
import { ContextTheme } from '../constant/constContext'
import { arrayJob } from '../constant/constAndFunctionApp'
const { active, fillterAll, unfinished } = statusJob
const ToDoFooter = ({filterJob, handleUpdateStateJob}) => {
  const theme = useContext(ContextTheme).themeActive
  return (
    <div className={'footer ' + theme}>
      <p className='totalJob' htmlFor="">{arrayJob.length} Job</p>
      <div>
        <button className={filterJob === fillterAll ? 'btn btn-active' : 'btn'} onClick={() => { handleUpdateStateJob(fillterAll) }}>All</button>
        <button className={filterJob === active ? 'btn btn-active' : 'btn'} onClick={() => { handleUpdateStateJob(active) }}>Done</button>
        <button className={filterJob === unfinished ? 'btn btn-active' : 'btn'} onClick={() => { handleUpdateStateJob(unfinished) }}>unfinished</button>
      </div>
    </div>
  )

}
export default memo(ToDoFooter)
