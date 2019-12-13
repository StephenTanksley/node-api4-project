import React, {useState} from 'react'
import axios from 'axios'
// import { axiosUpdate } from '../utils/api';

const MovieUpdate = ({movie, setMovie, history}) => {
    const [updatedMovie, setUpdatedMovie] = useState({
        id:'',
        title: '',
        director:'',
        metascore:'',
        stars:''
    })
    const { id, title, director, metascore, stars } = movie

    const handleChange = (e) => {
        //because there can be multiple stars, we want to provide logic for that.
        if(e.target.name === 'stars'){
            setUpdatedMovie({
                ...updatedMovie,
                stars: e.target.value
            })
        } else {
            //if we're updating anything else, we don't need to specify an individual item, so we can choose [name]:value
            setUpdatedMovie({
                ...updatedMovie,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(updatedMovie)
        axios.put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
        .then(response => {
            console.log(response)
            setMovie({})
            history.push('/')    
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="update-form">
        {/* //building out a form to handle changes to a movie. */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder={title}
                    value={updatedMovie.title}
                    onChange={handleChange}
                    />

                <input
                    type="text"
                    name="director"
                    placeholder={director}
                    value={updatedMovie.director}
                    onChange={handleChange}
                    />

                <input
                    type="text"
                    name="metascore"
                    placeholder={metascore}
                    value={updatedMovie.metascore}
                    onChange={handleChange}
                    />
                
                <input
                    type="text"
                    name="stars"
                    placeholder={stars}
                    value={updatedMovie.stars}
                    onChange={handleChange}
                    />
                    <button type="submit">Update!</button>
            </form>
        </div>
    )


}

export default MovieUpdate;