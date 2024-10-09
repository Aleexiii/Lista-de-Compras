import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCheckboxModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  encapsulation: ViewEncapsulation.None
})
  
export class ListComponent {

  products: any[] = [];

  productsService = inject(ProductsService);

  showInput: boolean = false;
  showButton: boolean = true;
  showList: boolean = true;
  showEdit: boolean = false;
  newProductName: string = '';
  selectedProduct: any;

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  toggleInput() {
    this.showInput = !this.showInput;
    this.showButton = !this.showButton;
  }

  toggleEdit() {
    this.showEdit = !this.showEdit;
    this.showList = !this.showList;
  }

  formAdd = new FormGroup({
    newProductName: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  formEdit = new FormGroup({
    updatedProductName: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  addProduct() {
    if (this.formAdd.valid) {
      this.productsService.post({
        name: this.formAdd.controls.newProductName.value,
        selected: false
      })
      .subscribe(() => {
        this.productsService.getAll().subscribe((products) => {
          this.products = products;
        });
      });
      
      this.toggleInput();

      this.formAdd.reset();
    }
  }

  prepareEdit(product: any) {
    this.selectedProduct = product;
    this.formEdit.controls.updatedProductName.setValue(product.name);
    this.toggleEdit();
  }

  updateProduct() {
    if (this.formEdit.valid && this.selectedProduct) {
      this.productsService
        .put(this.selectedProduct.id, {
          name: this.formEdit.controls.updatedProductName.value,
          selected: false
        })
        .subscribe(() => {
          this.productsService.getAll().subscribe((products) => {
            this.products = products;
          });
        });
    }

    this.toggleEdit();

    this.formEdit.reset();
  }
  
  removeProduct(id: number) {
    this.productsService.delete(id).subscribe(() => {
      this.productsService.getAll().subscribe((products) => {
        this.products = products;
      });
    });
  }

  moveToPurchased(product: Product) { 

    if (product.selected) {
      this.productsService.put(
        product.id,
        { ...product, selected: true })
        .subscribe(() => {
          this.productsService.getAll().subscribe((products) => {
            this.products = products;
          });
        } 
      );
    } else {
      this.productsService.put(
        product.id,
        { ...product, selected: false })
        .subscribe(() => {
          this.productsService.getAll().subscribe((products) => {
            this.products = products;
          });
        } 
      );
    }
  }
}
