import { useState, useEffect } from "react";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación
import registerUser from "../../../api/authHandler/registerUser";
import SKINS_INFO from "../../SnakeGame/Parameters/skins_info";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RegisterForm.css";
import "../styles.css";

// Regex de validación
const USER_REGEX = /^[a-zA-Z0-9._-]{3,12}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=[\]{};':"\\|,.<>?/-]{6,25}$/;

interface FormData {
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;
  levelOneRecord: number;
  achievementDate: string;
  defaultSkin: string;
}

function RegisterForm({ levelOneGameScore }: any) {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null); // Para manejar errores desde el backend
  const [isSubmitting, setIsSubmitting] = useState(false); // Para evitar el registro de usuarios duplicados

  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isRepeatedPasswordValid, setIsRepeatedPasswordValid] =
    useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
    levelOneRecord: levelOneGameScore,
    achievementDate: "",
    defaultSkin: SKINS_INFO.DEFAULT.content,
  });

  useEffect(() => {
    if (
      formData.password !== formData.repeatedPassword &&
      formData.password !== "" &&
      formData.repeatedPassword !== ""
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    switch (name) {
      case "username":
        setIsUsernameValid(USER_REGEX.test(value));
        break;
      case "email":
        setIsEmailValid(EMAIL_REGEX.test(value));
        break;
      case "password":
        setIsPasswordValid(PASSWORD_REGEX.test(value));
        break;
      case "repeatedPassword":
        setIsRepeatedPasswordValid(PASSWORD_REGEX.test(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (isSubmitting) {
      return;
    }

    event.preventDefault();

    if (formData.password !== formData.repeatedPassword) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    if (
      !isUsernameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isRepeatedPasswordValid
    ) {
      return;
    }

    // Deshabilitar el botón de registro
    setIsSubmitting(true);

    // Enviar datos al backend
    try {
      const response = await registerUser(formData);

      if (response.success) {
        navigate("/login"); // Redirige al usuario al login si el registro fue exitoso
      } else {
        setBackendError(response.error); // Muestra el error si hay un problema
      }
    } catch (error) {
      setBackendError("Error en el registro. Inténtalo de nuevo más tarde.");
    } finally {
      // Volver a habilitar el botón de registro
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="data-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
            className={!isUsernameValid ? "invalid" : ""}
          />
          <div className="icon-container">
            {!isUsernameValid && formData.username !== "" && (
              <FontAwesomeIcon icon={faTimes} className="error-icon" />
            )}
            {isUsernameValid && formData.username !== "" && (
              <FontAwesomeIcon icon={faCheck} className="valid-icon" />
            )}
          </div>
        </div>
        <div>
          <label className="data-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className={!isEmailValid ? "invalid" : ""}
          />
          <div className="icon-container">
            {!isEmailValid && formData.email !== "" && (
              <FontAwesomeIcon icon={faTimes} className="error-icon" />
            )}
            {isEmailValid && formData.email !== "" && (
              <FontAwesomeIcon icon={faCheck} className="valid-icon" />
            )}
          </div>
        </div>
        <div>
          <label className="data-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className={!isPasswordValid ? "invalid" : ""}
          />
          <div className="icon-container">
            {!isPasswordValid && formData.password !== "" && (
              <FontAwesomeIcon icon={faTimes} className="error-icon" />
            )}
            {isPasswordValid && formData.password !== "" && (
              <FontAwesomeIcon icon={faCheck} className="valid-icon" />
            )}
          </div>
        </div>
        <div>
          <label className="data-label" htmlFor="repeated-password">
            Repeat password
          </label>
          <input
            type="password"
            id="repeated-password"
            name="repeatedPassword"
            value={formData.repeatedPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className={!isRepeatedPasswordValid ? "invalid" : ""}
          />
          <div className="icon-container">
            {!isRepeatedPasswordValid && formData.repeatedPassword !== "" && (
              <FontAwesomeIcon icon={faTimes} className="error-icon" />
            )}
            {isRepeatedPasswordValid && formData.repeatedPassword !== "" && (
              <FontAwesomeIcon icon={faCheck} className="valid-icon" />
            )}
          </div>
        </div>

        {/* ERROR MESSAGES */}
        {passwordError && (
          <div className="error-message">{"Passwords do not match"}</div>
        )}

        {backendError && (
          <div className="error-message">{backendError}</div> // Muestra el mensaje de error del backend
        )}

        {isSubmitting && (
          <Button className="sing-up-button button" content="Registering..." />
        )}

        {!isSubmitting && (
          <Button className="sing-up-button button" content="Sign up!" />
        )}
      </form>
    </div>
  );
}

export default RegisterForm;
