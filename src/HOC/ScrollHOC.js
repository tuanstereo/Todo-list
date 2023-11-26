  import React, { useEffect } from 'react'
  import { lengthTriggerScroll } from '../constant/constJobTodo'
  const scrollHOC = (ComponentTodoList) => {
    const ref = React.createRef()  
  let  isGetData = false
    return (props) => {
      const element = ref.current;
      const {jobs} = props
       useEffect( () => {
        isGetData = false
       },[jobs.length])
      const handleScroll = () => {
        let currentScrollbarTrack =  element.scrollTop + element.clientHeight
        if (element.scrollHeight - currentScrollbarTrack < lengthTriggerScroll && !isGetData) {
          isGetData = true
          return isGetData
        }
      };  
      return <ComponentTodoList {...props} handleScroll = {handleScroll} ref={ref}  />
    }
  }
  export default scrollHOC

