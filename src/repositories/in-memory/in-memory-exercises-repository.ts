import { randomUUID } from 'crypto'
import { ExercisesRepository, UpdateExerciseParams } from '../exercises-repository'
import { Prisma, Exercise } from '@prisma/client'

export class InMemoryExercisesRepository implements ExercisesRepository {

    public items: Exercise[] = []

    async findById(id: string): Promise<Exercise | null> {
        const exercise = this.items.find(exercise => exercise.id === id)
        if (!exercise) {
            return null
        }
        return exercise
    }

    async findManyByWorkoutId(workoutId: string): Promise<Exercise[]> {
        const exercises = this.items.filter(exercise => exercise.workoutId === workoutId)
        return exercises
    }

    async create(data: Prisma.ExerciseUncheckedCreateInput) {
        const exercise: Exercise = {
            id: randomUUID(),
            title: data.title,
            sets: data.sets,
            reps: data.reps,
            workoutId: data.workoutId
        }
        this.items.push(exercise)
        return exercise
    }

    async update({ exerciseId, data }: UpdateExerciseParams): Promise<Prisma.ExerciseUpdateInput> {

        this.items = this.items.map(item => {
            if (item.id === exerciseId) {
                const updatedExercise = {
                    ...item,
                    title: (data.title ?? item.title).toString(),
                    sets: Number(data.sets ?? item.sets),
                    reps: Number(data.reps ?? item.reps),
                }

                return updatedExercise
            }
            return item
        })

        return data
    }

    async delete(id: string): Promise<void> {
        this.items = this.items.filter(exercise => exercise.id !== id)
    }
}