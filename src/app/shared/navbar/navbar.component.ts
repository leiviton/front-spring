import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppHttpService} from "../../app-http.service";
import {ModalDismissReasons, NgbModal, NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
    modalReference = null;
    closeResult = '';

    constructor(private router: Router,
                private route: ActivatedRoute,
                private httpService: AppHttpService,
                private modalService: NgbModal,
                private toastr: ToastsManager) {}
    logout() {
        jQuery('#bifrostBarSpinner').show();
        localStorage.clear();
        setTimeout(()=>{
            jQuery('#bifrostBarSpinner').hide();
            this.router.navigate(['/pages/login']);
        },1000)
    }

    // Open default modal
    profile(edit) {
        this.modalReference = this.modalService.open(edit,{ size: 'lg' });
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
