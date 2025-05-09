import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";

async function loginUser(formData: {
    email: string;
    password: string;
}) {

	try {
		const apiUrl = REACT_APP_PUBLIC_BACKEND_URL + "/api/user/login";

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
			// Se guarda el token de acceso en las cookies:
			const data = await response.json();
			document.cookie = `accessToken=${data.accessToken}; path=/; SameSite=None; Secure`;
			return true;

		// Si ha habido algún error, se muestra un mensaje de error en la consola
		} else {
			console.error("Error al autenticar usuario:", response.statusText);
			return false;
		}
	} catch (error) {
		console.error("Error de red:", error);
		return false;
	}
}

export default loginUser;