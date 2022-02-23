//@ts-check
// App.js
import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import update from 'immutability-helper';
import $ from 'jquery';
import { render } from '@testing-library/react';

export default class App extends React.Component {
  state = {
    isAddRecipeFormDisplayed: false,
    recipes: [],
    newRecipeName: "",
    newRecipeInstructions: ""
  }
  
  handleRecipeNameChange = (event) => {
    const value = event.target.value;
  
    this.setState({newRecipeName: value});
  }


  handleRecipeInstructionsChange = (event) => {
    const value = event.target.value;
  
    this.setState({newRecipeInstructions: value});
  }


  toggleAddRecipeForm = () => {
    this.setState({isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed})

  }


  handleEdit() {
    alert('neat');
  }




  
  submitRecipe = (event) => {
    event.preventDefault()

    const temp = update(this.state.recipes, {$push: [
      {
        name: this.state.newRecipeName,
        instructions :this.state.newRecipeInstructions
      }
    ]})

    this.setState({recipes: temp})

    this.setState({newRecipeName: ''});
    this.setState({newRecipeInstructions: ''});

  }

    render(){
      const addNewRecipeForm = (
        <form id="recipe-form" onSubmit={this.submitRecipe}>
          <label htmlFor="newRecipeName">Recipe name: </label>
          <input type="text"
            name="newRecipeName"
            id="newRecipeName"
            onChange={this.handleRecipeNameChange}
            value={this.state.newRecipeName} />
          <label htmlFor="newRecipeInstructions">Instructions:</label>
          <textarea name="newRecipeInstructions"
            id="newRecipeInstructions"
            placeholder="write recipe instructions here..."
            onChange={this.handleRecipeInstructionsChange}
            value={this.state.newRecipeInstructions} />
          <input id='submit-recipe' type="Submit" value="Submit" />
          
        </form>
      )





      return (
        <div className="App">
          <img src="https://www.placecage.com/g/1000/500" className="img-fluid" alt="test"></img>
          <h1 className="App-header">My Recipes</h1>
          {
            this.state.isAddRecipeFormDisplayed
            ? addNewRecipeForm
            : <button id="add-recipe" onClick={this.toggleAddRecipeForm}>Add Recipe</button>
          }

          {
            this.state.recipes.length > 0 ?
            <ul id='cool-list'>
              {
                this.state.recipes.map((obj, key) => 
                  <RecipeButton obj={obj} key={key} handler={this.handleEdit()} />
                )
              }
            </ul> :
            <p>There are no recipes to list.</p>
          }

          






        </div>
      )
  }
}



function RecipeButton({ obj, key, handler }){

  return(
    <li key={key}>
    {/* <input type='button' value={obj.name} / > */}
    <button type="button" className="btn btn-secondary" data-bs-custom-class="sdi-tooltip" data-bs-toggle="tooltip" data-bs-placement="right" title={obj.instructions}>
      {obj.name}
    </button>
  </li>


  );
}
