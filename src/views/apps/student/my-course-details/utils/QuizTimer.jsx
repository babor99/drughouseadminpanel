import { useState, useEffect } from "react";

import { Typography } from "@mui/material";

function QuizTimer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    // Set up the countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime < 1) {
          clearInterval(timer);
          onTimeUp(); // Call the onTimeUp function when the timer ends

          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [onTimeUp]);

  // Format time (optional)
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      <Typography variant="h5" className="font-bold">
        {hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
    </div>
  );
}

export default QuizTimer
