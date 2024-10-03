import { makeCreateWorkoutUseCase } from '@/use-cases/factories/make-create-workout-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const createWorkoutBodySchema = z.object({
        title: z.string().nonempty('Title is required.')
    })
    const { title } = createWorkoutBodySchema.parse(request.body)

    const createWorkoutUseCase = makeCreateWorkoutUseCase()

    const { workout } = await createWorkoutUseCase.execute({
        title,
        userId: request.user.sub,
    })

    reply
        .status(201)
        .send({ workout })
}