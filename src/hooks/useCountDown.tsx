import { useEffect, useState } from "react";

const useCountDown = (date: Date | string) => {
  const [countDown, setCountDown] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const targetDate = new Date(date);
      let timeDifference = targetDate.getTime() - now.getTime();
      timeDifference = timeDifference < 0 ? 0 : timeDifference;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountDown({ d: days, h: hours, m: minutes, s: seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date]);

  return {
    days: `${countDown.d <= 9 ? "0" + countDown.d : countDown.d}`,
    hours: `${countDown.h <= 9 ? "0" + countDown.h : countDown.h}`,
    minutes: `${countDown.m <= 9 ? "0" + countDown.m : countDown.m}`,
    seconds: `${countDown.s <= 9 ? "0" + countDown.s : countDown.s}`,
  };
};

export default useCountDown;

10929873774;
