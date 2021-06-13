import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { SelectInput, InputText } from '../Utils/Forms/DefaultInputs'
import employeeStore from '../Employee/store/EmployeeStore'


const PayrollRegularFormContent = observer(({ payrollRegularDataStore }) => {

    useEffect( data => { 

        let is_mounted = true;
        if(is_mounted = true){
            employeeStore.getAll()
        }
        return () => { is_mounted = false; } 

    }, [])


    const handleSelectEmployeeChange = (value) => {

        payrollRegularDataStore.setFormData(value, "employee_id")

        axios.get('api/employee/' + value.value)
        .then((response) => {
            payrollRegularDataStore.setFormData(response.data.fullname, "fullname")
        });

    }


    return (
        
    <div className="row">

        <SelectInput
            col="col-md-3"
            name="employee"
            label="Employee:"
            value={ payrollRegularDataStore.form_data.employee_id }
            isDisabled={ false }
            options={ employeeStore.employee_options }
            onChange={ (value) => handleSelectEmployeeChange(value) }
            errorField={ payrollRegularDataStore.error_fields.employee_id }
        />

        <InputText 
            col="col-sm-3"
            type="text"
            label="Fullname"
            placeholder="Fullname"
            value={ payrollRegularDataStore.form_data.fullname }
            setter={ e => payrollRegularDataStore.setFormData(e.target.value, "fullname") }
            errorField={ payrollRegularDataStore.error_fields.fullname }
        />

    </div>

    );

    
});


export default PayrollRegularFormContent