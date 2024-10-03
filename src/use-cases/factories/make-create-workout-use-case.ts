import { PrismaWorkoutRepository } from '@/repositories/prisma/prisma-workout-repository'
import { CreateWorkoutUseCase } from '../create-workout'

export function makeCreateWorkoutUseCase() {
    const workoutRepository = new PrismaWorkoutRepository()
    const useCase = new CreateWorkoutUseCase(workoutRepository)
    return useCase
}