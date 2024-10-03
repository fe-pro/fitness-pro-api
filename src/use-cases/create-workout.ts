import { WorkoutRepository } from '@/repositories/workout-repository'
import { Workout } from '@prisma/client'

interface CreateWorkoutUseCaseRequest {
    title: string
    userId: string
}

interface CreateWorkoutUseCaseResponse {
    workout: Workout
}

export class CreateWorkoutUseCase {
    constructor(private workoutRepository: WorkoutRepository) { }

    async execute({ title, userId }: CreateWorkoutUseCaseRequest): Promise<CreateWorkoutUseCaseResponse> {
        const workout = await this.workoutRepository.create({ title, userId })
        return { workout }
    }
}