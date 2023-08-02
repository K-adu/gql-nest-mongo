import { hashSync, compare, compareSync } from 'bcrypt';
export const passwordHash = {
  to(password: string): string {
    return hashSync(password, 10);
  },
  from(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  },
};
