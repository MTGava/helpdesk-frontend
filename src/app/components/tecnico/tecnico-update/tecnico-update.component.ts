import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {
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
  
    update(): void {
      this.tecnicoService.update(this.tecnico).subscribe(() => {
        this.toatr.success('Técnico atualizado com sucesso', 'Atualização');
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