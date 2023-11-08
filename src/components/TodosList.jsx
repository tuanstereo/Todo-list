import React, { memo, useImperativeHandle, useRef, useState, } from 'react';
import { deleteJob, updateJob, statusJob, pageSize } from '../constant/constJobTodo';
import { AiOutlineDelete } from "react-icons/ai"
import { MdOutlineDone } from 'react-icons/md'
import { TiDeleteOutline } from "react-icons/ti"
import { RxUpdate } from "react-icons/rx"
import { contextTheme } from '../App';

const TodosList = React.forwardRef((props, ref) => {
    console.log("list");
    const [state, setState] = useState({
        toTalJobs: [],
        jobs: [],
        isUpdateJob: false,
    });
    const { handleUpdateStatusJob, addJobs } = props
    const { toTalJobs, jobs } = state
    const listRef = useRef();
    useImperativeHandle(ref, () => ({
        updateValueJob(isUpdateJob, job) {
            if (job) {
                let newJobs = [...jobs]
                toTalJobs.find((item, index) => item.id === job.id && (toTalJobs.splice(index, 1) && newJobs.splice(index, 1)))
                setState({...state,jobs: newJobs, isUpdateJob: !isUpdateJob
                })
            } 
            else {
                setState({
                    ...state, isUpdateJob: !isUpdateJob
                })
            }
        },
        updateJobs(jobs, action) {
            action && (listRef.current.scrollTop = 0)
            let newJobs = jobs.slice(0, pageSize)
            setState({
                ...state, toTalJobs: [...jobs],
                jobs: newJobs
            })
        }
    }))

    const handleAddJobs = (e) => {
        let newJobs = addJobs(e.target.scrollHeight - e.target.scrollTop, jobs, toTalJobs)
        newJobs && setState({
            ...state, jobs: [...jobs, ...newJobs]
        })
    }
    return (
        <contextTheme.Consumer>
            {(props) => {
                return (
                    <div className={props}>
                        <h4>total {jobs.length}</h4>
                        <hr style={{ marginBottom: 0 }} />
                        <div ref={listRef} className='list-Job' onScroll={handleAddJobs}>
                            {
                                jobs.map(job =>
                                    <div key={job.id} className='d-flex justify-content-between align-items-center job-group mb-2'>
                                        <h4 className={job.done ? "active" : ""} >{job.valueJob}</h4>
                                        <div className={'pb-2 ' + props}>
                                            <button onClick={() => handleUpdateStatusJob(job, deleteJob)}><AiOutlineDelete /></button>
                                            <button onClick={() => handleUpdateStatusJob(job, statusJob.active)}>{job.done ? <TiDeleteOutline /> : <MdOutlineDone />}</button>
                                            <button onClick={() => handleUpdateStatusJob(job, updateJob)}><RxUpdate /></button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }}
        </contextTheme.Consumer>
    );
})
export default memo(TodosList);
