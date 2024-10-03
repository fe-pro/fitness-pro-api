import { Prisma, Exercise } from '@prisma/client'

export interface UpdateExerciseParams {
    exerciseId: string
    data: Prisma.ExerciseUpdateInput
}

export interface ExercisesRepository {
    findById(id: string): Promise<Exercise | null>
    findManyByWorkoutId(workoutId: string): Promise<Exercise[]>
    create(data: Prisma.ExerciseUncheckedCreateInput): Promise<Exercise>
    update(params: UpdateExerciseParams): Promise<Prisma.ExerciseUpdateInput>
    delete(id: string): Promise<void>
}