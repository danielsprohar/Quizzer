export class Collections {
  public static readonly COURSES = 'courses';
  public static readonly COURSE_ENROLLEES = 'course_enrollees';
  public static readonly SUBJECTS = 'subjects';

  /**
   * A top-level collection.
   */
  public static readonly USERS = 'users';

  /**
   * A subcollection of the top-level `Users` collection.
   *
   * This subcollection will hold snippets of Quiz information,
   *
   * e.g. `quizId`, `name`, `numberOfQuestions`, etc.
   */
  public static readonly QUIZ_SNIPPETS = 'quiz_snippets';

  /**
   * A top-level collection.
   */
  public static readonly QUIZZES = 'quizzes';

  /**
   * A subcollection of the top-level `Quizzes` collection
   */
  public static readonly QUIZ_QUESTIONS = 'questions';
}
