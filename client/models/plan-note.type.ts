export interface PlanNote {
  color: string;
  content: string;
  date: string;
  id: string;
  colorCode?: string;
  fields: Array<{
    reps: string;
    qty: string;
    type: string;
    pace: string;
    description: string;
  }>;
}
