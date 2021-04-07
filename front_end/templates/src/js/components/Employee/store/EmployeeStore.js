
import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class EmployeeStore{

    // // List
    list = [];
    total_records = 0;
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 10;
    page_limit = 0;
    query = "";
    sort_field = "";
    sort_order = "";

	delaySearch = debounce(() => this.fetch(), 500); // search delay
    selected_employee = 0; // selected menu id after create or update
    is_opened_form = 0; // 0 = create form, 1 = update form
    is_selected_all_rows = false; // is all checkbox selected
    selected_rows = []; // rows that are selected via checkbox

    // // Form
    // category = "";
    // name = "";
    // is_menu = null;
    // is_dropdown = null;
    // nav_name = "";
    // icon = "";
    // url = "";
    // url_name = "";
    // subemployees = [];
    // error_fields = {};


    constructor(){
        makeAutoObservable(this)
    }


    fetch(){
        this.is_selected_all_rows = false;
        this.selected_rows = [];
        axios.get('api/employee', { 
            params: { 
                q: this.query, 
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

    
    // // List Setters
    // setSelectedRoute(selected_employee){
    //     this.selected_employee = selected_employee;
    // }

    // setIsOpenedForm(is_opened_form){
    //     this.is_opened_form = is_opened_form;
    // }

    // setIsSelectedAllRows(bool){
    //     this.is_selected_all_rows = bool;
    //     this.selected_rows.map(data => {
    //         this.setSelectedRowObject(bool, data.id)
    //     })
    // }

    // setSelectedRowObject(status, id){
    //     let obj_index = this.selected_rows.findIndex(data => data.id === id)
    //     this.selected_rows[obj_index].status = status;
    // }


    // // Form
    // resetForm(){
    //     this.category = "";
    //     this.name = "";
    //     this.nav_name = "";
    //     this.is_menu = null;
    //     this.is_dropdown = null;
    //     this.icon = "";
    //     this.url = "";
    //     this.url_name = "";
    //     this.subemployees = [];
    //     this.error_fields = {};
    // }

    // setCategory(cat){
    //     this.category = cat;
    // }

    // setName(name){
    //     this.name = name;
    // }

    // setIsMenu(is_menu){
    //     this.is_menu = is_menu;
    // }

    // setIsDropdown(is_dropdown){
    //     this.is_dropdown = is_dropdown;
    // }

    // setNavName(nav_name){
    //     this.nav_name = nav_name;
    // }

    // setIcon(icon){
    //     this.icon = icon;
    // }

    // setUrl(url){
    //     this.url = url;
    // }

    // setUrlName(url_name){
    //     this.url_name = url_name;
    // }

    // addSubemployees(){
    //     this.subemployees = [...this.subemployees, { name:"", is_nav:"", nav_name:"", url:"", url_name:"" }]
    // }

    // modifySubemployees(index, e){
    //     const list = [...this.subemployees];
    //     list[index][e.target.name] = e.target.value;
    //     this.subemployees = list;
    // }

    // deleteSubemployees(index){
    //     const list = [...this.subemployees];
    //     list.splice(index, 1);
    //     this.subemployees = list;
    // }

    // setSubemployees(subemployees){
    //     this.subemployees = subemployees;
    // }

    // findSubemployeeById(value){
    //     const subemployees = this.subemployees;
    //     subemployees.find((data)=>{
    //         return data.id === value;
    //     })
    //     return subemployees;
    // }

    // findSubemployeeByKey(key){
    //     const subemployees = this.subemployees;
    //     return subemployees[key];
    // }

    // setErrorFields(obj){
    //     this.error_fields = obj;
    // }


    // // List Handlers
    // setSortField(sort_field){
    //     this.sort_field = sort_field;
    // }

    // setSortOrder(sort_order){
    //     this.sort_order = sort_order;
    // }

    // handleSearch(e){
    //     e.preventDefault()
    //     this.page_prev = 0;
    //     this.page_current = 1;
    //     this.page_next = 2;
    //     this.query = e.target.value;
    //     this.delaySearch();
    // }

    // handleSortSubmit(){
    //     this.page_prev = 0;
    //     this.page_current = 1;
    //     this.page_next = 2;
    //     this.fetch();
    // }

    // handleRefreshClick(e){
    //     e.preventDefault()
    //     this.page_prev = 0;
    //     this.page_current = 1;
    //     this.page_next = 2;
    //     this.page_size = 10;
    //     this.query = "";
    //     this.sort_field = "";
    //     this.sort_order = "";
    //     this.selected_employee = 0;
    //     this.fetch();
    // }

    // handlePageSizeClick(e){
    //     e.preventDefault()
    //     if(e.target.value > 0){
    //         this.page_prev = 0;
    //         this.page_current = 1;
    //         this.page_next = 2;
    //         this.page_size = e.target.value;
    //         this.fetch();
    //     }
    // }

    // handlePaginationClick(e, page_current){
    //     e.preventDefault()
    //     if(page_current > 0 && page_current <= this.page_limit){
    //         this.page_prev = page_current - 1;
    //         this.page_current = page_current;
    //         this.page_next = page_current + 1;
    //         this.fetch();
    //     }
    // }


}

const employeeStore = new EmployeeStore()

export default employeeStore