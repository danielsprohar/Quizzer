export class CourseSubject {
  id: string;
  name: string;

  constructor(fields?: { id?: string; name?: string }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
