

import React from 'react'
import { observer } from 'mobx-react'
import { InputText } from '../Utils/Forms/DefaultInputs'


const PayrollDeductionForm = observer(({ payrollDeductionStore }) => {


    return (
        
    <div className="row">

        <InputText 
            col="col-sm-6"
            type="text"
            label="Code"
            placeholder="Code"
            errorField={ payrollDeductionStore.error_fields.code }
            value={ payrollDeductionStore.code }
            setter={ e => payrollDeductionStore.setCode(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Name"
            placeholder="Name"
            errorField={ payrollDeductionStore.error_fields.name }
            value={ payrollDeductionStore.name }
            setter={ e => payrollDeductionStore.setName(e.target.value) }
        />

        <InputText 
            col="col-sm-12"
            type="text"
            label="Description"
            placeholder="Description"
            errorField={ payrollDeductionStore.error_fields.description }
            value={ payrollDeductionStore.description }
            setter={ e => payrollDeductionStore.setDescription(e.target.value) }
        />


    </div>

);

    
});


export default PayrollDeductionForm