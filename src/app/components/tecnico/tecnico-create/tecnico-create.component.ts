import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     []
  };

  name: FormControl = new FormControl(null, [Validators.minLength(3), Validators.maxLength(50)]);
  cpf: FormControl = new FormControl(null, Validators.pattern('^[0-9]{11}$'));
  email: FormControl = new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private tecnicoService: TecnicoService,
    private toatr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.tecnicoService.create(this.tecnico).subscribe(() => {
      this.toatr.success('Técnico criado com sucesso', 'Cadastro');
      this.router.navigate(['tecnicos']);
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toatr.error(element.message);
        });
      } else {
        this.toatr.error(ex.error.message);
      }
    });
  }

  addProfile(profile: any): void {
    if(this.tecnico.perfis.includes(profile)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(profile), 1);
    } else {
      this.tecnico.perfis.push(profile);
    }
  }

  validateFields(): boolean {
    return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid;
  }
}
