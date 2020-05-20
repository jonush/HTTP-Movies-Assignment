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
  const [ newStar, setNewStar ] = useState('');
  const history = useHistory();

  const handleInput = e => {
    e.persist();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    })
  }

  const handleStar = e => {
    setNewStar(e.target.value)
  }

  const addStar = e => {
    setMovie({
      ...movie,
      stars: [...movie.stars, newStar]
    })
    setNewStar('');
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
    <div className='addMovie'>
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
            value={newStar}
            placeholder='Stars'
            onChange={handleStar}
            multiple
          />
        </label>
        <button onSubmit={handleSubmit}>Add Movie</button>
      </form>
      <button className='addStar' onClick={addStar}>Add Star</button>
    </div>
  )
}

export default AddMovie;