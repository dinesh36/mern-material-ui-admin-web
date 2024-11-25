/* eslint-disable no-restricted-syntax */
import path from 'path';
import { PlanNote } from '../plan-note/plan-note.type';
import { Plan } from '../plan/plan.type';
import dayjs, { Dayjs } from 'dayjs';
import svgToPdf from 'svg-to-pdfkit';
import * as fs from 'node:fs';
import {
  getCurrentMonthDays,
  getplanMonths,
  getPlanStartEndDates,
  getWeekDisplayCounter,
} from './date-utils';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const NOTE_COLOR_CODES = {
  green: '#337E89',
  red: '#DA0808',
  yellow: '#FFAE00',
  blue: '#1760EC',
  purple: '#9717EC',
  black: '#000000',
};

export default class PdfGenerator {
  doc: any;
  plan: Plan;
  planNotes: PlanNote[];
  font400: any;
  font500: any;
  font600: any;
  font700: any;
  calendarIcon: any;
  pageHeight: number;
  pageWidth: number;
  colors: any;
  sidePadding: number;
  monthDays: Array<Dayjs>;
  currentMonth: Dayjs;
  weekNumberBoxWidth: number;
  dayBoxWidth: number;
  weekTitleX: number;
  planStartDate: Dayjs;
  planEndDate: Dayjs;

  constructor({
    doc,
    plan,
    planNotes,
  }: {
    doc: any;
    plan: Plan;
    planNotes: PlanNote[];
  }) {
    this.doc = doc;
    this.plan = plan;
    this.planNotes = planNotes.map((note) => {
      return {
        ...note,
        date: dayjs(note.date),
      };
    });
    this.font400 = path.join(
      __dirname,
      '..',
      '..',
      'assets',
      'fonts',
      'DMSans-400.ttf'
    );
    this.font500 = path.join(
      __dirname,
      '..',
      '..',
      'assets',
      'fonts',
      'DMSans-500.ttf'
    );
    this.font600 = path.join(
      __dirname,
      '..',
      '..',
      'assets',
      'fonts',
      'DMSans-600.ttf'
    );
    this.font700 = path.join(
      __dirname,
      '..',
      '..',
      'assets',
      'fonts',
      'DMSans-700.ttf'
    );
    this.calendarIcon = fs.readFileSync(
      path.join(__dirname, '..', '..', 'assets', 'icons', 'calendar-icon.svg'),
      'utf-8'
    );
    this.pageHeight = this.doc.page.height;
    this.pageWidth = this.doc.page.width;
    this.colors = {
      defaultTextColor: 'black',
      defaultBackGround: 'white',
    };
    this.sidePadding = 30;
    this.monthDays = [];
    this.weekNumberBoxWidth = 47;
    this.weekTitleX = 9;
    this.currentMonth = dayjs();
    this.dayBoxWidth = (this.pageWidth - this.weekNumberBoxWidth) / 7;

    const { planStartDate, planEndDate } = getPlanStartEndDates(plan);
    this.planStartDate = planStartDate;
    this.planEndDate = planEndDate;
  }

  generateBox({
    x,
    y,
    w,
    h,
    fill = this.colors.defaultBackGround,
    stroke,
    opacity = 1,
  }: {
    x: number;
    y: number;
    w: number;
    h: number;
    fill?: string;
    stroke?: string;
    opacity?: number;
  }) {
    this.doc.fillColor(fill, opacity).rect(x, y, w, h).fill();

    if (stroke) {
      this.doc.strokeColor(stroke).rect(x, y, w, h).stroke();
    }
    this.doc.fillColor(this.colors.defaultTextColor, 1);
  }

  generateHeaderBox() {
    this.generateBox({
      x: this.sidePadding,
      y: 30,
      w: this.pageWidth - 60,
      h: this.doc.y - 18,
      fill: '#F7F7F7',
      stroke: '#E8E8E8',
    });
  }

  generateHeaderContent() {
    const headerXStart = this.sidePadding + 15;
    this.doc.fillColor('black');
    this.doc
      .font(this.font700)
      .fontSize(14)
      .text(this.plan.title, headerXStart, 42);
    this.doc
      .font(this.font400)
      .fontSize(12)
      .text(this.plan.description, headerXStart, 70);

    const startDate = this.planStartDate.format('DD MMM');
    const time = `${startDate} | ${this.plan.weeks} Weeks`;
    this.doc.moveDown(0.5);
    svgToPdf(this.doc, this.calendarIcon, headerXStart, this.doc.y);
    this.doc
      .font(this.font700)
      .fontSize(10)
      .text(time, headerXStart + 20, this.doc.y);
  }

  generateHeader() {
    this.generateHeaderContent();
    this.generateHeaderBox();
    this.generateHeaderContent();
  }

  generateMonthTitle(month: Dayjs) {
    const monthTitle = month.format('MMMM YYYY');
    this.doc
      .font(this.font700)
      .fontSize(20)
      .text(monthTitle, this.sidePadding, this.doc.y + 30);
  }

  generateMonthWeekTitle() {
    this.generateBox({
      x: 0,
      y: this.doc.y + 20,
      w: this.pageWidth,
      h: 30,
      fill: '#FAFAFA',
      stroke: '#EFEFEF',
    });
    const titleYPosition = this.doc.y + 29;
    this.doc
      .font(this.font700)
      .fontSize(10)
      .text('Week', this.weekTitleX, titleYPosition);

    WEEK_DAYS.forEach((weekDay, index) => {
      const xPosition = this.weekNumberBoxWidth + index * this.dayBoxWidth + 30;
      this.doc
        .font(this.font400)
        .fontSize(10)
        .text(weekDay, xPosition, titleYPosition);
    });
  }

