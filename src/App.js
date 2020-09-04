import React,{useEffect,useState} from 'react';
import Recipe from './Recipe'
import './App.css';


function App() {

  const APP_ID = '820e021d'
  const APP_KEY = 'ef9a7e57bb96be45cee7f034d36f75b0'
  const exampleReq =
    `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`


const [counter,setCounter]=useState(0)
const [recipes,setRecipes]=useState([])
const [search,setSearch]=useState("")

const[query,setQuery]=useState('chicken')


useEffect(()=>{
  console.log("Effect has been run")
  getRecipes()
},[query])
//empty array makes it run for one time when page gets rendered
//[counter] this makes use effect run every time counter changes
  
const getRecipes = async ()=>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
  const data = await response.json()
  console.log(data.hits)
  setRecipes(data.hits)

  //promise method
  // fetch('http')
  // .then(response=>{
  //   response.json
  // })
}

const updateSearch = e =>{
  setSearch(e.target.value)
  console.log(search)
}

const getSearch = e =>{
  e.preventDefault()
  setQuery(search)
  setSearch('')
}

return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit" >
          Search
      </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
       <Recipe 
       key={recipe.recipe.label}
       title={recipe.recipe.label} 
       calories={recipe.recipe.calories}
       image={recipe.recipe.image}
       ingredients={recipe.recipe.ingredients}
       /> 
      ))}
      </div>
    
<h1 onClick={()=>setCounter(counter+1)}>{counter}</h1>
    </div>
  );
}

export default App;
