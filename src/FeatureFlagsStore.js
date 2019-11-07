import React, { useState } from "react";
import FeatureFlagsContext from "./FeatureFlagsContext";
import FeatureFlagsUI from "./FeatureFlagsUI";

export default function FeatureFlagsStore({ children, enableUI }) {
  const [flags, setFlags] = useState({});
  return (
    <FeatureFlagsContext.Provider value={{ flags, setFlags }}>
      {children}
      {enableUI && <FeatureFlagsUI />}
    </FeatureFlagsContext.Provider>
  );
}
