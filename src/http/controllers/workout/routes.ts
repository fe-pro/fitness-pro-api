import { FastifyInstance } from 'fastify'
import { create } from './create'
import { remove } from './remove'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { workouts } from './workouts'
import { update } from './update'

export async function workoutRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/workout/list', workouts)
    app.post('/workout', create)
    app.patch('/workout/:workoutId', update)
    app.delete('/workout/:id', remove)
}