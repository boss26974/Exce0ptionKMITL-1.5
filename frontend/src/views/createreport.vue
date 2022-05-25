<template>
    <div>
    <div class="banner" >
      <div class="topnav_createreport">
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
                <a href="/reportform" style="text-decoration: none;" v-show="role == 'User'"><button type="button" class="home btn btn-outline-light">Back Reportform</button></a>
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
    <p id="createreport_big_title">แบบฟอร์มร้องเรียน</p>
    <div class="container" id="all_report" :style="{'background-color' : backcolor}">
        <div class="row">
            <div class="col-12">
                <div class="form-group">
                    <label for="report_topic">หัวข้อเรื่องร้องเรียน</label>
                    <input type="text" v-model="$v.topic.$model"  class="form-control" :class="{'is-invalid' : $v.topic.$error}" id="report_topic" aria-describedby="reporttopichelp" placeholder="ใส่หัวข้อเรื่องร้องเรียน">
                    <template v-if="$v.topic.$error">
                        <p id="error-message" v-if="!$v.topic.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                        <p id="error-message" v-if="!$v.topic.minLength">*ความยาวหัวข้อที่ตั้งต้องไม่ต่ำกว่า 10 ตัวอักษร</p>
                        <p id="error-message" v-if="!$v.topic.maxLength">*ความยาวหัวข้อต้องมีความยาวไม่เกิน 255 ตัวอักษร</p>
                    </template>
                </div>
                <div class="form-group">
                    <label for="report_topic">คำอธิบาย</label>
                    <textarea class="form-control" v-model="$v.description.$model" :class="{'is-invalid' : $v.description.$error}" id="report_description" rows="5" aria-describedby="reporttopichelp" placeholder="ใส่คำอธิบาย"></textarea>
                    <template v-if="$v.description.$error">
                        <p id="error-message" v-if="!$v.description.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                        <p id="error-message" v-if="!$v.description.minLength">*คำอธิบายควรมีความยาวไม่ต่ำกว่า 50 ตัวอักษร</p>
                    </template>
                </div>
                 <div class="form-group" v-if="type == 'sociality'">
                    <label for="report_topic">สถานที่ซึ่งต้องการร้องเรียน</label>
                    <input v-model="$v.sociality_location.$model" type="text" class="form-control" :class="{'is-invalid' : $v.sociality_location.$error}" id="report_topic" placeholder="ใส่สถานที่">
                    <template v-if="$v.sociality_location.$error">
                        <p id="error-message" v-if="!$v.sociality_location.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                        <p id="error-message" v-if="!$v.sociality_location.minLength">ชื่อสถานที่ควรมีความยาวไม่ต่ำกว่า 5 ตัวอักษร</p>
                        <p id="error-message" v-if="!$v.sociality_location.maxLength">*ชื่อสถานที่ต้องมีความยาวไม่เกิน 255 ตัวอักษร</p>
                    </template>
                </div>
                <div class="form-group" v-if="type == 'studying'">
                    <label for="report_topic">รหัสของรายวิชาที่ต้องการร้องเรียน</label>
                    <input v-model="$v.education_subject_id.$model" type="text" class="form-control" :class="{'is-invalid' : $v.education_subject_id.$error}" id="report_topic" aria-describedby="reporttopichelp" placeholder="ใส่รหัสวิชา">
                    <template v-if="$v.education_subject_id.$error">
                        <p id="error-message" v-if="!$v.education_subject_id.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                        <p id="error-message" v-if="!$v.education_subject_id.numeric">*กรุณาใส่เป็นตัวเลขเท่านั้น</p>
                        <p id="error-message" v-if="!($v.education_subject_id.minLength && $v.education_subject_id.maxLength)">*รหัสวิชาต้องเป็นตัวเลข 8 หลักเท่านั้น</p>
                    </template>
                </div>
                <div class="form-group" aria-describedby="reporthelp" v-if="type == 'scholarship'">
                    <label for="report_topic">เลือกประเภททุนการศึกษา</label>
                    <select class="form-control" v-model="$v.scholarship_type.$model" :class="{'is-invalid' : $v.scholarship_type.$error}">
                        <option>ทุนอุดหนุนการศึกษาประภท ก</option>
                        <option>ทุนอุดหนุนการศึกษาประภท ข</option>
                        <option>ทุนเรียนดี</option>
                        <option>ทุนผู้ทำคุณประโยชน์ให้แก่สถาบัน</option>
                        <option>ทุนผู้สร้างชื่อเสียงในนามสถาบัน</option>
                        <option>ทุนให้ยืมเพื่อการศึกษาในกรณีฉุกเฉิน</option>
                        <option>ทุนสนับสนุนนักศึกษาในภาวะวิกฤต</option>
                        <option>ทุนสนับสนุนการนำเสนอผลงานทางวิชาการ</option>
                        <option>ทุนสนับสนุนการแลกเปลี่ยนและฝึกงานต่างประเทศ</option>
                        <option>ทุนช่วยเหลือนักศึกษาในสถานการณ์การแพร่ระบาดของโรค COVID 19</option>
                        <option>อื่นๆ</option>
                    </select>
                    <template v-if="$v.scholarship_type.$error">
                        <p id="error-message" v-if="!$v.scholarship_type.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                        <p id="error-message" v-if="!$v.scholarship_type.not_in">*คุณไม่สามารถใส่ข้อมูลนอกเหนือจากในข้อมูลที่เรามีให้ได้</p>
                    </template>
                </div>
                <div class="form-group" v-if="type == 'register_system'">
                    <label for="report_topic">รหัสของรายวิชาที่ต้องการร้องเรียน</label>
                    <input v-model="$v.register_subject.$model" type="text" class="form-control" :class="{'is-invalid' : $v.register_subject.$error}" id="report_topic" aria-describedby="reporttopichelp" placeholder="ใส่ชื่อของรายวิชา">
                    <template v-if="$v.register_subject.$error">
                        <p id="error-message" v-if="!$v.register_subject.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                        <p id="error-message" v-if="!$v.register_subject.numeric">*กรุณาใส่เป็นตัวเลขเท่านั้น</p>
                        <p id="error-message" v-if="!($v.register_subject.minLength && $v.register_subject.maxLength)">*รหัสวิชาต้องเป็นตัวเลข 8 หลักเท่านั้น</p>
                    </template>
                </div>
                <div class="form-group" v-if="type == 'environment'">
                    <label for="report_topic">สถานที่ซึ่งต้องการร้องเรียน</label>
                    <input v-model="$v.environment_location.$model" type="text" class="form-control" :class="{'is-invalid' : $v.environment_location.$error}" id="report_topic" aria-describedby="reporttopichelp" placeholder="ใส่สถานที่">
                    <template v-if="$v.environment_location.$error">
                        <p id="error-message" v-if="!$v.environment_location.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                        <p id="error-message" v-if="!$v.environment_location.minLength">*ชื่อสถานที่ควรมีความยาวไม่ต่ำกว่า 5 ตัวอักษร</p>
                        <p id="error-message" v-if="!$v.environment_location.maxLength">*ชื่อสถานที่ต้องมีความยาวไม่เกิน 255 ตัวอักษร</p>
                    </template>
                </div>
                <div class="form-group">
                    <label for="report_topic">เลือกเงื่อนไขในการร้องเรียน</label>
                    <select class="form-control" v-model="$v.send_status.$model" :class="{'is-invalid' : $v.send_status.$error}">
                        <option value="Not_Urgent">ไม่ด่วน</option>
                        <option value="Urgent">ด่วน</option>
                    </select>
                    <template v-if="$v.send_status.$error">
                        <p id="error-message" v-if="!$v.send_status.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                        <p id="error-message" v-if="!$v.send_status.not_in">*ท่านเลือกได้แค่ด่วน/ไม่ด่วนเท่านั้น</p>
                    </template>
                </div>
                <button id="btn_submit" type="submit" class="btn btn-primary" @click="submit()">Submit</button>
            </div>
        </div>
    </div>
    <footer style="margin-top:140px">
        <div id="footer_homepage">
            <p id="address">King Mongkut's Institute of Technology Ladkrabang</p>
            <p id="address">1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520</p>
            <p id="address">02 723 4900</p>
        </div>
    </footer>
    </div>
