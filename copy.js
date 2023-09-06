// global variables
const formEl = document.getElementById("my-form"); // Reference to the form element
const formText = document.getElementById("text-input"); // Reference to the pizza name input element
const formDescription = document.getElementById("description-input"); // Reference to the pizza description input element
const myPizzaContainer = document.getElementById("pizza-list"); // Reference to the container element to display pizzas
const localStorageKey = "pizzaStorage"; // Key for storing data in local storage

let pizzaArray = JSON.parse(localStorage.getItem(localStorageKey)) || []; // Array to store pizza data retrieved from local storage or empty array if no data exists

// Loop through the pizzaArray and create pizza elements on page load
pizzaArray.forEach((pizzaItem) =>
  createPizzaArray(
    pizzaItem.name,
    pizzaItem.descText,
    pizzaItem.id,
    pizzaItem.ingredients
  )
);

// Function to add a new pizza
function addPizza(text, descText) {
  const pizzaId = Date.now(); // Generate a unique pizza ID based on the current timestamp

  const pizza = {
    name: text,
    descText: descText,
    id: pizzaId,
    ingredients: [], // Initialize an empty array to store the pizza ingredients
  };

  pizzaArray.push(pizza); // Add the new pizza to the pizzaArray
  updateLocalStorage(); // Update the local storage with the updated pizzaArray data

  createPizzaArray(text, descText, pizzaId); // Create a pizza element on the page
}

// Function to add ingredients to a pizza
function addIngredients(text, pizzaId) {
  const ingredientsId = Date.now(); // Generate a unique ingredient ID based on the current timestamp

  const ingredient = {
    myIngredients: text,
    id: ingredientsId,
  };

  const pizza = pizzaArray.find((pizza) => pizza.id === pizzaId); // Find the corresponding pizza object in the pizzaArray
  pizza.ingredients.push(ingredient); // Add the new ingredient to the ingredientsArray of the corresponding pizza
  updateLocalStorage(); // Update the local storage with the updated pizzaArray data

  createIngredientsArray(pizzaId); // Create an ingredient element on the page
}

// Function to create the ingredient element on the page
function createIngredientsArray(pizzaId) {
  const pizza = pizzaArray.find((pizza) => pizza.id === pizzaId); // Find the corresponding pizza object in the pizzaArray
  const ingredientsContainer = document.getElementById(
    `ingredients-container-${pizzaId}`
  ); // Get the container element for displaying ingredients

  // Clear the previous list of ingredients and recreate it based on the updated ingredients array
  ingredientsContainer.innerHTML = ""; // Clear the container

  const ul = document.createElement("ul"); // Create a new ul element for the list of ingredients
  pizza.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient.myIngredients;
    ul.appendChild(li);
  });

  ingredientsContainer.appendChild(ul); // Append the updated list to the container
}

//######################################################################################################################
// Adding
//######################################################################################################################

// Function to create the pizza element on the page
function createPizzaArray(text, descText, pizzaId) {
  const container = document.createElement("div"); // Create a container div for the pizza
  container.style = "display: block;";

  const pizzaHeader = document.createElement("h2"); // Create an h2 element for the pizza name
  pizzaHeader.textContent = text;

  const paragraph = document.createElement("p"); // Create a p element for the pizza description
  paragraph.textContent = descText;

  const button = document.createElement("button"); // Create a button element to remove the pizza
  button.textContent = "Remove pizza";
  button.addEventListener("click", () => removePizza(container, pizzaId));

  const ingredientsContainer = document.createElement("div"); // Create a container div for displaying ingredients
  ingredientsContainer.style = "display: flex;";
  ingredientsContainer.id = `ingredients-container-${pizzaId}`;

  const ingredientsInput = document.createElement("input"); // Create an input element for adding ingredients
  ingredientsInput.placeholder = "Add ingredient";

  const addIngredientsButton = document.createElement("button"); // Create a button element to add ingredients
  addIngredientsButton.textContent = "+";
  addIngredientsButton.addEventListener("click", () =>
    handleAddIngredient(ingredientsInput, pizzaId)
  );

  container.append(pizzaHeader, paragraph, button, ingredientsContainer); // Append the elements to the container
  ingredientsContainer.append(ingredientsInput, addIngredientsButton);
  myPizzaContainer.appendChild(container); // Append the container to the pizza list container
}

//######################################################################################################################

// Function to handle adding an ingredient
function handleAddIngredient(inputEl, pizzaId) {
  const text = inputEl.value.trim(); // Get the trimmed value of the input field
  if (text === "") return; // If the input is empty, do nothing

  const pizza = pizzaArray.find((pizza) => pizza.id === pizzaId); // Find the corresponding pizza object in the pizzaArray
  addIngredients(text, pizza.ingredients, pizzaId); // Add the ingredient to the pizza
  inputEl.value = ""; // Clear the input field
  updateLocalStorage(); // Update the local storage with the updated pizzaArray data
}

// Function to remove a pizza from the page and pizzaArray
function removePizza(element, pizzaId) {
  pizzaArray = pizzaArray.filter((pizza) => pizza.id !== pizzaId); // Filter out the pizza with the given pizzaId from the pizzaArray
  updateLocalStorage(); // Update the local storage with the updated pizzaArray data
  element.remove(); // Remove the pizza element from the page
}

// Function to handle form submission
function handleForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  if (formText.value.length < 3 || formDescription.value.length < 3) return; // If the pizza name or description is less than 3 characters, do nothing

  addPizza(formText.value, formDescription.value); // Add a new pizza with the given name and description
  formText.value = ""; // Clear the pizza name input field
  formDescription.value = ""; // Clear the pizza description input field
  updateLocalStorage(); // Update local storage with the updated pizzaArray data
}

//
// ikke rør dette
// #######################################################

// Function to update the local storage with the current pizzaArray data
function updateLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(pizzaArray));
}

formEl.addEventListener("submit", handleForm); // Attach the handleForm function to the form's submit event
