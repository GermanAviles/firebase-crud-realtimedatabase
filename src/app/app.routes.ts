import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ProductsComponent } from './components/products/products.component';
//import { PageNotFoundComponent } from './';

const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'home', component: ProductsComponent },
    { path: '**', component: ProductsComponent },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class FeatureRoutingModule {}
/** 
 * Funciona sin poner el tipo de dato que sera nuestra constante 
 * export const appRouting = RouterModule.forRoot(routes);
*/
export const appRouting:ModuleWithProviders = RouterModule.forRoot(routes);
