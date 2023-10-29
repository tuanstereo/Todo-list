import React, { Component, memo } from 'react'
import { contextTheme } from '../App';

class Header extends Component {
  state = {
    id: "",
    value:""
  }
  valueJob = React.createRef();
  addjob = () => {
    this.props.handleSubmitJob({ id: Math.floor(Math.random() * (1000000) + 1), valueJob: this.valueJob.current.value, done: false })
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
        this.updateJob()
      }
    } 
  }
  handlesubmitJob = () => {
    this.state.id.length === 0 ? this.addjob() : this.updateJob()
  }
  render() {
    const {submitJob, handlesubmitJob, valueJob} = this
    return (
        <contextTheme.Consumer>
          { props => {
            return (
              <div className={"input-group mb-3 header-group "+ props}>
              <input type="text" className="form-control input-form" ref={valueJob}  onKeyDown={submitJob}/>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" style={{marginLeft:"5px"}} onClick={handlesubmitJob} type="button">submit</button>
              </div>
            </div>
            )
          }}
        </contextTheme.Consumer>

    )
  }
}
export default memo(Header)