<template>
    <div>
        <h1>{{ message }}</h1>
        <login-form
            v-if="!authenticated"
            @authenticate="authenticate"
        ></login-form>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
import LoginForm from './views/LoginForm.vue';

const API_HOST: string = 'http://localhost:8000';
const API_TOKEN_GET: string = API_HOST + '/jwt/v1/token';
const API_TOKEN_REFRESH: string = API_HOST + '/jwt/v1/token/refresh';

export default defineComponent({
    components: {
        'login-form': LoginForm
    },
    data() {
        return {
            message: <string>'Hello Vue',
            authenticated: <boolean>false
        }
    },
    methods: {
        getTokenFromLocalStorage(): void{
            chrome.storage.sync.get('token', (result) =>{
                console.log('Value currently is ' + result.token);
                this.message = "Not authenticated";
            });
        },
        authenticate(username: string, password: string): void {
            axios.post(API_TOKEN_GET, {
                username: username,
                password: password
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
        },
    },
    mounted() {
        this.getTokenFromLocalStorage();
    }
});
</script>