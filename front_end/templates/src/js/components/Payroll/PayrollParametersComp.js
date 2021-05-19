

import React, { useEffect } from 'react'

import { observer } from 'mobx-react'
import { Link } from "react-router-dom"
import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'


const PayrollParameters = observer(({ payrollStore, dashboardMainStore }) => {

    useEffect(()=>{
        let is_mounted = true;
        if(is_mounted = true){
            payrollStore.fetchDeductions()
        }
        return () => { is_mounted = false; } 
    }, [])

    return (

    <div className="pcoded-content">

        <div className="page-header card">
            <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <i className="feather icon-user bg-c-blue"></i>
                        <div className="d-inline">
                            <h5>Payroll Parameters</h5>
                            <span>Manage Parameters which are related in generating payroll.</span>
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
                                Payroll Parameters
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

                            <div className="col-sm-6">
                                <div className="card z-depth-0">
                                    {/* Table Header */}
                                    <div className="card-header"> 

                                        <TableHeaderDefault
                                            searchInputValue={ payrollStore.deduction_query }
                                            searchInputHandler={ e => payrollStore.handleDeductionsSearch(e ) }
                                            filterButton={false}
                                            sortButton={false}
                                            deleteButton={false}
                                            createButton={false}
                                            entriesSelect={false}
                                            paginationPagePrev={ payrollStore.deduc_page_prev }
                                            paginationPageNext={ payrollStore.deduc_page_next }
                                            paginationPageLimit={ payrollStore.deduc_page_limit }
                                            paginationPrevClickHandler={ (e) => payrollStore.handleDeductionPaginationClick(e, payrollStore.deduc_page_prev) }
                                            paginationNextClickHandler={ (e) => payrollStore.handleDeductionPaginationClick(e, payrollStore.deduc_page_next) }
                                        /> 

                                    </div>

                                    {/* TABLE BODY */}
                                    <div className="card-block table-border-style pb-0 pt-0">
                                        <div className="table-responsive">
                                            <table className="table table-sm table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="align-middle">Code</th>
                                                        <th className="align-middle">Name</th>
                                                        <th className="align-middle">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { payrollStore.deduc_list.map((val, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td className="align-middle">{ val.code }</td>
                                                            <td className="align-middle">{ val.name }</td>
                                                            <td className="align-middle">

                                                            </td>
                                                        </tr>
                                                    )
                                                }) }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                    {/* Table Footer */}
                                    <div className="card-footer">
                                        <TableFooterDefault
                                            counterPageSize={ payrollStore.deduc_page_size }
                                            counterPageCurrent={ payrollStore.deduc_page_current }
                                            counterPageLimit={ payrollStore.deduc_page_limit }
                                            counterTotalRecords={ payrollStore.deduc_total_records }
                                            paginationPagePrev={ payrollStore.deduc_page_prev }
                                            paginationPageNext={ payrollStore.deduc_page_next }
                                            paginationPageLimit={ payrollStore.deduc_page_limit }
                                            paginationPrevClickHandler={ (e) => payrollStore.handleDeductionPaginationClick(e, payrollStore.deduc_page_prev) }
                                            paginationNextClickHandler={ (e) => payrollStore.handleDeductionPaginationClick(e, payrollStore.deduc_page_next) }  
                                        />
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


export default PayrollParameters