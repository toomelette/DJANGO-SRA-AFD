import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class PayrollStore{

    // Deductions list vars
    deduc_list = [];
    deduc_total_records = 0;
    deduc_query = "";
    deduc_page_prev = 0;
    deduc_page_current = 1;
    deduc_page_next = 2;
    deduc_page_size = 10;
    deduc_page_limit = 0;
	deducDelaySearch = debounce(() => this.fetchDeductions(), 500);


    constructor(){
        makeAutoObservable(this)
    }


    // Deduction Actions
    fetchDeductions(){
        axios.get('api/deduction', { 
            params: { 
                q: this.deduc_query, 
                page_size: this.deduc_page_size, 
                page: this.deduc_page_current, 
            }
        }).then((response) => {
            runInAction(() => {
                this.deduc_list = response.data.results
                this.deduc_total_records = response.data.count
                this.deduc_page_limit = Math.ceil(response.data.count / this.deduc_page_size);
            })
        });
    }

    handleDeductionsSearch(e){
        e.preventDefault()
        this.deduc_page_prev = 0;
        this.deduc_page_current = 1;
        this.deduc_page_next = 2;
        this.deduc_query = e.target.value;
        this.deducDelaySearch();
    }

    handleDeductionPaginationClick(e, page_current){
        e.preventDefault()
        if(page_current > 0 && page_current <= this.deduc_page_limit){
            this.deduc_page_prev = page_current - 1;
            this.deduc_page_current = page_current;
            this.deduc_page_next = page_current + 1;
            this.fetchDeductions();
        }
    }



}

const payrollStore = new PayrollStore()
export default payrollStore