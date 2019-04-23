import { Component, OnInit, ViewChild } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { MatTableDataSource, MatPaginator, MatTable, MatSort } from '@angular/material';
import { PedidosService } from 'src/app/services/pedidos.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.component.html',
  styleUrls: ['./pedidos-admin.component.css']
})
export class PedidosAdminComponent implements OnInit {

  listaPedidos :Pedido[];

  datasource :MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator :MatPaginator; 
  @ViewChild(MatTable) table :MatTable<any>;
  @ViewChild(MatSort) sort :MatSort;

  displayedColumns = ["$id", "email_usuario", "precio_prod", "fecha", "estado", "botones", "botones2"];
  pageSize = 10;
  pageIndex :number;
  pageSizeOptions :number[]= [5, 10, 25, 100];
  actualCategoria :string;


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
      });
    });
   
  }

  filtrarTabla (filterValue :string) { 
    this.datasource.filter = filterValue.trim().toLowerCase(); 
  }

  

}
