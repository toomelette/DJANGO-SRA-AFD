import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class PayrollRegularMntStore{

    FIELD_OPTIONS = [
        { category:1, value:"station", label:"Station" },
        { category:1, value:"paygroup", label:"Paygroup" },
        { category:1, value:"fullname", label:"Fullname" },
        { category:1, value:"position", label:"Position" },
        { category:1, value:"salary_grade", label:"Salary Grade" },
        { category:1, value:"step_increment", label:"Step Increment" },
        { category:1, value:"monthly_salary", label:"Monthly Salary" },
        { category:1, value:"plantilla_item", label:"Plantilla Item" },
        { category:1, value:"status", label:"Status" },
        { category:1, value:"atm_account_no", label:"ATM Account No." },
        { category:1, value:"tin", label:"TIN" },
        { category:1, value:"gsis", label:"GSIS" },
        { category:1, value:"philhealth", label:"Philhealth" },
        { category:1, value:"pagibig", label:"Pagibig" },
        { category:1, value:"sss", label:"SSS" },
    ];

    CHAR_FORM_FIELDS = ["fullname","position","atm_account_no","tin","gsis","philhealth","pagibig","sss"]
    NUMERIC_FORM_FIELDS = ["salary_grade","step_increment","plantilla_item"]
    MONEYFORMAT_FORM_FIELDS = ["monthly_salary",]
    SELECT_FORM_FIELDS = ["station","paygroup","status"]

    PAYGROUP_OPTIONS = [
        { value:1, label:"Regular" },
        { value:2, label:"Pay with Check" },
        { value:3, label:"Actual" },
        { value:4, label:"COS" },
    ]

    STATUS_OPTIONS = [
        { value:1, label:"Regular" },
        { value:2, label:"COS" },
    ]

    station_options = [];
    param_options = [];

    //  list vars
    list = [];
    query = "";
	delaySearch = debounce(() => this.fetch(), 500);
    selected_data = "";
    is_opened_form = 0;

    // form vars
    payroll_regular_id = "";
    payroll_regular_data = { value:"", label:"Select" };
    payroll_regular_mnt_id = "";
    field = { category:null, value:"", label:"Select" };
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
        this.resetForm()
        axios.get('api/payroll_regular_mnt/' + id)
        .then((response) => {
            runInAction(() => {
                var mod_value = "";
                const payroll_regular_mnt = response.data;
                if(this.SELECT_FORM_FIELDS.includes(payroll_regular_mnt.field)){
                    switch (payroll_regular_mnt.field) {
                        case "paygroup":
                            mod_value = { 
                                value:Number(payroll_regular_mnt.mod_value), 
                                label: this.getPaygroupOptionsLabel(payroll_regular_mnt.mod_value) 
                            }
                            break;
                        case "station":
                            mod_value = { 
                                value:payroll_regular_mnt.mod_value, 
                                label: this.getStationOptionsLabel(payroll_regular_mnt.mod_value)
                            }
                            break;
                        case "status":
                            mod_value = { 
                                value:Number(payroll_regular_mnt.mod_value), 
                                label: this.getStatusOptionsLabel(payroll_regular_mnt.mod_value)
                            }
                            break;
                        default:
                            break;
                    }
                }else{
                    mod_value = payroll_regular_mnt.mod_value;
                }
                this.payroll_regular_mnt_id = payroll_regular_mnt.id;
                this.payroll_regular_data = { 
                    value: payroll_regular_mnt.payroll_regular_data.id, 
                    label: payroll_regular_mnt.payroll_regular_data.employee_no +" - "+ payroll_regular_mnt.payroll_regular_data.fullname 
                };
                this.field = this.param_options.find(data => data.value == payroll_regular_mnt.field);
                this.mod_value = mod_value;
                this.remarks = payroll_regular_mnt.remarks;
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
        runInAction(() => {
            this.param_options = [];
            this.param_options = [...this.FIELD_OPTIONS];
            axios.get('api/deduction/get_all')
            .then((response) => {
                response.data.map(data => {
                    this.param_options.push({category:2, value:data.code, label:data.code+" - "+data.name})
                }) 
            });
            axios.get('api/allowance/get_all')
            .then((response) => {
                response.data.map(data => {
                    this.param_options.push({category:3, value:data.code, label:data.code+" - "+data.name})
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

    getParamOptionsLabel(value){
        let param_options_obj = { type:"", value:"", label:"" }
        if(this.param_options){
            param_options_obj = this.param_options.find(data => data.value == value );
        }
        return param_options_obj?.label;
    }

    getPaygroupOptionsLabel(value){
        if(value){
            let pg_options_obj = this.PAYGROUP_OPTIONS.find(data => data.value == Number(value) );
            return pg_options_obj?.label;
        }else{
            return "";
        }
    }

    getStationOptionsLabel(value){
        let station_options_obj = { value:"", label:"" };
        if(this.station_options.length > 0){
            station_options_obj = this.station_options.find(data => data.value == value);
        }
        return station_options_obj?.label;
    }

    getStatusOptionsLabel(value){
        if(value){
            let status_options_obj = this.STATUS_OPTIONS.find(data => data.value == Number(value) );
            return status_options_obj?.label;
        }else{
            return "";
        }

    }


    // Form Setters
    resetForm(){
        this.payroll_regular_data = { value:"", label:"Select" };
        this.field = { category:null, value:"", label:"Select" };
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

    setPayrollRegularMntId(payroll_regular_mnt_id){
        this.payroll_regular_mnt_id = payroll_regular_mnt_id;
    }

    setField(field){
        this.mod_value = "";
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