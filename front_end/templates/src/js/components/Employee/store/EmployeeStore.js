
import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class EmployeeStore{

    // Constants
    SEX_OPTIONS = [
        { value:0, label:"Select" },
        { value:1, label:"Male" },
        { value:2, label:"Female" },
    ]
    CIVIL_STATUS_OPTIONS = [
        { value:0, label:"Select" },
        { value:1, label:"Single" },
        { value:2, label:"Married" },
        { value:3, label:"Widow" },
    ]
    APPLICATION_STATUS_OPTIONS = [
        { value:0, label:"Select" },
        { value:1, label:"Permanent" },
        { value:2, label:"Contract of Service" },
    ]
    LEVEL_OPTIONS = [
        { value:0, label:"Select" },
        { value:1, label:"First" },
        { value:2, label:"Second" },
        { value:3, label:"RA1080" },
    ]

    // List
    list = [];
    total_records = 0;
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 10;
    page_limit = 0;
    query = "";
    filter_is_active = { value:"", label:"Select" };
    filter_station = { value:"", label:"Select" };
    filter_sex = { value:"", label:"Select" };
    filter_civil_status = { value:"", label:"Select" };
    filter_application_status = { value:"", label:"Select" };
    filter_level = { value:"", label:"Select" };
    filter_fd_gov_from = "";
    filter_fd_gov_to = "";
    filter_fd_sra_from = "";
    filter_fd_sra_to = "";
    filter_first_appt_from = "";
    filter_first_appt_to = "";
    filter_last_appt_from = "";
    filter_last_appt_to = "";
    filter_last_si_from = "";
    filter_last_si_to = "";
    filter_last_adj_from = "";
    filter_last_adj_to = "";
    filter_last_prom_from = "";
    filter_last_prom_to = "";
    sort_field = "";
    sort_order = "";

	delaySearch = debounce(() => this.fetch(), 500);
    selected_employee = 0;
    is_opened_form = 0;
    is_selected_all_rows = false;
    selected_rows = [];
    station_options = [ { value:"", label:"Select" } ];
    // plantilla_options = [ { value:"", label:"Select" } ];

    // FORM
    // - Personal Details
    firstname = "";
    middlename = "";
    lastname = "";
    suffixname = "";
    address_present = "";
    address_permanent = "";
    birthdate = "";
    place_of_birth = "";
    sex = 0;
    civil_status = { value:0, label:"Select" };
    tel_no = "";
    cell_no = "";
    email_address = "";
    spouse_name = "";
    spouse_occupation = "";
    no_of_children = "";
    height = "";
    weight = "";
    religion = "";
    blood_type = "";
    // - Appointment Details
    employee_id = "";
    position = "";
    is_active = null;
    // station = { value:"", label:"Select" };
    // plantilla_item = { value:"", label:"Select" };
    salary_grade = "";
    step_increment = "";
    application_status = 0;
    tax_status = "";
    monthly_salary = "";
    firstday_gov = "";
    firstday_sra = "";
    first_appointment = "";
    last_appointment = "";
    last_step_increment = "";
    last_adjustment = "";
    last_promotion = "";
    original_appointment = "";
    adjustment_date = "";
    tin = "";
    gsis = "";
    philhealth = "";
    pagibig = "";
    sss = "";
    // - Error Fields
    error_fields = {};


    constructor(){
        makeAutoObservable(this)
    }


    fetch(){
        this.is_selected_all_rows = false;
        this.selected_rows = [];
        axios.get('api/employee', { 
            params: { 
                q: this.query, 
                ia: this.filter_is_active.value, 
                st: this.filter_station.value, 
                se: this.filter_sex.value, 
                cs: this.filter_civil_status.value,
                as: this.filter_application_status.value,
                l: this.filter_level.value, 
                fd_g_f: this.filter_fd_gov_from, 
                fd_g_t: this.filter_fd_gov_to, 
                fd_s_f: this.filter_fd_sra_from, 
                fd_s_t: this.filter_fd_sra_to, 
                f_appt_f: this.filter_first_appt_from,
                f_appt_t: this.filter_first_appt_to,
                l_appt_f: this.filter_last_appt_from,
                l_appt_t: this.filter_last_appt_to,
                l_si_f: this.filter_last_si_from,
                l_si_t: this.filter_last_si_to,
                l_adj_f: this.filter_last_adj_from,
                l_adj_t: this.filter_last_adj_to,
                l_prom_f: this.filter_last_prom_from,
                l_prom_t: this.filter_last_prom_to,
                page_size: this.page_size, 
                page: this.page_current, 
                sort_field: this.sort_field.value,
                sort_order: this.sort_order.value, 
            }
        }).then((response) => {
            runInAction(() => {
                const employees = response.data.results;
                let array = [];
                this.list = employees
                this.total_records = response.data.count
                this.page_limit = Math.ceil(response.data.count / this.page_size);
                employees.forEach(data => array.push({id:data.id, status:false}))
                this.selected_rows = array;
            })
        });
    }

    // retrieve(id){
    //     axios.get('api/employee/' + id)
    //     .then((response) => {
    //         runInAction(() => {
    //             const res_subemployees = response.data.subemployee_employee;
    //             let subemployees = [];
    //             this.category = response.data.category
    //             this.name = response.data.name
    //             this.is_menu = response.data.is_menu
    //             this.is_dropdown = response.data.is_dropdown
    //             this.nav_name = response.data.nav_name
    //             this.icon= response.data.icon
    //             this.url = response.data.url
    //             this.url_name = response.data.url_name
    //             // Set Subemployees
    //             res_subemployees.forEach(data => {
    //                 subemployees.push({
    //                     id: data.id,
    //                     is_nav: data.is_nav, 
    //                     name: data.name, 
    //                     nav_name: data.nav_name, 
    //                     url: data.url, 
    //                     url_name: data.url_name, 
    //                     is_from_query: true, 
    //                 })
    //             });
    //             this.subemployees = subemployees;
    //             this.error_fields = {};
    //         })
    //     });
    // }

    
    // List Setters
    setFilterIsActive(is_active){
        console.log(is_active)
        this.filter_is_active = is_active;
    }

    setFilterStation(station){
        this.filter_station = station;
    }

    setFilterSex(sex){
        this.filter_sex = sex;
    }

    setFilterCivilStatus(civil_status){
        this.filter_civil_status = civil_status;
    }

    setFilterApplicationStatus(application_status){
        this.filter_application_status = application_status;
    }

    setFilterLevel(level){
        this.filter_level = level;
    }

    setFilterFdGovFrom(from){
        this.filter_fd_gov_from = from;
    }

    setFilterFdGovTo(to){
        this.filter_fd_gov_to = to;
    }

    setFilterFdSRAFrom(from){
        this.filter_fd_sra_from = from;
    }

    setFilterFdSRATo(to){
        this.filter_fd_sra_to = to;
    }

    setFilterFirstApptFrom(from){
        this.filter_first_appt_from = from;
    }

    setFilterFirstApptTo(to){
        this.filter_first_appt_to = to;
    }

    setFilterLastApptFrom(from){
        this.filter_last_appt_from = from;
    }

    setFilterLastApptTo(to){
        this.filter_last_appt_to = to;
    }

    setFilterLastSiFrom(from){
        this.filter_last_si_from = from;
    }

    setFilterLastSiTo(to){
        this.filter_last_si_to = to;
    }

    setFilterLastAdjFrom(from){
        this.filter_last_adj_from = from;
    }

    setFilterLastAdjTo(to){
        this.filter_last_adj_to = to;
    }

    setFilterLastPromFrom(from){
        this.filter_last_prom_from = from;
    }

    setFilterLastPromTo(to){
        this.filter_last_prom_to = to;
    }

    setSortField(sort_field){
        this.sort_field = sort_field;
    }

    setSortOrder(sort_order){
        this.sort_order = sort_order;
    }

    setSelectedEmployee(selected_employee){
        this.selected_employee = selected_employee;
    }

    setIsOpenedForm(is_opened_form){
        this.is_opened_form = is_opened_form;
    }

    setIsSelectedAllRows(bool){
        this.is_selected_all_rows = bool;
        this.selected_rows.map(data => {
            this.setSelectedRowObject(bool, data.id)
        })
    }

    setSelectedRowObject(status, id){
        let obj_index = this.selected_rows.findIndex(data => data.id === id)
        this.selected_rows[obj_index].status = status;
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

    // setPlantillaOptions(station){

    //     if(station){
    //         axios.get('api/plantilla/get_all_open_by_station', {
    //                 params:{ 
    //                     s:station
    //                 }
    //              })
    //              .then((response) => {
    //                 runInAction(() => {
    //                     let plantillas = response.data;
    //                     this.plantilla_options = [{ value:"", label:"Select" }];
    //                     if(plantillas.length > 0){
    //                         plantillas.forEach(data => {
    //                             this.plantilla_options.push({ 
    //                                 value:data.plantilla_id.toString(), 
    //                                 label:"#"+data.plantilla_id+" | "+data.position
    //                             });
    //                         });
    //                     }
    //                 })
    //         });
    //     }
        
    // }


    // Form Setters
    resetForm(){
        this.firstname = "";
        this.middlename = "";
        this.lastname = "";
        this.suffixname = "";
        this.address_present = "";
        this.address_permanent = "";
        this.birthdate = "";
        this.place_of_birth = "";
        this.sex = 0;
        this.civil_status = { value:0, label:"Select" };
        this.tel_no = "";
        this.cell_no = "";
        this.email_address = "";
        this.spouse_name = "";
        this.spouse_occupation = "";
        this.no_of_children = "";
        this.height = "";
        this.weight = "";
        this.religion = "";
        this.blood_type = "";
        // - Appointment Details
        this.employee_id = "";
        this.position = "";
        this.is_active = "";
        // this.station = { value:"", label:"Select" };
        // this.plantilla_item = { value:"", label:"Select" };
        this.salary_grade = "";
        this.step_increment = "";
        this.application_status = 0;
        this.tax_status = "";
        this.monthly_salary = "";
        this.firstday_gov = "";
        this.firstday_sra = "";
        this.first_appointment = "";
        this.last_appointment = "";
        this.last_step_increment = "";
        this.last_adjustment = "";
        this.last_promotion = "";
        this.original_appointment = "";
        this.adjustment_date = "";
        // - ID's
        this.tin = "";
        this.gsis = "";
        this.philhealth = "";
        this.pagibig = "";
        this.sss = "";
        this.error_fields = {};
        this.plantilla_options = [{ value:"", label:"Select" }];

    }

    setFirstname(firstname){
        this.firstname = firstname;
    }

    setMiddlename(middlename){
        this.middlename = middlename;
    }

    setLastname(lastname){
        this.lastname = lastname;
    }

    setSuffixname(suffixname){
        this.suffixname = suffixname;
    }

    setAddressPresent(address_present){
        this.address_present = address_present;
    }

    setAddressPermanent(address_permanent){
        this.address_permanent = address_permanent;
    }

    setBirthdate(birthdate){
        this.birthdate = birthdate;
    }

    setPlaceOfBirth(place_of_birth){
        this.place_of_birth = place_of_birth;
    }

    setSex(sex){
        this.sex = sex;
    }

    setCivilStatus(civil_status){
        this.civil_status = civil_status;
    }

    setTelNo(tel_no){
        this.tel_no = tel_no;
    }

    setCellNo(cell_no){
        this.cell_no = cell_no;
    }

    setEmailAddress(email_address){
        this.email_address = email_address;
    }

    setSpouseName(spouse_name){
        this.spouse_name = spouse_name;
    }

    setSpouseOccupation(spouse_occupation){
        this.spouse_occupation = spouse_occupation;
    }

    setNoOfChildren(no_of_children){
        this.no_of_children = no_of_children;
    }

    setHeight(height){
        this.height = height;
    }

    setWeight(weight){
        this.weight = weight;
    }

    setReligion(religion){
        this.religion = religion;
    }

    setBloodType(blood_type){
        this.blood_type = blood_type;
    }

    setEmployeeId(employee_id){
        this.employee_id = employee_id;
    }

    setPosition(position){
        this.position = position;
    }

    setIsActive(is_active){
        this.is_active = is_active;
    }

    // setStation(station){
    //     this.station = station;
    //     this.setPlantillaOptions(station.value)
    // }

    setSalaryGrade(salary_grade){
        this.salary_grade = salary_grade;
    }

    setStepIncrement(step_increment){
        this.step_increment = step_increment;
    }

    setApplicationStatus(application_status){
        this.application_status = application_status;
    }

    setTaxStatus(tax_status){
        this.tax_status = tax_status;
    }

    setMonthlySalary(monthly_salary){
        this.monthly_salary = monthly_salary;
    }

    // setPlantillaItem(plantilla_item){
    //     this.plantilla_item = plantilla_item;
    // }

    setFirstdayGov(firstday_gov){
        this.firstday_gov = firstday_gov;
    }

    setFirstdaySRA(firstday_sra){
        this.firstday_sra = firstday_sra;
    }

    setFirstAppointment(first_appointment){
        this.first_appointment = first_appointment;
    }

    setLastAppointment(last_appointment){
        this.last_appointment = last_appointment;
    }

    setLastStepIncrement(last_step_increment){
        this.last_step_increment = last_step_increment;
    }

    setLastAdjustment(last_adjustment){
        this.last_adjustment = last_adjustment;
    }

    setLastAdjustment(last_adjustment){
        this.last_adjustment = last_adjustment;
    }

    setLastPromotion(last_promotion){
        this.last_promotion = last_promotion;
    }

    setOriginalAppointment(original_appointment){
        this.original_appointment = original_appointment;
    }

    setAdjustmentDate(adjustment_date){
        this.adjustment_date = adjustment_date;
    }

    setTin(tin){
        this.tin = tin;
    }

    setGsis(gsis){
        this.gsis = gsis;
    }

    setPhilhealth(philhealth){
        this.philhealth = philhealth;
    }

    setPagibig(pagibig){
        this.pagibig = pagibig;
    }

    setSss(sss){
        this.sss = sss;
    }

    setErrorFields(error_fields){
        this.error_fields = error_fields;
    }


    // List Handlers
    handleSearch(e){
        e.preventDefault()
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.query = e.target.value;
        this.delaySearch();
    }

    handleFilterSubmit(){
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.fetch();
    }

    handleSortSubmit(){
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.fetch();
    }

    handleRefreshClick(e){
        e.preventDefault()
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.page_size = 10;
        this.query = "";
        this.filter_is_active = { value:"", label:"Select" };
        this.filter_station = { value:"", label:"Select" };
        this.filter_sex = { value:"", label:"Select" };
        this.filter_civil_status = { value:"", label:"Select" };
        this.filter_application_status = { value:"", label:"Select" };
        this.filter_level = { value:"", label:"Select" };
        this.filter_fd_gov_from = "", 
        this.filter_fd_gov_to = "", 
        this.filter_fd_sra_from = "", 
        this.filter_fd_sra_to = "", 
        this.filter_first_appt_from = "",
        this.filter_first_appt_to = "",
        this.filter_last_appt_from = "",
        this.filter_last_appt_to = "",
        this.filter_last_si_from = "",
        this.filter_last_si_to = "",
        this.filter_last_adj_from = "",
        this.filter_last_adj_to = "",
        this.filter_last_prom_from = "",
        this.filter_last_prom_to = "",
        this.sort_field = "";
        this.sort_order = "";
        this.selected_employee = 0;
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


}

const employeeStore = new EmployeeStore()

export default employeeStore