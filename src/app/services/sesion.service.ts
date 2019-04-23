import { Injectable, Inject, InjectionToken } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Carrito } from '../models/carrito';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(@Inject(SESSION_STORAGE) private storage :StorageService, public  router:  Router) { }
   
   
  public contarProductos() :number{
    if(this.getCart() === null)
      return 0;
    else
      return (this.getCart().split(",").length - 1);
  }
  public contarPrecios() :number {
    if(this.getPrecios() === null)
      return 0;
    else {
      var precios = this.getPrecios().split(",");
      var suma = 0;
      for (var i=0; i<precios.length-1; i++){
        suma += Number(precios[i]);
      }
      return suma;
    }
    
  }
  public updateCart(producto :string, precios :string, nombres :string){
    this.storage.set("listaCompra", producto);
    this.storage.set("preciosCompra", precios);
    this.storage.set("nombresCompra", nombres);
  }
  public getCart() :string {
    return this.storage.get("listaCompra");
  }
  public getPrecios() :string {
    return this.storage.get("preciosCompra");
  }
  public getNombres() :string {
    return this.storage.get("nombresCompra");
  }

  mostrarCompra() :Carrito[]{
    if(this.getCart() === null){
      return null;
    }
    else{
      var array1 = this.getCart().split(",");
      var array2 = this.getPrecios().split(",");
      var array3 = this.getNombres().split(",");
    var arrayLista :Carrito[]= []; 
    var contador = 0;
    for(var i=0; i<array1.length-1; i++){
      var encontrado=false;
      for(var k=0; k<arrayLista.length; k++){
        if(arrayLista[k].$id == array1[i]){
          arrayLista[k].cantidad ++;
          encontrado = true;
        }
      }

      if(!encontrado){
        arrayLista[contador] = {
          $id :array1[i],
          nombre : array3[i],
          cantidad :1,
          precio :Number(array2[i])
        }
        contador++;
      }
    }
    return arrayLista;
  }
  }

  vaciarCarrito() :void {
    this.storage.remove("listaCompra");
    this.storage.remove("preciosCompra");
    this.storage.remove("nombresCompra");
  }
  
}
