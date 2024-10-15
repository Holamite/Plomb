import useCountDown from "@/hooks/useCountDown";

const Countdown = ({ targetData }: { targetData: Date | string }) => {
  const { days, hours, minutes, seconds } = useCountDown(targetData);

  const countdown = [
    {
      label: "DD",
      count: `${days}`,
    },
    {
      label: "HH",
      count: `${hours}`,
    },
    {
      label: "MM",
      count: `${minutes}`,
    },
    {
      label: "S",
      count: `${seconds}`,
    },
  ];

  return (
    <div className="flex">
      {countdown.map((item, index) => (
        <div key={index} className="flex flex-col px-1">
          <h3 className="flex gap-2 justify-center text-xl font-semibold">
            <span>{item.count}</span>
            {index !== 3 && <span>:</span>}
          </h3>
          <h3 className="flex gap-2 justify-center text-xs font-semibold">
            <span>{item.label}</span>
            {index !== 3 && <span className="invisible">:</span>}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
