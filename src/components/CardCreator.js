import React from "react"
import * as styles from "./CardCreator.module.css"
import { FaPlusSquare } from "@react-icons/all-files/fa/FaPlusSquare"

export default function CardCreator({ createCounter }) {
  return (
    <div className={styles.cardCreator}>
      <i
        className={`fas fa-plus-square ${styles.faPlusSquare}`}
        onClick={createCounter}
        onKeyPress={createCounter}
        role="button"
        aria-label="Create a new Counter"
        tabIndex="0"
      ></i>
      <FaPlusSquare
        onClick={createCounter}
        onKeyPress={createCounter}
        className={styles.faPlusSquare}
      />
    </div>
  )
}
