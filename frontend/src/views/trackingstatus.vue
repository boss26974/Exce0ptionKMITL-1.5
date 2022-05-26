<template>
    <body>
        <div class="banner" >
            <div class="topnav_trackingstatus">
                <a :href="`${permissionPath}`"><img src="/image/navbar/newlogo.png" width="110px" height="auto" style="padding-left: 20px;" alt=""></a>
                <ul>
                    <div id="MyClockDisplay" class="clock"></div>
                    <li id="comp1" v-if="currentAdmin"><a href="/manageUser">Manage User</a></li>
                    <li id="comp1" v-if="currentAdmin"><a href="/manageforum">Manage Forum</a></li>
                    <li id="comp1" v-if="currentAdmin"><a href="/manageReport">Manage Report</a></li>
                    <template v-if="!currentUser && !currentAdmin">
                        <li id="comp2"><a href="/login">Log In</a></li>
                        <div class="line"></div>
                        <li id="comp2"><a href="/register">Register</a></li>
                    </template>
                    <div class="dropdown" v-if="currentUser || currentAdmin">
                        <a :href="`${permissionPath}`" style="text-decoration: none;" v-show="role == 'User'"><button type="button" class="home btn btn-outline-light">Home</button></a>
                        <button v-if="currentUser" class="btn btn-danger  dropdown-toggle" id="comp3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class='fa fa-user'></i> {{currentUser.studentid}}
                        </button>
                        <button v-if="currentAdmin" class="btn btn-danger  dropdown-toggle" id="comp3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class='fa fa-user-plus'></i> {{currentAdmin.name}}
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
                <div class="offset-3 col-6" id="select_by_type">
                    <p id="select_title">เลือกหมวดหมู่ร้องเรียน</p>
                    <select id="type_select" class="form-control" v-model="type_select">
                        <option value="all">ทุกหมวดหมู่</option>
                        <option value="sociality">สภาพสังคม</option>
                        <option value="studying">การศึกษา</option>
                        <option value="scholarship">ทุนการศึกษา</option>
                        <option value="register_system">การลงทะเบียนเรียน</option>
                        <option value="environment">สภาพแวดล้อม</option>
                    </select>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="onlyself_check" id="self-checkbox">
                        <label class="form-check-label" for="self-checkbox">แสดงเฉพาะคำร้องเรียนของคุณ</label>
                    </div>
                    <button id="select_button" class='btn' @click="getreportform()">ตรวจสอบ</button>
                </div>
            </div>
        </div>
        <center><p id="tracking_big_title" style="font-size: 24px;">รวมเรื่องร้องเรียน{{title}}</p></center>
        <center><p id="tracking_big_title" style="font-size: 24px;">ผลการค้นหา : {{Reports.length}}</p></center>
        <div id="all_select_tab" class="container-fluid">
            <section v-if="Reports.length != 0"><div class="row" v-for="reportform in Reports" :key="reportform._id" style="margin-bottom: 7%;">
                <div class="col-5" id="reportform_description">
                    <p><span id="text-head">หัวข้อเรื่องร้องเรียน :</span> {{reportform.topic}}</p>
                    <p><span id="text-head">เนื้อหาเรื่องร้องเรียน :</span> {{reportform.description}}</p>
                    <p><span id="text-head">สถานะ :</span> {{thaiStatus(reportform.submission_status)}}</p>
                    <p><span id="text-head">ประเภทเรื่องร้องเรียน :</span> {{thaiType(reportform.type)}}</p>
                </div>
                <div class="col-7" id="reportform_bar">
                    <div class="row">
                        <div class="col-12" style="margin-bottom : 3%;">
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" :style="tubestatus(reportform.submission_status)" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="col-3" style="text-align: center">
                            <i :style="{'font-weight': statusfont(reportform.submission_status, 'Received').weight}">ระบบได้รับเรื่องแล้ว</i>
                        </div>
                        <div class="col-3" style="text-align: center">
                            <i :style="{'font-weight': statusfont(reportform.submission_status, 'In_Progress').weight}">ระบบกำลังตรวจสอบ</i>
                        </div>
                        <div class="col-3" style="text-align: center">
                            <i :style="{'font-weight': statusfont(reportform.submission_status, 'Accepted').weight}">{{extrafontstatus(reportform.submission_status)}}</i>
                        </div>
                        <div class="col-3" style="text-align: center">
                            <i :style="{'font-weight': statusfont(reportform.submission_status, 'Completed').weight}">ระบบดำเนินการสำเร็จ</i>
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
import { CURRENT_USER_QUERY, REPORTS_FROM_TYPE_QUERY, CURRENT_ADMIN_QUERY } from "../graphql"
import Cookies from "js-cookie"
export default {
        data() {
            return{
                tokenUser: null,
                tokenAdmin: null,
                role: null,
                permissionPath: null,
                currentUser: null,
                currentAdmin: null,
                // trackingstatus
                Reports: [],
                type_select: "all",
                onlyself_check: false,
                title: "",
            }
        },
        apollo: {
        currentUser: {
            query: CURRENT_USER_QUERY
        },
        currentAdmin: {
            query: CURRENT_ADMIN_QUERY
        },
        Reports: {
            query: REPORTS_FROM_TYPE_QUERY,
        }
    },
        created(){
            this.tokenUser = Cookies.get('tokenUser')
            this.tokenAdmin = Cookies.get('tokenAdmin')
            if(this.tokenUser) {
            this.role = "User"
            this.permissionPath = "/user"
        }
        else if(this.tokenAdmin) {
            this.role = "Admin"
            this.permissionPath = "/admin"
        }
        else{
            this.$swal({
                icon: 'warning',
                title: 'กรุณาล็อกอินก่อนเข้าใช้งาน',
                showConfirmButton: true,
            })
            Cookies.remove("tokenUser")
            Cookies.remove("tokenAdmin")
            this.$router.push({ name: "Home" });
        }
        },
        methods:{
            logout(){
                Cookies.remove("tokenUser")
                Cookies.remove("tokenAdmin")
                console.log('Log out!')
                this.$router.push({ name: "Home" });
            },
           getreportform: function(){
               let use_id = null

               if(this.currentUser){
                   use_id = this.currentUser._id
               }
               else if(this.currentAdmin){
                   use_id = this.currentAdmin._id
               }
               
               if(this.type_select == "all" && !this.onlyself_check){
                   this.$apollo.queries.Reports.refetch()
                   .then(() => {
                       this.thaiTitle()
                   })
                }
                else if(this.type_select == "all" && this.onlyself_check){
                    this.$apollo.queries.Reports.refetch({
                        filter: {
                            complainer_id: use_id
                        }
                    })
                   .then(() => {
                       this.thaiTitle()
                   })
                }
               else if(this.type_select != "all" && !this.onlyself_check){
                   this.$apollo.queries.Reports.refetch({
                    filter: {
                        type: this.type_select
                    }
                    }).then(() => {
                        this.thaiTitle()
                    })
               }
               else if(this.type_select != "all" && this.onlyself_check){
                   this.$apollo.queries.Reports.refetch({
                    filter: {
                        type: this.type_select,
                        complainer_id: use_id
                    }
                    }).then(() => {
                        this.thaiTitle()
                    })
               }
            },
           tubestatus: function(status){
               var backgroundcolor = "#ffffff";
               var width = "0%";
               if(status == "Received"){
                   width = "0%";
               }
               else if(status == "In_Progress"){
                   backgroundcolor = "#FFCC00"
                   width = "37.5%";
               }
               else if(status == "Accepted"){
                   backgroundcolor = "#7FFFD4"
                   width = "62.5%";
               }
               else if(status == "Completed"){
                   backgroundcolor = "#6cc070"
                   width = "100%";
               }
               else if(status == "Declined"){
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
                else if(status == "Declined" && index == "Accepted"){
                    weight = "500";
                }
                else{
                    weight = "100";
                    opacity = "0.6";
                }
                return {weight : weight, opa: opacity}
            },
            extrafontstatus: function(status){
                if(status == "Declined"){return "ระบบไม่สามารถดำเนินการได้"}
                else{return "ระบบกำลังดำเนินการ"}
            },
            thaiStatus: function(status){
                if(status == "Received"){
                    status = "ได้รับเรื่องแล้ว"
                }
                else if(status  == "In_Progress"){
                    status = "กำลังตรวจสอบ"
                }
                else if(status   == "Declined"){
                    status  = "ไม่สามารถดำเนินการได้"
                }
                else if(status   == "Accepted"){
                    status  = "กำลังดำเนินการ"
                }
                else if(status   == "Completed"){
                    status  = "ดำเนินการสำเร็จ"
                }
                return status
            },
            thaiType: function(type){
                if(type == "sociality"){
                    type = "สภาพสังคม"
                }
                else if(type == "studying"){
                    type = "การศึกษา"
                }
                else if(type  == "scholarship"){
                    type  = "ทุนการศึกษา"
                }
                else if(type  == "register_system"){
                    type  = "การลงทะเบียนเรียน"
                }
                else if(type  == "environment"){
                    type  = "สภาพแวดล้อม"
                }
                return type
            },
            thaiTitle: function(){
                if(this.type_select == "sociality"){
                    this.title = "เกี่ยวกับสภาพสังคม"
                }
                if(this.type_select == "studying"){
                    this.title = "เกี่ยวกับการศึกษา"
                }
                if(this.type_select == "scholarship"){
                    this.title = "เกี่ยวกับทุนการศึกษา"
                }
                if(this.type_select == "register_system"){
                    this.title = "เกี่ยวกับการลงทะเบียนเรียน"
                }
                if(this.type_select == "environment"){
                    this.title = "เกี่ยวกับสภาพแวดล้อม"
                }
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
        margin-top: 4%;
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
    #text-head{
        font-weight: 400;
        color:rgb(200, 150, 20);
    }
</style>