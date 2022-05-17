<template>
    <body>
        <div class="banner" >
            <div class="topnav_trackingstatus">
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
        <center><p id="tracking_big_title">ติดตามสถานะเรื่องร้องเรียน</p></center>
        <div id="all_select_tab" class="container-fluid">
            <div class="row">
                <div class="col-5" id="select_by_type">
                    <p id="select_title">เลือกหมวดหมู่ร้องเรียน</p>
                    <select id="type_select" class="form-control" v-model="type_select">
                        <option value="" disabled selected>โปรดเลือกหมวดหมู่</option>
                        <option value="sociality">สภาพสังคม</option>
                        <option value="studying">การศึกษา</option>
                        <option value="scholarship">ทุนการศึกษา</option>
                        <option value="register">การลงทะเบียนเรียน</option>
                        <option value="environment">สภาพแวดล้อม</option>
                    </select>
                    <button id="select_button" class='btn' @click="type_report()">ตรวจสอบ</button>
                    <p id="error_massage">{{errortype}}</p>
                </div>
                <div class="col-2"></div>
                <div class="col-5" id="select_by_id">
                    <center><p id="select_title">กรอกหมายเลขประจำเอกสาร</p></center>
                    <input type="number" class="form-control" id="id_select" v-model="id_select" placeholder="กรอกหมายเลขประจำเอกสารเพื่อค้นหา">
                    <button id="select_button" class='btn' @click="id_report()">ตรวจสอบ</button>
                    <p id="error_massage">{{errorid}}</p>
                </div>
            </div>
        </div>
        <center><p id="tracking_big_title" style="font-size: 24px;" v-show="typescreen || id_screen">{{title}}</p></center>
        <div id="all_select_tab" class="container-fluid">
            <section  v-show="typescreen"><div class="row" v-for="reportform in reportforms" :key="reportform.report_form_id" style="margin-bottom: 7%;">
                <div class="col-5" id="reportform_description">
                    <p>หัวข้อเรื่องร้องเรียน : {{reportform.report_form_topic}}</p>
                    <p>เนื้อหาเรื่องร้องเรียน : {{reportform.problem_description}}</p>
                    <p>สถานะ : {{reportform.status}}</p>
                    <p>ประเภทเรื่องร้องเรียน : {{reportform.type}}</p>
                </div>
                <div class="col-7" id="reportform_bar">
                    <div class="row">
                        <div class="col-12" style="margin-bottom : 3%;">
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" :style="tubestatus(reportform.status)" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="col-3" style="text-align: center">
                            <i :style="{'font-weight': statusfont(reportform.status, 0).weight}">ระบบได้รับเรื่องแล้ว</i>
                        </div>
                        <div class="col-3" style="text-align: center">
                            <i :style="{'font-weight': statusfont(reportform.status, 1).weight}">ระบบกำลังตรวจสอบ</i>
                        </div>
                        <div class="col-3" style="text-align: center">
                            <i :style="{'font-weight': statusfont(reportform.status, 2).weight}">{{extrafontstatus(reportform.status)}}</i>
                        </div>
                        <div class="col-3" style="text-align: center">
                            <i :style="{'font-weight': statusfont(reportform.status, 3).weight}">ระบบดำเนินการสำเร็จ</i>
                        </div>
                    </div>
                </div>
            </div></section>
            <section  v-show="id_screen"><div class="row" v-for="reportform in reportforms" :key="reportform.report_form_id" style="margin-bottom: 7%;">
                <div class="col-12">
                    {{reportform.report_form_topic}}
                </div>
                <div class="col-12">
                    <div class="row" style="color: #ffffff">
                        <div class="col-12" style="margin-bottom : 3%;">
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" :style="tubestatus(reportform.status)" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="col-3" style="text-align: center">
                            <i :style="{'opacity': statusfont(reportform.status, 0).opa}">ระบบได้รับเรื่องแล้ว</i>
                        </div>
                        <div class="col-3" style="text-align: center">
                            <i :style="{'opacity': statusfont(reportform.status, 1).opa}">ระบบกำลังตรวจสอบ</i>
                        </div>
                        <div class="col-3" style="text-align: center">
                            <i :style="{'opacity': statusfont(reportform.status, 2).opa}">{{extrafontstatus(reportform.status)}}</i>
                        </div>
                        <div class="col-3" style="text-align: center">
                            <i :style="{'opacity': statusfont(reportform.status, 3).opa}">ระบบดำเนินการสำเร็จ</i>
                        </div>
                    </div>
                    <div class="row">
                        <p id="tracking_big_title" style="font-size : 24px; color : #ffffff;">หมวดหมู่ {{reportform.type}}</p>
                        <div class="col-12">
                            <p id="reportform_description_id">{{reportform.problem_description}}</p>
                        </div>
                    </div>
                </div>
            </div></section>
        </div>
        <footer id="footer">
      <div class="row">
        <div class="col-md-5"></div>
        <div class="col-md-5">
          <div class="copyright" style="padding-top: 20px; color: #aaa">
            Copyright &copy; 2021 ExptionKMITL
          </div>
        </div>
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
                // trackingstatus
                reportforms: [],
                type_select: null,
                id_select: "",
                typescreen: false,
                id_screen: false,
                title: "",
                errortype: "",
                errorid: ""
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
        methods:{
            logout(){
                this.id = ''
                console.log('Log out!')
                this.$router.push({ name: "Home" });
            },
           type_report: function(){
            if(this.type_select == null){
                this.id_screen = false;
                this.typescreen = false;
                this.errortype = "กรุณาเลือกหมวดหมู่";
            }
            else{
                this.reportform = this.getreportform(this.type_select);
            }
           },
           getreportform: function(type){
                   axios.get("http://localhost:5000/getreportform/type/" + type)
                   .then((response) => {
                       this.reportforms = response.data.data;
                       this.id_screen = !response.data.status;
                       this.typescreen = response.data.status;
                       this.errortype = response.data.error;
                       this.title = "สถานะเรื่องร้องเรียน หมวดหมู่" + response.data.title;
                   }).catch((err) => {
                       console.log(err);
                   })
            },
          id_report: function(){
               if(this.id_select == ""){
                    this.id_screen = false;
                    this.typescreen = false;
                    this.errorid = "กรุณากรอกหมายเลขประจำเอกสาร";
               }
               else{
                    this.reportforms = this.getreportform_id(this.id_select);
               }
           },
           getreportform_id: function(id){
               axios.get("http://localhost:5000/getreportform/searchbyid/" + id)
                    .then((response) => {
                    this.reportforms = response.data.data;
                    this.id_screen = response.data.status;
                    this.typescreen = false;
                    this.errorid = response.data.error;
                    this.title = "สถานะเรื่องร้องเรียนของหมายเลข " + this.id_select;
                }).catch((err) => {
                    console.log(err);
                })
           },
           tubestatus: function(status){
               var backgroundcolor = "#ffffff";
               var width = "37.5%";
               if(status == 0){
                   width = "0%";
               }
               else if(status == 1){
                   backgroundcolor = ""
                   width = "37.5%";
               }
               else if(status == 2){
                   backgroundcolor = "#FFCC00"
                   width = "62.5%";
               }
               else if(status == 3){
                   backgroundcolor = "#6cc070"
                   width = "100%";
               }
               else if(status == 4){
                   backgroundcolor = "#df4759"
                   width = "62.5%";
               }
               return {"background-color" : backgroundcolor, "width" : width, "border-radius" : "4px"};
           },
            statusfont: function(status, index){
                var weight = "";
                var opacity = "1";
                if(status == index){
                    weight = "500";
                }
                else if(status == 4 && index == 2){
                    weight = "500";
                }
                else{
                    weight = "100";
                    opacity = "0.6";
                }
                return {weight : weight, opa: opacity}
            },
            extrafontstatus: function(status){
                if(status == 4){return "ระบบไม่สามารถดำเนินการได้"}
                else{return "ระบบกำลังดำเนินการ"}
            }
           }
        }
