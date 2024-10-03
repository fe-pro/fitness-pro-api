import { PrismaWorkoutRepository } from '@/repositories/prisma/prisma-workout-repository'
import { UpdateWorkoutUseCase } from '../update-workout'

export function makeUpdateWorkoutUseCase() {
    const workoutRepository = new PrismaWorkoutRepository()
    const useCase = new UpdateWorkoutUseCase(workoutRepository)
    return useCase
}