

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'
import { useParams } from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import EmployeeFormAppointmentDetails from './EmployeeFormAppointmentDetailsComp'


const EmployeeDetailsPersonalCard = observer(({ employeeStore, dashboardMainStore }) => {
    
    const [page_loader, SetPageLoader] = useState(false);
    const { employee_id } = useParams();


    const handleEditPersonalDetailsModal = (e) => {
        e.preventDefault()
        $("#employee-edit-personal-details-modal").modal('toggle')
    }


    const handleUpdatePersonalDetails = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        axios.patch('api/employee/'+employee_id+'/', {
            form_type: "AD",
            employee_id: employeeStore.employee_id,
            position: employeeStore.position,
            is_active: employeeStore.is_active,
            // station: employeeStore.station.value,
            // plantilla_item: employeeStore.plantilla_item.value,
            salary_grade: employeeStore.salary_grade === "" ? 0 : employeeStore.salary_grade,
            step_increment: employeeStore.step_increment === "" ? 0 : employeeStore.step_increment,
            application_status: employeeStore.application_status,
            tax_status: employeeStore.tax_status,
            monthly_salary: employeeStore.monthly_salary === "" ? 0 : employeeStore.monthly_salary,
            firstday_gov: employeeStore.firstday_gov === "" ? null : employeeStore.firstday_gov,
            firstday_sra: employeeStore.firstday_sra === "" ? null : employeeStore.firstday_sra,
            first_appointment: employeeStore.first_appointment === "" ? null : employeeStore.first_appointment,
            last_appointment: employeeStore.last_appointment === "" ? null : employeeStore.last_appointment,
            last_step_increment: employeeStore.last_step_increment === "" ? null : employeeStore.last_step_increment,
            last_adjustment: employeeStore.last_adjustment === "" ? null : employeeStore.last_adjustment,
            last_promotion: employeeStore.last_promotion === "" ? null : employeeStore.last_promotion,
            original_appointment: employeeStore.original_appointment === "" ? null : employeeStore.original_appointment,
            adjustment_date: employeeStore.adjustment_date === "" ? null : employeeStore.adjustment_date,
            tin: employeeStore.tin,
            gsis: employeeStore.gsis,
            philhealth: employeeStore.philhealth,
            pagibig: employeeStore.pagibig,
            sss: employeeStore.sss,
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Employee Appointment Details Successfully Updated!", type: "inverse" 
            });
            SetPageLoader(false);
            $("#employee-edit-appointment-details-modal").modal('hide');
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                employeeStore.setErrorFields({
                    employee_id: field_errors.employee_id?.toString(),
                    position: field_errors.position?.toString(),
                    is_active: field_errors.is_active?.toString(),
                    // station: field_errors.station?.toString(),
                    // plantilla_item: field_errors.plantilla_item?.toString(),
                    salary_grade: field_errors.salary_grade?.toString(),
                    step_increment: field_errors.step_increment?.toString(),
                    application_status: field_errors.application_status?.toString(),
                    tax_status: field_errors.tax_status?.toString(),
                    monthly_salary: field_errors.monthly_salary?.toString(),
                    firstday_gov: field_errors.firstday_gov?.toString(),
                    firstday_sra: field_errors.firstday_sra?.toString(),
                    first_appointment: field_errors.first_appointment?.toString(),
                    last_appointment: field_errors.last_appointment?.toString(),
                    last_step_increment: field_errors.last_step_increment?.toString(),
                    last_adjustment: field_errors.last_adjustment?.toString(),
                    last_promotion: field_errors.last_promotion?.toString(),
                    original_appointment: field_errors.original_appointment?.toString(),
                    adjustment_date: field_errors.adjustment_date?.toString(),
                    tin: field_errors.tin?.toString(),
                    gsis: field_errors.gsis?.toString(),
                    philhealth: field_errors.philhealth?.toString(),
                    pagibig: field_errors.pagibig?.toString(),
                    sss: field_errors.sss?.toString(),
                    non_field_errors: field_errors.non_field_errors?.toString(),
                });
            }
            if(error.response.status == 404){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Data Not Found!", type: "danger" 
                });
            }
            if(error.response.status == 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "There's an error trying to send data to the server!", type: "danger" 
                });
            }
            SetPageLoader(false);
        });

    }


    return (
    <>
        <div className="card z-depth-0">
            <div className="card-header">
                <h5>Personal Details</h5>
                { dashboardMainStore.checkIfSubrouteExist('employee-edit-personal-details') ?
                    <button onClick={ handleEditPersonalDetailsModal }
                            className="btn btn-sm btn-primary btn-outline-primary icon-btn float-right">
                        <i className="icofont icofont-edit"></i>
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
            
        {/* EDIT MODAL */}
        <div className="modal" id="employee-edit-appointment-details-modal" role="dialog">
            <div className="modal-dialog" role="document" style={{ maxWidth:'1200px' }}>
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Appointment Details</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EmployeeFormAppointmentDetails employeeStore={employeeStore}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleUpdatePersonalDetails }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    </>
    );

    
});


export default EmployeeDetailsPersonalCard