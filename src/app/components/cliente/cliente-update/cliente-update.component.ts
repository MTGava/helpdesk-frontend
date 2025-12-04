import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  cliente: Cliente = {
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
      private clienteService: ClienteService,
      private toatr: ToastrService,
      private router: Router,
      private route: ActivatedRoute
    ) { }
  
    ngOnInit(): void {
      this.cliente.id = this.route.snapshot.paramMap.get('id');
      this.findById();
    }

    findById(): void {
      this.clienteService.findById(this.cliente.id).subscribe(resposta => {
        resposta.perfis = [];
        this.cliente = resposta;
      });
    }
  
    update(): void {
      this.clienteService.update(this.cliente).subscribe(() => {
        this.toatr.success('Cliente atualizado com sucesso', 'Atualização');
        this.router.navigate(['clientes']);
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
      if(this.cliente.perfis.includes(profile)) {
        this.cliente.perfis.splice(this.cliente.perfis.indexOf(profile), 1);
      } else {
        this.cliente.perfis.push(profile);
      }
    }
  
    validateFields(): boolean {
      return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid;
    }
}