<template lang="en">
    <body>
    <div class="banner" >
      <div class="topnav_forum">
        <a :href="`${permissionPath}`"><img src="/image/navbar/newlogo.png" width="110px" height="auto" style="padding-left: 20px;" alt=""></a>
          <ul>
            <div id="MyClockDisplay" class="clock"></div>
            <li id="comp1" v-if="manage_acc == 1"><a href="/manageUser">Manage User</a></li>
            <li id="comp1" v-if="manage_standand == 1"><a href="/manageforum">Manage Forum</a></li>
            <li id="comp1" v-if="manage_standand == 1"><a href="/manageReport">Manage Report</a></li>
            <template v-if="!currentUser">
              <li id="comp2"><a href="/login">Log In</a></li>
              <div class="line"></div>
              <li id="comp2"><a href="/register">Register</a></li>
            </template>
            <div class="dropdown" v-if="currentUser">
              <a :href="`${permissionPath}`" style="text-decoration: none;" v-show="role == 'User'"><button type="button" class="home btn btn-outline-light">Home</button></a>
              <button class="btn btn-danger  dropdown-toggle" id="comp3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i :class="{'fa fa-user-plus': role == 'Admin', 'fa fa-user': role == 'User'}"></i> {{currentUser.studentid}}
              </button>
              <p class="dropdown-menu" >
                <button class="dropdown-item text-danger" type="button" @click="logout()">ออกจากระบบ</button>
              </p>
            </div>
        </ul>
      </div>
    </div>
    <div id="favorite_arc" class="container-fluid">
        <p id="favorite_arc_title">ข่าวประชาสัมพันธ์</p>
        <div id="all_favorite_arc" class="row">
            <div class="col-3" style="margin-bottom: 32px;" v-for="forum in Forums" @click="forumpage(forum._id)" v-if="Forums">
                <div id="favorite_arc_card" class="card">
                    <img id="favorite_arc_card_image" class="card-img-top" :src="forum.image_path">
                    <div id="favorite_arc_card_body" :style="{'border-top-color' : forumcolor(forum.type)}" class="card-body">
                      <div id="favorite_arc_card_type_box" :style="{'background-color': forumcolor(forum.type)}">{{forumtype(forum.type)}}</div>
                      <p id="favorite_arc_card_text" class="card-text">{{forum.topic}}</p>
                    </div>
                </div>
            </div>
            <center><p id="favorite_arc_title" v-if="!Forums">ไม่มีข่าวประชาสัมพันธ์ใดๆ</p></center>
        </div>
    </div>
    <footer>
        <div id="footer_homepage">
            <p id="address">King Mongkut's Institute of Technology Ladkrabang</p>
            <p id="address">1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520</p>
            <p id="address">02 723 4900</p>
        </div>
    </footer>
    </body>
</template>

