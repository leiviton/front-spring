import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';

import { Router } from '@angular/router';

import * as jQuery from 'jquery';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {ToastsManager} from "ng2-toastr";

@Injectable()
export class AppHttpService{
    protected url: string;
    protected header: HttpHeaders;
    protected token = null;
    protected httpOptions: HttpHeaders;

    request() {
        return this.http;
    }

    constructor (protected http: HttpClient, private router: Router,private toastr: ToastsManager) {
        this.setAccessToken();
    }

    setAccessToken () {
        this.token = this.getToken();
        this.header = new HttpHeaders({'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json'});
    }

    builder(resource: string){
        this.url = environment.server_url + '/api/v1/' + resource;
        return this;
    }

    list(options: any = {}): Promise<any> {
        let url = this.url;
        if(options.filters !== undefined)
        {
            url = url + '?';
            let filters = options.filters;
            let where = [];
            filters.forEach((item, index) => {
                let field = Object.keys(item)[0];
                let value = item[field];
                where.push({field:value});
                url = url + 'where[' + field + ']=' + value +'&';
            });
            let observable = this.http.get(url, {headers: this.header});
            return this.toPromise(observable);
        }else {
            let observable = this.http.get(url,{headers: this.header});
            return this.toPromise(observable);
        }
    }

    search(search: string): Promise<any>
    {
        let observable = this.http.get(this.url + '?value='+search, {headers: this.header});
            return this.toPromise(observable);
    }

    view(id: number, url: string,include:string = ''): Promise<any> {
        let observable = this.http.get(this.url + url + '/' + id + include, {headers: this.header});
        return this.toPromise(observable);
    }
    
    viewCnpj(cnpj: string){
        let observable = this.http.get(`v1/cnpj/${cnpj}`);
        return this.toPromise(observable);
    }

    valid(id: number, data: object)
    {
        let observable = this.http.put(this.url + '/' + id, data, {headers: this.header});
        return this.toPromise(observable);
    }
    update(id: number, data: object, u): Promise<any>
    {
        let observable = this.http.put(this.url +  u + '/' + id, data, {headers: this.header});
        return this.toPromise(observable);
    }

    insert (data: object, u): Promise<any>
    {
        let observable = this.http.post(this.url + u, data, {headers: this.header});
        return this.toPromise(observable);
    }

    delete(id: number): Promise<any>
    {
        let observable = this.http.delete(this.url + '/' + id, {headers: this.header});
        return this.toPromise(observable);
    }

    updateStatus(url: string,status:string): Promise<any> {
        let observable = this.http.patch(this.url + url,status,{headers: this.header});
        return this.toPromise(observable);
    }

    protected toPromise(request){
        return request.toPromise()
            .then((res) => {
                return res || {}
            })
            .catch((err) =>{
                this.hideLoading();
                let message = 'Algo deu errado, informe o erro ' + err.status + ' ao administrador';
                if(err.status === 401)
                {
                    message = 'Você não tem permissão para acessar, informe um usuario e senha validos';
                    localStorage.clear();
                    this.hideLoading();
                    this.toastr.error(message,'Erro');
                    this.router.navigate(['/pages/login']);
                }
                if(err.status === 403)
                {
                    message = err.error.error_description;
                    this.hideLoading();
                    this.toastr.error(message,'Erro');
                }
                if (err.status === 500)
                {
                    this.hideLoading();
                    this.toastr.error(message,'Erro');
                    this.router.navigate(['/pages/error']);
                }
                if (err.status === 422)
                {
                    let body = JSON.parse(err._body);
                    this.toastr.error(body.message,body.title);
                    this.hideLoading();
                }
                if (err.status === 406)
                {
                    let body = err.error;
                    this.toastr.error(body.message,body.title);
                    this.hideLoading();
                }
                if (err.status === 404)
                {
                    message = 'Página não encontrada.';
                    this.hideLoading();
                    this.toastr.error(message,'Erro');
                    this.router.navigate(['/pages/error']);
                }
        });
    }

    private getToken()
    {
        return localStorage.getItem('token');
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }
}
