
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { product } from '../models/product.datasource';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

   getProducts() : Product[] {
     return product;
   }
}

