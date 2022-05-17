<template>
    <div>
        <div class="banner">
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
        <div class="container" style="margin-top:50px; padding-bottom:200px;">
            <div class="row">
                <div class="col-md-2"><hr></div>
                <div class="col-md-6">
                    <div class="field">
                        <label class="label" style="color:white; text-align:center; font-size:25px;">Your feedback</label>
                        <div class="control">
                            <textarea class="textarea" style="background-color:#11538C; color:white;" v-model.trim.lazy="$v.report_desciption.$model" :class="{'is-invalid': validationStatusError($v.report_desciption), 'is-valid': !$v.report_desciption.$invalid }"></textarea>
                            <div class="invalid-feedback" style="font-size:15px;">
                              <span v-if="!$v.report_desciption.required">กรอกอะไรสักหน่อยย</span>
                            </div>
                        </div>
                        </div>
                        <div class="field is-grouped" style="padding: 0px 0px 50px 220px;">
                        <div class="control">
                            <button class="button is-danger" @click="submit()">Submit</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <img src="/image/help/help.png" alt="">
                </div>
                <div class="col-md-2"><hr></div>
            </div>
            <hr>
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
import { required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
    data() {
        return{
            tokenUser: null,
            tokenAdmin: null,
            role: null,
            id: '',
            acc_id: null,
            manage_acc: null,
            manage_standand: null,
            permissionPath: null,
            // feedback
            report_desciption: ''
        }
    },
    validations:{
        report_desciption:{
            required
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
                    this.acc_id =response.data.acc_id
                    this.permissionPath = '/user'
                }
                if(response.data.message == 'You can pass! (Admin)'){
                    this.id = response.data.id
                    this.acc_id =response.data.acc_id
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
            this.$router.push({ name: "Home" });
        },
        validationStatusError(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },
        submit(){
            this.$v.$touch();
            if( this.$v.$pendding || this.$v.$error ) return;
            this.$swal({
                title: 'Are you sure?',
                text: "Would you like to send a feedback?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post("http://localhost:5000/sendfeedback",{
                        acc_id: this.acc_id,
                        report_desciption: this.report_desciption
                    }).then((response) =>{
                        this.report_desciption = '';
                        this.$v.$reset();
                        this.$swal({
                            icon: 'success',
                            title: 'Sent successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        console.log(response)
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
    footer {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #963306;
        padding: 10px 0px 10px 30px;
    }
</style>