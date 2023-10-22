import React, { Component } from 'react';
import { deleteJob, active, unfinished, updateJob } from '../constant/constJobTodo';
import { AiOutlineDelete } from "react-icons/ai"
import { MdOutlineDone } from 'react-icons/md'
import { RxUpdate } from "react-icons/rx"
class TodosList extends Component {
    UpdateStatusJob = (id, action) => {
        this.props.handleUpdateStatusJob(id, action)
    }
    render() {

        return (
            <div className='list-Job'>
                {
                    // //TODO: 
                    (this.props.arrJob && this.props.arrJob.length > 0) && this.props.arrJob.map(job => {
                        switch (this.props.fillterByStatusJob) {
                            case unfinished:
                                if (job.done) {
                                    return (
                                        <div key={job.id}>
                                            <h4 className={job.done ? "active" : ""} >{job.valueJob}</h4>
                                            <button onClick={() => { this.UpdateStatusJob(job.id, deleteJob) }}><AiOutlineDelete /></button>
                                            <button onClick={() => { this.UpdateStatusJob(job.id, active) }}><MdOutlineDone /></button>
                                            <button onClick={() => { this.UpdateStatusJob(job.id, updateJob) }}><RxUpdate /></button>
                                        </div>
                                    )
                                }
                                break;
                            case active:
                                if (!job.done) {
                                    return (
                                        <div key={job.id}>
                                            <h4 className={job.done ? "active" : ""} >{job.valueJob}</h4>
                                            <button onClick={() => { this.UpdateStatusJob(job.id, deleteJob) }}>Delete</button>
                                            <button onClick={() => { this.UpdateStatusJob(job.id, active) }}>Done</button>
                                            <button onClick={() => { this.UpdateStatusJob(job.id, updateJob) }}>updateJob</button>
                                        </div>
                                    )
                                }
                                break;
                            default:
                                return (
                                    <div key={job.id} className='d-flex justify-content-between align-items-center job-group mb-2'>
                                        <h4 className={job.done ? "active" : ""} >{job.valueJob}</h4>
                                        <div className='pb-2'>
                                            <button onClick={() => { this.UpdateStatusJob(job.id, deleteJob) }}><AiOutlineDelete /></button>
                                            <button onClick={() => { this.UpdateStatusJob(job.id, active) }}><MdOutlineDone /></button>
                                            <button onClick={() => { this.UpdateStatusJob(job.id, updateJob) }}><RxUpdate /></button>
                                        </div>
                                    </div>
                                )
                        }
                    }

                    )
                }
            </div>
        );
    }
}


export default TodosList;