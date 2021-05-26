import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class PayrollTemplateStore{

    //  list vars
    list = [];
    total_records = 0;
    query = "";
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 10;
    page_limit = 0;
	delaySearch = debounce(() => this.fetch(), 500);
    selected_template = "";
    is_opened_form = 0;

    // form vars
    template_id = "";
    name = "";
    description = "";
    process_date = "";
    template_data = [];
    error_fields = {};

    // form vars TEMPLATE CONTENT
    td_employee_id = "";



    constructor(){
        makeAutoObservable(this)
    }



    // Actions
    fetch(){
        axios.get('api/template', { 
            params: { 
                q: this.query, 
                page_size: this.page_size, 
                page: this.page_current, 
            }
        }).then((response) => {
            runInAction(() => {
                this.list = response.data.results
                this.total_records = response.data.count
                this.page_limit = Math.ceil(response.data.count / this.page_size);
            })
        });
    }

    retrieve(id){
        axios.get('api/template/' + id)
        .then((response) => {
            runInAction(() => {
                this.template_id = response.data.id;
                // this.code = response.data.code;
                // this.name = response.data.name;
                // this.description = response.data.description;
                this.elig_error_fields = {};
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

    handleRefreshClick(e){
        e.preventDefault()
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.page_size = 10;
        this.query = "";
        this.fetch();
    }

    handlePageSizeClick(e){
        e.preventDefault()
        if(e.target.value > 0){
            this.page_prev = 0;
            this.page_current = 1;
            this.page_next = 2;
            this.page_size = e.target.value;
            this.fetch();
        }
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

    setSelectedDeduction(id){
        this.selected_template = id;
    }



    // Form Setters
    resetForm(){
        this.template_id = "";
        this.name = "";
        this.description= "";
        this.process_date= "";
        this.error_fields= {};
    }

    setTemplateId(template_id){
        this.template_id = template_id;
    }

    setName(name){
        this.name = name;
    }

    setDescription(description){
        this.description = description;
    }

    setProcessDate(process_date){
        this.process_date = process_date;
    }

    setErrorFields(ef){
        this.error_fields = ef;
    }

    setTdEmployeeId(employee_id){
        this.td_employee_id = employee_id;
    }



}

const payrollTemplateStore = new PayrollTemplateStore()
export default payrollTemplateStore