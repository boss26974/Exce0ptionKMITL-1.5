<template>
    <div>
        <!-- navbar -->
        <navbarHome></navbarHome>

        <!-- card content -->

            <div class="container" style="padding-bottom: 20px;">

                <!-- card header -->

                <div class="row">
                    <div class="col-md-10" id="article">
                        <p><a href="">บทความยอดนิยม<br><br></a></p>
                    </div>
                    <div class="col-md-2" id="news" style="text-align: right;">
                        <p><a href="/forum"><br><i>ดูข่าวประชาสัมพันธ์</i><br></a></p>
                    </div>
                </div>

                <!-- card row 1 -->
                <div id="favorite_arc" class="container-fluid" v-if="Forums">
                    <div id="all_favorite_arc" class="row">
                        <div class="col-3" style="margin-bottom: 32px;" v-for="forum in Forums" :key="forum._id" @click="forumpage(forum._id)">
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

                <!-- card row 2 -->

                <!-- Problem -->

                <div class="row">
                    <div class="col-md-10" id="problem">
                        <p><a href=""><br>ปัญหาที่พบบ่อย<br></a></p>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-4">
                        <p><a href=""><br><span>01<br>การแจ้งขอทุนการศึกษาล่าช้า</span><br><br></a></p>
                    </div>
                    <div class="col-md-4">
                        <p><a href=""><br><span>02<br>ติดโปร (Probation) ต้องทำยังไง</span><br><br></a></p>
                    </div>
                    <div class="col-md-4">
                        <p><a href=""><br><span>03<br>วิชาเลือกที่แนะนำมีอะไรบ้าง</span><br><br></a></p>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-4">
                        <p><a href=""><br><span>04<br>ห้องน้ำ IT สะอาดเกินไป</span><br><br></a></p>
                    </div>
                    <div class="col-md-4">
                        <p><a href=""><br><span>05<br>เสียงก่อสร้างรบกวนการเรียนครับ</span><br><br></a></p>
                    </div>
                    <div class="col-md-4">
                        <p><a href=""><br><span>06<br>ผมขอ <span id="A">A</span> Webpro เถอะครับ</span><br><br></a></p>
                    </div>
                </div>
            </div>

        <!-- footer -->
        <footer>
            <div class="row">
                <div class="col-md-6">
                    <div class="copyright text-white" style="font-weight: 200;"> 
                        King Mongkut's Institute of technology Ladkrabang<br>
                        1Chalong Krung 1 Alley, Lat Krabang Bangkok 10520<br>
                        02 723 4900
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="copyright" style="padding: 20px; color: #aaa; float:right;">
                        Copyright &copy; 2021 ExptionKMITL
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import navbarHome from '../components/navbarHome.vue'
import Cookies from "js-cookie"
import { time } from "../router/time"
import { FORUMS_QUERY} from "../graphql"
export default {
    data(){
        return{
            Forums: null,
            typecolor: {
                education: "#E35205",
                sociality: "#6BDCA8",
                environment: "#F5B406",
                register: "#DA8DFB",
                scholarship: "#3FAAF6",
            },
        }
    },
    apollo: {
        Forums: {
            query: FORUMS_QUERY,
            variables: {
                limit: 8
            }
        }
    },
    components: {
        navbarHome
    },
    beforeCreate(){
        time
    },
    created(){
        localStorage.removeItem('tokenAdmin')
        localStorage.removeItem('tokenUser')
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
        Cookies.set("page", "/")
    },
    },
}
</script>

<style scoped>
/* footer */

#A{
    color : red;
    opacity: 1 !important;
}

footer {
    background-color: #963306;
    padding: 10px 0px 10px 30px;
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

</style>