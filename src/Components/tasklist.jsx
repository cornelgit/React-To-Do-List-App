import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faArrowDown,
    faArrowUp,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./tasklist.css";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks((t) => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index, classname) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [
                updatedTasks[index - 1],
                updatedTasks[index],
            ];
            setTasks(updatedTasks);
            setHighlightedIndex(classname);
        }
    }

    function moveTaskDown(index, classname) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [
                updatedTasks[index + 1],
                updatedTasks[index],
            ];
            setTasks(updatedTasks);
            setHighlightedIndex(classname);
        }
    } // refactor and combine with moveTaskUp

    return (
        tasks && (
            <>
                <div className="to-do-list">
                    <h1 className="to-do-heading">To-Do List</h1>
                    <div className="input-and-button">
                        <input
                            className="input-task-box"
                            type="text"
                            placeholder="Enter a task..."
                            value={newTask}
                            onChange={handleInputChange}
                            onKeyDown={(event) => {
                                event.key === "Enter" ? addTask() : null;
                            }}
                        />
                        <button className="add-button" onClick={addTask}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>

                    <ul className="ul-container">
                        {tasks.map((task, index) => (
                            <li key={index} className="li-container">
                                {/* <span className="text">{task}</span> */}
                                <span className={`text ${highlightedIndex}`}>
                                    {task}
                                </span>
                                <button
                                    className="move-button"
                                    onClick={() =>
                                        moveTaskDown(index, "moveTaskDown")
                                    }
                                >
                                    <FontAwesomeIcon icon={faArrowDown} />
                                </button>
                                <button
                                    className="move-button"
                                    onClick={() =>
                                        moveTaskUp(index, "moveTaskUp")
                                    }
                                >
                                    <FontAwesomeIcon icon={faArrowUp} />
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteTask(index)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        )
    );
}

export default TaskList;
