import { FastifyInstance } from 'fastify'
import { create } from './create'
import { remove } from './remove'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { exercises } from './exercises'
import { update } from './update'

export async function exerciseRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/exercise', create)
    app.get('/exercise/:workoutId/list', exercises)
    app.put('/exercise/:exerciseId', update)
    app.delete('/exercise/:id', remove)
}