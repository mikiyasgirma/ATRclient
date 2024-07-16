import bcrypt from "bcrypt";

// Define the number of salt rounds (the higher the number, the more secure, but also the slower the hashing process)
const SALT_ROUNDS = 10;

export async function saltAndHashPassword(password: string): Promise<string> {
  // Generate a salt
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

// Compare plain password with hashed password (used during login)
export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
