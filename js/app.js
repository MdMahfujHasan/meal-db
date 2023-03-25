document.getElementById('btn-search').addEventListener('click', function () {
    const searchField = document.getElementById('search-text');
    const searchText = searchField.value;
    loadMeals(searchText);
    searchField.value = '';
})

const loadMeals = async searchText => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.meals);
        displayMeals(data.meals);
    }
    catch (error) {
        // console.log(error);
    }
}

const displayMeals = meals => {
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerText = '';
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('mb-3');
        div.innerHTML = `
            <div class="row g-4">
                <div class="col-12 col-md-6">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-12 col-md-6">
                    <div class="card-body">
                        <h5 class="card-title meal-title">${meal.strMeal}</h5>
                        <p class="card-text">Area: ${meal.strArea}</p>
                        <p class="card-text"><small class="text-body-secondary">Category: ${meal.strCategory}</small></p>
                        <p style="text-decoration: underline;" onclick="showMealDetails(${meal.idMeal})" type="button" class="text-warning font-weight-bold" data-bs-toggle="modal" data-bs-target="#mealDetails">
                        View Details</p>
                    </div>
                </div>
            </div>

        `;
        mealsContainer.appendChild(div);
    })
}

const showMealDetails = async idMeal => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.meals[0]);
        mealDetails(data.meals[0]);
    }
    catch (error) {
        // console.log(error);
    }
}

const mealDetails = meal => {
    const { strMeal, strCategory, strArea, strMealThumb, strInstructions, strTags, strYoutube } = meal;
    const mealName = document.getElementById('meal-name');
    mealName.innerText = strMeal;
    mealName.style.fontWeight = '700';
    document.getElementById('meal-modal').innerHTML = `
    <img class="img-fluid" src="${strMealThumb}" alt="meal image">
    <p><b>Category:</b> ${strCategory}</p>
    <p><b>Area:</b> ${strArea}</p>
    <p style="height: 200px; overflow-y: scroll;"><b>Instruction:</b> ${strInstructions}</p>
    <p><b>Tags:</b> ${strTags}</p>
    <p><b>Youtube:</b> <a style="text-decoration: none; color: black;" target="_blank" href="${strYoutube}">${strYoutube}</a>
    </p>
    `;
}