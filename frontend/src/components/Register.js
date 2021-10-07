import AuthForm from "./AuthForm";
import {useState} from "react";
import { Link } from "react-router-dom";
export default function Register({ registration }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(evt) {
    evt.target.name === "email"
      ? setEmail(evt.target.value)
      : setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    registration(email, password);
  }
  return (
    <AuthForm
      title="Регистрация"
      titleBtn="Зарегистрироваться"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <p>
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}
