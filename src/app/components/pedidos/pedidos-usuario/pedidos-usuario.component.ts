import { Component, OnInit, ViewChild } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { MatTableDataSource, MatPaginator, MatTable, MatSort } from '@angular/material';
import { PedidosService } from 'src/app/services/pedidos.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-pedidos-usuario',
  templateUrl: './pedidos-usuario.component.html',
  styleUrls: ['./pedidos-usuario.component.css']
})
export class PedidosUsuarioComponent implements OnInit {

  listaPedidos :Pedido[];

  datasource :MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator :MatPaginator; 
  @ViewChild(MatTable) table :MatTable<any>;
  @ViewChild(MatSort) sort :MatSort;

  displayedColumns = ["$id", "fecha", "precio_prod", "estado", "botones"];
  pageSize = 10;
  pageIndex :number;
  pageSizeOptions :number[]= [5, 10, 25, 100];


  constructor( public pedidosService : PedidosService,
    private sesion :SesionService) { }

  ngOnInit() {
    //Carga todos los pedidos en la tabla
    this.pedidosService.getPedidos()
    .snapshotChanges()
    .subscribe(item => {
      this.listaPedidos = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$id"] = element.key;
        this.listaPedidos.push(x as Pedido);
        this.datasource = new MatTableDataSource<any>(this.listaPedidos);
        this.datasource.paginator = this.paginator; 
        this.datasource.sort = this.sort;
        this.datasource.filter = localStorage.getItem('email');
      });
    });
   
  }

  

  

}
