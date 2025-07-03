// Create a countdown timer that allows the user to enter hours, minutes, and seconds.
// Once the timer has started, the input fields should be replaced with plain text that updates every second. The 'Start' button should be replaced with 'Pause' and 'Reset' buttons.
// The 'Hours', 'Minutes', and 'Seconds' fields should not have visible labels, but they should be accessible and clearly labelled to a screen reader
// The input fields should use placeholder text as shown in the screenshot above

// Pressing 'Start' should start the timer, replace the input fields with plain text for the hours/minutes/seconds, and replace 'Start' with 'Pause' and 'Reset' buttons
// Pressing 'Pause' should pause the timer, and replace the 'Pause' button with a 'Start' button
// Pressing 'Reset' should revert the app back to the initial state
// While the timer is counting down, the numbers should be zero-padded (e.g. 01 vs 1)
// When the timer reaches zero, if the app has appropriate permissions, it should display a Notification that the timer is complete
// If the app doesn't have appropriate permissions, it should show an alert when the timer reaches zero

import { useState, useEffect, useRef } from "react";
import Input from "./Input";
import Button from "./Button";
import Span from "./Span";

export default function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const timeOut = useRef(0);

  function startTheTimer() {
    if (
      seconds <= 60 &&
      minutes <= 60 &&
      hours <= 60 &&
      (hours > 0 || minutes > 0 || seconds > 0)
    ) {
      setIsPause(false);
      setStartTimer(true);
    } else {
      alert("Input the correct time formatting");
    }
  }

  useEffect(() => {
    if (startTimer && seconds > 0 && !isPause) {
      timeOut.current = setTimeout(() => {
        setSeconds(seconds - 1);
        if (hours && minutes === 0 && seconds === 1) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else if (seconds === 1 && minutes) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    } else if (
      startTimer &&
      !isPause &&
      seconds === 0 &&
      minutes === 0 &&
      hours === 0
    ) {
      clearTimeout(timeOut.current);
      alert("Timer is finished!");
      resetTimer();
    }
  }, [hours, seconds, minutes, startTimer, isPause, timeOut]);

  function resetTimer() {
    setStartTimer(false);
    setIsPause(false);
    clearTimeout(timeOut.current);
    timeOut.current = 0;
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  }

  return (
    <section className="countdownContainer">
      <Input
        props={{
          value: hours,
          className: startTimer ? "hidden" : "flex",
          inputChangeHandler: setHours,
          placeholder: "HH",
        }}
      />
      <Span
        props={{
          className: `${startTimer ? "flex" : "hidden"}`,
          label: `${hours < 10 ? `${"0" + hours}` : hours}`,
        }}
      />

      <Span props={{ className: "colon", label: ":" }} />

      <Span
        props={{
          className: `${startTimer ? "flex" : "hidden"}`,
          label: `${minutes < 10 ? `${"0" + minutes}` : minutes}`,
        }}
      />

      <Input
        props={{
          value: minutes,
          className: startTimer ? "hidden" : "flex",
          inputChangeHandler: setMinutes,
          placeholder: "MM",
        }}
      />
      <Span props={{ className: "colon", label: ":" }} />

      <Span
        props={{
          className: `${startTimer ? "flex" : "hidden"}`,
          label: `${seconds < 10 ? `${"0" + seconds}` : seconds}`,
        }}
      />

      <Input
        props={{
          value: seconds, 
          className: startTimer ? "hidden" : "flex",
          inputChangeHandler: setSeconds,
          placeholder: "SS",
        }}
      />

      {!isPause && startTimer ? (
        <Button
          onClickEventHandler={() => {
            setIsPause(true);
            clearTimeout(timeOut.current);
          }}
          className={startTimer ? "flex" : "hidden"}
          label="Pause"
        />
      ) : (
        <Button
          onClickEventHandler={() => startTheTimer()}
          className={isPause || !startTimer ? "flex" : "hidden"}
          label="Start"
        />
      )}

      <Button
        className={`${startTimer ? "flex" : "hidden"}`}
        onClickEventHandler={() => resetTimer()}
        label="Reset"
      />
    </section>
  );
}
