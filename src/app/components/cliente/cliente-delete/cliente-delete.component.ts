import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {
  cliente: Cliente = {
      id:         '',
      nome:       '',
      cpf:        '',
      email:      '',
      senha:      '',
      perfis:     []
    };
  
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
  
    delete(): void {
      this.clienteService.delete(this.cliente.id).subscribe(() => {
        this.toatr.success('Cliente deletado com sucesso', 'Deleção');
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
}