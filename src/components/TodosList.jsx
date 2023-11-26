import React, { memo, useContext } from 'react';

import scrollHOC from '../HOC/ScrollHOC';
import { ContextTheme } from '../constant/constContext';
import ListJob from './ListJob';
import { SCROLL_JOB } from '../constant/constAndFunctionApp';

const TodosList = React.forwardRef((props, ref) => {
    const { handleCRUDJob, jobs = [], handleScroll } = props
    const theme = useContext(ContextTheme)

    const getMoreData = () => {
        let isGetData = handleScroll()
        isGetData && handleCRUDJob(props.jobs.length, SCROLL_JOB);

    }
    return (
        <div className={theme.themeActive}>
            <h4>total {jobs.length}</h4>
            <hr style={{ marginBottom: 0 }} />
            <div ref={ref} className='list-Job' onScroll={getMoreData} >
                <ListJob jobs={jobs} handleCRUDJob={handleCRUDJob} />
            </div>
        </div>
    )
})
export default memo(scrollHOC(TodosList));
