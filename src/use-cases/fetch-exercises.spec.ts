import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { FetchExercisesUseCase } from './fetch-exercises'
import { UsersRepository } from '@/repositories/users-repository'
import { WorkoutRepository } from '@/repositories/workout-repository'
import { ExercisesRepository } from '@/repositories/exercises-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWorkoutRepository } from '@/repositories/in-memory/in-memory-workout-repository'

let usersRepository: UsersRepository
let workoutRepository: WorkoutRepository
let exercisesRepository: ExercisesRepository
let sut: FetchExercisesUseCase

describe('Fetch Exercises Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        workoutRepository = new InMemoryWorkoutRepository()
        exercisesRepository = new InMemoryExercisesRepository()
        sut = new FetchExercisesUseCase(exercisesRepository, workoutRepository)
    })

    it('should be able to get all exercises from workout', async () => {

        const { id: userId } = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: '123456'
        })

        const { id: workoutId } = await workoutRepository.create({
            userId,
            title: 'Peito e triceps'
        })

        await exercisesRepository.create({
            title: 'Supino reto',
            sets: 3,
            reps: 10,
            workoutId
        })

        await exercisesRepository.create({
            title: 'Triceps testa',
            sets: 3,
            reps: 10,
            workoutId
        })

        await exercisesRepository.create({
            title: 'Abdominal militar',
            sets: 3,
            reps: 10,
            workoutId: 'workout-02'
        })

        const { exercises } = await sut.execute({ workoutId, userId })

        expect(exercises.length).toEqual(2)
    })
})