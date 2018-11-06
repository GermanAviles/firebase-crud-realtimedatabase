import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../models/product';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /** 
    * Creamos una Lista de tipo "AngularFireList"
    * para almacenar todo lo que haya dentro de la DB de firebase
    */
  productList: AngularFireList<any>;
  /** 
    * instanciamos la clase "Product" para almacenar localmente
    * los datos del producto que el cliente seleccione
    */
  selectedProduct: Product = new Product();

  //inicializamos el modulo "AngularFireDatabase" para poder conectarnos a la db
  constructor( private FirebaseDB: AngularFireDatabase ){
    //var ref = environment.firebase.database().ref();
  }

  //Metodo obtener producto
  getProducts(){
    /**
     * Asignamos a "productList" todo los datos que obtenga desde Firebase.
     * Todos mis productos los almaceno en una colección (nodoPadre) llamada "productos"
     */
    return this.productList = this.FirebaseDB.list('productos');
  }

  //Metodo insertar nuevo producto a la DB
  insertProduct( product: Product ){
    /**
     * nuestro "productList" ya tiene todos los datos que hay en la DB 
     * al insertarle datos a la lista "productList" almaceno directamente en la DB
     * la lista contiene la clave y el valor de la DB
     */

    this.productList.push({
      nombre: product.nombre,
      categoria: product.categoria,
      localizacion: product.localizacion,
      precio: product.precio
    });

  }

  //Metodo actualizar producto existente
  updateProduct( product: Product ){
    /** 
    * El metodo "update()" recibe 2 parametros: 
      1) la llave para identificar el objeto que se desea actualizar
      2) los parametros que se desean actualizar de ese obejeto.
    */
    this.productList.update( product.$key, {
      nombre: product.nombre,
      categoria: product.categoria,
      localizacion: product.localizacion,
      precio: product.precio
    });
  }

  //Metodo Eliminar producto
  deleteProduct( $key: string ){
    //el metodo "remove()" recibe como parametro el id/llave del objeto
    this.productList.remove( $key );
  }

}
