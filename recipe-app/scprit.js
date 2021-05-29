
const favMealsUL = document.getElementById("favMeals");

//Get Fav Meals
showFavMeal();
//Get random meal 
getRandomMeal();

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    const respData = await resp.json();

    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

//Get Meal By Id
async function getMealById(id) {
    const meal = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);

    const mealData = await meal.json();
    console.log(mealData)
    return mealData;
}

//Get Meals By Search
function getMealsBySearch(term) {
    fetch('www.themealdb.com/api/json/v1/1/search.php?s=' + term);
}

function addMeal(randomMeal, random = true) {

    const recipeBody = document.getElementById("recipeBody");
    const meal = document.createElement("div");
    meal.classList.add("meal-container");

    meal.innerHTML = `
    ${random ?
            `<span class="meal-text">Random Recipe</span>` :
            ""}
    
    <img src="${randomMeal.strMealThumb}" alt="${randomMeal.strMeal}">
    <div class="meal-body">
        <div>${randomMeal.strMeal}</div>

       <button class="fav-btn" >
        <i class="fas fa-heart"></i></button>

    </div>
    `;


    recipeBody.appendChild(meal);

    const btn = recipeBody.querySelector(".fav-btn");

    btn.addEventListener('click', () => {
        //check if the heart button is active
        const heart_btn = btn.classList.contains('active');

        //check is the button is active remove from Local Storage
        if (heart_btn) {
            btn.classList.remove("active");
            removeMealLS(randomMeal.idMeal);
        }
        else {
            btn.classList.add("active");
            //console.log(randomMeal);
            addMealLs(randomMeal.idMeal);
        }

        //if button is not active add to local Storage
    })

}

//add meal id to local storage
function addMealLs(mealId) {

    //get the already existing arry from the local Storage
    const mealIds = getMealLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
    showFavMeal();
}

//remove meal from local Storage
function removeMealLS(mealId) {

    console.log("Remove Meal:" + mealId);
    const mealIds = getMealLS();

    const result = mealIds.filter(id => {
        console.log(id != mealId)
        return id != mealId;
    });

    console.log(result);
    localStorage.setItem("mealIds", JSON.stringify(result));

    showFavMeal();
}

//Get meal form the local Storage
function getMealLS(mealId) {

    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}

//Show the fav meal dynamically
async function showFavMeal() {

    //Clear the initial data
    favMealsUL.innerHTML = "";

    const mealIds = getMealLS();

    console.log("Show Meals:" + mealIds);

    for (var id = 0; id < mealIds.length; id++) {

        const mealObject = await getMealById(mealIds[id]);
        const meal = mealObject.meals[0];
        const favList = addMealToFav(meal);


    };
}

function addMealToFav(meal) {

    const favList = document.createElement("li");
    favList.classList.add('favMealsList');


    favList.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <span id="favText">${meal.strMeal}</span>
        <button class="btn-close" id="${meal.idMeal}" onclick="removeMealLS(${meal.idMeal})"><i class="fas fa-window-close"></i></button>`;




    favMealsUL.appendChild(favList);
    // const btnClose = document.querySelector(".btn-close");
    // btnClose.addEventListener('click', () => {

    //     // removeMealLS()
    // })
}

function showRecipeDetail() {
    //Get Element by Id
    const displayModel = document.getElementById("display-recipe");

    if (displayModel.classList.contains("hidden")) {
        displayModel.classList.remove("hidden");
    }
}

function closeModel() {
    const displayModel = document.getElementById("display-recipe");

    displayModel.classList.add("hidden");
}