<template>
  <div>
    <!-- navbar -->
    <div class="banner">
      <div class="topnav_login_reg">
        <a href="/"
          ><img
            src="/image/navbar/newlogo.png"
            width="110px"
            height="auto"
            style="padding-left: 20px"
            alt=""
        /></a>
        <ul>
          <div id="MyClockDisplay" class="clock"></div>
          <li id="comp2"><a href="/login">Log In</a></li>
          <div class="line"></div>
          <li id="comp2"><a href="/register">Register</a></li>
        </ul>
      </div>
    </div>
    <div class="container p-6 mt-4">
      <div class="row">
        <div class="col-sm-4" id="registerLeft">
          <div class="p-6" style="background-color: red">
            <img
              src="/image/navbar/newlogo.png"
              width="100%"
              height="auto"
              alt=""
            />
          </div>
          <img
            src="/image/login/cloud.png"
            alt=""
            id="cloud2"
            style="margin-top: 200px"
          />
        </div>
        <div class="col-md-8" id="registerRight">
          <div class="p-6 ml-6 mr-6" style="background-color: #130d0d">
            <p v-html="br" />
              <div
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
                v-show="messageRegError != ''"
              >
                {{ messageRegError }}
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            <p style="font-size: 35px; font-weight: 500; color: white">
              Welcome to <span style="color: red">ExceptionKMITL!</span>
            </p>
            <p
              style="
                font-size: 20px;
                font-weight: 500;
                color: white;
                opacity: 0.5;
              "
            >
              Create your account
            </p>
            <form id="signup-form" v-on:submit.prevent="submit">
              <div class="container">
                <div class="row">
                  <div class="col-md-6" style="margin-left: -15px">
                    <div class="form-group">
                      <label
                        for="InputFirstnameReg"
                        style="font-size: 18px; font-weight: 500; color: white"
                        >First Name</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model.trim.lazy="$v.firstname.$model"
                        :class="{
                          'is-invalid': validationStatusError($v.firstname),
                          'is-valid': !$v.firstname.$invalid,
                        }"
                        id="InputFirstnameReg"
                      />
                      <div class="invalid-feedback">
                        <span v-if="!$v.firstname.required">กรุณากรอกชื่อ</span>
                        <span v-if="!$v.firstname.string"
                          >ชื่อจริงไม่ถูกต้อง</span
                        >
                        <span v-if="!$v.firstname.minLength"
                          >ชื่อจริงผู้ใช้ต้องไม่ต่ำกว่า
                          {{ $v.firstname.$params.minLength.min }} ตัว</span
                        >
                        <span v-if="!$v.firstname.maxLength"
                          >ชื่อจริงผู้ใช้ต้องไม่เกิน
                          {{ $v.firstname.$params.maxLength.max }} ตัว</span
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label
                        for="InputIdReg"
                        style="font-size: 18px; font-weight: 500; color: white"
                        >Student ID</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model.number.lazy="$v.studentID.$model"
                        :class="{
                          'is-invalid':
                            validationStatusError($v.studentID),
                          'is-valid': !$v.studentID.$invalid,
                        }"
                        id="InputIdReg"
                      />
                      <div class="invalid-feedback">
                        <span v-if="!$v.studentID.required"
                          >กรุณากรอกรหัสนักศึกษา</span
                        >
                        <span v-if="!$v.studentID.integer"></span>
                        <span v-if="!$v.studentID.minLength"
                          >รหัสนักศึกษาไม่ถูกต้อง</span
                        >
                        <span v-if="!$v.studentID.maxLength"
                          >รหัสนักศึกษาไม่ถูกต้อง</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label
                        for="InputLastnameReg"
                        style="font-size: 18px; font-weight: 500; color: white"
                        >Last Name</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model.trim.lazy="$v.lastname.$model"
                        :class="{
                          'is-invalid': validationStatusError($v.lastname),
                          'is-valid': !$v.lastname.$invalid,
                        }"
                        id="InputLastnameReg"
                      />
                      <div class="invalid-feedback">
                        <span v-if="!$v.lastname.required"
                          >กรุณากรอกนามสกุล</span
                        >
                        <span v-if="!$v.lastname.string"
                          >นามสกุลไม่ถูกต้อง</span
                        >
                        <span v-if="!$v.lastname.minLength"
                          >นามสกุลผู้ใช้ต้องไม่ต่ำกว่า
                          {{ $v.firstname.$params.minLength.min }} ตัว</span
                        >
                        <span v-if="!$v.lastname.maxLength"
                          >นามสกุลผู้ใช้ต้องไม่เกิน
                          {{ $v.lastname.$params.maxLength.max }} ตัว</span
                        >
                        <span v-if="!$v.lastname.maxLength"
                          >นามสกุลผู้ใช้ต้องไม่เกิน
                          {{ $v.lastname.$params.maxLength.max }} ตัว</span
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label
                        for="SelectStatusReg"
                        style="font-size: 18px; font-weight: 500; color: white"
                        >Educational Status</label
                      >
                      <select
                        class="form-control"
                        v-model.trim.lazy="$v.status.$model"
                        :class="{
                          'is-invalid': validationStatusError($v.status),
                          'is-valid': !$v.status.$invalid,
                        }"
                        id="SelectStatusReg"
                      >
                        <option hidden value="">Chose your status..</option>
                        <option value="studying">กำลังศึกษาอยู่</option>
                        <option value="graduated">จบการศึกษาแล้ว</option>
                      </select>
                      <div class="invalid-feedback">
                        <span v-if="!$v.status.required">กรุณาเลือกสถานะ</span>
                      </div>
                      <!-- <span>selected: {{status}}</span> -->
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label
                  for="InputEmailReg"
                  style="font-size: 18px; font-weight: 500; color: white"
                  >Email address</label
                >
                <input
                  type="email"
                  class="form-control"
                  v-model.trim.lazy="$v.email.$model"
                  :class="{
                    'is-invalid':
                      validationStatusError($v.email),
                    'is-valid': !$v.email.$invalid,
                  }"
                  id="InputEmailReg"
                />
                <div class="invalid-feedback">
                  <span v-if="!$v.email.required">กรุณากรอก Email</span>
                  <span v-if="!$v.email.email">Email ไม่ถูกต้อง</span>
                </div>
              </div>
              <div class="form-group">
                <label
                  for="InputPasswordReg"
                  style="font-size: 18px; font-weight: 500; color: white"
                  >Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  v-model.trim.lazy="$v.passWord.$model"
                  :class="{
                    'is-invalid': validationStatusError($v.passWord),
                    'is-valid': !$v.passWord.$invalid,
                  }"
                  id="InputPasswordReg"
                />
                <a @click="togglePassReg()"
                  ><span
                    class="fa fa-fw fa-eye field-icon toggle-password"
                  ></span
                ></a>
                <div class="invalid-feedback">
                  <span v-if="!$v.passWord.required">กรุณากรอกรหัสผ่าน</span>
                  <span v-else-if="!$v.passWord.minLength"
                    >Password ต้องไม่ต่ำกว่า 8 ตัว</span
                  >
                  <span v-else-if="!$v.passWord.maxLength"
                    >Password ต้องไม่เกิน 255 ตัว</span
                  >
                  <span v-else-if="!$v.passWord.complex"
                  >Password ง่ายเกินไป ควรมี A-Z หรือ a-z หรือ อักขระพิเศษ อย่างน้อย 1 ตัว</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label
                  for="InputPasswordRegCheck"
                  style="font-size: 18px; font-weight: 500; color: white"
                  >Repeat Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  v-model.trim.lazy="$v.repeatPassword.$model"
                  :class="{
                    'is-invalid': validationStatusError($v.repeatPassword),
                    'is-valid':
                      passWord != '' ? !$v.repeatPassword.$invalid : '',
                  }"
                  id="InputPasswordRegCheck"
                  name="InputPasswordRegCheck"
                />
                <a @click="togglePassRegCheck()"
                  ><span
                    class="fa fa-fw fa-eye field-icon toggle-password"
                  ></span
                ></a>
                <div class="invalid-feedback">
                  <span v-if="!$v.repeatPassword.required"
                    >กรุณากรอกรหัสผ่านอีกครั้ง</span
                  >
                  <span v-if="!$v.repeatPassword.sameAspassword"
                    >Password ไม่ตรงกัน</span
                  >
                </div>
              </div>
              <div class="form-group form-check" style="padding-left: 24px">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="Check2"
                  style="background-color: #130d0d; border-color: white"
                  v-model.trim.lazy="$v.Iagree.$model"
                  :class="{
                    'is-invalid': validationStatusError($v.Iagree),
                    'is-valid': !$v.Iagree.$invalid,
                  }"
                />
                <label class="form-check-label" for="Check2" style="color : #ffffff"
                  >I agree with terms and conditions</label
                >
                <!-- <span>{{Iagree}}</span> -->
                <div class="invalid-feedback">
                  <span v-if="!$v.Iagree.required"
                    >กรุณาคลิกเพื่อยอมรับเงื่อนไขและข้อตกลง</span
                  >
                  <span v-else-if="!$v.Iagree == false" 
                    >กรุณาคลิกเพื่อยอมรับเงื่อนไขและข้อตกลง</span
                  >
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-danger"
                style="
                  font-size: 15px;
                  font-weight: 300;
                  border-radius: 18px;
                  padding: 5px 30px 5px 30px;
                "
              >
                Sign up
              </button>
              <td v-html="br2" />
              <div
                class="alert alert-success alert-dismissible fade show"
                role="alert"
                v-show="messageRegOK != ''"
              >
                {{ messageRegOK }}
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <p style="font-size: 10px; font-weight: 400; color: white">
                Already have an account?
                <a href="/login" style="text-decoration: none"
                  ><span style="color: red"
                    ><b>Log in your account now!</b></span
                  ></a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
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
// import navbarReg from '../components/navbarLoginReg.vue'
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
  integer,
} from "vuelidate/lib/validators";
import { CREATE_USER_MUTATION }  from "../graphql"

