export async function hash(plainPassword: string): Promise<string> {
    return await Bun.password.hash(plainPassword);
} 