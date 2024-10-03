import { InMemoryWorkoutRepository } from '@/repositories/in-memory/in-memory-workout-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { UpdateWorkoutUseCase } from './update-workout'
import { WorkoutRepository } from '@/repositories/workout-repository'

let workoutRepository: WorkoutRepository
let sut: UpdateWorkoutUseCase

describe('Update Workout Use Case', () => {

    beforeEach(() => {
        workoutRepository = new InMemoryWorkoutRepository()
        sut = new UpdateWorkoutUseCase(workoutRepository)
    })

    it('should be able to update a workout', async () => {
        const workout = await workoutRepository.create({
            title: 'Peito e triceps',
            userId: 'user-01',

        })

        const { updatedWorkout } = await sut.execute({
            userId: workout.userId,
            workoutId: workout.id,
            title: 'Perna e ombro'
        })

        expect(updatedWorkout).toEqual(expect.objectContaining({ title: 'Perna e ombro' }))
    })
})