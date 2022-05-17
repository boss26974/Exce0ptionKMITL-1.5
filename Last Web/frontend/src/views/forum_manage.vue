<template>
    <div id="body">
        <div class="banner" >
          <div class="topnav_manage">
              <a href="/admin"><img src="/image/navbar/newlogo.png" width="110px" height="auto" style="padding-left: 20px;" alt=""></a>
              <ul>
                  <div id="MyClockDisplay" class="clock"></div>
                  <li id="comp1" v-if="manage_acc == 1"><a href="/manageUser">Manage User</a></li>
                  <li id="comp1" v-if="manage_standand == 1"><a href="/manageforum">Manage Forum</a></li>
                  <li id="comp1" v-if="manage_standand == 1"><a href="/manageReport">Manage Report</a></li>
                  <div class="dropdown">
                      <button class="btn btn-danger  dropdown-toggle" id="comp3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="fa fa-user-plus"></i> {{id}}
                      </button>
                      <p class="dropdown-menu" >
                          <button class="dropdown-item text-danger" type="button" @click="logout()">ออกจากระบบ</button>
                      </p>
                  </div>
              </ul>
          </div>
      </div>
        <div class="container" id="all_forum_manage">
            <p id="forum_manage_title">Manage forum</p>
            <div class="row">
                <div class="col-9">
                    <table id="forum_manage_table" class="table">
                        <thead>
                            <tr>
                                <th id="table_head">Forum ID</th>
                                <th colspan="2" id="table_head">Forum Title</th>
                                <th id="table_head">Forum picture link</th>
                                <th colspan="2" id="table_head">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="forum in filterforum" :key="forum.forum_id">
                                <td id="table_body">{{forum.forum_id}}</td>
                                <td colspan="2" id="table_body">{{forum.forum_topic}}</td>
                                <td id="table_body"><button class="btn btn-primary" @click="gotopicture(forum.image_address, forum.forum_topic)" data-toggle="modal" data-target=".picture-modal-xl">click here</button></td>
                                <td id="table_body">
                                    <button id="btn" class="btn btn-success" @click="editopen(forum.forum_id)" data-toggle="modal" data-target=".edit-modal-xl">Edit</button>
                                    <button id="btn" class="btn btn-danger" @click="deleteopen(forum.forum_id)" data-toggle="modal" data-target="#deleteforum">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-3" id="forum_type">
                    <p id="forum_manage_type_title">เลือกประเภทของ forum</p>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="education_select" id="education_checkbox">
                        <label class="form-check-label" for="education_checkbox">การศึกษา (Education)</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="part_time_select" id="education_checkbox">
                        <label class="form-check-label" for="education_checkbox">งานพาร์ทไทน์ (Part-time Job) </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="environment_select" id="education_checkbox">
                        <label class="form-check-label" for="education_checkbox">สภาพแวดล้อม (environment) </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="register_select" id="education_checkbox">
                        <label class="form-check-label" for="education_checkbox">การลงทะเบียนเรียน (Register) </label>
                    </div>
                    <div class="form-check" style="margin-bottom: 4%;">
                        <input class="form-check-input" type="checkbox" v-model="scholarship_select" id="education_checkbox">
                        <label class="form-check-label" for="education_checkbox">ทุนการศึกษา (Scholarship) </label>
                    </div>
                    <button id="btn_create" class="btn btn-success" data-toggle="modal" data-target=".create-modal-xl" @click="close_modal_button">Create</button>
                </div>
            </div>
        </div>

        <div class="modal fade picture-modal-xl" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content" id="allmodal">
                    <p id="modal_title">{{forum_topic}}</p>
                    <img :src="image_address">
                </div>
            </div>
        </div>
        
        <div class="modal fade create-modal-xl" tabindex="-1" role="dialog" aria-hidden="true" id="createmodal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content" id="allmodal">
                    <p id="modal_title">สร้างข่าวประชาสัมพันธ์ใหม่</p>
                    <div class="form-group row">
                        <label for="inputtopic" class="col-sm-1 col-form-label">หัวข้อ</label>
                        <div class="col-sm-11">
                            <input v-model="$v.forum_topic.$model" type="text" class="form-control" :class="{'is-invalid' : $v.forum_topic.$error}" id="inputtopic" placeholder="ใส่หัวข้อที่นี่">
                            <template v-if="$v.forum_topic.$error">
                                <p id="error-message" v-if="!$v.forum_topic.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                                <p id="error-message" v-if="!$v.forum_topic.minLength">*เนื้อหาควรมีความยาวไม่ต่ำกว่า 10 ตัวอักษร</p>
                                <p id="error-message" v-if="!$v.forum_topic.maxLength">*เนื้อหาควรมีความยาวไม่เกิน 255 ตัวอักษร</p>
                            </template>
                        </div>
                    </div>
                    <br>
                    <div class="form-group">
                        <label for="report_topic">เนื้อหา</label>
                        <textarea v-model="$v.forum_description.$model" class="form-control" :class="{'is-invalid' : $v.forum_description.$error}" id="report_description" rows="5" aria-describedby="reporttopichelp" placeholder="ใส่เนื้อหาที่นี่"></textarea>
                        <template v-if="$v.forum_description.$error">
                            <p id="error-message" v-if="!$v.forum_description.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                            <p id="error-message" v-if="!$v.forum_description.minLength">*เนื้อหาควรมีความยาวไม่ต่ำกว่า 50 ตัวอักษร</p>
                        </template>
                    </div>
                    <br>
                    <div class="form-group">
                        <p>ประเภท</p>
                        <button @click="forum_type = 'การศึกษา'" class="btn" :class="{'btn-primary' : forum_type == 'การศึกษา', 'btn-secondary' : forum_type != 'การศึกษา'}" id="type_button">การศึกษา</button>
                        <button @click="forum_type = 'งานพาร์ทไทน์'" class="btn" :class="{'btn-primary' : forum_type == 'งานพาร์ทไทน์', 'btn-secondary' : forum_type != 'งานพาร์ทไทน์'}" id="type_button">งานพาร์ทไทน์</button>
                        <button @click="forum_type = 'สภาพแวดล้อม'" class="btn" :class="{'btn-primary' : forum_type == 'สภาพแวดล้อม', 'btn-secondary' : forum_type != 'สภาพแวดล้อม'}" id="type_button">สภาพแวดล้อม</button>
                        <button @click="forum_type = 'การลงทะเบียน'" class="btn" :class="{'btn-primary' : forum_type == 'การลงทะเบียน', 'btn-secondary' : forum_type != 'การลงทะเบียน'}" id="type_button">การลงทะเบียน</button>
                        <button @click="forum_type = 'ทุนการศึกษา'" class="btn" :class="{'btn-primary' : forum_type == 'ทุนการศึกษา', 'btn-secondary' : forum_type != 'ทุนการศึกษา'}" id="type_button">ทุนการศึกษา</button>
                    </div>
                    <template v-if="$v.forum_type.$error">
                        <p id="error-message" v-if="!$v.forum_type.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                    </template>
                    <br>
                    <div class="form-group row">
                        <label for="inputtopic" class="col-sm-3 col-form-label">Link รูปภาพประกอบ</label>
                        <div class="col-sm-9">
                            <input v-model="$v.image_address.$model" type="text" class="form-control" :class="{'is-invalid' : $v.image_address.$error}" id="inputtopic" placeholder="ใส่ลิ้งค์ที่นี่">
                            <template v-if="$v.image_address.$error">
                                <p id="error-message" v-if="!$v.image_address.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                                <p id="error-message" v-if="!$v.image_address.url">*ต้องใส่เป็น url เท่านั้น</p>
                            </template>
                        </div>
                    </div>
                    <br>
                    <div class="form-group">
                        <p>ประเภท</p>
                        <button class="btn btn-success" id="submit_btn" data-dismiss="modal" @click="realcreate">สร้าง</button>
                        <button class="btn btn-secondary" id="submit_btn" data-dismiss="modal" @click="close_modal_button">ปิด</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade edit-modal-xl" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content" id="allmodal">
                    <p id="modal_title">การแก้ไขข่าวประชาสัมพันธ์</p>
                    <div class="form-group row">
                        <label for="inputtopic" class="col-sm-1 col-form-label">หัวข้อ</label>
                        <div class="col-sm-11">
                            <input v-model="$v.forum_topic.$model" type="text" class="form-control" :class="{'is-invalid' : $v.forum_topic.$error}" id="inputtopic" placeholder="ใส่หัวข้อที่นี่">
                        </div>
                        <template v-if="$v.forum_topic.$error">
                            <p id="error-message" v-if="!$v.forum_topic.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                            <p id="error-message" v-if="!$v.forum_topic.minLength">*หัวข้อควรมีความยาวไม่ต่ำกว่า 10 ตัวอักษร</p>
                            <p id="error-message" v-if="!$v.forum_topic.maxLength">*เนื้อหาควรมีความยาวไม่เกิน 255 ตัวอักษร</p>
                        </template>
                    </div>
                    <br>
                    <div class="form-group">
                        <label for="report_topic">เนื้อหา</label>
                        <textarea v-model="$v.forum_description.$model" class="form-control" :class="{'is-invalid' : $v.forum_description.$error}" id="report_description" rows="5" aria-describedby="reporttopichelp" placeholder="ใส่เนื้อหาที่นี่"></textarea>
                        <template v-if="$v.forum_description.$error">
                            <p id="error-message" v-if="!$v.forum_description.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                            <p id="error-message" v-if="!$v.forum_description.minLength">*เนื้อหาควรมีความยาวไม่ต่ำกว่า 50 ตัวอักษร</p>
                        </template>
                    </div>
                    <br>
                    <div class="form-group">
                        <p>ประเภท</p>
                        <button @click="forum_type = 'การศึกษา'" class="btn" :class="{'btn-primary' : forum_type == 'การศึกษา', 'btn-secondary' : forum_type != 'การศึกษา'}" id="type_button">การศึกษา</button>
                        <button @click="forum_type = 'งานพาร์ทไทน์'" class="btn" :class="{'btn-primary' : forum_type == 'งานพาร์ทไทน์', 'btn-secondary' : forum_type != 'งานพาร์ทไทน์'}" id="type_button">งานพาร์ทไทน์</button>
                        <button @click="forum_type = 'สภาพแวดล้อม'" class="btn" :class="{'btn-primary' : forum_type == 'สภาพแวดล้อม', 'btn-secondary' : forum_type != 'สภาพแวดล้อม'}" id="type_button">สภาพแวดล้อม</button>
                        <button @click="forum_type = 'การลงทะเบียน'" class="btn" :class="{'btn-primary' : forum_type == 'การลงทะเบียน', 'btn-secondary' : forum_type != 'การลงทะเบียน'}" id="type_button">การลงทะเบียน</button>
                        <button @click="forum_type = 'ทุนการศึกษา'" class="btn" :class="{'btn-primary' : forum_type == 'ทุนการศึกษา', 'btn-secondary' : forum_type != 'ทุนการศึกษา'}" id="type_button">ทุนการศึกษา</button>
                    </div>
                    <template v-if="$v.forum_type.$error">
                            <p id="error-message" v-if="!$v.forum_type.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                    </template>

                    <br>
                    <div class="form-group row">
                        <label for="inputtopic" class="col-sm-3 col-form-label">Link รูปภาพประกอบ</label>
                        <div class="col-sm-9">
                            <input v-model="$v.image_address.$model" type="text" class="form-control" :class="{'is-invalid' : $v.image_address.$error}" id="inputtopic" placeholder="ใส่ลิ้งค์ที่นี่">
                        </div>
                        <template v-if="$v.image_address.$error">
                            <p id="error-message" v-if="!$v.image_address.required">*กรุณาเติมข้อมูลในช่องนี้</p>
                            <p id="error-message" v-if="!$v.image_address.url">*ต้องใส่เป็น url เท่านั้น</p>
                        </template>
                    </div>
                    <br>
                    <div class="form-group">
                        <p>ประเภท</p>
                        <button class="btn btn-success" id="submit_btn" data-dismiss="modal" @click="realedit">แก้ไข</button>
                        <button class="btn btn-secondary" id="submit_btn" data-dismiss="modal" @click="close_modal_button()">ปิด</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="deleteforum" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">ต้องการลบข่าวประชาสัมพันธ์เรื่อง<br>"{{forum_topic}}" หรือไม่</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close_modal_button">ปิด</button>
                <button type="button" class="btn btn-danger" @click="realdelete()" data-dismiss="modal">ลบ</button>
            </div>
            </div>
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

