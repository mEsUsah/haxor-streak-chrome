<template>
    <div class="task-list__wrapper">
        <div v-for="task in tasks" :key="task.id">
            <button>&plus;</button> {{ task.name }} ({{ task.streak }}) 
        </div>
    </div>
  
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        tasks: {
            type: Array,
            required: true
        }
    },
});
</script>
