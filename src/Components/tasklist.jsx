import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faArrowDown,
    faArrowUp,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./tasklist.css";

function ToDoTaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    useEffect(() => {
        if (highlightedIndex !== null) {
            const timer = setTimeout(() => {
                setHighlightedIndex(null);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [highlightedIndex]);

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

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [
                updatedTasks[index - 1],
                updatedTasks[index],
            ];
            setTasks(updatedTasks);
            setHighlightedIndex(index - 1);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [
                updatedTasks[index + 1],
                updatedTasks[index],
            ];
            setTasks(updatedTasks);
            setHighlightedIndex(index + 1);
        }
    }

    return (
        <>
            <div className="to-do-list">
                <h1 className="to-do-heading">To-Do List</h1>
                <div className="input-and-button">
                    <label htmlFor="task-input" className="visually-hidden">
                        Task:
                    </label>
                    <input
                        id="task-input"
                        className="input-task-box"
                        type="text"
                        placeholder="Enter a task..."
                        value={newTask}
                        onChange={handleInputChange}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") addTask();
                        }}
                    />
                    <label htmlFor="add-button" className="visually-hidden">
                        Add Task
                    </label>
                    <button
                        id="add-button"
                        className="add-button"
                        onClick={addTask}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>

                <ul className="ul-container">
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className={
                                highlightedIndex === index ? "highlighted" : ""
                            }
                        >
                            <span className="text">{task}</span>
                            <button
                                className="move-button"
                                onClick={() => moveTaskDown(index)}
                                onKeyDown={(event) => {
                                    if (event.key === "ArrowDown") {
                                        moveTaskDown(index);
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowDown} />
                            </button>
                            <button
                                className="move-button"
                                onClick={() => moveTaskUp(index)}
                                onKeyDown={(event) => {
                                    if (event.key === "ArrowUp") {
                                        moveTaskUp(index);
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowUp} />
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => deleteTask(index)}
                                onKeyDown={(event) => {
                                    if (event.key === "Delete") {
                                        deleteTask(index);
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ToDoTaskList;
