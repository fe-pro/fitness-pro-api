import { NotAuthorizedError } from '@/use-cases/errors/not-authorized-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateExerciseUseCase } from '@/use-cases/factories/make-update-exercise-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const updateExerciseParamsSchema = z.object({
        exerciseId: z.string().uuid()
    })

    const updateExerciseBodySchema = z.object({
        title: z.string(),
        sets: z.number(),
        reps: z.number()
    })

    const { exerciseId } = updateExerciseParamsSchema.parse(request.params)
    const { title, sets, reps } = updateExerciseBodySchema.parse(request.body)

    const updateExerciseUseCase = makeUpdateExerciseUseCase()

    try {

        const exercise = await updateExerciseUseCase.execute({
            data: {
                title,
                sets,
                reps
            },
            exerciseId,
            userId: request.user.sub
        })

        return reply
            .status(200)
            .send({ exercise })

    } catch (error) {

        if (error instanceof ResourceNotFoundError)
            return reply
                .status(404)
                .send({ message: error.message })


        if (error instanceof NotAuthorizedError)
            return reply
                .status(401)
                .send({ message: error.message })

        throw error

    }
}