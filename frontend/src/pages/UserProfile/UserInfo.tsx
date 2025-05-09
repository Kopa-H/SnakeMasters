import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useState, useEffect } from "react";

import useLogout from "../../api/authHandler/logoutUser";
import useDeleteAccount from "../../api/authHandler/deleteUser";
import getUserProfile from "../../api/fetchInfo/getUserProfile";

import useModifyUser from "../../api/authHandler/modifyUser";

import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.css";

interface UserProfileData {
  username: string;
  email: string;
  password: string;
  [key: string]: string | number | undefined; // Índice de firma
}

const USER_REGEX = /^[a-zA-Z0-9]{3,12}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=[\]{};':"\\|,.<>?/-]{6,25}$/;

const UserInfo = () => {
  const navigate = useNavigate();

  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const keys = ["username", "email", "password"];
  const comments = ["Change username", "Change email", "Change password"];

  // Estado inicial para los datos del usuario
  const [userProfileData, setUserProfileData] = useState<UserProfileData>({
    username: "",
    email: "",
    password: "",
  });

  const [showConfirmationInput, setShowConfirmationInput] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showModifyInput, setShowModifyInput] = useState<{
    field: string | null;
    newValue: string;
  }>({ field: null, newValue: "" });

  // LOGICA PARA COMPROBAR CONTRASEÑAS Y PERMITIR ELIMINAR USER:
  const correctColor = "#228B22";
  const incorrectColor = "#8B0000";

  /* <-- SE OBTIENEN LOS DATOS DEL USUARIO AL CARGAR EL COMPONENTE --> */
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserProfile();
      setUserProfileData(userData);
    };

    fetchData();
  }, []);

  // Función para manejar la contraseña introducida por el usuario al borrar la cuenta:
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleNewValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowModifyInput((prevState) => ({
      ...prevState,
      newValue: e.target.value,
    }));

    switch (showModifyInput.field) {
      case "username":
        setIsUsernameValid(USER_REGEX.test(e.target.value));
        break;
      case "email":
        setIsEmailValid(EMAIL_REGEX.test(e.target.value));
        break;
      case "password":
        setIsPasswordValid(PASSWORD_REGEX.test(e.target.value));
        break;
      default:
        break;
    }
  };

  // Función para manejar el cierre de sesión:
  async function handleLogOut() {
    await useLogout();
    navigate("/home");
    window.location.reload();
  }

  // Función para cambiar el username, email o contraseña:
  const handleModifyUser = (infoToModify: string) => () => {
    setShowModifyInput({ field: infoToModify, newValue: "" });
  };

  // Función para cambiar el username:
  const confirmModifyUser = async () => {
    if (!showModifyInput.field) {
      return;
    }

    // Comprobar si el nuevo valor es válido
    if (showModifyInput.field === "password" && !isPasswordValid) {
      console.log("Invalid password.");
      return;
    } else if (showModifyInput.field === "email" && !isEmailValid) {
      console.log("Invalid email.");
      return;
    } else if (showModifyInput.field === "username" && !isUsernameValid) {
      console.log("Invalid username.");
      return;
    }

    try {
      const success = await useModifyUser(
        showModifyInput.field,
        passwordConfirmation,
        showModifyInput.newValue
      );

      if (success) {
        window.location.reload();
      } else {
        window.alert(
          `Ha ocurrido un error al cambiar el ${showModifyInput.field}`
        );
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const actions = [
    () => handleModifyUser("username"),
    () => handleModifyUser("email"),
    () => handleModifyUser("password"),
  ];

  // Función para manejar la eliminación de la cuenta:
  function handleDeleteAccount() {
    window.alert(
      "Deleting your account is a permanent action. To confirm, please enter your password below:"
    );
    setShowConfirmationInput(true);
  }

  /* <-- FUNCIÓN PARA ELIMINAR LA CUENTA DEL JUGADOR --> */
  function confirmDeleteAccount() {
    // Se usa una función externa para eliminar la cuenta:
    useDeleteAccount(passwordConfirmation)
      .then((success) => {
        if (success) {
          navigate("/home");
          window.location.reload();
        } else {
          window.alert("Incorrect password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Se generan las filas de la tabla de datos del usuario:
  function generateRows(keys: string[], userData: UserProfileData) {
    // Definir los colores para cada etapa
    const colorStages = [
      ["#FFA500", "#FFD700"], // Anaranjado
      ["#00BFFF", "#87CEEB"], // Azulado
      ["#FF6347", "#FFA07A"], // Rojo Coral
      ["#3CB371", "#2E8B57"], // Verde Marino
    ];

    return keys.map((key, index) => {
      // Calcular la etapa actual basada en el índice
      const stageIndex = index % colorStages.length;
      const colors = colorStages[stageIndex];
      const gradient = `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})`;

      return (
        <div key={index} className="row">
          <div className="key-and-value" style={{ background: gradient }}>
            <div className="col col-lft">{key}</div>
            <div className="col col-rht">{userData ? userData[key] : null}</div>
          </div>

          {/* Botón para modificar el campo actual */}
          <Button
            className="modify-user-button"
            content={comments[index]}
            onClick={actions[index]()}
            background={gradient}
          />

          {showModifyInput.field === key && (
            <div className="modify-user-container">
              {/* Input para introducir el nuevo valor */}
              <input
                className="modify-user-input"
                type="text"
                placeholder={`New ${key}...`}
                value={showModifyInput.newValue}
                onChange={handleNewValueChange}
              />

              {/* Icono de validación */}
              {showModifyInput.newValue && (
                <div className="icon-container">
                  <FontAwesomeIcon
                    icon={
                      isUsernameValid || isEmailValid || isPasswordValid
                        ? faCheck
                        : faTimes
                    }
                    className="validation-icon"
                    style={{
                      color:
                        isUsernameValid || isEmailValid || isPasswordValid
                          ? correctColor
                          : incorrectColor,
                    }}
                  />
                </div>
              )}

              {/* Input para introducir la contraseña */}
              <input
                className="password-input"
                type="password"
                placeholder="Current password..."
                value={passwordConfirmation}
                onChange={handleChange}
              />

              {showModifyInput.newValue && (
                <Button
                  className="cancel-button"
                  content="Cancel operation"
                  background={correctColor}
                  onClick={() =>
                    setShowModifyInput({ field: null, newValue: "" })
                  }
                />
              )}

              {showModifyInput.newValue && (
                <Button
                  className="confirm-button"
                  content="Confirm"
                  background={incorrectColor}
                  onClick={confirmModifyUser}
                />
              )}
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <div className="user-info-grid">
      {generateRows(keys, userProfileData)}

      <Button
        className="logout-button"
        content="Log out"
        onClick={handleLogOut}
      />

      <Button
        className="delete-account-button"
        content="Delete account"
        onClick={handleDeleteAccount}
      />

      {showConfirmationInput && (
        <div className="delete-account-container">
          <input
            className="password-input"
            type="text"
            placeholder="Introduce password..."
            value={passwordConfirmation}
            onChange={handleChange}
            style={{
              borderColor: incorrectColor,
            }}
          />
          {passwordConfirmation && (
            <Button
              className="cancel-button"
              content="Cancel operation"
              background={correctColor}
              onClick={() => setShowConfirmationInput(false)}
            />
          )}
          {passwordConfirmation && (
            <Button
              className="confirm-button"
              content="Confirm"
              background={incorrectColor}
              onClick={confirmDeleteAccount}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
