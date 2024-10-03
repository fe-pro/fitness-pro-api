import { describe, beforeEach, it, expect } from 'vitest'
import { ExercisesRepository } from '@/repositories/exercises-repository'
import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { RemoveExerciseUseCase } from './remove-exercises'
import { InMemoryWorkoutRepository } from '@/repositories/in-memory/in-memory-workout-repository'
import { WorkoutRepository } from '@/repositories/workout-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: UsersRepository
let workoutRepository: WorkoutRepository
let exercisesRepository: ExercisesRepository
let sut: RemoveExerciseUseCase

describe('Remove Exercise Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        workoutRepository = new InMemoryWorkoutRepository()
        exercisesRepository = new InMemoryExercisesRepository()

        sut = new RemoveExerciseUseCase(exercisesRepository, workoutRepository)
    })

    it('should be able to remove an exercise', async () => {

        const { id: userId } = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: '123456'
        })

        const { id: workoutId } = await workoutRepository.create({
            userId,
            title: 'Peito e triceps'
        })

        const { id } = await exercisesRepository.create({
            title: 'Supino reto',
            sets: 3,
            reps: 10,
            workoutId: workoutId
        })

        await sut.execute({ id, userId })

        expect(await exercisesRepository.findById(id)).toBeNull()
    })
})