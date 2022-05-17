<template>
    <div>
        <!-- navbar -->
        <navbarHome></navbarHome>

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
                <div class="row justify-content-center" id="card-row-1">
                    <div class="col-md-3">
                        <a href="">
                            <div class="card">
                                <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="/image/card/cardimg-1.jpg" style="height:250px" alt="Placeholder image">
                                </figure>
                                </div>
                                <div class="card-header text-white bg-danger">การศึกษา</div>
                                <div class="card-body">
                                    <p class="card-text">การจัดสอบวัดความรู้ทักษะ <br>ภาษาอังกฤษ ก่อนสำเร็จการศึกษา (English Exit Exam) ประจำปีการศึกษา 2563 รอบเดือนมีนาคม<br>พ.ศ. 2564</p>
                                </div>
                                <footer class="card-footer bg-danger">
                                    <!-- footer card -->
                                </footer>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="">
                            <div class="card">
                                <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="/image/card/cardimg-2.jpg" style="height:250px" alt="Placeholder image">
                                </figure>
                                </div>
                                <div class="card-header text-white bg-secondary">งานพาร์ทไทม์</div>
                                <div class="card-body">
                                    <p class="card-text">พบกับการออกบูธรับสมัครงาน<br>ของบริษัทชื่อดังมากมาย ในงานนี้<br>เพื่อให้น้องๆนักศึกษา #สจล. ทุกคนมีโอกาสได้งานที่ใช่ ทั้งงานประจำ พาร์ทไทม์ หรือการฝึกงาน</p>
                                </div>
                                <footer class="card-footer bg-secondary">
                                    <!-- footer card -->
                                </footer>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="">
                            <div class="card">
                                <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="/image/card/cardimg-3.jpg" style="height:250px" alt="Placeholder image">
                                </figure>
                                </div>
                                <div class="card-header text-white bg-warning">สภาพแวดล้อม</div>
                                <div class="card-body">
                                    <p class="card-text">ซ่อมแล้ว! พื้นที่บริเวณโคนเสา<br>ทรุดตัว ซึ่งอาจเกิดอันตรายได้<br>ตอนนี้ซ่อมแซมเสร็จแล้ว รวมถึงฟุตบาททางเดินให้สามารถเดินได้<br>อย่างปลอดภัย</p>
                                </div>
                                <footer class="card-footer bg-warning">
                                    <!-- footer card -->
                                </footer>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="">
                            <div class="card">
                                <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="/image/card/cardimg-4.jpg" style="height:250px" alt="Placeholder image">
                                </figure>
                                </div>
                                <div class="card-header text-white bg-danger">การศึกษา</div>
                                <div class="card-body">
                                    <p class="card-text"><br>ประกาศขยายเวลารับสมัครนักศึกษา หลักสูตรวิชาโท ประจำภาคเรียนที่ 2 ปีการศึกษา 2563</p>
                                </div>
                                <footer class="card-footer bg-danger">
                                    <!-- footer card -->
                                </footer>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- card row 2 -->

                <div class="row justify-content-center" id="card-row-2">
                    <div class="col-md-3">
                        <a href="">
                            <div class="card">
                                <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="/image/card/cardimg-5.jpg" style="height:250px" alt="Placeholder image">
                                </figure>
                                </div>
                                <div class="card-header text-white bg-primary">การลงทะเบียน</div>    
                                <div class="card-body">
                                    <p class="card-text">ประกาศแจ้งเตือนนักศึกษาชั้นปีที่ <br>2-4 ที่มีสถานะเรียนและไม่ได้ลงทะเบียนเรียนในภาคการศึกษาที่ 2/2563</p>
                                </div>
                                <footer class="card-footer bg-primary">
                                    <!-- footer card -->
                                </footer>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="">
                            <div class="card">
                                <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="/image/card/cardimg-6.jpg" style="height:250px" alt="Placeholder image">
                                </figure>
                                </div>
                                <div class="card-header text-white bg-warning">สภาพแวดล้อม</div>
                                <div class="card-body">
                                    <p class="card-text">กลางคืน เดินได้ ไม่ต้องกลัว!! <br>พี่ๆกายภาพได้ทำการซ่อมหลอดไฟ<br>@ป้ายหยุดรถไฟ และไฟถนน @อาคาร CCA เพื่่อให้เดินทาง<br>ตอนกลางคืนได้สบายใจ</p>
                                </div>
                                <footer class="card-footer bg-warning">
                                    <!-- footer card -->
                                </footer>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="">
                            <div class="card">
                                <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="/image/card/cardimg-7.jpg" style="height:250px" alt="Placeholder image">
                                </figure>
                                </div>
                                <div class="card-header text-white bg-info">ทุนการศึกษา</div>
                                <div class="card-body">
                                    <p class="card-text"><br>การกู้ยืมในปีการศึกษา 2564 ขอให้<br>ผู้กู้ยืม ทุกท่านเข้าไปศึกษาเกี่ยวกับระบบก่อนใช้งานจริง</p>
                                </div>
                                <footer class="card-footer bg-info">
                                    <!-- footer card -->
                                </footer>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="">
                            <div class="card">
                                <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="/image/card/cardimg-8.png" style="height:250px" alt="Placeholder image">
                                </figure>
                                </div>
                                <div class="card-header text-white bg-info">ทุนการศึกษา</div>
                                <div class="card-body">
                                    <p class="card-text"><br>ทุนเงินให้ยืมเพื่อการศึกษากรณีฉุกเฉินสำหรับภาคการศึกษา 2/2563 รับสมัคร 5-15 มกราคม 2564</p>
                                </div>
                                <footer class="card-footer bg-info">
                                    <!-- footer card -->
                                </footer>
                            </div>
                        </a>
                    </div>
                </div>

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
import navbarHome from '../components/navbarHome.vue'
import { time } from "../router/time"
export default {
    data(){
        return{}
    },
    components: {
        navbarHome
    },
    beforeCreate(){
        time
    },
    created(){
        localStorage.removeItem('tokenAdmin')
        localStorage.removeItem('tokenUser')
    },
}
</script>

<style scoped>
/* footer */

#A{
    color : red;
    opacity: 1 !important;
}

footer {
    background-color: #963306;
    padding: 10px 0px 10px 30px;
}

</style>