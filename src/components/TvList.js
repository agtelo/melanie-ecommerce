import { React, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Loading from "./Loading";

import "../css/app.css";

export default function TvList(props) {
	const [moviesList, setMoviesList] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const { addOrRemoveFavs } = props;
	const token = sessionStorage.getItem("token");

	useEffect(() => {
		const endPoint =
			"https://api.themoviedb.org/3/discover/tv?api_key=773e3602a771f493c0a3c69faa880f68&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0";
		setisLoading(true);
		axios
			.get(endPoint)
			.then((res) => {
				const apiData = res.data;
				setTimeout(() => {
					setMoviesList(apiData.results);
					setisLoading(false);
				}, 500);
			})
			.catch((error) => {
				Swal.fire({
					title: "Error!",
					text: [error.message],
					icon: "warning",
					confirmButtonText: "OK",
				});
				console.log(error);
				setisLoading(false);
			});
	}, [setMoviesList]);

	return (
		<>
			{!token && <Navigate to="/" />}
			<div className="row mt-5">
				{isLoading ? (
					<Loading />
				) : (
					<>
						<h2 className="text-light">Ultimos Estrenos</h2>
						{moviesList.map((movie, idx) => {
							const { id, name, poster_path, first_air_date, vote_average } =
								movie;

							return (
								<>
									<div
										className="col-3 animate__animated animate__fadeIn"
										key={idx}
									>
										<div className="card card-movie-list border-0 mt-2 mb-3 ">
											<img
												src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
												className="card-img-top"
												alt="..."
												height="500"
											/>

											<div className="col-6 justify-content-start">
												<Link
													to={`/movie-detail?movieID=${id}`}
													className="detail-btn"
												>
													Detalle
												</Link>
											</div>
											<p className="rate-star fw-lighter text-warning">
												<i className="bi bi-star m-2"></i>
												{Math.round(vote_average) + "/10"}
											</p>
											<div className="realese-date text-light">
												{first_air_date.substring(0, 4)}
											</div>
											<button
												className="favorite-btn"
												onClick={addOrRemoveFavs}
												data-movie-id={id}
											>
												<i className="bi bi-bookmark-star-fill"></i>
											</button>
											<div className="card-body">
												<h5 className="card-title text-light fs-6 fw-bolder">
													{name.substring(0, 30)}
												</h5>
											</div>
										</div>
									</div>
								</>
							);
						})}
					</>
				)}
			</div>
		</>
	);
}
