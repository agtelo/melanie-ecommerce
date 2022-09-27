import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import "../css/app.css";

export default function Header(props) {
	const { favorites } = props;

	const [token, setToken] = useState(null);

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		setToken(token);
	}, [setToken]);

	return (
		<>
			<header>
				<nav className="navbar navbar-expand-lg navbar-dark">
					<div className="container">
						<Link className="navbar-brand fw-bolder fs-1" to="/">
							AlkeFlix
						</Link>
						{token && (
							<>
								<div className="collapse navbar-collapse" id="navbarNav">
									<ul className="navbar-nav">
										<li className="nav-item">
											<Link
												className="nav-link fs-5 fw-lighter"
												to="/movie-list"
											>
												Peliculas
											</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link fs-5 fw-lighter" to="/tv-list">
												TV Series
											</Link>
										</li>
										<li className="nav-item position-relative">
											<Link
												className="nav-link fs-5 fw-lighter"
												to="/favorites"
											>
												Favoritos
											</Link>
											{favorites.length > 0 && (
												<>
													<span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger fw-lighter">
														{favorites.length > 0 && favorites.length}
													</span>
												</>
											)}
										</li>
										<li className="nav-item d-flex align-items-center">
											<span className="text-success"></span>
										</li>
									</ul>
								</div>
								<Search />
							</>
						)}
					</div>
				</nav>
			</header>
		</>
	);
}
