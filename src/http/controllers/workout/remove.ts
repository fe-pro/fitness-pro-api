import { NotAuthorizedError } from '@/use-cases/errors/not-authorized-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRemoveWorkoutUseCase } from '@/use-cases/factories/make-remove-workout-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const removeWorkoutParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = removeWorkoutParamsSchema.parse(request.params)

    const userId = request.user.sub

    const removeWorkoutUseCase = makeRemoveWorkoutUseCase()

    try {

        await removeWorkoutUseCase.execute({ id, userId })

        reply
            .status(200)
            .send()

    } catch (error) {

        if (error instanceof NotAuthorizedError)
            reply
                .status(401)
                .send({ message: error.message })

        if (error instanceof ResourceNotFoundError)
            reply
                .status(404)
                .send({ message: error.message })

        throw error
    }


} 