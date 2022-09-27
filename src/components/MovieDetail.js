import { React, Navigate, useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

export default function MovieDetail(props) {
	let query = new URLSearchParams(window.location.search);
	let movieID = query.get("movieID");

	const token = sessionStorage.getItem("token");
	const [movie, setMovie] = useState(null);
	const [isLoading, setisLoading] = useState(false);

	useEffect(() => {
		const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=773e3602a771f493c0a3c69faa880f68&language=es-ES`;
		setisLoading(true);
		axios
			.get(endPoint)
			.then((response) => {
				const movieData = response.data;

				setTimeout(() => {
					setMovie(movieData);
					setisLoading(false);
				}, 1000);
			})
			.catch((error) => {
				console.log(error);
				setisLoading(false);
			});
	}, [movieID]);

	return (
		<>
			{!token && <Navigate to="/" />}
			{isLoading && <Loading />}
			{movie && (
				<>
					<div className="d-flex justify-content-center">
						<div className="card mb-3 border-0 mt-5 mb-5">
							<div className="row g-0">
								<div className="col-md-4">
									<img
										src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
										className="img-fluid rounded-start w-100 h-100"
										alt="..."
									/>
								</div>
								<div className="col-md-8">
									<div className="card-body h-100">
										<h5 className="card-title mt-5 fs-1 text-light">
											{movie.title}
										</h5>
										<div className="d-flex">
											{movie.genres.map((oneGenre) => (
												<p
													className="card-text text-secondary mt-1 me-2"
													key={oneGenre.id}
												>
													{oneGenre.name}
												</p>
											))}
										</div>
										<div className="d-flex">
											<p className="card-text text-warning fw-light fs-3">
												{movie.vote_average.toString().substring(0, 3)}
											</p>
											<p className="card-text ms-4 mt-2 ">
												<small className="text-muted">
													{movie.release_date}
												</small>
											</p>
											<p className="card-text ms-4 mt-2">
												<small className="text-muted">
													{movie.runtime} min
												</small>
											</p>
										</div>
										<p className="card-text-detail fs-5 fw-lighter text-light">
											{movie.overview}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
