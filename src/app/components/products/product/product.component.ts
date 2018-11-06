import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor( private _productServices: ProductService,
               private _toastrServices: ToastrService ) {
     
   }

  ngOnInit() {
    //traer todos los datos de firebase y crear el arreglo dentro del servicio
    this._productServices.getProducts();
    //console.log(this._productServices.getProducts());
    this.resetForm();
  }

  //enviamos los datos
  onSubmit( productForm: NgForm ){
    //miramos que vamos a mandar
    console.log(productForm)

    try {

      if( productForm.value.$key != null ){
        // agregamos el producto a nuestro arreglo
        //this._productServices.updateProduct( this._productServices.selectedProduct );
        this._productServices.updateProduct( productForm.value );      
        this._toastrServices.success("Operación exitosa", "Producto Actualizado.");
      }
        else{
        //this._productServices.insertProduct( this._productServices.selectedProduct );      
        this._productServices.insertProduct( productForm.value );
        this._toastrServices.success("Operación exitosa", "Producto Agregado.");
      }
    } catch (error) {
      this._toastrServices.error("Ha ocurrido un error en la conexión.", "Fallo completar tu solicitud");
      console.log(error);
    }

    //reseteamos el formulario
    this.resetForm( productForm );

  }

  //Reseteamos el formulario
  resetForm(productForm?: NgForm){
    
    if(productForm != null)
      //reseteamos el formulario
      productForm.reset();
      //instanciamos nuevamente la clase para vaciar los valores del objeto "selectedProduct"
      this._productServices.selectedProduct = new Product();

  }

}
