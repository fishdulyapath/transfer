
$(document).ready(function () {



    var doc_no = $('#doc_no').val()
    $.ajax({
        url: '../getDocRequestDetailPre?docno=' + doc_no,
        method: 'GET',
        success: function (res) {

            console.log(res)
            var __rsHTML = '';

            if (res.length > 0) {
                var status_text = "รอส่ง";
                if (res[0].status == "0") {
                    status_text = "รอส่ง";
                } else if (res[0].status == "1") {
                    status_text = "ส่งใบขอเบิกแล้ว";
                } else if (res[0].status == "2") {
                    status_text = "เบิกออก";
                } else {
                    status_text = "รอรับเข้า";
                }
                var _totalPage = Math.ceil(res[0].detail.length / 15);

                var _perLoop = 15;
                var _loopRowCount = 0;

                for (var _loop = 0; _loop < _totalPage; _loop++) {
                    __rsHTML += "<div class='content-print-layout' >";


                    __rsHTML += "<div class='divHeader' style='padding: 5px 0'>";

                    __rsHTML += "<div class='row' style='font-size: 18px;'>";
                    __rsHTML += "<div class='col-sm-12 text-center'>";
                    __rsHTML += "<p class='text-center'>ใบขอเบิก</p>";
                    __rsHTML += "</div>";
                    __rsHTML += "</div>";
                    __rsHTML += "<div class='row' style='font-size: 18px;'>";
                    __rsHTML += "<div class='col-sm-6 '>";
                    __rsHTML += "<p>เลขที่เอกสาร: " + res[0].doc_no + "</p>";
                    __rsHTML += "</div>";
                    __rsHTML += "<div class='col-sm-6 '>";
                    __rsHTML += "<p class='text-right'>วันที่: " + res[0].doc_date + " เวลา: " + res[0].doc_time + " | หน้า" + (_loop + 1) + "/" + _totalPage + "</p>";
                    __rsHTML += "</div>";
                    __rsHTML += "</div>";
                    __rsHTML += "<div class='row' style='font-size: 18px;'>";
                    __rsHTML += "<div class='col-sm-12 '>";
                    __rsHTML += "<p >ขอเบิกจาก: สาขา: " + res[0].branch_name + "(" + res[0].branch_code + ") คลัง: " + res[0].wh_name + "(" + res[0].wh_code + ")   ที่เก็บ: " + res[0].shelf_name + "(" + res[0].shelf_code + ")</p>";
                    __rsHTML += "</div>";
                    __rsHTML += "<div class='col-sm-12 '>";
                    __rsHTML += "<p >รับเข้า : สาขา: " + res[0].to_branch_name + "(" + res[0].to_branch_code + ") คลัง: " + res[0].to_wh_name + "(" + res[0].to_wh_code + ")   ที่เก็บ: " + res[0].to_sh_name + "(" + res[0].to_shelf_code + ")</p>";
                    __rsHTML += "</div>";
                    __rsHTML += "</div>";
                    __rsHTML += "<div class='row' style='font-size: 18px;'>";
                    __rsHTML += "<div class='col-sm-3 '>";
                    __rsHTML += "<p >สถานะ: " + status_text + " </p>";
                    __rsHTML += "</div>";
                    __rsHTML += "<div class='col-sm-5 '>";
                    __rsHTML += "<p >หมายเหตุ: " + res[0].remark + " </p>";
                    __rsHTML += "</div>";
                    __rsHTML += "<div class='col-sm-4 '>";
                    __rsHTML += "<p class='text-right'>ผู้สร้าง:" + res[0].user_code + '~' + res[0].user_name + "</p>";
                    __rsHTML += "</div>";
                    __rsHTML += "</div>";



                    __rsHTML += ` <table id="advancedEditableTable" class="table" style="width:100%;font-size: 15px;">
                                    <thead id="">
                                        <tr>
                                            <th class="text-center ">#</th>
                                            <th class="text-center ">รหัส</th>
                                            <th class="text-center ">ชื่อสินค้า</th>
                                            <th class="text-center ">หน่วยนับ</th>
                                            <th class="text-center ">จำนวน</th>
                                            <th class="text-center ">ราคาขาย</th>
                                            <th class="text-center ">รวมมูลค่า</th>
                                        </tr>

                                    </thead>
                            <tbody id="">`;
                    _perLoop = _perLoop * (_loop + 1);
                    if (_perLoop > res[0].detail.length) {
                        _perLoop = res[0].detail.length;
                    }
                    console.log(_perLoop)
                    var total = 0;
                    for (var i = _loopRowCount; i < _perLoop; i++) {
                        total += parseFloat(res[0].detail[i].price) * parseFloat(res[0].detail[i].qty);
                        __rsHTML += '<tr>'
                        __rsHTML += '<td class="text-center">' + (i + 1) + '</td>'
                        __rsHTML += '<td nowrap class="text-left ">' + res[0].detail[i].item_code + '</td>'
                        __rsHTML += '<td class="text-left ">' + res[0].detail[i].item_name + '</td>'
                        __rsHTML += '<td class="text-center">' + res[0].detail[i].unit_name + '(' + res[0].detail[i].unit_code + ') </td>'
                        //  html += '<td class="text-right">' + formatNumber(parseFloat(item_detail[i].balance)) + '</td>'
                        __rsHTML += '<td class="text-right">' + formatNumber(parseFloat(res[0].detail[i].qty)) + '</td>'
                        __rsHTML += '<td class="text-right">' + formatNumber(parseFloat(res[0].detail[i].price)) + '</td>'
                        __rsHTML += '<td class="text-right" style="font-weight:bold">' + formatNumber(parseFloat(res[0].detail[i].price) * parseFloat(res[0].detail[i].qty)) + '</td>'
                        __rsHTML += '</tr>'
                        _loopRowCount++;
                    }
                    __rsHTML += `</tbody>`
                    __rsHTML += `<tfoot>
                                 <tr>
                                    <td  colspan='6' class='text-right' style="font-weight:bold">รวมมูลค่า</td>
                                    <td class='text-right' style="font-weight:bold">${formatNumber(total)}</td>
                                </tr>
                                 
                                 </tfoot>`
                    __rsHTML += ` </table>
                                  `;

                    __rsHTML += `<div class="last-page row" style="position:fixed;bottom:5px;width:100%">
                                   
                      <div class="col-12 text-center"  style="margin-bottom:1rem"> <hr></div>
                                    <div class="col-3 text-center" >
                                        <p>ลงชื่อ..........................ผู้ออก</p>
                                        <p>(...................................)</p>
                                    </div>
                                    <div class="col-3 text-center" >
                                        <p>ลงชื่อ..........................ผู้ตรวจ</p>
                                        <p>(....................................)</p>
                                    </div>
                                    <div class="col-3 text-center" >
                                        <p>ลงชื่อ.............................ผู้รับ</p>
                                        <p>(.....................................)</p>
                                    </div>
                                    <div class="col-3 text-center" >
                                        <p>ลงชื่อ..........................ผู้อนุมัติ</p>
                                        <p>(....................................)</p>
                                    </div>

                                </div>`;

                    __rsHTML += "</div>";

                    __rsHTML += "</div>";

                }

                $("#content-list").html(__rsHTML);

                setTimeout(function () {
                    window.print();
                    // window.close();
                }, 2000);



            }


        },
        error: function (res) {
            console.log(res)
        },
    });
});
function formatNumber(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function removeCommas(str) {

    if (str != '0') {
        while (str.search(",") >= 0) {
            str = (str + "").replace(',', '');
        }
    }
    return str;
}

function _displayTable(item_detail) {
    var html = '';

    for (var i = 0; i < item_detail.length; i++) {

        html += '<tr>'
        html += '<td class="text-center">' + (i + 1) + '</td>'
        html += '<td class="text-left ">' + item_detail[i].item_code + '</td>'
        html += '<td class="text-left ">' + item_detail[i].item_name + '</td>'
        html += '<td class="text-center">' + item_detail[i].unit_name + '(' + item_detail[i].unit_code + ') </td>'
        //  html += '<td class="text-right">' + formatNumber(parseFloat(item_detail[i].balance)) + '</td>'
        html += '<td class="text-right">' + formatNumber(parseFloat(item_detail[i].qty)) + '</td>'
        html += '</tr>'
    }

    $('#item_detail').html(html);

    setTimeout(function () {
        window.print();
        window.close();
    }, 2000);
}

