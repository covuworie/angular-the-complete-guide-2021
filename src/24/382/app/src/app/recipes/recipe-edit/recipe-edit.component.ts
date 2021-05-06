import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id?: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
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

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value as Recipe);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value as Recipe);
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
    this.store
      .select('recipes')
      .pipe(map((recipeState) => recipeState.recipes[this.id]))
      .subscribe((recipe) => {
        let recipeIngredients = new FormArray([]);
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
