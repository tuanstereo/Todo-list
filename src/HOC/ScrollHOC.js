import React from 'react'
import { lengthTriggerScroll, pageSize } from '../constant/constJobTodo'
const ScrollHOC = (ComponentTodoList) => {

  const addJobs = (currentScrollbarTrack, jobs, totalJobs) => {
    if (currentScrollbarTrack <= lengthTriggerScroll && jobs.length <= totalJobs.length) {
      return totalJobs.slice(jobs.length, jobs.length + pageSize)
    }
  }
  return React.forwardRef((props, ref) => <ComponentTodoList {...props} ref={ref} addJobs={addJobs} />)
}
export default ScrollHOC
