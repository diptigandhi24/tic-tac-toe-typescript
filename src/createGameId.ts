import { v4 as uuidv4 } from 'uuid';

export default function createGameUUID(): string {
    return uuidv4();
}
