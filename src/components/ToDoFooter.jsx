import React, { Component, memo } from 'react'
import { statusJob } from '../constant/constJobTodo'

class ToDoFooter extends Component {
  showJobArr = (action) => {
    this.props.handletotalJob(action)  }
  render() {
    const {active, fillterAll, unfinished} = statusJob
    return (
      <>
        <div className='footer'>
          <label htmlFor="">{this.props.totalJob} Job</label>
          <div>
            <button className='btn' onClick={() => { this.showJobArr(fillterAll) }}>All</button>
            <button className='btn' onClick={() => { this.showJobArr(active) }}>Done</button>
            <button className='btn' onClick={() => { this.showJobArr(unfinished) }}>unfinished</button>
          </div>
        </div>
      </>
    )
  }
}
export default memo(ToDoFooter)
