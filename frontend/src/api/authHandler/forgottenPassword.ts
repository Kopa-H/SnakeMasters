import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";

async function forgottenPassword(formData: {
    email: string;
}) {

	try {
		const apiUrl = REACT_APP_PUBLIC_BACKEND_URL + "/api/user/forgotten-password";

		const response = await fetch(apiUrl, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		// Si el usuario se ha autenticado correctamente, se guarda el token de acceso en las cookies
		if (response.ok) {
			console.log("Correo para resetear la contraseña enviado.");
			return true;

		} else {
			console.error("Error al enviar el correo para resetear la password:", response.statusText);
			return false;
		}
	} catch (error) {
		console.error("Error de red:", error);
		return false;
	}
}

export default forgottenPassword;