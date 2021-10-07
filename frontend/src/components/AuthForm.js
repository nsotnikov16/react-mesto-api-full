import React from "react";
export default function AuthForm({ children, title, titleBtn, onSubmit, onChange, email, password }) {

  return (
    <div className="auth page__container">
      <h2 className="auth__title">{title}</h2>
      <form onSubmit={onSubmit} className="auth__form" name="auth">
        <input
          className="auth__input"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          className="auth__input"
          name="password"
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={onChange}
          required
        />
        <button type="submit" className="auth__button">{titleBtn}</button>
      </form>
      {children}
    </div>
  );
}
