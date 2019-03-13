import { Injectable, EventEmitter } from '@angular/core';
import { AppHttpService } from '../../app-http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class FornecedorService extends AppHttpService {
    eventEmitter: EventEmitter<any> = new EventEmitter;

    builder(resource: string = '') {
        return super.builder(resource);
    }

    getCnpj(cnpj: string): Promise<any> {
        this.httpOptions = new HttpHeaders({'Authorization': 'Bearer fe92db82697e4f670089da16200990ac1026f2668575bc928bd3d502ac04de9b', 'Accept': 'application/json'})
        let url = `http://www.receitaws.com.br/v1/cnpj/${cnpj}/days/10`;
        let observable = this.http.get(url, {headers: this.httpOptions});
        return this.toPromise(observable);
    }
}
