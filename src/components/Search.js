import React from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

export default function Search() {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const keyword = e.currentTarget.keyword.value.trim();
		if (keyword.length === 0) {
			Swal.fire({
				title: "Error!",
				text: "La busueda no arrojo resultados",
				icon: "warning",
				confirmButtonText: "OK",
			});
		} else {
			e.currentTarget.keyword.value = "";
			navigate(`/search-results?keyword=${keyword}`);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="d-flex align-items-center">
				<label className="form-label mb-0 mx-2">
					<input
						type="text"
						className="form-control bg-dark bg-opacity-10 text-secondary"
						placeholder="Buscar ..."
						name="keyword"
					/>
				</label>
				<i className="bi bi-search ms-2 fs-4 text-opacity-50 text-secondary"></i>
				<button type="submit" className="btn-search btn-primary ">
					BUSCAR
				</button>
			</form>
		</>
	);
}
