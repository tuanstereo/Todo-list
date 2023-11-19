import React, { useContext } from 'react'
import { AiOutlineDelete } from "react-icons/ai"
import { MdOutlineDone } from 'react-icons/md'
import { TiDeleteOutline } from "react-icons/ti"
import { RxUpdate } from "react-icons/rx"
import { DELETE_JOB, UPDATE_STATUS_JOB } from '../constant/constAndFunctionApp'
import { ContextTheme } from '../constant/constContext'
const ListJob = ({ jobs, handleUpdateJobs }) => {
    const theme = useContext(ContextTheme).themeActive
    return (
        jobs && jobs.map(job =>
            <div key={job.id} className='d-flex justify-content-between align-items-center job-group mb-2'>
                <h4 className={job.done ? "active" : ""} >{job.valueJob}</h4>
                <div className={'pb-2 ' + theme}>
                    <button onClick={() => handleUpdateJobs(job, DELETE_JOB)}><AiOutlineDelete /></button>
                    <button onClick={() => handleUpdateJobs(job, UPDATE_STATUS_JOB)}>{job.done ? <TiDeleteOutline /> : <MdOutlineDone />}</button>
                    <button onClick={() => handleUpdateJobs(job)}><RxUpdate /></button>
                </div>
            </div>
        )

    )
}

export default ListJob