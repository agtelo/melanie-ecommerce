// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "../css/app.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import axios from "axios";
import Swal from "sweetalert2";
import { React, useEffect, useState } from "react";

export default function Slider(props) {
	const [moviesList, setMoviesList] = useState([]);

	const { addOrRemoveFavs } = props;

	useEffect(() => {
		const endPoint =
			"https://api.themoviedb.org/3/trending/movie/week?api_key=773e3602a771f493c0a3c69faa880f68&language=es-ES";
		//"https://api.themoviedb.org/3/movie/upcoming?api_key=773e3602a771f493c0a3c69faa880f68&language=en-US&page=1";
		//"https://api.themoviedb.org/3/movie/latest?api_key=773e3602a771f493c0a3c69faa880f68&language=en-US";
		//"https://api.themoviedb.org/3/movie/popular?api_key=773e3602a771f493c0a3c69faa880f68&language=en-US&page=1";
		//"https://api.themoviedb.org/3/movie/top_rated?api_key=773e3602a771f493c0a3c69faa880f68&language=en-US&page=1");
		axios
			.get(endPoint)
			.then((res) => {
				const apiData = res.data;
				setTimeout(() => {
					setMoviesList(apiData.results);
				});
			})
			.catch((error) => {
				Swal.fire({
					title: "Error!",
					text: [error.message],
					icon: "warning",
					confirmButtonText: "OK",
				});
				console.log(error);
			});
	}, [setMoviesList]);

	return (
		<>
			<h2 className="text-light mb-4 mt-5">Trending</h2>
			<Swiper
				className="swiper-slider"
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={30}
				slidesPerView={5}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
			>
				{moviesList.map((oneMovie) => (
					<>
						<SwiperSlide>
							<>
								<div className="animate__animated animate__fadeIn">
									<div className="card-movie-slider border-0">
										<img
											src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
											className="card-img-top"
											alt="..."
											height={350}
										/>
										<Link
											to={`/movie-detail?movieID=${oneMovie.id}`}
											className="detail-btn"
										>
											Detalle
										</Link>
									</div>
									<p className="rate-star fw-lighter text-warning">
										<i className="bi bi-star m-2"></i>
										{Math.round(oneMovie.vote_average) + "/10"}
									</p>
									<p className="realese-date text-light">
										{oneMovie.release_date
											? oneMovie.release_date
											: oneMovie.first_date_air}
									</p>
									<button
										className="favorite-btn"
										onClick={addOrRemoveFavs}
										data-movie-id={oneMovie.id}
									>
										<i className="bi bi-bookmark-star-fill"></i>
									</button>

									<div className="card-body">
										<h5 className="card-title text-light fs-6 fw-boldr mb-1">
											{oneMovie.name ? oneMovie.name : oneMovie.title}
										</h5>
									</div>
								</div>
							</>
						</SwiperSlide>
					</>
				))}
			</Swiper>
		</>
	);
}
