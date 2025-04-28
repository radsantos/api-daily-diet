import  { Knex, knex } from "knex";


export const config: Knex.Config = {

    client: 'pg',
    connection: {
        host:'localhost',
        port: 5432,
        user: 'root',
        password: 'admin',
        database: 'postgres'
    },
    useNullAsDefault: true,
    
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
}
export const db = knex(config);