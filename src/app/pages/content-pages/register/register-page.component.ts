import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {RegisterService} from "./resgiter.service";
import {ToastsManager} from "ng2-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import * as swal from 'sweetalert2';
import {AppValidationService} from "../../../app-validation.service";
import {NgxViacepService, Endereco, ErroCep} from '@brunoc/ngx-viacep';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {
    @ViewChild('f') registerForm: NgForm;

    client = {
        img_profile:'',
        nome:'',
        email:'',
        data_nascimento:'',
        pai:'',
        sobrenome:'',
        cpf:'',
        whatsapp:'',
        mae:'',
        rg:'',
        address:{
            street:'',
            city:'',
            postal_code:'',
            state:'',
            neighborhood:'',
            number:''
        }
    };

    valid: boolean = false;
    validC: boolean = false;
    dragging: boolean = false;
    upload_status: string = 'not';
    urlImage = 'https://dummyimage.com/80x80/fff/green';

    constructor(private httpService: RegisterService, private toastr: ToastsManager, private router: Router,
    private route: ActivatedRoute, private validationService: AppValidationService,private viacep: NgxViacepService){

    }

    //  On submit click, reset field value
    onSubmit() {
        this.httpService.showLoading();
        this.httpService.builder()
            .insert(this.client,'register')
            .then((res) => {
                let self = this;
                self.httpService.hideLoading();

                swal({
                    title: res.title,
                    text: res.message,
                    type: res.status,
                    showCancelButton: false,
                    confirmButtonColor: '#0CC27E',
                    cancelButtonColor: '#FF586B',
                    confirmButtonText: 'Continuar',
                    cancelButtonText: "Cancelar"
                }).then(function (isConfirm) {
                    if (isConfirm) {
                        self.router.navigate(['pages/login']);
                    }
                }).catch(swal.noop);
            });
    }

    login(){
        this.router.navigate(['pages/login']);
    }

    validCPF(cpf) {
        if (cpf.length == 14) {
            this.valid = this.validationService.cpf(cpf);
        }
    }

    getCep(cep) {
        if (cep && cep.length === 8) {
            this.viacep.buscarPorCep(cep).then((res: Endereco) => {
                // Endereço retornado :)
                this.client.address.city = res.localidade;
                this.client.address.street = res.logradouro;
                this.client.address.neighborhood = res.bairro;
                this.client.address.state = res.uf;
            }).catch((error: ErroCep) => {
                // Alguma coisa deu errado :/
                this.toastr.error(error.message, 'Erro');
            });
        }
    }

    upload(e) {
        e.preventDefault();
        console.log(e);

        let image_url: any = null;
        if (e.dataTransfer) {
            image_url = e.dataTransfer.files[0];
        } else {
            image_url = e.target.files[0];
        }

        this.upload_status = 'sending';

        let formData = new FormData();
        formData.append('photo', image_url);
        console.log(formData);
        this.httpService.builder()
            .insert(formData, 'upload')
            .then((res) => {
                this.client.img_profile = res.name;
                this.urlImage = res.url;
                this.dragging = true;
                this.upload_status = 'success';
            })
            .catch((res) => {
                console.log(res);
                this.upload_status = 'error';
            });
    }

    dragover(e) {
        e.stopPropagation();
        e.preventDefault();
        this.dragging = true;
    }

}