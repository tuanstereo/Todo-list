import React, { memo, useContext, useImperativeHandle, useRef } from 'react';

import ScrollHOC from '../HOC/ScrollHOC';
import { ContextTheme } from '../constant/constContext';
import ListJob from './ListJob';
import { SCROLL_JOB, checkScroll } from '../constant/constAndFunctionApp';
export const toTalJobs = []

const TodosList = React.forwardRef((props, ref) => {
    const { handleUpdateJobs, jobs, addJobs } = props
    const theme = useContext(ContextTheme)
    const refScroll = useRef();
    useImperativeHandle(ref, () => ({ refScroll }))

    const handleAddJobs = () => {
        let lengthNewJobs = addJobs(refScroll)
        lengthNewJobs && handleUpdateJobs(lengthNewJobs, SCROLL_JOB)
        checkScroll.check = true
    }
    return (
        <div className={theme.themeActive}>
            <h4>total {jobs.length}</h4>
            <hr style={{ marginBottom: 0 }} />
            <div ref={refScroll} className='list-Job' onScroll={handleAddJobs}>
                <ListJob jobs={jobs} handleUpdateJobs={handleUpdateJobs} />
            </div>
        </div>
    )
})
export default memo(ScrollHOC(TodosList));
