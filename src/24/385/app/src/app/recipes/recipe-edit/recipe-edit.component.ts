import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id?: number;
  editMode = false;
  recipeForm: FormGroup;

  private storeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.id = +params['id'];
      }
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new RecipesActions.UpdateRecipe(
          this.id,
          this.recipeForm.value as Recipe
        )
      );
    } else {
      this.store.dispatch(
        new RecipesActions.AddRecipe(this.recipeForm.value as Recipe)
      );
    }
    this.onCancel();
  }

  onAddIngredient() {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [Validators.required, Validators.min(1)]),
      })
    );
  }

  onDeleteIngredient(id: number) {
    this.ingredients.removeAt(id);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    this.storeSubscription = this.store
      .select('recipes')
      .pipe(map((recipeState) => recipeState.recipes[this.id]))
      .subscribe((recipe) => {
        let recipeIngredients = new FormArray([]);
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.min(1),
              ]),
            })
          );
        }
        this.recipeForm = new FormGroup({
          name: new FormControl(
            this.editMode ? recipe.name : '',
            Validators.required
          ),
          imagePath: new FormControl(
            this.editMode ? recipe.imagePath : '',
            Validators.required
          ),
          description: new FormControl(
            this.editMode ? recipe.description : '',
            Validators.required
          ),
          ingredients: recipeIngredients,
        });
      });
  }
}
