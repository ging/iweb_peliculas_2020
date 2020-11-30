import React from "react";
import { connect } from 'react-redux';
import Navbar from "./Navbar";
import Movies from "./Movies";
import MovieInfo from "./MovieInfo";
import MovieForm from "./MovieForm";
import {showMovie, editMovie, updateMovie, createMovie, deleteMovie, newMovie, saveMovies, main} from "../redux/actions";
import { misPeliculasIniciales } from "../constants/constants";
import {postAPI, getAPI, updateAPI} from "../api";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}


	render(){
		const {current, peliculas, view} = this.props;
		const peliculaSeleccionada = (typeof current === "number") && current >= 0;

	  	return (
	    <div className="root">
	      <Navbar/>
	      {this.state.loading ? <img src={process.env.PUBLIC_URL + "/spinner.gif"} className="spinner" alt="spinner" />: <div>
		      {(!peliculaSeleccionada && !view) ?  
		      	<Movies    peliculas={peliculas} show={this.show} edit={this.edit} newMovie={this.newm} delete={this.erase} download={this.download} upload={this.upload} reset={this.reset}/> : null}
		      {( peliculaSeleccionada && view === "SHOW") ? 
		      	<MovieInfo pelicula={peliculas[current]} main={this.main}/> : null}
		   	  {( peliculaSeleccionada && view === "EDIT") ? 
		   	  	<MovieForm pelicula={peliculas[current]} main={this.main} update={this.update}/> : null}
		   	  {(!peliculaSeleccionada && view === "NEW")  ? 
		   	  	<MovieForm pelicula={{}} main={this.main} create={this.create} new/> : null}
		   	 </div>}
	    </div>
	  );
	}

	show = (index) => {
		this.props.dispatch(showMovie(index));
	}

	main = () => {
		this.props.dispatch(main());
	}

	edit = (index) => {
		this.props.dispatch(editMovie(index));
	}

	update = (movie) => {
		this.props.dispatch(updateMovie(this.props.current, movie));
	}

	erase = (index) => {
		this.props.dispatch(deleteMovie(index));
	}	

	newm = (movie) => {
		this.props.dispatch(newMovie(movie));
	}	

	create = (movie)  => {
		this.props.dispatch(createMovie(movie));
	}

	download = async () => {
		let peliculas = await getAPI();
		this.props.dispatch(saveMovies(peliculas));
	}

	upload = async () => {
		await updateAPI(this.props.peliculas);
	}

	reset = () => {
		this.props.dispatch(saveMovies(misPeliculasIniciales));
	}

	async componentDidMount(){
		try {
			if (!localStorage.URL || localStorage.URL === "undefined") {
			    localStorage.URL = await postAPI(misPeliculasIniciales);
				this.props.dispatch(saveMovies(misPeliculasIniciales));
			} else {
				await this.download();
			}
			setTimeout(()=>{
				this.setState({loading: false});
			},2000);	
			
		} catch(e) {
			alert("ERROR");
		}

	}

}

function mapStateToProps(state) {
  return {
    ...state
  };
}


export default connect(mapStateToProps)(App);