function specialChar(value){
  if(value.match(/[0-9!@#$%^&*)(+=._-]/)){return false;}
  else{return true;}
}

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      studentID: "",
      status: "",
      email: "",
      passWord: "",
      repeatPassword: "",
      Iagree: "",
      br: "<br><br><br>",
      br2: "<br>",
      // backend response
      dataReg: "",
      messageRegOK: "",
      messageRegError: ""
      // backend error
    };
  },
  validations:{
    firstname: {
      required,
      string: specialChar,
      minLength: minLength(3),
      maxLength: maxLength(255),
    },
    lastname: {
      required,
      string: specialChar,
      minLength: minLength(3),
      maxLength: maxLength(255),
    },
    studentID: {
      required,
      integer,
      minLength: minLength(8),
      maxLength: maxLength(8),
    },
    status: {
      required,
    },
    email: {
      required,
      email,
    },
    passWord: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(255),
      complex: complexPassword,
    },
    repeatPassword: {
      required,
      sameAspassword: sameAs("passWord"),
    },
    Iagree: {
      required,
      checked: (value) => value === true,
    },
  },
  methods: {
    alert(){
      this.$swal({
        icon: 'warning',
        title: 'กรุณาล็อกอินก่อนเข้าใช้งาน',
        showConfirmButton: true,
      })
    },
    togglePassReg() {
      var x = document.getElementById("InputPasswordReg");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    togglePassRegCheck() {
      var x = document.getElementById("InputPasswordRegCheck");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    resetData() {
      this.firstname = "";
      this.lastname = "";
      this.studentID = "";
      this.status = "";
      this.email = "";
      this.passWord = "";
      this.repeatPassword = "";
      this.Iagree = "";
    },
    validationStatusError(validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
      submit() {
        this.br = "";
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;
        this.$apollo.mutate({
          mutation : CREATE_USER_MUTATION,
          variables : {
           "record" : {
              "fname" : this.firstname,
              "lname" : this.lastname,
              "email" : this.email,
              "password" : this.passWord,
              "studentid" : this.studentID.toString(),
              "status" : this.status
            }
          }
        })
        .then((res) => {
          const data = res.data.createUser;
          if (data.recordId) {
            this.messageRegError = ""
            this.messageRegOK = "register success Let's Login!";
            console.log(res);
            this.$v.$reset();
            this.resetData();
          }
        })
        .catch((err) => {
          this.messageRegError = "Email or Student ID is already Used"
          console.log(err)
        });
      }
  },
};
</script>

<style scoped>
/* login register */

#loginLeft,#registerLeft{
    background-color: red;
}

#loginRight,#registerRight{
    background-color: #130e0d; 
}

