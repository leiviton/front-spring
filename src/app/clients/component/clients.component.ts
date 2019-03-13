import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../service/clients.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {

    clients = [];
    client = {
        img_profile:'',
        nome:'',
        email:'',
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
            neighborhood:''
        }

    };
    address = [];
    search = '';
    result = [];
    closeResult = '';
    t: any;
    lengthClient = 0;
    modalReference = null;
    url_api = environment.server_url;
    constructor(private httpService: ClientsService, private modalService: NgbModal) {}

    ngOnInit() {
        this.httpService.showLoading();
        this.httpService.setAccessToken();
        this.httpService.eventEmitter
        .subscribe(() => {
            this.httpService.builder('admin/members').list()
                .then((res) => {
                    this.httpService.hideLoading();
                    this.clients = res.data;
                    this.lengthClient = res.data.length;
                    this.result = this.clients;
                });
        });
        this.httpService.eventEmitter.emit();
    }

    filteredClient(e) {
        let res = this.clients;

        if (this.search) {
            this.result = res.filter(item => item.nome.toLowerCase().includes(this.search.toLowerCase()));
            this.lengthClient = this.result.length;
        } else {
            this.result = this.clients;
            this.lengthClient = this.result.length;
        }
    }
    // Open default modal
    openView(view, id) {
        this.httpService.showLoading();
        this.httpService.builder().view(id, 'admin/members','?include=address')
            .then((res) => {
                this.client = res.data;
                if(res.data.address){
                    this.address = res.data.address.data;
                }else{
                    this.address = []
                }
                this.modalReference = this.modalService.open(view, {size: 'lg',backdrop:'static'});
                this.modalReference.result.then((result) => {
                    this.closeResult = `Closed with: ${result}`;
                }, (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
                this.httpService.hideLoading();
            });
    }


    // This function is used in open
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    public beforeChange($event: NgbTabChangeEvent) {
        if ($event.nextId === 'bar') {
        $event.preventDefault();
        }
    };
}
