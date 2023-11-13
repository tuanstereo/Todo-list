import React, { memo, useContext, useImperativeHandle, useRef, useState } from 'react'
import { ContextTheme } from '../constant/constContext';
const Header = React.forwardRef((props, ref) => {
  console.log('header');
  const theme = useContext(ContextTheme)
  const [state, setState] = useState({ id: "", value: "" })
  const { id } = state
  const { handleSubmitJob, handleUpdateJob } = props
  const valueJob = useRef();

  const addjob = () => {
    handleSubmitJob({ id: Math.floor(Math.random() * (1000000) + 1), valueJob: valueJob.current.value, done: false })
    valueJob.current.value = ""
  }
  useImperativeHandle(ref, () => ({
    showJob(id, value) {
      valueJob.current.value = value
      setState({
        id,
        value
      })
    }
  }))

  const updateJob = () => {
    handleUpdateJob(parseInt(id), valueJob.current.value)
    setState({
      id: "",
      value: ""
    })
    valueJob.current.value = ""
  }

  const submitJob = (e) => {
    if (e.keyCode === 13) {
      if (id.length === 0) {
        addjob()
      } else {
        updateJob()
      }
    }
  }
  const handlesubmitJob = () => {
    id.length === 0 ? addjob() : updateJob()
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