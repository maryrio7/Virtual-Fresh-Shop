import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { MatPaginator, MatSort,  MatTableDataSource, MatTable } from '@angular/material';
import { Subject } from 'rxjs';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  listaProductos :Producto[];

  datasource :MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator :MatPaginator; 
  @ViewChild(MatTable) table :MatTable<any>;
  @ViewChild(MatSort) sort :MatSort;

  displayedColumns = ["imagen", "nombre_producto", "precio", "cantidad","botones"];
  pageSize = 10;
  pageIndex :number;
  pageSizeOptions :number[]= [5, 10, 25, 100];
  actualCategoria :string;

  //Carrito
  selectedProduct :Subject<any> = new Subject;
  totalProductos :number = 0;
  totalPrecio :number = 0;
  cantidad :number =0;

  constructor( public productoService : ProductoService,
    private toastr :ToastrService,
    private sesion :SesionService) { }

  ngOnInit() {
    //Carga todos los productos en la tabla
    this.productoService.getProductos()
    .snapshotChanges()
    .subscribe(item => {
      this.listaProductos = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$id"] = element.key;
        this.listaProductos.push(x as Producto);
        this.datasource = new MatTableDataSource<any>(this.listaProductos);
        this.datasource.paginator = this.paginator; 
        this.datasource.sort = this.sort;
      });
      this.actualizarCantidad();
    });
   
  }

  filtrarTabla (filterValue :string) { 
    this.datasource.filter = filterValue.trim().toLowerCase(); 
  }

  filtrarCat(categoria :string) {
    if(this.actualCategoria == categoria){
      this.datasource = new MatTableDataSource<any>(this.listaProductos);
      this.actualCategoria = null;
    }
    else {
      var listaFiltrada :Producto[] = [];
      for(var i=0; i<this.listaProductos.length; i++){
        if(this.listaProductos[i].categoria == categoria)
          listaFiltrada.push(this.listaProductos[i]);
      }
      this.datasource = new MatTableDataSource<any>(listaFiltrada);
      this.actualCategoria = categoria;
    }
    
  }

  //Acciones del carrito
  
  anadirAlCarro(producto :Producto){
    if (this.sesion.getCart() === null){
      var temporal1 = ""; var temporal2 = ""; var temporal3 = "";
    }
    else {
      var temporal1 = this.sesion.getCart();
      var temporal2 = this.sesion.getPrecios();
      var temporal3 = this.sesion.getNombres();
    }
    temporal1 += (producto.$id+",");
    temporal2 += (producto.precio+",");
    temporal3 += (producto.nombre_producto+",");
    this.sesion.updateCart(temporal1, temporal2, temporal3);
    this.toastr.success("Producto añadido al carrito");
    this.actualizarCantidad();
  }

  quitarDelCarro(producto :Producto){
    var array1 = this.sesion.getCart().split(",");
    var array2 = this.sesion.getPrecios().split(",");
    var array3 = this.sesion.getNombres().split(",");
    var borrado = false;
    for (var i=0; i<array1.length-1; i++){
      if(!borrado){
        if(producto.$id === array1[i]){
          array1.splice(i,1);
          array2.splice(i,1);
          array3.splice(i,1);
          borrado = true;
          this.toastr.error("Producto eliminado del carrito");
        }
      }
    }
    this.sesion.updateCart(array1.toString(), array2.toString(), array3.toString());
    this.actualizarCantidad();
  }
  
  actualizarCantidad() :void {
    if (this.sesion.mostrarCompra() !=null){
      var carro = this.sesion.mostrarCompra();
      for (var i=0; i<this.listaProductos.length; i++){
        var encontrado = false;
        for (var j=0; j<carro.length; j++){
          if(this.listaProductos[i].$id === carro[j].$id){
            this.listaProductos[i].cantidad = carro[j].cantidad;
            encontrado = true;
          }
        }
        if (!encontrado) this.listaProductos[i].cantidad = 0;
      }
    }
  }
  


}
