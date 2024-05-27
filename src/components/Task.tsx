import styles from './Task.module.css';
import { Trash, Check } from "@phosphor-icons/react";

export interface TaskFill {
    id: number;
    content: string;
    isActive: boolean; 
}

interface TaskProps {
    task: TaskFill;
    onDelete: () => void;
    onToggleActive: (id: number) => void;
}

export function Task({ task, onDelete, onToggleActive }: TaskProps) {
    const handleCheckTask = () => {
        onToggleActive(task.id);
    };

    return (
        <article className={styles.task}>
            <button
                className={task.isActive ? styles.checkboxActive : styles.checkbox}
                onClick={handleCheckTask}
            >
                <Check size={12} weight="bold" />
            </button>
            <p className={task.isActive ? styles.checkActive : styles.pNormal}>{task.content}</p>
            <button className={styles.buttonTrash} onClick={onDelete}>
                <Trash size={24} />
            </button>
        </article>
    );
}
