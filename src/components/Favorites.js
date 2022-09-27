import { React } from "react";
import { Navigate, Link } from "react-router-dom";

const Favorites = (props) => {
	const { favorites, addOrRemoveFavs } = props;
	const token = sessionStorage.getItem("token");

	return (
		<>
			{!token && <Navigate to="/" />}
			<div className="row">
				<h2 className="text-light">Favoritos</h2>
			</div>
			{!favorites.length && (
				<div className="favorite-title">
					<h2 className="text-light fw-lighter ">
						No tienes peliculas en favoritos ...
					</h2>
				</div>
			)}
			<div className="row">
				{favorites.map((movie, idx, e) => {
					const { id, title, imgURL } = movie;
					return (
						<div className="col-3 animate__animated animate__fadeIn" key={idx}>
							<div className="card card-movie-list border-0 mt-2 mb-3 ">
								<img
									src={`https://image.tmdb.org/t/p/w500/${imgURL}`}
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
								<button
									className="favorite-btn"
									onClick={addOrRemoveFavs}
									data-movie-id={id}
								>
									<i className="bi bi-bookmark-star-fill"></i>
								</button>
								<div className="card-body">
									<h5 className="card-title text-light fs-6 fw-bolder">
										{title.substring(0, 30)}
									</h5>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Favorites;
