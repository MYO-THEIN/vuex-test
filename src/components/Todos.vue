<template>
	<div>
		<h3 class="text-primary text-center">All Tasks</h3>
		<div class="container">
			<div class="row">
				<AddTodo />
				<FilterTodos />
			</div>
			<div class="row">
				<div class="col-md-4 my-4" v-for="todo in myTodos" :key="todo.id">
					<b-card
						:bg-variant="dynamicBackground(todo)"
						text-variant="white"
						class="text-center"
						@dblclick="toggleCompleted(todo)"
					>
						<b-card-text class="d-flex justify-content-between">
							<span>{{ todo.title }}</span>
							<span @click="deleteTodo(todo.id)">
								<b-icon icon="trash-fill" variant="danger"></b-icon>
							</span>
						</b-card-text>
					</b-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AddTodo from "./AddTodo.vue";
import FilterTodos from "./FilterTodos.vue";
import { mapGetters, mapActions } from "vuex";
export default {
	components: {
		AddTodo,
		FilterTodos,
	},
	computed: {
		...mapGetters(["myTodos"]),
	},
	methods: {
		dynamicBackground(todo) {
			return todo.completed ? "success" : "primary";
		},
		toggleCompleted(todo) {
			todo.completed = !todo.completed;
			this.updateTodo(todo);
		},
		...mapActions(["getTodos", "deleteTodo", "updateTodo"]),
	},
	mounted() {
		this.getTodos();
	},
};
</script>

<style></style>
