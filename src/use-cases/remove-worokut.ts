import { WorkoutRepository } from '@/repositories/workout-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAuthorizedError } from './errors/not-authorized-error'

interface RemoveWorkoutUseCaseRequest {
    id: string
    userId: string
}

export class RemoveWorkoutUseCase {
    constructor(private workoutRepository: WorkoutRepository) { }

    async execute({ id, userId }: RemoveWorkoutUseCaseRequest): Promise<void> {

        const workout = await this.workoutRepository.findById(id)

        if (!workout) {
            throw new ResourceNotFoundError('Workout not found.')
        }

        if (workout.userId !== userId) {
            throw new NotAuthorizedError()
        }

        this.workoutRepository.delete(id)
    }
}