import axios from 'axios'

export default {
    state: {
        todos: []
    },
    getters: {
        myTodos(state) {
            return state.todos;
        }
    },
    mutations: {
        setTodos(state, data) {
            state.todos = data;
        },
        addTodo(state, newTodo) {
            state.todos.unshift(newTodo);
        },
        deleteTodo(state, id) {
            state.todos = state.todos.filter(t => t.id !== id);
        },
        updateTodo(state, todo) {
            state.todos = state.todos.map(t => {
                return t.id === todo.id ? todo : t;
            });
        }
    },
    actions: {
        async getTodos({ commit }) {
            let res = await axios.get("https://jsonplaceholder.typicode.com/todos");
            commit("setTodos", res.data);
        },
        async filterTodos({ commit }, limit) {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
            commit("setTodos", res.data);
        },
        async addTodo({ commit }, newTodo) {
            let res = await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
            commit("addTodo", res.data);
        },
        async deleteTodo({ commit }, id) {
            let res = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
            commit("deleteTodo", id);
        },
        async updateTodo({ commit }, todo) {
            let res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);
            commit("updateTodo", todo);
        }
    }
}
