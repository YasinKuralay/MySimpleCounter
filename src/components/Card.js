import React, { useRef, useState } from "react"
import * as styles from "./Card.module.css"
import { FaTrashAlt } from "@react-icons/all-files/fa/FaTrashAlt"
import { FaPlusCircle } from "@react-icons/all-files/fa/FaPlusCircle"
import { FaMinusCircle } from "@react-icons/all-files/fa/FaMinusCircle"
import { FaPen } from "@react-icons/all-files/fa/FaPen"

export default function Card({
  title,
  counterNumber,
  deleteCurrentCard,
  counterID,
  incrementCounter,
  decrementCounter,
  updateCounterNumber,
  setTitleOfCard,
}) {
  const [thisCounterNumber, setThisCounterNumber] = useState(counterNumber)
  const [previousTitle, setPreviousTitle] = useState(title)
  const counterNumberEl = useRef(null)

  function removeFocusIfReadonly(e) {
    if (counterNumberEl.current.hasAttribute("readOnly")) {
      e.preventDefault()
      counterNumberEl.current.blur()
    }
  }

  function focusInputField(e) {
    counterNumberEl.current.removeAttribute("readOnly") //
    counterNumberEl.current.focus()
    counterNumberEl.current.classList.add("can-focus") //when clicking somewhere else, you need to remove these
  }

  function numberValueKeyDown(e) {
    const numberArray = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
    ]
    let pressedNumber = numberArray.find(elem => String(elem) === e.key)

    if (!pressedNumber) {
      e.preventDefault()
    }

    updateThisCounterNumber(counterID, title, e.target.value)
    //if enter, update current value state
  }

  function updateThisCounterNumber(counterID, title, targetValue) {
    setThisCounterNumber(parseInt(targetValue))
    updateCounterNumber(counterID, title, parseInt(targetValue))
  }

  function titleFieldKeyDown(e) {
    if (e.key === "Enter") {
      setTitleOfCard(counterID, title, e.target.value)
      setPreviousTitle(e.target.value)
    }
  }

  function restoreTitleOnBlur(e) {
    e.target.value = previousTitle
  }

  function incrementThisCounter(counterID, title) {
    const newCounterNumber = thisCounterNumber + 1
    counterNumberEl.current.value = newCounterNumber
    setThisCounterNumber(newCounterNumber)
    incrementCounter(counterID, title)
  }

  function decrementThisCounter(counterID, title) {
    const newCounterNumber = thisCounterNumber - 1
    counterNumberEl.current.value = newCounterNumber
    setThisCounterNumber(newCounterNumber)
    decrementCounter(counterID, title)
  }

  return (
    <div className={styles.card}>
      <input
        type="text"
        className={styles.cardTitle}
        defaultValue={title}
        onKeyDown={titleFieldKeyDown}
        onBlur={restoreTitleOnBlur}
      ></input>
      <div className={styles.counterSection}>
        <input
          type="number"
          ref={counterNumberEl}
          className={styles.counterNumber}
          defaultValue={thisCounterNumber}
          onClick={removeFocusIfReadonly}
          onKeyDown={numberValueKeyDown}
          autoComplete="off"
          readOnly
        ></input>
        <FaPen className={styles.editCountNumber} onClick={focusInputField} />
      </div>
      <div className={styles.counterIncrementDecrementContainer}>
        <FaPlusCircle
          className={styles.incrementor}
          onClick={() => {
            incrementThisCounter(counterID, title)
          }}
        />
        <FaMinusCircle
          onClick={() => {
            decrementThisCounter(counterID, title)
          }}
          className={styles.decrementor}
        />
      </div>

      <FaTrashAlt
        className={styles.deleter}
        onClick={() => {
          deleteCurrentCard(counterID)
        }}
      />
    </div>
  )
}
