export function showMovie(index) {
	return {type: "SHOW", index};
}

export function main() {
	return {type: "MAIN"};
}

export function editMovie(index){
	return {type: "EDIT", index};
}

export function updateMovie(index, movie){
	return {type: "UPDATE", index, movie};
}

export function createMovie(movie){
	return {type: "CREATE", movie};
}

export function newMovie(){
	return {type: "NEW"};
}

export function deleteMovie(index){
	return {type: "DELETE", index};
}

export function saveMovies(movies){
	return {type: "SAVE", movies};
}
