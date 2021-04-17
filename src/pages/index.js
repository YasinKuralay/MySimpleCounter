import React, { useEffect, useState } from "react"
import NavBar from "../components/NavBar.js"
import CardCreator from "../components/CardCreator.js"
import Card from "../components/Card.js"
import * as styles from "./Home.module.css"

export default function HomeScreen() {
  const [counters, setCounters] = useState([])
  const [countersMapped, setCountersMapped] = useState([])
  const [nextCounterId, setNextCounterId] = useState(
    parseInt(
      typeof window !== "undefined" && localStorage.getItem("nextCounterId")
    )
  )

  useEffect(() => {
    const newCounters = localStorage.getItem("counters")
    //if its the first visit, create according array for localstorage
    if (newCounters === null) {
      const firstVisitCounters = [{ counterID: 0, counter1: 0 }]
      localStorage.setItem("counters", JSON.stringify(firstVisitCounters))
      setCounters(firstVisitCounters)
      setNextCounterId(1)
      localStorage.setItem("nextCounterId", "1")
      //else, save counters in state
    } else if (newCounters) {
      setCounters(JSON.parse(newCounters))
    }
  }, [])

  useEffect(() => {
    if (counters) {
      const newCountersMapped = counters.map(counter => {
        return (
          <Card
            title={Object.keys(counter)[1]}
            counterNumber={Object.values(counter)[1]}
            counterID={counter.counterID}
            key={counter.counterID}
            deleteCurrentCard={deleteThisCard}
            incrementCounter={incrementCounter}
            decrementCounter={decrementCounter}
            updateCounterNumber={updateCounterNumber}
            setTitleOfCard={setTitleOfCard}
          />
        )
      })
      setCountersMapped(newCountersMapped)
    }
  }, [counters])

  function createNewCounter() {
    let newCounters = [...counters]
    newCounters.push({ counterID: nextCounterId, "New Counter": 0 })
    setCounters(newCounters)
    localStorage.setItem("counters", JSON.stringify(newCounters))

    const theNewCounterId = parseInt(nextCounterId) + 1
    setNextCounterId(theNewCounterId)
    localStorage.setItem("nextCounterId", theNewCounterId)
  }

  function deleteThisCard(counterID) {
    let theseCounters = [...counters]
    const indexOfCardToBeRemoved = theseCounters.findIndex(elem => {
      return elem.counterID === counterID
    })
    theseCounters.splice(indexOfCardToBeRemoved, 1)
    setCounters(theseCounters)
    localStorage.setItem("counters", JSON.stringify(theseCounters))
  }

  function incrementCounter(counterID, title) {
    let theseCounters = [...counters]
    const indexOfCounterToBeIncremented = theseCounters.findIndex(elem => {
      return elem.counterID === counterID
    })
    theseCounters[indexOfCounterToBeIncremented][title]++
    setCounters(theseCounters)
    localStorage.setItem("counters", JSON.stringify(theseCounters))
  }

  function decrementCounter(counterID, title) {
    let theseCounters = [...counters]
    const indexOfCounterToBeDecremented = theseCounters.findIndex(elem => {
      return elem.counterID === counterID
    })
    theseCounters[indexOfCounterToBeDecremented][title]--
    setCounters(theseCounters)
    localStorage.setItem("counters", JSON.stringify(theseCounters))
  }

  function updateCounterNumber(counterID, title, newNumber) {
    let theseCounters = [...counters]
    const indexOfCounterToBeUpdated = theseCounters.findIndex(elem => {
      return elem.counterID === counterID
    })
    theseCounters[indexOfCounterToBeUpdated][title] = newNumber
    setCounters(theseCounters)
    localStorage.setItem("counters", JSON.stringify(theseCounters))
  }

  function setTitleOfCard(counterID, title, targetValue) {
    let theseCounters = [...counters]
    const indexOfCounterToBeUpdated = theseCounters.findIndex(elem => {
      return elem.counterID === counterID
    })
    theseCounters[indexOfCounterToBeUpdated][targetValue] =
      theseCounters[indexOfCounterToBeUpdated][title]
    delete theseCounters[indexOfCounterToBeUpdated][title]
    console.log("the new object: ", theseCounters)
    setCounters(theseCounters)
    localStorage.setItem("counters", JSON.stringify(theseCounters))
  }

  return (
    <div>
      <NavBar />
      <div className={styles.cardContainer}>
        {countersMapped && countersMapped}
        <CardCreator createCounter={createNewCounter} />
      </div>
    </div>
  )
}
