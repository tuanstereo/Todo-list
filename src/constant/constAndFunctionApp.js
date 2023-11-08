import { statusJob, theme } from "./constJobTodo"


export const initState = {
    arrJob: [],
    fillterByStatusJob: statusJob.fillterAll,
    updateStatus: false,
    themeActive: theme.light,
}

export const ADD_JOB = "add_job"
export const UPDATE_VALUE_JOB = "update_value_job"
export const UPDATE_STATUS_JOB = "update_status_job"
export const DELETE_JOB = "delete_job"
export const FILLTER_LIST_JOB = "fillter_list_job"
export const CHANGE_THEME = "change_theme"


export const reducer = (state, action) => {
  const { arrJob } = state
  const { type, payload } = action
  let newState
  switch (type) {
    case ADD_JOB:
      newState = {
        ...state,
        arrJob: [...arrJob, payload],
        updateStatus: false
      }
      break
    case UPDATE_VALUE_JOB:
      arrJob.find(JobItem => JobItem.id === payload.id && (JobItem.valueJob = payload.value))
      newState = {
        ...state,
        updateStatus: false
      }
      break
    case UPDATE_STATUS_JOB:
      arrJob.find(item => item.id === payload && (item.done = !item.done))
      newState = {
        ...state
            }
      break
    case DELETE_JOB:
      state.arrJob.find((item, index) => item.id === payload && arrJob.splice(index, 1))
      newState = {
        ...state
      }
      break
    case FILLTER_LIST_JOB:
      newState = {
        ...state,
        fillterByStatusJob: payload
      }
      break
    case CHANGE_THEME:
      newState = {
        ...state,
        themeActive: payload
      }
      break;
    default:
      console.log("Lỗi");
  }
  return newState
}