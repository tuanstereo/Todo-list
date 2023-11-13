 import React, { useState }  from 'react'
import { arrayJob, lengthTriggerScroll, pageSize } from '../constant/constJobTodo'
import { checkScroll } from '../constant/constAndFunctionApp'
const ScrollHOC = (ComponentTodoList) => {
  // const [idx, setIdx] = useState(1); 
  const addJobs = () => {}
 
  return React.forwardRef((props, ref) => <ComponentTodoList {...props} ref={ref} addJobs={addJobs} />)
}

export default ScrollHOC









// const addJobs = (listJobRef) => {
//   let currentScrollbarTrack = listJobRef.current.scrollHeight - listJobRef.current.scrollTop
//   if (currentScrollbarTrack <= lengthTriggerScroll && listJobRef.current.children.length < arrayJob.length && checkScroll.check ) {
//     checkScroll.check = false
//     // return arrayJob.slice(0, listJobRef.current.children.length + pageSize)
//   }
// }