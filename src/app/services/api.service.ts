import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ApiService {
    loginOptions: Object;
    options: Object;

    constructor(private http: HttpClient) {
    }


    createAuthHeaders() {
        this.loginOptions = {
            headers: new HttpHeaders({
                'language': "EN",
            })
        };
        this.options = {
            headers: new HttpHeaders({
                'authorization': localStorage.getItem('token'),
                'language': "EN",
            })
        }
    }

    onLogin(user) {
        this.createAuthHeaders();
        return this.http.post('https://requestbdpm.arsensench.com/login', user, this.loginOptions)
            .toPromise()
            .then(res => res)
            .catch(err => err);
    }

    getItems() {
        this.createAuthHeaders();
        return this.http.get('https://requestbdpm.arsensench.com/getItems', this.options)
            .toPromise()
            .then(res => res)
            .catch(err => err);
    }

    getCategories() {
        this.createAuthHeaders();
        return this.http.get('https://requestbdpm.arsensench.com/getCategories', this.options)
            .toPromise()
            .then(res => res)
            .catch(err => err);
    }
}
