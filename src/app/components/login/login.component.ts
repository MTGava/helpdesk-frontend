import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credentials = {
    email: '',
    password: ''
  }

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(3));

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.toastr.error('Usuário e/ou senha inválidos!', 'Erro ao efetuar login');
    this.creds.password = '';
  }

  validateFields(): boolean {
    return this.email.valid && this.password.valid;
  }

}
