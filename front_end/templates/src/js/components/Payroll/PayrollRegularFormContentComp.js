

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import { SelectInput } from '../Utils/Forms/DefaultInputs'


const PayrollRegularTemplateFormContent = observer(({ payrollRegularStore, employeeStore}) => {


    const [page_loader, SetPageLoader] = useState(false);
    const { template_id } = useParams();


    const handleOpenCreateModal = (e) => {
        e.preventDefault()
        employeeStore.getAll()
        $("#template-create-modal").modal('toggle')
    }


    const handleCreate = (e) => {
        e.preventDefault()

    }


    const handleOpenEditModal = (e, id) => {
        e.preventDefault()

    }


    const handleUpdate = (e) => {
        e.preventDefault()

    }


    const handleOpenDeleteModal = (e, id) => {
        e.preventDefault()

    }


    const handleDelete = (e) => {
        e.preventDefault()

    }


    return (
    <>
        <div className="col-sm-12 mb-5">
            <h4 className="sub-title">
                <div className="row">
                    <div className="col-sm-6 mt-2">
                        Template Content
                    </div>
                    <div className="col-sm-6">
                        <button 
                            onClick={ handleOpenCreateModal }
                            className="btn btn-md btn-success btn-outline-success icon-btn float-right pt-2 pb-2"
                        >
                            <i className="icofont icofont-plus"></i> Add 
                        </button>
                    </div>
                </div>
            </h4>
        </div>

        {/* CREATE MODAL */}
        <div className="modal" id="template-create-modal" role="dialog">
            <div className="modal-dialog" role="document" style={{ maxWidth:'1200px' }}>
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Add Regular Payroll Content</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="alert alert-primary icons-alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <i className="icofont icofont-close-line-circled"></i>
                            </button>
                            <p>
                                <strong>Note!</strong>{" "}
                                Please check the selected employee appointment information if it is updated before adding it into the regular payroll content.
                            </p>
                        </div>

                        <SelectInput
                            col="col-md-12"
                            name="employee"
                            label="Employee:"
                            value={ payrollRegularStore.prd_employee_id }
                            isDisabled={ false }
                            options={ employeeStore.employee_options }
                            onChange={ (value) => payrollRegularStore.setTdEmployeeId(value) }
                            errorField={ payrollRegularStore.error_fields.td_employee_id }
                        />

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleCreate }>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* EDIT MODAL */}
        {/* <div className="modal" id="template-educ-bg-edit-modal" role="dialog">
            <div className="modal-dialog" role="document" style={{ maxWidth:'1200px' }}>
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Educational Background</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EmployeeFormEducationalBackground payrollRegularStore={payrollRegularStore}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleUpdateEducationalBackground }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div> */}
                                                                    
        {/* DELETE MODAL */}
        {/* <div className="modal" id="template-educ-bg-delete-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Delete Educational Background</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h4>Are you sure you want to permanently delete this record?</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleDeleteEmployeeEducationalBackground }>Delete</button>
                    </div>
                </div>
            </div>
        </div> */}
        
    </>
    );

    
});


export default PayrollRegularTemplateFormContent