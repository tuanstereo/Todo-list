import React from 'react'
import { checkScroll } from '../constant/constAndFunctionApp'
import { lengthTriggerScroll, pageSize } from '../constant/constJobTodo'
const ScrollHOC = (ComponentTodoList) => {

  return React.forwardRef((props, ref) => {
    const addJobs = (listJobRef) => {
      let currentScrollbarTrack = listJobRef.current.scrollHeight - listJobRef.current.scrollTop
      let currentLengthJob = listJobRef.current.children.length;
      let totalLengthJob = props.toTalJob.length
      if (currentScrollbarTrack <= lengthTriggerScroll && currentLengthJob < totalLengthJob && checkScroll.check) {
        checkScroll.check = false
        return currentLengthJob + pageSize
      }
    }
    return <ComponentTodoList {...props} ref={ref} addJobs={addJobs} />
  })
}

export default ScrollHOC
