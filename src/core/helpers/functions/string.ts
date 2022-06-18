import * as bcrypt from 'bcrypt';

export async function hashString(value: string, saltNumber = 10) {
  const salt = bcrypt.genSaltSync(saltNumber);
  const strHash = bcrypt.hashSync(value, salt);
  return strHash;
}