<script type="text/javascript">
import axios from "axios";
import {required, url, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
    data() {
        return{
            permission: null,
            tokenAdmin: null,
            tokenUserError: null,
            id: '',
            acc_id: '',
            manage_acc: null,
            manage_standand: null,
            allforum: [],
            forum_id: "",
            forum_topic: "",
            forum_description: "",
            forum_type: "การศึกษา",
            education_select: false,
            part_time_select: false,
            environment_select: false,
            register_select: false,
            scholarship_select: false,
            image_address: ""
        }
    },
    validations: {
        forum_topic: {
            required,
            minLength: minLength(10),
            maxLength: maxLength(255)
        },
        forum_description: {
            required,
            minLength: minLength(50)
        },
        forum_type: {
            required
        },
        image_address: {
            required,
            url
        }
    },
    created() {
        this.tokenAdmin = JSON.parse(localStorage.getItem('tokenAdmin'))
        this.tokenUserError = JSON.parse(localStorage.getItem('tokenUser'))
        if(this.tokenAdmin != null){
            this.permission = 'for admin'
            axios.post("http://localhost:5000/checkTokenLogin", {
                role: 'Admin',
                tokenAdmin: this.tokenAdmin
            }).then((response => {
                    if(response.data.message == 'You can pass! (Admin)'){
                        this.id = response.data.id
                        this.manage_acc = response.data.rule_manage_acc
                        this.manage_standand = response.data.rule_standand_admin
                        this.acc_id = response.data.acc_id
                    }
                    else{
                        this.$swal({
                            icon: 'warning',
                            title: 'Only Admin.',
                            showConfirmButton: true,
                        })
                        this.$router.push({ name: "Home" });
                    }
                    console.log(response)
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
            if(this.tokenUserError != null){
                this.$swal({
                    icon: 'warning',
                    title: 'Only Admin.',
                    showConfirmButton: true,
                })
                this.$router.push({ name: "Home" });
            }
            else{
                this.$swal({
                    icon: 'warning',
                    title: 'กรุณาล็อกอินก่อนเข้าใช้งาน (Only Admin)',
                    showConfirmButton: true,
                })
                this.$router.push({ name: "Home" });
            }
        }
        axios.get("http://localhost:5000/forum")
        .then((response) => {
            this.allforum = response.data;
        })
    },
    methods: {
        logout() {
            this.id = "";
            console.log("Log out!");
            this.$router.push({ name: "Home" });
        },
        gotopicture: function(url, topic){
            this.image_address = url;
            this.forum_topic = topic;
        },
        valiaftersubmit() {
            let special = ""

            if(!this.$v.forum_topic.required){
                special = "กรุณาใส่หัวข้อข่าวประชาสัมพันธ์"
            }
            else if(!this.$v.forum_topic.minLength){
                special = 'หัวข้อข่าวประชาสัมพันธ์ต้องมีความยาวไม่ต่ำกว่า 10 ตัวอักษร'
            }
            else if(!this.$v.forum_topic.maxLength){
                special = 'หัวข้อข่าวประชาสัมพันธ์ต้องมีความยาวไม่เกิน 255 ตัวอักษร'
            }
            else if(!this.$v.forum_description.required){
                special = 'กรุณาใส่เนื้อหาข่าวประชาสัมพันธ์'
            }
            else if(!this.$v.forum_description.minLength){
                special = 'หัวข้อข่าวประชาสัมพันธ์ต้องมีความยาวไม่ต่ำกว่า 50 ตัวอักษร'
            }
            else if(!this.$v.forum_type.required){
                special = 'กรุณาเลือกประเภทข่าวประชาสัมพันธ์'
            }
            else if(!this.$v.image_address.required){
                special = 'กรุณาใส่ลิ้งค์รูปภาพประกอบ'
            }
            else if(!this.$v.image_address.url){
                special = 'ลิ้งค์รูปภาพประกอบต้องใส่เป็น url เท่านั้น'
            }

            if(this.$v.$error){
                this.$swal({
                    title: 'ไม่สามารถสร้าง/แก้ไขข่าวประชาสัมพันธ์',
                    text: special,
                    icon: 'error',
                    confirmButtonText: 'ดำเนินการต่อ'
                });
            }
        },
        realcreate(){
            this.$v.$touch();

            this.valiaftersubmit();

            if(!this.$v.$invalid){
            let newdata = {
                forum_topic: this.forum_topic,
                forum_description: this.forum_description,
                forum_type: this.forum_type,
                acc_id: this.acc_id,
                image_address: this.image_address
            }
            axios
            .post("http://localhost:5000/forum/createforum", newdata)
            .then((response) => {
                this.forum_id = response.data;
                this.allforum.push(
                {
                    forum_id: this.forum_id,
                    forum_topic: this.forum_topic,
                    forum_description: this.forum_description,
                    forum_type: this.forum_type,
                    image_address: this.image_address
                }
            )
                this.$swal({
                    title: 'เพิ่มข่าวประชาสัมพันธ์สำเร็จ',
                    icon: 'success'
                });
            }).catch((err) => {alert(err);})
            this.close_modal_button;
            }
        },
        editopen: function(id){
            this.forum_id = id;
            this.allforum.map((x) => {
                if(x.forum_id == this.forum_id){
                    this.forum_topic = x.forum_topic;
                    this.forum_description = x.forum_description;
                    this.forum_type = x.forum_type;
                    this.image_address = x.image_address;
                }
            })
        },
        realedit(){
            this.$v.$touch();

            this.valiaftersubmit();

            if(!this.$v.$invalid){
            let newdata = {
                forum_topic: this.forum_topic,
                forum_description: this.forum_description,
                forum_type: this.forum_type,
                image_address: this.image_address
            }

            axios
            .put("http://localhost:5000/forum/" + this.forum_id, newdata)
            .then(() => {
                let forum_edit = this.allforum.map((x) => {
                if(x.forum_id == this.forum_id){
                    return {
                        forum_id: this.forum_id,
                        forum_topic: this.forum_topic,
                        forum_description: this.forum_description,
                        forum_type: this.forum_type,
                        image_address: this.image_address
                    }
                }
                else{
                    return x;
                }
                
            })
            this.allforum = forum_edit;
            this.$swal({
                    title: 'อัปเดตข่าวประชาสัมพันธ์สำเร็จ',
                    icon: 'success'
                });
            }).catch((err) => {alert(err);})
            this.close_modal_button;
            }
        },
        deleteopen: function(id){
            let forum_delete = this.allforum.filter((x) => {
                return x.forum_id == id;
            })
            this.forum_topic = forum_delete[0].forum_topic;
            this.forum_id = id;
        },
        realdelete: function(){
            axios.delete("http://localhost:5000/forum/" + this.forum_id)
            .then(() => {
                let forum = this.allforum.filter((x) => {
                    return x.forum_id != this.forum_id;
                })
                this.allforum = forum;
            }).catch((err) => {alert(err);})
            this.$swal({
                    title: "ลบข่าวประชาสัมพันธ์สำเร็จ",
                    icon: 'success'
                });
            this.close_modal_button;
        },
        close_modal_button() {
            this.forum_topic = "";
            this.forum_description = "";
            this.forum_type = "การศึกษา";
            this.image_address = "";
        }
    },
    computed: {
        filterforum() {
            let forum = [];
            let all_submit = 0;
            if(this.education_select == true){
                this.allforum.map((x) => {
                    if(x.forum_type == "การศึกษา"){
                        forum.push(x);
                    }
                })
                all_submit = all_submit + 1;
            }
            if(this.part_time_select == true){
                this.allforum.map((x) => {
                    if(x.forum_type == "งานพาร์ทไทน์"){
                        forum.push(x);
                    }
                })
                all_submit = all_submit + 1;
            }
            if(this.environment_select == true){
                this.allforum.map((x) => {
                    if(x.forum_type == "สภาพแวดล้อม"){
                        forum.push(x);
                    }
                })
                all_submit = all_submit + 1;
            }
            if(this.register_select == true){
                this.allforum.map((x) => {
                    if(x.forum_type == "การลงทะเบียน"){
                        forum.push(x);
                    }
                })
                all_submit = all_submit + 1;
            }
            if(this.scholarship_select == true){
                this.allforum.map((x) => {
                    if(x.forum_type == "ทุนการศึกษา"){
                        forum.push(x);
                    }
                })
                all_submit = all_submit + 1;
            }
            else if(all_submit == 0){
                forum = this.allforum;
            }
            forum.sort( function compare(a, b){
                if(a.forum_id < b.forum_id){
                    return -1;
                }
                if(a.forum_id > b.forum_id){
                    return 1;
                }
                return 0;
            })
            return forum;
        },
    }
}
</script>

<style scoped>
    #navbar_homepage{
    background-color: rgb(150, 54, 3, .53);
    height: 12%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

#logo_navbar{
    margin-left: 3%;
    margin-top: -3%;
    width: 20%;
    height: 10%;
}

#navbar_manage{
    font-family: 'Kanit', sans-serif;
    text-decoration: none;
    color: #ffffff;
    font-size: 20px;
    font-weight: 200;
    margin-right: 40px;
}

#navbar_register{
    font-family: 'Kanit', sans-serif;
    text-decoration: none;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
}

