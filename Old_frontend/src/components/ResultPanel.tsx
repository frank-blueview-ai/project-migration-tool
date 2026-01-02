import React from "react";

interface Props {
  result: any | null;
}

const ResultPanel: React.FC<Props> = ({ result }) => {
  if (!result) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Result</h3>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default ResultPanel;
