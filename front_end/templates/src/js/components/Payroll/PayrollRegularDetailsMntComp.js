

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom';
import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import PayrollRegularFormMntComp from './PayrollRegularFormMntComp'


const PayrollRegularMntDetails = observer(({ payrollRegularDataStore, payrollRegularMntStore }) => {

    const { payroll_regular_id } = useParams();
    const[page_loader, SetPageLoader] = useState(false);

    const handleOpenCreatePayrollRegularMntModal = (e) => {
        e.preventDefault()
        $("#payroll-regular-mnt-create-modal").modal("toggle")
    }


    const handleCreatePayrollRegularMnt = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        var mod_value = "";
        axios.post('api/payroll_regular_mnt/', {
            pr_id : payroll_regular_id,
            prd_id : payrollRegularMntStore.payroll_regular_data?.value,
            category : payrollRegularMntStore.field?.category,
            field : payrollRegularMntStore.field?.value,
            mod_value : payrollRegularMntStore.mod_value.toString(),
            remarks : payrollRegularMntStore.remarks
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Maintenance / Changes Successfully Created!", type: "inverse" 
            });
            payrollRegularMntStore.fetch()
            payrollRegularMntStore.resetForm()
            SetPageLoader(false);
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                payrollRegularMntStore.setErrorFields({
                    prd_id: field_errors.prd_id?.toString(),
                    category: field_errors.category?.toString(), 
                    field: field_errors.field?.toString(), 
                    mod_value: field_errors.mod_value?.toString(), 
                    remarks: field_errors.remarks?.toString(),
                    non_field_errors: field_errors.non_field_errors?.toString(),
                });
                SetPageLoader(false);
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
                                    <th className="align-middle">Changes</th>
                                </tr>
                            </thead>
                            <tbody>
                                { payrollRegularMntStore.list.map((val, key) => { 
                                    return (
                                        <tr key={key} className={ val.id == payrollRegularMntStore.selected_data ? "table-info" : "" }>
                                            <td className="align-middle">{ val.payroll_regular_data?.employee_no }</td>
                                            <td className="align-middle">{ val.field } - { val.mod_value }</td>
                                            {/* <td className="align-middle">
                                                <a href="#">
                                                    <ins className="text-info">View Details</ins>
                                                </a>
                                            </td> */}
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
                    <DivLoader type="Circles" loading={page_loader}/>
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