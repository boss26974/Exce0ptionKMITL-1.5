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
    <div class="container p-6 mt-4" id="loginform">
      <div class="row">
        <div class="col-sm-4" id="loginLeft">
          <div class="p-6 mt-6" style="background-color: red">
            <img
              src="/image/navbar/newlogo.png"
              width="100%"
              height="auto"
              alt=""
            />
          </div>
          <img src="/image/login/cloud.png" alt="" id="cloud1" />
        </div>
        <div class="col-md-8" id="loginRight">
          <p v-html="br" />
          <div
            class="p-6 mt-6 mb-6 ml-6 mr-6"
            style="background-color: #130d0d"
          >
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
              Log in your account
            </p>
            <form v-on:submit.prevent="login">
              <div class="form-group">
                <label
                  for="InputEmailLogin"
                  style="font-size: 20px; font-weight: 500; color: white"
                  >Email</label
                >
                <input
                  type="email"
                  class="form-control"
                  v-model.trim.lazy="$v.email.$model"
                  :class="{
                    'is-invalid':
                      validationStatusError($v.email) || emailError == 'error',
                    'is-valid': !$v.email.$invalid,
                  }"
                  id="InputemailLogin"
                />
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">
                  <span v-if="!$v.email.required">กรุณากรอก Email</span>
                  <span v-if="!$v.email.email"></span>
                  <!-- <span v-if="emailError == 'error'">Email ไม่ถูกต้องกรุณาตรวจสอบแล้วลองใหม่อีกครั้ง</span> -->
                </div>
                <div
                  class="alert alert-success alert-dismissible fade show"
                  role="alert"
                  v-if="emailError == 'error'"
                >
                  Email ไม่ถูกต้องกรุณาตรวจสอบแล้วลองใหม่อีกครั้ง
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    @click="email_reset()"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label
                  for="InputPasswordLogin"
                  style="font-size: 20px; font-weight: 500; color: white"
                  >Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  v-model.trim.lazy="$v.password.$model"
                  :class="{
                    'is-invalid':
                      validationStatusError($v.password) ||
                      passwordError == 'error',
                    'is-valid': !$v.password.$invalid,
                  }"
                  id="InputPasswordLogin"
                />
                <a @click="togglePassLogin()"
                  ><span
                    class="fa fa-fw fa-eye field-icon toggle-password"
                  ></span
                ></a>
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">
                  <span v-if="!$v.password.required">กรุณากรอกรหัสผ่าน</span>
                  <span v-if="!$v.password.minLength"
                    >Password ต้องไม่ต่ำกว่า 16 ตัว</span
                  >
                  <span v-if="!$v.password.maxLength"
                    >Password ต้องไม่เกิน 255 ตัว</span
                  >
                  <!-- <span v-if="passwordError == 'error'">รหัสผ่านไม่ถูกต้อง</span> -->
                </div>
                <div
                  class="alert alert-success alert-dismissible fade show"
                  role="alert"
                  v-if="passwordError == 'error'"
                >
                  รหัสผ่านไม่ถูกต้อง
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    @click="password_reset()"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <div class="form-group form-check" style="padding-left: 24px">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="Check1"
                  style="background-color: #130d0d; border-color: white"
                  v-model="remember"
                />
                <label class="form-check-label" for="Check1">Remember me</label>
                <a
                  href="/forgotpassword"
                  style="
                    float: right;
                    font-weight: 300;
                    opacity: 0.5;
                    color: white;
                  "
                  ><span><u>Forgot password?</u></span></a
                >
              </div>
              <button
                type="submit"
                class="btn btn-danger"
                style="
                  font-size: 15px;
                  font-weight: 300;
                  border-radius: 20px;
                  padding: 5px 30px 5px 30px;
                "
              >
                Log in
              </button>
              <br /><br />
              <p style="font-size: 10px; font-weight: 400; color: white">
                Don't have an account yet?
                <a href="/register" style="text-decoration: none"
                  ><span style="color: red"
                    ><b>Create your account now!</b></span
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
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { LOGIN_MUTATION } from "../graphql"
import Cookies from "js-cookie"
export default {
  data() {
    return {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      br: "<br><br>",
      remember: false,
      rememberData: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(255),
    },
  },
  created(){
    Cookies.remove('tokenAdmin')
    Cookies.remove('tokenUser')
    this.rememberData = JSON.parse(localStorage.getItem('rememberMe'))
    if(this.rememberData != null){
      this.email = this.rememberData.rememberEmail
      this.password = this.rememberData.rememberPassword
      this.remember = this.rememberData.rememberTrue
    }
  },
  methods: {
    alert(){
      this.$swal({
        icon: 'warning',
        title: 'กรุณาล็อกอินก่อนเข้าใช้งาน',
        showConfirmButton: true,
      })
    },
    togglePassLogin() {
      var x = document.getElementById("InputPasswordLogin");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    validationStatusError(validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    email_reset() {
      this.emailError = "";
    },
    password_reset() {
      this.passwordError = "";
    },
      login() {
        this.br = "";
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;
        this.$apollo.mutate({
          mutation : LOGIN_MUTATION,
          variables : {
            email : this.email,
            password : this.password
          }
        })
        .then((res) => {
          var data = res.data.login;
          if(data.message == "email not found"){
             this.emailError = "error";
          }
          if(data.message == "Password incorrect"){
             this.passwordError = "error";
          }

          const data_remember = {
            rememberEmail: this.email,
            rememberPassword: this.password,
            rememberTrue: this.remember
          }
          console.log(res);

          if (data.status == "success") {
            if(this.remember == true){
              let remember_json = JSON.stringify(data_remember)
              localStorage.setItem('rememberMe', remember_json)
            }
            if(this.remember == false){
              localStorage.removeItem('rememberMe')
            }
            if(data.role == "admin"){
              const token = data.token;
              Cookies.set("tokenAdmin", token);
              this.$router.push({ name: "Admin" });
            }
            if(data.role == "user"){
              const token = data.token;
              Cookies.set("tokenUser", token);
              this.$router.push({ name: "User" });
            }
          }
        })
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
      background-color: #130d0d;
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

