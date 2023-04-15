import * as React from "react";
import * as styles from "./imageText.module.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Section, MarkdownText, Button, Heading } from "gatsby-theme-landing-page";

export default function ImageText({ heading, secondaryHeading, content }) {
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
            <TextImageContent key={item.id} {...item} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function TextImageContent({ primaryText, image, links }) {
  return (
    <div>
      <div className={styles.component}>
        <div className={styles.image}>
          {image && (
            <GatsbyImage
              image={getImage(image)}
              alt={image.title || getText(primaryText)}
              className={styles.contentImage}
              objectFit="cover"
            />
          )}
        </div>
        <div className={styles.componentContent}>
          <MarkdownText {...primaryText} />
        </div>
      </div>
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
