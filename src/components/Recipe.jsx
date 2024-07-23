import React from 'react'
import './Recipe-style.css'


function Recipe() {
 
 
  return (
    <>
      <div className="container">
        <div className="search-container">
          <input type="text" placeholder="Type A Dish name here..." id="user-inp" />
          <button id="search-btn">Search</button>
        </div>
        <div id="result" />
      </div>
    </>
  )
}

export default Recipe
