export interface ITaskModel {
    taskId: string;
    title: string;
    description: string;
    isDone: boolean;
    startAt: Date;
    endAt: Date;
}