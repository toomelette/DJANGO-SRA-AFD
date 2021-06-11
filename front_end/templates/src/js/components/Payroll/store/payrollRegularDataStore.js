import { debounce, stubString } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class PayrollRegularDataStore{
    
    //  list vars
    list = [];
    total_records = 0;
    query = "";
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 20;
    page_limit = 0;
	delaySearch = debounce(() => this.fetch(), 500);
    selected_data = "";
    selected_data_details = {};
    is_opened_form = 0;
    options = [];

    // form vars
    payroll_regular_id = "";
    error_fields = {};


    constructor(){
        makeAutoObservable(this)
    }


    // Actions
    fetch(){
        axios.get('api/payroll_regular_data', { 
            params: { 
                q: this.query,
                page_size: this.page_size,
                page: this.page_current,
                pr_id: this.payroll_regular_id
            }
        }).then((response) => {
            runInAction(() => {
                this.list = response.data.results
                this.total_records = response.data.count
                this.page_limit = Math.ceil(response.data.count / this.page_size);
            })
        });
    }

    getByPrId(){
        axios.get('api/payroll_regular_data/get_by_payroll_regular_id', { 
            params: { 
                pr_id: this.payroll_regular_id
            }
        }).then((response) => {
            runInAction(() => {
                var prd_options = []; 
                response.data.map(data => {
                    prd_options.push({ value:data.id, label:data.employee_no+" - "+data.fullname },)
                })
                this.options = prd_options;
            })
        });
    }

    retrieve(id){
        this.selected_data_details = {};
        axios.get('api/payroll_regular_data/' + id)
        .then((response) => {
            runInAction(() => {
                this.selected_data_details = response.data
                this.selected_data_details.payrollRegularMnt_payrollRegularData.map(data_mnt => {

                    if(data_mnt.category === 2){
                        let deduc = this.selected_data_details.payrollRegularDataDeduc_payrollRegularData.find(data_deduc=>{
                            return data_deduc.code === data_mnt.field
                        })
                        if(!deduc){
                            this.selected_data_details.payrollRegularDataDeduc_payrollRegularData.push(
                                { code: data_mnt.field, amount: data_mnt.mod_value, name: data_mnt.field_description }
                            )
                        }
                        this.selected_data_details.payrollRegularDataDeduc_payrollRegularData = this.selected_data_details.payrollRegularDataDeduc_payrollRegularData.sort(
                            function(a, b){
                                if ( Number(a.code.substring(1)) < Number(b.code.substring(1)) ){
                                    return -1;
                                }
                                if ( Number(a.code.substring(1)) > Number(b.code.substring(1)) ){
                                    return 1;
                                }
                                return 0;
                            }
                        )
                    }

                    if(data_mnt.category === 3){
                        let allow = this.selected_data_details.payrollRegularDataAllow_payrollRegularData.find(data_allow=>{
                            return data_allow.code === data_mnt.field
                        })
                        if(!allow){
                            this.selected_data_details.payrollRegularDataAllow_payrollRegularData.push(
                                { code: data_mnt.field, amount: data_mnt.mod_value, name: data_mnt.field_description }
                            )
                        }
                        this.selected_data_details.payrollRegularDataAllow_payrollRegularData = this.selected_data_details.payrollRegularDataAllow_payrollRegularData.sort(
                            function(a, b){
                                if ( Number(a.code.substring(5)) < Number(b.code.substring(5)) ){
                                    return -1;
                                }
                                if ( Number(a.code.substring(5)) > Number(b.code.substring(5)) ){
                                    return 1;
                                }
                                return 0;
                            }
                        )
                    }

                })
            })
        });
    }   

    handleSearch(e){
        e.preventDefault()
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.query = e.target.value;
        this.delaySearch();
    }

    handlePaginationClick(e, page_current){
        e.preventDefault()
        if(page_current > 0 && page_current <= this.page_limit){
            this.page_prev = page_current - 1;
            this.page_current = page_current;
            this.page_next = page_current + 1;
            this.fetch();
        }
    }



    // List Setters
    setIsOpenedForm(is_opened_form){
        this.is_opened_form = is_opened_form;
    }

    setSelectedData(id){
        this.selected_data = id;
    }


    getSelectedDataMaintenanceDetails(field){
        if(this.selected_data_details.payrollRegularMnt_payrollRegularData){
            const mnt = [...this.selected_data_details.payrollRegularMnt_payrollRegularData]
            return mnt.find(data => data.field === field)
        }else{
            return null;
        }
        
    }


    // Form Setters
    resetForm(){
        this.payroll_regular_id = "";
        this.error_fields = {};
    }

    setPayrollRegularId(payroll_regular_id){
        this.payroll_regular_id = payroll_regular_id;
    }

    setErrorFields(ef){
        this.error_fields = ef;
    }


}

const payrollRegularDataStore = new PayrollRegularDataStore()
export default payrollRegularDataStore