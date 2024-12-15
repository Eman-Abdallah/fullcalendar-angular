import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-details-dialog',
  templateUrl: './event-details-dialog.component.html',
  styleUrls: ['./event-details-dialog.component.css']
})
export class EventDetailsDialogComponent {
  isEdit = false; 
  endDate:any;
  constructor(
    public dialogRef: MatDialogRef<EventDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: any }
  ) {
    this.endDate = this.subtractDays(data.event.end, 1);
  }

  onClose(): void {
    this.dialogRef.close();
  }

   subtractDays(date: Date, days: number): Date {
    const result = new Date(date); // Create a new date instance to avoid mutating the original
    result.setDate(result.getDate() - days);
    return result;
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data.event); // Return the updated event
  }
}
