import React from 'react';

export class PayrollRegularMntReport extends React.Component {

    render() {
      return (
        <table>
          <thead>
            <tr>
                <th>Employee No.</th>
                <th>Field</th>
                <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            { this.props.payrollRegularMntStore.list.map(data => {
                return (
                    <tr>
                        <td>{ data.payroll_regular_data.employee_no }</td>
                        <td>{ data.field }</td>
                        <td>{ data.mod_value }</td>
                    </tr>
                )
            })
            }
          </tbody>
        </table>
      );
    }

  }