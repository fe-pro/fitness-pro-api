import { prisma } from '@/lib/prisma'
import { WorkoutRepository } from '../workout-repository'
import { Prisma, Workout } from '@prisma/client'

export class PrismaWorkoutRepository implements WorkoutRepository {

    async findById(id: string): Promise<Workout | null> {
        const workout = await prisma.workout.findUnique({
            where: {
                id
            }
        })

        return workout
    }

    async findManyByUserId(userId: string): Promise<Workout[]> {
        const workouts = await prisma.workout.findMany({ where: { userId } })
        return workouts
    }

    async create(data: Prisma.WorkoutUncheckedCreateInput): Promise<Workout> {
        const workout = await prisma.workout.create({ data })
        return workout
    }

    async update(id: string, title: string): Promise<Workout> {
        const workout = await prisma.workout.update({
            where: {
                id
            },
            data: {
                title
            }
        })

        return workout
    }

    async delete(id: string): Promise<void> {
        await prisma.workout.delete({
            where: {
                id: id
            }
        })
    }
}