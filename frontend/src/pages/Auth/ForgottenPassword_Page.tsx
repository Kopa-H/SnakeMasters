import ParticlesComponent from "../../components/SpecialEffects/Particles";
import MainTitle from "../../components/Title/MainTitle";
import setPageHeader from "../../utilities/setPageHeader";

import { useState } from "react";
import Button from "../../components/Button/Button";

import forgottenPassword from "../../api/authHandler/forgottenPassword";

import "./styles/ForgottenPassword_Page.css";
import "../../components/SpecialEffects/Particles.css";

interface FormData {
  email: string;
}

function ForgottenPasswordPage() {
  setPageHeader("Snake Masters - Forgotten Password");

  const ForgottenPassword = () => {
    const [successState, setSuccessState] = useState(false); // Estado para controlar la visibilidad del mensaje de éxito
    const [responseMessage, setResponseMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false); // Estado para controlar la visibilidad del mensaje de error

    const [formData, setFormData] = useState<FormData>({
      email: "",
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

      const response = await forgottenPassword(formData);

      if (response) {
        setResponseMessage(
          "Check your email (including spam) for further instructions."
        );
        setSuccessState(true);
      } else {
        setResponseMessage("Email provided does not exist.");
        setShowErrorMessage(true);
      }

      // Limpia el formulario después de enviar los datos
      setFormData({
        email: "",
      });
    };

    const handleErrorMessageDismiss = (): void => {
      setShowErrorMessage(false); // Ocultar el mensaje de error
    };

    return (
      <div className="forgotten-password-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="data-label" htmlFor="email">
              Enter email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            className="forgotten-password-button button"
            content="Reset Password"
          ></Button>

          {/* Success Message */}
          {successState && (
            <>
              <label className="success-forgotten-password-message">
                {responseMessage}
              </label>
            </>
          )}

          {/* Error Message */}
          {showErrorMessage && (
            <>
              <Button
                className="error-forgotten-password-message"
                content={responseMessage}
                onClickAction="hide"
                onClick={handleErrorMessageDismiss}
              />
            </>
          )}
        </form>
      </div>
    );
  };

  return (
    <div className="forgotten-password-page">
      <ParticlesComponent className="particles"></ParticlesComponent>

      <MainTitle rotate={true}></MainTitle>

      <ForgottenPassword></ForgottenPassword>
    </div>
  );
}

export default ForgottenPasswordPage;