input[type="email"],input[type="password"],input[type="text"],#SelectStatusReg, textarea{
    background-color : #130d0d; 
    color: whitesmoke;
}

.form-control:focus, .form-control:active {
    background: transparent;
    color: whitesmoke;
}

#logo1{
    animation-name: logomove1;
    animation: logomove1 3s;
}

#logo2{
    animation-name: logomove2;
    animation: logomove2 3s;
}

#cloud1{
    margin-left: -15px;
    height: 400px;
    max-width: 120%;
    position: relative;
    animation-name: cloudmove1;
    animation: cloudmove1 2s;
    animation-timing-function: ease-out;
    overflow: hidden;
}

#cloud2{
    margin-left: -15px;
    height: 585px;
    max-width: 120%;
    position: relative;
    animation-name: cloudmove2;
    animation: cloudmove2 3s;
    animation-timing-function: ease-out;
    overflow: hidden;
}

@keyframes cloudmove1 {
    from {top: -100px;}
    to {top: 0px;}
}

@keyframes cloudmove2 {
    from {top: -200px;}
    to {top: 0px;}
}

@keyframes logomove1 {
    0% {
        opacity: 0.1;
    }
    25%{
        opacity: 0.25;
    }
    50%{
        opacity: 0.5;
    }
    75%{
        opacity: 0.75;
    }
    100% {
        opacity: 1;
    }
}

