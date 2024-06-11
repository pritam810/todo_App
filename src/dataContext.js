import { createContext, useContext, useState, useEffect } from "react";

const dataContext = createContext();

// Custom hook to consume the context value --->>
export function useValue(){
    const value = useContext(dataContext);
    return value;
}

export default function CustomDataContext({children}) {
    const [todos, setTodos] = useState([]);
 

    useEffect(()=>{
        const fetchTodos = async()=>{
            try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            setTodos(data);
            } catch(err){
                console.error('Error fetching todos:', err);
            }
        }
        fetchTodos();
    },[])

    // Function to add a todo --->>
    const addTodo = async (text)=>{
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos',{
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                userId: todos.length + 1,
                title: text,
                completed: false,
                })
            })
            const data = await response.json();
            console.log("added data: ", data)
            setTodos([...todos, data]);

        } catch(err) {
            console.log("Error while adding todo :", err);
        }
        
    }

    // Function to toggle completed status in a todo --->>
    const toggleTodo = async (id) => {
        try{
        const todoToToggle = todos.find(todo=> todo.id === id);
        const updatedTodo = {...todoToToggle, completed: !todoToToggle.completed}

        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
        });
        const data = await response.json();
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: data.completed } : todo
        )
        setTodos(updatedTodos);

        } catch(err){
            console.error('Error updating todo:', err); 
        }
    }

    // Function to delete a todo --->>
    const deleteTodo = async (id)=> {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            });
            const updatedTodos = todos.filter(todo => todo.id !== id);
            console.log("--->",updatedTodos)
            setTodos(updatedTodos);
        } catch(err){
            console.log('Error while deleting the todo: ', err);
        }
    }

    return (
        <dataContext.Provider value={{todos, addTodo, toggleTodo, deleteTodo}}>
            { children }
        </dataContext.Provider>
    )
}