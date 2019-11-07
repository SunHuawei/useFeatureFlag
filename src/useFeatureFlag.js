import { useContext } from "react";
import FeatureFlagsContext from "./FeatureFlagsContext";

export default function useFeatureFlag(flagName, defaultValue) {
  const { flags, setFlags } = useContext(FeatureFlagsContext);
  console.log("flags", flags);

  if (!(flagName in flags)) {
    setFlags({
      ...flags,
      [flagName]: defaultValue
    });
  }

  return [
    flagName in flags ? flags[flagName] : defaultValue,
    value => {
      console.log(flagName, value);
      setFlags({
        ...flags,
        [flagName]: value
      });
    }
  ];
}
