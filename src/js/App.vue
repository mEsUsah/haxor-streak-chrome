<template>
    <div>
        <div v-if="showMesage">{{ message }}</div>
        <login-form
            v-if="!authenticated"
            @authenticate="getAuthToken"
        ></login-form>
        <task-list
            v-if="tasks"
            :tasks="tasks"
            @increase-streak="increaseStreak"
        ></task-list>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { PropType, defineComponent } from 'vue'
import LoginForm from './views/LoginForm.vue';
import TaskList from './views/TaskList.vue';

const API_HOST: string = 'https://streak.haxor.no';
const API_TOKEN_GET: string = API_HOST + '/jwt/v1/token';
const API_TOKEN_REFRESH: string = API_HOST + '/jwt/v1/token/refresh';
const API_TASKS: string = API_HOST + '/api/v1/tasks/';

interface Task {
    id: string;
    name: string;
    streak: number;
    newest_registration: string;
}

export default defineComponent({
    components: {
        'login-form': LoginForm,
        'task-list': TaskList
    },
    data() {
        return {
            message: <string>'',
            authenticated: <boolean>false,
            accessToken: <string>'',
            refreshToken: <string>'',
            tasks: Array<Task>,
        }
    },
    methods: {
        /**
         * Authentication methods
         */
        getTokensFromStorage(): void{
            chrome.storage.sync.get(['accessToken', 'refreshToken'], (result) =>{
                if(result.accessToken && result.refreshToken){
                    this.accessToken = result.accessToken;
                    this.refreshToken = result.refreshToken;
                    this.refreshAuthToken();
                } else {
                    this.message = "Please login";
                }
            });
        },
        refreshAuthToken(): void {
            axios.post(API_TOKEN_REFRESH, {
                refresh: this.refreshToken
            }).then((response) => {
                if(response.status == 200){
                    this.accessToken = response.data.access;
                    this.authenticated = true;

                    chrome.storage.sync.set({
                        'accessToken': this.accessToken,
                    });
                    this.getTasks()
                }
            }).catch((error) => {
                this.message = "Please login";
                console.log(error);
            });
        },
        getAuthToken(username: string, password: string): void {
            axios.post(API_TOKEN_GET, {
                username: username,
                password: password
            }).then((response) => {
                if(response.status == 200){
                    this.accessToken = response.data.access;
                    this.refreshToken = response.data.refresh;
                    this.authenticated = true;
                    this.message = "";
                    this.getTasks();

                    chrome.storage.sync.set({
                        'accessToken': this.accessToken,
                        'refreshToken': this.refreshToken
                    });
                } else {
                    this.message = "Wrong username/password";
                }
            }).catch((error) => {
                if(error.response.status == 401){
                    this.message = "Wrong username/password";
                } else {
                    this.message = "Error, problem with the server. Please try again later.";
                    console.log(error);
                }
            });
        },

        /**
         * Task methods
         */
        getTasks(): void {
            const config = {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            };

            axios.get(API_TASKS, config).then((response) => {
                if(response.status == 200){
                    this.tasks = response.data;
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        increaseStreak(taskId: string): void {
            const url = API_TASKS + taskId + '/registration';
            const data = {};
            const config = {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            };
            
            axios.post(url, data, config).then((response) => {
                if(response.status == 201){
                    this.getTasks();
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    computed: {
        showMesage(): boolean {
            if (this.message != '')
                return true;
            return false;
        }
    },
    mounted() {
        this.getTokensFromStorage();
    }
});
</script>
