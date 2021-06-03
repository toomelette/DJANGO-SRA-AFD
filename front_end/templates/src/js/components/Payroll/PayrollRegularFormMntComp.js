

import React from 'react'
import { observer } from 'mobx-react'
import { InputText, SelectInput } from '../Utils/Forms/DefaultInputs'


const PayrollRegularFormMntComp = observer(({ payrollRegularDataStore, payrollRegularMntStore }) => {


    return (
            
        <div className="row">

            <SelectInput
                col="col-md-6"
                name="employee"
                label="Employee:"
                value={ payrollRegularMntStore.payroll_regular_data }
                isDisabled={ false }
                options={ payrollRegularDataStore.options }
                onChange={ (value) => payrollRegularMntStore.setPayrollRegularData(value) }
                errorField={ payrollRegularMntStore.error_fields.payroll_regular_data }
            />

            <SelectInput
                col="col-md-6"
                name="field"
                label="Field:"
                value={ payrollRegularMntStore.field }
                isDisabled={ false }
                options={ payrollRegularMntStore.param_options }
                onChange={ (value) => payrollRegularMntStore.setField(value) }
                errorField={ payrollRegularMntStore.error_fields.field }
            />

            <InputText 
                col="col-sm-6"
                type="text"
                label="Value:"
                placeholder="Value"
                errorField={ payrollRegularMntStore.error_fields.mod_value }
                value={ payrollRegularMntStore.mod_value }
                setter={ e => payrollRegularMntStore.setModValue(e.target.value) }
            />

            <InputText 
                col="col-sm-6"
                type="text"
                label="Remarks:"
                placeholder="Remarks"
                errorField={ payrollRegularMntStore.error_fields.remarks }
                value={ payrollRegularMntStore.remarks }
                setter={ e => payrollRegularMntStore.setRemarks(e.target.value) }
            />

        </div>
    );

    
});


export default PayrollRegularFormMntComp