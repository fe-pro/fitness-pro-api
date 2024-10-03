import { ExercisesRepository } from '@/repositories/exercises-repository'
import { WorkoutRepository } from '@/repositories/workout-repository'
import { Exercise } from '@prisma/client'
import { NotAuthorizedError } from './errors/not-authorized-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchExercisesUseCaseRequest {
    workoutId: string
    userId: string
}

interface FetchExercisesUseCaseResponse {
    workoutTitle: string,
    exercises: Exercise[]
}

export class FetchExercisesUseCase {
    constructor(
        private exercisesRepository: ExercisesRepository,
        private workoutRepository: WorkoutRepository
    ) { }

    async execute({
        workoutId,
        userId
    }: FetchExercisesUseCaseRequest): Promise<FetchExercisesUseCaseResponse> {

        const workout = await this.workoutRepository.findById(workoutId)

        if (!workout) {
            throw new ResourceNotFoundError('Workout not found.')
        }

        if (workout.userId !== userId) {
            throw new NotAuthorizedError()
        }

        const exercises = await this.exercisesRepository.findManyByWorkoutId(workoutId)

        return {
            workoutTitle: workout.title,
            exercises,
        }

    }
}