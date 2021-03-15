import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name') name: ElementRef<HTMLInputElement>;
  @ViewChild('amount') amount: ElementRef<HTMLInputElement>;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  public onAdd() {
    const name = this.name.nativeElement.value;
    const amount = +this.amount.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredients([ingredient]);
  }
}
