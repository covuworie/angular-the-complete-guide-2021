import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIndex: number;
  editedIngredient: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe((state) => {
      if (state.editedIngredientId < 0) {
        this.editMode = false;
        return;
      }
      this.editMode = true;
      this.editedIngredient = state.editedIngredient;
      this.editForm.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount,
      });
    });
  }

  public onSubmit() {
    const value = this.editForm.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          id: this.editedIndex,
          ingredient: ingredient,
        })
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredients([ingredient]));
    }
    this.editMode = false;
    this.editForm.reset();
  }

  public onClear() {
    this.editForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  public onDelete() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient(this.editedIndex)
    );
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
