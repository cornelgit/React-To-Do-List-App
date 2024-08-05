import { useState, useEffect } from "react";

function ToDoTaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(null);

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

    useEffect(() => {
        if (highlightedIndex !== null) {
            const timer = setTimeout(() => {
                setHighlightedIndex(null);
            }, 500); // Highlight duration in milliseconds

            return () => clearTimeout(timer);
        }
    }, [highlightedIndex]);

    return (
        <>
            <div className="to-do-list">
                <h1 className="to-do-heading">To-Do-List</h1>
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
                        Add
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
                                onClick={() => moveTaskUp(index)}
                            >
                                &#x2191;
                            </button>
                            <button
                                className="move-button"
                                onClick={() => moveTaskDown(index)}
                            >
                                &#x2193;
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => deleteTask(index)}
                            >
                                &#x2717;
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ToDoTaskList;
