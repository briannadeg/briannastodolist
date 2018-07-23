import React, { Component } from 'react';
import './App.css';
import ToDo from './ToDo';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
export default class ToDoList extends Component {
  render() {
    const { toDoList, removeToDo, toggleCompleted } = this.props;
    const list = toDoList.map(toDo => (
      <Grid
        item
        xs={16}
        alignItems="center"
        container
        spacing={10}
        direction={"row"}
        justify="center"
      >
        <Paper
          xs={16}
          className={toDo.completed ? 'toDoCompleted toDoRow' : 'toDoRow'}
        >
          <ToDo key={toDo.id} {...{ toDo, removeToDo, toggleCompleted }} />
        </Paper>
      </Grid>
    ));
    return (
      <Grid container spacing={20}>
        {
          !list.length
          ?
          <Grid
            item
            xs={16}
            alignItems="center"
            container
            spacing={10}
            direction={"row"}
            justify="center"
          >
            <Paper
              xs={16}
              className="toDoRow centered"
            >
              No ToDo items
            </Paper>
          </Grid>
          :
          list
        }
      </Grid>
    );
  }
}
