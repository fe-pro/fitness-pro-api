import { PrismaExercisesRepository } from '@/repositories/prisma/prisma-exercise-repository'
import { RemoveExerciseUseCase } from '../remove-exercises'
import { PrismaWorkoutRepository } from '@/repositories/prisma/prisma-workout-repository'

export function makeRemoveExerciseUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()
    const workoutRepository = new PrismaWorkoutRepository()
    const useCase = new RemoveExerciseUseCase(exercisesRepository, workoutRepository)
    return useCase
}