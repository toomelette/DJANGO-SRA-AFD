require('../../config')

import React from "react"
import { HashRouter, Switch, Route } from "react-router-dom"
import { observer } from 'mobx-react'

import PayrollTemplate from './PayrollTemplateListComp.js'
import PayrollTemplateCreate from './PayrollTemplateCreateComp.js'
import PayrollDeductions from './PayrollDeductionListComp.js'
import PayrollAllowances from './PayrollAllowanceListComp.js'
import NotFoundPage from '../ErrorPages/NotFoundPageComp'

import payrollTemplateStore from './store/payrollTemplateStore'
import payrollDeductionStore from './store/payrollDeductionStore'
import payrollAllowanceStore from './store/payrollAllowanceStore'

const PayrollMain = observer(({ payrollStore, employeeStore, dashboardMainStore }) => {

    return (
        <HashRouter>
            <Switch>

                {/* DEDUCTION LIST */}
                <Route exact path="/payroll/deductions">
                    { dashboardMainStore.checkIfSubrouteExist('payroll-deductions-manage-page') ? 
                        <PayrollDeductions payrollDeductionStore={payrollDeductionStore} dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/> }
                </Route>

                {/* ALLOWANCE LIST */}
                <Route exact path="/payroll/allowance">
                    { dashboardMainStore.checkIfSubrouteExist('payroll-allowance-manage-page') ? 
                        <PayrollAllowances payrollAllowanceStore={payrollAllowanceStore} dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/> }
                </Route>

                {/* TEMPLATE LIST */}
                <Route exact path="/payroll/templates">
                    { dashboardMainStore.checkIfSubrouteExist('payroll-template-manage-page') ? 
                        <PayrollTemplate payrollTemplateStore={payrollTemplateStore} dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/> }
                </Route>

                {/* TEMPLATE Create */}
                <Route exact path="/payroll/templates/create">
                    { dashboardMainStore.checkIfSubrouteExist('payroll-template-create') ?
                        <PayrollTemplateCreate payrollTemplateStore={payrollTemplateStore} employeeStore={employeeStore} dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/> }
                </Route>

                {/* CREATE */}
                {/* <Route exact path="/payroll/create">
                    { dashboardMainStore.checkIfSubrouteExist('payroll-create-page') ? 
                        <PayrollCreate payrollStore={payrollStore}/> : <NotFoundPage/> }
                </Route> */}

                {/* DETAILS */}
                {/* <Route exact path="/payroll/:payroll_id">
                    { dashboardMainStore.checkIfSubrouteExist('payroll-details-page') ? 
                        <PayrollDetails payrollStore={payrollStore} dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/> }
                </Route> */}
    
                {/* Page not found */}
                <Route exact path="/payroll/*">
                    <NotFoundPage/>
                </Route>

            </Switch>
        </HashRouter>

    )

})

export default PayrollMain