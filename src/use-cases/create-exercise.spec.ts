import { ExercisesRepository } from '@/repositories/exercises-repository'
import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { CreateExerciseUseCase } from './create-exercise'

let exerciseRepository: ExercisesRepository
let sut: CreateExerciseUseCase

describe('Create Exercise Use Case', () => {
    beforeEach(() => {
        exerciseRepository = new InMemoryExercisesRepository()
        sut = new CreateExerciseUseCase(exerciseRepository)
    })

    it('should be able to create exercise', async () => {
        const { exercise } = await sut.execute({
            title: 'Supino reto',
            sets: 3,
            reps: 10,
            workoutId: 'workout-01'
        })

        expect(exercise.id).toEqual(expect.any(String))
    })
})