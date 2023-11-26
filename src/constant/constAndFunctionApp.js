import { pageSize, statusJob } from "./constJobTodo"
import { produce } from "immer"
export let initvalueJob = []
export let arrayJob = []
export const ADD_JOB = "add_job"
export const UPDATE_VALUE_JOB = "update_value_job"
export const UPDATE_STATUS_JOB = "update_status_job"
export const DELETE_JOB = "delete_job"
export const FILLTER_LIST_JOB = "fillter_list_job"
export const SCROLL_JOB = "scroll_job"
export let checkScroll = {
  check: true
}
export const fillterArrJob = (data, type) => {
  let newArrJob
  switch (type) {
    case statusJob.active:
      newArrJob = data.filter(job => job.done === true)
      break;
    case statusJob.unfinished:
      newArrJob = data.filter(job => job.done === false)
      break
    default:
      newArrJob = data
  }
  return newArrJob;
}
export const reducerJobs = (stateJob, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_JOB:
      arrayJob.unshift(payload.job)
      stateJob.unshift(payload.job)
      break;
    case UPDATE_VALUE_JOB:
      const idx = arrayJob.findIndex(todo => todo.id === payload.job.id)
      produce(arrayJob, draft => {
        draft[idx].valueJob = payload.job.value
      })
      stateJob.find(item => item.id === payload.job.id && (item.valueJob = payload.job.value))
      break;
    case UPDATE_STATUS_JOB:
      stateJob.find(item => item.id === payload.job.id && (item.done = !item.done))
      let index = arrayJob.findIndex(item => item.id === payload.job.id)
      let newJob = Object.assign({}, payload.job)
      newJob.done = !newJob.done
      arrayJob.splice(index, 1, newJob)
      break;
    case DELETE_JOB:
      arrayJob.find((item, index) => item.id === payload.job.id && (arrayJob.splice(index, 1)))
      stateJob.find((item, index) => item.id === payload.job.id && (stateJob.splice(index, 1)))
      break;
    case FILLTER_LIST_JOB:
      stateJob = payload
      break;
    case SCROLL_JOB:
      let totalJob = fillterArrJob(arrayJob, payload.type)
      if (totalJob.length > stateJob.length) {
        let getMoreJob = totalJob.slice(stateJob.length, stateJob.length + pageSize)
        stateJob = [...stateJob, ...getMoreJob]
      }
      break;
    default:
      console.log("Lỗi");
  }
  return stateJob

}