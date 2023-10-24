import React, { Component, memo } from 'react'

class Header extends Component {
  state = {
    id: "",
    value:""
  }
  valueJob = React.createRef();
  addjob = () => {
    console.log(this.state.id);
    this.props.handleSubmitJob({ id: Math.floor(Math.random() * 100000), valueJob: this.valueJob.current.value, done: false })
    this.valueJob.current.value = ""
  }
  showJob = (id, value) => {
    this.valueJob.current.value = value
    this.setState({
      id,
      value
    })
  }
  updateJob = () => {
    console.log(this.state.id);
    this.props.handleUpdateJob(parseInt(this.state.id),this.valueJob.current.value )
    this.setState({
      id : "",
      value: ""
    })
    this.valueJob.current.value = ""
  }
  submitJob = (e) => {
    const {id} = this.state
    if (e.keyCode === 13) {
      if ( id.length === 0) {  
        this.addjob()
      } else {
        this.updatejob()
      }
    } 
  }
  handlesubmitJob = () => {
    this.state.id.length === 0 ? this.addjob() : this.updateJob()
  }
  render() {
    const {submitJob, handlesubmitJob, valueJob} = this
    return (
      <div className="input-group mb-3">
        <input type="text" className="form-control" ref={valueJob}  onKeyDown={submitJob}/>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" style={{marginLeft:"5px"}} onClick={handlesubmitJob} type="button">submit</button>
        </div>
      </div>
    )
  }
}
export default memo(Header)