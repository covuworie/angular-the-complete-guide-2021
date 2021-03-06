import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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

  get ingredient() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(''),
        amount: new FormControl(''),
      })
    );
  }

  private initForm() {
    const recipe = this.recipeService.getRecipe(this.id);
    let recipeIngredients = new FormArray([]);
    if (this.editMode && recipe.ingredients) {
      for (let ingredient of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name),
            amount: new FormControl(ingredient.amount),
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(this.editMode ? recipe.name : ''),
      imagePath: new FormControl(this.editMode ? recipe.imagePath : ''),
      description: new FormControl(this.editMode ? recipe.description : ''),
      ingredients: recipeIngredients,
    });
  }
}
