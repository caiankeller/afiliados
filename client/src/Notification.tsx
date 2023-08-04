import { useEffect, useState } from "react";
import { Danger, Notification as NotificationIconly } from "react-iconly";

export type TType = "error" | "success";

function Notification({ message, type }: { message?: string; type?: TType }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10 * 1000); // 10 times 1000 milliseconds, so, 10 seconds

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div
      data-visible={isVisible}
      className={`${
        type === "error"
          ? "bg-rose-500 underline underline-offset-2 shadow-rose-500"
          : "bg-green-500 text-neutral-900 shadow-green-500"
      } rounded w-full p-2 shadow-sm data-[visible=true]:top-2 text-sm text-justify duration-500 absolute -top-10 max-w-[1000px] mx-auto left-0 right-0 flex font-bold items-center gap-1 `}
    >
      {type === "error" ? (
        <Danger set="bold" size="small" />
      ) : (
        <NotificationIconly set="bold" size="small" />
      )}
      {message}
    </div>
  );
}

export default Notification;
