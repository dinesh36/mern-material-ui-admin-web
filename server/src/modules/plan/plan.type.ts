export type Plan = {
  _id: string;
  id?: string;
  startDate: string | Date;
  userId?: string;
  weeks: number;
  title: string;
  revision: number;
  description: string;
};
