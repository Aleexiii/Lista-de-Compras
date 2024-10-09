import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchased',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, ReactiveFormsModule],
  providers: [ProductsService],
  templateUrl: './purchased.component.html',
  styleUrl: './purchased.component.css'
})
  
export class PurchasedComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products.filter(product => product.selected); // Filtra apenas os comprados
    });
  }

  moveToNotPurchased(product: Product) {
    product.selected = !product.selected; 

    if (!product.selected) {
      this.productsService.put(product.id, { ...product, selected: false }).subscribe(() => {
        this.productsService.getAll().subscribe((products) => {
          this.products = products.filter(product => product.selected);
        });
      });
    }
  }
}
