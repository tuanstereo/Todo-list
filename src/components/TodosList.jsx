import React, { Component, memo } from 'react';
import { deleteJob, updateJob, statusJob, pageSize } from '../constant/constJobTodo';
import { AiOutlineDelete } from "react-icons/ai"
import { MdOutlineDone } from 'react-icons/md'
import { TiDeleteOutline } from "react-icons/ti"
import { RxUpdate } from "react-icons/rx"
import { contextTheme } from '../App';

class TodosList extends Component {
    listRef = React.createRef()
    state = {
        isAddJobs: true,
        toTalJobs: [],
        jobs: [],
        isUpdateJob: false,
    }
    updateValueJob = (isUpdateJob, job) => {
        if (job) {
            const { toTalJobs, jobs } = this.state
            let newToTalJobs = [...toTalJobs]
            let newJobs = [...jobs]
            toTalJobs.find((item, index) => item.id === job.id && (newToTalJobs.splice(index, 1) && newJobs.splice(index, 1)))
            this.setState({
                toTalJobs: newToTalJobs,
                jobs: newJobs,
                isUpdateJob: !isUpdateJob
            })
        } else {
            this.setState({
                isUpdateJob: !isUpdateJob
            })
        }
    }
    updateJobs(jobs, action) {
        action && (this.listRef.current.scrollTop = 0)
        let newJobs = jobs.slice(0, pageSize)
        let newTotalJobs = [...jobs]
        this.setState({
            toTalJobs: newTotalJobs,
            jobs: newJobs
        })
    }
    getMore = index => {
        let { toTalJobs, jobs } = this.state
        let newJobs = toTalJobs.slice(index, index + pageSize)
        this.setState({
            isAddJobs: true,
            jobs: [...jobs, ...newJobs],
        })
    }
    AddJobs = (e) => {
        const { isAddJobs, jobs, toTalJobs } = this.state
        if (e.target.scrollHeight - e.target.scrollTop <= 300 && isAddJobs && jobs.length <= toTalJobs.length) {
            this.getMore(jobs.length)
        }
    }
    render() {
        const { jobs } = this.state
        const { active } = statusJob
        const { handleUpdateStatusJob } = this.props
        return (
            <contextTheme.Consumer>
                {(props) => {
                    return (
                        <div className={props}>
                            <h4>total {jobs.length}</h4>
                            <hr style={{marginBottom :0}} />
                            <div ref={this.listRef} className='list-Job' onScroll={this.AddJobs}>
                                {
                                    jobs.map(job =>
                                        <div key={job.id} className='d-flex justify-content-between align-items-center job-group mb-2'>
                                            <h4 className={job.done ? "active" : ""} >{job.valueJob}</h4>
                                            <div className={'pb-2 ' + props}>
                                                <button onClick={() => { handleUpdateStatusJob(job, deleteJob) }}><AiOutlineDelete /></button>
                                                <button onClick={() => { handleUpdateStatusJob(job, active) }}>{job.done ? <TiDeleteOutline /> : <MdOutlineDone />}</button>
                                                <button onClick={() => { handleUpdateStatusJob(job, updateJob) }}><RxUpdate /></button>
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
    }
}
export default memo(TodosList);