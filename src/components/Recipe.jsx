import { useState } from 'react';
import './Recipe-style.css'


function Recipe() {
 
  const [userInp, setUserInp] = useState('');
  const [mealData, setMealData] = useState(null);
  const [error, setError] = useState('');

  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";


  const handleSearch = () => {
    if (userInp.length === 0) {
      setError("Input Field Can't be Empty");
      setMealData(null);
    } else {
      fetch(url + userInp)
        .then(response => response.json())
        .then(data => {
          if (data.meals) {
            setMealData(data.meals[0]);
            setError('');
          } else {
            setError("Invalid Input");
            setMealData(null);
          }
        })
        .catch(() => {
          setError("Invalid Input");
          setMealData(null);
        });
    }
  };


  return (
    <>
      <div className="container">
        <div className="search-container">
          <input
          type="text"
          id="user-inp"
          placeholder="Type A Dish name here..."
          value={userInp}
          onChange={(e) => setUserInp(e.target.value)}
          />
          {/* <input type="text"  id="user-inp" /> */}
          <button id="search-btn" onClick={handleSearch}>Search</button>
          {/* <button id="search-btn">Search</button> */}
        </div>
        {/* <div id="result" /> */}
          <div id="result">
            {error && <h3>{error}</h3>}
            {mealData && (
              <div>
                <img src={mealData.strMealThumb} alt={mealData.strMeal} />
                <div className="details">
                  <h2>{mealData.strMeal}</h2>
                  <h4>{mealData.strArea}</h4>
                </div>
                <div id="ingredient-con">
                  <ul>
                    {Object.keys(mealData)
                      .filter(key => key.startsWith("strIngredient") && mealData[key])
                      .map((key, index) => (
                        <li key={index}>
                          {mealData[`strMeasure${index + 1}`]} {mealData[key]}
                        </li>
                      ))}
                  </ul>
                </div>
                <div id="recipe" style={{ display: 'none' }}>
                  <button id="hide-recipe" onClick={() => {
                    document.getElementById('recipe').style.display = 'none';
                  }}>X</button>
                  <pre id="instructions">{mealData.strInstructions}</pre>
                </div>
                <button id="show-recipe" onClick={() => {
                  document.getElementById('recipe').style.display = 'block';
                }}>View Recipe</button>
              </div>
            )}
          </div>
      </div>
    </>
  )
}

export default Recipe
