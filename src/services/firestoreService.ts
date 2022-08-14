import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import db from "../configs/firebaseConfigs";
import { ITaskModel } from "../models/TaskModel";

const COLLECTION_NAME = "tasks";

export const deleteTask = async (taskId: string): Promise<void> =>
  deleteDoc(doc(db, COLLECTION_NAME, taskId));

export const addTask = async (task: ITaskModel): Promise<ITaskModel> => {
  return addDoc(collection(db, COLLECTION_NAME), task).then(async (res) => {
    task.taskId = res.id;

    await setDoc<DocumentData>(doc(db, COLLECTION_NAME, res.id), task);

    return task;
  });
};

export const findAllTasks = (setTasks: Function) => {
    onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
        setTasks(
          snapshot.docs.map((doc) => {
            const task: ITaskModel = doc.data() as ITaskModel;
            task.taskId = doc.id;
            return task;
          })
        );
      });
}
