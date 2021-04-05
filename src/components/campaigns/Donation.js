import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./Donation.module.css";
import images from "../../images.js";
import BasketContext from "../../BasketContext";

export default function Donation({ donation }) {
  const { basket, setBasket } = useContext(BasketContext);
  const navigate = useNavigate();

  const addToBasket = (donation) => {
    const amount = basket[donation.slug] ? basket[donation.slug].amount + 1 : 1;
    setBasket({
      ...basket,
      [donation.slug]: { amount: amount, product: donation },
    });

    navigate("/cesta");
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSlot}>
        <img src={images[donation.picture]} />
      </div>
      <div className={styles.info}>
        <div className={styles.details}>
          <h3 className={styles.name}>{donation.name}</h3>
          <p className={styles.price}>R${donation.price},00</p>
        </div>
        <div className={styles.toolbar}>
          <button onClick={() => addToBasket(donation)}>Doar</button>
        </div>
      </div>
    </div>
  );
}
