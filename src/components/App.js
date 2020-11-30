import React from "react";
import { connect } from 'react-redux';
import Navbar from "./Navbar";
import Movies from "./Movies";
import MovieInfo from "./MovieInfo";
import MovieForm from "./MovieForm";
import {showMovie, editMovie, updateMovie, createMovie, deleteMovie, newMovie, main} from "../redux/actions";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.show = this.show.bind(this);
		this.edit = this.edit.bind(this);
		this.update = this.update.bind(this);
		this.erase = this.erase.bind(this);
		this.newm = this.newm.bind(this);
		this.create = this.create.bind(this);
		this.main = this.main.bind(this);
	}
	render(){
		const {current, peliculas, view} = this.props;
		const peliculaSeleccionada = (typeof current === "number") && current >= 0;

	  	return (
	    <div className="root">
	      <Navbar/>
	      {(!peliculaSeleccionada && !view) ?  
	      	<Movies    peliculas={peliculas} show={this.show} edit={this.edit} newMovie={this.newm} delete={this.erase}/> : null}
	      {(peliculaSeleccionada && view === "SHOW") ? 
	      	<MovieInfo pelicula={peliculas[current]} main={this.main}/> : null}
	   	  {(peliculaSeleccionada && view === "EDIT") ? 
	   	  	<MovieForm pelicula={peliculas[current]} main={this.main} update={this.update}/> : null}
	   	  {(!peliculaSeleccionada && view === "NEW") ? 
	   	  	<MovieForm pelicula={{}} main={this.main} create={this.create} new/> : null}
	    </div>
	  );
	}

	show(index){
		this.props.dispatch(showMovie(index));
	}

	main(){
		this.props.dispatch(main());
	}

	edit(index){
		this.props.dispatch(editMovie(index));
	}

	update(movie){
		this.props.dispatch(updateMovie(this.props.current, movie));
	}

	erase(index){
		this.props.dispatch(deleteMovie(index));
	}	

	newm(movie){
		this.props.dispatch(newMovie(movie));
	}	

	create(movie) {
		this.props.dispatch(createMovie(movie));
	}


}

function mapStateToProps(state) {
  return {
    ...state
  };
}


export default connect(mapStateToProps)(App);

