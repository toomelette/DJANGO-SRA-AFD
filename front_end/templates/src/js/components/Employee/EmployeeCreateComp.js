
import React, { useState, useCallback } from 'react'
import { observer } from 'mobx-react'
import { Link, useHistory } from 'react-router-dom'

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'

import EmployeeFormPersonalDetails from './EmployeeFormPersonalDetailsComp'
import EmployeeFormAppointmentDetails from './EmployeeFormAppointmentDetailsComp'



const EmployeeCreate = observer(({ employeeStore }) => {
    
    const history = useHistory();
    const [page_loader, SetPageLoader] = useState(false);


    const redirectBackToUserList = useCallback(() => {
        history.push('/employees'), [history]
    });


    const handleResetForm = (e) =>{
        e.preventDefault()
        employeeStore.resetForm()
    }


    const handleCreate = (e, is_save_another) => {
        e.preventDefault()
        // SetPageLoader(true)
        // if(employeeStore.password != employeeStore.password_confirm){
        //     employeeStore.setErrorFields({ password : "Password doesn't match!" })
        //     SetPageLoader(false)
        // }else{
        //     axios.post('api/employee/', { 
        //         first_name : employeeStore.first_name,
        //         last_name : employeeStore.last_name,
        //         email : employeeStore.email,
        //         employeename : employeeStore.employeename, 
        //         password : employeeStore.password, 
        //         employee_routes : employeeStore.employee_routes,
        //         employee_subroutes : employeeStore.employee_subroutes,
        //     }).then((response) => {
        //         eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //             message: "User Successfully Created!", type: "inverse" 
        //         });
        //         employeeStore.fetch();
        //         employeeStore.setSelectedUser(response.data.id);
        //         employeeStore.resetForm()
        //         if (is_save_another == 0){
        //             redirectBackToUserList()
        //         }
        //         SetPageLoader(false);
        //     }).catch((error) => {
        //         if(error.response.status == 400){
        //             let field_errors = error.response.data;
        //             employeeStore.setErrorFields({
        //                 firstname: field_errors.first_name?.toString(),
        //                 lastname: field_errors.last_name?.toString(),
        //                 email: field_errors.email?.toString(),
        //                 employeename: field_errors.employeename?.toString(),
        //                 password: field_errors.password?.toString(),
        //                 employee_routes: field_errors.employee_routes?.toString(),
        //                 employee_subroutes: field_errors.employee_subroutes?.toString(),
        //             });
        //         }
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
        //         SetPageLoader(false);
        //     });
        // }
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
                                Create
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
                                <div className="card">

                                    <DivLoader type="Circles" loading={page_loader}/>
                                    <div className="card-header">
                                        <h5>Create Employee</h5>
                                        <Link to="/employees" className="btn btn-primary btn-outline-primary float-right pt-2 pb-2">
                                            <i className="fa fa-navicon"></i> Back to List
                                        </Link>
                                    </div>

                                    <div className="card-block">
                                        <div className="row">
                                            
                                            {/* Personal Details */}
                                            <EmployeeFormPersonalDetails employeeStore={employeeStore}/>

                                            {/* Appointment Details */}
                                            <EmployeeFormAppointmentDetails employeeStore={employeeStore}/>

                                        </div>


                                        <div className="form-group row mt-2">
                                            <div className="col-sm-12">
                                                <button type="button" className="btn btn-primary float-right mr-2" onClick={ (e) => handleCreate(e, 0) }>
                                                    Save
                                                </button>
                                                <button type="button" className="btn btn-primary float-right mr-2" onClick={ (e) => handleCreate(e, 1) }>
                                                    Save and add another
                                                </button>
                                                <button type="button" className="btn btn-primary float-right mr-2" onClick={ (e) => handleResetForm(e) }>
                                                    Reset
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
    
});


export default EmployeeCreate