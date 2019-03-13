import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';
import * as swal from 'sweetalert2';
import {ToastsManager} from "ng2-toastr";

@Injectable()
export class AppMessageService{

    constructor ( private router: Router,private toastr: ToastsManager) {

    }


    message(title,message,status) {
        if(status == 'success') {
            this.toastr.success(message,title);
        }else if(status == 'error') {
            this.toastr.error(message,title);
        }else if(status == 'warning') {
            this.toastr.warning(message,title);
        }else if(status == 'info') {
            this.toastr.info(message,title);
        }
    }

    alert(title,message,status) {
        swal(title,message, status);
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }
}
