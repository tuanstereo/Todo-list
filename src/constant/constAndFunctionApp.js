import { arrayJob, pageSize, statusJob } from "./constJobTodo"
export let initvalueJob = []
export const ADD_JOB = "add_job"
export const UPDATE_VALUE_JOB = "update_value_job"
export const UPDATE_STATUS_JOB = "update_status_job"
export const DELETE_JOB = "delete_job"
export const FILLTER_LIST_JOB = "fillter_list_job"
export const SCROLL_JOB = "scroll_job"
export let checkScroll = {
  check: true
}
export const reducerJobs = (stateJob, action) => {
  const { type, payload } = action

  let newStateJob = [...stateJob]
  switch (type) {
    case ADD_JOB:
      arrayJob.unshift(payload.job)
      newStateJob = fillterArrJob(arrayJob, payload.type).slice(0,pageSize)
      // newStateJob = arrayJob.slice(0, pageSize)
      break;
    case UPDATE_VALUE_JOB:
      arrayJob.find(item => item.id === payload.id && (item.valueJob = payload.value))

      break;
    case UPDATE_STATUS_JOB:
      arrayJob.find((item) => item.id === payload.id && (item.done = !item.done))

      break;
    case DELETE_JOB:
      arrayJob.find((item, index) => item.id === payload.id && arrayJob.splice(index, 1) && stateJob.splice(index, 1))
      newStateJob = arrayJob.slice(0, pageSize)

      break;
    case FILLTER_LIST_JOB:
      switch (payload) {
        case statusJob.unfinished:
          newStateJob = arrayJob.filter(job => job.done === false).slice(0, pageSize)
          break;
        case statusJob.active:
          newStateJob = arrayJob.filter(job => job.done === true).slice(0, pageSize)
          break
        default:
          newStateJob = arrayJob.slice(0, pageSize)
          break;
      }
      break;
    case SCROLL_JOB:
console.log(payload);
     let newToTalJob =  fillterArrJob(payload.newJobs, payload.fillterJobs)  
     newStateJob = newToTalJob
      break;
      default:
      console.log("Lỗi");
  }
  return newStateJob
}

const fillterArrJob = (arrJob, type) => {
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