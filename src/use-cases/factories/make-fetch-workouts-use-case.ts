import { PrismaWorkoutRepository } from '@/repositories/prisma/prisma-workout-repository'
import { FetchWorkoutsUseCase } from '../fetch-workouts'

export function makeFetchWorkoutsUseCase() {
    const workoutRepository = new PrismaWorkoutRepository()
    const useCase = new FetchWorkoutsUseCase(workoutRepository)
    return useCase
}