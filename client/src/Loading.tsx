import { useEffect, useState } from "react";

function Loading() {
  const text = "...";
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let reset = 1;
    let i = reset;
    const intervalId = setInterval(() => {
      setCurrentText(text.substring(0, i++));
      if (i > text.length) i = reset;
    }, 300);
    return () => clearInterval(intervalId);
  }, [text]);

  return <>{currentText}</>;
}

export default Loading;
