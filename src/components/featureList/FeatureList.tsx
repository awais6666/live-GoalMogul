import React from "react"
import styles from "./FeatureList.module.css"

import chaticoPng from "../../assets/images/chatico.png"
import discovericoPng from "../../assets/images/discoverico.png"
import feedicoPng from "../../assets/images/feedico.png"
import goalicoPng from "../../assets/images/goalico.png"
import peopleicoPng from "../../assets/images/peopleico.png"
import suggesticoPng from "../../assets/images/suggestico.png"

/**
 * A component that displays a list of features provided by GoalMogul
 */
export default function FeatureList() {
  return (
    <div>
      <ul className={styles.featuresList}>
        <li>
          <div className={styles.featuresListIcon}>
            <img src={goalicoPng} alt='goal' />
          </div>
          <div className={styles.featuresListContent}>
            <h3>Share your Goals</h3>
            <p>
              Create a goal by entering a short description, the necessary steps
              and your needs. Your friends will be able to give you feedback
              &amp; suggestions.
            </p>
          </div>
        </li>
        <li>
          <div className={styles.featuresListIcon}>
            <img src={suggesticoPng} alt='suggest' />
          </div>
          <div className={styles.featuresListContent}>
            <h3>Friend Suggestions</h3>
            <p>
              Add suggestions and comments to your friends' Goals. Suggest
              personal connections, professionals, videos, etc.
            </p>
          </div>
        </li>
        <li>
          <div className={styles.featuresListIcon}>
            <img src={feedicoPng} alt='feed' />
          </div>
          <div className={styles.featuresListContent}>
            <h3>Activity feed</h3>
            <p>
              Stay updated on all the goals and posts being shared by your
              friends
            </p>
          </div>
        </li>
        <li>
          <div className={styles.featuresListIcon}>
            <img src={chaticoPng} alt='chat' />
          </div>
          <div className={styles.featuresListContent}>
            <h3>Chat Communities</h3>
            <p>
              From personal introductions to community discussion groups, chat
              helps you connect with people.
            </p>
          </div>
        </li>
        <li>
          <div className={styles.featuresListIcon}>
            <img src={discovericoPng} alt='discover' />
          </div>
          <div className={styles.featuresListContent}>
            <h3>Discover</h3>
            <p>
              Discover Tribes, Events and People to help you with your goals.
            </p>
          </div>
        </li>
        <li>
          <div className={styles.featuresListIcon}>
            <img src={peopleicoPng} alt='people' />
          </div>
          <div className={styles.featuresListContent}>
            <h3>Much more...</h3>
            <p>
              From Event pages to Smart Goal Planners, we've built several tools
              to help you achieve your goals.
            </p>
          </div>
        </li>
      </ul>
    </div>
  )
}
