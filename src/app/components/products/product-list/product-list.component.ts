import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //lista de tipo Product vacia
  productList: Product[];

  constructor( private _productServices: ProductService, 
               private _toastrServices: ToastrService) { 

  }

  ngOnInit() {
    /** 
     * escuchamos todos los cambios que haya en la DB
     * "snapshotChanges()" nos devuelve un observable 
     * y para acceder a el obtener la data nos suscribimos
     */
    this._productServices.getProducts().snapshotChanges().subscribe( data => {
      //iniciamos la lista vacia
      this.productList = [];
      /**
       * recorremos la db para cada elemento que haya en ella.
       * para cada elemento de la "data" (de los items) convertimos el contenido (payload) en JSON y lo guardamos
       * cogemos la llave (Uid) de cada elemento y la guardamos en la variable x["$key"]
       * esta variable la necesitaremos para buscar el elemento que se actualizará o eliminará
       * Asignamos este variable (Uid) a la lista de tipo "Product"
       */
      data.forEach(element => {
        let x = element.payload.toJSON();
        //guardamos la clave(Uid) de cada elemento en una variable x con propiedad $key
        x["$key"] = element.key;
        this.productList.push(x as Product);
      })      
    });
  }

  //Metodo actualizar(Editar) producto
  onEdit( producto:Product ){
    /**
     * Para no tener el doble enlace de datos (tow-away-data-binding) 
     * creamos una nueva copia del elemento(objeto) con "Object.assing({},producto)"
     */
    this._productServices.selectedProduct = Object.assign( {}, producto);
    //console.log(this.productList);
    //this._productServices.updateProduct( producto );
  }
  //Metodo eliminar producto
  onDelete( producto:Product ){
    //hacemos uso del metodo del servicio y le pasamos el Uid del producto

    if(confirm('¿Deseas eliminar a '+ producto.nombre +' de tu lista de productos?')){
      this._productServices.deleteProduct(producto.$key );
      this._toastrServices.success("Operación existosa.", producto.nombre + " ha sido eliminado.");    
    }
  }


}
