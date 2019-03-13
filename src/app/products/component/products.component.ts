import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../service/products.service';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from "ng2-toastr";
import {NgxViacepService, Endereco, ErroCep} from '@brunoc/ngx-viacep';

import * as $ from 'jquery';
import {AppValidationService} from "../../app-validation.service";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
    operators = [];
    search = '';
    result = [];
    closeResult = '';
    t: any;
    produto = {
        codigo: null,
        nome: '',
        preco: '',
        descricao: '',
        categoria:{}
    };
    services = [];
    lengthOperators: number = 0;
    modalReference = null;
    dragging: boolean = false;
    upload_status: string = 'not';
    restaurantPhoto: any = null;
    valid: boolean = true;


    constructor(private httpService: ProductsService,
                private modalService: NgbModal
        , private toastr: ToastsManager, private viacep: NgxViacepService, private validationService: AppValidationService) {
    }

    ngOnInit() {
        this.httpService.setAccessToken();
        this.httpService.showLoading();
        this.httpService.eventEmitter
            .subscribe(() => {
                this.httpService.builder('produtos').list()
                    .then((res) => {
                        this.httpService.hideLoading();
                        this.operators = res;
                        this.lengthOperators = res.length;
                        this.result = this.operators;
                    }).catch((res) => {
                    this.httpService.hideLoading();
                });
            });
        this.httpService.eventEmitter.emit();
    }

    // Open default modal
    open(content) {
        this.clearForm();
        this.modalReference = this.modalService.open(content, { backdrop: 'static'});
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    // Open default modal
    openView(view, id, status) {
        if (status == 'inativo') {
            this.toastr.error("Não é possivel editar um operador inativo.", "Erro ao editar.");
            this.httpService.hideLoading();
        }
        else {
            this.httpService.showLoading();
            this.httpService.builder().view(id, 'admin/operator')
                .then((res) => {
                    this.produto = res;
                    this.modalReference = this.modalService.open(view, {size: 'lg', backdrop: 'static'});
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

    clearForm() {
        this. produto = {
            codigo: null,
            nome: '',
            preco: '',
            descricao: '',
            categoria:{}
        };

        this.dragging = false;
        this.upload_status = 'not';
    }

    public save() {
        this.httpService.showLoading();
        this.httpService.insert(this.produto, 'produto')
            .then((res) => {
                this.httpService.hideLoading();
                if (res.status == 'success') {
                    this.modalReference.close();
                    this.getProducts();
                    this.clearForm();
                    this.toastr.success(res.message, res.title)
                } else if (res.status == 'error') {
                    this.toastr.error(res.message, res.title)
                }
            }).catch((res) => {
            this.httpService.hideLoading();
        });
    }


    public getProducts() {
        this.httpService.builder('produtos').list()
            .then((res) => {
                this.operators = res;
                this.lengthOperators = res.length;
                this.result = this.operators;
            });
    }

    filteredOperator(e) {
        let res = this.operators;

        if (this.search) {
            this.result = res.filter(item => item.nome.toLowerCase().includes(this.search.toLowerCase()));
            this.lengthOperators = this.result.length;
        } else {
            this.result = this.operators;
            this.lengthOperators = this.result.length;
        }
    }

    public update() {
        this.httpService.showLoading();
        this.httpService.update(this.produto.codigo, this.produto, 'produtos')
            .then((res) => {
                this.httpService.hideLoading();
                if (res.status == 'success') {
                    this.modalReference.close();
                    this.getProducts();
                    this.clearForm();
                    this.toastr.success(res.message, res.title)
                } else if (res.status == 'error') {
                    this.toastr.error(res.message, res.title)
                }
            }).catch((res) => {
            this.httpService.hideLoading();
        });
    }

}
