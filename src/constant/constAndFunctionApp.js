import { statusJob } from "./constJobTodo"
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
export const fillterArrJob = (arrJob, type) => {
  let newArrJob
  switch (type) {
    case statusJob.active:
      newArrJob = arrJob.filter(job => job.done === true)
      break;
    case statusJob.unfinished:
      newArrJob = arrJob.filter(job => job.done === false)
      break
    default:
      newArrJob = arrJob
  }
  return newArrJob;
}
export const reducerJobs = (stateJob, action) => {
  const { type, payload } = action

  let newStateJob
  switch (type) {
    case ADD_JOB:
      arrayJob = produce(arrayJob, draft => {
        draft.unshift(payload.job)
      }) 
      newStateJob = produce(stateJob, draft => {
        draft.unshift(payload.job)
      })
      break;
    case UPDATE_VALUE_JOB:
      arrayJob = produce(arrayJob, draft => {
        draft.find(item => item.id === payload.job.id && (item.valueJob = payload.job.value))
      })
      newStateJob = produce(stateJob, draft => {
        draft.find(item => item.id === payload.job.id && (item.valueJob = payload.job.value))
      })
      break;
    case UPDATE_STATUS_JOB:
      arrayJob = produce(arrayJob, draft => {
        const index = draft.findIndex(todo => todo.id === payload.job.id)
        index !== -1 && (draft[index].done = !draft[index].done)
      })
      newStateJob = produce(stateJob, draft => {
        draft.find(item => item.id === payload.job.id && (item.done = !item.done))
      })
      break;
    case DELETE_JOB:
      arrayJob = produce(arrayJob, draft => {
        draft.find((item, index) => item.id === payload.id && (draft.splice(index, 1)))
      })
      newStateJob = produce(stateJob, draft => {
        draft.find((item, index) => item.id === payload.job.id && (draft.splice(index, 1)))
      })
      break;
    case FILLTER_LIST_JOB:
      newStateJob = [...payload]
      break;
    case SCROLL_JOB:
      let newToTalJob = fillterArrJob(payload.newJobs, payload.fillterJobs)
      checkScroll.check = true
      newStateJob = newToTalJob
      break;
    default:
      console.log("Lỗi");
  }
  return newStateJob
}