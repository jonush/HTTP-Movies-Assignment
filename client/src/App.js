import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import AddMovie from './Movies/AddMovie';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route
        exact
        path="/"
        render={props => <MovieList {...props} movies={movieList} setMovies={setMovieList} />}
      />

      <Route
        path="/movies/:id"
        render={props => <Movie {...props}  getMovieList={getMovieList}setMovies={setMovieList} addToSavedList={addToSavedList}/>}
      />

      <Route
        path='/update-movie/:id'
        render={() => <UpdateMovie getMovieList={getMovieList} movies={movieList} setMovies={setMovieList} /> }
      />

      <Route 
        path='/add-movie'
        render={props => <AddMovie {...props} getMovieList={getMovieList} movies={movieList} />}
      />
    </>
  );
};

export default App;
