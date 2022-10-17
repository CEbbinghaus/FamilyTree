import Surreal from 'surrealdb.js';
import './Env'
import { SURREALDB_PASS, SURREALDB_USER } from './Env';

const db = new Surreal('https://surrealdb.cerver.au/rpc');
let connected = false;

export async function Connect() {
    if(connected)
        return;

    await db.signin({
        user: SURREALDB_USER as string,
        pass: SURREALDB_PASS as string,
    });

    // Select a specific namespace / database
    await db.use('FamilyTree', 'Main');
    connected = true;
}

export async function WriteTest(id: string, obj: Record<string, unknown>) {
    if(!connected)
        await Connect();
    
    await db.create("test:" + id, obj);
}

export async function ReadTest(id: string): Promise<Record<string, unknown> | null> {
    if(!connected)
        await Connect();
    
    const result = await db.select("test:" + id);

    if(!result || !result.length)
        return null;
    
    return result[0] as Record<string, unknown>;
}