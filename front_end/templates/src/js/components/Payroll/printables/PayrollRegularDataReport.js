import React from 'react';
import {observer} from "mobx-react";
import moment from 'moment';
import { numberFormat } from '../../Utils/DataFilters'

@observer 
class PayrollRegularDataReport extends React.Component {

  count = 1;

  render() {
    return (
      <div style={{ marginLeft:130, marginTop:40, marginBottom:40, marginRight:40 }}>

        <div className="mb-4 text-center">
          <h5 className="m-0 p-0">Sugar Regulatory Administration</h5>
          <p className="m-0 p-0">Sugar Center Bldg., North Avenue, Diliman, Quezon City</p>
          <h5 className="m-0 p-0">PAYROLL</h5>
          {/* <p className="m-0 p-0">As of { moment(this.props.payrollRegularStore.process_date).format('MMMM, YYYY') }</p> */}
        </div>

        <table className="table table-xs" style={{ fontSize:'12px' }}>
          <thead>
            <tr>
                <th className="p-2 align-middle">
                  <>SEQ <br/>NO.</>
                </th>
                <th className="p-2 align-middle" style={{ maxWidth: 200 }}>
                  <>EMPLOYEE</>
                </th>
                <th className="p-2 align-middle">
                  <>SALARY<br/>ALLOWANCE</>
                </th>
                <th className="p-2 align-middle">
                  <>SALARY<br/>DEDUCTIONS</>
                </th>
                <th className="p-2 align-middle">
                  <>AMOUNT<br/>RECEIVED</>
                </th>
                <th className="p-2 align-middle">
                  SIGNATURE
                </th>
            </tr>
          </thead>
          <tbody>
            { this.props.payrollRegularDataStore.filtered_list_all.map(data => {
              return (
                <tr key={data.employee_no}>
                  <td className="p-2">{ this.count++ }</td>
                  <td className="p-2" style={{ maxWidth: 200, wordWrap:'break-word' }}>
                    <p>
                      { data.fullname }<br/>
                      { data.position }<br/>
                      { data.employee_no + " "} ({ data.salary_grade }, { data.step_increment })
                    </p>
                  </td> 
                  <td className="p-2">
                    { data.payrollRegularDataAllow_payrollRegularData.map(data_allow => 
                      <span key={data_allow.id}>
                        { data_allow.acronym } : { numberFormat(data_allow.amount, 2)}<br/>
                      </span> ) 
                    }
                  </td>
                  <td className="p-2">
                    <div className="row ml-1">
                      { data.payrollRegularDataDeduc_payrollRegularData.map(data_deduc => 
                        <div key={data_deduc.id} style={{ width:"50%" }}>
                          { data_deduc.acronym } : { numberFormat(data_deduc.amount, 2)}
                        </div> 
                      )}
                    </div>
                  </td>
                  <td className="p-2">
                    <>
                      <span className="mb-2">15TH: amount</span><br/>
                      <span className="mb-2">30TH: amount</span>
                    </>
                  </td>
                  <td className="p-2">
                    <>
                      15TH: ____________________<br/>
                      30TH: ____________________
                    </>
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    );
  }

}

export { PayrollRegularDataReport };