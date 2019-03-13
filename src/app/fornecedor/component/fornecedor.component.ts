import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../service/fornecedor.service';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from "ng2-toastr";
import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep';

import * as $ from 'jquery';

@Component({
    selector: 'app-fornecedor',
    templateUrl: './fornecedor.component.html',
    styleUrls: ['./fornecedor.component.scss']
})

export class FornecedorComponent implements OnInit {
    services = [];
    search = '';
    result = [];
    cnpj = '';
    closeResult = '';
    t: any;
    currentJustify = 'start';
    currentOrientation = 'horizontal';
    service = {
        id:null,
        name:'',
        description:'',
        unit:'',
        value:'',
        type_service:'',
        time:''
    };
    lengthServices:number = 0;
    modalReference = null;
    dragging: boolean = false;
    upload_status: string = 'not';
    restaurantPhoto: any = null;
    valid:boolean = true;

    constructor(private httpService:FornecedorService,
                private modalService: NgbModal
                ,private toastr: ToastsManager, private viacep: NgxViacepService) {}

    // Open default modal
    open(content) {
        this.clearForm();
        this.modalReference = this.modalService.open(content,{ size: 'lg' });
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    // Open default modal
    openView(view,id, status) {
      if(status == 'inativo'){
        this.toastr.error("Não é possivel editar um serviço inativo.","Erro ao editar.");
        this.httpService.hideLoading();
      }
      else{
        this.httpService.showLoading();
        this.httpService.builder().view(id,'admin/service')
            .then((res) => {
                this.service = res.data;
                this.modalReference = this.modalService.open(view,{ size: 'lg' });
                this.modalReference.result.then((result) => {
                    this.closeResult = `Closed with: ${result}`;
                }, (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
                this.httpService.hideLoading();
            });
        }
    }

    // This function is used in open
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else {
            return `with: ${reason}`;
        }
    }

    public beforeChange($event: NgbTabChangeEvent) {
        if ($event.nextId === 'bar') {
        $event.preventDefault();
        }
    };

    ngOnInit() {
        this.httpService.setAccessToken();
        this.httpService.showLoading();
        this.httpService.eventEmitter
        .subscribe(() => {
            this.httpService.builder( 'fornecedores').list()
                .then((res) => {
                    this.httpService.hideLoading();
                    this.services = res;
                    this.lengthServices = res.length;
                    this.result = this.services;
                }).catch((res) =>{
                    this.httpService.hideLoading();
                });
        });
        this.httpService.eventEmitter.emit();
    }

    clearForm(){
        this.service = {
            id:null,
            name:'',
            description:'',
            unit:'',
            value:'',
            type_service:'',
            time:''
        };

        this.dragging = false;
        this.upload_status = 'not';
    }

    filteredServices(e) {
        let res = this.services;

        if (this.search) {
            this.result = res.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
        } else {
            this.result = this.services;
        }
    }


    public save()
    {

    }

    public update(){

    }

    public getCnpj(cnpj: string) {
        
        if(cnpj.length > 13){
            this.httpService.builder('').viewCnpj(cnpj).then((res) => {
                console.log(res);
            });
        }
    }

    updateStatus(id:number) {

    }
}
