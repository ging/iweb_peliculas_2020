import { combineReducers } from 'redux';   

function peliculasReducer(state = [], action) {
  switch (action.type) {
    case "UPDATE":
      return state.map((movie, index) => action.index === index ? action.movie : movie);
    case "CREATE":
      return [...state, action.movie];
    case "DELETE":
      return state.filter((movie, index) => index !== action.index);
    default:
      return state
  }
}


function currentReducer(state = null, action) {
  switch (action.type) {
    case "SHOW":
    case "EDIT":
      return action.index
    case "MAIN":
    case "UPDATE":
    case "NEW":
    case "CREATE":
    case "DELETE":
      return null;
    default:
      return state
  }
}


function viewReducer(state = null, action) {
  switch (action.type) {
    case "SHOW":
    case "EDIT":
    case "NEW":
      return action.type;
    case "MAIN":
    case "UPDATE":
    case "CREATE":
    case "DELETE":
      return null;
    default:
      return state
  }
}

const GlobalState = combineReducers({ 
  peliculas: peliculasReducer,  
  current: currentReducer,
  view: viewReducer
});

export default GlobalState;

