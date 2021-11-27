import React, { useEffect, useState, useRef } from "react";
import "./kanban.css";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { name: "task 1", stage: 0 },
    { name: "task 2", stage: 0 },
  ]);

  // eslint-disable-next-line
  const [stagesNames, setStagesNames] = useState([
    "Backlog",
    "To Do",
    "Ongoing",
    "Done",
  ]);
  const [inputValue, setInputValue] = useState("");
  const createTaskBtn = useRef(null);

  let stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }
  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  useEffect(() => {
    if (inputValue.trim().length) createTaskBtn.current.disabled = false;
    else createTaskBtn.current.disabled = true;
  }, [inputValue]);

  const handleDelete = (task) => {
    const newTaskList = tasks.filter((tsk) => tsk.name !== task.name);
    setTasks(newTaskList);
  };

  const handleInputChange = (inputValue) => {
    if (inputValue.trim()) setInputValue(inputValue);
    else setInputValue("");
  };

  const handleCreateTask = () => {
    const newTask = {
      name: inputValue,
      stage: 0,
    };
    setTasks([...tasks, newTask]);
  };

  const handleStageChange = (task, action) => {
    const updateTasks = tasks.map(tsk => ({...tsk}));
    // eslint-disable-next-line
    updateTasks.some(tsk => {
      if(tsk.name === task.name) tsk.stage = action === 'forward' ? tsk.stage + 1: tsk.stage -1;
    });
    setTasks(updateTasks);
  }

  return (
    <div className="container">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          data-testid="create-task-input"
          onChange={(e) => handleInputChange(e.target.value)}
          value={inputValue}
        />
        <button
          type="submit"
          className="ml-30"
          data-testid="create-task-button"
          ref={createTaskBtn}
          onClick={handleCreateTask}
        >
          Create task
        </button>
      </section>

      <div className="row justify-content-md-center">
        {stagesTasks.map((tasks, i) => {
          return (
            <div className="col col-lg-3" key={`${i}`}>
              <div className="card-text">
                <h4>{stagesNames[i]}</h4>
                <ul className="styled mt-50" data-testid={`stage-${i}`}>
                  {tasks.map((task, index) => {
                    return (
                      <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="col col-lg-12">
                          <span
                            data-testid={`${task.name
                              .split(" ")
                              .join("-")}-name`}
                          >
                            {task.name}
                          </span>
                          <div className="icons">
                            <button
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-back`}
                              onClick={() => handleStageChange(task, 'back')}
                            >
                              <i className="material-icons">back</i>
                            </button>
                            <button
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-forward`}
                              onClick={() => handleStageChange(task, 'forward')}
                            >
                              <i className="material-icons">next</i>
                            </button>
                            <button
                              className="icon-only danger x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-delete`}
                              onClick={() => handleDelete(task)}
                            >
                              <i className="material-icons">del</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
