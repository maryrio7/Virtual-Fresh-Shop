import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';
import { Carrito } from 'src/app/models/carrito';
import { ToastrService } from 'ngx-toastr';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-vista-carrito',
  templateUrl: './vista-carrito.component.html',
  styleUrls: ['./vista-carrito.component.css']
})
export class VistaCarritoComponent implements OnInit {

  carrito :Carrito[] = [];
  step :number = 1;
  nombre :string = "";
  direccion :string = "";
  telefono :number = null;
  constructor(private sesion :SesionService,
    private toastr :ToastrService,
    private pedidosService :PedidosService) { }

  ngOnInit() {
    this.carrito = this.sesion.mostrarCompra();
    this.step = 1;
  }
  progreso() :number{
    return this.step;
  }
  siguiente() :void{
    this.step++;
  }
  atras() :void{
    this.step--;
  }
  resumen(n, d, t){
    if(n!=""){
      if(d!=""){
        this.nombre = n;
        this.direccion = d;
        this.telefono = t;
        this.siguiente();
      }
      else this.toastr.error("Campos requeridos vacíos");
    }
    else this.toastr.error("Campos requeridos vacíos");
  }
generarPedido() {
  this.pedidosService.nuevoPedido(this.nombre,this.direccion,this.telefono);
  this.siguiente();
  this.carrito = null;
  this.sesion.vaciarCarrito();
}

}
