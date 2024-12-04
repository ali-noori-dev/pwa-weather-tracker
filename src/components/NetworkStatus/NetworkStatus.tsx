import React, { useEffect, useState } from "react";
import { RiWifiOffLine } from "react-icons/ri";
import { Flex } from "../common";
import "./NetworkStatus.scss";

const NetworkStatus: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {isOffline && (
        <Flex className="offline-message">
          <RiWifiOffLine className="offline-icon" />
          <span>You are offline</span>
        </Flex>
      )}
    </div>
  );
};

export default NetworkStatus;
