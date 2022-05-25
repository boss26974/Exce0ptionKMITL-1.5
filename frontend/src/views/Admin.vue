<template>
    <div>
        <!-- navbar -->
        <div class="banner" >
            <div class="topnav">
                <a href="/admin"><img src="/image/navbar/newlogo.png" width="110px" height="auto" style="padding-left: 20px;" alt=""></a>
                <ul>
                    <div id="MyClockDisplay" class="clock"></div>
                    <li id="comp1" v-if="currentAdmin.role_manage_admin_acc"><a href="/manageUser">Manage User</a></li>
                    <li id="comp1" v-if="currentAdmin.role_manage_admin_acc"><a href="/manageforum">Manage Forum</a></li>
                    <li id="comp1" v-if="currentAdmin.role_manage_admin_acc"><a href="/manageReport">Manage Report</a></li>
                    <div class="dropdown">
                        <button class="btn btn-danger  dropdown-toggle" id="comp3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-user-plus"></i> {{currentAdmin.name}}
                        </button>
                        <p class="dropdown-menu" >
                            <button class="dropdown-item text-danger" type="button" @click="modal_changepassword = true;">เปลี่ยนรหัสผ่าน</button>
                            <button class="dropdown-item text-danger" type="button" @click="logout()">ออกจากระบบ</button>
                        </p>
                    </div>
                </ul>
            </div>
            <div class="content">
                <span id="line-1">เคยไหม .....</span><br>
                <span id="line-2"><i>เคยไหม ร้องเรียนปัญหาไปแล้วเรื่องไม่ถึงปลายทาง?<br>
                เคยไหม ร้องเรียนปัญหาแล้วไม่ได้รับการแก้ไข?</i><br></span>
                <span id="line-3">มาร้องเรียนปัญหาผ่านทางเว็บไซต์เรา ปัญหาเหล่านั้นจะไม่เกิดขึ้นแน่นอน<br>
                และสามารถติดตามสถานะของเรื่องร้องเรียนนั้นได้ด้วยตนเอง!</span>
            </div>
            <div class="used">
                <a href="/reportform" id="apply">ร้องเรียนปัญหา</a>
                <a href="/trackingstatus" id="tracking">ติดตามสถานะ</a>
            </div>
        </div>

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

            <!-- modal change password -->
            <div class="modal" :class="{'is-active': modal_changepassword}">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head" style="background-color:#F2F4F4;">
                        <p class="modal-card-title mt-2">Change Password</p>
                        <button class="delete" aria-label="close" @click="resetmodal()"></button>
                    </header>
                    <section class="modal-card-body mx-2" style="background-color: #1C2833; color:white;">
                        <form v-on:submit.prevent="changepassword">
                            <div class="form-group">
                                <label for="currentPassword">Current Password</label>
                                <input type="password" id="currentPassword" class="form-control" v-model.trim.lazy="$v.currentPassword.$model" :class="{'is-invalid': validationStatusError($v.currentPassword), 'is-valid': !$v.currentPassword.$invalid }">
                                <a @click="togglePassword3()"><span class="fa fa-fw fa-eye field-icon toggle-password"></span></a>
                                <div class="invalid-feedback" style="margin-top:5px">
                                    <span v-if="!$v.currentPassword.required">กรุณากรอกยืนยันรหัสผ่านปัจจุบัน</span>
                                    <span v-else-if="!$v.currentPassword.minLength">Password ต้องไม่ต่ำกว่า 8 ตัว</span>
                                </div> 
                            </div>
                            <div class="form-group">
                                <label for="Newpassword">Your New Password</label>
                                <input type="password" id="Newpassword" class="form-control" v-model.trim.lazy="$v.Newpassword.$model" :class="{'is-invalid': validationStatusError($v.Newpassword), 'is-valid': !$v.Newpassword.$invalid }">
                                <a @click="togglePassword1()"><span class="fa fa-fw fa-eye field-icon toggle-password"></span></a>
                                <div class="invalid-feedback" style="margin-top:5px">
                                    <span v-if="!$v.Newpassword.required">กรุณากรอกรหัสผ่าน</span>
                                    <span v-else-if="!$v.Newpassword.minLength">Password ต้องไม่ต่ำกว่า 8 ตัว</span>
                                    <span v-else-if="!$v.Newpassword.maxLength">Password ต้องไม่เกิน 255 ตัว</span>
                                    <span v-else-if="!$v.Newpassword.complex">Password ง่ายเกินไป ควรมี A-Z หรือ a-z หรือ อักขระพิเศษ อย่างน้อย 1 ตัว</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="repeatNewpassword">Confirm Your New Password</label>
                                <input type="password" id="repeatNewpassword" class="form-control" v-model.trim.lazy="$v.RepeatNewpassword.$model" :class="{'is-invalid': validationStatusError($v.RepeatNewpassword), 'is-valid': (Newpassword != '') ? !$v.RepeatNewpassword.$invalid : '' }">
                                <a @click="togglePassword2()"><span class="fa fa-fw fa-eye field-icon toggle-password"></span></a>
                                <div class="invalid-feedback" style="margin-top:5px">
                                    <span v-if="!$v.RepeatNewpassword.required">กรุณากรอกรหัสผ่านอีกครั้ง</span>
                                    <span v-else-if="!$v.RepeatNewpassword.sameAspassword">Password ไม่ตรงกัน</span>
                                </div> 
                            </div>
                            <div class="form-group" style="float:right; margin-top:5px; padding-right:20px;">
                                <button type="submit" class="btn btn-danger mr-3" >Save Change</button>
                                <button type="button" class="button" @click="resetmodal()">Cancel</button>
                            </div>
                        </form>
                    </section>
                    <footer class="modal-card-foot" style="background-color:#F2F4F4;">
                        <!-- babababa -->
                    </footer>
                </div>
            </div>

        <!-- footer -->

        <footer>
            <div class="row">
                <div class="col-md-5">
                    <div class="copyright text-white" style="font-weight: 200;"> 
                        King Mongkut's Institute of technology Ladkrabang<br>
                        1Chalong Krung 1 Alley, Lat Krabang Bangkok 10520<br>
                        02 723 4900
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="copyright" style="padding-top: 20px; color: #aaa;">
                        Copyright &copy; 2021 ExptionKMITL
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import { required,  maxLength, minLength, sameAs } from 'vuelidate/lib/validators';
import Cookies from "js-cookie"
import { CURRENT_ADMIN_QUERY, CHANGE_PASSWORD_MUTATION, FORUMS_QUERY } from "../graphql"

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
    data(){
        return{
            permission: null,
            tokenAdmin: null,
            tokenUserError: null,
            // change password
            modal_changepassword: false,
            Newpassword: '',
            RepeatNewpassword: '',
            currentPassword: '',
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
        currentAdmin: {
            query: CURRENT_ADMIN_QUERY
        },
        Forums: {
            query: FORUMS_QUERY
        }
    },
    validations:{
        Newpassword:{
            required,
            complex: complexPassword,
            minLength: minLength(8),
            maxLength: maxLength(255)
        },
        RepeatNewpassword:{
            required,
            sameAspassword: sameAs('Newpassword')
        },
        currentPassword:{
            required,
            minLength: minLength(8),
        }
    },
    created(){
        this.tokenAdmin = Cookies.get("tokenAdmin")
        this.tokenUserError = Cookies.get("tokenUser")
        if(this.tokenAdmin) {
            this.permission = "for admin"
        }
        else if(this.tokenUserError) {
            this.$swal({
                icon: 'warning',
                title: "You can't access the admin, you are the user.! hahaha.",
                showConfirmButton: true,
            })
            this.$router.push({ name: "User" });
        }
        else{
            this.$swal({
                icon: 'warning',
                title: "กรุณาล็อกอินก่อนเข้าใช้งาน",
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
            this.$router.push({ name: "Home" });
        },
        validationStatusError(validation){
            return typeof validation != "undefined" ? validation.$error : false;
        },
        togglePassword1(){
          var x = document.getElementById("Newpassword");
            if (x.type === "password") {
                x.type = "text";
            }
            else{
                x.type = "password";
            }
        },
        togglePassword2(){
          var x = document.getElementById("repeatNewpassword");
            if (x.type === "password") {
                x.type = "text";
            }
            else{
                x.type = "password";
            }
        },
        togglePassword3(){
          var x = document.getElementById("currentPassword");
            if (x.type === "password") {
                x.type = "text";
            }
            else{
                x.type = "password";
            }
        },
        resetmodal(){
            this.modal_changepassword = false;
            this.$v.$reset();
            this.Newpassword = ''
            this.RepeatNewpassword = ''
            this.currentPassword = ''
        },
        changepassword(){
            this.$v.$touch();
            if( this.$v.$pendding || this.$v.$error ) return;
            this.$apollo.mutate({
                mutation: CHANGE_PASSWORD_MUTATION,
                variables: {
                    _id: this.currentAdmin._id,
                    old_password: this.currentPassword,
                    new_password: this.Newpassword
                }
            }).then((res) => {
                if(res.data.changePassword.status == "Success"){
                    this.resetmodal()
                    this.$swal({
                        icon: 'success',
                        title: 'เปลี่ยนรหัสผ่านสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                else{
                    this.resetmodal()
                    this.$swal({
                        icon: 'warning',
                        title: 'รหัสผ่านปัจจุบันไม่ถูกต้อง',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            })
        },
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
        Cookies.set("page", "/admin")
    },
    }
}
</script>

<style scoped>

    /* footer */

    #A{
        color : red;
        opacity: 1 !important;
    }

    footer {
        position: relative;
        background-color: #963306;
        padding: 10px 0px 10px 30px;
    }

    .fa-user-plus{
        color:rgb(0, 0, 200);
    }

    .dropdown-menu a{
        text-decoration: none;
    }
    .field-icon {
        float: right;
        margin-right: 30px;
        margin-top: -26px;
        position: relative;
        z-index: 2;
        color:black;
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