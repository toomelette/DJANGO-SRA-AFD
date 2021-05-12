

import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment'
import { observer } from 'mobx-react';
import { Link, useParams, useHistory} from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import numberFormat from '../Utils/DataFilters'

import EmployeeEditPersonalDetailsModal from './EmployeeEditPersonalDetailsModalComp'
import EmployeeEditAppointmentDetailsModal from './EmployeeEditAppointmentDetailsModalComp'



const EmployeeDetails = observer(({ employeeStore, dashboardMainStore }) => {

    const history = useHistory();
    const { employee_id } = useParams();
    const [ page_loader, SetPageLoader ] = useState(false);

    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            employeeStore.retrieve(employee_id)
            employeeStore.setIsOpenedForm(1)
        }
        return () => { is_mounted = false; } 
    },[])


    const redirectBackToEmployeeList = useCallback(() => {
        // history.push('/employees'), [history]
    });


    const handleDeleteRouteModal = (e) => {
        e.preventDefault()
        $("#employee-delete-modal").modal('toggle')
    }


    const handleEditPersonalDetailsModal = (e) => {
        e.preventDefault()
        $("#employee-edit-personal-details-modal").modal('toggle')
    }


    const handleAddEducationalBackground = (e) => {
        e.preventDefault()
        console.log("TEST")
    }


    const handleEditAppointmentDetailsModal = (e) => {
        e.preventDefault()
        $("#employee-edit-appointment-details-modal").modal('toggle')
    }


    const handleDeleteEmployeeSubmit = (e) => {
        e.preventDefault()
        // SetPageLoader(true)
        // axios.delete('api/employee/'+employee_id+'/')
        //      .then((response) => {
        //         eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //             message: "Employee has been successfully Deleted!", type: "inverse"
        //         });
        //         redirectBackToEmployeeList()
        //         SetPageLoader(false)
        //      }).catch((error) => {
        //         if(error.response.status == 404){
        //             eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //                 message: "Data Not Found!", type: "danger" 
        //             });
        //         }
        //         if(error.response.status == 500){
        //             eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //                 message: "There's an error trying to send data to the server!", type: "danger" 
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
                            <h5>Employees</h5>
                            <span>Manage Employees</span>
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
                                <Link to="/employees">Employees</Link>
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
                                        <h3>{ employeeStore.fullname }</h3>
                                        <span>{ employeeStore.position }</span>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="/employees" 
                                                className="btn btn-primary float-right ml-2">
                                            <i className="fa fa-arrow-left"></i> Back to List
                                        </Link>
                                        { dashboardMainStore.checkIfSubrouteExist('employee-delete') ? 
                                            <button className="btn btn-md btn-danger btn-danger float-right ml-2" 
                                                    onClick={ handleDeleteRouteModal }>
                                                <i className="fa fa-trash"></i> Delete
                                            </button> : <></> 
                                        }
                                    </div>
                                </div>

                                {/* PERSONAL DETAILS */}
                                <div className="card z-depth-0">
                                    <div className="card-header">
                                        <h5>Personal Details</h5>
                                        { dashboardMainStore.checkIfSubrouteExist('employee-edit-personal-details') ?
                                            <button className="btn btn-sm btn-primary btn-outline-primary float-right"
                                                    onClick={ handleEditPersonalDetailsModal }>
                                                <i className="ti-pencil-alt ml-1"></i>
                                            </button> : <></> 
                                        }
                                    </div>
                                    <div className="card-block">

                                        <div className="row">

                                            <div className="col-md-3">
                                                <span> Firstname: {'\n'} </span>
                                                <h5>{ employeeStore.firstname }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span> Middlename: {'\n'} </span>
                                                <h5>{ employeeStore.middlename }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span> Lastname: {'\n'} </span>
                                                <h5>{ employeeStore.lastname }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span> Suffixname: {'\n'} </span>
                                                <h5>{ employeeStore.suffixname }</h5>
                                            </div>

                                            <div className="col-md-12 mt-4">{' '}</div>

                                            <div className="col-md-6">
                                                <span> Present Address: {'\n'} </span>
                                                <h5>{ employeeStore.address_present }</h5>
                                            </div>

                                            <div className="col-md-6">
                                                <span> Permanent Address: {'\n'} </span>
                                                <h5>{ employeeStore.address_permanent }</h5>
                                            </div>
                                            
                                            <div className="col-md-12 mt-4">{' '}</div>

                                            <div className="col-md-3">
                                                <span> Date of Birth: {'\n'} </span>
                                                <h5>{ moment(employeeStore.birthdate).format("MMM D, YYYY") }</h5>
                                            </div>
                                            
                                            <div className="col-md-6">
                                                <span> Place of Birth: {'\n'} </span>
                                                <h5>{ employeeStore.place_of_birth }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span> Sex: {'\n'} </span>
                                                <h5>{ employeeStore.getSexLabel() }</h5>
                                            </div>
                                            
                                            <div className="col-md-12 mt-4">{' '}</div>
                                            
                                            <div className="col-md-3">
                                                <span> Civil Status: {'\n'} </span>
                                                <h5>{ employeeStore.getCivilStatusLabel() }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span> Telephone No.: {'\n'} </span>
                                                <h5>{ employeeStore.tel_no }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span> Cellphone No.: {'\n'} </span>
                                                <h5>{ employeeStore.cell_no }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span> Email Address: {'\n'} </span>
                                                <h5>{ employeeStore.email_address }</h5>
                                            </div>
                                            
                                            <div className="col-md-12 mt-4">{' '}</div>
                                            
                                            <div className="col-md-3">
                                                <span> Spouse Name: {'\n'} </span>
                                                <h5>{ employeeStore.spouse_name }</h5>
                                            </div>

                                            <div className="col-md-6">
                                                <span> Spouse Occupation: {'\n'} </span>
                                                <h5>{ employeeStore.spouse_occupation }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span> Number of Children: {'\n'} </span>
                                                <h5>{ employeeStore.no_of_children }</h5>
                                            </div>
                                            
                                            <div className="col-md-12 mt-4">{' '}</div>
                                            
                                            <div className="col-md-3">
                                                <span> Height: {'\n'} </span>
                                                <h5>{ employeeStore.height }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span> Weight: {'\n'} </span>
                                                <h5>{ employeeStore.weight }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span> Religion: {'\n'} </span>
                                                <h5>{ employeeStore.religion }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span> Blood Type: {'\n'} </span>
                                                <h5>{ employeeStore.blood_type }</h5>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                
                                {/* EDUCATIONAL BACKGROUND */}
                                <div className="card z-depth-0">
                                    <div className="card-header">
                                        <h5>Educational Background</h5>
                                        { dashboardMainStore.checkIfSubrouteExist('employee-edit-appointment-details') ?
                                            <button className="btn btn-sm btn-success btn-outline-success float-right"
                                                    onClick={ handleAddEducationalBackground }>
                                                <i className="ti-plus ml-1"></i>
                                            </button> : <></> 
                                        }
                                    </div>
                                    <div className="card-block">
                                        <div className="table-responsive">
                                            <table className="table table-hover m-b-0">
                                            <tbody>
                                                <tr>
                                                    <td className="align-middle">
                                                        <h5>Bago City College</h5>
                                                        <span>BSIS</span>
                                                        <p>Tertiary</p>
                                                        <span>June 2020 - March 2021</span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <a href=""><i className="icon feather icon-edit f-w-600 f-16 m-r-15 text-c-blue"></i></a>
                                                        <a href=""><i className="feather icon-trash-2 f-w-600 f-16 text-c-red"></i></a>
                                                    </td>
                                                </tr>
                                            </tbody>

                                            </table>
                                        </div>

                                    </div>
                                </div>

                                
                                {/* APPOINTMENT DETAILS */}
                                <div className="card z-depth-0">
                                    <div className="card-header">
                                        <h5>Appointment Details</h5>
                                        { dashboardMainStore.checkIfSubrouteExist('employee-edit-appointment-details') ?
                                            <button className="btn btn-sm btn-primary btn-outline-primary float-right"
                                                    onClick={ handleEditAppointmentDetailsModal }>
                                                <i className="ti-pencil-alt ml-1"></i>
                                            </button> : <></> 
                                        }
                                    </div>
                                    <div className="card-block">

                                        <div className="row">

                                            <div className="col-md-3">
                                                <span> Employee No.: {'\n'} </span>
                                                <h5>{ employeeStore.employee_id }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span> Position: {'\n'} </span>
                                                <h5>{ employeeStore.position }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span> Active Status: {'\n'} </span>
                                                <h5>{ employeeStore.is_active == true ? "Active" : "Inactive" }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span> Application Status: {'\n'} </span>
                                                <h5>{ employeeStore.getApplicationStatusLabel() }</h5>
                                            </div>
                                            
                                            <div className="col-md-12 mt-4">{' '}</div>

                                            <div className="col-md-3">
                                                <span>Salary Grade: {'\n'} </span>
                                                <h5>{ employeeStore.salary_grade }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span>Step Increment: {'\n'} </span>
                                                <h5>{ employeeStore.step_increment }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span>Tax Status: {'\n'} </span>
                                                <h5>{ employeeStore.tax_status }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span>Monthly Salary: {'\n'} </span>
                                                <h5>{ numberFormat(employeeStore.monthly_salary) }</h5>
                                            </div>
                                            
                                            <div className="col-md-12 mt-4">{' '}</div>

                                            <div className="col-md-3">
                                                <span>Firstday Gov.: {'\n'} </span>
                                                <h5>{ moment(employeeStore.firstday_gov).format("MMM D, YYYY") }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span>Firstday SRA: {'\n'} </span>
                                                <h5>{ moment(employeeStore.firstday_sra).format("MMM D, YYYY") }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span>First Appointment: {'\n'} </span>
                                                <h5>{ moment(employeeStore.first_appointment).format("MMM D, YYYY") }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span>Last Appointment: {'\n'} </span>
                                                <h5>{ moment(employeeStore.last_appointment).format("MMM D, YYYY") }</h5>
                                            </div>
                                            
                                            <div className="col-md-12 mt-4">{' '}</div>

                                            <div className="col-md-3">
                                                <span>Last Step Increment: {'\n'} </span>
                                                <h5>{ moment(employeeStore.last_step_increment).format("MMM D, YYYY") }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span>Last Adjustment: {'\n'} </span>
                                                <h5>{ moment(employeeStore.last_adjustment).format("MMM D, YYYY") }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span>Last Promotion: {'\n'} </span>
                                                <h5>{ moment(employeeStore.last_promotion).format("MMM D, YYYY") }</h5>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <span>Original Appointment: {'\n'} </span>
                                                <h5>{ moment(employeeStore.original_appointment).format("MMM D, YYYY") }</h5>
                                            </div>
                                            
                                            <div className="col-md-12 mt-4">{' '}</div>
                                            
                                            <div className="col-md-3">
                                                <span>Adjustment Date: {'\n'} </span>
                                                <h5>{ moment(employeeStore.adjustment_date).format("MMM D, YYYY") }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span>TIN: {'\n'} </span>
                                                <h5>{ employeeStore.tin }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span>GSIS: {'\n'} </span>
                                                <h5>{ employeeStore.gsis }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span>PHILHEALTH: {'\n'} </span>
                                                <h5>{ employeeStore.philhealth }</h5>
                                            </div>
                                            
                                            <div className="col-md-12 mt-4">{' '}</div>
                                            
                                            <div className="col-md-3">
                                                <span>PAGIBIG: {'\n'} </span>
                                                <h5>{ employeeStore.pagibig }</h5>
                                            </div>

                                            <div className="col-md-3">
                                                <span>SSS: {'\n'} </span>
                                                <h5>{ employeeStore.sss }</h5>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>

                                                                    
                            {/* DELETE MODAL */}
                            <div className="modal" id="employee-delete-modal" role="dialog">
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
                                            <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleDeleteEmployeeSubmit }>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                        
                            {/* Employee Edit Personal Details Modal */}
                            <EmployeeEditPersonalDetailsModal employeeStore={employeeStore}/>

                            {/* Employee Edit Personal Details Modal */}
                            <EmployeeEditAppointmentDetailsModal employeeStore={employeeStore}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
    
});


export default EmployeeDetails