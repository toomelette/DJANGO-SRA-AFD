

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'

import { numberFormat } from '../Utils/DataFilters'
import { TableFooterDefault } from '../Utils/Table/TableFooters'


const PayrollRegularContentDetails = observer(({ payrollRegularDataStore }) => {


    const handleClickContentDetails = (e, id) => {
        e.preventDefault()
        payrollRegularDataStore.setSelectedData(id)
        payrollRegularDataStore.retrieve(id)
        $("#payroll-regular-content-details").modal('toggle')
        console.log(payrollRegularDataStore.selected_data_details.payrollRegularDataDeduc_payrollRegularData)
    }


    return (
    <>
    
        <div className="col-md-7">
            <div className="card z-depth-0">
                <div className="card-header">
                    <h5>Content</h5>
                    <div className="float-right">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search .." 
                            value={ payrollRegularDataStore.query } 
                            onChange={ e => payrollRegularDataStore.handleSearch(e) } />
                    </div>
                </div>
                <div className="card-block pb-0">
                    <div className="table-responsive">
                        <table className="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th className="align-middle">Fullname</th>
                                    <th className="align-middle">Position</th>
                                    <th className="align-middle"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { payrollRegularDataStore.list.map((val, key) => { 
                                    return (
                                        <tr key={key} className={ val.id == payrollRegularDataStore.selected_data ? "table-info" : "" }>
                                            <td className="align-middle">{ val.fullname }</td>
                                            <td className="align-middle">{ val.position }</td>
                                            <td className="align-middle">
                                                <a href="#" onClick={ e => handleClickContentDetails(e, val.id) }>
                                                    <ins className="text-info">View Details</ins>
                                                </a>
                                            </td>
                                        </tr>
                                    ) 
                                }) }
                                { payrollRegularDataStore.list.length == 0 ?
                                    <tr>
                                        <td>
                                            <h4>No Data Encoded!</h4>
                                        </td>
                                    </tr> : <></> }
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
                                <h5>{ payrollRegularDataStore.selected_data_details.monthly_salary }</h5>
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

                            <div className="col-md-12 mt-4">

                                <div className="table-responsive">
                                    <table className="table table-sm table-hover">
                                        <thead>
                                            <tr>
                                                <th className="align-middle">Code</th>
                                                <th className="align-middle">Ammount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { payrollRegularDataStore.selected_data_details.payrollRegularDataDeduc_payrollRegularData.map((data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td className="align-middle">{ data.code }</td>
                                                        <td className="align-middle">{ numberFormat(data.ammount, 2) }</td>
                                                    </tr>
                                                )
                                            }) }
                                        </tbody>
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