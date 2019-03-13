import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

    users = [];
    search = '';
    result = []
    closeResult = '';
    t: any;

    constructor(private httpService: UsersService, private modalService: NgbModal) {}

    ngOnInit() {
        this.httpService.setAccessToken();
        this.httpService.eventEmitter
        .subscribe(() => {
            this.httpService.builder('admin/user').list()
                .then((res) => {
                    this.users = res.data;
                    this.result = this.users;
                });
        });
        this.httpService.eventEmitter.emit();
    }

    filteredUser(e) {
        let res = this.users;

        if (this.search) {
            this.result = res.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));    
        } else {
            this.result = this.users;
        }
    }

    // Open default modal
    open(content) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
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