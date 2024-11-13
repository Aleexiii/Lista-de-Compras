import { Component } from '@angular/core';
import { ListComponent } from "../features/list/list.component";
import { PurchasedComponent } from "../features/purchased/purchased.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [ListComponent, PurchasedComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {

}
