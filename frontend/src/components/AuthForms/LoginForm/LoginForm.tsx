import { useState } from "react";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom"; // Importa navigate para la navegación en React Router v6

import loginUser from "../../../api/authHandler/loginUser";

import "./LoginForm.css"; // Asegúrate de importar el archivo CSS
import "../styles.css";

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate(); // Obtiene la función navigate para la navegación
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false); // Estado para controlar la visibilidad del mensaje de error

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await loginUser(formData);

    if (response) {
      navigate("/home");
    } else {
      setErrorMessage("Error login. Check your credentials.");
      setShowErrorMessage(true);
    }

    // Limpia el formulario después de enviar los datos
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="data-label" htmlFor="email">
            Email / Username
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
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
          />
        </div>
        <Button className="login-button button" content="Log in!"></Button>

        {/* Mensaje de Error */}
        {showErrorMessage && (
          <div className="error-login-container">
            {/* Error Message */}
            <Button
              className="error-login-message"
              content={errorMessage}
              onClickAction="hide"
              onClick={() => setShowErrorMessage(false)}
            />

            {/* Forgotten Password */}
            <Button
              className="error-login-forgotten-password"
              content={"Forgot your password?"}
              onClickAction="hide"
              onClick={() => navigate("/forgotten-password")}
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
