export enum Collections {
  /**
   * A subcollection of the `Users` collection.
   */
  ASSESSMENTS = 'assessments',
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
   * A subcollection of the `Quizzes` collection
   */
  QUIZ_QUESTIONS = 'questions',
}
