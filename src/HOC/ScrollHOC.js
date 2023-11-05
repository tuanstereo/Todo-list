import React from 'react'
import { lengthTriggerScroll } from '../constant/constJobTodo'
const ScrollHOC = (ComponentTodoList) => {
  const addJobs = (currentScrollbarTrack, jobs, toTalJobs) => {
    if (currentScrollbarTrack <= lengthTriggerScroll && jobs.length <= toTalJobs.length) {
      return jobs.length
    }
  }

  return React.forwardRef((props, ref) => {
    return (
      <>
        <ComponentTodoList {...props} ref={ref} addJobs={addJobs} />
      </>
    )
  })

}

export default ScrollHOC