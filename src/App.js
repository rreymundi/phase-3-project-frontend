import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  const [lists, setLists] = useState([]);
  const [search, setSearch] = useState("");
  const [savedStatus, setSavedStatus] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState(false);

  useEffect(() => {
    fetch("http://localhost:9292/lists")
    .then((r) => r.json())
    .then((data) => setLists(data));
  }, []);

  const handleListAdd = (newList) => {
    setLists([...lists, newList])
  };

  const tasksArrays = lists.map((list) => list.tasks);
  const tasks = tasksArrays.flat(1);

  const handleTaskAdd = (newTask) => {
    const updatedLists = lists.map((list) => {
      if (list.id === newTask.list_id) {
        list.tasks.push(newTask)
        return list
      } else {
        return list
        }
    })
    setLists(updatedLists)
  };

  const handleSaveTask = () => {
    setSavedStatus((savedStatus) => !savedStatus)
  }

  const handleCheckTask = () => {
    setCheckedStatus((checkedStatus) => !checkedStatus)
  }

 const handleDeleteTask = (deletedTask) => {
    const updatedLists = lists.map((list) => {
      if (list.id === deletedTask.list_id) {
        const updatedListOfTasks = list.tasks.filter((task) => task.id !== deletedTask.id)
        list.tasks = updatedListOfTasks
        return list
      } else {
        return list
      }
    })
    setLists(updatedLists)
  }

  return (
      <Router>
        <NavBar search={search} setSearch={setSearch} />
        <Content lists={lists} setLists={setLists} tasks={tasks} search={search} onAddList={handleListAdd} onAddTask={handleTaskAdd} onSaveTask={handleSaveTask} onCheckTask={handleCheckTask} onDeleteTask={handleDeleteTask} />
        <Footer />
      </Router>
  );
}

export default App;
