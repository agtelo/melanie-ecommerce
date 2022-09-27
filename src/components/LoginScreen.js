import { React } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/app.css";

export default function LoginScreen() {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		const regexEmail =
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

		if (email === "" || password === "") {
			Swal.fire({
				title: "Error!",
				text: "Los campos no pueden estar vacios",
				icon: "warning",
				confirmButtonText: "OK",
			});
			return;
		}
		if (email !== "" && !regexEmail.test(email)) {
			Swal.fire({
				title: "Error!",
				text: "Debes ingresar una direccion de correo electronico valida",
				icon: "warning",
				confirmButtonText: "OK",
			});
			return;
		}
		if (email !== "challenge@alkemy.org" || password !== "react") {
			Swal.fire({
				title: "Error!",
				text: "Credenciales Invalidas",
				icon: "warning",
				confirmButtonText: "OK",
			});
			return;
		}

		axios
			.post("http://challenge-react.alkemy.org/", { email, password })
			.then((res) => {
				const token = res.data.token;
				sessionStorage.setItem("token", token);
				navigate("/movie-list");
			});
	};
	const token = sessionStorage.getItem("token");

	return (
		<>
			{token && <Navigate to="/movie-list" />}
			<form
				onSubmit={handleSubmit}
				className="container pt-5 ml-5 d-flex flex-column justify-content-center align-items-center"
			>
				<div className="input-form mb-3">
					<h2 className="text-light mb-5 text-center text-uppercase">
						Iniciar Sesion
					</h2>
					<label htmlFor="exampleInputEmail1" className="form-label text-light">
						Email Address
					</label>
					<input
						type="email"
						name="email"
						className="form-control bg-dark bg-opacity-10 text-secondary"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
					/>
				</div>
				<div className="input-form mb-3">
					<label
						htmlFor="exampleInputPassword1"
						className="form-label text-light"
					>
						Password
					</label>
					<input
						type="password"
						name="password"
						className="form-control bg-dark bg-opacity-10 text-secondary"
						id="exampleInputPassword1"
					/>
				</div>
				<div>
					<div className="button-wrapper mt-4">
						<button className="button" type="submit">
							Ingresar
						</button>
						<div className="button-bg"></div>
					</div>
				</div>
				<br />
				<br />
			</form>
		</>
	);
}
