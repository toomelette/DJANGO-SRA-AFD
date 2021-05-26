

import React from 'react'
import { observer } from 'mobx-react'
import { InputText} from '../Utils/Forms/DefaultInputs'


const PayrollTemplateFormDetails = observer(({ payrollTemplateStore }) => {


    return (
        
    <div className="row">

        <InputText 
            col="col-sm-4"
            type="text"
            label="Name"
            placeholder="Name"
            errorField={ payrollTemplateStore.error_fields.name }
            value={ payrollTemplateStore.name }
            setter={ e => payrollTemplateStore.setName(e.target.value) }
        />

        <InputText 
            col="col-sm-8"
            type="text"
            label="Description"
            placeholder="Description"
            errorField={ payrollTemplateStore.error_fields.description }
            value={ payrollTemplateStore.description }
            setter={ e => payrollTemplateStore.setDescription(e.target.value) }
        />

    </div>

);

    
});


export default PayrollTemplateFormDetails