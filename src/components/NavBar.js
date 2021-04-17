import React, { useEffect } from "react"
import * as styles from "./NavBar.module.css"

export default function NavBar() {
  useEffect(() => {
    const toggle = document.getElementById("toggle")
    const nav = document.getElementById("nav")

    toggle.addEventListener("click", () =>
      nav.classList.toggle(`${styles.active}`)
    )
  }, [])

  return (
    <div>
      <nav id="nav" className={styles.nav}>
        <ul>
          <li>
            <div className={styles.temporaryLinkResembler}>Home</div>
          </li>
          <li>
            <div className={styles.temporaryLinkResembler}>Works</div>
          </li>
          <li>
            <div className={styles.temporaryLinkResembler}>About</div>
          </li>
          <li>
            <div className={styles.temporaryLinkResembler}>Contact</div>
          </li>
        </ul>

        <button className={styles.icon} id="toggle">
          <div className={`${styles.line} ${styles.line1}`}></div>
          <div className={`${styles.line} ${styles.line2}`}></div>
        </button>
      </nav>
    </div>
  )
}
