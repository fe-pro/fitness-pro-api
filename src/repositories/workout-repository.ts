import { Prisma, Workout } from '@prisma/client'

export interface WorkoutRepository {
    findById(id: string): Promise<Workout | null>
    findManyByUserId(userId: string): Promise<Workout[]>
    create(data: Prisma.WorkoutUncheckedCreateInput): Promise<Workout>
    update(workoutId: string, title: string): Promise<Workout>
    delete(id: string): Promise<void>
}