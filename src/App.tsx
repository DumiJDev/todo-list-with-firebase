import { Delete } from "@mui/icons-material";
import { Alert, AlertColor, Button, Card, CardContent, IconButton, Input, List, ListItemButton, Snackbar, TextareaAutosize, Tooltip } from "@mui/material";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";

import db from "./configs/firebaseConfigs";
import { ITaskModel } from "./models/TaskModel";

import "./App.css";

const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "350px",
  width: "350px",
};

const initialStateTask = {
  taskId: "",
  title: "",
  description: "",
  startAt: new Date(),
  endAt: new Date(),
  isDone: false,
};

const cardStyle = {
  boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.5)",
  width: "95%",
  marginBottom: "5px",
  backgroundColor: "rgb(255, 255, 255)",
  display: "flex",
  justifyContent: "space-between",
};

const listStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
};

function App() {
  const [tasks, setTasks] = useState<ITaskModel[]>([]);
  const [task, setTask] = useState<ITaskModel>(initialStateTask);
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState<string>("");
  const [startAt, setStartAt] = useState<string>("");
  const [endAt, setEndAt] = useState<string>("");

  const handleSubmit = () => {
    addDoc(collection(db, "tasks"), task).then((task) => {
      setMessage('You add a task with successfully!!!')
      setSeverity("success")
      setOpen(true)
    });
    setTask(initialStateTask);
    setStartAt("");
    setEndAt("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (taskId: string) => {
    deleteDoc(doc(db, "tasks", taskId)).then(task=> {
      setMessage('The task (id = ' + taskId + ') was deleted with successfully!!!')
      setSeverity("info")
      setOpen(true)
    });
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, title: e.target.value });
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTask({ ...task, description: e.target.value });
  };
  const handleStartAt = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, startAt: new Date(e.target.value) });
    setStartAt(e.target.value);
  };
  const handleEndAt = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, endAt: new Date(e.target.value) });
    setEndAt(e.target.value);
  };

  useEffect(() => {
    onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => {
          const task: ITaskModel = doc.data() as ITaskModel;
          task.taskId = doc.id;
          return task;
        })
      );
    });
  }, []);

  return (
    <div className="App">
      <div className="list-tasks">
        <List sx={listStyle}>
          {tasks.map((task, index) => (
            <ListItemButton
              sx={{
                ...cardStyle,
                backgroundColor: task.isDone
                  ? "lightgreen"
                  : "lightgoldenrodyellow",
              }}
              key={index}
              className="card-item"
            >
              <Tooltip title={task.description}>
                <div>
                  {task.title}
                  <IconButton onClick={() => handleDelete(task.taskId)}>
                    <Delete />
                  </IconButton>
                </div>
              </Tooltip>
            </ListItemButton>
          ))}
        </List>
      </div>
      <div className="form-task">
        <Card sx={{ boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)" }}>
          <CardContent sx={styles}>
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              name="title"
              placeholder="Enter a title here..."
              onChange={handleTitle}
              type="text"
              value={task.title}
            />
            <label htmlFor="description">Description</label>
            <TextareaAutosize
              id="description"
              name="description"
              minRows={5}
              onChange={handleDescription}
              placeholder="Enter a description here..."
              value={task.description}
            ></TextareaAutosize>
            <label htmlFor="startAt">Start At</label>
            <Input
              id="startAt"
              name="startAt"
              type="date"
              onChange={handleStartAt}
              value={startAt}
            />
            <label htmlFor="endAt">End At</label>
            <Input
              id="endAt"
              name="endAt"
              type="date"
              onChange={handleEndAt}
              value={endAt}
            />
            <Button
              type="button"
              onClick={handleSubmit}
              variant="contained"
              color="success"
            >
              Save
            </Button>
          </CardContent>
        </Card>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
