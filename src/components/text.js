import * as React from "react";
import * as styles from "./text.module.css";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Section, MarkdownText, Button, Heading } from "gatsby-theme-landing-page";

export default function Text({ heading, secondaryHeading, content }) {
  const launcherContent = content?.[0];
//   const image = getImage(launcherContent?.image);

  return (
    <Section>
      <div className={styles.root}>
        <div className={styles.content}>
          <Heading as="h2" className={styles.secondaryHeading}>
            {secondaryHeading}
          </Heading>
          <Heading as="h1" className={styles.heading}>
            {heading}
          </Heading>
          <LauncherContent {...launcherContent} />
        </div>
      </div>
    </Section>
  );
}

function LauncherContent({ primaryText, secondaryText, links }) {
  return (
    <div>
      <MarkdownText {...primaryText} />
      <MarkdownText {...secondaryText} />
      <div className={styles.buttonContainer}>
        {links.map((link, i) => (
          <Button
            key={link.id}
            {...link}
            variant={i === 0 ? "primary" : "secondary"}
          />
        ))}
      </div>
    </div>
  );
}
