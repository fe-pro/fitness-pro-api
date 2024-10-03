import { PrismaExercisesRepository } from '@/repositories/prisma/prisma-exercise-repository'
import { FetchExercisesUseCase } from '../fetch-exercises'
import { PrismaWorkoutRepository } from '@/repositories/prisma/prisma-workout-repository'

export function makeFetchExercisesUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()
    const workoutRepository = new PrismaWorkoutRepository()
    const useCase = new FetchExercisesUseCase(exercisesRepository, workoutRepository)
    return useCase
}