</script>

<style lang="css">
    body{
      background-color: #1a1819;
    }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
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
    #tracking_big_title{
        color: #E35205;
        font-family: 'Kanit', sans-serif;
        font-size: 35px;
        font-weight: 400;
        margin-top: 3.7%;
    }
    
    #all_select_tab{
        padding-left: 8%;
        padding-right: 8%;
        margin-top: 7%;
    }
    #select_by_type{
        background-color: #ffe9d1;
        border-radius: 30px;
        text-align: center;
    }
    #type_select{
        background-color: #FFA07A;
        border: none;
        border-radius: 30px;
        width: 60%;
        margin-left: 20%;
        margin-top: 7%;
        margin-bottom: 7%;
        color: #1a1819;
        font-family: 'Kanit', sans-serif;
        font-size: 18px;
    }
    #select_by_id{
        background-color: #ffe9d1;
        border-radius: 30px;
        text-align: center;
    }
    #id_select{
        background-color: #FFA07A;
        border-radius: 30px;
        width: 60%;
        margin-top: 7%;
        margin-left: 20%;
        margin-bottom: 7%;
        color: #1a1819;
        font-family: 'Kanit', sans-serif;
        font-size: 18px;
        -webkit-appearance: none;
    }
    #select_title{
        color: #E35205;
        font-family: 'Kanit', sans-serif;
        font-size: 30px;
        font-weight: 800;
        padding-top: 5%;
    }
    #select_button{
        background-color: #FFA07A;
        margin-bottom: 7%;
        border-radius: 30px;
        color: #1a1819;
        font-family: 'Kanit', sans-serif;
        font-size: 18px;
    }
    #error_massage{
        color: #E35205;
        font-family: 'Kanit', sans-serif;
        font-size: 18px;
        padding-top: 1%;
    }
    #reportform_description{
        color: #ffffff;
        font-family: 'Kanit', sans-serif;
        font-size: 18px;
        padding-bottom: 1%;
        padding-right: 5%;
        word-wrap: break-word;
    }
    #reportform_description_id{
        color: #ffffff;
        font-family: 'Kanit', sans-serif;
        font-size: 18px;
        padding-top: 5%;
    }
    #reportform_bar{
        color: #ffffff;
        font-family: 'Kanit', sans-serif;
        font-size: 13px;
        padding-bottom: 1%;
        padding-left: 5%;
    }

    #address{
        font-family: 'Kanit', sans-serif;
        font-size: 15px;
        font-weight: 200;
        color : #ffffff;
        margin-left: 30px;
        margin-bottom: 0em;
    }
    #footer {
        height: 60px;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #d86a03;
        color: white;
    }

    /* topnav_trackingstatus only login && reg */

    .topnav_trackingstatus{
        color:#fff;
        display:flex;
        justify-content: space-between;
    }
    .topnav_trackingstatus ul{
        display: flex;
        justify-content: space-around;
        padding-top: 10px;
        padding-right: 20px;  
    }
    .topnav_trackingstatus li{
        list-style: none;        
    }
    .topnav_trackingstatus #comp1 a{
        color: #fff;
        text-decoration: none;
        font-size: 20px;
        font-weight: 200;
        padding: 5px 12px;
    }
    .topnav_trackingstatus #comp1 a:hover{
        color: orange;
        text-decoration: none;
    }
    .topnav_trackingstatus #comp2 a{
        color: #fff;
        text-decoration: none;
        font-size: 20px;
        font-weight: 700;
        padding: 5px 12px;
    }
    .topnav_trackingstatus #comp2 a:hover{
        color: yellow;
        text-decoration: none;
    }

    .topnav_trackingstatus #comp3{
        color:white; 
        background-color:#e4af01;
        margin-right: 20px; 
        margin-left: 10px; 
    }

    .topnav_trackingstatus #comp3:hover{
        background-color:#f7d12b; 
    }

    .topnav_trackingstatus::before{
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

    .topnav_trackingstatus > * {
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