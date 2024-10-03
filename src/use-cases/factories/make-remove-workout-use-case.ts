import { PrismaWorkoutRepository } from '@/repositories/prisma/prisma-workout-repository'
import { RemoveWorkoutUseCase } from '../remove-worokut'

export function makeRemoveWorkoutUseCase() {
    const workoutRepository = new PrismaWorkoutRepository()
    const useCase = new RemoveWorkoutUseCase(workoutRepository)
    return useCase
}