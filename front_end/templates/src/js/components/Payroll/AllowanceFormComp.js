

import React from 'react'
import { observer } from 'mobx-react'
import { InputText } from '../Utils/Forms/DefaultInputs'


const PayrollRegularAllowanceForm = observer(({ allowanceStore }) => {


    return (
        
    <div className="row">

        <InputText 
            col="col-sm-6"
            type="text"
            label="Code"
            placeholder="Code"
            errorField={ allowanceStore.error_fields.code }
            value={ allowanceStore.code }
            setter={ e => allowanceStore.setCode(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Name"
            placeholder="Name"
            errorField={ allowanceStore.error_fields.name }
            value={ allowanceStore.name }
            setter={ e => allowanceStore.setName(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Description"
            placeholder="Description"
            errorField={ allowanceStore.error_fields.description }
            value={ allowanceStore.description }
            setter={ e => allowanceStore.setDescription(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Acronym"
            placeholder="Acronym"
            errorField={ allowanceStore.error_fields.acronym }
            value={ allowanceStore.acronym }
            setter={ e => allowanceStore.setAcronym(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Account Code"
            placeholder="Account Code"
            errorField={ allowanceStore.error_fields.account_code }
            value={ allowanceStore.account_code }
            setter={ e => allowanceStore.setAccountCode(e.target.value) }
        />


    </div>

);

    
});


export default PayrollRegularAllowanceForm