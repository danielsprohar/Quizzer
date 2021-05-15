export class Collections {
  public static readonly COURSES = 'courses';
  public static readonly COURSE_ENROLLEES = 'course_enrollees';
  public static readonly SUBJECTS = 'subjects';

  /**
   * A top-level (root) collection of `User`s
   */
  public static readonly USERS = 'users';
  /**
   * A subcollection of the root `Quizzes` collection.
   *
   * This subcollection will hold snippets of Quiz information,
   *
   * e.g. `quizId`, `name`, `numberOfQuestions`, etc.
   */
  public static readonly QUIZ_SNIPPETS = 'quiz_snippets';
  /**
   * A top-level (root) collection of `Quiz`zes
   */
  public static readonly QUIZZES = 'quizzes';
  /**
   * A subcollection of the root `Quizzes` collection
   */
  public static readonly QUIZ_QUESTIONS = 'questions';
}
