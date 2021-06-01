

import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Link, useParams, useHistory} from 'react-router-dom';
import moment from 'moment';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import PayrollRegularContentDetails from './PayrollRegularDetailsContentComp'


const PayrollRegularDetails = observer(({ payrollRegularStore, payrollRegularDataStore, dashboardMainStore }) => {

    const history = useHistory();
    const { payroll_regular_id } = useParams();
    const [ page_loader, SetPageLoader ] = useState(false);

    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            payrollRegularStore.retrieve(payroll_regular_id)
            payrollRegularStore.setIsOpenedForm(1)
            payrollRegularDataStore.setPayrollRegularId(payroll_regular_id)
            payrollRegularDataStore.fetch()
        }
        return () => { is_mounted = false; } 
    },[])


    const redirectBackToPayrollRegularList = useCallback(() => {
        history.push('/payroll/payroll_regular'), [history]
    });


    const handleDeleteRouteModal = (e) => {
        // e.preventDefault()
        // $("#employee-delete-modal").modal('toggle')
    }


    const handleDeletePayrollRegularDetailsSubmit = (e) => {
        e.preventDefault()
        // SetPageLoader(true)
        // axios.delete('api/employee/'+payroll_regular_id+'/')
        //      .then((response) => {
        //         eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //             message: "PayrollRegularDetails has been successfully Deleted!", type: "inverse"
        //         });
        //         SetPageLoader(false)
        //         redirectBackToPayrollRegularDetailsList()
        //      }).catch((error) => {
        //         if(error.response.status == 404 || error.response.status == 500){
        //             eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //                 message: "Error Occured!", type: "danger" 
        //             });
        //         }
        //         SetPageLoader(false)
        //     });
        // $("#employee-delete-modal").modal('hide');
    }

    return (
        
    <div className="pcoded-content">
        <div className="page-header card">
            <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <i className="feather icon-user bg-c-blue"></i>
                        <div className="d-inline">
                            <h5>Payroll Regular Details</h5>
                            <span>Manage Details and Set Maintenance</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="page-header-breadcrumb">
                        <ul className=" breadcrumb breadcrumb-title">
                            <li className="breadcrumb-item">
                                <Link to="/"><i className="feather icon-home"></i></Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/payroll/payroll_regular">Payroll Regular</Link>
                            </li>
                            <li className="breadcrumb-item">
                                Details
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="pcoded-inner-content">
            <div className="main-body">
                <div className="page-wrapper">
                    <div className="page-body">
                        <div className="row">

                            <div className="col-sm-12">
                                <DivLoader type="Circles" loading={page_loader}/>
                                <div className="row mb-3 pl-2 pr-2">
                                    <div className="col-md-6 pt-1">
                                        <h3>{ payrollRegularStore.description }</h3>
                                        <span>{ moment(payrollRegularStore.process_date).format('MMM d, Y') }</span>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="/payroll/payroll_regular" 
                                                className="btn btn-primary float-right ml-2">
                                            <i className="fa fa-arrow-left"></i> Back to List
                                        </Link>
                                        { dashboardMainStore.checkIfSubrouteExist('payroll-payroll_regular-delete') ? 
                                            <button className="btn btn-md btn-danger btn-danger float-right ml-2" 
                                                    onClick={ handleDeleteRouteModal }>
                                                <i className="fa fa-trash"></i> Delete
                                            </button> : <></> 
                                        }
                                    </div>
                                </div> 
                            </div>


                            {/* Payroll Regular Maintenance */}
                            <div className="col-md-5">
                                <div className="card z-depth-0">
                                    <div className="card-header">
                                        <h5>Maintenance</h5>
                                    </div>
                                    <div className="card-block">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <tbody>
                                                    {/* { employeeStore.elig_list.map((val, key) => { 
                                                        return (
                                                            <tr key={key} className={ val.id == employeeStore.elig_id ? "table-info" : "" }>
                                                                <td className="align-middle">
                                                                    <h4>{ val.eligibility }</h4>
                                                                    <h6>{ val.level }</h6>
                                                                    <h6>{ defaultValueSetter(numberFormat(val.rating), "0.00", "") }</h6>
                                                                </td>
                                                                { dashboardMainStore.checkIfSubrouteExist('employee-edit-eligibility') ?
                                                                    <td className="align-middle">
                                                                        <a href="" onClick={ e => handleOpenEditEligibilityModal(e, val.id) }>
                                                                            <i className="feather icon-edit f-w-1000 f-18 m-r-15 text-c-blue"></i>
                                                                        </a>
                                                                        <a href="" onClick={ e => handleOpenDeleteEligibilityModal(e, val.id) }>
                                                                            <i className="feather icon-trash-2 f-w-1000 f-18 text-c-red"></i>
                                                                        </a>
                                                                    </td>: <td></td> 
                                                                }
                                                            </tr>
                                                        ) 
                                                    }) }
                                                    { employeeStore.elig_list.length == 0 ?
                                                        <tr>
                                                            <td>
                                                                <h4>No Data Encoded!</h4>
                                                            </td>
                                                        </tr> : <></> } */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Payroll Regular Data Details */}
                            <PayrollRegularContentDetails payrollRegularDataStore={payrollRegularDataStore}/>

                                                                    
                            {/* DELETE MODAL */}
                            {/* <div className="modal" id="employee-delete-modal" role="dialog">
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Delete Menu</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <h4>Are you sure you want to permanently delete this record?</h4>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleDeletePayrollRegularDetailsSubmit }>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
    
});


export default PayrollRegularDetails