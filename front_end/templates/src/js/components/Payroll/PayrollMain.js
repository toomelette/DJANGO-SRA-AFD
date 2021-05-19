require('../../config')

import React from "react"
import { HashRouter, Switch, Route } from "react-router-dom"
import { observer } from 'mobx-react'

import PayrollParameters from './PayrollParametersComp.js'
import NotFoundPage from '../ErrorPages/NotFoundPageComp'

const PayrollMain = observer(({ payrollStore, dashboardMainStore }) => {

    return (
        <HashRouter>
            <Switch>

                {/* LIST */}
                <Route exact path="/payroll/parameters">
                    { dashboardMainStore.checkIfSubrouteExist('payroll-parameters-manage-page') ? 
                        <PayrollParameters payrollStore={payrollStore} dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/> }
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
                {/* <Route exact path="/payroll/*">
                    <NotFoundPage/>
                </Route> */}

            </Switch>
        </HashRouter>

    )

})

export default PayrollMain