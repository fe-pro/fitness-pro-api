import { ExercisesRepository } from '@/repositories/exercises-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { UpdateExerciseUseCase } from './update-exercise'
import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { WorkoutRepository } from '@/repositories/workout-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { InMemoryWorkoutRepository } from '@/repositories/in-memory/in-memory-workout-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: UsersRepository
let workoutRepository: WorkoutRepository
let exercisesRepository: ExercisesRepository
let sut: UpdateExerciseUseCase

describe('Update Exercise Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        workoutRepository = new InMemoryWorkoutRepository()
        exercisesRepository = new InMemoryExercisesRepository()
        sut = new UpdateExerciseUseCase(exercisesRepository, workoutRepository)
    })

    it('should be able to update an exercise', async () => {

        const { id: userId } = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: '123456'
        })

        const { id: workoutId } = await workoutRepository.create({
            userId,
            title: 'Peito e triceps'
        })

        const { id: exerciseId } = await exercisesRepository.create({
            title: 'Supino inclinado',
            sets: 3,
            reps: 10,
            workoutId
        })

        const x = await sut.execute({
            data: {
                title: 'Supino reto',
                sets: 1,
                reps: 3
            },
            exerciseId,
            userId
        })

        const exercise = await exercisesRepository.findById(exerciseId)

        expect(exercise).toEqual(expect.objectContaining({ title: 'Supino reto' }))
    })
})