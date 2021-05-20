export enum Collections {
  COURSES = 'courses',
  COURSE_ENROLLEES = 'course_enrollees',
  SUBJECTS = 'subjects',

  /**
   * A top-level collection.
   */
  USERS = 'users',

  /**
   * A top-level collection.
   */
  QUIZZES = 'quizzes',

  /**
   * A subcollection of the top-level `Quizzes` collection
   */
  QUIZ_QUESTIONS = 'questions',
}
