<template>
    <div class="login-form__wrapper">
        <input type="text" id="username" name="username" 
            v-model="username"
            placeholder="Username">
        <input type="password" id="password" name="password" 
            v-model="password"
            placeholder="Password">
        <button @click="authenticate">Login</button>
    </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ['authenticate'],
    data() {
        return {
            username: <string>'',
            password: <string>'',
        }
    },
    methods: {
        authenticate(event: Event): void {
            console.log('Emitting authenticate event', this.username, this.password);
            this.$emit('authenticate', this.username, this.password);
        }
    }
});
</script>