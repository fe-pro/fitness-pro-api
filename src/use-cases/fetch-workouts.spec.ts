import { InMemoryWorkoutRepository } from '@/repositories/in-memory/in-memory-workout-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { FetchWorkoutsUseCase } from './fetch-workouts'

let workoutRepository: InMemoryWorkoutRepository
let sut: FetchWorkoutsUseCase

describe('Fetch User Workouts Use Case', () => {

    beforeEach(() => {
        workoutRepository = new InMemoryWorkoutRepository()
        sut = new FetchWorkoutsUseCase(workoutRepository)
    })

    it('should be able to fetch user workouts', async () => {
        await workoutRepository.create({
            title: 'Peito e triceps',
            userId: 'user-01',
        })

        await workoutRepository.create({
            title: 'Costas e biceps',
            userId: 'user-01',
        })

        await workoutRepository.create({
            title: 'Perna e ombro',
            userId: 'user-02',
        })

        const { workoutsWithUserId } = await sut.execute({ userId: 'user-01' })
        
        expect(workoutsWithUserId.length).toEqual(2)
    })
})