import { createHash } from 'crypto';

export async function hash(password: string): Promise<string> {
    return createHash('sha256').update(password).digest('hex');
}

export async function compare(password: string, hash: string): Promise<boolean> {
    const hashedPassword = await createHash('sha256').update(password).digest('hex');
    return hashedPassword === hash;
} 