import React, { Component, memo } from 'react'
import { statusJob } from '../constant/constJobTodo'
import { contextTheme } from '../App';

class ToDoFooter extends Component {
  showJobArr = (action) => {
    this.props.handletotalJob(action)  }
  render() {
    const {active, fillterAll, unfinished} = statusJob
    return (
      <contextTheme.Consumer>
        { props => {
          return (
            <div className={'footer ' + props}>
          <label htmlFor="">{this.props.totalJob} Job</label>
          <div>
            <button className='btn' onClick={() => { this.showJobArr(fillterAll) }}>All</button>
            <button className='btn' onClick={() => { this.showJobArr(active) }}>Done</button>
            <button className='btn' onClick={() => { this.showJobArr(unfinished) }}>unfinished</button>
          </div>
        </div>
          )
        }}
      </contextTheme.Consumer>
    )
  }
}
export default memo(ToDoFooter)
