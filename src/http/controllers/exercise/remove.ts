import { NotAuthorizedError } from '@/use-cases/errors/not-authorized-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRemoveExerciseUseCase } from '@/use-cases/factories/make-remove-exercise-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const removeExerciseParamsSchema = z.object({
        id: z.string().uuid()
    })
    const { id } = removeExerciseParamsSchema.parse(request.params)
    const userId = request.user.sub

    const removeExerciseUseCase = makeRemoveExerciseUseCase()

    try {

        await removeExerciseUseCase.execute({ id, userId })
        
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