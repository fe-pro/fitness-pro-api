import { makeCreateExerciseUseCase } from '@/use-cases/factories/make-create-exercise-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const createExerciseBodySchema = z.object({
        title: z.string().nonempty('title is required.'),
        sets: z.number(),
        reps: z.number(),
        workoutId: z.string().uuid().nonempty('workoutId is required.'),
    })

    const { title, sets, reps, workoutId } = createExerciseBodySchema.parse(request.body)

    const createExerciseUseCase = makeCreateExerciseUseCase()

    await createExerciseUseCase.execute({ title, sets, reps, workoutId })

    reply.status(201).send()
}