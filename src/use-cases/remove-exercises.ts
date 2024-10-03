import { ExercisesRepository } from '@/repositories/exercises-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { WorkoutRepository } from '@/repositories/workout-repository'
import { NotAuthorizedError } from './errors/not-authorized-error'

interface RemoveExerciseUseCaseRequest {
    id: string
    userId: string
}

export class RemoveExerciseUseCase {
    constructor(
        private exercisesRepository: ExercisesRepository,
        private workoutRepository: WorkoutRepository) { }

    async execute({ id, userId }: RemoveExerciseUseCaseRequest): Promise<void> {

        const exercise = await this.exercisesRepository.findById(id)
        if (!exercise)
            throw new ResourceNotFoundError('Exercise not found.')

        const workout = await this.workoutRepository.findById(exercise.workoutId)
        if (!workout)
            throw new ResourceNotFoundError('Associated workout not found.')

        if (workout.userId !== userId)
            throw new NotAuthorizedError()

        this.exercisesRepository.delete(id)
    }
}