</template>

<script>
import Cookies from "js-cookie"
import {required, numeric, minLength, maxLength} from 'vuelidate/lib/validators'
import { CURRENT_USER_QUERY, CREATE_REPORT_MUTATION, CURRENT_ADMIN_QUERY } from "../graphql"

const checkScholarshipType = (value) => {
    let allscholarship = ["ทุนอุดหนุนการศึกษาประภท ก", "ทุนอุดหนุนการศึกษาประภท ข", "ทุนเรียนดี", "ทุนผู้ทำคุณประโยชน์ให้แก่สถาบัน",
    "ทุนผู้สร้างชื่อเสียงในนามสถาบัน", "ทุนให้ยืมเพื่อการศึกษาในกรณีฉุกเฉิน", "ทุนสนับสนุนนักศึกษาในภาวะวิกฤต", "ทุนสนับสนุนการนำเสนอผลงานทางวิชาการ",
    "ทุนสนับสนุนการแลกเปลี่ยนและฝึกงานต่างประเทศ", "ทุนช่วยเหลือนักศึกษาในสถานการณ์การแพร่ระบาดของโรค COVID 19", "อื่นๆ"
    ]
    if(typeof(allscholarship.find(element => element == value)) == "string"){
        return true;
    }
    return false;
}

    export default {
        data() {
            return{
                tokenUser: null,
                tokenAdmin: null,
                role: null,
                currentUser: null,
                currentAdmin: null,
                permissionPath: null,
                // createreport
                backcolor: "#ffffff",
                type: null,
                topic: "",
                description: "",
                send_status: "",
                sociality_location: "",
                education_subject_id: null,
                scholarship_type: "",
                register_subject: "",
                environment_location: ""
            }
        },
        apollo: {
            currentUser: {
                query: CURRENT_USER_QUERY
            },
            currentAdmin: {
                query: CURRENT_ADMIN_QUERY
            }
        },
        created () {
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
            this.backcolor = localStorage.getItem("color");
            this.type = localStorage.getItem("type");
            console.log(localStorage.getItem("color"));
        },
        methods: {
            logout(){
                Cookies.remove("tokenUser")
                Cookies.remove("tokenAdmin")
                console.log('Log out!')
                this.$router.push({ name: "Home" });
            },
            submit() {
                this.$v.$touch();
                const basicinput = (!this.$v.topic.$error && !this.$v.description.$error && !this.$v.send_status.$error)
                let use_id = null
                if(this.currentUser){use_id = this.currentUser._id}
                if(this.currentAdmin){use_id = this.currentAdmin._id}
                let data = {
                    "topic" : this.topic,
                    "type" : this.type,
                    "description" : this.description,
                    "condition_of_submission" : this.send_status,
                    "complainer_id" : use_id
                }
                if(!this.$v.sociality_location.$error && basicinput) {
                    data["target"] = this.sociality_location
                }
                else if(!this.$v.education_subject_id.$error && basicinput) {
                    data["target"] = this.education_subject_id
                }
                else if(!this.$v.scholarship_type.$error && basicinput) { 
                    data["target"] = this.scholarship_type
                }
                else if(!this.$v.register_subject.$error && basicinput) { 
                    data["target"] = this.register_subject
                }
                else if(!this.$v.environment_location.$error && basicinput) {
                    data["target"] = this.environment_location
                }
                else{
                    this.$v.$touch();
                }
                    console.log(data)
                    this.$apollo.mutate({
                        mutation : CREATE_REPORT_MUTATION,
                        variables : {
                            "record" : data
                        }
                    }).then((res) => {
                        console.log(res)
                        this.$router.push({name: 'Reportform'})
                        this.$swal({
                            title: "ส่งคำร้องเรียนสำเร็จ",
                            icon: 'success'
                        });
                    }).catch((err) => {
                        this.$swal({
                            title: err,
                            icon: 'error'
                        });
                    })
            }
        },
   validations: {
     topic: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(255)
     },
     description: {
         required,
         minLength: minLength(50)
     },
     send_status: {
         required,
         not_in: (value) => {
            if(value == "Not_Urgent" || value == "Urgent"){
                return true;
            }
            return false;
        }
     },
     sociality_location: {
         required,
         minLength: minLength(5),
         maxLength: maxLength(255)
     },
    education_subject_id: {
        required,
        numeric,
        minLength: minLength(8),
        maxLength: maxLength(8)
    },
    scholarship_type: {
        required,
        not_in: checkScholarshipType
    },
    register_subject: {
        required,
        numeric,
        minLength: minLength(8),
        maxLength: maxLength(8)
    },
    environment_location: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(255)
    }
   }
    }
