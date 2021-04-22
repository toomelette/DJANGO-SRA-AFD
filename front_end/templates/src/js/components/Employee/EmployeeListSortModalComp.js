

import React from 'react'
import { observer } from 'mobx-react'
import { SelectFilter } from '../Utils/Forms/FilterInputs'


const EmployeeListSortModal = observer(({ employeeStore }) => {

    
    const handleSortFieldChange = (values) => {
        employeeStore.setSortField(values)
    }


    const handleSortOrderChange = (values) => {
        employeeStore.setSortOrder(values)
    }


    const handleSortSubmit = (e) => {
        e.preventDefault()
        employeeStore.handleSortSubmit()
        $("#employee-sort-modal").modal('hide')
    }


    return (
        <div className="modal" id="employee-sort-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Sort Records</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group row">

                            <SelectFilter
                                divColumn="col-md-6"
                                name="sort_field"
                                label="Sort Field:"
                                value={ employeeStore.sort_field }
                                isDisabled={false}
                                options={ [
                                    {value : "", label : "Select"},
                                    {value : "employee_id", label : "Employee No."},
                                    {value : "firstname", label : "Firstname"},
                                    {value : "lastname", label : "Lastname"},
                                    {value : "position", label : "Position"},
                                    {value : "birthdate", label : "Birthdate"},
                                    {value : "no_of_children", label : "Number of Children"},
                                    {value : "weight", label : "Weight"},
                                    {value : "height", label : "Height"},
                                    {value : "salary_grade", label : "Salary Grade"},
                                    {value : "monthly_salary", label : "Monthly Salary"},
                                    {value : "firstday_gov", label : "Firstday in Government"},
                                    {value : "firstday_sra", label : "Firstday in SRA"},
                                    {value : "first_appointment", label : "First Appointment"},
                                    {value : "last_appointment", label : "Last Appointment"},
                                    {value : "last_step_increment", label : "Last Step Increment"},
                                    {value : "last_adjustment", label : "Last Adjustment"},
                                    {value : "last_promotion", label : "Last Promotion"},
                                    {value : "original_appointment", label : "Original Appointment"},
                                    {value : "adjustment_date", label : "Adjustment Date"},
                                ] }
                                onChange={ handleSortFieldChange }
                            />

                            <SelectFilter
                                divColumn="col-md-6"
                                name="sort_order"
                                label="Sort Order:"
                                value={employeeStore.sort_order}
                                isDisabled={false}
                                options={ [{value:"", label:"Select"}, {value:"asc", label:'Ascending'}, {value:"desc", label:'Descending'} ] }
                                onChange={ handleSortOrderChange }
                            />

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleSortSubmit }>Sort</button>
                    </div>
                </div>
            </div>
        </div>
    );

    
});


export default EmployeeListSortModal