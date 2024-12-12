import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { CalendarOptions, Calendar, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, EventDragStopArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { EventDetailsDialogComponent } from './event-details-dialog/event-details-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  calendarOptions?: CalendarOptions;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;
  newEventTitle: string = '';
  newEventDate: Date = new Date();
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // need for load calendar bundle first
    forwardRef(() => Calendar);

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      editable: true,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: ''
      },
      events: [
        {
          title: 'High Priority',
          start: '2024-12-11',
          end: '2024-12-12',
          extendedProps: {
            priority: 'high'
          }
        },
        {
          title: 'Low Priority',
          start: '2024-12-13',
          end: '2024-12-14',
          extendedProps: {
            priority: 'low'
          }
        }
      ],
      eventClassNames: (arg) => {
        const priority = arg.event.extendedProps['priority'];
        if (priority === 'high') {
          return 'high-priority-event';
        }
        if (priority === 'medium') {
          return 'medium-priority-event';
        }
        if (priority === 'low') {
          return 'low-priority-event';
        }
        return '';
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this)
    };
  }

  handleDateClick(arg: DateClickArg) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '300px',
      data: { startDate: arg.date }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEvent(result.title, arg.date, result.endDate,result.priority);
      }
    });
  }

  handleEventClick(arg: EventClickArg) {
    console.log(arg.event );
    const dialogRef = this.dialog.open(EventDetailsDialogComponent, {
      width: '400px',
      data: { event: arg.event } // Pass the clicked event
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with:', result);
      }
    });
  }

  handleEventDragStop(arg: EventDragStopArg) {
    console.log(arg);
  }


  addEvent(title: string, startDate: Date, endDate: Date | null, priority: string) {
    // Ensure `events` is initialized as an array of EventInput
    if (!this.calendarOptions!.events) {
      this.calendarOptions!.events = [];
    } else if (!Array.isArray(this.calendarOptions!.events)) {
      throw new Error('Expected calendar events to be an array');
    }
  
    // Add new event
    const newEvent: EventInput = {
      title,
      start: startDate,
      end: endDate ? new Date(endDate.getTime() + 24 * 60 * 60 * 1000) : startDate,
      extendedProps: {
        priority // Attach priority as an extended property
      }
    };
  
    // Combine existing events with the new event
    const events = [...(this.calendarOptions!.events as EventInput[]), newEvent];
  
    // Temporarily clear and then reassign events to trigger updates
    this.calendarOptions!.events = []; // Clear temporarily
    setTimeout(() => {
      this.calendarOptions!.events = events; // Reassign events
    }, 0);
  }
  

}
