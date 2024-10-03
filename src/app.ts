import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controllers/users/routes'
import { workoutRoutes } from './http/controllers/workout/routes'
import { exerciseRoutes } from './http/controllers/exercise/routes'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'

export const app = fastify()

app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
})

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: true
    }
})

app.register(fastifyCookie)
app.register(usersRoutes)
app.register(workoutRoutes)
app.register(exerciseRoutes)

app.setErrorHandler((error, _, reply) => {

    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})