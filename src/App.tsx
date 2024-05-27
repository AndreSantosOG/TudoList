import { useState, FormEvent, ChangeEvent } from 'react';
import styles from './App.module.css';
import { Rocket, PlusCircle, Clipboard } from "@phosphor-icons/react";
import './global.css';
import { Task, TaskFill } from './components/Task';

const initialTasks: TaskFill[] = [
    {
        id: 1,
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
        isActive: true,
    },
    {
        id: 2,
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
        isActive: false,
    },
];

export function App() {
    const [tasks, setTasks] = useState<TaskFill[]>(initialTasks);
    const [newTaskContent, setNewTaskContent] = useState('');

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();
        const newTask: TaskFill = {
            id: tasks.length + 1,
            content: newTaskContent,
            isActive: false,
        };
        setTasks([...tasks, newTask]);
        setNewTaskContent('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('');
        setNewTaskContent(event.target.value);
    }

    function handleDeleteTask(taskIdToDelete: number) {
        const updatedTasks = tasks.filter(task => task.id !== taskIdToDelete);
        setTasks(updatedTasks);
    }

    function handleToggleTaskActive(taskId: number) {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, isActive: !task.isActive } : task
        );
        setTasks(updatedTasks);
    }

    function countActiveTasks(): number {
        return tasks.filter(task => task.isActive).length;
    }

    return (
        <div>
            <header>
                <h1><Rocket size={32}/>to<span>do</span></h1>
            </header>
            <form className={styles.search} onSubmit={handleCreateNewTask}>
                <input
                    type="text"
                    placeholder='Adicione uma nova tarefa'
                    required
                    value={newTaskContent}
                    onChange={handleNewTaskChange}
                />
                <button className={styles.buttonPlus} type="submit">
                    Criar <PlusCircle size={16} />
                </button>
            </form>
            <nav>
                <div className={styles.informations}>
                    <p>Tarefas Criadas<span>{tasks.length}</span></p>
                    <p>Concluídas<span>{countActiveTasks()}</span></p>
                </div>
                {tasks.length === 0 ? (
                    <div className={styles.nothing}>
                        <Clipboard size={56} />
                        <h3>Você ainda não tem tarefas cadastradas</h3>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
                ) : (
                    tasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            onDelete={() => handleDeleteTask(task.id)}
                            onToggleActive={handleToggleTaskActive}
                        />
                    ))
                )}
            </nav>
        </div>
    );
}
