<template>
    <body>
    <div class="banner" >
      <div class="topnav_reportform">
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
    <div id="reportform" class="container-fluid">
        <p id="reportform_title">แบบฟอร์มร้องเรียน</p>
        <div class="col-12"  id="reportform_box" style="background-color: #6BDCA8;">
            <div class="row">
                <div class="col-6" id="reportform_description">
                    <p id="reportform_box_title">ปัญหาด้านสังคม</p>
                    <p id="reportform_box_description">ร้องเรียนปัญหาด้านสังคมได้ที่นี่</p>
                    <button id="reportform_button" class="btn" @click="createreport('สภาพสังคม')">ร้องเรียน</button>
                </div>
                <div class="col-6" id="reportform_image_right" style="background-image: url('https://d25tv1xepz39hi.cloudfront.net/2016-08-01/files/picture-style_1311.jpg');"></div>
            </div>
        </div>
        <div class="col-12" id="reportform_box" style="background-color: #E35205;">
            <div class="row" style="height: 100%;">
                <div class="col-6" id="reportform_image_left" style="background-image: url('https://www.educationcorner.com/images/featured-importance-education.png');"></div>
                <div class="col-6" id="reportform_description">
                    <p id="reportform_box_title">ปัญหาด้านการเรียน</p>
                    <p id="reportform_box_description">ร้องเรียนปัญหาด้านการเรียนได้ที่นี่</p>
                    <button id="reportform_button" class="btn" @click="createreport('การศึกษา')">ร้องเรียน</button>
                </div>
            </div>
        </div>
        <div class="col-12" id="reportform_box" style="background-color: #3FAAF6;">
            <div class="row" style="height: 100%;">
                <div class="col-6" id="reportform_description">
                    <p id="reportform_box_title">ปัญหาด้านทุนการศึกษา</p>
                    <p id="reportform_box_description">ร้องเรียนปัญหาด้านทุนการศึกษาได้ที่นี่</p>
                    <button id="reportform_button" class="btn" @click="createreport('ทุนการศึกษา')">ร้องเรียน</button>
                </div>
                <div class="col-6" id="reportform_image_right" style="background-image: url('https://5estimates.com/wp-content/uploads/2020/01/SCHOLARSHIP.jpg');"></div>
            </div>
        </div>
        <div class="col-12" id="reportform_box" style="background-color: #DA8DFB;">
            <div class="row" style="height: 100%;">
                <div class="col-6" id="reportform_image_left" style="background-image: url('http://agora.rovernet.eu/wp-content/uploads/2020/01/Registration.jpeg');"></div>
                <div class="col-6" id="reportform_description">
                    <p id="reportform_box_title">ปัญหาด้านระบบการลงทะเบียน</p>
                    <p id="reportform_box_description">ร้องเรียนปัญหาด้านระบบการลงทะเบียนได้ที่นี่</p>
                    <button id="reportform_button" class="btn" @click="createreport('การลงทะเบียนเรียน')">ร้องเรียน</button>
                </div>
            </div>
        </div>
        <div class="col-12" id="reportform_box" style="background-color: #F5B406;">
            <div class="row" style="height: 100%;">
                <div class="col-6" id="reportform_description">
                    <p id="reportform_box_title">ปัญหาด้านสภาพแวดล้อม</p>
                    <p id="reportform_box_description">ร้องเรียนปัญหาด้านสภาพแวดล้อมได้ที่นี่</p>
                    <button id="reportform_button" class="btn" href="#" @click="createreport('สภาพแวดล้อม')">ร้องเรียน</button>
                </div>
                <div class="col-6" id="reportform_image_right" style="background-image: url('https://coenv-media-gene1ufvxiloffjq.stackpathdns.com/2016/02/career-fair-1.jpg');"></div>
            </div>
        </div>
    </div>
    <footer>
        <div id="footer_homepage">
            <a id="footer_button" class="btn" href="/help">HELP</a>
            <p id="address">King Mongkut's Institute of Technology Ladkrabang</p>
            <p id="address">1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520</p>
            <p id="address">02 723 4900</p>
        </div>
    </footer>
    </body>
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
        }
    },
    created(){
        this.tokenUser = JSON.parse(localStorage.getItem('tokenUser'))
        this.tokenAdmin = JSON.parse(localStorage.getItem('tokenAdmin'))
        if(this.tokenUser != null || this.tokenAdmin != null){
            if(this.tokenUser != null){this.role = 'User'}
            if(this.tokenAdmin != null){this.role = 'Admin'}
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
                this.$swal({
                    icon: 'warning',
                    title: 'Oops! Error Your token hahahaha.',
                    showConfirmButton: true,
                })
                this.$router.push({ name: "Home" });
                console.log(err)
            })  
        }
        else{
            this.$swal({
                icon: 'warning',
                title: 'กรุณาล็อกอินก่อนเข้าใช้งาน',
                showConfirmButton: true,
            })
            this.$router.push({ name: "Home" });
        }
    },
    methods: {
        logout(){
            this.id = ''
            console.log('Log out!')
            this.$router.push({ name: "Home" });
        },
        createreport: function(type){
            if(type == "สภาพสังคม"){
                localStorage.setItem("color", "#6BDCA8");
                localStorage.setItem("type", "สภาพสังคม");
            }
            else if(type == "การศึกษา"){
                localStorage.setItem("color", "#E35205");
                localStorage.setItem("type", "การศึกษา");
            }
            else if(type == "ทุนการศึกษา"){
                localStorage.setItem("color", "#3FAAF6");
                localStorage.setItem("type", "ทุนการศึกษา");
            }
            else if(type == "การลงทะเบียนเรียน"){
                localStorage.setItem("color", "#DA8DFB");
                localStorage.setItem("type", "การลงทะเบียนเรียน");
            }
            else if(type == "สภาพแวดล้อม"){
                localStorage.setItem("color", "#F5B406");
                localStorage.setItem("type", "สภาพแวดล้อม");
            }
            window.location.href = "/reportform/createreport"
        }
    }
}
</script>

