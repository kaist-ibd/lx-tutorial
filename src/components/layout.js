import * as React from "react";
import { Link } from "gatsby";
import { Head } from "gatsby-theme-landing-page";
import "../styles.css";
import * as cssVars from "gatsby-theme-landing-page/src/styles/variables.module.css";
import * as styles from "./layout.module.css";

export default function Layout(props) {
  return (
    <div className={[cssVars.root, styles.root].join(" ")}>
      <Head {...props} />
      <header className={styles.header}>
      대전 메타버스
      </header>
      <main className={styles.main}>{props.children}</main>
      <footer className={styles.footer}>
        <a href="https://www.ibdsite.com/" target={"_blank"} rel="noopener noreferrer">IBD</a>
        <a href="https://www.lx.or.kr/kor.do" target={"_blank"} rel="noopener noreferrer">LX</a>
      </footer>
    </div>
  );
}