#line_register{
    width: 0px;
    border-left: 2px solid #ffffff;
    height: 39px;
    display: inline;
    margin-left: 10px;
    margin-right: 10px;
}
#table_head{
    text-align: center;
    font-weight: 900;
}
#table_body{
    text-align: center;
    font-weight: 500;
}
#all_forum_manage{
    margin-top: 2%;
    margin-bottom: 7%;
    padding-right: 8%;
    padding-left: 8%;
}
#forum_manage_title{
    color: #E35205;
    font-family: 'Kanit', sans-serif;
    font-size: 35px;
    font-weight: 700;
}
#forum_manage_table{
    background-color: #ffffff;
    color: #1a1819;
    font-family: 'Kanit', sans-serif;
    font-size: 20px;
    font-weight: 500;
    border-collapse: collapse;
    word-wrap: break-word;
}
#forum_img{
    width: 50%;
}
#btn{
    margin-right: 10px;
}
#forum_type{
    background-color: #ffffff;
    height: 30%;
    color: #1a1819;
    font-family: 'Kanit', sans-serif;
    font-size: 20px;
    font-weight: 500;
    border-radius: 30px;
    padding-bottom: 3%;
    padding-top: 3%;
    padding-left: 2%;
    padding-right: 2%;
}
#forum_manage_type_title{
    color: #1a1819;
    font-family: 'Kanit', sans-serif;
    font-size: 24px;
    font-weight: 900;
}
#btn_create{
    width: 100%;
}
#modal_title{
    text-align: center;
    font-size: 35px;
    font-weight: 700;
}
#type_button{
    margin-right: 3%;
}
#submit_btn{
    margin-right: 2%;
    width: 15%;
    height: 50px;
}
#allmodal{
    color: #1a1819;
    font-family: 'Kanit', sans-serif;
    font-size: 24px;
    font-weight: 500;
    padding-top: 3%;
    padding-bottom: 3%;
    padding-right: 5%;
    padding-left: 5%;
    background-color: #ffffff;
}
#error-message{
    color: #1a1819;
    font-family: 'Kanit', sans-serif;
    font-size: 16px;
    font-weight: 700;
    padding-top: 1%;
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
        position: relative;
        right: 0;
        bottom: 0;
        width: 100%;
        background-color: #d86a03;
        color: white;
    }
</style>