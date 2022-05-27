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
                        <p type="button" id="button" class="btn btn-secondary" @click="problem_status = 'all'">All</p>
                    </div>
                    <div class="col-md-2">
                        <p type="button" id="button" class="btn btn-primary" @click="problem_status = 'Received'">เรื่องร้องเรียนใหม่</p>
                    </div>
                    <div class="col-md-2">
                        <p type="button" id="button" class="btn btn-warning" @click="problem_status = 'In_Progress'">กำลังตรวจสอบ</p>
                    </div>
                    <div class="col-md-2">
                        <p type="button" id="button" class="btn btn-info" @click="problem_status = 'Accepted'">กำลังดำเนินการ</p>
                    </div>
                    <div class="col-md-2">
                        <p type="button" id="button" class="btn btn-danger" @click="problem_status = 'Declined'">ไม่ผ่าน</p>
                    </div>
                    <div class="col-md-2">
                        <p type="button" id="button" class="btn btn-success" @click="problem_status = 'Completed'">เสร็จสิ้น</p>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top: 20px;">
                <div class="div col-md-10">
                    <div class="table-responsive">
                        <table class="table table-bordered table-fixed table-hover">
                            <thead class="thead-dark" style="text-align:center;">
                                <th scope="col" class="col-md-1">ID</th>
                                <th scope="col" class="col-md-3">Date</th>
                                <th scope="col" class="col-md-3">ประเภทเรื่องร้องเรียน</th>
                                <th scope="col" class="col-md-4">Title</th>
                                <th scope="col" class="col-md-1">Action</th>
                            </thead>
                            <tbody>
                                <tr v-for='(report, index) in allReport(Reports)' :key="report._id" :class="{'table-primary': report.submission_status == 'Received', 'table-warning': report.submission_status == 'In_Progress', 'table-info': report.submission_status == 'Accepted', 'table-success': report.submission_status == 'Completed', 'table-danger': report.submission_status == 'Declined'}">
                                    <td style="height: 70px; padding: 20px 0px 20px 30px;" scope="col" class="col-md-1">{{index + 1}}</td>
                                    <td style="height: 70px; padding: 10px 0px 20px 10px;" scope="col" class="col-md-3">{{changeDate(report.createdAt)}}</td>
                                    <td style="height: 70px; padding: 10px 0px 20px 10px;" scope="col" class="col-md-3">{{report.type}}</td>
                                    <td style="height: 70px; padding: 10px 0px 20px 10px;" scope="col" class="col-md-4" v-html="report.topic"></td>
                                    <td style="height: 70px; padding: 20px 0px 20px 10px;" scope="col" id="td_action" class="col-md-1">
                                        <a v-show="report.submission_status != 'Completed' && report.submission_status != 'Declined'" @click="check_nextStatus(report._id, report.topic, report.submission_status, report.type)"><i class="fas fa-caret-square-right" style="color:blue; font-size:20px; margin: 0px 15px 0px 5px"></i></a>
                                        <a v-show="report.submission_status != 'Completed' && report.submission_status != 'Declined'" @click="check_Notpass(report._id, report.topic, report.submission_status,  report.type)"><i class="fas fa-ban" style="color:red; font-size:20px;"></i></a>
                                        <a v-show="report.submission_status == 'Completed'" @click="show_detail(report._id, report.type)"><i class="fas fa-search" style="color:blue; font-size:20px; margin: 0px 15px 0px 5px"></i></a>
                                        <a v-show="report.submission_status == 'Declined'" @click="check_nextStatus(report._id, report.topic, report.submission_status,  report.type)"><i class="fas fa-undo" style="color:blue; font-size:20px; margin: 0px 15px 0px 5px"></i></a>
                                        <a v-show="report.submission_status == 'Completed' || report.submission_status == 'Declined'" @click="check_delete(report._id, report.topic, report.submission_status,  report.type)"><i class="fas fa-times-circle" style="color:red; font-size:20px;"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="div col-md-2" style="margin-top: 10px">
                    <div class="separator">Filter by problem</div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="check1" id="check1" value="all" v-model="problem_type">
                        <label class="form-check-label">
                            ทุกประเภท
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="check1" id="check1" value="studying" v-model="problem_type">
                        <label class="form-check-label">
                            ปัญหาด้านการเรียน
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="check2" id="check2" value="scholarship" v-model="problem_type">
                        <label class="form-check-label">
                            ปัญหาด้านทุนการศึกษา
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="check3" id="check3" value="sociality" v-model="problem_type">
                        <label class="form-check-label">
                            ปัญหาด้านสังคม
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="check4" id="check4" value="register_system" v-model="problem_type">
                        <label class="form-check-label">
                            ปัญหาด้านระบบการลงทะเบียน
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="check5" id="check5" value="environment" v-model="problem_type">
                        <label class="form-check-label">
                            ปัญหาด้านสภาพสิ่งแวดล้อม
                        </label>
                    </div>
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
                            <span>รายละเอียด</span><br><br>
                            <span id="text-head">วันที่ยื่น Report</span> : {{report_form_date_time}}<br>
                            <span id="text-head">ประเภทของปัญหา</span> : {{type_report}}<br>
                            <span id="text-head" v-if="social_location">สถานที่ที่ร้องเรียน</span>
                                <span v-if="social_location"> : {{social_location}}</span>
                            <span id="text-head" v-if="studying_subject_id">รหัสวิชาที่ร้องเรียน</span>
                                <span v-if="studying_subject_id">  : {{studying_subject_id}}</span>
                            <span id="text-head" v-if="scholarship_type">ประเภทของทุนการศึกษา</span>
                                <span v-if="scholarship_type">  : {{scholarship_type}}</span>
                            <span id="text-head" v-if="regis_subject">รหัสวิชาที่ร้องเรียน</span>
                                <span v-if="regis_subject"> : {{regis_subject}}</span>
                            <span id="text-head" v-if="environment_location">สถานที่ที่ร้องเรียน</span>
                                <span v-if="environment_location"> : {{environment_location}}</span>
                            <br>
                            <span id="text-head">คำอธิบาย</span> : {{problem_description}}<br>
                            <span id="text-head">เงื่อนไขในการร้องเรียน</span> : {{condition_of_submission}}<br><br>
                            <template v-if="form_status_current == 'ไม่ผ่าน'">
                                คุณต้องการที่จะส่ง Report : "{{form_name}}" ไปยัง Status เริ่มต้น ?<br>
                                current status: <span id="setcolor" class="bg-danger">{{form_status_current}}</span> <i class="fas fa-arrow-right"></i> status next: <span id="setcolor" class="bg-primary">{{form_status_next}}</span>
                            </template>
                            <template v-else>
                                คุณต้องการที่จะส่ง Report : "{{form_name}}"  ไปยัง Status ถัดไป?<br>
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
                            <span>รายละเอียด</span><br><br>
                            <span id="text-head">วันที่ยื่น Report</span> : {{report_form_date_time}}<br>
                            <span id="text-head">ประเภทของปัญหา</span> : {{type_report}}<br>
                            <span id="text-head" v-if="social_location">สถานที่ที่ร้องเรียน</span>
                                <span v-if="social_location"> : {{social_location}}</span>
                            <span id="text-head" v-if="studying_subject_id">รหัสวิชาที่ร้องเรียน</span>
                                <span v-if="studying_subject_id">  : {{studying_subject_id}}</span>
                            <span id="text-head" v-if="scholarship_type">ประเภทของทุนการศึกษา</span>
                                <span v-if="scholarship_type">  : {{scholarship_type}}</span>
                            <span id="text-head" v-if="regis_subject">รหัสวิชาที่ร้องเรียน</span>
                                <span v-if="regis_subject"> : {{regis_subject}}</span>
                            <span id="text-head" v-if="environment_location">สถานที่ที่ร้องเรียน</span>
                                <span v-if="environment_location"> : {{environment_location}}</span>
                            <br>
                            <span id="text-head">คำอธิบาย</span> : {{problem_description}}<br>
                            <span id="text-head">เงื่อนไขในการร้องเรียน</span> : {{condition_of_submission}}<br><br>
                            คุณต้องการที่จะส่ง Report : "{{form_name}}"  ไปยัง Status "ไม่ผ่าน" ?<br>
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
                            คุณต้องการที่จะลบ Report : "{{form_name}}"  status: <span id="setcolor" :class="{'bg-danger': form_status_delete == 'ไม่ผ่าน', 'bg-success': form_status_delete == 'เสร็จสิ้น'}">{{form_status_delete}}</span> ออกจากระบบ ?
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
        <!-- modal show report detail !-->
        <div class="modal" :class = "{ 'is-active' : modal_detail }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title" style="padding-top: 20px;">Detail Report : {{report_form_topic}}</p>
                    <button class="delete" aria-label="close"  @click='modal_detail = false'></button>
                </header>
                <section class="modal-card-body" style="font-size:20px; font-weight: 300; color:white">
                    <span id="text-head">วันที่ยื่น Report</span> : {{report_form_date_time}}<br>
                    <span id="text-head">ประเภทของปัญหา</span> : {{type_report}}<br>
                    <span id="text-head" v-if="social_location">สถานที่ที่ร้องเรียน</span>
                        <span v-if="social_location"> : {{social_location}}</span>
                    <span id="text-head" v-if="studying_subject_id">รหัสวิชาที่ร้องเรียน</span>
                        <span v-if="studying_subject_id">  : {{studying_subject_id}}</span>
                    <span id="text-head" v-if="scholarship_type">ประเภทของทุนการศึกษา</span>
                        <span v-if="scholarship_type">  : {{scholarship_type}}</span>
                    <span id="text-head" v-if="regis_subject">รหัสวิชาที่ร้องเรียน</span>
                        <span v-if="regis_subject"> : {{regis_subject}}</span>
                    <span id="text-head" v-if="environment_location">สถานที่ที่ร้องเรียน</span>
                        <span v-if="environment_location"> : {{environment_location}}</span>
                    <br>
                    <span id="text-head">คำอธิบาย</span> : {{problem_description}}<br>
                    <span id="text-head">เงื่อนไขในการร้องเรียน</span> : {{condition_of_submission}}<br>
                    <span id="text-head">สถานะของคำร้องเรียน</span> : <span class="bg-success text-white">เสร็จสิ้น<br></span>
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
import Cookies from "js-cookie"
import { CURRENT_ADMIN_QUERY, CURRENT_USER_QUERY, REPORTS_FROM_TYPE_QUERY, EDIT_REPORTS_MUTATION, REMOVE_REPORTS_MUTATION } from "../graphql"
export default {
    data() {
        return {
            permission: null,
            tokenAdmin: null,
            tokenUserError: null,
            currentAdmin: null,
            currentUser: null,
            Reports: null,
            problem_type: 'all',
            problem_status: 'all',
            formid_nextStatus: null,
            formid_Notpass: null,
            formid_delete: null,
            form_status_current: null,
            form_status_next: null,
            form_status_delete: null,
            form_name: null,
            modal_nextStatus: false,
            modal_Notpass: false,
            modal_delete: false,
            modal_detail: false,
            report_form_date_time: null,
            report_form_topic: null,
            report_type: null,
            social_location: null,
            studying_subject_id: null,
            scholarship_type: null,
            regis_subject: null,
            environment_location: null,
            problem_description: null,
            condition_of_submission: null,
            status_report: null,
        };
    },
    apollo: {
        currentAdmin: {
            query: CURRENT_ADMIN_QUERY
        },
        currentUser: {
            query: CURRENT_USER_QUERY
        },
        Reports: {
            query: REPORTS_FROM_TYPE_QUERY
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
        console.log("Log out!");
        Cookies.remove("tokenAdmin")
        Cookies.remove("tokenUser")
        this.$router.push({ name: "Home" });
        },
        allReport(reports){
            if(this.problem_status == "all" && this.problem_type == "all"){
                console.log("all")
                return reports
            }
            else if(this.problem_status != "all" && this.problem_type == "all"){
                console.log("status")
                return reports.filter((x) => {return x.submission_status == this.problem_status})
            }
            else if(this.problem_status == "all" && this.problem_type != "all"){
                console.log("type")
                return reports.filter((x) => {return x.type == this.problem_type})
            }
            else if(this.problem_status != "all" && this.problem_type != "all"){
                console.log("status and type")
                return reports.filter((x) => {return x.type == this.problem_type && x.submission_status == this.problem_status})
            }
        },
        check_nextStatus(report_form_id, report_topic, status, report_type){
            this.formid_nextStatus = report_form_id;
            this.form_name = report_topic
            this.setShowDetail(report_form_id, report_type)
            if(status == "Received"){this.form_status_current = 'เรื่องร้องเรียนใหม่'; this.form_status_next = 'กำลังตรวจสอบ';}
            if(status == "In_Progress"){this.form_status_current = 'กำลังตรวจสอบ'; this.form_status_next = 'กำลังดำเนินการ'}
            if(status == "Accepted"){this.form_status_current = 'กำลังดำเนินการ'; this.form_status_next = 'เสร็จสิ้น'}
            if(status == "Declined"){this.form_status_current = 'ไม่ผ่าน'; this.form_status_next = 'เรื่องร้องเรียนใหม่'}
            this.modal_nextStatus = true;
        },
        check_Notpass(report_form_id, report_topic, status, report_type){
            this.formid_Notpass = report_form_id
            this.form_name = report_topic
            this.setShowDetail(report_form_id, report_type)
            if(status == "Received"){this.form_status_current = 'เรื่องร้องเรียนใหม่';}
            if(status == "In_Progress"){this.form_status_current = 'กำลังตรวจสอบ';}
            if(status == "Accepted"){this.form_status_current = 'กำลังดำเนินการ';}
            this.modal_Notpass = true;
        },
        check_delete(report_form_id, report_topic, status, report_type){
            this.formid_delete = report_form_id
            this.form_name = report_topic
            this.setShowDetail(report_form_id, report_type)
            if(status == "Completed"){this.form_status_delete = 'เสร็จสิ้น'}
            if(status == "Declined"){this.form_status_delete = 'ไม่ผ่าน'}
            this.modal_delete = true;
        },
        nextStatus(report_id){
            let use_status = ""
            if(this.form_status_current == 'เรื่องร้องเรียนใหม่'){use_status = "In_Progress"}
            else if(this.form_status_current == 'กำลังตรวจสอบ'){use_status = "Accepted"}
            else if(this.form_status_current == 'กำลังดำเนินการ'){use_status = "Completed"}
            else if(this.form_status_current == 'ไม่ผ่าน'){use_status = "Received"}
            this.$apollo.mutate({
                mutation: EDIT_REPORTS_MUTATION,
                variables: {
                    id : report_id,
                    record: {
                        submission_status : use_status
                    }
                }
            })
            .then(() => {
                this.$apollo.queries.Reports.refetch()
                this.modal_nextStatus = false;
            })
        },
        NotPass(report_id){
            this.$apollo.mutate({
                mutation: EDIT_REPORTS_MUTATION,
                variables: {
                    id : report_id,
                    record: {
                        submission_status : "Declined"
                    }
                }
            })
            .then(() => {
                this.$apollo.queries.Reports.refetch()
                this.modal_Notpass = false;
            })
        },
        deleteReport(report_id){
            this.$apollo.mutate({
                mutation: REMOVE_REPORTS_MUTATION,
                variables: {
                    id: report_id
                }
            })
            .then(() => {
                this.$apollo.queries.Reports.refetch()
                this.modal_delete = false;
            })
        },
        thaiCommission(commis){
            if(commis == "Not_Urgent"){
                return "ไม่ด่วน"
            }
            else if(commis == "Urgent"){
                return "ด่วน"
            }
        },
        thaiType(type){
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
        changeDate(date){
            return new Date(date).toLocaleString("th-TH")
        },
        setShowDetail(report_id, type){
            this.social_location = null
            this.studying_subject_id = null
            this.scholarship_type = null
            this.regis_subject = null
            this.environment_location = null
            let data = this.Reports.filter((x) =>{return x._id == report_id})[0]
            if(type == "sociality"){
                this.social_location = data.target
            }
            else if(type == "studying"){
                this.studying_subject_id = data.target
            }
            else if(type == "scholarship"){
                this.scholarship_type = data.target
            }
            else if(type == "register_system"){
                this.regis_subject = data.target
            }
            else if(type == "environment"){
                this.environment_location = data.target
            }
            this.report_form_date_time = this.changeDate(data.createdAt)
            this.report_form_topic = data.topic
            this.type_report = this.thaiType(data.type)
            this.problem_description = data.description
            this.condition_of_submission = this.thaiCommission(data.condition_of_submission)
            this.status_report = data.submission_status
        },
        show_detail(report_id, type){
            this.setShowDetail(report_id, type)
            this.modal_detail = true;
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