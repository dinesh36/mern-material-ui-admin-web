import dayjs, { Dayjs } from 'dayjs';
import { Plan } from '../../../models/plan.type';
import { PlanNote } from '../../../models/plan-note.type';
import {
  getplanMonths,
  getPlanStartEndDates,
  getWeekDisplayCounter,
} from '../../../utils/date-utils';
import {
  formatQty,
  getCurrentMonthDays,
  getPaceLabel,
} from './getCurrentMonthDays';
import appColors from '../../shared/appColor';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const NOTE_COLOR_CODES = {
  green: appColors.green,
  red: appColors.red,
  yellow: appColors.yellow,
  blue: appColors.blue,
  purple: appColors.purple,
  black: appColors.black,
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
    // @ts-ignore
    this.planNotes = planNotes.map((note) => {
      return {
        ...note,
        date: dayjs(note.date),
      };
    });
    this.font400 = 'Helvetica';
    this.font500 = 'Helvetica';
    this.font600 = 'Helvetica';
    this.font700 = 'Helvetica';
    // this.font400 = path.join(__dirname,'..', '..', 'assets', 'fonts', 'DMSans-400.ttf');
    // this.font500 = path.join(__dirname, '..', '..', 'assets', 'fonts', 'DMSans-500.ttf');
    // this.font600 = path.join(__dirname, '..', '..', 'assets', 'fonts', 'DMSans-600.ttf');
    // this.font700 = path.join(__dirname, '..', '..', 'assets', 'fonts', 'DMSans-700.ttf');
    // this.calendarIcon = fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'icons', 'calendar-icon.svg'), 'utf-8');

    this.pageHeight = this.doc.page.height;
    this.pageWidth = this.doc.page.width;
    this.colors = {
      defaultTextColor: 'black',
      defaultBackGround: 'white',
    };
    this.sidePadding = 30;
    this.monthDays = [];
    this.weekNumberBoxWidth = 59.7;
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
      fill: appColors.pearlWhite,
      stroke: appColors.lightGray,
    });
  }
  generateCalendarIcon() {
    const iconXPosition = 45;
    const iconYPosition = this.doc.y - 2;
    this.doc
      .translate(iconXPosition, iconYPosition)
      .scale(0.5)
      .path(
        'M17 2H15V1C15 0.734784 14.8946 0.48043 14.7071 0.292893C14.5196 0.105357 14.2652 0 14 0C13.7348 0\n' +
          '        13.4804 0.105357 13.2929 0.292893C13.1054 0.48043 13 0.734784 13 1V2H7V1C7 0.734784 6.89464 0.48043 6.70711\n' +
          '        0.292893C6.51957 0.105357 6.26522 0 6 0C5.73478 0 5.48043 0.105357 5.29289 0.292893C5.10536 0.48043 5 0.734784\n' +
          '        5 1V2H3C2.20435 2 1.44129 2.31607 0.87868 2.87868C0.316071 3.44129 0 4.20435 0 5V17C0 17.7956\n' +
          '        0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20\n' +
          '        18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V5C20 4.20435 19.6839\n' +
          '        3.44129 19.1213 2.87868C18.5587 2.31607 17.7956 2 17 2ZM18 17C18 17.2652 17.8946 17.5196\n' +
          '        17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196\n' +
          '        2 17.2652 2 17V10H18V17ZM18 8H2V5C2 4.73478 2.10536 4.48043 2.29289 4.29289C2.48043 4.10536 2.73478 4 3\n' +
          '        4H5V5C5 5.26522 5.10536 5.51957 5.29289 5.70711C5.48043 5.89464 5.73478 6 6 6C6.26522 6 6.51957 5.89464\n' +
          '        6.70711 5.70711C6.89464 5.51957 7 5.26522 7 5V4H13V5C13 5.26522 13.1054 5.51957 13.2929 5.70711C13.4804\n' +
          '        5.89464 13.7348 6 14 6C14.2652 6 14.5196 5.89464 14.7071 5.70711C14.8946 5.51957 15 5.26522 15 5V4H17C17.2652\n' +
          '        4 17.5196 4.10536 17.7071 4.29289C17.8946 4.48043 18 4.73478 18 5V8Z'
      )
      .fill(appColors.gray)
      .scale(2)
      .translate(-iconXPosition, -iconYPosition)
      .fill(this.colors.defaultTextColor);
  }

  calculateTotals() {
    let totalDistanceMiles = 0;
    let totalDistanceKms = 0;
    let totalTimeSeconds = 0;
    let totalOther = 0;
    const userMeasurementType = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).measurementType;
    const conversions = {
      miles: { miles: 1, kilometers: 0.621371, meters: 0.000621371 },
      kilometers: { miles: 1.60934, kilometers: 1, meters: 0.001 },
    };
    this.planNotes.forEach((note) => {
      note.fields.forEach((field) => {
        const qty = parseFloat(field.qty) || 0;
        const reps = parseInt(field.reps) || 1; // Assuming reps is a numeric value

        if (
          field.type === 'kilometers' ||
          field.type === 'miles' ||
          field.type === 'meters'
        ) {
          totalDistanceMiles +=
            qty *
            reps *
            conversions.miles[field.type as keyof typeof conversions.miles];
          totalDistanceKms +=
            qty *
            reps *
            conversions.kilometers[
              field.type as keyof typeof conversions.kilometers
            ];
        } else if (field.type === 'time') {
          const [hours, minutes, seconds] = field.qty.split(':').map(Number);
          totalTimeSeconds += (hours * 3600 + minutes * 60 + seconds) * reps;
        } else {
          totalOther += qty * reps;
        }
      });
    });

    const totalHours = Math.floor(totalTimeSeconds / 3600);
    const totalMinutes = Math.floor((totalTimeSeconds % 3600) / 60);
    const totalSeconds = totalTimeSeconds % 60;

    let totalTime = '';
    if (totalTimeSeconds > 0) {
      totalTime =
        totalHours > 0
          ? `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`
          : `${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
    }

    return {
      totalDistanceKms,
      totalDistanceMiles,
      totalTime,
      totalOther,
      userMeasurementType,
    };
  }

  generateHeaderContent() {
    const {
      totalDistanceKms,
      totalDistanceMiles,
      totalTime,
      totalOther,
      userMeasurementType,
    } = this.calculateTotals();
    const headerXStart = this.sidePadding + 15;
    this.doc.fillColor('black');
    this.doc
      .font(this.font700)
      .fontSize(14)
      .text(this.plan.title, headerXStart, 42);
    this.doc
      .font(this.font400)
      .fontSize(10)
      .text(this.plan.description, headerXStart, 70, {
        width: this.pageWidth - 80,
        height: 95,
        ellipsis: true,
      });

    const startDate = this.planStartDate.format('DD MMM');
    const time = `${startDate} | ${this.plan.weeks} Weeks`;
    this.doc.moveDown(0.6);
    this.generateCalendarIcon();
    this.doc
      .font(this.font700)
      .fontSize(9)
      .text(time, headerXStart + 15, this.doc.y);

    const totalDistanceDisplay =
      userMeasurementType === 'KMs'
        ? `Total Distance: ${totalDistanceKms.toFixed(1)} KMs`
        : `Total Distance: ${totalDistanceMiles.toFixed(1)} Miles`;

    const total = [
      totalDistanceKms || totalDistanceMiles > 0 ? totalDistanceDisplay : null,
      totalTime ? `Total Time: ${totalTime}` : null,
      totalOther > 0 ? `Total Other: ${totalOther}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    this.doc.moveDown(0.6);
    this.doc
      .font(this.font400)
      .fontSize(10)
      .text(total, headerXStart, this.doc.y, {
        width: this.pageWidth - 80,
        ellipsis: true,
      });
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
      fill: appColors.lightGray1,
      stroke: appColors.grey,
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
    weekCounter,
    totalDistance,
    userMeasurementType,
    totalTime,
    totalOther,
  }: {
    yPosition: number;
    boxHeight: number;
    weekCounter?: number;
    totalDistance?: number;
    userMeasurementType?: string;
    totalTime?: string;
    totalOther?: number;
  }) {
    this.generateBox({
      x: 0,
      y: yPosition,
      w: this.weekNumberBoxWidth,
      h: boxHeight,
      fill: appColors.lightGray1,
      stroke: appColors.grey,
    });

    if (!weekCounter) {
      return;
    }

    let textYPosition = yPosition + boxHeight / 20 + 5;
    this.doc
      .font(this.font500)
      .fontSize(7)
      .text(`Week ${weekCounter}`, this.weekTitleX, textYPosition, {
        width: this.weekNumberBoxWidth - 7,
        lineBreak: true,
        ellipsis: false,
      });
    textYPosition += 16;

    if (totalDistance) {
      this.doc.text(
        `Distance: ${totalDistance.toFixed(2)} ${userMeasurementType}`,
        this.weekTitleX,
        textYPosition,
        {
          width: this.weekNumberBoxWidth - 7,
          lineBreak: true,
          ellipsis: false,
        }
      );
      textYPosition += 18;
    }
    if (totalTime) {
      this.doc.text(`Time: ${totalTime}`, this.weekTitleX, textYPosition, {
        width: this.weekNumberBoxWidth - 7,
        lineBreak: true,
        ellipsis: false,
      });
      textYPosition += 10;
    }

    if (totalOther) {
      this.doc.text(`Other: ${totalOther}`, this.weekTitleX, textYPosition, {
        width: this.weekNumberBoxWidth - 7,
        lineBreak: true,
        ellipsis: false,
      });
    }
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
      // @ts-ignore
      (date as Dayjs).isSame(monthDay)
    );
    this.generateBox({
      x: xPosition,
      y: yPosition,
      w: this.dayBoxWidth,
      h: 100,
      fill: isSameMonth && isInRange ? appColors.white : appColors.lightGray1,
      stroke: appColors.grey,
    });
    if (matchingNote && isInRange && isSameMonth) {
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
      let formattedText = '';
      if (Array.isArray(matchingNote.fields)) {
        matchingNote.fields.forEach((field) => {
          const setReps = field?.reps ? `${field.reps} X ` : '';
          const qtyDisplay =
            field.type === 'time' ? formatQty(field.qty) : `${field.qty}`;
          const typeDisplay = field.type ? field.type : '';
          const paceDisplay = field.pace
            ? ` - ${getPaceLabel(field.pace)}`
            : '';

          let displayText = `${setReps}${qtyDisplay} ${typeDisplay}${paceDisplay}`;

          formattedText += `${displayText}\n`;
        });
        formattedText += '\n';
      }
      this.doc
        .font(this.font500)
        .fontSize(6)
        .fill(noteColor)
        .text(formattedText, xPosition + 6, yPosition + 25, {
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
        fill: appColors.primary,
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
        .text(displayDate, currentDayXPosition, yPosition + 9);
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
    const weeksDisplayData = getWeekDisplayCounter({
      plan: this.plan,
      currentMonth: this.currentMonth,
      currentMonthDays: this.monthDays,
      planNotes: this.planNotes,
      isCalendarView: false,
    });
    for (let weekIndex = 1; weekIndex <= monthWeeks; weekIndex++) {
      const weekDisplayData = weeksDisplayData[weekIndex - 1];
      this.generateSideWeekCountBox({
        yPosition,
        boxHeight,
        ...weekDisplayData,
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
      stroke: appColors.grey,
    });
    const footerStartY = this.pageHeight - 30;
    this.doc
      .font(this.font700)
      .fontSize(10)
      .text('MyPlan26.com', this.sidePadding, footerStartY);
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
