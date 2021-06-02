

import React, { useEffect } from 'react'
import { observer } from 'mobx-react'

import { numberFormat } from '../Utils/DataFilters'
import { TableFooterDefault } from '../Utils/Table/TableFooters'


const PayrollRegularContentDetails = observer(({ payrollRegularDataStore }) => {

    var total_deduc = 0;
    var total_allow = 0;

    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            payrollRegularDataStore.fetch()
        }
        return () => { is_mounted = false; } 
    },[])


    const handleClickContentDetails = (e, id) => {
        e.preventDefault()
        payrollRegularDataStore.setSelectedData(id)
        payrollRegularDataStore.retrieve(id)
        $("#payroll-regular-content-details").modal('toggle')
    }


    return (
    <>
    
        <div className="col-md-7">
            <div className="card z-depth-0">
                <div className="card-header">
                    <h5>Content</h5>
                    <div className="float-right">
                    </div>
                </div>
                <div className="card-block pb-0">
                    <div className="table-responsive">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search .." 
                            value={ payrollRegularDataStore.query } 
                            onChange={ e => payrollRegularDataStore.handleSearch(e) } 
                            style={{ maxWidth:'40%' }}    
                        />
                        <table className="table table-sm table-hover mt-3">
                            <thead>
                                <tr>
                                    <th className="align-middle">Employee</th>
                                    <th className="align-middle">Position</th>
                                    <th className="align-middle"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { payrollRegularDataStore.list.map((val, key) => { 
                                    return (
                                        <tr key={key} className={ val.id == payrollRegularDataStore.selected_data ? "table-info" : "" }>
                                            <td className="align-middle">{ val.employee_no } - { val.fullname }</td>
                                            <td className="align-middle">{ val.position }</td>
                                            <td className="align-middle">
                                                <a href="#" onClick={ e => handleClickContentDetails(e, val.id) }>
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
                <div className="card-footer">
                    <TableFooterDefault
                        counterPageSize={ payrollRegularDataStore.page_size }
                        counterPageCurrent={ payrollRegularDataStore.page_current }
                        counterPageLimit={ payrollRegularDataStore.page_limit }
                        counterTotalRecords={ payrollRegularDataStore.total_records }
                        paginationPagePrev={ payrollRegularDataStore.page_prev }
                        paginationPageNext={ payrollRegularDataStore.page_next }
                        paginationPageLimit={ payrollRegularDataStore.page_limit }
                        paginationPrevClickHandler={ (e) => payrollRegularDataStore.handlePaginationClick(e, payrollRegularDataStore.page_prev) }
                        paginationNextClickHandler={ (e) => payrollRegularDataStore.handlePaginationClick(e, payrollRegularDataStore.page_next) }  
                    />
                </div>
            </div>
        </div>

                                                                    
        {/* CONTENT DETAILS */}
        <div className="modal" id="payroll-regular-content-details" role="dialog">
            <div className="modal-dialog modal-lg" role="document" style={{ maxWidth:'1200px' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Content Details</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="row">

                            <div className="col-md-3">
                                <span> Employee No: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.employee_no }</h5>
                            </div>

                            <div className="col-md-3">
                                <span> Fullname: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.fullname }</h5>
                            </div>

                            <div className="col-md-3">
                                <span> Position: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.position }</h5>
                            </div>

                            <div className="col-md-3">
                                <span> Paygroup: {'\n'} </span>
                                <h5>
                                    { payrollRegularDataStore.selected_data_details.paygroup == 1 ? 
                                        "Pay with ATM" : "Pay with check"
                                    }
                                </h5>
                            </div>
                            
                            <div className="col-md-12 mt-4">{' '}</div>

                            <div className="col-md-3">
                                <span> Salary Grade: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.salary_grade }</h5>
                            </div>

                            <div className="col-md-3">
                                <span> Step Increment: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.step_increment }</h5>
                            </div>

                            <div className="col-md-3">
                                <span> Monthly Salary: {'\n'} </span>
                                <h5>{ numberFormat(payrollRegularDataStore.selected_data_details.monthly_salary, 2) }</h5>
                            </div>

                            <div className="col-md-3">
                                <span> Plantilla Item: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.plantilla_item }</h5>
                            </div>

                            <div className="col-md-12 mt-4">{' '}</div>

                            <div className="col-md-3">
                                <span> Status: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.status == 1 ? "Regular" : "COS" }</h5>
                            </div>

                            <div className="col-md-3">
                                <span> ATM Account No.: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.atm_account_no }</h5>
                            </div>

                            <div className="col-md-3">
                                <span> TIN: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.tin }</h5>
                            </div>

                            <div className="col-md-3">
                                <span> GSIS: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.gsis }</h5>
                            </div>

                            <div className="col-md-12 mt-4">{' '}</div>
                        
                            <div className="col-md-3">
                                <span> Philhealth: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.philhealth }</h5>
                            </div>

                            <div className="col-md-3">
                                <span> Pagibig: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.pagibig }</h5>
                            </div>

                            <div className="col-md-3">
                                <span> SSS: {'\n'} </span>
                                <h5>{ payrollRegularDataStore.selected_data_details.sss }</h5>
                            </div>

                            <div className="col-md-12 mt-4">{' '}</div>

                            <div className="col-md-6 mt-4">
                                <div className="table-responsive">
                                    <h5>Deductions</h5>
                                    <table className="table table-sm table-bordered table-hover mt-2">
                                        <thead>
                                            <tr>
                                                <th className="align-middle">Deduction Code</th>
                                                <th className="align-middle">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { payrollRegularDataStore.selected_data_details.payrollRegularDataDeduc_payrollRegularData ? 
                                                payrollRegularDataStore.selected_data_details.payrollRegularDataDeduc_payrollRegularData.map((data) => {
                                                    total_deduc+=Number(data.amount)
                                                    return (
                                                        <tr key={data.id}>
                                                            <td className="align-middle">
                                                                <span style={{ fontWeight:'bold' }}>({ data.code })</span> - { data.deduction?.name }
                                                            </td>
                                                            <td className="align-middle">{ numberFormat(data.amount, 2) }</td>
                                                        </tr>
                                                    )
                                                }) : 
                                                <tr>
                                                    <td className="align-middle">No Data!</td>
                                                </tr> 
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className="align-middle" style={{ fontWeight:'bold' }}>Total</td>
                                                <td className="align-middle" style={{ fontWeight:'bold' }}>{ numberFormat(total_deduc, 2) }</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            <div className="col-md-6 mt-4">
                                <div className="table-responsive">
                                    <h5>Allowances</h5>
                                    <table className="table table-sm table-bordered table-hover mt-2">
                                        <thead>
                                            <tr>
                                                <th className="align-middle">Allowance Code</th>
                                                <th className="align-middle">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { payrollRegularDataStore.selected_data_details.payrollRegularDataAllow_payrollRegularData ? 
                                                payrollRegularDataStore.selected_data_details.payrollRegularDataAllow_payrollRegularData.map((data) => {
                                                    total_allow+=Number(data.amount)
                                                    return (
                                                        <tr key={data.id}>
                                                            <td className="align-middle">
                                                                <span style={{ fontWeight:'bold' }}>({ data.code })</span> - { data.allowance?.name }
                                                            </td>
                                                            <td className="align-middle">{ numberFormat(data.amount, 2) }</td>
                                                        </tr>
                                                    )
                                                }) : 
                                                <tr>
                                                    <td className="align-middle">No Data!</td>
                                                </tr> 
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className="align-middle" style={{ fontWeight:'bold' }}>Total</td>
                                                <td className="align-middle" style={{ fontWeight:'bold' }}>{ numberFormat(total_allow, 2) }</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        
    </>
    );

    
});


export default PayrollRegularContentDetails