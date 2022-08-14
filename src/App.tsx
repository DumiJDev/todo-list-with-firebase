import { Delete } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Input,
  List,
  Snackbar,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";

import { ChangeEvent, useEffect, useState } from "react";

import { ITaskModel } from "./models/TaskModel";

import "./App.css";
import { addTask, deleteTask, findAllTasks } from "./services/firestoreService";
import { ListItem } from "./components";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState<string>("");
  const [startAt, setStartAt] = useState<string>("");
  const [endAt, setEndAt] = useState<string>("");

  const handleSubmit = () => {
    setIsLoading(true);
    setIsDisable(true);

    addTask(task)
      .then((task) => {
        setMessage(`You add a task with successfully!!!\n`);
        setSeverity("success");
        setOpen(true);
        setTask(initialStateTask);
        setStartAt("");
        setEndAt("");
        setIsLoading(false);
        setIsDisable(false);
      })
      .catch((err) => {
        setMessage(`Ops! Occured an error, i will work to solve`);
        setSeverity("error");
        setOpen(true);
        setIsLoading(false);
        setIsDisable(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId).then((task) => {
      setMessage(`The task (id = ${taskId}) was deleted with successfully!!!`);
      setSeverity("error");
      setOpen(true);
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
    findAllTasks(setTasks);
  }, []);

  return (
    <div className="App">
      <div className="list-tasks">
        <List sx={listStyle}>
          {tasks.map((task, index) => (
            <Tooltip title={task.description} key={index}>
              <ListItem>
                <div>{task.title}</div>
                <IconButton onClick={() => handleDelete(task.taskId)}>
                  <Delete color="error" />
                </IconButton>
              </ListItem>
            </Tooltip>
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
              onClick={handleSubmit}
              variant="contained"
              color="success"
              disabled={isDisable}
            >
              {isLoading ? <CircularProgress /> : "Save"}
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
