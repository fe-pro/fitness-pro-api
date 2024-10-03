import { WorkoutRepository } from '@/repositories/workout-repository'
import { Workout } from '@prisma/client'

interface FetchWorkoutsUseCaseRequest {
    userId: string
}

interface FetchWorkoutsUseCaseResponse {
    workoutsWithUserId: Workout[]
}

export class FetchWorkoutsUseCase {
    constructor(
        private workoutRepository: WorkoutRepository
    ) { }

    async execute({
        userId
    }: FetchWorkoutsUseCaseRequest): Promise<FetchWorkoutsUseCaseResponse> {

        const workoutsWithUserId = await this.workoutRepository.findManyByUserId(userId)

        return {
            workoutsWithUserId,
        }
    }
}