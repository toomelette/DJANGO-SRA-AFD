import { debounce } from 'lodash'
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
                console
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