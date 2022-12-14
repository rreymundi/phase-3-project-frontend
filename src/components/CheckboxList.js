import React, { useState } from 'react';
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import TaskModal from './TaskModal';
import Task from './Task';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import ListEditModal from './ListEditModal';

const CheckboxList = ({ 
  list, 
  lists, 
  setLists, 
  onAddTask, 
  onCheckTask, 
  onSaveTask, 
  onEditList,
  onDeleteList,
  onEditTask
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderedTasks = list.tasks?.map((task) => task.status === false ? <Task key={task.id} list={list} setLists={setLists} task={task} saved={task.saved} onCheckTask={onCheckTask} onSaveTask={onSaveTask} onEditTask={onEditTask} /> : null)

  return (
    <Card sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: '10px' }} >
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'right' }} >
          <Button sx={{ mt: 1, mb: 1, color: '#1976d2' }} component={ Link } to={`${list.id}/edit`} onClick={handleOpen} >
              {list.name}
          </Button>
          <Container>
            <Button component={ Link } to={`${list.id}`} onClick={handleOpen} sx={{ minWidth: 0 }} >
              <AddCircleIcon />
            </Button>
          </Container>
        </Container>
          {renderedTasks}
        <Outlet />
          <Routes>
            <Route path={`${list.id}`} element={<TaskModal list={list} open={open} setOpen={setOpen} handleClose={handleClose} onAddTask={onAddTask} />} />
            <Route path={`${list.id}/edit`} element={<ListEditModal list={list} open={open} setOpen={setOpen} handleClose={handleClose} onEditList={onEditList} onDeleteList={onDeleteList} />} />
          </Routes>
      </Card>
  )
}

export default CheckboxList;