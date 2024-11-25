import Papa from 'papaparse';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import downloadBlob from './download-blob';
import { PlanNote } from '../models/plan-note.type';
import { Plan } from '../models/plan.type';
import { getPlanStartEndDates } from './date-utils';

dayjs.extend(isSameOrBefore);

interface ExportData {
  Date: string;
  WeekDay: string;
  Note: string;
  NoteColor: string;
}

export const exportToCsv = (plan: Plan, planNotes: PlanNote[]) => {
  const { planStartDate, planEndDate } = getPlanStartEndDates(plan);

  const data: ExportData[] = [];
  let current = dayjs(planStartDate);
  const end = dayjs(planEndDate);

  while (current.isSameOrBefore(end)) {
    const noteObj = planNotes.find(({ date }) => dayjs(date).isSame(current));
    data.push({
      Date: current.format('YYYY-MM-DD'),
      WeekDay: current.format('dddd'),
      Note: noteObj?.content || '',
      NoteColor: noteObj?.color || '',
    });
    current = current.add(1, 'day');
  }

  const csv = Papa.unparse(data, { quotes: true });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob({ blob, fileName: `${plan.title}-plan.csv` });
};
