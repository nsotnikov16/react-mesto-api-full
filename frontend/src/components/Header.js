import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header({ signOut, mail }) {
  const location = useLocation().pathname;

  const getHref = () => {
    if (location === "/") {
      return "/sign-in";
    } else if (location === "/sign-in") {
      return "/sign-up";
    } else if (location === "/sign-up") {
      return "/sign-in";
    } else {
      return "/";
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <img src={logo} alt="Логотип" className="header__logo" />

        {location === "/" && <p className="header__email">{mail}</p>}

        <Link
          to={getHref()}
          onClick={() => signOut(location)}
          className={`header__link ${location === "/" && "header__link_gray"}`}
        >
          {(location === "/sign-in" && "Регистрация") ||
            (location === "/sign-up" && "Войти") ||
            "Выйти"}
        </Link>
      </div>
    </header>
  );
}

export default Header;
