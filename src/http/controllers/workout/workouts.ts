import { makeFetchWorkoutsUseCase } from '@/use-cases/factories/make-fetch-workouts-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function workouts(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const fetchWorkoutsUseCase = makeFetchWorkoutsUseCase()

    const { workoutsWithUserId } = await fetchWorkoutsUseCase.execute({
        userId: request.user.sub,
    })

    const workouts = workoutsWithUserId.map(workout => {
        const { userId, ...restOfWorkout } = workout // eslint-disable-line
        return restOfWorkout
    })

    return reply
        .status(200)
        .send({ workouts })
}