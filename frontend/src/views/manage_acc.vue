<template>
  <div>
    <!-- navbar -->
    <div class="banner">
      <div class="topnav_manage">
        <a href="/admin"
          ><img
            src="/image/navbar/newlogo.png"
            width="110px"
            height="auto"
            style="padding-left: 20px"
            alt=""
        /></a>
        <ul>
          <div id="MyClockDisplay" class="clock"></div>
          <li id="comp1" v-if="currentAdmin.role_manage_admin_acc">
            <a href="/manageUser">Manage User</a>
          </li>
          <li id="comp1" v-if="currentAdmin.role_manage_admin_acc">
            <a href="/manageforum">Manage Forum</a>
          </li>
          <li id="comp1" v-if="currentAdmin.role_manage_admin_acc">
            <a href="/manageReport">Manage Report</a>
          </li>
          <div class="dropdown">
            <button
              class="btn btn-danger dropdown-toggle"
              id="comp3"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-user-plus"></i> {{ currentAdmin.name }}
            </button>
            <p class="dropdown-menu">
              <button
                class="dropdown-item text-danger"
                type="button"
                @click="logout()"
              >
                ออกจากระบบ
              </button>
            </p>
          </div>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="table-responsive">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-xs-5">
                <h2>User <b>Management</b></h2>
              </div>
            </div>
          </div>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Student ID</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in Users" :key="user._id">
                <td>{{ index + 1 }}</td>
                <td>
                  {{ user.fname + " " + user.lname }}
                </td>
                <td>{{ user.email }}</td>
                <td>{{ user.studentid }}</td>
                <td>{{ new Date(user.createdAt) }}</td>
                <td>
                  <a
                    @click="
                      edituser(user._id, user.fname, user.lname, user.email, user.studentid)
                    "
                    class="settings"
                    title="Settings"
                    data-toggle="tooltip"
                    ><i class="material-icons">&#xE8B8;</i></a
                  >
                  <a
                    @click="deleteUser(user._id, user.fname, user.lname)"
                    title="Delete"
                    data-toggle="tooltip"
                    ><i class="material-icons" style="color: red"
                      >&#xE5C9;</i
                    ></a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <footer id="footer">
      <div class="row">
        <div class="col-md-5"></div>
        <div class="col-md-5">
          <div class="copyright" style="padding-top: 20px; color: #aaa">
            Copyright &copy; 2021 ExptionKMITL
          </div>
        </div>
      </div>
    </footer>
    <!-- Deletemodal -->
    <div class="modal" :class="{ 'is-active': showdeleteModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Are you sure to delete {{ selectdelname }} ?
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="showdeleteModal = !showdeleteModal"
          ></button>
        </header>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="confirmdel()">
            Confirm
          </button>
          <button class="button" @click="showdeleteModal = !showdeleteModal">
            Cancel
          </button>
        </footer>
      </div>
    </div>
    <!-- Editmodal -->
    <div class="modal" :class="{ 'is-active': showEditModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Edit {{ selecteditfname + " " + selecteditlname }}
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="showEditModal = !showEditModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div>
            <label for="" style="padding-right: 10px"> FIRSTNAME : </label>
            <input type="text" v-model="selecteditfname" />
          </div>
          <div>
            <label for="" style="padding-right: 10px"> LASTNAME : </label>
            <input type="text" v-model="selecteditlname" />
          </div>
          <div>
            <label for="" style="padding-right: 10px"> EMAIL : </label>
            <input type="email" v-model="selecteditemail" />
          </div>
          <div>
            <label for="" style="padding-right: 10px"> STUDENT ID : </label>
            <input type="text" v-model="selecteditstudentid" />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="saveedit()">Save</button>
          <button class="button" @click="showEditModal = !showEditModal">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { USER_ALL_QUERY, CURRENT_ADMIN_QUERY, DELETE_USER, EDIT_USER } from "../graphql";

