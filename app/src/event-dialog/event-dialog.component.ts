import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent {
  title: string = '';
  startDate = new Date(this.data.startDate); 
  endDate= new Date(this.data.startDate); 
  priority = 'medium'; // Default priority

  priorities = [
    { value: 'high', viewValue: 'High' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'low', viewValue: 'Low' }
  ];
  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { startDate: Date }
  ) {}

  
  onAddEvent(): void {
    this.dialogRef.close({
      title: this.title,
      endDate: this.endDate ,
      priority: this.priority
    });
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