<style>
    body{
      background-color: #1a1819;
    }
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
    #reportform{
        margin-top: 20px;
        margin-bottom: 38px;
        padding-left: 8%;
        padding-right: 8%;
    }

    #reportform_title{
        color: #E35205;
        font-family: 'Kanit', sans-serif;
        font-size: 35px;
        font-weight: 700;
        padding-top: 10px;
        margin-bottom: -50px;
    }

    #reportform_box{
        width: 100%;
        border-radius: 30px;
        margin-top: 5%;
    }

    #reportform_description{
        padding-top: 3%;
        padding-left: 5%;
    }

    #reportform_box_title{
        color: #1a1819;
        font-family: 'Kanit', sans-serif;
        font-size: 35px;
        font-weight: 700;
    }

    #reportform_box_description{
        font-family: 'Kanit', sans-serif;
        font-size: 20px;
        font-weight: 300;
        color : #1A1819;
    }

    #reportform_button{
        width: 119px;
        height: 46px;
        border-radius: 10px;
        background-color: #1a1819;
        font-family: 'Kanit', sans-serif;
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        margin-top: 5%;
        margin-bottom: 30%;
        color:  #ffffff;
    }
    #reportform_image_right{
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
    }
    #reportform_image_left{
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
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
    /* topnav_reportform only login && reg */

    .topnav_reportform{
        color:#fff;
        display:flex;
        justify-content: space-between;
    }
    .topnav_reportform ul{
        display: flex;
        justify-content: space-around;
        padding-top: 10px;
        padding-right: 20px;  
    }
    .topnav_reportform li{
        list-style: none;        
    }
    .topnav_reportform #comp1 a{
        color: #fff;
        text-decoration: none;
        font-size: 20px;
        font-weight: 200;
        padding: 5px 12px;
    }
    .topnav_reportform #comp1 a:hover{
        color: orange;
        text-decoration: none;
    }
    .topnav_reportform #comp2 a{
        color: #fff;
        text-decoration: none;
        font-size: 20px;
        font-weight: 700;
        padding: 5px 12px;
    }
    .topnav_reportform #comp2 a:hover{
        color: yellow;
        text-decoration: none;
    }

    .topnav_reportform #comp3{
        color:white; 
        background-color:#e4af01;
        margin-right: 20px; 
        margin-left: 10px; 
    }

    .topnav_reportform #comp3:hover{
        background-color:#f7d12b; 
    }

    .topnav_reportform::before{
        content: " ";
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        background-color:#d86a03;
        opacity: 0.53;
        z-index: 1;
    }

    .topnav_reportform > * {
        z-index: 100;
    }
    .home{
        color: white;
        font-size: 15px;
        margin-top: 5px;
        margin-right: 30px;
    }
    .home:hover{
        color:black;
    }
</style>