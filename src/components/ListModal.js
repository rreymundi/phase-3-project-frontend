import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const ListModal = ({ open, setOpen, handleClose, onAddList}) => {

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      // border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      display: 'flex'
    };
    
    const [formData, setFormData] = useState({
      name: "",
    })
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  
    const handleSubmit = (e) => {
      setOpen(false);
      e.preventDefault();
      const newList = {
        name: formData.name,
        }
      fetch("http://localhost:9292/lists", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newList)
      })
      .then((r) => r.json())
      .then(onAddList)
    }

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center" justify="center" direction="column" >
                <Grid item>
                  <Typography>Add a new list</Typography>
                </Grid>
                <Grid item>
                  <TextField required={ true } id="name" name="name" variant="standard" placeholder="List name" value={formData.name} onChange={handleChange}/>
                </Grid>
                <Grid item>
                    <Button color="primary" type="submit">Submit</Button>
                </Grid>
              </Grid>
            </Box>
    </Modal>
  )
}

export default ListModal