import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [
    {
      id: 1,
      titulo: 'Problema ao acessar sistema',
      nomeCliente: 'João Silva',
      nomeTecnico: 'Carlos Santos',
      cliente: 'João Silva',
      tecnico: 'Carlos Santos',
      dataAbertura: '2025-12-01',
      dataFechamento: '2025-12-02',
      prioridade: 'Alta',
      status: 'Fechado',
      observacoes: 'Resetar senha do usuário'
    },
    {
      id: 2,
      titulo: 'Impressora não conecta à rede',
      nomeCliente: 'Maria Oliveira',
      nomeTecnico: 'Ana Costa',
      cliente: 'Maria Oliveira',
      tecnico: 'Ana Costa',
      dataAbertura: '2025-12-03',
      dataFechamento: null,
      prioridade: 'Média',
      status: 'Em Progresso',
      observacoes: 'Aguardando resposta do cliente'
    },
    {
      id: 3,
      titulo: 'Software com erro ao abrir',
      nomeCliente: 'Pedro Santos',
      nomeTecnico: 'Lucas Ferreira',
      cliente: 'Pedro Santos',
      tecnico: 'Lucas Ferreira',
      dataAbertura: '2025-12-04',
      dataFechamento: null,
      prioridade: 'Alta',
      status: 'Aberto',
      observacoes: 'Erro ao inicializar aplicação'
    },
    {
      id: 4,
      titulo: 'Backup não está sendo realizado',
      nomeCliente: 'Empresa ABC',
      nomeTecnico: 'Carlos Santos',
      cliente: 'Empresa ABC',
      tecnico: 'Carlos Santos',
      dataAbertura: '2025-11-28',
      dataFechamento: '2025-12-01',
      prioridade: 'Crítica',
      status: 'Fechado',
      observacoes: 'Configuração corrigida com sucesso'
    }
  ];
  
  displayedColumns: string[] = ['id', 'titulo', 'nomeCliente', 'nomeTecnico', 'dataAbertura', 'dataFechamento', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
