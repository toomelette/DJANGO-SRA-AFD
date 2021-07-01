import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class DeductionStore{

    //  list vars
    list = [];
    total_records = 0;
    query = "";
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 100;
    page_limit = 0;
	delaySearch = debounce(() => this.fetch(), 500);
    selected_deduction = "";
    is_opened_form = 0;

    // form vars
    deduction_id = "";
    code = "";
    name = "";
    description="";
    acronym="";
    priority_seq="";
    error_fields={};



    constructor(){
        makeAutoObservable(this)
    }



    // Actions
    fetch(){
        axios.get('api/deduction', { 
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
        axios.get('api/deduction/' + id)
        .then((response) => {
            runInAction(() => {
                this.deduction_id = response.data.id;
                this.code = response.data.code;
                this.name = response.data.name;
                this.description = response.data.description;
                this.acronym = response.data.acronym;
                this.priority_seq = response.data.priority_seq;
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
        this.selected_deduction = id;
    }



    // Form Setters
    resetForm(){
        this.deduction_id = "";
        this.code = "";
        this.name = "";
        this.description= "";
        this.acronym= "";
        this.priority_seq= "";
        this.error_fields= {};
    }

    setDeductionId(deduction_id){
        this.deduction_id = deduction_id;
    }

    setCode(code){
        this.code = code;
    }

    setName(name){
        this.name = name;
    }

    setDescription(description){
        this.description = description;
    }

    setAcronym(acronym){
        this.acronym = acronym;
    }

    setPrioritySeq(priority_seq){
        this.priority_seq = priority_seq;
    }

    setErrorFields(ef){
        this.error_fields = ef;
    }



}

const deductionStore = new DeductionStore()
export default deductionStore