

import React from 'react'
import { observer } from 'mobx-react'
import { InputText, DatePicker, RadioButton, SelectInput } from '../Utils/Forms/DefaultInputs'


const EmployeeFormAppointmentDetails = observer(({ employeeStore }) => {


    return (
        <div className="col-sm-12">
            <h4 className="sub-title">Appointment Details</h4>
            <div className="row">

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Firstname"
                    placeholder="Firstname"
                    errorField={ employeeStore.error_fields.firstname }
                    value={ employeeStore.firstname }
                    setter={ e => employeeStore.setFirstname(e.target.value) }
                />

                <DatePicker 
                    col="col-sm-3"
                    label="Date of Birth"
                    errorField={ employeeStore.error_fields.birthdate }
                    value={ employeeStore.birthdate }
                    setter={ e => employeeStore.setBirthdate(e.target.value) }
                />

                <RadioButton
                    col="col-sm-3"
                    label="Sex"
                    name="sex"
                    value={ employeeStore.sex }
                    options={ [{value:1, label:"Male"}, {value:2, label:"Female"}] }
                    onChange={ (e) => employeeStore.setSex(e.target.value) }
                    errorField={ employeeStore.error_fields.sex }
                />

                <SelectInput
                    col="col-md-3"
                    name="civil_status"
                    label="Civil Status:"
                    value={ employeeStore.civil_status }
                    isDisabled={ false }
                    options={ 
                        [
                            {value:"", label:"Select"}, 
                            {value:1, label:"Single"}, 
                            {value:2, label:"Married"}, 
                            {value:3, label:"Widow"} 
                        ] 
                    }
                    onChange={ (value) => employeeStore.setCivilStatus(value) }
                />
                
            </div>
        </div>
    );

    
});


export default EmployeeFormAppointmentDetails