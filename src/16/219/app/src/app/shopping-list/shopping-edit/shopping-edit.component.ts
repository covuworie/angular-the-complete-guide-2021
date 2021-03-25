import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  public onAdd() {
    const value = this.editForm.value;
    const ingredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredients([ingredient]);
  }
}