export default {
  data() {
    return {
      permission: null,
      tokenAdmin: null,
      tokenUserError: null,
      id: "",
      users: [],
      showdeleteModal: false,
      showEditModal: false,
      selectdelid: null,
      selectdelname: null,
      selecteditid: null,
      selecteditfname: null,
      selecteditlname: null,
      selecteditemail: null,
      selecteditstudentid: null,
    };
  },
  apollo: {
    currentAdmin: {
      query: CURRENT_ADMIN_QUERY,
    },
    Users: {
      query: USER_ALL_QUERY,
    },
  },
  created() {
    this.tokenAdmin = Cookies.get("tokenAdmin");
    this.tokenUserError = Cookies.get("tokenUser");
    if (this.tokenAdmin) {
      this.permission = "for admin";
    } else if (this.tokenUser) {
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
    edituser(id, firstname, lastname, email, studentid) {
      this.showEditModal = true;
      this.selecteditid = id;
      this.selecteditfname = firstname;
      this.selecteditlname = lastname;
      this.selecteditemail = email;
      this.selecteditstudentid = studentid;
    },
    saveedit() {
      this.showEditModal = !this.showEditModal;
      this.$apollo.mutate({
        mutation: EDIT_USER,
        variables: {
          id: this.selecteditid,
          data : {
            fname: this.selecteditfname,
            lname: this.selecteditlname,
            email: this.selecteditemail,
            studentid: this.selecteditstudentid
          }
        }
      }).then((res) => {
        console.log(res)
        this.$apollo.queries.Users.refetch().then((res) => {
            console.log(res);
            this.showEditModal = false;
          });
      })
      
    },
    deleteUser(id, firstname, lastname) {
      this.showdeleteModal = true;
      this.selectdelid = id;
      this.selectdelname = firstname + " " + lastname;
    },
    confirmdel() {
      this.$apollo
        .mutate({
          mutation: DELETE_USER,
          variables: {
            deleteId: this.selectdelid,
          },
        })
        .then((res) => {
          console.log(res)
          this.$apollo.queries.Users.refetch().then((res) => {
            console.log(res);
            this.showdeleteModal = false;
          });
        });
    },
  },
};
</script>

<style scoped>
.table-responsive {
  margin: 30px 0;
}
.table-wrapper {
  min-width: 1000px;
  background: #fff;
  padding: 20px 25px;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.table-title {
  padding-bottom: 15px;
  background: #299be4;
  color: #fff;
  padding: 16px 30px;
  margin: -20px -25px 10px;
  border-radius: 3px 3px 0 0;
}
.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
}
.table-title .btn {
  color: #566787;
  float: right;
  font-size: 13px;
  background: #fff;
  border: none;
  min-width: 50px;
  border-radius: 2px;
  border: none;
  outline: none !important;
  margin-left: 10px;
}
.table-title .btn:hover,
.table-title .btn:focus {
  color: #566787;
  background: #f2f2f2;
}
.table-title .btn i {
  float: left;
  font-size: 21px;
  margin-right: 5px;
}
.table-title .btn span {
  float: left;
  margin-top: 2px;
}
table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
  padding: 12px 15px;
  vertical-align: middle;
}
table.table tr th:first-child {
  width: 60px;
}
table.table tr th:last-child {
  width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
  background: #f5f5f5;
}
table.table th i {
  font-size: 13px;
  margin: 0 5px;
  cursor: pointer;
}
table.table td:last-child i {
  opacity: 0.9;
  font-size: 22px;
  margin: 0 5px;
}
table.table td a {
  font-weight: bold;
  color: #566787;
  display: inline-block;
  text-decoration: none;
}
table.table td a:hover {
  color: #2196f3;
}
table.table td a.settings {
  color: #2196f3;
}
table.table td a.delete {
  color: #f44336;
}
table.table td i {
  font-size: 19px;
}
table.table .avatar {
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
.status {
  font-size: 30px;
  margin: 2px 2px 0 0;
  display: inline-block;
  vertical-align: middle;
  line-height: 10px;
}
.text-success {
  color: #10c469;
}
.text-info {
  color: #62c9e8;
}
.text-warning {
  color: #ffc107;
}
.text-danger {
  color: #ff5b5b;
}
.pagination {
  float: right;
  margin: 0 0 5px;
}
.pagination li a {
  border: none;
  font-size: 13px;
  min-width: 30px;
  min-height: 30px;
  color: #999;
  margin: 0 2px;
  line-height: 30px;
  border-radius: 2px !important;
  text-align: center;
  padding: 0 6px;
}
.pagination li a:hover {
  color: #666;
}
.pagination li.active a,
.pagination li.active a.page-link {
  background: #03a9f4;
}
.pagination li.active a:hover {
  background: #0397d6;
}
.pagination li.disabled i {
  color: #ccc;
}
.pagination li i {
  font-size: 16px;
  padding-top: 6px;
}
.hint-text {
  float: left;
  margin-top: 10px;
  font-size: 13px;
}
.fa-user-plus {
  color: rgb(0, 0, 200);
}
/* topnav_manage only login && reg */

.topnav_manage {
  color: #fff;
  display: flex;
  justify-content: space-between;
}
.topnav_manage ul {
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  padding-right: 20px;
}
.topnav_manage li {
  list-style: none;
}
.topnav_manage #comp1 a {
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  font-weight: 200;
  padding: 5px 12px;
}
.topnav_manage #comp1 a:hover {
  color: orange;
  text-decoration: none;
}
.topnav_manage #comp2 a {
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  padding: 5px 12px;
}
.topnav_manage #comp2 a:hover {
  color: yellow;
  text-decoration: none;
}

.topnav_manage #comp3 {
  color: white;
  background-color: #e4af01;
  margin-right: 20px;
  margin-left: 10px;
}

.topnav_manage #comp3:hover {
  background-color: #f7d12b;
}

.topnav_manage::before {
  content: " ";
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: #d86a03;
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
