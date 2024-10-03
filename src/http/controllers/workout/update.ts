import { NotAuthorizedError } from '@/use-cases/errors/not-authorized-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateWorkoutUseCase } from '@/use-cases/factories/make-update-workout-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const updateWorkoutParamsSchema = z.object({
        workoutId: z.string().uuid()
    })

    const updateWorkoutBodySchema = z.object({
        title: z.string().nonempty('Title is required.'),
    })

    const { workoutId } = updateWorkoutParamsSchema.parse(request.params)
    const { title } = updateWorkoutBodySchema.parse(request.body)
    const userId = request.user.sub

    const updateWorkoutUseCase = makeUpdateWorkoutUseCase()

    try {

        const updatedWorkout = await updateWorkoutUseCase.execute({
            workoutId,
            userId,
            title
        })

        return reply
            .status(200)
            .send(updatedWorkout)

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