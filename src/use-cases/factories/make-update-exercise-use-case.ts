import { PrismaExercisesRepository } from '@/repositories/prisma/prisma-exercise-repository'
import { UpdateExerciseUseCase } from '../update-exercise'
import { PrismaWorkoutRepository } from '@/repositories/prisma/prisma-workout-repository'

export function makeUpdateExerciseUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()
    const workoutRepository = new PrismaWorkoutRepository()
    const useCase = new UpdateExerciseUseCase(exercisesRepository, workoutRepository)
    return useCase
}