@keyframes logomove2 {
    0% {
        opacity: 0.1;
    }
    25%{
        opacity: 0.25;
    }
    50%{
        opacity: 0.5;
    }
    75%{
        opacity: 0.75;
    }
    100% {
        opacity: 1;
    }
}

.field-icon {
    float: right;
    margin-right: 30px;
    margin-top: -26px;
    position: relative;
    z-index: 2;
}

/* topnav_login_reg only login && reg */

.topnav_login_reg{
    color:#fff;
    display:flex;
    justify-content: space-between;
}
.topnav_login_reg ul{
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
    padding-right: 20px;  
}
.topnav_login_reg li{
    list-style: none;        
}
.topnav_login_reg #comp1 a{
    color: #fff;
    text-decoration: none;
    font-size: 20px;
    font-weight: 200;
    padding: 5px 12px;
}
.topnav_login_reg #comp1 a:hover{
    color: orange;
    text-decoration: none;
}
.topnav_login_reg #comp2 a{
    color: #fff;
    text-decoration: none;
    font-size: 20px;
    font-weight: 700;
    padding: 5px 12px;
}
.topnav_login_reg #comp2 a:hover{
    color: yellow;
    text-decoration: none;
}

.topnav_login_reg #comp3{
    color:white; 
    background-color:#e4af01;
    margin-right: 20px; 
    margin-left: 10px; 
}

.topnav_login_reg #comp3:hover{
    background-color:#f7d12b; 
}

.topnav_login_reg::before{
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

.topnav_login_reg > * {
    z-index: 100;
}
/* footer */

footer {
    background-color: #963306;
    padding: 10px 0px 10px 30px;
}

#help{
    padding: 10px 30px;
}

#help a{
    color: black;
    float: right;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
    width: 100px;
    padding: 10px 15px;
    border-radius: 10px;
    background: #ffffff;
    opacity: 0.7;
}

</style>