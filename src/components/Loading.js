import React from "react";
import "../css/app.css";

export default function Loading() {
	return (
		<>
			<div className="d-flex justify-content-center">
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
			<div className="spinner-title d-flex justify-content-center">
				<h2 className="text-light fw-lighter">Cargando ...</h2>
			</div>
		</>
	);
}
