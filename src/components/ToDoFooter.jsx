import React, { memo, useContext, useImperativeHandle, useState } from 'react'
import { arrayJob, statusJob } from '../constant/constJobTodo'
import { ContextTheme } from '../constant/constContext'
const { active, fillterAll, unfinished } = statusJob
const ToDoFooter = React.forwardRef((props, ref) => {
  const [filterJob, setFilterJob] = useState(fillterAll)
  const [lengthJobs, setLengthJobs] = useState(0)
  const theme = useContext(ContextTheme)
  const { filterJobs } = props
  const showJobArr = (action) => {
    setFilterJob(action)
    filterJobs(action)
  }
  useImperativeHandle(ref, () => ({
    handleUpdatelengthJobs() {
      setLengthJobs(arrayJob.length)
    }
}))
  return (
    <div className={'footer ' + theme}>
      <p className='totalJob' htmlFor="">{lengthJobs} Job</p>
      <div>
        <button className={filterJob === fillterAll ? 'btn btn-active' : 'btn'} onClick={() => { showJobArr(fillterAll) }}>All</button>
        <button className={filterJob === active ? 'btn btn-active' : 'btn'} onClick={() => { showJobArr(active) }}>Done</button>
        <button className={filterJob === unfinished ? 'btn btn-active' : 'btn'} onClick={() => { showJobArr(unfinished) }}>unfinished</button>
      </div>
    </div>
  )

})
export default memo(ToDoFooter)
