import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-details-dialog',
  templateUrl: './event-details-dialog.component.html',
  styleUrls: ['./event-details-dialog.component.css']
})
export class EventDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: any }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

   subtractDays(date: Date, days: number): Date {
    const result = new Date(date); // Create a new date instance to avoid mutating the original
    result.setDate(result.getDate() - days);
    return result;
  }
}
