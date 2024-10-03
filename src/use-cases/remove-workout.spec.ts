import { InMemoryWorkoutRepository } from '@/repositories/in-memory/in-memory-workout-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RemoveWorkoutUseCase } from './remove-worokut'

let workoutRepository: InMemoryWorkoutRepository
let sut: RemoveWorkoutUseCase

describe('Remove Workout Use Case', () => {
    beforeEach(() => {
        workoutRepository = new InMemoryWorkoutRepository()
        sut = new RemoveWorkoutUseCase(workoutRepository)
    })

    it('should be able to remove workout', async () => {
        const { id } = await workoutRepository.create({ title: 'Treino A', userId: 'user-01' })
        await sut.execute({ id, userId: 'user-01' })
        expect(await workoutRepository.findById(id)).toBeNull()
    })
})