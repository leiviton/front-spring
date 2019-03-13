import {Component, OnInit, ViewChild} from '@angular/core';
import { ClientsService } from '../service/clients.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {

    clients = [];
    search = '';
    result = [];
    closeResult = '';
    t: any;
    currentJustify = 'start';
    currentOrientation = 'horizontal';
    lengthClient = 0;
    modalReference = null;

    constructor(private httpService: ClientsService, private modalService: NgbModal) {}

    ngOnInit() {

    }

    filteredClient(e) {
        let res = this.clients;

        if (this.search) {
            this.result = res.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
        } else {
            this.result = this.clients;
        }
    }
    open(view) {

                this.modalReference = this.modalService.open(view, {size: 'lg',backdrop:'static'});
                this.modalReference.result.then((result) => {
                    this.closeResult = `Closed with: ${result}`;
                }, (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
