// Completed projects shown on /projects. Add entries here as they are shared;
// the page shows a "case studies on their way" state while this list is empty.
// Write each as problem -> what we did -> measurable outcome.
export type Project = {
  title: string;
  client?: string; // e.g. "Mid-size road contractor, Maharashtra" if the name is confidential
  year?: string;
  category: string;
  summary: string;
  outcomes?: string[]; // e.g. "Weekly reporting cut from 6 hours to 40 minutes"
};

export const projects: Project[] = [];
