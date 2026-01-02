import React, { useState } from "react";
import MigrationForm from "./components/MigrationForm";
import RollbackForm from "./components/RollbackForm";
import JobPanel from "./components/JobPanel";
import { JobInfo } from "./api";

const App: React.FC = () => {
  const [currentJob, setCurrentJob] = useState<JobInfo | null>(null);

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Project Migrate</h1>
      <p>Enqueue migrations and rollbacks, then watch their progress.</p>
      <MigrationForm onJobEnqueued={setCurrentJob} />
      <RollbackForm onJobEnqueued={setCurrentJob} />
      <JobPanel job={currentJob} />
    </div>
  );
};

export default App;
