let count = 0;
export class Student {
  id: number;
  name = '';
  assignment1 = 0;
  assignment2 = 0;
  test1 = 0;
  test2 = 0;
  attendance = 0;

  constructor(studentInfo: Partial<Student>) {
    Object.assign(this, studentInfo);
    count++;
    this.id = count;
  }
}
