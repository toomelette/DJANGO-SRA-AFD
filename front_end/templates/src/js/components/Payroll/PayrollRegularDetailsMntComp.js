

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import PayrollRegularFormMntComp from './PayrollRegularFormMntComp'


const PayrollRegularMntDetails = observer(({ payrollRegularDataStore, payrollRegularMntStore }) => {


    const handleOpenCreatePayrollRegularMntModal = (e) => {
        e.preventDefault()
        payrollRegularDataStore.getByPrId()
        payrollRegularMntStore.setParamOptions()
        $("#payroll-regular-mnt-create-modal").modal("toggle")
    }


    const handleCreatePayrollRegularMnt = (e) => {
        e.preventDefault()

        axios.post('api/payroll_regular_mnt/', {
            prd_id : payrollRegularMntStore.payroll_regular_data?.value,
            type : payrollRegularMntStore.field?.type,
            field : payrollRegularMntStore.field?.value,
            mod_value : payrollRegularMntStore.mod_value,
            remarks : payrollRegularMntStore.remarks
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                payrollRegularMntStore.setErrorFields({
                    payroll_regular_data: field_errors.prd_id?.toString(), 
                    type: field_errors.type?.toString(), 
                    field: field_errors.field?.toString(), 
                    mod_value: field_errors.mod_value?.toString(), 
                    remarks: field_errors.remarks?.toString(),
                    non_field_errors: field_errors.non_field_errors?.toString(),
                });
            }
        })

    }


    return (
    <>

        <div className="col-md-5">
            <div className="card z-depth-0">
                <div className="card-header">
                    <h5>Maintenance / Changes</h5>
                    <div className="float-right">
                        <button onClick={ handleOpenCreatePayrollRegularMntModal }
                                className="btn btn-sm btn-success btn-outline-success icon-btn float-right">
                            <i className="icofont icofont-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="card-block pb-0">
                    <div className="table-responsive">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search .." 
                            value={ payrollRegularMntStore.query } 
                            onChange={ e => payrollRegularMntStore.handleSearch(e) }   
                            style={{ maxWidth:'40%' }}  
                        />
                        <table className="table table-sm table-hover mt-3">
                            <thead>
                                <tr>
                                    <th className="align-middle">Employee</th>
                                    <th className="align-middle"></th>
                                    <th className="align-middle"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { payrollRegularMntStore.list.map((val, key) => { 
                                    return (
                                        <tr key={key} className={ val.id == payrollRegularMntStore.selected_data ? "table-info" : "" }>
                                            <td className="align-middle">{ val.fullname }</td>
                                            <td className="align-middle">{ val.position }</td>
                                            <td className="align-middle">
                                                <a href="#">
                                                    <ins className="text-info">View Details</ins>
                                                </a>
                                            </td>
                                        </tr>
                                    ) 
                                }) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* Create Maintenance */}
        <div className="modal" id="payroll-regular-mnt-create-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Maintenance</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <PayrollRegularFormMntComp 
                            payrollRegularDataStore={payrollRegularDataStore}
                            payrollRegularMntStore={payrollRegularMntStore}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleCreatePayrollRegularMnt }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
                
    </>
    );

    
});


export default PayrollRegularMntDetails