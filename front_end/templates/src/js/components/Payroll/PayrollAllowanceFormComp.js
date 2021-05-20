

import React from 'react'
import { observer } from 'mobx-react'
import { InputText, InputNumeric } from '../Utils/Forms/DefaultInputs'


const PayrollAllowanceForm = observer(({ payrollAllowanceStore }) => {


    return (
        
    <div className="row">

        <InputText 
            col="col-sm-6"
            type="text"
            label="Code"
            placeholder="Code"
            errorField={ payrollAllowanceStore.error_fields.code }
            value={ payrollAllowanceStore.code }
            setter={ e => payrollAllowanceStore.setCode(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Name"
            placeholder="Name"
            errorField={ payrollAllowanceStore.error_fields.name }
            value={ payrollAllowanceStore.name }
            setter={ e => payrollAllowanceStore.setName(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Description"
            placeholder="Description"
            errorField={ payrollAllowanceStore.error_fields.description }
            value={ payrollAllowanceStore.description }
            setter={ e => payrollAllowanceStore.setDescription(e.target.value) }
        />
                
        <InputNumeric
            col="col-sm-6"
            label="Amount"
            placeholder="Amount"
            errorField={ payrollAllowanceStore.error_fields.amount }
            value={ payrollAllowanceStore.amount }
            setter={ values => payrollAllowanceStore.setAmount(values.value) }
        />


    </div>

);

    
});


export default PayrollAllowanceForm