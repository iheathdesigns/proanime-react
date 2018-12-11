import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow';
import $ from 'jquery';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}



        this.performSearch()

    }

    performSearch(searchTerm) {
        const urlString = "https://api.themoviedb.org/3/search/movie?api_key=b68daccda2c03407f737794f0b9ba16c&language=en-US&page=1&include_adult=false&query=" + searchTerm
        $.ajax({
            url: urlString,
            success: (searchResults) => {
                const results = searchResults.results

                const movieRows = []

                results.forEach((movie) => {
                    movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
                    const movieRow = <MovieRow key={movie.id} movie={movie}/>
                    movieRows.push(movie)
                })

                this.setState({rows: movieRows})

            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data");
            }
        })
    }
    searchChangeHandler = (event) => {
        this.performSearch(event.target.value);
    }

  render() {
    return (
      <div>

        <table className="topNav">
            <tbody>
                <tr>
                    <td>
                    <img alt="app logo" width="100" src="proanime-logo.svg"/>
                    </td>
                    <td width="8">
                    <h2>v1.2</h2>
                    </td>
                </tr>
            </tbody>
        </table>

        <input className="mainInput" onChange={this.searchChangeHandler} placeholder="Search for Movies"/>
        
        <row key={this.state.rows}/>

      </div>
    );
  }
}

export default App;
