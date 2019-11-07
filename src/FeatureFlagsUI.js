import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import FeatureFlagsContext from "./FeatureFlagsContext";
import "./FeatureFlagsUI.css";

export default function FeatureFlagsUI() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { flags, setFlags } = useContext(FeatureFlagsContext);
  function onFlagChange(k) {
    setFlags({
      ...flags,
      [k]: !flags[k]
    });
  }

  function render() {
    return (
      <div className={"FeatureFlagsRoot" + (isExpanded ? " -expanded" : "")}>
        <div className="title">
          <button
            className="toggleButton"
            type="button"
            onClick={() => setIsExpanded(b => !b)}
          >
            {isExpanded ? "X" : "<"}
          </button>
        </div>
        {Object.keys(flags).map(k => {
          return (
            <p key={k}>
              <label>
                <input
                  type="checkbox"
                  checked={flags[k]}
                  onChange={() => onFlagChange(k)}
                />
                {k}
              </label>
            </p>
          );
        })}
      </div>
    );
  }

  return ReactDOM.createPortal(render(), document.body);
}
