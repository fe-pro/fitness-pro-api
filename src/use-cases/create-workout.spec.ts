import { beforeEach, describe, expect, it } from 'vitest'
import { CreateWorkoutUseCase } from './create-workout'
import { InMemoryWorkoutRepository } from '@/repositories/in-memory/in-memory-workout-repository'

let workoutRepository: InMemoryWorkoutRepository
let sut: CreateWorkoutUseCase

describe('Create Workout Use Case', () => {
    beforeEach(() => {
        workoutRepository = new InMemoryWorkoutRepository()
        sut = new CreateWorkoutUseCase(workoutRepository)
    })

    it('should be able to create workout', async () => {
        const { workout } = await sut.execute({ title: 'Treino A', userId: 'user-01' })
        expect(workout.id).toEqual(expect.any(String))
    })
})