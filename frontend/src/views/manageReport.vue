<template>  
    <div>
    <!-- navbar -->
        <div class="banner" >
            <div class="topnav_manage">
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
                            <button class="dropdown-item text-danger" type="button" @click="logout()">ออกจากระบบ</button>
                        </p>
                    </div>
                </ul>
            </div>
        </div>
        <div class="box">
            <div class="page-header text-white" style="text-align:center;">
                <h1>Manage Report</h1>      
            </div>
            <hr>
            <div class="container">
                <div class="row">
                    <div class="col-md-2">
                        <p type="button" id="button" class="btn btn-secondary" @click="filter_all()">All</p>
                    </div>
                    <div class="col-md-2">
                        <p type="button" id="button" class="btn btn-primary" @click="filter_New()">เรื่องร้องเรียนใหม่</p>
                    </div>
                    <div class="col-md-2">
                        <p type="button" id="button" class="btn btn-warning" @click="filter_Check()">กำลังตรวจสอบ</p>
                    </div>
                    <div class="col-md-2">
                        <p type="button" id="button" class="btn btn-info" @click="filter_InProgress()">กำลังดำเนินการ</p>
                    </div>
                    <div class="col-md-2">
                        <p type="button" id="button" class="btn btn-danger" @click="filter_NotPass()">ไม่ผ่าน</p>
                    </div>
                    <div class="col-md-2">
                        <p type="button" id="button" class="btn btn-success" @click="filter_Completed()">เสร็จสิ้น</p>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top: 20px;">
                <div class="div col-md-10">
                    <div class="table-responsive">
                        <table class="table table-bordered table-fixed table-hover">
                            <thead class="thead-dark" style="text-align:center;">
                                <th scope="col" class="col-md-1">ID</th>
                                <th scope="col" class="col-md-2">Date</th>
                                <th scope="col" class="col-md-2">ประเภทเรื่องร้องเรียน</th>
                                <th scope="col" class="col-md-4">Title</th>
                                <th scope="col" class="col-md-2">User Student ID</th>
                                <th scope="col" class="col-md-1">Action</th>
                            </thead>
                            <tbody>
                                <tr v-for='report in report_form_all' :key="report.report_form_id" :class="{'table-primary': report.status == 0, 'table-warning': report.status == 1, 'table-info': report.status == 2, 'table-success': report.status == 3, 'table-danger': report.status == 4}">
                                    <td style="height: 70px; padding: 20px 0px 20px 30px;" scope="col" class="col-md-1">{{report.report_form_id}}</td>
                                    <td style="height: 70px; padding: 10px 0px 20px 10px;" scope="col" class="col-md-2">{{report.report_form_date_time}}</td>
                                    <td style="height: 70px; padding: 10px 0px 20px 10px;" scope="col" class="col-md-2">{{report.type}}</td>
                                    <td style="height: 70px; padding: 10px 0px 20px 10px;" scope="col" class="col-md-4" v-html="report.report_form_topic"></td>
                                    <td style="height: 70px; padding: 20px 0px 20px 30px;" scope="col" class="col-md-2">{{report.user_studentid}}</td>
                                    <td style="height: 70px; padding: 20px 0px 20px 10px;" scope="col" id="td_action" class="col-md-1">
                                        <a v-show="report.status != 3 && report.status != 4" @click="check_nextStatus(report.report_form_id, report.status)"><i class="fas fa-caret-square-right" style="color:blue; font-size:20px; margin: 0px 15px 0px 5px"></i></a>
                                        <a v-show="report.status != 3 && report.status != 4" @click="check_Notpass(report.report_form_id, report.status)"><i class="fas fa-ban" style="color:red; font-size:20px;"></i></a>
                                        <a v-show="report.status == 3" @click="show_detail(report.report_form_id, report.type)"><i class="fas fa-search" style="color:blue; font-size:20px; margin: 0px 15px 0px 5px"></i></a>
                                        <a v-show="report.status == 4" @click="check_nextStatus(report.report_form_id, report.status)"><i class="fas fa-undo" style="color:blue; font-size:20px; margin: 0px 15px 0px 5px"></i></a>
                                        <a v-show="report.status == 3 || report.status == 4" @click="check_delete(report.report_form_id, report.status)"><i class="fas fa-times-circle" style="color:red; font-size:20px;"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="div col-md-2" style="margin-top: 10px">
                    <div class="separator">Filter by problem</div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="check1" id="check1" value="1" v-model="problem" @click="problem_1()">
                        <label class="form-check-label">
                            ปัญหาด้านการเรียน
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="check2" id="check2" value="2" v-model="problem" @click="problem_2()">
                        <label class="form-check-label">
                            ปัญหาด้านทุนการศึกษา
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="check3" id="check3" value="3" v-model="problem" @click="problem_3()">
                        <label class="form-check-label">
                            ปัญหาด้านสังคม
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="check4" id="check4" value="4" v-model="problem" @click="problem_4()">
                        <label class="form-check-label">
                            ปัญหาด้านระบบการลงทะเบียน
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="check5" id="check5" value="5" v-model="problem" @click="problem_5()">
                        <label class="form-check-label">
                            ปัญหาด้านสภาพสิ่งแวดล้อม
                        </label>
                    </div>
                    <input style="margin: 10px 0px 0px 25px;" id="clear" type='submit' value='clear' @click="clear()"> 
                    <hr id="hr">          
                </div>
            </div>
        </div>
        <!-- modal next status -->
        <div class="modal" :class = "{ 'is-active' : modal_nextStatus }">
            <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title" style="margin-bottom:-8px;">Next Status</p>
                        <button class="delete" aria-label="close" @click='modal_nextStatus = false'></button>
                    </header>
                    <section class="modal-card-body" style="font-size:20px; margin-top:-10px; margin-bottom: -20px; color:white;">
                            <template v-if="form_status_current == 'ไม่ผ่าน'">
                                คุณต้องการที่จะส่ง Report Form ID: {{formid_nextStatus}} ไปยัง Status เริ่มต้น ?<br>
                                current status: <span id="setcolor" class="bg-danger">{{form_status_current}}</span> <i class="fas fa-arrow-right"></i> status next: <span id="setcolor" class="bg-primary">{{form_status_next}}</span>
                            </template>
                            <template v-else>
                                คุณต้องการที่จะส่ง Report Form ID: {{formid_nextStatus}} ไปยัง Status ถัดไป?<br>
                                current status: <span id="setcolor" :class="{'bg-primary': form_status_current == 'เรื่องร้องเรียนใหม่', 'bg-warning': form_status_current == 'กำลังตรวจสอบ', 'bg-info': form_status_current == 'กำลังดำเนินการ'}">{{form_status_current}}</span> 
                                <i class="fas fa-arrow-right"></i> status next: <span id="setcolor" :class="{'bg-warning': form_status_next == 'กำลังตรวจสอบ', 'bg-info': form_status_next == 'กำลังดำเนินการ', 'bg-success': form_status_next == 'เสร็จสิ้น'}">{{form_status_next}}</span>
                            </template>
                        <div class="columns">
                            <div class="column">
                                <p class="control" style="padding-top:10px;"> 
                                    <span style="padding-left: 73%;"><button class="button" @click="modal_nextStatus = false">Cancel</button></span>
                                    <span style="padding-left: 12px;" @click="nextStatus(formid_nextStatus)"><button class="button is-danger">Yes</button></span>
                                 </p>
                            </div>
                        </div>
                    </section>
                <footer class="modal-card-foot">
                    <!-- footer -->
                </footer>
            </div>
        </div>
        <!-- modal notpass -->
        <div class="modal" :class = "{ 'is-active' : modal_Notpass }">
            <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title" style="margin-bottom:-8px;">Set status is not passed</p>
                        <button class="delete" aria-label="close" @click='modal_Notpass = false'></button>
                    </header>
                    <section class="modal-card-body" style="font-size:20px; margin-top:-10px; margin-bottom: -20px; color:white;">
                            คุณต้องการที่จะส่ง Report Form ID: {{formid_Notpass}} ไปยัง Status "ไม่ผ่าน" ?<br>
                            current status: <span id="setcolor" :class="{'bg-primary': form_status_current == 'เรื่องร้องเรียนใหม่', 'bg-warning': form_status_current == 'กำลังตรวจสอบ', 'bg-info': form_status_current == 'กำลังดำเนินการ'}">{{form_status_current}}</span> <i class="fas fa-arrow-right"></i> status next: <span id="setcolor" class="bg-danger">ไม่ผ่าน</span>
                        <div class="columns">
                            <div class="column">
                                <p class="control" style="padding-top:10px;"> 
                                    <span style="padding-left: 73%;"><button class="button" @click="modal_Notpass = false">Cancel</button></span>
                                    <span style="padding-left: 12px;" @click="NotPass(formid_Notpass)"><button class="button is-danger">Yes</button></span>
                                 </p>
                            </div>
                        </div>
                    </section>
                <footer class="modal-card-foot">
                    <!-- footer -->
                </footer>
            </div>
        </div>
        <!-- modal delete -->
        <div class="modal" :class = "{ 'is-active' : modal_delete }">
            <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title" style="margin-bottom:-8px;">Delete Report</p>
                        <button class="delete" aria-label="close" @click='modal_delete = false'></button>
                    </header>
                    <section class="modal-card-body" style="font-size:20px; margin-top:-10px; margin-bottom: -20px; color:white;">
                            <!-- คุณต้องการที่จะลบ Report Form ID: {{formid_Notpass}} ออกจากระบบ? -->
                            คุณต้องการที่จะส่ง Report Form ID: {{formid_delete}} status: <span id="setcolor" :class="{'bg-danger': form_status_delete == 'ไม่ผ่าน', 'bg-success': form_status_delete == 'เสร็จสิ้น'}">{{form_status_delete}}</span> ออกจากระบบ ?
                        <div class="columns">
                            <div class="column">
                                <p class="control" style="padding-top:10px;"> 
                                    <span style="padding-left: 73%;"><button class="button" @click="modal_delete = false">Cancel</button></span>
                                    <span style="padding-left: 12px;" @click="deleteReport(formid_delete)"><button class="button is-danger">Yes</button></span>
                                 </p>
                            </div>
                        </div>
                    </section>
                <footer class="modal-card-foot">
                    <!-- footer -->
                </footer>
            </div>
        </div>
        <!-- modal show detail ! sociality ! -->
        <div class="modal" :class = "{ 'is-active' : modal_sociality }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title" style="padding-top: 20px;">Detail Report Form ID: {{report_form_id_sociality}} sociality</p>
                    <button class="delete" aria-label="close"  @click='modal_sociality = false'></button>
                </header>
                <section class="modal-card-body" style="font-size:20px; font-weight: 300; color:white">
                    <span id="text-head">report_form_id</span> : {{report_form_id_sociality}}<br>
                    <span id="text-head">report_form_date_time</span> : {{report_form_date_time_sociality}}<br>
                    <span id="text-head">report_form_topic</span> : {{report_form_topic_sociality}}<br>
                    <span id="text-head">type</span> : {{type_sociality}}<br>
                    <span id="text-head">user student ID</span> : {{user_reprot_sociality}}<br>
                    <span id="text-head">social_location</span> : {{social_location}}<br>
                    <span id="text-head">problem_description</span> : {{problem_description_sociality}}<br>
                    <span id="text-head">condition_of_submission</span> : {{condition_of_submission_sociality}}<br>
                    <span id="text-head">current status</span> : <span class="bg-success text-white">เสร็จสิ้น<br></span>
                </section>
                <footer class="modal-card-foot">
                    <!-- footer modal detail -->
                </footer>
            </div>
        </div>
        <!-- modal show detail ! studying ! -->
        <div class="modal" :class = "{ 'is-active' : modal_studying }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title" style="padding-top: 20px;">Detail Report Form ID: {{report_form_id_studying}} studying</p>
                <button class="delete" aria-label="close" @click='modal_studying = false'></button>
                </header>
                <section class="modal-card-body" style="font-size:20px; font-weight: 300; color:white">
                    <span id="text-head">report_form_id</span> : {{report_form_id_studying}}<br>
                    <span id="text-head">report_form_date_time</span> : {{report_form_date_time_studying}}<br>
                    <span id="text-head">report_form_topic</span> : {{report_form_topic_studying}}<br>
                    <span id="text-head">type</span> : {{type_studying}}<br>
                    <span id="text-head">user student ID</span> : {{user_reprot_studying}}<br>
                    <span id="text-head">studying_subject_id</span> : {{studying_subject_id}}<br>
                    <span id="text-head">problem_description</span> : {{problem_description_studying}}<br>
                    <span id="text-head">condition_of_submission</span> : {{condition_of_submission_studying}}<br>
                    <span id="text-head">current status</span> : <span class="bg-success text-white">เสร็จสิ้น<br></span>
                </section>
                <footer class="modal-card-foot">
                    <!-- footer modal detail -->
                </footer>
            </div>
        </div>
        <!-- modal show detail ! scholarship ! -->
        <div class="modal" :class = "{ 'is-active' : modal_scholarship }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title" style="padding-top: 20px;">Detail Report Form ID: {{report_form_id_scholarship}} scholarship</p>
                <button class="delete" aria-label="close" @click='modal_scholarship = false'></button>
                </header>
                <section class="modal-card-body" style="font-size:20px; font-weight: 300; color:white">
                    <span id="text-head">report_form_id</span> : {{report_form_id_scholarship}}<br>
                    <span id="text-head">report_form_date_time</span> : {{report_form_date_time_scholarship}}<br>
                    <span id="text-head">report_form_topic</span> : {{report_form_topic_scholarship}}<br>
                    <span id="text-head">type</span> : {{type_scholarship}}<br>
                    <span id="text-head">user student ID</span> : {{user_reprot_scholarship}}<br>
                    <span id="text-head">scholarship_type</span> : {{scholarship_type}}<br>
                    <span id="text-head">problem_description</span> : {{problem_description_scholarship}}<br>
                    <span id="text-head">condition_of_submission</span> : {{condition_of_submission_scholarship}}<br>
                    <span id="text-head">current status</span> : <span class="bg-success text-white">เสร็จสิ้น<br></span>
                </section>
                <footer class="modal-card-foot">
                    <!-- footer modal detail -->
                </footer>
            </div>
        </div>
        <!-- modal show detail ! register ! -->
        <div class="modal" :class = "{ 'is-active' : modal_register }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title" style="padding-top: 20px;">Detail Report Form ID: {{report_form_id_register}} register</p>
                <button class="delete" aria-label="close"  @click='modal_register = false'></button>
                </header>
                <section class="modal-card-body" style="font-size:20px; font-weight: 300; color:white">
                    <span id="text-head">report_form_id</span> : {{report_form_id_register}}<br>
                    <span id="text-head">report_form_date_time</span> : {{report_form_date_time_register}}<br>
                    <span id="text-head">report_form_topic</span> : {{report_form_topic_register}}<br>
                    <span id="text-head">type</span> : {{type_register}}<br>
                    <span id="text-head">user student ID</span> : {{user_reprot_register}}<br>
                    <span id="text-head">regis_subject</span> : {{regis_subject}}<br>
                    <span id="text-head">problem_description</span> : {{problem_description_register}}<br>
                    <span id="text-head">condition_of_submission</span> : {{condition_of_submission_register}}<br>
                    <span id="text-head">current status</span> : <span class="bg-success text-white">เสร็จสิ้น<br></span>
                </section>
                <footer class="modal-card-foot">
                    <!-- footer modal detail -->
                </footer>
            </div>
        </div>
        <!-- modal show detail ! environment ! -->
        <div class="modal" :class = "{ 'is-active' : modal_environment }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title" style="padding-top: 20px;">Detail Report Form ID: {{report_form_id_environment}} environment</p>
                <button class="delete" aria-label="close" @click='modal_environment = false'></button>
                </header>
                <section class="modal-card-body" style="font-size:20px; font-weight: 300; color:white">
                    <span id="text-head">report_form_id</span> : {{report_form_id_environment}}<br>
                    <span id="text-head">report_form_date_time</span> : {{report_form_date_time_environment}}<br>
                    <span id="text-head">report_form_topic</span> : {{report_form_topic_environment}}<br>
                    <span id="text-head">type</span> : {{type_environment}}<br>
                    <span id="text-head">user student ID</span> : {{user_reprot_environment}}<br>
                    <span id="text-head">environment_location</span> : {{environment_location}}<br>
                    <span id="text-head">problem_description</span> : {{problem_description_environment}}<br>
                    <span id="text-head">condition_of_submission</span> : {{condition_of_submission_environment}}<br>
                    <span id="text-head">current status</span> : <span class="bg-success text-white">เสร็จสิ้น<br></span>
                </section>
                <footer class="modal-card-foot">
                    <!-- footer modal detail -->
                </footer>
            </div>
        </div>
        <footer id="footer">
            <div class="row">
                <div class="col-md-5">
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
import axios from "axios";
import Cookies from "js-cookie"
import { CURRENT_ADMIN_QUERY, CURRENT_USER_QUERY } from "../graphql"
export default {
    data() {
        return {
            permission: null,
            tokenAdmin: null,
            tokenUserError: null,
            currentAdmin: null,
            currentUser: null,
            // start
            data: null,
            report_form_all: [],
            report_form_all_copy: null,
            report_form_sociality: null,
            report_form_studying: null,
            report_form_scholarship: null,
            report_form_register: null,
            report_form_environment: null,
            filter: null,
            filterStatus: null,
            // problem sort
            problem: '',
            // Modal Action
            modal_nextStatus: false,
            modal_Notpass: false,
            modal_delete: false,
            // Modal show detail
            modal_sociality: false,
            modal_studying: false,
            modal_scholarship: false,
            modal_register: false,
            modal_environment: false,
            // report form Action id
            formid_nextStatus: null,
            formid_Notpass: null,
            formid_delete: null,
            // Action status
            form_status_current: null,
            form_status_next: null,
            form_status_delete: null,
            // detail sociality
            report_form_id_sociality: null,
            report_form_date_time_sociality: null,
            report_form_topic_sociality: null,
            type_sociality: null,
            user_reprot_sociality: null,
            social_location: null,
            problem_description_sociality: null,
            condition_of_submission_sociality: null,
            status_sociality: null,
            // detail studying
            report_form_id_studying: null,
            report_form_date_time_studying: null,
            report_form_topic_studying: null,
            type_studying: null,
            user_reprot_studying: null,
            studying_subject_id: null,
            problem_description_studying: null,
            condition_of_submission_studying: null,
            status_studying: null,
            // detail scholarship
            report_form_id_scholarship: null,
            report_form_date_time_scholarship: null,
            report_form_topic_scholarship: null,
            type_scholarship: null,
            user_reprot_scholarship: null,
            scholarship_type: null,
            problem_description_scholarship: null,
            condition_of_submission_scholarship: null,
            status_scholarship: null,
            // detail register
            report_form_id_register: null,
            report_form_date_time_register: null,
            report_form_topic_register: null,
            type_register: null,
            user_reprot_register: null,
            regis_subject: null,
            problem_description_register: null,
            condition_of_submission_register: null,
            status_register: null,
            // detail environment
            report_form_id_environment: null,
            report_form_date_time_environment: null,
            report_form_topic_environment: null,
            type_environment: null,
            user_reprot_environment: null,
            environment_location: null,
            problem_description_environment: null,
            condition_of_submission_environment: null,
            status_environment: null
        };
    },
    apollo: {
        currentAdmin: {
            query: CURRENT_ADMIN_QUERY
        },
        currentUser: {
            query: CURRENT_USER_QUERY
        }
    },
  created() {
    this.tokenAdmin = Cookies.get("tokenAdmin");
    this.tokenUserError = Cookies.get("tokenUser");
    if (this.tokenAdmin) {
      this.permission = "for admin";
    } else if (this.tokenUserError) {
      this.$swal({
        icon: "warning",
        title: "You can't access the admin, you are the user.! hahaha.",
        showConfirmButton: true,
      });
      this.$router.push({ name: "User" });
    } else {
      this.$swal({
        icon: "warning",
        title: "กรุณาล็อกอินก่อนเข้าใช้งาน",
        showConfirmButton: true,
      });
      Cookies.remove("tokenUser");
      Cookies.remove("tokenAdmin");
      this.$router.push({ name: "Home" });
    }
  },
    methods: {
        logout() {
        this.id = "";
        console.log("Log out!");
        this.$router.push({ name: "Home" });
        },
        reset_checkbox(){
            this.problem = ''
        },
        clear(){
            this.problem = ''
            if(this.filterStatus != null){
                return this.report_form_all = this.report_form_all_copy.filter(status => status.status === this.filterStatus);
            }
            else{
                return this.report_form_all = this.report_form_all_copy;
            }
        },
        filter_all(){
            this.reset_checkbox();
            this.filterStatus = null;
            this.report_form_all = this.report_form_all_copy;
        },
        filter_New(){
            this.reset_checkbox();
            this.filterStatus = 0;
            this.report_form_all = this.report_form_all_copy.filter(status => status.status == 0);
        },
        filter_Check(){
            this.reset_checkbox();
            this.filterStatus = 1;
            this.report_form_all = this.report_form_all_copy.filter(status => status.status == 1);
        },
        filter_InProgress(){
            this.reset_checkbox();
            this.filterStatus = 2;
            this.report_form_all = this.report_form_all_copy.filter(status => status.status == 2);
        },
        filter_Completed(){
            this.reset_checkbox();
            this.filterStatus = 3;
            this.report_form_all = this.report_form_all_copy.filter(status => status.status == 3);
        },
        filter_NotPass(){
            this.reset_checkbox();
            this.filterStatus = 4;
            this.report_form_all = this.report_form_all_copy.filter(status => status.status == 4);
        },
        problem_1(){
            if(this.filterStatus != null){
                this.report_form_all = this.report_form_all_copy.filter(types => types.type == 'การศึกษา' && types.status === this.filterStatus);
            }
            else{
                this.report_form_all = this.report_form_all_copy.filter(types => types.type == 'การศึกษา');
            }
        },
        problem_2(){
            if(this.filterStatus != null){
                this.report_form_all = this.report_form_all_copy.filter(types => types.type == 'ทุนการศึกษา' && types.status === this.filterStatus);
            }
            else{
                this.report_form_all = this.report_form_all_copy.filter(types => types.type == 'ทุนการศึกษา');
            }
        },
        problem_3(){
            if(this.filterStatus != null){
                this.report_form_all = this.report_form_all_copy.filter(types => types.type == 'สภาพสังคม' && types.status === this.filterStatus);
            }
            else{
                this.report_form_all = this.report_form_all_copy.filter(types => types.type == 'สภาพสังคม');
            }
        },
        problem_4(){
            if(this.filterStatus != null){
                this.report_form_all = this.report_form_all_copy.filter(types => types.type == 'การลงทะเบียนเรียน' && types.status === this.filterStatus);
            }
            else{
                this.report_form_all = this.report_form_all_copy.filter(types => types.type == 'การลงทะเบียนเรียน');
            }
        },
        problem_5(){
            if(this.filterStatus != null){
                this.report_form_all = this.report_form_all_copy.filter(types => types.type == 'สภาพแวดล้อม' && types.status === this.filterStatus);
            }
            else{
                this.report_form_all = this.report_form_all_copy.filter(types => types.type == 'สภาพแวดล้อม');
            }
        },
        check_nextStatus(report_form_id, status){
            this.formid_nextStatus = report_form_id;
            if(status == 0){this.form_status_current = 'เรื่องร้องเรียนใหม่'; this.form_status_next = 'กำลังตรวจสอบ';}
            if(status == 1){this.form_status_current = 'กำลังตรวจสอบ'; this.form_status_next = 'กำลังดำเนินการ'}
            if(status == 2){this.form_status_current = 'กำลังดำเนินการ'; this.form_status_next = 'เสร็จสิ้น'}
            if(status == 4){this.form_status_current = 'ไม่ผ่าน'; this.form_status_next = 'เรื่องร้องเรียนใหม่'}
            this.modal_nextStatus = true;
        },
        check_Notpass(report_form_id, status){
            this.formid_Notpass = report_form_id
            if(status == 0){this.form_status_current = 'เรื่องร้องเรียนใหม่';}
            if(status == 1){this.form_status_current = 'กำลังตรวจสอบ';}
            if(status == 2){this.form_status_current = 'กำลังดำเนินการ';}
            this.modal_Notpass = true;
        },
        check_delete(report_form_id, status){
            this.formid_delete = report_form_id
            if(status == 3){this.form_status_delete = 'เสร็จสิ้น'}
            if(status == 4){this.form_status_delete = 'ไม่ผ่าน'}
            this.modal_delete = true;
        },
        nextStatus(report_id){
            this.modal_nextStatus = false;
            axios.put("http://localhost:5000/actionReport/nextStatus/"+report_id)
            .then(() =>{
                // location.reload();
                for(let j = 0 ; j < this.report_form_all.length ; j++){
                    if(this.report_form_all[j].report_form_id == report_id && this.report_form_all[j].status != 4){
                        this.report_form_all[j].status += 1;
                    }
                    else if(this.report_form_all[j].report_form_id == report_id && this.report_form_all[j].status == 4){
                        this.report_form_all[j].status = 0;
                    }
                }
                if(this.filterStatus != null){
                    this.report_form_all = this.report_form_all_copy.filter(status => status.status == this.filterStatus);
                }
                else{this.report_form_all = this.report_form_all_copy;}
            }).catch((err) => {
                console.log(err);
            })
        },
        NotPass(report_id){
            this.modal_Notpass = false;
            axios.put("http://localhost:5000/actionReport/NotpassStatus/"+report_id)
            .then(() =>{
                for(let j = 0 ; j < this.report_form_all.length ; j++){
                    if(this.report_form_all[j].report_form_id == report_id){
                        this.report_form_all[j].status = 4;
                    }
                }
                if(this.filterStatus != null){
                    this.report_form_all = this.report_form_all_copy.filter(status => status.status == this.filterStatus);
                }
                else{this.report_form_all = this.report_form_all_copy;}            
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteReport(report_id){
            this.modal_delete = false;
            axios.delete("http://localhost:5000/actionReport/delete/"+report_id)
            .then((response) =>{
                for(let j = 0 ; j < this.report_form_all.length ; j++){
                    if(this.report_form_all[j].report_form_id == report_id){
                        this.report_form_all.splice(j, 1);
                    }
                }
                this.$swal({
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 2000
                })
            }).catch((err) => {
                console.log(err);
            })
        },
        show_detail(report_id, type){
            if(type == 'สภาพสังคม'){
                this.modal_sociality = true;
                for(let j = 0; j < this.report_form_sociality.length ; j++){
                    if(this.report_form_sociality[j].report_form_id == report_id){
                        this.report_form_id_sociality = this.report_form_sociality[j].report_form_id
                        this.report_form_date_time_sociality = this.report_form_sociality[j].report_form_date_time
                        this.report_form_topic_sociality = this.report_form_sociality[j].report_form_topic
                        this.type_sociality = this.report_form_sociality[j].type
                        this.user_reprot_sociality = this.report_form_sociality[j].user_studentid
                        this.social_location = this.report_form_sociality[j].social_location
                        this.problem_description_sociality = this.report_form_sociality[j].problem_description
                        this.condition_of_submission_sociality = this.report_form_sociality[j].condition_of_submission
                        this.status_sociality = this.report_form_sociality[j].status
                    }
                }
            }
            if(type == 'การศึกษา'){
                this.modal_studying = true;
                for(let j = 0; j < this.report_form_studying.length ; j++){
                    if(this.report_form_studying[j].report_form_id == report_id){
                        this.report_form_id_studying= this.report_form_studying[j].report_form_id
                        this.report_form_date_time_studying = this.report_form_studying[j].report_form_date_time
                        this.report_form_topic_studying = this.report_form_studying[j].report_form_topic
                        this.type_studying = this.report_form_studying[j].type
                        this.user_reprot_studying = this.report_form_studying[j].user_studentid
                        this.studying_subject_id = this.report_form_studying[j].studying_subject_id
                        this.problem_description_studying = this.report_form_studying[j].problem_description
                        this.condition_of_submission_studying = this.report_form_studying[j].condition_of_submission
                        this.status_studying = this.report_form_studying[j].status
                    }
                }
            }
            if(type == 'ทุนการศึกษา'){
                this.modal_scholarship = true;
                for(let j = 0; j < this.report_form_scholarship.length ; j++){
                    if(this.report_form_scholarship[j].report_form_id == report_id){
                        this.report_form_id_scholarship= this.report_form_scholarship[j].report_form_id
                        this.report_form_date_time_scholarship = this.report_form_scholarship[j].report_form_date_time
                        this.report_form_topic_scholarship = this.report_form_scholarship[j].report_form_topic
                        this.type_scholarship = this.report_form_scholarship[j].type
                        this.user_reprot_scholarship = this.report_form_scholarship[j].user_studentid
                        this.scholarship_type = this.report_form_scholarship[j].scholarship_type
                        this.problem_description_scholarship= this.report_form_scholarship[j].problem_description
                        this.condition_of_submission_scholarship = this.report_form_scholarship[j].condition_of_submission
                        this.status_scholarship = this.report_form_scholarship[j].status
                    }
                }
            }
            if(type == 'การลงทะเบียนเรียน'){
                this.modal_register = true;
                for(let j = 0; j < this.report_form_register.length ; j++){
                    if(this.report_form_register[j].report_form_id == report_id){
                        this.report_form_id_register= this.report_form_register[j].report_form_id
                        this.report_form_date_time_register = this.report_form_register[j].report_form_date_time
                        this.report_form_topic_register = this.report_form_register[j].report_form_topic
                        this.type_register = this.report_form_register[j].type
                        this.user_reprot_register = this.report_form_register[j].user_studentid
                        this.regis_subject = this.report_form_register[j].regis_subject
                        this.problem_description_register = this.report_form_register[j].problem_description
                        this.condition_of_submission_register = this.report_form_register[j].condition_of_submission
                        this.status_register = this.report_form_register[j].status
                    }
                }
            }
            if(type == 'สภาพแวดล้อม'){
                this.modal_environment = true;
                for(let j = 0; j < this.report_form_environment.length ; j++){
                    if(this.report_form_environment[j].report_form_id == report_id){
                        this.report_form_id_environment= this.report_form_environment[j].report_form_id
                        this.report_form_date_time_environment = this.report_form_environment[j].report_form_date_time
                        this.report_form_topic_environment = this.report_form_environment[j].report_form_topic
                        this.type_environment = this.report_form_environment[j].type
                        this.user_reprot_environment = this.report_form_environment[j].user_studentid
                        this.environment_location = this.report_form_environment[j].environment_location
                        this.problem_description_environment = this.report_form_environment[j].problem_description
                        this.condition_of_submission_environment = this.report_form_environment[j].condition_of_submission
                        this.status_environment = this.report_form_environment[j].status
                    }
                }
            }
        }
    },
};
</script>

<style scoped>
    #button {
        width: 150px;
        border-color:rgb(230, 230, 230);
        color: black;
    }
    #button:hover{
        font-size: 16px;
        color: white;
        border-color: rgb(72, 72, 72);
    }
    .box{
        margin: 40px 20px 0px 20px; 
        margin-bottom: -100px;
        background-color: rgb(20, 30, 120);
    }
    /* scrolling vertical tbody res */
    .table-fixed{
        background-color:rgb(58, 58, 58);
    }
    .table-fixed thead {
        background-color:rgb(58, 58, 58);
        overflow-y: auto;
        width: 98.5%;
    }
    .table-fixed tbody{
        max-height: 300px;
        overflow-y: auto;
        width: 100%;
    }
    .table-fixed thead,
    .table-fixed tbody,
    .table-fixed tr,
    .table-fixed td,
    .table-fixed th {
        display: block;
    }
    .table-fixed tbody td,
    .table-fixed tbody th,
    .table-fixed thead > th {
        float: left;
        position: relative;
    }
    .table-fixed::after{
        content: '';
        clear: both;
        display: block;
    }
    .head-table{
        background-color:blue;
    }
    h1{
        font-weight: 800;
    }
    .form-check{
        padding-top: 10px;
    }
    .form-check-label{
        font-size:13px;
        color:yellowgreen;
    }
    /* head sort */
    .separator {
        display: flex;
        align-items: center;
        text-align: center;
        color: rgb(255, 255, 255);
    }

    .separator::before,
    .separator::after {
        content: '';
        flex: 1;
        border-bottom: 2px solid rgb(128, 128, 128);
    }

    .separator:not(:empty)::before {
        margin-right: .25em;
    }

    .separator:not(:empty)::after {
        margin-left: .25em;
    }
    .fa-user-plus{
        color:rgb(0, 0, 200);
    }
    .modal-card-head{
        height: 60px;
        background-color: rgb(80, 255, 255);
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
    }
    .modal-card-body{
        background-color: rgb(80, 80, 80);
    }
     .modal-card-foot{
        height: 30px;
        background-color: rgb(80, 255, 255);
    }
    #text-head{
        font-weight: 400;
        color:rgb(200, 150, 20);
    }
    #setcolor{
        color: black;
    }

    /* topnav_manage only login && reg */

    .topnav_manage{
        color:#fff;
        display:flex;
        justify-content: space-between;
    }
    .topnav_manage ul{
        display: flex;
        justify-content: space-around;
        padding-top: 10px;
        padding-right: 20px;  
    }
    .topnav_manage li{
        list-style: none;        
    }
    .topnav_manage #comp1 a{
        color: #fff;
        text-decoration: none;
        font-size: 20px;
        font-weight: 200;
        padding: 5px 12px;
    }
    .topnav_manage #comp1 a:hover{
        color: orange;
        text-decoration: none;
    }
    .topnav_manage #comp2 a{
        color: #fff;
        text-decoration: none;
        font-size: 20px;
        font-weight: 700;
        padding: 5px 12px;
    }
    .topnav_manage #comp2 a:hover{
        color: yellow;
        text-decoration: none;
    }

    .topnav_manage #comp3{
        color:white; 
        background-color:#e4af01;
        margin-right: 20px; 
        margin-left: 10px; 
    }

    .topnav_manage #comp3:hover{
        background-color:#f7d12b; 
    }

    .topnav_manage::before{
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

    .topnav_manage > * {
        z-index: 100;
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
</style>