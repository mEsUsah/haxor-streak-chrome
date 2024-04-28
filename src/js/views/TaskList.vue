<template>
    <div class="task-list__wrapper">
        <div v-for="task in tasks" :key="task.id">
            <button :disabled="hasRegisteredToday(task)">&plus;</button> {{ task.name }} ({{ task.streak }})           
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Task {
    id: number;
    name: string;
    streak: number;
    newest_registration: string;
}

export default defineComponent({
    props: {
        tasks: {
            type: Array,
            required: true
        }
    },
    methods: {
        hasRegisteredToday(task: Task): boolean {
            return task.newest_registration == new Date().toISOString().split('T')[0];
        }
    }
});
</script>
