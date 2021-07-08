import React from 'react';
import {observer} from "mobx-react";
import { numberFormat } from '../../Utils/DataFilters'

@observer 
class PayrollRegularDataReport extends React.Component {

  count = 1;
  MAX_NET = 5000;

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

              let deduction_list = [];
              let allowance_list = [];
              let deduction_table_column = [];
              let allowance_table_column = [];
              let deduction_list_filtered = [];

              {/* let food_subsidy = 0; */}

              let fullname = data.fullname;
              let position = data.position;
              let employee_no = data.employee_no;
              let salary_grade = data.salary_grade;
              let step_increment = data.step_increment;

              let net = Number(data.monthly_salary);
              let first_half_pay = 0;
              let second_half_pay = 0;


              // Set Deductions list
              data.payrollRegularDataDeduc_payrollRegularData.map(data_deduc => {
                let mnt_obj = {};
                if(data.payrollRegularMnt_payrollRegularData){
                  mnt_obj = data.payrollRegularMnt_payrollRegularData.find(data => data.field === data_deduc.code)
                }
                if(Number(data_deduc.amount) > 0){
                  if(mnt_obj){
                    deduction_list.push({
                      code: data_deduc.code,
                      acronym: data_deduc.acronym,
                      amount: Number(mnt_obj.mod_value),
                      priority_seq: mnt_obj.deduc_priority_seq,
                      is_gsis: mnt_obj.deduc_is_gsis,
                    })
                  }else{
                    deduction_list.push({
                      code: data_deduc.code,
                      acronym: data_deduc.acronym,
                      amount: Number(data_deduc.amount),
                      priority_seq: data_deduc.priority_seq,
                      is_gsis: data_deduc.is_gsis,
                    })
                  }
                }
              })


              // Set Allowances list and allowance table
              data.payrollRegularDataAllow_payrollRegularData.map(data_allow => {
                let mnt_obj = {};
                if(data.payrollRegularMnt_payrollRegularData){
                  mnt_obj = data.payrollRegularMnt_payrollRegularData.find(data => data.field === data_allow.code)
                  {/* if(data_allow.code === "allow9"){
                    const mnt_obj_food_subsidy = data.payrollRegularMnt_payrollRegularData.find(data => data.field === data_allow.code)
                    food_subsidy = mnt_obj_food_subsidy ? Number(mnt_obj_food_subsidy.mod_value) : Number(data_allow.amount);
                  } */}
                }
                if(Number(data_allow.amount) > 0){
                  if(mnt_obj){
                    allowance_list.push({
                      code: data_allow.code,
                      acronym: data_allow.acronym,
                      amount: Number(data_allow.amount),
                      priority_seq: mnt_obj.deduc_priority_seq,
                    })
                    allowance_table_column.push(
                      <span key={data_allow.id}>
                        { data_allow.acronym } : { numberFormat(mnt_obj.mod_value, 2)}<br/>
                      </span> 
                    )
                  }else{
                    allowance_list.push({
                      code: data_allow.code,
                      acronym: data_allow.acronym,
                      amount: Number(data_allow.amount),
                      priority_seq: data_allow.priority_seq,
                    })
                    allowance_table_column.push(
                      <span key={data_allow.id}>
                        { data_allow.acronym } : { numberFormat(data_allow.amount, 2)}<br/>
                      </span> 
                    )
                  }
                }
              })


              // Sort declared arrays
              deduction_list.sort(
                function(a,b){
                  if(a.priority_seq > b.priority_seq) return 1;
                  if(a.priority_seq < b.priority_seq) return -1;
                  return 0;
                }
              )
              allowance_list.sort(
                function(a,b){
                  if(a.priority_seq > b.priority_seq) return 1;
                  if(a.priority_seq < b.priority_seq) return -1;
                  return 0;
                }
              )
              

              // Add Allowance to net 
              allowance_list.map(val_allow => {
                net += Number(val_allow.amount)
              } )
              
              console.log("monthly Salary: " + data.fullname)
              console.log("monthly Salary: " + data.monthly_salary)
              console.log("net: " + net)
              console.log("     ")
              console.log("     ")

