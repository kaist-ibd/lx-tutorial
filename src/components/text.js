import * as React from "react";
import * as styles from "./text.module.css";
import { GatsbyImage, getImage, getText } from "gatsby-plugin-image";
import { Section, MarkdownText, Button, Heading } from "gatsby-theme-landing-page";

export default function Text({ heading, secondaryHeading, content }) {
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
          {content.map((item) => (
            <TextContent key={item.id} {...item} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function TextContent({ primaryText, image, links }) {
  return (
    <div>
      <MarkdownText {...primaryText} />
      {image && (
        <GatsbyImage
          image={getImage(image)}
          alt={image.title || getText(primaryText)}
          className={styles.contentImage}
        />
      )}
      <div className={styles.buttonContainer}>
        {links && links.map((link, i) => (
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
