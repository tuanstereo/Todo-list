import React, { Component, memo } from 'react'

class Header extends Component {
  valueJob = React.createRef();
  addjob = () => {
    this.props.handleSubmitJob({ id: Math.floor(Math.random() * 1000), valueJob: this.valueJob.current.value, done: false })
    this.valueJob.current.value = ""
  }
  showJob = job => {
    this.valueJob.current.value = job.valueJob
  }
  updatejob = () => {
    this.props.handleUpdateJob(parseInt(this.valueJob.current.id), this.valueJob.current.value)
  }
  render() {
    const {addjob, updatejob, valueJob} = this
    this.props.updateStatus && (this.showJob(this.props.job))
    return (

      <div className="input-group mb-3">
        <input type="text" class="form-control" id={this.props.job.id || ""} ref={valueJob} />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" onClick={addjob} type="button">Add</button>
          <button className="btn btn-outline-secondary" onClick={updatejob} type="button">Update</button>
        </div>
      </div>
    )
  }
}
export default memo(Header)