import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VictoryPie } from 'victory';
import { getTasks } from '../../redux/actions';

import Propic from '../../assets/Profile.svg';
import LowPriorityIcon from '../../assets/Priority-Low.svg'
import MediumPriorityIcon from '../../assets/Priority-Medium.svg'
import HighPriorityIcon from '../../assets/Priority-High.svg'
import Notifications from '../../assets/Notifications.svg'
import Close from '../../assets/Close.svg'
import DashboardIcon from '../../assets/DashboardIcon.svg'
import Avatar1 from '../../assets/Avatar-1.svg'
import Avatar2 from '../../assets/Avatar-2.svg'

function Dashboard() {

  const { tasks } = useSelector(state => state.taskReducer)
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 8
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = tasks.slice(firstIndex, lastIndex)
  const nPage = Math.ceil(tasks.length / recordsPerPage)
  const numbers = [...Array(nPage + 1).keys()].slice(1)

  const taskStatistics=[
    { x: " ", y:   tasks.filter((task) => task.priority === "LOW").length},
    { x: " ", y:   tasks.filter((task) => task.priority === "MEDIUM").length},
    { x: " ", y:   tasks.filter((task) => task.priority === "HIGH").length}
  ]

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const pageBack = () => {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1);
    }
  }

  const pageNext = () => {
    if(currentPage !== nPage){
      setCurrentPage(currentPage + 1);
    }
  }

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const returnMonthAndDate = (timeStamp) => {
    const date = new Date(timeStamp);
    
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const formattedDate = `${month} ${day}`;
    return formattedDate;
  }

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  return (
    <div className='container-fluid row main-wrapper'>
      <div className='col-2 col-sm-2 col-md-2 col-lg-2 custom-columns left-navigation' style={{backgroundColor:'#33074F'}}>
        <div className='container-fluid acmy-solutions'>
          <p>Acmy Solutions</p>
        </div>
        <div className='container row dashboard-tabs'>
            <div className='col-2 col-sm-2 col-md-2 col-lg-2'>
              <img src={DashboardIcon} />
            </div>
            <div className='col-10 col-sm-10 col-md-10 col-lg-10'>
              <p>dashboard</p>
            </div>
        </div>
      </div>
      <div className='col-10 col-sm-10 col-md-10 col-lg-10 custom-columns dash-board-wrapper'>
        <div className='container-fluid dashboard-header'>
          <div className='row'>
            <div className='col-10 col-sm109 col-md-10 col-lg-10 dashboard-name' >
              <h5>Dashboard</h5>
              <div class="dropdown dropdown-tabs">
                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
                  <span>Dashboard</span>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#"><i className="fa-solid fa-chart-line"></i>Dashboard</a></li>
                </ul>
              </div>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 dashboard-bell'>
              <div className="d-flex justify-content-end">
                <img src={Notifications}/>
              </div>
            </div>
            <div className='col-1 col-sm-1 col-md-1 col-lg-1 dashboard-propic'>
              <div className='pro-pic-container'>
                <img src={Propic}  className='pro-pic-img'/>
              </div>
            </div>
          </div>
        </div>
        <div className="card welcome-card">
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <img src={Close}/>
            </div>
            <p className='welcome-msg'>Welcome back, John Doe</p>
            <p className='welcome-desc'>The end of the year is comming. Are you planning your performance interviews? You can do this super efficient with acmey</p>
            <a className='welcome-link' href='#'>Look here for more information</a>
          </div>
        </div>
        <div className='container-fluid row main-panel'>
          <div className='col-lg-8'>
              <div className='card task-card'>
                <div className="card-header">
                  <h6>Tasks</h6>
                </div>
                {
                  records.map((obj, index) => {
                    return(
                      <div className="card-body" key={index}>
                        <div className='row'>
                          <div className='col-1 col-sm-1 col-md-1 col-lg-1 custom-columns task-rows-cols marker'>
                            {
                              // obj.priority == "LOW" ? <i className="fa-solid fa-bell blue-bell"></i> : 
                              obj.priority == "LOW" ? <img src={LowPriorityIcon}/> : 
                              obj.priority == "MEDIUM" ? <img src={MediumPriorityIcon} />:
                              obj.priority == "HIGH" ? <img src={HighPriorityIcon} /> : '' 
                            } 
                          </div>
                          <div className='col-9 col-sm-9 col-md-9 col-lg-9 custom-columns task-rows-cols description'>
                            <div className="d-flex justify-content-start">
                              <p>{obj.todo}</p> 
                            </div>
                          </div>
                          <div className='col-1 col-sm-1 col-md-1 col-lg-1 custom-columns task-rows-cols status'>
                            <div className="d-flex justify-content-end">
                              {
                                obj.completed == true ? <span className="badge rounded-pill done-badge">Done</span>:
                                <span className="badge rounded-pill progress-badge">In-Progress</span>
                              }
                            </div>
                          </div>
                          <div className='col-1 col-sm-1 col-md-1 col-lg-1 custom-columns task-rows-cols date'>
                            <div className="d-flex justify-content-end">
                              <p>{returnMonthAndDate(obj.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                        {
                          obj.completed == false ? <p className='mark-as-done'>Mark as done</p> : <br/>
                        }
                        <hr className='task-hr-line'/>
                      </div>
                    )
                  })                  
                }
                <nav className='tasks-card-pagination'>
                  <ul className='pagination justify-content-center'> 
                    <li className='page-item pagination-prev-next'>
                      <a className='page-link' href='#' onClick={() => {pageBack()}}><i className="fa-solid fa-chevron-left"></i></a>
                    </li>
                    {
                      numbers.map((n, index) => {
                        return(
                          <li className={`page-item ${currentPage === n ? 'active' : ''} custom-page-items`} key={index}>
                            <a href='#' className='page-link' onClick={() => {changePage(n)}}>{n}</a>
                          </li>
                        )
                      })
                    }
                    <li className='page-item pagination-prev-next'>
                      <a className='page-link' href='#' onClick={() => {pageNext()}}><i className="fa-solid fa-chevron-left fa-rotate-180"></i></a>
                    </li>
                  </ul>
                </nav>
              </div>
          </div>
          <div className='col-lg-4'>
            <div className='card activity-feed-cards activity-feed'>
              <div className="card-header">
                <h6>Activity Feed</h6>
              </div>
              <div className="card-body">
                <div className='row'>
                  <div className='col-2 col-sm-2 col-md-2 col-lg-2'>
                    <img src={Avatar1}/>
                  </div>
                  <div className='col-10 col-sm-10 col-md-10 col-lg-10 custom-columns activity-feed-description'>
                    <p><b>Kushantha Charuka</b> created <span className='purple-highlight-text'>Contract #00124 need John Beige’s signature</span></p>
                    <p className='activity-feed-datetime'>Sep 16, 2022 at 11:30 AM</p>
                  </div>
                  <center><hr/></center>
                </div>
                <div className='row'>
                  <div className='col-2 col-sm-2 col-md-2 col-lg-2'>
                    <img src={Avatar2}/>
                  </div>
                  <div className='col-10 col-sm-10 col-md-10 col-lg-10 custom-columns activity-feed-description'>
                    <p>Lorem ipsum <b>dolor sit amet,</b> consectetur adipiscing elit. <b>Maecenas</b> pretium neque</p>
                    <p className='activity-feed-datetime'>Sep 16, 2022 at 11:30 AM</p>
                  </div>
                  <center><hr/></center>
                </div>
                <div className='row'>
                  <div className='col-2 col-sm-2 col-md-2 col-lg-2'>
                    <img src={Avatar2}/>
                  </div>
                  <div className='col-10 col-sm-10 col-md-10 col-lg-10 custom-columns activity-feed-description'>
                    <p>Lorem ipsum <b>dolor sit amet,</b> consectetur adipiscing elit. <b>Maecenas</b> pretium neque</p>
                    <p className='activity-feed-datetime'>Sep 16, 2022 at 11:30 AM</p>
                  </div>
                  <center><hr/></center>
                </div>
              </div>
            </div>
            <div className='card activity-feed-cards pie-chart-card'>
              <div className="card-header">
                <h6>Priorities</h6>
              </div>
              <div className='card-body row'>
                <div className='col-8 col-sm-8 col-md-8 col-lg-8'>
                  <VictoryPie
                    innerRadius={() => 80}
                    data={ taskStatistics }
                    colorScale={["#347deb", "#ebd534", "#eb343d", ]}
                  /> 
                </div>
                <div className='col-4 col-sm-4 col-md-4 col-lg-4 priority-chart-list-wrapper custom-columns align-items-center'>
                  <ul>
                    <li className='high-bullet'>High</li>
                    <li className='medium-bullet'>Medium</li>
                    <li className='low-bullet'>Low</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
