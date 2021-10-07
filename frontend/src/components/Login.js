import AuthForm from "./AuthForm";
import {useState} from "react";
export default function Login({ authorization }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(evt) {
    evt.target.name === "email"
      ? setEmail(evt.target.value)
      : setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    authorization(email, password);
  }

  return (
    <AuthForm
      title="Вход"
      titleBtn="Войти"
      email={email}
      password={password}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
