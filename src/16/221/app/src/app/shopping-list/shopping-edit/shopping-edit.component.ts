import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm: NgForm;
  subscription: Subscription;
  editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (id: number) => {
        this.editedIngredient = this.shoppingListService.Ingredients[id];
        this.editForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount,
        });
      }
    );
  }

  public onAdd() {
    const value = this.editForm.value;
    const ingredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredients([ingredient]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
