

import React, { useEffect } from 'react'
import { observer } from 'mobx-react'


const PayrollRegularMntDetails = observer(({ payrollRegularMntStore }) => {

    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            payrollRegularMntStore.fetch()
        }
        return () => { is_mounted = false; } 
    },[])


    return (
    <>

        <div className="col-md-5">
            <div className="card z-depth-0">
                <div className="card-header">
                    <h5>Maintenance / Changes</h5>
                </div>
                <div className="card-block pb-0">
                    <div className="table-responsive">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search .." 
                            value={ payrollRegularMntStore.query } 
                            onChange={ e => payrollRegularMntStore.handleSearch(e) }   
                            style={{ maxWidth:'40%' }}  
                        />
                        <table className="table table-sm table-hover mt-3">
                            <thead>
                                <tr>
                                    <th className="align-middle">Employee</th>
                                    <th className="align-middle"></th>
                                    <th className="align-middle"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { payrollRegularMntStore.list.map((val, key) => { 
                                    return (
                                        <tr key={key} className={ val.id == payrollRegularMntStore.selected_data ? "table-info" : "" }>
                                            <td className="align-middle">{ val.fullname }</td>
                                            <td className="align-middle">{ val.position }</td>
                                            <td className="align-middle">
                                                <a href="#">
                                                    <ins className="text-info">View Details</ins>
                                                </a>
                                            </td>
                                        </tr>
                                    ) 
                                }) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
    </>
    );

    
});


export default PayrollRegularMntDetails