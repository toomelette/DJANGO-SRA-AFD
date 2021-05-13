

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import EmployeeFormEducationalBackground from './EmployeeFormEducationalBackgroundComp'

const EmployeeDetailsEducationalBackgroundCard = observer(({ employeeStore, dashboardMainStore }) => {


    const [page_loader, SetPageLoader] = useState(false);
    const { employee_id } = useParams();


    const handleOpenCreateEducationalBackgroundModal = (e) => {
        e.preventDefault()
        $("#employee-educ-bg-create-modal").modal('toggle')
    }


    const handleCreateEducationalBackground = (e) => {
        e.preventDefault()
        console.log('test')
    }


    return (
    <>

        <div className="card z-depth-0">
            <div className="card-header">
                <h5>Educational Background</h5>
                { dashboardMainStore.checkIfSubrouteExist('employee-edit-appointment-details') ?
                <button onClick={ handleOpenCreateEducationalBackgroundModal }
                        className="btn btn-sm btn-success btn-outline-success icon-btn float-right">
                    <i className="icofont icofont-plus"></i>
                </button> : <></> 
                }
            </div>
            <div className="card-block">
                <div className="table-responsive">
                    <table className="table table-hover">
                    <tbody>
                        { 
                            employeeStore.educ_bg_list.map((val, key) => {
                                (
                                    <tr key={key}>
                                        <td className="align-middle">
                                            <h4>{ val.school }</h4>
                                            <h6>{ val.course }</h6>
                                            <h6>{ val.level }</h6>
                                            <h6>{ val.date_from } - { val.date_to }</h6>
                                        </td>
                                        <td className="align-middle">
                                            <a href="" onClick={ e => e.preventDefault() }>
                                                <i className="feather icon-edit f-w-1000 f-18 m-r-15 text-c-blue"></i>
                                            </a>
                                            <a href="" onClick={ e => e.preventDefault() }>
                                                <i className="feather icon-trash-2 f-w-1000 f-18 text-c-red"></i>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {
                            employeeStore.educ_bg_list.length == 0 ? 
                                (
                                    <tr>
                                        <td className="align-middle">
                                            <h4>No avaliable data!</h4>
                                        </td>
                                    </tr>
                                )
                            : <></>
                        }
                    </tbody>

                    </table>
                </div>

            </div>
        </div>

            
        {/* CREATE MODAL */}
        <div className="modal" id="employee-educ-bg-create-modal" role="dialog">
            <div className="modal-dialog" role="document" style={{ maxWidth:'1200px' }}>
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Add Educational Background</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EmployeeFormEducationalBackground employeeStore={employeeStore}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleCreateEducationalBackground }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    </>
    );

    
});


export default EmployeeDetailsEducationalBackgroundCard