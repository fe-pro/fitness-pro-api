import { Prisma, Exercise } from '@prisma/client'
import { ExercisesRepository, UpdateExerciseParams } from '../exercises-repository'
import { prisma } from '@/lib/prisma'

export class PrismaExercisesRepository implements ExercisesRepository {

    async findById(id: string): Promise<Exercise | null> {
        const exercise = await prisma.exercise.findUnique({ where: { id } })
        return exercise
    }

    async findManyByWorkoutId(workoutId: string): Promise<Exercise[]> {
        const exercises = await prisma.exercise.findMany({ where: { workoutId } })
        return exercises
    }

    async create(data: Prisma.ExerciseUncheckedCreateInput): Promise<Exercise> {
        const exercise = await prisma.exercise.create({ data })
        return exercise
    }

    async update({ exerciseId, data }: UpdateExerciseParams): Promise<Prisma.ExerciseUpdateInput> {
        const exercise = await prisma.exercise.update({
            where: {
                id: exerciseId
            },
            data
        })

        return exercise
    }

    async delete(id: string): Promise<void> {
        await prisma.exercise.delete({ where: { id } })
    }
}