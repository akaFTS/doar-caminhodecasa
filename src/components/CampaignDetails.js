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
import manto1 from "url:../assets/manto1.jpg";
import manto2 from "url:../assets/manto2.jpg";
import manto3 from "url:../assets/manto3.jpg";
import Donation from "./Donation";

export default function CampaignDetails() {
  return (
    <section className={styles.details}>
      <h5 className={styles.featured}>Campanha em Destaque</h5>
      <h2 className={styles.title}>Manto Azul</h2>
      <div className={styles.underline}></div>
      <div className={styles.description}>
        <p>
          O Manto Azul é um projeto que se encarrega de auxiliar gestantes e
          mães de bebês. Nós preparamos um enxoval contendo fraldas, roupas, e
          tudo que o bebê possa precisar, e distribuímos para mães de
          comunidades da região do Jardim Pantanal em São Paulo. Atualmente,
          mais de 50 família são atendidas pelo projeto.
        </p>
      </div>
      <main className={styles.content}>
        <div className={styles.carouselWrapper}>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={3}
            isPlaying={true}
            infinite={true}
            interval={3000}
            className={styles.carousel}
          >
            <Slider>
              <Slide index={0}>
                <Image hasMasterSpinner={false} src={manto1} isBgImage={true} />
              </Slide>
              <Slide index={1}>
                <Image hasMasterSpinner={false} src={manto2} isBgImage={true} />
              </Slide>
              <Slide index={2}>
                <Image hasMasterSpinner={false} src={manto3} isBgImage={true} />
              </Slide>
            </Slider>
            <DotGroup className={styles.dotGroup}></DotGroup>
          </CarouselProvider>
        </div>
        <div class={styles.donationsWrapper}>
          <Donation />
          <Donation />
          <Donation />
        </div>
      </main>
    </section>
  );
}
