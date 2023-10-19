import React from "react";
import { useCountdown } from "../../hooks/useCountdown";

export const Countdown = ({ targetDate }: { targetDate: number }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <span className="font-bold">expired</span>;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <div className="show-counter">
      <a href="" target="_blank" rel="noopener noreferrer" className="text-sm">
        <DateTimeDisplay value={days} type={"d "} isDanger={days <= 3} />
        <DateTimeDisplay value={hours} type={"hr "} isDanger={false} />
        <DateTimeDisplay value={minutes} type={"m "} isDanger={false} />
        <DateTimeDisplay value={seconds} type={"s "} isDanger={false} />
      </a>
    </div>
  );
};

const DateTimeDisplay = ({
  value,
  type,
  isDanger,
}: {
  value: any;
  type: any;
  isDanger: any;
}) => {
  return (
    <>
      {value > 0 ? (
        <>
          <span>{value}</span>
          <span>{type}</span>
        </>
      ) : (
        ""
      )}
    </>
  );
};
