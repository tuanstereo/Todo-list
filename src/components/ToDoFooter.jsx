import React, { memo } from 'react'
import { statusJob } from '../constant/constJobTodo'
import { contextTheme } from '../App';
const ToDoFooter = (props) => {
const {handletotalJob, totalJob, fillterByStatusJob} = props
const { active, fillterAll, unfinished } = statusJob
 const showJobArr = (action) => {
    handletotalJob(action)
  }
  console.log('footer');
  return (
    <contextTheme.Consumer>
      {props => {
        return (
          <div className={'footer ' + props}>
            <p className='totalJob' htmlFor="">{totalJob} Job</p>
            <div>
              <button className={fillterByStatusJob === fillterAll ? 'btn btn-active': 'btn'} onClick={() => { showJobArr(fillterAll) }}>All</button>
              <button className={fillterByStatusJob === active ? 'btn btn-active': 'btn'} onClick={() => { showJobArr(active) }}>Done</button>
              <button className={fillterByStatusJob === unfinished ? 'btn btn-active': 'btn'} onClick={() => { showJobArr(unfinished) }}>unfinished</button>
            </div>
          </div>
        )
      }}
    </contextTheme.Consumer>
  )

}
export default memo(ToDoFooter)
