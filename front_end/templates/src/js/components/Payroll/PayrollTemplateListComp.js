

import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import { observer } from 'mobx-react'
import { Link, useHistory } from "react-router-dom"
import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'


const PayrollTemplateList = observer(({ payrollTemplateStore, dashboardMainStore }) => {

    const history = useHistory();
    const [page_loader, SetPageLoader] = useState(false);


    useEffect(()=>{
        let is_mounted = true;
        if(is_mounted = true){
            payrollTemplateStore.fetch()
        }
        return () => { is_mounted = false; } 
    }, [])


    const redirectToTemplateCreate = useCallback(() => {
        history.push('/payroll/templates/create'), [history]
    });


    const handleCreateButtonClick = (e) => {
        e.preventDefault();
        if(payrollTemplateStore.is_opened_form === 1){
            payrollTemplateStore.resetForm()
        }
        payrollTemplateStore.setIsOpenedForm(0)
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
                            <h5>Templates</h5>
                            <span>Manage Template which are related in generating payroll.</span>
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
                                Templates
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
                                            searchInputValue={ payrollTemplateStore.query }
                                            searchInputHandler={ e => payrollTemplateStore.handleSearch(e ) }
                                            refreshButtonClickHandler={ (e) => payrollTemplateStore.handleRefreshClick(e) }
                                            filterButton={false}
                                            sortButton={false}
                                            deleteButton={false}
                                            createButton={ dashboardMainStore.checkIfSubrouteExist('payroll-template-create') }
                                            createButtonClickHandler={ handleCreateButtonClick }
                                            entriesSelect={true}
                                            entriesSelectPageSize={ payrollTemplateStore.page_size }
                                            entriesSelectChangeHandler={ (e) => payrollTemplateStore.handlePageSizeClick(e) }
                                            paginationPagePrev={ payrollTemplateStore.page_prev }
                                            paginationPageNext={ payrollTemplateStore.page_next }
                                            paginationPageLimit={ payrollTemplateStore.page_limit }
                                            paginationPrevClickHandler={ (e) => payrollTemplateStore.handlePaginationClick(e, payrollTemplateStore.page_prev) }
                                            paginationNextClickHandler={ (e) => payrollTemplateStore.handlePaginationClick(e, payrollTemplateStore.page_next) }
                                        /> 
                                    </div>

                                    {/* TABLE BODY */}
                                    <div className="card-block table-border-style pb-0 pt-0">
                                        <div className="table-responsive">
                                            <table className="table table-sm table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="align-middle">Name</th>
                                                        <th className="align-middle">Description</th>
                                                        <th className="align-middle">Last Generated Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { payrollTemplateStore.list.map((val, key) => {
                                                return (
                                                    <tr key={key} className={ val.id == payrollTemplateStore.selected_template ? "table-info" : "" }>
                                                        <td className="align-middle">{ val.name }</td>
                                                        <td className="align-middle">{ val.description }</td>
                                                        <td className="align-middle">{ moment(val.process_date).format("MMM D, YYYY") }</td>
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
                                            counterPageSize={ payrollTemplateStore.page_size }
                                            counterPageCurrent={ payrollTemplateStore.page_current }
                                            counterPageLimit={ payrollTemplateStore.page_limit }
                                            counterTotalRecords={ payrollTemplateStore.total_records }
                                            paginationPagePrev={ payrollTemplateStore.page_prev }
                                            paginationPageNext={ payrollTemplateStore.page_next }
                                            paginationPageLimit={ payrollTemplateStore.page_limit }
                                            paginationPrevClickHandler={ (e) => payrollTemplateStore.handlePaginationClick(e, payrollTemplateStore.page_prev) }
                                            paginationNextClickHandler={ (e) => payrollTemplateStore.handlePaginationClick(e, payrollTemplateStore.page_next) }  
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


export default PayrollTemplateList