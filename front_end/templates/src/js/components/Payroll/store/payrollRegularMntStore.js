import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class PayrollRegularMntStore{

    FIELD_OPTIONS = [
        { type:1, value:"station", label:"Station" },
        { type:1, value:"paygroup", label:"Paygroup" },
        { type:1, value:"fullname", label:"Fullname" },
        { type:1, value:"position", label:"Position" },
        { type:1, value:"salary_grade", label:"Salary Grade" },
        { type:1, value:"step_increment", label:"Step Increment" },
        { type:1, value:"monthly_salary", label:"Monthly Salary" },
        { type:1, value:"plantilla_item", label:"Plantilla Item" },
        { type:1, value:"status", label:"Status" },
        { type:1, value:"atm_account_no", label:"ATM Account No." },
        { type:1, value:"tin", label:"TIN" },
        { type:1, value:"gsis", label:"GSIS" },
        { type:1, value:"philhealth", label:"Philhealth" },
        { type:1, value:"pagibig", label:"Pagibig" },
        { type:1, value:"sss", label:"SSS" },
    ];

    SELECT_FORM_FIELDS = ["station","paygroup","status"]
    CHAR_FORM_FIELDS = ["fullname","position","atm_account_no","tin","gsis","philhealth","pagibig","sss"]
    NUMERIC_FORM_FIELDS = ["salary_grade","step_increment","plantilla_item"]
    MONEYFORMAT_FORM_FIELDS = ["monthly_salary"]

    PAYGROUP_OPTIONS = [
        { value:1, label:"Regular" },
        { value:2, label:"Pay with Check" },
        { value:3, label:"Actual" },
        { value:4, label:"COS" },
    ]

    STATUS_OPTIONS = [
        { value:1, label:"Regular" },
        { value:2, label:"cos" },
    ]

    //  list vars
    list = [];
    query = "";
	delaySearch = debounce(() => this.fetch(), 500);
    selected_data = "";
    selected_data_details = {};
    is_opened_form = 0;
    param_options = [];
    station_options = [];

    // form vars
    payroll_regular_id = "";
    payroll_regular_data = { value:"", label:"Select" };
    field = { type:null, value:"", label:"Select" };
    mod_value = "";
    remarks = "";
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

    setParamOptions(){
        this.param_options = [];
        this.param_options = [...this.FIELD_OPTIONS];
        runInAction(() => {
            axios.get('api/deduction/get_all')
            .then((response) => {
                response.data.map(data => {
                    this.param_options.push({type:2, value:data.code, label:data.code+" - "+data.name})
                }) 
            });
            axios.get('api/allowance/get_all')
            .then((response) => {
                response.data.map(data => {
                    this.param_options.push({type:3, value:data.code, label:data.code+" - "+data.name})
                }) 
            });
        })
    }

    setStationOptions(){
        axios.get('api/station/get_all')
             .then((response) => {
                runInAction(() => {
                    let stations = response.data;
                    if(stations.length > 0){
                        stations.forEach(data => {
                            this.station_options.push({ value:data.station_id, label:data.name });
                        });
                    }
                })
        });
    }


    // Form Setters
    resetForm(){
        this.payroll_regular_id = "";
        this.payroll_regular_data = { value:"", label:"Select" };
        this.field = { type:null, value:"", label:"Select" };
        this.mod_value = "";
        this.remarks = "";
        this.error_fields = {};
    }

    setPayrollRegularId(payroll_regular_id){
        this.payroll_regular_id = payroll_regular_id;
    }

    setPayrollRegularData(payroll_regular_data){
        this.payroll_regular_data = payroll_regular_data;
    }

    setField(field){
        this.field = field;
    }

    setModValue(mod_value){
        this.mod_value = mod_value;
    }

    setRemarks(remarks){
        this.remarks = remarks;
    }

    setErrorFields(ef){
        this.error_fields = ef;
    }


}

const payrollRegularMntStore = new PayrollRegularMntStore()
export default payrollRegularMntStore