              // Minus Deductions to net and Set filtered deduction list
              deduction_list.map(val_deduc => {
                if(val_deduc.is_gsis === 0 || val_deduc.is_gsis === null){
                  if((net - val_deduc.amount) > this.MAX_NET){
                    net -= val_deduc.amount;
                    deduction_list_filtered.push({
                      code: val_deduc.code,
                      acronym: val_deduc.acronym,
                      amount: Number(val_deduc.amount),
                      priority_seq: val_deduc.priority_seq,
                      is_gsis: val_deduc.deduc_is_gsis,
                    })
                  }else{
                    net = this.MAX_NET;
                    deduction_list_filtered.push({
                      code: val_deduc.code,
                      acronym: val_deduc.acronym,
                      amount: Number(this.MAX_NET - (net - val_deduc.amount)),
                      priority_seq: val_deduc.priority_seq,
                      is_gsis: val_deduc.deduc_is_gsis,
                    })
                  }
                }else{
                  if((net - val_deduc.amount) > this.MAX_NET){
                    net -= val_deduc.amount;
                    deduction_list_filtered.push({
                      code: val_deduc.code,
                      acronym: val_deduc.acronym,
                      amount: Number(val_deduc.amount),
                      priority_seq: val_deduc.priority_seq,
                      is_gsis: val_deduc.deduc_is_gsis,
                    })
                  }
                }
              })


              // Set deduction table
              deduction_list_filtered.map(val_fil_deduc => {
                deduction_table_column.push(
                  <div key={val_fil_deduc.code} style={{ width:"50%" }}>
                    { val_fil_deduc.acronym } : { numberFormat(val_fil_deduc.amount, 2)}
                  </div> 
                )
              })


              // calculate first half and second half pay
              let net_excess_dec = net % 1;
              let net_whole_num = net - net_excess_dec;
              let net_div_two = net_whole_num / 2;

              if(net_div_two % 1 > 0){
                first_half_pay = ((net_div_two - (net_div_two % 1)) + 1) + net_excess_dec;
                second_half_pay = (net_div_two - (net_div_two % 1));
              }else{
                first_half_pay = (net_div_two + net_excess_dec);
                second_half_pay = net_div_two;
              }
              

              // Set fields that exist in mnt 
              if(data.payrollRegularMnt_payrollRegularData){
                const mnt_obj_fullname = data.payrollRegularMnt_payrollRegularData.find(data => data.field === "fullname");
                const mnt_obj_position = data.payrollRegularMnt_payrollRegularData.find(data => data.field === "position");
                const mnt_obj_employee_no = data.payrollRegularMnt_payrollRegularData.find(data => data.field === "employee_no");
                const mnt_obj_salary_grade = data.payrollRegularMnt_payrollRegularData.find(data => data.field === "salary_grade");
                const mnt_obj_step_increment = data.payrollRegularMnt_payrollRegularData.find(data => data.field === "step_increment");
                if(mnt_obj_fullname){ fullname = mnt_obj_fullname.mod_value} 
                if(mnt_obj_position){ position = mnt_obj_position.mod_value} 
                if(mnt_obj_employee_no){ employee_no = mnt_obj_employee_no.mod_value} 
                if(mnt_obj_salary_grade){ salary_grade = mnt_obj_salary_grade.mod_value} 
                if(mnt_obj_step_increment){ step_increment = mnt_obj_step_increment.mod_value} 
              }


              return (
                <tr key={data.employee_no}>

                  <td className="p-2">{ this.count++ }</td>

                  <td className="p-2" style={{ maxWidth: 200, wordWrap:'break-word' }}>
                    <p>
                      { fullname }<br/>
                      { position }<br/>
                      { employee_no + " "} ({ salary_grade }, { step_increment })
                    </p>
                  </td> 

                  <td className="p-2">
                    { allowance_table_column }
                  </td>

                  <td className="p-2">
                    <div className="row ml-1">
                      { deduction_table_column }
                    </div>
                  </td>

                  <td className="p-2">
                    <>
                      <span className="mb-2">15TH: { numberFormat(first_half_pay, 2) }</span><br/>
                      <span className="mb-2">30TH: { numberFormat(second_half_pay, 2) }</span><br/>
                      <span className="mb-2">TOTAL: { numberFormat(net, 2) }</span>
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