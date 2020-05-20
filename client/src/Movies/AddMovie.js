import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const initialMovie ={
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const AddMovie = ({ getMovieList }) => {
  const [ movie, setMovie ] = useState(initialMovie);
  const history = useHistory();
  const { id } = useParams();

  const handleInput = e => {
    e.persist();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then(res => {
        console.log('POST request for adding a movie', res);
        getMovieList();
        history.push(`/`);
      })
      .catch(err => console.log(err));

    setMovie(initialMovie)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type='text'
            name='title'
            value={movie.title}
            placeholder='Title'
            onChange={handleInput}
          />
        </label>

        <label>
          <input
            type='text'
            name='director'
            value={movie.director}
            placeholder='Director'
            onChange={handleInput}
          />
        </label>

        <label>
          <input
            type='number'
            name='metascore'
            value={movie.metascore}
            placeholder='Metascore'
            onChange={handleInput}
          />
        </label>

        <label>
          <input
            type='text'
            name='stars'
            value={movie.stars}
            placeholder='Stars'
            onChange={handleInput}
            multiple
          />
        </label>

        <button onSubmit={handleSubmit}>Add</button>
      </form>
    </div>
  )
}

export default AddMovie;