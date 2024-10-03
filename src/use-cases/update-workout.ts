import { WorkoutRepository } from '@/repositories/workout-repository'
import { Workout } from '@prisma/client'
import { NotAuthorizedError } from './errors/not-authorized-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateWorkoutUseCaseRequest {
    workoutId: string
    userId: string
    title: string
}

interface UpdateWorkoutUseCaseResponse {
    updatedWorkout: Workout
}

export class UpdateWorkoutUseCase {

    constructor(
        private workoutRepository: WorkoutRepository
    ) { }

    async execute(
        { workoutId, userId, title }: UpdateWorkoutUseCaseRequest
    ): Promise<UpdateWorkoutUseCaseResponse> {

        const workout = await this.workoutRepository.findById(workoutId)

        if (!workout) {
            throw new ResourceNotFoundError('Workout not found.')
        }

        if (workout.userId !== userId) {
            throw new NotAuthorizedError()
        }

        const updatedWorkout = await this.workoutRepository.update(workoutId, title)

        return {
            updatedWorkout,
        }
    }
}