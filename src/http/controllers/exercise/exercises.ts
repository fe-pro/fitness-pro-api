import { NotAuthorizedError } from '@/use-cases/errors/not-authorized-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchExercisesUseCase } from '@/use-cases/factories/make-fetch-exercises-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function exercises(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const fetchExercisesParamsSchema = z.object({
        workoutId: z.string().uuid()
    })

    const { workoutId } = fetchExercisesParamsSchema.parse(request.params)
    const userId = request.user.sub
    const fetchExercisesUseCase = makeFetchExercisesUseCase()

    try {

        const exercises = await fetchExercisesUseCase.execute({ workoutId, userId })

        return reply
            .status(200)
            .send(exercises)

    } catch (error) {

        if (error instanceof NotAuthorizedError)
            return reply
                .status(401)
                .send({ message: error.message })

        if (error instanceof ResourceNotFoundError)
            return reply
                .status(404)
                .send({ message: error.message })

        throw error
    }
}