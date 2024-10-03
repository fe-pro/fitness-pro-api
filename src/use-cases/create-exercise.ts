import { ExercisesRepository } from '@/repositories/exercises-repository'
import { Exercise } from '@prisma/client'

interface CreateExerciseUseCaseRequest {
    title: string
    sets: number
    reps: number
    workoutId: string
}

interface CreateExerciseUseCaseResponse {
    exercise: Exercise
}

export class CreateExerciseUseCase {
    constructor(private exerciseRepository: ExercisesRepository) { }

    async execute({
        title,
        sets,
        reps,
        workoutId
    }: CreateExerciseUseCaseRequest): Promise<CreateExerciseUseCaseResponse> {

        const exercise = await this.exerciseRepository.create({ title, sets, reps, workoutId })

        return { exercise }
    }
}