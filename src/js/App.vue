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
            authenticated: <boolean>false,
            accessToken: <string>'',
            refreshToken: <string>'',
        }
    },
    methods: {
        getTokenFromLocalStorage(): void{
            chrome.storage.sync.get('token', (result) =>{
                console.log('Value currently is ' + result.token);
                this.message = "Please login";
            });
        },
        authenticate(username: string, password: string): void {
            axios.post(API_TOKEN_GET, {
                username: username,
                password: password
            }).then((response) => {
                if(response.status == 200){
                    this.accessToken = response.data.access;
                    this.refreshToken = response.data.refresh;
                    this.authenticated = true;
                    this.message = "Authenticated";

                    chrome.storage.sync.set({'accessToken': this.accessToken}, () => {
                        console.log('accessToken is set to: ' + this.accessToken);
                    });
                    chrome.storage.sync.set({'refreshToken': this.refreshToken}, () => {
                        console.log('refreshToken is set to: ' + this.refreshToken);
                    });
                } else {
                    this.message = "wrong password";
                }
            }).catch((error) => {
                if(error.response.status == 401){
                    this.message = "Wrong password";
                } else {
                    this.message = "Error";
                }
            });
        },
    },
    mounted() {
        this.getTokenFromLocalStorage();
    }
});
</script>