import React, { Component, memo } from 'react';
import { deleteJob, updateJob, statusJob } from '../constant/constJobTodo';
import { AiOutlineDelete } from "react-icons/ai"
import { MdOutlineDone } from 'react-icons/md'
import { TiDeleteOutline } from "react-icons/ti"
import { RxUpdate } from "react-icons/rx"
class TodosList extends Component {
    isUpdateListJob = false
    UpdateStatusJob = (job, action) => {
        this.props.handleUpdateStatusJob(job, action)
    }
    //TODO: nếu pagination theo indexpage thì pageSize = 3
    //TODO: nếu pagination theo scroll thì pageSize = 5
    state = {
        isAddJobs: true,
        isUpdateJob: false,
        toTalJobs: [],
        jobs: [],
        pageSize: 5,
        toTalPage: 0,
        indexPage: 1,
        pages: [],

    }
    updateValueJob = (isUpdateJob) => {
        this.setState({
            isUpdateJob: !isUpdateJob
        })
    }
    listRef = React.createRef()
    updateJobs(jobs) {
        this.listRef.current.scrollTop = 0
        let { pageSize } = this.state
        let defaultJobs = jobs.slice(0, pageSize)
        let menuItems = [];
        for (let i = 1; i <= Math.ceil(jobs.length / pageSize); i++) {
            menuItems.push(i);
        }
        this.isUpdateListJob = true        
        this.setState({
            toTalJobs: jobs,
            jobs: defaultJobs,
            toTalPage: Math.ceil(jobs.length / pageSize),
            pages: menuItems,
            indexPage: 1,
            isAddJobs: true,
        })
    }
    handleChangePage = (indexPage) => {
        const { pageSize, toTalJobs } = this.state
        let newJobs = toTalJobs.slice((indexPage - 1) * pageSize, indexPage * pageSize)
        this.setState({
            jobs: newJobs,
            indexPage
        })
    }
    handleAddJob = (indexPage) => {
        let { pageSize, toTalJobs, jobs } = this.state
        let newJobs = toTalJobs.slice((indexPage - 1) * pageSize, indexPage * pageSize)
        this.setState({
            indexPage,
            isAddJobs: true,
            jobs: [...jobs, ...newJobs],
        })
    }
    AddJobs = (e) => {
        let { isAddJobs, toTalPage, indexPage, jobs } = this.state
        //TODO: khi người dùng kéo quá 75% và vẫn còn job chưa show lên thì chạy gọi vào handleAddJob
        // isAddJobs true thì mới gọi vào để ngăn trường hợp người data chưa update nhưng người dùng kéo liên tục
        // khi gọi vào rồi thì set isAddJobs = false rồi handleAddJob sẽ add job mới và set lại isAddJobs = true
        let scroll = (e.target.scrollTop + e.target.clientHeight) * 100 / e.target.scrollHeight
        if (scroll >= 75 && isAddJobs && indexPage < toTalPage) {
            if (!this.isUpdateListJob) {
                isAddJobs = false
                this.handleAddJob(++indexPage)
            }
            else {
                console.log("alo");
                this.isUpdateListJob = false
            }
        }
        // // tổng độ dài
        // console.log(e.target.scrollHeight);
        // // độ dài cố định người dùng nhìn thấy
        // console.log(e.target.clientHeight);
    }
    render() {
        const { jobs, pages, indexPage } = this.state
        const { active } = statusJob
        return (
            <>
                <h4>total {jobs.length}</h4>
                <div ref={this.listRef} className='list-Job' onScroll={this.AddJobs}>
                    {
                        jobs.map(job =>
                            <div key={job.id} className='d-flex justify-content-between align-items-center job-group mb-2'>
                                <h4 className={job.done ? "active" : ""} >{job.valueJob}</h4>
                                <div className='pb-2'>
                                    <button onClick={() => { this.UpdateStatusJob(job, deleteJob) }}><AiOutlineDelete /></button>
                                    <button onClick={() => { this.UpdateStatusJob(job, active) }}>{job.done ? <TiDeleteOutline /> : <MdOutlineDone />}</button>
                                    <button onClick={() => { this.UpdateStatusJob(job, updateJob) }}><RxUpdate /></button>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                    {(pages && pages.length > 0) && pages.map(item => <button className={item === indexPage ? "btn btn-active btn-page" : "btn btn-page"} onClick={() => { this.handleChangePage(item) }} key={item}>{item}</button>)}
                </div>
            </>
        );
    }
}
export default memo(TodosList);