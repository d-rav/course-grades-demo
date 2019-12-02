import { Component, ViewChild } from '@angular/core';
import { AddDialogComponent } from './dialogs/add.dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './models/student.model';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public tableCols = ['name', 'assignment1', 'assignment2', 'test1', 'test2', 'final', 'attendance', 'pass', 'actions'];
  public tableRows: Student[] =
    [{ id: 0, name: 'Daniel R.', assignment1: 90, assignment2: 80, test1: 85, test2: 100, attendance: 95 }];
  public newStudent: Student;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;


  constructor(public dialog: MatDialog) { }


  public calculateFinalGrade(entry: Student): number {
    let finalGrade = 0;
    finalGrade += entry.assignment1 * 0.2;
    finalGrade += entry.assignment2 * 0.2;
    finalGrade += entry.test1 * 0.3;
    finalGrade += entry.test2 * 0.3;
    return finalGrade;
  }

  public passedCourse(entry: Student): boolean {
    return this.calculateFinalGrade(entry) >= 80 && entry.attendance >= 95;
  }

  public openAddDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: new Student({})
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableRows.push(result);
        this.table.renderRows();
      }
    });
  }

  public deleteEntry(entry: Student) {
    this.tableRows = this.tableRows.filter(row => row.id !== entry.id);
    this.table.renderRows();
  }
}
