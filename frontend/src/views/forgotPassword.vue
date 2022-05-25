<template>
    <div>
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
        <div class="wrapper fadeInDown">
            <div id="formContent" style="margin-top:80px; margin-bottom:80px;">
                <div class="fadeIn first">
                    <img src="/image/navbar/newlogo.png" id="icon" alt="" />
                </div>

            <!-- send mail -->
                <div class="alert alert-success alert-dismissible fade show" role="alert" style="" v-if="sendError1 == 'error'">
                          กรุณากรอก Email ก่อนกด SEND CODE
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="sendError1 = ''">
                          <span aria-hidden="true">&times;</span>
                      </button>
                </div>
                <div class="alert alert-success alert-dismissible fade show" role="alert" style="" v-if="sendError2 == 'error'">
                          กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="sendError2 = ''">
                          <span aria-hidden="true">&times;</span>
                      </button>
                </div>
                <div class="alert alert-success alert-dismissible fade show" role="alert" style="" v-if="notFoundEmail != ''">
                          {{notFoundEmail}}
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="notFoundEmail = ''">
                          <span aria-hidden="true">&times;</span>
                      </button>
                </div>
                <div class="alert alert-success alert-dismissible fade show" role="alert" style="" v-if="success != ''">
                          {{success}}
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                </div>
                <div class="alert alert-success alert-dismissible fade show" role="alert" style="" v-if="error != ''">
                          {{error}}
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="error = ''">
                          <span aria-hidden="true">&times;</span>
                      </button>
                </div>
                
                <!--  change password success-->
                <template  v-if="success != ''">
                  <div class="container success">
                    <div class="dot"><i class="fas fa-check" style="color:white;height: 50px;width: 40px;"></i></div>
                    <h1>Password Changed!</h1>
                    <h3>Your password has been Changed successfully.</h3>
                    <br>
                    <a href="/login"><button type="button" class="btn btn-primary btn-lg">Back to login</button></a>
                    <br><br>
                  </div>
                </template>

                <template v-if="success == ''">
                <form v-on:submit.prevent="ChangePassword">
                  <div class="form-group">
                    <input type="email" class="fadeIn second form-control" placeholder="Your email" v-model.trim.lazy="$v.emailSend.$model" :class="{'is-invalid': validationStatusError($v.emailSend), 'is-valid': !$v.emailSend.$invalid }">
                    <div class="invalid-feedback" style="text-align: left; margin-left:35px; margin-top:-5px">
                        <span v-if="!$v.emailSend.required">กรุณากรอก Email</span>
                        <span v-if="!$v.emailSend.email">Email ไม่ถูกต้อง</span>
                    </div>   
                  </div>
                  <div class="form-group" style="margin-top:-15px">
                    <input type="password" class="fadeIn second form-control" placeholder="Your new password" v-model.trim.lazy="$v.Newpassword.$model" :class="{'is-invalid': validationStatusError($v.Newpassword), 'is-valid': !$v.Newpassword.$invalid }" id="Newpassword1"> 
                    <a @click="togglePassword1()"><span class="fa fa-fw fa-eye field-icon2 toggle-password"></span></a>
                    <div class="invalid-feedback" style="text-align: left; margin-left:35px; margin-top:-5px">
                        <span v-if="!$v.Newpassword.required">กรุณากรอกรหัสผ่าน</span>
                        <span v-else-if="!$v.Newpassword.minLength">Password ต้องไม่ต่ำกว่า 8 ตัว</span>
                        <span v-else-if="!$v.Newpassword.maxLength">Password ต้องไม่เกิน 255 ตัว</span>
                        <span v-else-if="!$v.Newpassword.complex">Password ง่ายเกินไป ควรมี A-Z หรือ a-z หรือ อักขระพิเศษ อย่างน้อย 1 ตัว</span>
                    </div>
                  </div>
                  <div class="form-group" style="margin-top:-15px">
                    <input type="password" class="fadeIn second form-control" placeholder="Repeat your new password" v-model.trim.lazy="$v.RepeatNewpassword.$model" :class="{'is-invalid': validationStatusError($v.RepeatNewpassword), 'is-valid': (Newpassword != '') ? !$v.RepeatNewpassword.$invalid : '' }" id="Newpassword2">
                    <a @click="togglePassword2()"><span class="fa fa-fw fa-eye field-icon2 toggle-password"></span></a>
                    <div class="invalid-feedback" style="text-align: left; margin-left:35px; margin-top:-5px">
                        <span v-if="!$v.RepeatNewpassword.required">กรุณากรอกรหัสผ่านอีกครั้ง&nbsp;</span>
                        <span v-if="!$v.RepeatNewpassword.sameAspassword">Password ไม่ตรงกัน</span>
                    </div> 
                  </div>
                    <div class="container">
                      <div class="row">
                          <div class="col-6">
                            <input type="text" placeholder="Your code" class="form-control" style="margin-top:10px; margin-left:10px" v-if="sending == ''" v-model.trim.lazy="$v.code.$model" :class="{'is-invalid': validationStatusError($v.code), 'is-valid': !$v.code.$invalid }">
                            <div class="invalid-feedback" style="text-align: left; margin-left:20px; margin-top:-5px">
                              <span v-if="!$v.code.required">กรุณากรอกรหัสยืนยัน</span>
                              <span v-if="!$v.code.numeric">รหัสยืนยันเป็นตัวเลข</span>
                              <span v-if="!$v.code.maxLength"></span>
                              <span v-if="!$v.code.minLength"></span>
                            </div>
                            <div>
                              <span v-if="sending == '' && timeOver != 'Yes'" style="color:yellow;">มีเวลา 3 นาทีในการกรอกโค้ด!</span>
                              <span v-if="timeOver == 'Yes'" style="margin-right: 30px" class="text-success">หมดเวลา!!</span>
                            </div>
                            <template v-if="sending != 'hide' && sending != ''">
                              <button class="mt-3 mr-4 btn btn-primary" type="button" style="" disabled>
                                {{sending}}
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              </button>
                            </template>
                            <input type="button" class="fadeIn fourth btn btn-danger" value="" style="margin-top:10px; margin-right:50px" v-model="sendcode" v-if="sendcode != 'hide'" @click="SendCode()">
                          </div>
                          <div class="col-6">
                            <input type="submit" class="fadeIn fourth" value="change password" style="margin-top:10px">
                          </div>
                      </div>
                    </div>
                </form>
                </template>

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
import { required,maxLength, minLength, sameAs, email, numeric } from 'vuelidate/lib/validators';
import axios from 'axios';

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
    data(){
        return{
            data: null,
            sec: 181,
            timeOver: '',
            interval: '',
            emailSend: '',
            Newpassword: '',
            RepeatNewpassword: '',
            code: '',
            // sending....
            sendcode: 'Send code',
            sending: 'hide',
            // response
            sendError1: '',
            sendError2: '',
            notFoundEmail: '',
            success: '',
            error: ''
        }
    },
    validations:{
      emailSend:{
          required,
          email
      },
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
      code:{
        required,
        numeric,
        minLength: minLength(6),
        maxLength: maxLength(6)
      }
    },
    methods:{
        validationStatusError(validation){
            return typeof validation != "undefined" ? validation.$error : false;
        },
        togglePassword1(){
          var x = document.getElementById("Newpassword1");
            if (x.type === "password") {
                x.type = "text";
            }
            else{
                x.type = "password";
            }
        },
        togglePassword2(){
          var x = document.getElementById("Newpassword2");
            if (x.type === "password") {
                x.type = "text";
            }
            else{
                x.type = "password";
            }
        },
        reset_data(){
          this.emailSend = ''
          this.Newpassword = ''
          this.RepeatNewpassword = ''
          this.code = ''
        },
        timer(){
          this.interval = setInterval(() => {
            this.sec -= 1
            if(this.sec <= 0){
              clearInterval(this.interval)
              this.timeOver = 'Yes'
              setTimeout(() => {
                this.timeOver = ''
                this.sec = 181
                this.sendcode = 'Send code'
                this.sending = 'hide'
                this.code = ''
              }, 1000);
            }
          }, 1000);
        },
        SendCode(){
            this.$v.emailSend.$touch();
            if( this.$v.emailSend.$pendding || this.$v.emailSend.$error ) return this.sendError1 = 'error',
              this.sendError2 = '',
              this.notFoundEmail = '',
              this.success = '',
              this.error = '';
              this.sendcode = 'hide'
              this.sending = 'sending'
              setTimeout(() => {
                this.sending = 'sending.'
                  setTimeout(() => {
                    this.sending = 'sending..'
                      setTimeout(() => {
                        this.sending = 'sending...'
                        axios.post('http://localhost:5000/forgotpassword/sendmail', {
                          email:{
                              emailSend: this.emailSend
                          }
                        })
                        .then((response) => {
                            this.data = response.data
                            console.log(this.data)
                            if(this.data.message == 'send success!')
                            {
                              this.$v.code.$reset();
                              this.code = ''
                              this.sending = ''
                              this.timer()
                            }
                            else{
                              this.sending = 'hide'
                              this.sendcode = 'Send code'
                              this.notFoundEmail = this.data.message
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    }, 1000);
                  }, 1000);
              }, 1000);
        },
        ChangePassword(){
          this.$v.$touch();
          if( this.$v.$pendding || this.$v.$error ) return this.sendError2 = 'error' ,
            this.sendError1 = '',
            this.notFoundEmail = '',
            this.success = '',
            this.error = '';
          axios.put("http://localhost:5000/forgotpassword/checking", {
              emailSend: this.emailSend,
              Newpassword: this.Newpassword,
              RepeatNewpassword: this.RepeatNewpassword,
              code: this.code,
              codeCheck: this.data.code
          }).then((response) => {
            const data = response.data
            console.log(data)
            if(data.message == 'เปลี่ยนรหัสผ่านสำเร็จ'){
              this.success = data.message
              this.sendError1 = ''
              this.sendError2 = ''
              this.notFoundEmail = ''
              this.error = ''
              clearInterval(this.interval)
              this.sec = 181
              this.sendcode = 'Send code'
              this.sending = 'hide'
              this.code = ''
              this.$v.$reset();
              this.reset_data()
            }
            else{ 
              this.error = data.message 
              this.sendError1 = ''
              this.sendError2 = ''
              this.notFoundEmail = ''
              this.success = ''
            }
          }).catch((err) => {
            console.log(err)
          })
      }
    },
}
</script>
    
<style scoped>

/* BASIC */

a {
  color: #92badd;
  display:inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  margin: 40px 8px 10px 8px; 
  color: #cccccc;
}

/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: rgb(64, 66, 77);
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

input[type=submit] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 8px 20px;
  float: right;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 13px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=submit]:hover, input[type=reset]:hover  {
  background-color: #39ace7;
}

input[type=submit]:active, input[type=reset]:active  {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=email],input[type=password],input[type=text]  {
  background-color: #130d0d;
  border: none;
  color: whitesmoke;
  padding: 5px 20px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border-bottom: 1px solid whitesmoke;
}

.field-icon2 {
  margin-left: -85px;
  margin-top: -15px;
  position: relative;
  z-index: 2;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}

/* OTHERS */

*:focus {
    outline: none;
} 

#icon {
  width:50%;
}

.alert {
  display: inline-block;
  text-align: center;
   width:90%;    
}
.dot {
  height: 50px;
  width: 50px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
}
.success h1{
  color: whitesmoke;
  font-size: 30px;
  font-weight: 500;
}
.success h3{
  color: whitesmoke;
  font-size: 15px;
  font-weight: 500;
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
