import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import * as styles from "./CampaignDetails.module.css";
import images from "../../images.js";
import Donation from "./Donation";

export default function CampaignDetails({ campaign, featured }) {
  const paragraphs = campaign.long_description.split("#");

  return (
    <section className={styles.details}>
      {featured ? (
        <h5 className={styles.featured}>Projeto em Destaque</h5>
      ) : null}
      <h2 className={styles.title}>{campaign.name}</h2>
      <div className={styles.underline}></div>
      <div className={styles.description}>
        {paragraphs.map((paragraph, index) => (
          <p
            className={
              index == paragraphs.length - 1 &&
              campaign.highlight_last_paragraph
                ? styles.bold
                : ""
            }
            key={paragraph}
          >
            {paragraph}
          </p>
        ))}
      </div>
      <main className={styles.content}>
        <div className={styles.carouselWrapper}>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={campaign.slide_pictures.length}
            isPlaying={true}
            infinite={true}
            interval={3000}
            className={styles.carousel}
          >
            <Slider>
              {campaign.slide_pictures.map((slide, index) => (
                <Slide index={index} key={slide}>
                  <Image
                    hasMasterSpinner={false}
                    src={images[slide]}
                    isBgImage={true}
                  />
                </Slide>
              ))}
            </Slider>
            <DotGroup className={styles.dotGroup}></DotGroup>
          </CarouselProvider>
        </div>
        <div className={styles.donationsWrapper}>
          {campaign.donations.map((donation) => (
            <Donation donation={donation} key={donation.name} />
          ))}
        </div>
      </main>
    </section>
  );
}
