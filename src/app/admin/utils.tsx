import { LiteralUnion } from "react-hook-form";

interface ErrorProps {
  error: LiteralUnion<any, string>;
  message?: string | undefined;
  patternMessage?: string;
  minMessage?: string;
}

export const ErrorHandler = ({
  error,
  message,
  patternMessage,
  minMessage,
}: ErrorProps) => {
  if (error == "required") {
    return <p className="text-sm text-pink-3">This field is required</p>;
  } else if (error == "pattern") {
    return <p className="text-sm text-pink-3">{patternMessage}</p>;
  } else if (error == "min") {
    return <p className="text-sm text-pink-3">{minMessage}</p>;
  } else {
    return <p className="text-sm text-pink-3">{message}</p>;
  }
};
