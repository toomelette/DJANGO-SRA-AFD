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
    is_opened_form = 0;
    options = [];

    // form vars
    payroll_regular_id = "";
    form_data = {
        employee: { value:"", label:'Select' },
        fullname: '',
        station: { value:"", label:'Select' },
        position: '',
        paygroup: { value:0, label:'Select' },
        salary_grade: '',
        step_increment: '',
        monthly_salary: '',
        plantilla_item: '',
        status: { value:0, label:'Select' },
        atm_account_no: '',
        tin: '',
        gsis: '',
        philhealth: '',
        pagibig: '',
        sss: '',
        payrollRegularDataDeduc_payrollRegularData:[],
        payrollRegularDataAllow_payrollRegularData:[],
    };
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
        this.form_data = {};
        axios.get('api/payroll_regular_data/' + id)
        .then((response) => {
            runInAction(() => {
                this.form_data = response.data
                this.form_data.payrollRegularMnt_payrollRegularData.map(data_mnt => {

                    if(data_mnt.category === 2){
                        let deduc = this.form_data.payrollRegularDataDeduc_payrollRegularData.find(data_deduc=>{
                            return data_deduc.code === data_mnt.field
                        })
                        if(!deduc){
                            this.form_data.payrollRegularDataDeduc_payrollRegularData.push(
                                { code: data_mnt.field, amount: data_mnt.mod_value, name: data_mnt.field_description }
                            )
                        }
                        this.form_data.payrollRegularDataDeduc_payrollRegularData = this.form_data.payrollRegularDataDeduc_payrollRegularData.sort(
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
                        let allow = this.form_data.payrollRegularDataAllow_payrollRegularData.find(data_allow=>{
                            return data_allow.code === data_mnt.field
                        })
                        if(!allow){
                            this.form_data.payrollRegularDataAllow_payrollRegularData.push(
                                { code: data_mnt.field, amount: data_mnt.mod_value, name: data_mnt.field_description }
                            )
                        }
                        this.form_data.payrollRegularDataAllow_payrollRegularData = this.form_data.payrollRegularDataAllow_payrollRegularData.sort(
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
        if(this.form_data.payrollRegularMnt_payrollRegularData){
            const mnt = [...this.form_data.payrollRegularMnt_payrollRegularData]
            return mnt.find(data => data.field === field)
        }else{
            return null;
        }
        
    }


    // Form Setters
    resetForm(){
        this.form_data = {
            employee: { value:'', label:'Select' },
            fullname: '',
            station: { value:'', label:'Select' },
            position: '',
            paygroup: { value:0, label:'Select' },
            salary_grade: '',
            step_increment: '',
            monthly_salary: '',
            plantilla_item: '',
            status: { value:0, label:'Select' },
            atm_account_no: '',
            tin: '',
            gsis: '',
            philhealth: '',
            pagibig: '',
            sss: '',
            payrollRegularDataDeduc_payrollRegularData:[],
            payrollRegularDataAllow_payrollRegularData:[],
        };
        this.error_fields = {};
    }

    setPayrollRegularId(payroll_regular_id){
        this.payroll_regular_id = payroll_regular_id;
    }

    setFormData(value, field){
        switch (field) {
            case "employee":
                this.form_data.employee = value
                break;
            case "fullname":
                this.form_data.fullname = value
                break;
            case "station":
                this.form_data.station = value
                break;
            case "position":
                this.form_data.position = value
                break;
            case "paygroup":
                this.form_data.paygroup = value
                break;
            case "salary_grade":
                this.form_data.salary_grade = value
                break;
            case "step_increment":
                this.form_data.step_increment = value
                break;
            case "monthly_salary":
                this.form_data.monthly_salary = value
                break;
            case "plantilla_item":
                this.form_data.plantilla_item = value
                break;
            case "status":
                this.form_data.status = value
                break;
            case "atm_account_no":
                this.form_data.atm_account_no = value
                break;
            case "tin":
                this.form_data.tin = value
                break;
            case "gsis":
                this.form_data.gsis = value
                break;
            case "philhealth":
                this.form_data.philhealth = value
                break;
            case "pagibig":
                this.form_data.pagibig = value
                break;
            case "sss":
                this.form_data.sss = value
                break;
        default:
                break;
        }
    }

    addDeduction(){
        this.form_data.payrollRegularDataDeduc_payrollRegularData = [
            ...this.form_data.payrollRegularDataDeduc_payrollRegularData, { deduction:"", amount:"" }
        ]
    }

    modifyDeduction(index, name, value){
        const list = [...this.form_data.payrollRegularDataDeduc_payrollRegularData];
        list[index][name] = value;
        this.form_data.payrollRegularDataDeduc_payrollRegularData = list;
    }

    deleteDeduction(index){
        const list = [... this.form_data.payrollRegularDataDeduc_payrollRegularData];
        list.splice(index, 1);
        this.form_data.payrollRegularDataDeduc_payrollRegularData = list;
    }

    addAllowance(){
        this.form_data.payrollRegularDataAllow_payrollRegularData = [
            ...this.form_data.payrollRegularDataAllow_payrollRegularData, { allowance:"", amount:"" }
        ]
    }

    modifyAllowance(index, name, value){
        const list = [...this.form_data.payrollRegularDataAllow_payrollRegularData];
        list[index][name] = value;
        this.form_data.payrollRegularDataAllow_payrollRegularData = list;
    }

    deleteAllowance(index){
        const list = [... this.form_data.payrollRegularDataAllow_payrollRegularData];
        list.splice(index, 1);
        this.form_data.payrollRegularDataAllow_payrollRegularData = list;
    }

    setErrorFields(error_fields){
        this.error_fields = error_fields;
    }


}

const payrollRegularDataStore = new PayrollRegularDataStore()
export default payrollRegularDataStore