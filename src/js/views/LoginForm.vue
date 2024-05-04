<template>
    <form class="login-form__wrapper">
        <input type="text" id="username" name="username" class="login-form__input"
            v-model="username"
            placeholder="Username">
        <input type="password" id="password" name="password" class="login-form__input"
            v-model="password"
            placeholder="Password">
        <button @click="authenticate">Login</button>
    </form>
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
            event.preventDefault();
            this.$emit('authenticate', this.username, this.password);
        }
    }
});
</script>