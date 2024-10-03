import { ExercisesRepository } from '@/repositories/exercises-repository'
import { WorkoutRepository } from '@/repositories/workout-repository'
import { Prisma } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAuthorizedError } from './errors/not-authorized-error'

interface UpdateExerciseUseCaseRequest {
    data: Prisma.ExerciseUpdateInput
    exerciseId: string
    userId: string
}

interface UpdateExerciseUseCaseResponse {
    exercise: Prisma.ExerciseUpdateInput
}

export class UpdateExerciseUseCase {

    constructor(
        private exercisesRepository: ExercisesRepository,
        private workoutRepository: WorkoutRepository
    ) { }

    async execute(
        { data, exerciseId, userId }: UpdateExerciseUseCaseRequest
    ): Promise<UpdateExerciseUseCaseResponse> {

        const exerciseToBeUpdated = await this.exercisesRepository.findById(exerciseId)

        if (!exerciseToBeUpdated)
            throw new ResourceNotFoundError('Exercise not found.')

        const associatedWorkout = await this.workoutRepository.findById(exerciseToBeUpdated.workoutId)

        if (!associatedWorkout)
            throw new ResourceNotFoundError('Associated workout not found.')

        if (associatedWorkout.userId !== userId)
            throw new NotAuthorizedError()

        const exercise = await this.exercisesRepository.update({
            exerciseId,
            data: data
        })

        return {
            exercise,
        }
    }
}