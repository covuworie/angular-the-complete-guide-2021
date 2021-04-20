import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

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
    private recipeService: RecipeService
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
    const recipe = this.recipeService.getRecipe(this.id);
    let recipeIngredients = new FormArray([]);
    if (this.editMode && recipe.ingredients) {
      for (let ingredient of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              // No need for regex as Max does in the video
              // Validators.pattern(/^[1-9]+[0-9]*$/),
              Validators.min(1),
            ]),
          })
        );
      }
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
  }
}
