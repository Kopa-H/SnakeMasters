import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import getFormattedDate from "../../utilities/getFormattedDate";

async function registerUser(formData: {
    username: string;
    email: string;
    password: string;
    repeatedPassword: string;
    levelOneRecord: number;
    achievementDate: string;
    defaultSkin: string;
}) {
    try {
        // Se añade la fecha de hoy a los datos del usuario
        const achievementDate = getFormattedDate();
        formData.achievementDate = achievementDate;

        const apiUrl = REACT_APP_PUBLIC_BACKEND_URL + "/api/user/register";
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        const data = await response.json(); // Intenta parsear la respuesta a JSON

        if (response.ok) {
            // Si el usuario se ha registrado correctamente, devuelve success: true
            return { success: true };
        } else {
            // Si ha habido algún error, devuelve un objeto con el mensaje de error
            return {
                success: false,
                error: data.message || `Error en el registro. Código: ${response.status}`,
            };
        }
    } catch (error) {
        // En caso de un error de red o inesperado, devuelve un mensaje de error general
        return {
            success: false,
            error: "Error al conectar con el servidor. Inténtalo de nuevo más tarde.",
        };
    }
}

export default registerUser;
