<template>
    <div class="task-list__wrapper">
        <div v-for="task in tasks" :key="task.id" class="task-list__item">
            <button 
                :disabled="hasRegisteredToday(task)"
                @click="increaseStreak(task)"
            >&plus;</button> 
            <span class="task-list__streak">{{ task.streak }}</span>           
            <span class="streak-flame streak-flame--red"></span>
            <span>{{ task.name }}</span> 
        </div>
    </div>
</template>

<script lang="ts">
import { Prop, PropType, defineComponent } from 'vue'

interface Task {
    id: string;
    name: string;
    streak: number;
    newest_registration: string;
}

export default defineComponent({
    props: {
        tasks: {
            type: Array as PropType<Task[]>,
            required: true
        }
    },
    emits: [
        'increase-streak',
    ],
    methods: {
        hasRegisteredToday(task: Task): boolean {
            return task.newest_registration == new Date().toISOString().split('T')[0];
        },
        increaseStreak(task: Task): void {
            if(!this.hasRegisteredToday(task)){
                this.$emit('increase-streak', task.id);
            }
        }
    }
});
</script>
