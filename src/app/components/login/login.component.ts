import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  messageClass: String;
  message: String;
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private apiService: ApiService
  ) { this.createForm() }

  createForm(){
    this.form = this.formBuilder.group({
      userName: [''],
      password: [''],
    })
  }
  onLogin(){
    let user = {
      userName: this.form.get('userName').value,
      password: this.form.get('password').value,
    };
    this.apiService.onLogin(user)
        .then(res => {
          if(!res.result){
            this.messageClass = 'alert alert-danger';
            this.message = res.error.messageKey;
          }else{
            let token = res.result.data.authorization;
            localStorage.setItem('token', token);
            this.messageClass = 'alert alert-success';
            this.message = 'Success';
            setTimeout(()=>{
              this.router.navigate(['/dashboard']);
            }, 1000);
          }
        })
        .catch(err => err);
  }
  ngOnInit() {
  }

}