<script>
import Cookies from "js-cookie"
import { CURRENT_USER_QUERY, FORUMS_QUERY } from "../graphql"
export default {
  data() {
    return {
      tokenUser: null,
      tokenAdmin: null,
      role: null,
      currentUser: null,
      manage_acc: null,
      manage_standand: null,
      permissionPath: null,
      // forums
      Forums: null,
      typecolor: {
        education: "#E35205",
        sociality: "#6BDCA8",
        environment: "#F5B406",
        register: "#DA8DFB",
        scholarship: "#3FAAF6",
      },
    };
  },
  apollo: {
    currentUser: {
      query: CURRENT_USER_QUERY
    },
    Forums: {
      query: FORUMS_QUERY
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
            this.permissionPath = "/"
            Cookies.remove("tokenUser")
            Cookies.remove("tokenAdmin")
        }
  },
  methods: {
    forumcolor: function (type) {
      if (type == "studying") {
        return this.typecolor.education;
      } else if (type == "sociality") {
        return this.typecolor.sociality;
      } else if (type == "environment") {
        return this.typecolor.environment;
      } else if (type == "register_system") {
        return this.typecolor.register;
      } else if (type == "scholarship") {
        return this.typecolor.scholarship;
      }
    },
    forumtype: function (type) {
      if (type == "sociality") {
        return "สภาพสังคม";
      } else if (type == "studying") {
        return "การศึกษา";
      } else if (type == "scholarship") {
        return "ทุนการศึกษา";
      } else if (type == "register_system") {
        return "การลงทะเบียน";
      } else if (type == "environment") {
        return "สภาพแวดล้อม";
      }
    },
    forumpage: function(id){
        window.location.href = "/forum/page";
        Cookies.set("forum_id", "" + id)
        Cookies.set("page", "/forum")
    },
    logout(){
      this.id = ''
      Cookies.remove("tokenUser")
      Cookies.remove("tokenAdmin")
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="css">
  body {
    background-color: #1a1819;
  }
  #navbar_homepage {
    background-color: rgb(150, 54, 3);
    height: 12%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  #logo_navbar {
    margin-left: 3%;
    margin-top: -3%;
    width: 20%;
    height: 10%;
  }

  #navbar_manage {
    font-family: "Kanit", sans-serif;
    text-decoration: none;
    color: #ffffff;
    font-size: 20px;
    font-weight: 200;
    margin-right: 40px;
  }

  #navbar_register {
    font-family: "Kanit", sans-serif;
    text-decoration: none;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
  }

  #line_register {
    width: 0px;
    border-left: 2px solid #ffffff;
    height: 39px;
    display: inline;
    margin-left: 10px;
    margin-right: 10px;
  }
  #favorite_arc {
    margin-top: 0px;
    margin-bottom: 38px;
    padding-right: 8%;
    padding-left: 8%;
  }

  #favorite_arc_title {
    color: #e35205;
    font-family: "Kanit", sans-serif;
    font-size: 35px;
    font-weight: 700;
    padding-top: 70px;
  }

  #all_favorite_arc {
    margin-top: 50px;
  }

  #favorite_arc_card {
    width: 295px;
    height: 445px;
    border-radius: 15px;
    margin-right: 80px;
  }

  #favorite_arc_card:hover{
      opacity: 0.8;
  }

  #favorite_arc_card_image {
    height: 253px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  #favorite_arc_card_body {
    position: relative;
    border-top: 4px solid;
  }

  #favorite_arc_card_type_box {
    position: absolute;
    top: -15.075px;
    width: 108.76px;
    height: 30.15px;
    border-radius: 10px;
    font-family: "Kanit", sans-serif;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
  }

  #favorite_arc_card_text {
    padding-top: 25px;
    font-family: "Kanit", sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #1a1819;
  }
  #footer_homepage {
    width: 100%;
    height: 78px;
    background-color: #e35205;
  }

  #address {
    font-family: "Kanit", sans-serif;
    font-size: 15px;
    font-weight: 200;
    color: #ffffff;
    margin-left: 30px;
    margin-bottom: 0em;
  }

  #footer_button {
    width: 119px;
    height: 46px;
    border-radius: 10px;
    background-color: #ffffff;
    font-family: "Kanit", sans-serif;
    font-size: 24px;
    font-weight: 500;
    float: right;
    text-align: center;
    margin-top: 16px;
    margin-right: 30px;
    color: #1a1819;
  }
  .fa-user-plus{
      color:rgb(0, 0, 200);
  }

  /* topnav_forum only login && reg */

  .topnav_forum{
      color:#fff;
      display:flex;
      justify-content: space-between;
  }
  .topnav_forum ul{
      display: flex;
      justify-content: space-around;
      padding-top: 10px;
      padding-right: 20px;  
  }
  .topnav_forum li{
      list-style: none;        
  }
  .topnav_forum #comp1 a{
      color: #fff;
      text-decoration: none;
      font-size: 20px;
      font-weight: 200;
      padding: 5px 12px;
  }
  .topnav_forum #comp1 a:hover{
      color: orange;
      text-decoration: none;
  }
  .topnav_forum #comp2 a{
      color: #fff;
      text-decoration: none;
      font-size: 20px;
      font-weight: 700;
      padding: 5px 12px;
  }
  .topnav_forum #comp2 a:hover{
      color: yellow;
      text-decoration: none;
  }

  .topnav_forum #comp3{
      color:white; 
      background-color:#e4af01;
      margin-right: 20px; 
      margin-left: 10px; 
  }

  .topnav_forum #comp3:hover{
      background-color:#f7d12b; 
  }

  .topnav_forum::before{
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
  .topnav_forum > * {
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