import { randomUUID } from 'crypto'
import { WorkoutRepository } from '../workout-repository'
import { Prisma, Workout } from '@prisma/client'

export class InMemoryWorkoutRepository implements WorkoutRepository {

    public items: Workout[] = []

    async findById(id: string): Promise<Workout | null> {
        const workout = this.items.find((workout) => workout.id === id)

        if (workout) {
            return workout
        }

        return null
    }

    async findManyByUserId(userId: string): Promise<Workout[]> {
        const workouts = this.items.filter(item => item.userId === userId)
        return workouts
    }

    async create(data: Prisma.WorkoutUncheckedCreateInput): Promise<Workout> {

        const workout = {
            id: randomUUID(),
            title: data.title,
            userId: data.userId
        }

        this.items.push(workout)

        return workout
    }

    async update(workoutId: string, title: string): Promise<Workout> {
        const workoutToUpdate = this.items.findIndex(workout => workout.id === workoutId)

        if (workoutToUpdate >= 0) {
            this.items[workoutToUpdate].title = title
        }

        const updatedWorkout = this.items.filter(workout => workout.id === workoutId)

        return updatedWorkout[0]
    }

    async delete(id: string): Promise<void> {
        this.items = this.items.filter(workout => workout.id !== id)
    }

}