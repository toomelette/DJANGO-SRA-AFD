

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom';
import moment from 'moment'

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import numberFormat from '../Utils/DataFilters'
import EmployeeFormPersonalDetails from './EmployeeFormPersonalDetailsComp'

const EmployeeDetailsAppointmentCard = observer(({ employeeStore, dashboardMainStore }) => {

    const [page_loader, SetPageLoader] = useState(false);
    const { employee_id } = useParams();


    const handleEditAppointmentDetailsModal = (e) => {
        e.preventDefault()
        $("#employee-edit-appointment-details-modal").modal('toggle')
    }
    

    const handleUpdatePersonalDetails = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        axios.patch('api/employee/'+employee_id+'/', {
            form_type: "PD",
            firstname: employeeStore.firstname, 
            middlename: employeeStore.middlename, 
            lastname: employeeStore.lastname, 
            suffixname: employeeStore.suffixname, 
            address_present: employeeStore.address_present, 
            address_permanent: employeeStore.address_permanent, 
            birthdate: employeeStore.birthdate === "" ? null : employeeStore.birthdate,
            place_of_birth: employeeStore.place_of_birth, 
            sex: employeeStore.sex, 
            civil_status: employeeStore.civil_status.value,
            tel_no: employeeStore.tel_no, 
            cell_no: employeeStore.cell_no, 
            email_address: employeeStore.email_address, 
            spouse_name: employeeStore.spouse_name, 
            spouse_occupation: employeeStore.spouse_occupation, 
            no_of_children: employeeStore.no_of_children === "" ? 0 : employeeStore.no_of_children, 
            height: employeeStore.height, 
            weight: employeeStore.weight, 
            religion: employeeStore.religion, 
            blood_type: employeeStore.blood_type, 
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Employee Personal Details Successfully Updated!", type: "inverse" 
            });
            SetPageLoader(false);
            $("#employee-edit-personal-details-modal").modal('hide');
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                employeeStore.setErrorFields({
                    firstname: field_errors.firstname?.toString(), 
                    middlename: field_errors.middlename?.toString(), 
                    lastname: field_errors.lastname?.toString(),
                    suffixname: field_errors.suffixname?.toString(), 
                    address_present: field_errors.address_present?.toString(), 
                    address_permanent: field_errors.address_permanent?.toString(), 
                    birthdate: field_errors.birthdate?.toString(), 
                    place_of_birth: field_errors.place_of_birth?.toString(), 
                    sex: field_errors.sex?.toString(), 
                    civil_status: field_errors.civil_status?.toString(), 
                    tel_no: field_errors.tel_no?.toString(), 
                    cell_no: field_errors.cell_no?.toString(), 
                    email_address: field_errors.email_address?.toString(), 
                    spouse_name: field_errors.spouse_name?.toString(), 
                    spouse_occupation: field_errors.spouse_occupation?.toString(), 
                    no_of_children: field_errors.no_of_children?.toString(), 
                    height: field_errors.height?.toString(), 
                    weight: field_errors.weight?.toString(), 
                    religion: field_errors.religion?.toString(), 
                    blood_type: field_errors.blood_type?.toString(),
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
                <h5>Appointment Details</h5>
                { dashboardMainStore.checkIfSubrouteExist('employee-edit-appointment-details') ?
                    <button onClick={ handleEditAppointmentDetailsModal } 
                            className="btn btn-sm btn-primary btn-outline-primary icon-btn float-right">
                        <i className="icofont icofont-edit"></i>
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

        {/* EDIT MODAL */}
        <div className="modal" id="employee-edit-personal-details-modal" role="dialog">
            <div className="modal-dialog" role="document" style={{ maxWidth:'1200px' }}>
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Personal Details</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EmployeeFormPersonalDetails employeeStore={employeeStore}/>
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


export default EmployeeDetailsAppointmentCard