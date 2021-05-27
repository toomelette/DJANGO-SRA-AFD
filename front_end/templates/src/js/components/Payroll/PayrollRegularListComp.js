

import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import { observer } from 'mobx-react'
import { Link, useHistory } from "react-router-dom"
import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'


const PayrollRegularList = observer(({ payrollRegularStore, dashboardMainStore }) => {

    const history = useHistory();
    const [page_loader, SetPageLoader] = useState(false);


    useEffect(()=>{
        let is_mounted = true;
        if(is_mounted = true){
            payrollRegularStore.fetch()
        }
        return () => { is_mounted = false; } 
    }, [])


    const redirectToTemplateCreate = useCallback(() => {
        history.push('/payroll/payroll_regular/create'), [history]
    });


    const handleCreateButtonClick = (e) => {
        e.preventDefault();
        if(payrollRegularStore.is_opened_form === 1){
            payrollRegularStore.resetForm()
        }
        payrollRegularStore.setIsOpenedForm(0)
        redirectToTemplateCreate()
    }

    return (

    <div className="pcoded-content">

        <div className="page-header card">
            <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <i className="feather icon-user bg-c-blue"></i>
                        <div className="d-inline">
                            <h5>Payroll Regular</h5>
                            <span>Manage / Generate Regular Monthly Payroll.</span>
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
                                Payroll Regular
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
                                <div className="card z-depth-0">

                                    {/* Table Header */}
                                    <div className="card-header"> 
                                        <TableHeaderDefault
                                            searchInputValue={ payrollRegularStore.query }
                                            searchInputHandler={ e => payrollRegularStore.handleSearch(e ) }
                                            refreshButtonClickHandler={ (e) => payrollRegularStore.handleRefreshClick(e) }
                                            filterButton={false}
                                            sortButton={false}
                                            deleteButton={false}
                                            createButton={ dashboardMainStore.checkIfSubrouteExist('payroll-payroll_regular-create') }
                                            createButtonClickHandler={ handleCreateButtonClick }
                                            entriesSelect={true}
                                            entriesSelectPageSize={ payrollRegularStore.page_size }
                                            entriesSelectChangeHandler={ (e) => payrollRegularStore.handlePageSizeClick(e) }
                                            paginationPagePrev={ payrollRegularStore.page_prev }
                                            paginationPageNext={ payrollRegularStore.page_next }
                                            paginationPageLimit={ payrollRegularStore.page_limit }
                                            paginationPrevClickHandler={ (e) => payrollRegularStore.handlePaginationClick(e, payrollRegularStore.page_prev) }
                                            paginationNextClickHandler={ (e) => payrollRegularStore.handlePaginationClick(e, payrollRegularStore.page_next) }
                                        /> 
                                    </div>

                                    {/* TABLE BODY */}
                                    <div className="card-block table-border-style pb-0 pt-0">
                                        <div className="table-responsive">
                                            <table className="table table-sm table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="align-middle">Date</th>
                                                        <th className="align-middle">Description</th>
                                                        <th className="align-middle">Remarks</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { payrollRegularStore.list.map((val, key) => {
                                                    return (
                                                        <tr key={key} className={ val.id == payrollRegularStore.selected_data ? "table-info" : "" }>
                                                            <td className="align-middle">{ val.name }</td>
                                                            <td className="align-middle">{ val.description }</td>
                                                            <td className="align-middle">{ moment(val.process_date).format("MMM D, YYYY") }</td>
                                                        </tr>
                                                    )
                                                }) }
                                                { payrollRegularStore.list.length == 0 ? 
                                                    <tr>
                                                        <td className="align-middle">No Data Encoded!!</td>
                                                    </tr> : <></>
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Table Footer */}
                                    <div className="card-footer">
                                        <TableFooterDefault
                                            counterPageSize={ payrollRegularStore.page_size }
                                            counterPageCurrent={ payrollRegularStore.page_current }
                                            counterPageLimit={ payrollRegularStore.page_limit }
                                            counterTotalRecords={ payrollRegularStore.total_records }
                                            paginationPagePrev={ payrollRegularStore.page_prev }
                                            paginationPageNext={ payrollRegularStore.page_next }
                                            paginationPageLimit={ payrollRegularStore.page_limit }
                                            paginationPrevClickHandler={ (e) => payrollRegularStore.handlePaginationClick(e, payrollRegularStore.page_prev) }
                                            paginationNextClickHandler={ (e) => payrollRegularStore.handlePaginationClick(e, payrollRegularStore.page_next) }  
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


export default PayrollRegularList