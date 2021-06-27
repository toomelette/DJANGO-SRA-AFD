import React from 'react';
import moment from 'moment';
import { numberFormat } from '../../Utils/DataFilters'

export class PayrollRegularDataReport extends React.Component {

    

    render() {
      return (
        <div style={{ margin:40 }}>

          <div className="mb-4 text-center">
            <h5 className="m-0 p-0">Sugar Regulatory Administration</h5>
            <p className="m-0 p-0">Sugar Center Bldg., North Avenue, Diliman, Quezon City</p>
            <h5 className="m-0 p-0">MAINTENANCE PAYROLL</h5>
            {/* <p className="m-0 p-0">As of { moment(this.props.payrollRegularStore.process_date).format('MMMM, YYYY') }</p> */}
          </div>

          <table className="table table-xs" style={{ fontSize:'12px' }}>
            <thead>
              <tr>
                  <th className="p-1">Employee</th>
                  <th className="p-1">Field</th>
                  <th className="p-1">Description</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>TEST</td>
                    <td>TEST</td>
                    <td>TEST</td>
                </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }