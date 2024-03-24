import { useEffect, useState } from "react";
import { useDelayedUnmount } from "@/hooks/useDelayedUnmount.jsx";
import { usePageState } from "@/store/PageStateProvider.jsx";

import "./action-popup.scss";

export const ActionPopup = () => {
  const { currentActionStatus } = usePageState();
  const [actionStatus, setActionStatus] = useState(currentActionStatus);

  const { isHide } = useDelayedUnmount(!!currentActionStatus, () =>
    setActionStatus(null),
  );

  useEffect(() => {
    if (currentActionStatus) setActionStatus(currentActionStatus);
  }, [currentActionStatus]);

  if (!actionStatus) return null;

  return (
    <div
      className={`actionPopup ${actionStatus?.isSuccess ? "" : "failure"} ${isHide ? "hidePopup" : ""}`}
    >
      <p className="message">{actionStatus?.message || "no message"}</p>
    </div>
  );
};
