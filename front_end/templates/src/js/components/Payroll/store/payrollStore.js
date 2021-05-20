import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class PayrollStore{


    constructor(){
        makeAutoObservable(this)
    }



}

const payrollStore = new PayrollStore()
export default payrollStore