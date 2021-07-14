

import React from 'react'
import { observer } from 'mobx-react'
import { InputText, SelectInput } from '../Utils/Forms/DefaultInputs'


const DeductionForm = observer(({ deductionStore }) => {


    return (
        
    <div className="row">

        <InputText 
            col="col-sm-6"
            type="text"
            label="Code"
            placeholder="Code"
            errorField={ deductionStore.error_fields.code }
            value={ deductionStore.code }
            setter={ e => deductionStore.setCode(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Name"
            placeholder="Name"
            errorField={ deductionStore.error_fields.name }
            value={ deductionStore.name }
            setter={ e => deductionStore.setName(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Priority Sequence"
            placeholder="Priority Sequence"
            errorField={ deductionStore.error_fields.priority_seq }
            value={ deductionStore.priority_seq }
            setter={ e => deductionStore.setPrioritySeq(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Description"
            placeholder="Description"
            errorField={ deductionStore.error_fields.description }
            value={ deductionStore.description }
            setter={ e => deductionStore.setDescription(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Acronym"
            placeholder="Acronym"
            errorField={ deductionStore.error_fields.acronym }
            value={ deductionStore.acronym }
            setter={ e => deductionStore.setAcronym(e.target.value) }
        />

        <SelectInput
            col="col-md-6"
            name="is_gsis"
            label="Is GSIS:"
            value={ deductionStore.is_gsis }
            isDisabled={ false }
            options={ deductionStore.IS_GSIS_OPTIONS }
            onChange={ (value) => deductionStore.setIsGsis(value) }
            errorField={ deductionStore.error_fields.is_gsis }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Account Code:"
            placeholder="Account Code"
            errorField={ deductionStore.error_fields.account_code }
            value={ deductionStore.account_code }
            setter={ e => deductionStore.setAccountCode(e.target.value) }
        />

    </div>

);

    
});


export default DeductionForm