</script>

<style important=true lang=css scoped>
    #createreport_big_title{
        color: #E35205;
        font-family: 'Kanit', sans-serif;
        font-size: 35px;
        font-weight: 700;
        text-align: center;
        padding-top: 2%;
    }
    #all_report{
        padding-top: 3%;
        padding-left: 5%;
        padding-right: 5%;
        border-radius: 30px;
        color: #1a1819;
        font-family: 'Kanit', sans-serif;
        margin-bottom: 5%;
    }
    #btn_submit{
        margin-bottom: 3%;
    }
    
    #footer_homepage{
        position: relative;
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
    #error-message{
        color: #1a1819;
        font-family: 'Kanit', sans-serif;
        font-size: 16px;
        font-weight: 700;
        padding-top: 1%;
    }

    /* topnav_createreport */

    .topnav_createreport{
        color:#fff;
        display:flex;
        justify-content: space-between;
    }
    .topnav_createreport ul{
        display: flex;
        justify-content: space-around;
        padding-top: 10px;
        padding-right: 20px;  
    }
    .topnav_createreport li{
        list-style: none;        
    }
    .topnav_createreport #comp1 a{
        color: #fff;
        text-decoration: none;
        font-size: 20px;
        font-weight: 200;
        padding: 5px 12px;
    }
    .topnav_createreport #comp1 a:hover{
        color: orange;
        text-decoration: none;
    }
    .topnav_createreport #comp2 a{
        color: #fff;
        text-decoration: none;
        font-size: 20px;
        font-weight: 700;
        padding: 5px 12px;
    }
    .topnav_createreport #comp2 a:hover{
        color: yellow;
        text-decoration: none;
    }

    .topnav_createreport #comp3{
        color:white; 
        background-color:#e4af01;
        margin-right: 20px; 
        margin-left: 10px; 
    }

    .topnav_createreport #comp3:hover{
        background-color:#f7d12b; 
    }

    .topnav_createreport::before{
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

    .topnav_createreport > * {
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
