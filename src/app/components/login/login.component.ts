import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.authenticate(this.creds).subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization').substring(7));
      this.router.navigate(['']);
    }, () => {
      this.toastr.error('Usuário e/ou senha inválidos!', 'Erro ao efetuar login');
      this.creds.password = '';
    });
  }

  validateFields(): boolean {
    return this.email.valid && this.password.valid;
  }

}
