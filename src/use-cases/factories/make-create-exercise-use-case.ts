import { PrismaExercisesRepository } from '@/repositories/prisma/prisma-exercise-repository'
import { CreateExerciseUseCase } from '../create-exercise'

export function makeCreateExerciseUseCase() {
    const exerciseRepository = new PrismaExercisesRepository()
    const useCase = new CreateExerciseUseCase(exerciseRepository)
    return useCase
}