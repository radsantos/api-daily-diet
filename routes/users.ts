import { FastifyInstance } from "fastify";
import { db } from "../src/database";
import { z } from "zod";
import crypto from 'node:crypto'

export async function usersRoutes(app: FastifyInstance): Promise<void> {

    app.get('/', async (request, reply) => {
        try {
            const { sessionId } = request.cookies
            const users = await db('users')
            .where('session_id', sessionId)
            .select('*')

            return { users }

        } catch (error) {

            throw new Error()

        }
    })

    app.post('/users', async (request, reply) => {
        try {
            const createUserBody = z.object({
                firstname: z.string(),
                lastname: z.string()
            })

            const {firstname, lastname } = createUserBody.parse(request.body)

            let sessionId = request.cookies.sessionId

            if(!sessionId){
                sessionId = crypto.randomUUID()
                reply.cookie('sessionId', sessionId,{
                    path:'/',
                    maxAge:60*60*24*7
                })
            }

            await db('users').insert({
                id: String(crypto.randomUUID()),
                firstname,
                lastname,
                created_at: new Date(),
                session_id: sessionId
            })

            return reply.status(201).send()

        } catch (error) {
            throw new Error()

        }

    })


}
