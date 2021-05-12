export class Course {

    public static readonly MIN_COURSE_NUMBER = 1001;
    public static readonly MAX_COURSE_NUMBER = 6499;

    id: string;
    subject: string;
    number: number;
    title: string;

    constructor(fields?: {
        id?: string,
        subject?: string,
        number?: number;
        title?: string
    }) {
        if (fields) {
            Object.assign(this, fields);
        }
    }
}
