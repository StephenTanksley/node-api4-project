import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdate from './Movies/MovieUpdate';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  //I'm gonna need a movie and the ability to set a movie in child components,
  //so I am going to declare this state in the higher level component.
  const [movie, setMovie] = useState({})

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList 
        list={savedList} 
        />

      <Route 
        exact path="/" 
        component={MovieList} 
        />

      <Route
        exact path="/movies/:id"
        render={props => {
          return <Movie 
                  {...props} 
                  addToSavedList={addToSavedList}
                  setMovie={setMovie} 
                  />;
                }}
              />

      {/* In order to update a movie, we're gonna want the props movie and setMovie */}  
      
      <Route
        exact path="/update-movie/:id"
        render={props => {
          return <MovieUpdate 
                  {...props} 
                  movie={movie}
                  setMovie={setMovie} /> 
                }}
      />
    </>
  );
};

export default App;
