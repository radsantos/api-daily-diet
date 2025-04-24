import { app } from "../app";

export async function usersRoutes(){

    app.get('/users', async ()=> {
        return { message: 'Hello from users' };
    })

    
}
