<template>
    <div class="banner" >
        <div class="topnav">
            <a href="/"><img src="/image/navbar/newlogo.png" width="110px" height="auto" style="padding-left: 20px;" alt=""></a>
            <ul>
                <template v-if="id == ''">
                    <li id="comp2"><a href="/login">Log In</a></li>
                    <div class="line"></div>
                    <li id="comp2"><a href="/register">Register</a></li>
                </template>
                <div class="dropdown" v-if="id != ''">
                    <button class="btn btn-danger  dropdown-toggle" id="comp3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-user"></i> {{id}}
                    </button>
                    <p class="dropdown-menu" >
                        <button class="dropdown-item text-danger" type="button" @click="logout()">ออกจากระบบ</button>
                    </p>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id: '',
        }
    },
    methods:{
        logout(){
            this.id = ''
        }
    }
}
</script>

<style scoped>
    .banner{
        height: 7.5%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    }
</style>

