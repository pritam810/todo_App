import React from "react";
import styles from "./list.module.css";
import { useValue } from "../dataContext";

export default function TodoList (){
    const {todos, toggleTodo, deleteTodo} = useValue();
    return (
        <>
        <ul className={styles.listContainer}>
            {todos.length == 0 && <p className={styles.emptyTxt}>Oops! Nothing to show</p>}
            {todos.map((item, index)=>(
                <li className={styles.list_item} key={item.userId}>
                <p>{item.title}</p>
                <div className={styles.btnContainer}>
                <button onClick={()=> toggleTodo(item.id)} className={item.completed ? styles.completed : styles.pending}>
                    {item.completed ? "COMPLETED" : "PENDING"}
                </button>
                <button onClick={()=>deleteTodo(item.id)} className={styles.deleteBtn}>DELETE</button>
                </div>
                </li>
            ))}
        </ul>
        </>
    )
}