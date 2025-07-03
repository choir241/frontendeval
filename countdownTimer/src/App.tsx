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

import { useState, useEffect } from "react";

export default function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [isPause, setIsPause] = useState(false);

  function startTheTimer() {
    if (hours && !minutes && !seconds) {
      setMinutes(59);
      setSeconds(59);
    } else if (minutes && !seconds) {
      setSeconds(59);
    }
  }

  useEffect(() => {
    if (startTimer && seconds > 0 && !isPause) {
      setTimeout(() => {
        setSeconds(seconds - 1);
        if (hours && minutes === 1 && seconds === 1) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        }
        if (seconds === 1 && minutes) {
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
      alert("Timer is finished!");
      resetTimer();
    }
  }, [hours, seconds, minutes, startTimer, isPause]);

  function resetTimer() {
    setStartTimer(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  }

  return (
    <section className="countdownContainer">
      <input
        className={`${startTimer ? "hidden" : "flex"}`}
        type="number"
        placeholder="HH"
        minLength={0}
        maxLength={2}
        max={60}
        min={0}
        onChange={(e) => setHours(Number(e.target.value))}
      />
      <span className={`${startTimer ? "flex" : "hidden"}`}>
        {hours < 10 ? `${"0" + hours}` : hours}
      </span>
      <span className="colon">{":"}</span>
      <span className={`${startTimer ? "flex" : "hidden"}`}>
        {minutes < 10 ? `${"0" + minutes}` : minutes}
      </span>
      <input
        className={`${startTimer ? "hidden" : "flex"}`}
        type="number"
        placeholder="MM"
        minLength={0}
        maxLength={2}
        max={60}
        min={0}
        onChange={(e) => setMinutes(Number(e.target.value))}
      />
      <span className="colon">{":"}</span>
      <span className={`${startTimer ? "flex" : "hidden"}`}>
        {seconds < 10 ? `${"0" + seconds}` : seconds}
      </span>

      <input
        className={`${startTimer ? "hidden" : "flex"}`}
        type="number"
        placeholder="SS"
        minLength={0}
        maxLength={2}
        max={60}
        min={0}
        onChange={(e) => setSeconds(Number(e.target.value))}
      />

      {!isPause && startTimer ? (
        <button
          onClick={() => setIsPause(true)}
          className={`${startTimer ? "flex" : "hidden"}`}
        >
          Pause
        </button>
      ) : (
        <button
          className={isPause || !startTimer ? "flex" : "hidden"}
          onClick={() => {
            if (
              (seconds.toString().length < 3 &&
                minutes.toString().length < 3 &&
                hours.toString().length < 3 &&
                hours > 0) ||
              minutes > 0 ||
              seconds > 0
            ) {
              if (!startTimer) {
                startTheTimer();
              }

              setIsPause(false);
              setStartTimer(true);
            } else {
              alert("Input the correct time formatting");
            }
          }}
        >
          Start
        </button>
      )}

      <button
        className={`${startTimer ? "flex" : "hidden"}`}
        onClick={() => resetTimer()}
      >
        Reset
      </button>
    </section>
  );
}
