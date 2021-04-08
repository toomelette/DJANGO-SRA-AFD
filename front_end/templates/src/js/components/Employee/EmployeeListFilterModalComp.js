

import React from 'react'

import { observer } from 'mobx-react'

import eventBus from '../Utils/EventBus'
import { SelectFilter } from '../Utils/Forms/FilterInputs'


const EmployeeListFilterModal = observer(({ employeeStore }) => {


    const handleIsActiveSelectChange = (value) => {
        employeeStore.setFilterIsActive(value)
    }


    const handleFilterSubmit = (e) => {
        e.preventDefault()
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: true, is_dashboard: true })
        employeeStore.handleFilterSubmit()
        $("#employee-filter-modal").modal('hide')
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: true })
    }


    return (

        <div className="modal" id="employee-filter-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Filter Records</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-group row">

                            <SelectFilter
                                divColumn="col-md-6"
                                name="filter_is_active"
                                label="Active Status:"
                                value={ employeeStore.filter_is_active }
                                isDisabled={false}
                                options={ [{value:"", label:"Select"}, {value:1, label:'Active'}, {value:0, label:'Inactive'} ] }
                                onChange={ handleIsActiveSelectChange }
                            />
                            
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleFilterSubmit }>Filter</button>
                    </div>

                </div>
            </div>
        </div>
    );

    
});


export default EmployeeListFilterModal