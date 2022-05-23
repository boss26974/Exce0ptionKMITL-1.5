<template>
    <div>
        <div class="banner" >
        <div class="topnav_forum">
            <a :href="`${permissionPath}`"><img src="/image/navbar/newlogo.png" width="110px" height="auto" style="padding-left: 20px;" alt=""></a>
            <ul>
                <div id="MyClockDisplay" class="clock"></div>
                <li id="comp1" v-if="manage_acc == 1"><a href="/manageUser">Manage User</a></li>
                <li id="comp1" v-if="manage_standand == 1"><a href="/manageforum">Manage Forum</a></li>
                <li id="comp1" v-if="manage_standand == 1"><a href="/manageReport">Manage Report</a></li>
                <template v-if="id ==''">
                <li id="comp2"><a href="/login">Log In</a></li>
                <div class="line"></div>
                <li id="comp2"><a href="/register">Register</a></li>
                </template>
                <div class="dropdown" v-if="id !=''">
                <a :href="`${permissionPath}`" style="text-decoration: none;" v-show="role == 'User'"><button type="button" class="home btn btn-outline-light">Home</button></a>
                <button class="btn btn-danger  dropdown-toggle" id="comp3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i :class="{'fa fa-user-plus': role == 'Admin', 'fa fa-user': role == 'User'}"></i> {{id}}
                </button>
                <p class="dropdown-menu" >
                    <button class="dropdown-item text-danger" type="button" @click="logout()">ออกจากระบบ</button>
                </p>
                </div>
            </ul>
        </div>
        </div>
        <div class="container-fluid" id="all_arc">
            <div class="row">
                <div class="col-12">
                    <p id="arc_title">{{arc.forum_topic}}</p>
                    <i id="arc_date">Date: {{arc.forum_release_date}}</i>
                    <center><img id="arc_image" :src="arc.image_address"></center>
                    <p id="arc_description">{{arc.forum_description}}</p>
                    <a href="/forum" id="back_to_forum">กลับไปยังหน้าข่าวประชาสัมพันธ์</a>
                </div>
            </div>
        </div>
        <footer>
        <div id="footer_homepage">
            <a id="footer_button" class="btn" href="/help" v-show="id != ''">HELP</a>
            <p id="address">King Mongkut's Institute of Technology Ladkrabang</p>
            <p id="address">1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520</p>
            <p id="address">02 723 4900</p>
        </div>
    </footer>
    </div>
</template>

<script>
import axios from "axios";

    export default {
    data() {
        return{
            tokenUser: null,
            tokenAdmin: null,
            role: null,
            id: '',
            manage_acc: null,
            manage_standand: null,
            permissionPath: null,
            arc: null
        }
    },
    created() {
        this.tokenUser = JSON.parse(localStorage.getItem('tokenUser'))
        this.tokenAdmin = JSON.parse(localStorage.getItem('tokenAdmin'))
        if(this.tokenUser != null){this.role = 'User'}
        if(this.tokenAdmin != null){this.role = 'Admin'}
        if(this.tokenUser != null || this.tokenAdmin != null){
            axios.post("http://localhost:5000/checkTokenLogin", {
                role: this.role,
                tokenUser: this.tokenUser,
                tokenAdmin: this.tokenAdmin,
            }).then((response => {
                if(response.data.message == 'You can pass! (User)'){
                    this.id = response.data.id
                    this.permissionPath = '/user'
                }
                if(response.data.message == 'You can pass! (Admin)'){
                    this.id = response.data.id
                    this.manage_acc = response.data.rule_manage_acc
                    this.manage_standand = response.data.rule_standand_admin
                    this.permissionPath = '/admin'
                }
            })).catch((err) => {
                console.log(err)
            })  
        }
        else{
            this.permissionPath = '/'
        }
        axios.get("http://localhost:5000/forum/" + localStorage.getItem("forum_id"))
        .then((response) => {
            this.arc = response.data[0];
            console.log(response.data[0].forum_description);
            console.log("success");
        }).catch((err) => {
            this.arc = err;
        })
    },
    methods:{
        logout(){
            this.id = ''
            this.$router.push({ name: "Home" });
        },
    }
}
</script>

<style>
  #navbar_homepage{
    background-color: rgb(150, 54, 3);
    height: 12%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

#logo_navbar{
    margin-left: 3%;
    margin-top: -3%;
    width: 20%;
    height: 10%;
}

#navbar_manage{
    font-family: 'Kanit', sans-serif;
    text-decoration: none;
    color: #ffffff;
    font-size: 20px;
    font-weight: 200;
    margin-right: 40px;
}

#navbar_register{
    font-family: 'Kanit', sans-serif;
    text-decoration: none;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
}

#line_register{
    width: 0px;
    border-left: 2px solid #ffffff;
    height: 39px;
    display: inline;
    margin-left: 10px;
    margin-right: 10px;
}
#all_arc{
    padding-top: 7%;
    padding-right: 8%;
    padding-left: 8%;
    padding-bottom: 7%
}
#arc_title{
    font-family: 'Kanit', sans-serif;
    text-decoration: none;
    color: #E35205;
    font-size: 35px;
    font-weight: 700;
    text-align: center;
}
#arc_date{
    font-family: 'Kanit', sans-serif;
    text-decoration: none;
    color: #E35205;
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 5%;
}
#arc_image{
    width: 60%;
    height: 60%;
    padding-top: 5%;
}
#arc_description{
    font-family: 'Kanit', sans-serif;
    text-decoration: none;
    color: #E35205;
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    word-wrap: break-word;
    padding-top: 5%;
}
#back_to_forum{
    font-family: 'Kanit', sans-serif;
    text-decoration: none;
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    padding-bottom: 5%;
}
#back_to_forum:hover{
    color: rgb(150, 54, 3);
}
#footer_homepage{
    width: 100%;
    height: 78px;
    background-color: #E35205;
}

#address{
    font-family: 'Kanit', sans-serif;
    font-size: 15px;
    font-weight: 200;
    color : #ffffff;
    margin-left: 30px;
    margin-bottom: 0em;
}

#footer_button{
    width: 119px;
    height: 46px;
    border-radius: 10px;
    background-color: #ffffff;
    font-family: 'Kanit', sans-serif;
    font-size: 24px;
    font-weight: 500;
    float: right;
    text-align: center;
    margin-top: 16px;
    margin-right: 30px;
    color:  #1a1819;
}
</style>