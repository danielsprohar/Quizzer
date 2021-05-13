export class RegexValidator {
  /**
   * Regex for a valid password.
   *
   * Password must contain the following:
   *
   * At least one digit
   *
   * At least one lowercase letter
   *
   * At least one uppercase letter
   *
   * At least one special character
   *
   * Must have between 6 to 30 characters
   */
  public static readonly PASSWORD =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-_]).{6,30}$/;
}
