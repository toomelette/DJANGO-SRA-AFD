require('../../config')

import React from "react"
import { HashRouter, Switch, Route } from "react-router-dom"
import { observer } from 'mobx-react'

import PayrollRegular from './PayrollRegularListComp.js'
import PayrollRegularCreate from './PayrollRegularCreateComp.js'
import PayrollRegularDetails from './PayrollRegularDetailsComp.js'
import Deductions from './DeductionListComp.js'
import Allowances from './AllowanceListComp.js'
import NotFoundPage from '../ErrorPages/NotFoundPageComp'

import deductionStore from './store/deductionStore'
import allowanceStore from './store/allowanceStore'
import payrollRegularStore from './store/payrollRegularStore'
import payrollRegularDataStore from './store/payrollRegularDataStore'

const PayrollRegularMain = observer(({ employeeStore, dashboardMainStore }) => {

    return (
        <HashRouter>
            <Switch>

                {/* DEDUCTION LIST */}
                <Route exact path="/payroll/deductions">
                    { dashboardMainStore.checkIfSubrouteExist('payroll-deductions-manage-page') ? 
                        <Deductions deductionStore={deductionStore} dashboardMainStore={dashboardMainStore}/> 
                        : <NotFoundPage/> 
                    }
                </Route>

                {/* ALLOWANCE LIST */}
                <Route exact path="/payroll/allowance">
                    { dashboardMainStore.checkIfSubrouteExist('payroll-allowance-manage-page') ? 
                        <Allowances allowanceStore={allowanceStore} dashboardMainStore={dashboardMainStore}/> 
                        : <NotFoundPage/> 
                    }
                </Route>

                {/* PAYROLL Regular LIST */}
                <Route exact path="/payroll/payroll_regular">
                    { dashboardMainStore.checkIfSubrouteExist('payroll-payroll_regular-manage-page') ? 
                        <PayrollRegular payrollRegularStore={payrollRegularStore} dashboardMainStore={dashboardMainStore}/> 
                        : <NotFoundPage/> 
                    }
                </Route>

                {/* PAYROLL Regular CREATE */}
                <Route exact path="/payroll/payroll_regular/create">
                    { dashboardMainStore.checkIfSubrouteExist('payroll-payroll_regular-create') ? 
                        <PayrollRegularCreate payrollRegularStore={payrollRegularStore} employeeStore={employeeStore} dashboardMainStore={dashboardMainStore}/> 
                        : <NotFoundPage/>
                    }
                </Route>

                {/* PAYROLL Regular DETAILS */}
                <Route exact path="/payroll/payroll_regular/:payroll_regular_id">
                    { dashboardMainStore.checkIfSubrouteExist('payroll-payroll_regular-details-page') ? 
                        <PayrollRegularDetails 
                            payrollRegularStore={payrollRegularStore} 
                            payrollRegularDataStore={payrollRegularDataStore}
                            dashboardMainStore={dashboardMainStore}
                        /> : <NotFoundPage/> }
                </Route>
    
                {/* Page not found */}
                <Route exact path="/payroll/*">
                    <NotFoundPage/>
                </Route>

            </Switch>
        </HashRouter>

    )

})

export default PayrollRegularMain