import { useEffect, useState } from "react";
import { POPUP_ANIMATION_DURATION } from "@/constants/durations.js";

export const useDelayedUnmount = (isActiveComponent, delayedFunc) => {
  const [timerId, setTimerId] = useState(null);
  const [isHide, setIsHide] = useState(false);
  const [isComponentShown, setIsComponentShown] = useState(isActiveComponent);

  const onCLoseComponent = () => {
    setIsHide(true);

    const newTimerId = setTimeout(() => {
      delayedFunc?.();
      setIsComponentShown(false);
      setIsHide(null);
    }, POPUP_ANIMATION_DURATION);
    setTimerId(newTimerId);
  };

  useEffect(() => {
    if (timerId) {
      setIsHide(false);
      clearTimeout(timerId);
    }

    isActiveComponent ? setIsComponentShown(true) : onCLoseComponent();
  }, [isActiveComponent]);

  return { isHide, isComponentShown };
};