  generateSideWeekCountBox({
    yPosition,
    boxHeight,
    weekDisplayCountStr,
  }: {
    yPosition: number;
    boxHeight: number;
    weekDisplayCountStr: string;
  }) {
    this.generateBox({
      x: 0,
      y: yPosition,
      w: this.weekNumberBoxWidth,
      h: boxHeight,
      fill: '#FAFAFA',
      stroke: '#EFEFEF',
    });
    this.doc
      .font(this.font500)
      .fontSize(7)
      .text(weekDisplayCountStr, this.weekTitleX, yPosition + 10);
  }

  generateMonthDayBox({
    xPosition,
    yPosition,
    monthDay,
  }: {
    xPosition: number;
    yPosition: number;
    monthDay: Dayjs;
  }) {
    const isSameMonth = monthDay.startOf('month').isSame(this.currentMonth);
    const isCurrentDay = monthDay.isSame(dayjs().startOf('day'));
    const displayDate = monthDay.date();
    const isInRange = dayjs(monthDay).isBetween(
      dayjs(this.planStartDate).subtract(1, 'second'),
      dayjs(this.planStartDate)
        .add(this.plan.weeks * 7 - 1, 'days')
        .add(1, 'second')
    );
    const matchingNote = this.planNotes.find(({ date }) =>
      (date as Dayjs).isSame(monthDay)
    );
    this.generateBox({
      x: xPosition,
      y: yPosition,
      w: this.dayBoxWidth,
      h: 100,
      fill: isSameMonth && isInRange ? 'white' : '#FAFAFA',
      stroke: '#EFEFEF',
    });
    if (matchingNote) {
      // @ts-ignore
      const noteColor: string = NOTE_COLOR_CODES[matchingNote.color];
      this.generateBox({
        x: xPosition + 1,
        y: yPosition + 1,
        w: this.dayBoxWidth - 2,
        h: 100 - 2,
        fill: noteColor,
        opacity: 0.1,
        stroke: noteColor,
      });
      this.doc
        .font(this.font500)
        .fontSize(6)
        .fill(noteColor)
        .text(matchingNote.content, xPosition + 6, yPosition + 25, {
          width: this.dayBoxWidth - 12,
          height: 75,
          ellipsis: true,
        });
    }
    if (!isSameMonth) {
      return;
    }
    if (isCurrentDay) {
      this.generateBox({
        x: xPosition + 3,
        y: yPosition + 3,
        w: 20,
        h: 20,
        fill: '#195CE5',
      });
      // set date in center
      let currentDayXPosition = xPosition + 7;
      if (displayDate < 10) {
        currentDayXPosition = currentDayXPosition + 2;
      } else if (displayDate < 20) {
        currentDayXPosition = currentDayXPosition + 1;
      }
      this.doc
        .font(this.font500)
        .fontSize(10)
        .fill('white')
        .text(displayDate, currentDayXPosition, yPosition + 6);
      this.doc.fill('black');
    } else {
      this.doc
        .font(this.font500)
        .fontSize(10)
        .text(displayDate, xPosition + 6, yPosition + 6);
    }
  }

  renderMonthDays() {
    const monthWeeks = this.monthDays.length / 7;
    const boxHeight = 100;
    let yPosition = this.doc.y + 8;
    const weekDisplayCounters = getWeekDisplayCounter({
      plan: this.plan,
      currentMonth: this.currentMonth,
      currentMonthDays: this.monthDays,
    });
    for (let weekIndex = 1; weekIndex <= monthWeeks; weekIndex++) {
      const weekDisplayCountStr = weekDisplayCounters[weekIndex - 1];
      this.generateSideWeekCountBox({
        yPosition,
        boxHeight,
        weekDisplayCountStr,
      });
      for (let weekDayIndex = 1; weekDayIndex <= 7; weekDayIndex++) {
        const xPosition =
          this.weekNumberBoxWidth + (weekDayIndex - 1) * this.dayBoxWidth;
        const monthDay = this.monthDays[(weekIndex - 1) * 7 + weekDayIndex - 1];
        this.generateMonthDayBox({ xPosition, yPosition, monthDay });
      }
      yPosition += boxHeight;
    }
  }

  generateMonth(month: Dayjs) {
    this.generateMonthTitle(month);
    this.generateMonthWeekTitle();
    this.renderMonthDays();
  }

  generateMonths() {
    const months = getplanMonths(this.plan);
    months.forEach((month, index) => {
      if (index !== 0) {
        this.doc.addPage();
      }
      this.monthDays = getCurrentMonthDays(month);
      this.currentMonth = month;
      this.generateMonth(month);
      this.generateFooter({
        totalPages: months.length,
        currentPage: index + 1,
      });
    });
  }

  generateFooter({
    totalPages,
    currentPage,
  }: {
    totalPages: number;
    currentPage: number;
  }) {
    this.generateBox({
      x: 0,
      y: this.pageHeight - 50,
      w: this.pageWidth,
      h: this.pageHeight,
      stroke: '#EFEFEF',
    });
    const footerStartY = this.pageHeight - 30;
    this.doc
      .font(this.font700)
      .fontSize(10)
      .text('Marathon Coaching', this.sidePadding, footerStartY);
    this.doc
      .font(this.font400)
      .fontSize(10)
      .text(
        `Page ${currentPage} of ${totalPages}`,
        this.pageWidth - 80,
        footerStartY
      );
  }

  generatePDF() {
    this.generateHeader();
    this.generateMonths();
    this.doc.end();
  }
}
