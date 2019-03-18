<template>
    <div id="welcome">
        <h1 class="welcome-header">A simple place to gather your favorite recipes</h1>
        <div class="welcome-content">
            <img class="welcome-img" src="../assets/padmadim.jpg" alt="food">
            <div class="form">
                <input
                    class="input"
                    type="text"
                    v-model="email"
                    v-on:keyup.enter="register"
                    placeholder="email"
                />
                <input
                    class="input"
                    type="password"
                    v-model="password"
                    v-on:keyup.enter="register"
                    placeholder="password"
                />
                <div class="btn-container">
                    <div class="submit" @click="register">register</div>
                    <div class="submit" @click="login">login</div>
                </div>
            </div>
        </div>
        
        <div class="message">{{this.message}}</div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    require('firebase/auth')

    export default {
        name: 'register',
        data() {
            return {
                email: "",
                password: "",
                message: ""
            }
        },
        methods: {
            login() {
                if (this.email && this.password) {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(this.email, this.password)
                        .then(
                            (user) => {
                                firebase
                                    .auth().currentUser
                                    .getIdToken(true)
                                    .then(token => localStorage.setItem('token', token))
                                this.$router.push("/recipes")
                            },
                            (err) => this.message = err.message
                        )
                } else {
                    this.message = "Please enter an email & password"
                }
            },
            register() {
                if (this.email && this.password) {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(this.email, this.password)
                        .then(
                            () => {
                                this.message = "Account successfully created"
                                this.login()
                            },
                            (err) => this.message = err.message
                        )
                } else {
                    this.message = "Please enter an email & password"
                }
            }
        }
    }
</script>

<style scoped>
    .welcome-header {
        width: 50%;
        padding: 30px;
        margin: 40px auto;
        font-size: 28px;
        color: white;
    }
    .welcome-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        margin: 10px auto;
    }
    .form {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 45%;
    }
    .input {
        padding: 10px;
        width: 100%;
        max-width: 480px;
        font-size: 18px;
        margin: 10px 0;
    }
    .btn-container {
        font-size: 18px;
        width: calc(100% + 20px);
        max-width: 500px;
        margin: 20px 0;
        border: 2px solid transparent;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .submit {
        width: 40%;
        border: 1px solid black;
        padding: 10px;
        background: white;
        cursor: pointer;
    }
    .submit:hover {
        background: lightgrey;
    }
    .welcome-img {
        width: 45%;
        height: auto;
    }
    .message {
        font-size: 18px;
        margin: 10px;
    }
    @media (max-width: 600px) {
        .welcome-header {
            width: 90%;
            padding: 0;
            margin: 20px auto;
        }
        .welcome-content {
            flex-direction: column;
        }
        .welcome-img {
            width: 100%;
            margin-bottom: 10px;
        }
        .form {
            width: 100%;
        }
        .input {
            width: calc(100% - 22px);
        }
        .btn-container {
            flex-direction: column;
        }
        .submit {
            width: 60%;
            margin: 5px auto;
        }
    }
</style>