

import React, {useEffect} from 'react'

import { observer } from 'mobx-react'


const EmployeeListFilterBadge = observer(({ employeeStore }) => {


    return (

        <div>
            Filters: {" "}
            { employeeStore.filter_is_active.value !== "" ? (
                <label className="badge badge-md badge-primary">
                    Is Active: { employeeStore.filter_is_active.value == 1 ? "active" : "inactive" }{" "}
                    <a onClick={ () => {
                            employeeStore.setFilterIsActive({value:"", label:"Select"})
                            employeeStore.fetch()
                        }
                    }>
                        <i className="fa fa-times"></i>
                    </a>
                </label>
            ) : <></>}
        </div>
    );

    
});


export default EmployeeListFilterBadge