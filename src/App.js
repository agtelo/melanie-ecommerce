import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import LoginScreen from "./components/LoginScreen";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieDetail from "./components/MovieDetail";
import SearchResults from "./components/SearchResults";
import Favorites from "./components/Favorites";
import NotFound from "./components/NotFound";
import TvList from "./components/TvList";

import "./css/app.css";

function App() {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		const favsInLocal = localStorage.getItem("favs");

		if (favsInLocal !== null) {
			const favsArray = JSON.parse(favsInLocal);
			setFavorites(favsArray);
		}
	}, [setFavorites]);

	const addOrRemoveFavs = (e) => {
		const favsMovies = localStorage.getItem("favs");

		let tempMoviesInFavs;

		if (favsMovies === null) {
			tempMoviesInFavs = [];
		} else {
			tempMoviesInFavs = JSON.parse(favsMovies);
		}
		const btn = e.currentTarget;
		const parent = btn.parentElement;
		const imgURL = parent.querySelector("img").getAttribute("src");
		const title = parent.querySelector("h5").innerText;

		const movieData = {
			imgURL,
			title,
			id: btn.dataset.movieId,
		};

		let movieIsInArray = tempMoviesInFavs.find((oneMovie) => {
			return oneMovie.id === movieData.id;
		});

		if (!movieIsInArray) {
			tempMoviesInFavs.push(movieData);
			localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
			setFavorites(tempMoviesInFavs);
			console.log("se agrego la pelicula");
		} else {
			let moviesLeft = tempMoviesInFavs.filter((oneMovie) => {
				return oneMovie.id !== movieData.id;
			});
			localStorage.setItem("favs", JSON.stringify(moviesLeft));
			setFavorites(moviesLeft);
			console.log("se elimino la pelicula");
		}
	};
	return (
		<>
			<Header favorites={favorites} />
			<div className="container mt-5">
				<Routes>
					<Route path="*" element={<NotFound />}></Route>
					<Route exact path="/" element={<LoginScreen />} />
					<Route
						path="/movie-list"
						element={
							<MovieList
								favorites={favorites}
								addOrRemoveFavs={addOrRemoveFavs}
							/>
						}
					/>
					<Route
						path="/tv-list"
						element={
							<TvList favorites={favorites} addOrRemoveFavs={addOrRemoveFavs} />
						}
					/>
					<Route path="/movie-detail" element={<MovieDetail />} />
					<Route
						path="/search-results"
						element={<SearchResults addOrRemoveFavs={addOrRemoveFavs} />}
					/>
					<Route
						path="/favorites"
						element={
							<Favorites
								favorites={favorites}
								addOrRemoveFavs={addOrRemoveFavs}
							/>
						}
					/>
				</Routes>
			</div>

			<Footer />
		</>
	);
}

export default App;
