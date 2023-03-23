import * as React from "react";
import { Link } from "gatsby";
import isAbsoluteURL from "is-absolute-url";
import * as styles from "./button.module.css";

export default function Button({ onClick, href, text, children, variant = "primary" }) {
  const buttonStyle =
    variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary;

  if (href === 'nolink') {
    return (
      <span className={buttonStyle} onClick={onClick}>
        {text || children}
      </span>
    )
  }

  else if (isAbsoluteURL(href)) {
    return (
      <a className={buttonStyle} href={href} target={"_blank"} rel="noopener noreferrer" onClick={onClick}>
        {text || children}
      </a>
    );
  }

  return (
    <Link className={buttonStyle} to={href} onClick={onClick}>
      {text || children}
    </Link>
  );
}
