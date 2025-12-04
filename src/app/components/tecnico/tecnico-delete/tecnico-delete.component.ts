import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {
  tecnico: Tecnico = {
      id:         '',
      nome:       '',
      cpf:        '',
      email:      '',
      senha:      '',
      perfis:     []
    };
  
    constructor(
      private tecnicoService: TecnicoService,
      private toatr: ToastrService,
      private router: Router,
      private route: ActivatedRoute
    ) { }
  
    ngOnInit(): void {
      this.tecnico.id = this.route.snapshot.paramMap.get('id');
      this.findById();
    }

    findById(): void {
      this.tecnicoService.findById(this.tecnico.id).subscribe(resposta => {
        resposta.perfis = [];
        this.tecnico = resposta;
      });
    }
  
    delete(): void {
      this.tecnicoService.delete(this.tecnico.id).subscribe(() => {
        this.toatr.success('Técnico deletado com sucesso', 'Deleção');
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
}