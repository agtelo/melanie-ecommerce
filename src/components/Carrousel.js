// Import Swiper React components
import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Autoplay,
	EffectFade,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "../css/app.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

import axios from "axios";
import Swal from "sweetalert2";
import { React, useEffect, useState } from "react";

export default function Carrousel(props) {
	const [moviesList, setMoviesList] = useState([]);

	useEffect(() => {
		const endPoint =
			"https://api.themoviedb.org/3/trending/all/week?api_key=773e3602a771f493c0a3c69faa880f68&language=es-ES";
		axios
			.get(endPoint)
			.then((res) => {
				const apiData = res.data;
				console.log(apiData);
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
			<Swiper
				className="swiper-carrousel"
				modules={[
					Navigation,
					Pagination,
					Scrollbar,
					A11y,
					Autoplay,
					EffectFade,
				]}
				spaceBetween={30}
				effect={"fade"}
				slidesPerView={1}
				autoplay={{
					delay: 4500,
					disableOnInteraction: false,
				}}
			>
				{moviesList.map((oneMovie) => (
					<>
						<SwiperSlide key={oneMovie.id}>
							<>
								<div className="d-flex justify-content-center animate__animated animate__fadeIn">
									<div className="card bg-dark text-white border-0 mb-5">
										<img
											src={`https://image.tmdb.org/t/p/original/${oneMovie.backdrop_path}`}
											className="card-img img-carrousel"
											alt="..."
										/>
										<div className="card-img-overlay bg-dark bg-opacity-50 d-flex flex-column justify-content-end">
											<p className="card-title-carrousel">{oneMovie.title}</p>
											<div className="d-flex">
												<p className="card-text text-warning fw-light fs-3">
													{Math.round(oneMovie.vote_average) + "/10"}
												</p>
												<p className="card-text ms-4 mt-2">
													<small className="text-light fw-light fs-6 badge rounded-pill bg-warning"></small>
												</p>
												<p className="card-text ms-4 mt-2 ">
													<small className="text-light fw-light fs-6 badge rounded-pill bg-warning"></small>
												</p>
											</div>
											<p className="card-text text-start fs-5 fw-lighter mb-5">
												{oneMovie.overview}
											</p>
										</div>
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
