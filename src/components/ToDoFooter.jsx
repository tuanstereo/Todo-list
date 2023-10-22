import React, { Component, memo } from 'react'
import { active, fillterAll, unfinished } from '../constant/constJobTodo'

class ToDoFooter extends Component {
  showJobArr = (action) => {
    this.props.handleUpdateFilter(action)
  }
  render() {
    console.log("footer Re-render", this.props.totalJob);
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
