import { PlanNote } from './plan-note.type';

export interface Plan {
  id?: string;
  startDate: string;
  weeks: number;
  title: string;
  description?: string;
  notes?: PlanNote[];
}
