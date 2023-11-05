import React from 'react'
import { lengthTriggerScroll } from '../constant/constJobTodo'
const ScrollHOC = (ComponentTodoList) => {
  const addJobs = (currentScrollbarTrack, lengthJobs, lengthToTalJobs) => {
    if (currentScrollbarTrack <= lengthTriggerScroll && lengthJobs <= lengthToTalJobs) {
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