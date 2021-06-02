import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class PayrollRegularMntStore{
    
    //  list vars
    list = [];
    query = "";
	delaySearch = debounce(() => this.fetch(), 500);
    selected_data = "";
    selected_data_details = {};
    is_opened_form = 0;

    // form vars
    payroll_regular_id = "";
    error_fields = {};


    constructor(){
        makeAutoObservable(this)
    }


    // Actions
    fetch(){
        axios.get('api/payroll_regular_mnt', { 
            params: { 
                q: this.query,
                pr_id: this.payroll_regular_id
            }
        }).then((response) => {
            runInAction(() => {
                this.list = response.data
            })
        });
    }

    retrieve(id){
        this.selected_data_details = {};
        axios.get('api/payroll_regular_mnt/' + id)
        .then((response) => {
            runInAction(() => {
                this.selected_data_details = response.data
            })
        });
    }   

    handleSearch(e){
        e.preventDefault()
        this.query = e.target.value;
        this.delaySearch();
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

const payrollRegularMntStore = new PayrollRegularMntStore()
export default payrollRegularMntStore