import { Dayjs } from 'dayjs';

export type PlanNote = {
  color: string;
  content: string;
  date: string | Dayjs;
  id: string;
  _id: string;
};
