import React, { memo, useContext, useImperativeHandle, useReducer, useRef, useState } from 'react';

import { ContextTheme } from '../constant/constContext';
import ScrollHOC from '../HOC/ScrollHOC';
import { ADD_JOB, DELETE_JOB, FILLTER_LIST_JOB, SCROLL_JOB, UPDATE_STATUS_JOB, UPDATE_VALUE_JOB, checkScroll, initvalueJob, reducerJobs } from '../constant/constAndFunctionApp';
import ListJob from './ListJob';
import { statusJob } from '../constant/constJobTodo';
export const toTalJobs = []

const TodosList = React.forwardRef((props, ref) => {
    const theme = useContext(ContextTheme)
    const [jobs, dispatch] = useReducer(reducerJobs, initvalueJob)
    const { handleUpdateStatusJob, addJobs } = props
    const [fillterJobs, setFillterJob] = useState(statusJob.fillterAll)
    const refScroll = useRef();
    useImperativeHandle(ref, () => ({
        handleAddOrUpdate(job, action) {
            handleCRUDJob(job, action)
        }, refScroll
    }))

    const handleAddJobs = async () => {
      // khi scroll gọi vào đây
         
        let newJobs = addJobs(ref.current.refScroll)
        if (newJobs) {
            await dispatch({ type: SCROLL_JOB, payload: {newJobs, fillterJobs} }) 
            checkScroll.check = true            
        }
    }
    const handleCRUDJob = async (payload, action) => {
        switch (action) {
            case ADD_JOB:
                await dispatch({ type: action, payload:{job:payload, type:fillterJobs} })
                props.updatelengTotalJob()
                break;
            case UPDATE_VALUE_JOB:
                dispatch({ type: action, payload })
                break
            case UPDATE_STATUS_JOB:
                dispatch({ type: action, payload })
                break;
            case DELETE_JOB:
                await dispatch({ type: action, payload })
                props.updatelengTotalJob()
                break
            case FILLTER_LIST_JOB:
                refScroll.current.scrollTop = 0
                 dispatch({ type: action, payload })
                 setFillterJob(payload)
                break;
            default:
                console.log("Lỗi")
                break;
        }
    }
    
    return (
        <div className={theme}>
            <h4>total {jobs.length}</h4>
            <hr style={{ marginBottom: 0 }} />
            <div ref={refScroll} className='list-Job' onScroll={handleAddJobs}>
                <ListJob jobs={jobs} handleCRUDJob={handleCRUDJob} handleUpdateStatusJob={handleUpdateStatusJob} />
            </div>
        </div>
    )
})
export default memo(ScrollHOC(TodosList));
