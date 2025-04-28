import { Knex } from "knex";

declare module 'knex/types/table'{
    export interface Tables {
        users: {
            id: string
            firstname: string
            lastname: string
            created_at: string
            session_id?: string
        }
    }
}