import React, { memo, useContext, useImperativeHandle, useRef, useState } from 'react';
import { ADD_JOB, UPDATE_VALUE_JOB } from '../constant/constAndFunctionApp';
import { ContextTheme } from '../constant/constContext';
const Header = React.forwardRef((props, ref) => {
  const theme = useContext(ContextTheme).themeActive
  const [state, setState] = useState({ id: "", value: "" })
  const { id } = state
  const { handleCRUDJob } = props
  const valueJob = useRef();
  useImperativeHandle(ref, () => ({
    showJob(id, value) {
      valueJob.current.value = value
      setState({
        id,
        value
      })
    }
  }))


  const submitJob = (e) => {
    if (e.keyCode === 13) {
      handlesubmitJob();
    }
  }
  const handlesubmitJob = () => {
    if (!id) {
      handleCRUDJob({ id: Math.floor(Math.random() * (1000000) + 1), valueJob: valueJob.current.value, done: false }, ADD_JOB)
      valueJob.current.value = ""
    } else {
      handleCRUDJob({id: parseInt(id), value: valueJob.current.value}, UPDATE_VALUE_JOB)
      setState({
        id: "",
        value: ""
      })
      valueJob.current.value = ""
    }
  }
  return (
    <div className={"input-group mb-3 header-group " + theme}>
      <input type="text" className="form-control input-form" ref={valueJob} onKeyDown={submitJob} />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" style={{ marginLeft: "5px" }} onClick={handlesubmitJob} type="button">submit</button>
      </div>
    </div>
  )

})
export default memo(Header)