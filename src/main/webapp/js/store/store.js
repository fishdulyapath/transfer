var serverURL = "../";
var userbranch = '';


$(document).ready(function () {
    _getUserList();
    _getWhList();
    _getBranchList();

    $('#formModal').on('hide.bs.modal', function (event) {
        console.log('1345')
        $('.branch_select').val('').trigger('change');
        $('.wh_select').val('').trigger('change');
        $('.shelf_select').val('').trigger('change');
        $('.wh_select2').val('').trigger('change');
        $('.shelf_select2').val('').trigger('change');
        $('.wh_select3').val('').trigger('change');
        $('.shelf_select3').val('').trigger('change');
        $('#is_direct').prop("checked", false);
    })

    $('#item_body').delegate('.fa-edit', 'click', function () {

        var data = $(this);
        var code = data.attr('data-code');
        var name = data.attr('data-name');

        $('#emp_code').val(code);
        setTimeout(function () {
            _getEmpDetail(code);
        }, 500);

        $('#emp_name').html(name)
        $('#formModal').modal('show');



    });

    $('#search_name').on('keyup', function (e) {
        if (e.keyCode === 13) {
            _getUserList();
        }

    });

    $('#btn-search').on('click', function () {
        _getUserList();
    });

    $('#btn-save').on('click', function () {
        var branchcode = $('#from_bh').val();
        var whcode = $('#from_wh').val();
        var shcode = $('#from_sh').val();
        var to_branchcode = $('#to_bh').val();
        var to_whcode = $('#to_wh').val();
        var to_shcode = $('#to_sh').val();
        var rev_branchcode = $('#rev_bh').val();
        var rev_whcode = $('#rev_wh').val();
        var rev_shcode = $('#rev_sh').val();
        var empcode = $('#emp_code').val();
        var defualt_branch_code = $('#defualt_branch_code').val();
        var defualt_wh_code = $('#defualt_wh_code').val();
        var defualt_shelf_code = $('#defualt_shelf_code').val();
        var defualt_to_branch_code = $('#defualt_to_branch_code').val();
        var defualt_to_wh_code = $('#defualt_to_wh_code').val();
        var defualt_to_shelf_code = $('#defualt_to_shelf_code').val();

        var defualt_direct_branch_code = $('#defualt_direct_branch_code').val();
        var defualt_direct_wh_code = $('#defualt_direct_wh_code').val();
        var defualt_direct_shelf_code = $('#defualt_direct_shelf_code').val();

        var is_direct = "0";
        if ($('#is_direct').is(":checked"))
        {
            is_direct = "1"
        } else {
            is_direct = "0"
        }
        var is_del_history = "0";
        if ($('#is_del_history').is(":checked"))
        {
            is_del_history = "1"
        } else {
            is_del_history = "0"
        }
        if (branchcode.length > 0 && shcode.length > 0 && whcode.length > 0 & to_branchcode.length > 0 && to_whcode.length > 0 && to_shcode.length > 0 && rev_branchcode.length > 0 && rev_whcode.length > 0 && rev_shcode.length) {
            var json_data = {
                emp_code: empcode,
                wh_code: whcode.toString(),
                sh_code: shcode.toString(),
                branch_code: branchcode.toString(),
                to_whcode: to_whcode.toString(),
                to_shcode: to_shcode.toString(),
                to_branchcode: to_branchcode.toString(),
                rev_whcode: rev_whcode.toString(),
                rev_shcode: rev_shcode.toString(),
                rev_branchcode: rev_branchcode.toString(),
                is_direct: is_direct,
                defualt_branch_code: defualt_branch_code,
                defualt_wh_code: defualt_wh_code,
                defualt_shelf_code: defualt_shelf_code,
                defualt_to_branch_code: defualt_to_branch_code,
                defualt_direct_wh_code: defualt_direct_wh_code,
                defualt_to_shelf_code: defualt_to_shelf_code,

                defualt_direct_branch_code: defualt_direct_branch_code,
                defualt_to_wh_code: defualt_to_wh_code,
                defualt_direct_shelf_code: defualt_direct_shelf_code,

                is_del_history: is_del_history

            }
            $.ajax({
                url: serverURL + 'userStorage',
                method: 'POST',
                data: json_data,
                success: function (res) {
                    console.log(res)
                    swal("??????????????????????????????????????????????????????", "", "success")
                    _getUserList();
                    $('.branch_select').val('');
                    $('.defualt_wh_code').val('');
                    $('.wh_select').val('');
                    $('.wh_select2').val('');
                    $('.wh_select3').val('');
                    $('.defualt_shelf_code').val('');
                    $('.shelf_select').val('');
                    $('.shelf_select2').val('');
                    $('.shelf_select3').val('');
                    $('#formModal').modal('hide');
                },
                error: function (res) {
                    console.log(res)
                },
            });


        } else {
            swal("???????????????????????????????????????????????????????????????", "", "warning")
        }
        console.log(shcode);
    });



    $('#defualt_wh_code').on('change', function () {
        var data = $('#defualt_wh_code').val();
        if (data != '') {
            _getShList4();

        } else {
            // $('.shelf_select').select2().destroy();
            $('#defualt_shelf_code').html('');
            $('#defualt_shelf_code').val('').trigger('change');
            $('#defualt_shelf_code').attr('disabled', 'true');
        }
    });

    $('#defualt_to_wh_code').on('change', function () {
        var data = $('#defualt_to_wh_code').val();
        if (data != '') {
            _getShList5();

        } else {
            // $('.shelf_select').select2().destroy();
            $('#defualt_to_shelf_code').html('');
            $('#defualt_to_shelf_code').val('').trigger('change');
            $('#defualt_to_shelf_code').attr('disabled', 'true');
        }
    });
    
     $('#defualt_direct_wh_code').on('change', function () {
        var data = $('#defualt_direct_wh_code').val();
        if (data != '') {
            _getShList6();

        } else {
            // $('.shelf_select').select2().destroy();
            $('#defualt_direct_shelf_code').html('');
            $('#defualt_direct_shelf_code').val('').trigger('change');
            $('#defualt_direct_shelf_code').attr('disabled', 'true');
        }
    });

    $('.wh_select').on('change', function () {
        var data = $('.wh_select').val();
        if (data != '') {
            _getShList();

        } else {
            // $('.shelf_select').select2().destroy();
            $('.shelf_select').html('');
            $('.shelf_select').val('').trigger('change');
            $('.shelf_select').attr('disabled', 'true');
        }
    });

    $('.wh_select2').on('change', function () {
        var data = $('.wh_select2').val();
        if (data != '') {
            _getShList2();

        } else {
            // $('.shelf_select').select2().destroy();
            $('.shelf_select2').html('');
            $('.shelf_select2').val('').trigger('change');
            $('.shelf_select2').attr('disabled', 'true');
        }
    });

    $('.wh_select3').on('change', function () {
        var data = $('.wh_select3').val();
        if (data != '') {
            _getShList3();

        } else {
            // $('.shelf_select').select2().destroy();
            $('.shelf_select3').html('');
            $('.shelf_select3').val('').trigger('change');
            $('.shelf_select3').attr('disabled', 'true');
        }
    });


});


function uuidv4() {
    return 'xxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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

function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}


function _getBranchList() {

    var html = "";
    $.ajax({
        url: serverURL + 'getBranchList',
        method: 'GET',
        cache: false,
        success: function (res) {

            if (res.length > 0) {

                res.forEach(function (ele, index) {
                    html += `<option value='${ele.code}'>`;
                    html += `${ele.code}~${ele.name_1}`;
                    html += "</option>";
                });
                $('.branch_select').html(html);
                $('.branch_select').select2();
            }


        },
        error: function (res) {
            console.log(res)
        },
    });
}



function _getEmpDetail(code) {

    var html = "";
    $.ajax({
        url: serverURL + 'userStorage?empcode=' + code,
        method: 'GET',
        cache: false,
        success: function (res) {
            console.log(res)
            if (res.length > 0) {
                res.forEach(function (ele, index) {
                    var wh = [];
                    if (ele.wh_code != "") {
                        wh = ele.wh_code.split(',');
                    }
                    var sh = [];
                    if (ele.shelf_code != "") {
                        sh = ele.shelf_code.split(',');
                    }
                    var bh = [];
                    if (ele.branch_code != "") {
                        bh = ele.branch_code.split(',');
                    }
                    var to_wh = [];
                    if (ele.to_wh_code != "") {
                        to_wh = ele.to_wh_code.split(',');
                    }
                    var to_sh = [];
                    if (ele.to_shelf_code != "") {
                        to_sh = ele.to_shelf_code.split(',');
                    }
                    var to_bh = [];
                    if (ele.to_branch_code != "") {
                        to_bh = ele.to_branch_code.split(',');
                    }
                    var rev_bh = [];
                    if (ele.rev_branch_code != "") {
                        rev_bh = ele.rev_branch_code.split(',');
                    }
                    var rev_wh = [];
                    if (ele.rev_wh_code != "") {
                        rev_wh = ele.rev_wh_code.split(',');
                    }
                    var rev_sh = [];
                    if (ele.rev_shelf_code != "") {
                        rev_sh = ele.rev_shelf_code.split(',');
                    }

                    console.log(ele);
                    console.log(bh);
                    console.log(wh);
                    console.log(sh);
                    if (ele.is_direct == '0') {
                        $("#is_direct").prop("checked", false);
                    } else {
                        $("#is_direct").prop("checked", true);
                    }
                    if (ele.is_del_history == '0') {
                        $("#is_del_history").prop("checked", false);
                    } else {
                        $("#is_del_history").prop("checked", true);
                    }
                    $('#from_bh').val(bh).trigger('change');
                    $('#from_wh').val(wh).trigger('change');
                    $('#to_bh').val(to_bh).trigger('change');
                    $('#to_wh').val(to_wh).trigger('change');
                    $('#rev_bh').val(rev_bh).trigger('change');
                    $('#rev_wh').val(rev_wh).trigger('change');

                    $('#defualt_branch_code').val(ele.defualt_branch_code).trigger('change');
                    $('#defualt_wh_code').val(ele.defualt_wh_code).trigger('change');

                    $('#defualt_to_branch_code').val(ele.defualt_to_branch_code).trigger('change');
                    $('#defualt_to_wh_code').val(ele.defualt_to_wh_code).trigger('change');


                    $('#defualt_direct_branch_code').val(ele.defualt_direct_branch_code).trigger('change');
                    $('#defualt_direct_wh_code').val(ele.defualt_direct_wh_code).trigger('change');

                    setTimeout(function () {
                        $('#from_sh').val(sh).trigger('change');
                        $('#to_sh').val(to_sh).trigger('change');
                        $('#rev_sh').val(rev_sh).trigger('change');
                        $('#defualt_shelf_code').val(ele.defualt_shelf_code).trigger('change');
                        $('#defualt_to_shelf_code').val(ele.defualt_to_shelf_code).trigger('change');
                        $('#defualt_direct_shelf_code').val(ele.defualt_direct_shelf_code).trigger('change');
                    }, 1000);
                });
            } else {
                $("#is_direct").prop("checked", false);
                $("#is_del_history").prop("checked", false);
                $('#defualt_branch_code').val('').trigger('change');
                $('#defualt_wh_code').val('').trigger('change');
                $('#defualt_shelf_code').val('').trigger('change');
                $('#defualt_to_branch_code').val('').trigger('change');
                $('#defualt_to_wh_code').val('').trigger('change');
                $('#defualt_to_shelf_code').val('').trigger('change');
                $('#defualt_direct_branch_code').val('').trigger('change');
                $('#defualt_direct_wh_code').val('').trigger('change');
                $('#defualt_direct_shelf_code').val('').trigger('change');
            }
        },
        error: function (res) {
            console.log(res)
        },
    });
}


function _getWhList() {

    var html = "";

    $.ajax({
        url: serverURL + 'getWhList',
        method: 'GET',
        cache: false,
        success: function (res) {

            if (res.length > 0) {

                res.forEach(function (ele, index) {
                    html += `<option value='${ele.code}'>`;
                    html += `${ele.code}~${ele.name_1}`;
                    html += "</option>";
                });
                $('.wh_select').html(html);
                $('.wh_select').select2();
                $('.wh_select2').html(html);
                $('.wh_select2').select2();
                $('.wh_select3').html(html);
                $('.wh_select3').select2();
                $('.defualt_wh_code').html(html);
                $('.defualt_wh_code').select2();
                $('.defualt_to_wh_code').html(html);
                $('.defualt_to_wh_code').select2();
                $('.defualt_direct_wh_code').html(html);
                $('.defualt_direct_wh_code').select2();
                _getShList4();
                _getShList5();
                _getShList6();
            }


        },
        error: function (res) {
            console.log(res)
        },
    });
}


function _getShList3() {
    var data = $('.wh_select3').val();
    var html = "";
    $.ajax({
        url: serverURL + 'getShList?whcode=' + data,
        method: 'GET',
        cache: false,
        success: function (res) {

            if (res.length > 0) {

                res.forEach(function (ele, index) {
                    html += `<option value='${ele.code}'>`;
                    html += `${ele.code}~${ele.name_1}`;
                    html += "</option>";
                });
                $('.shelf_select3').html(html);
                $('.shelf_select3').removeAttr('disabled');
                $('.shelf_select3').select2();
            }


        },
        error: function (res) {
            console.log(res)
        },
    });
}

function _getShList2() {
    var data = $('.wh_select2').val();
    var html = "";
    $.ajax({
        url: serverURL + 'getShList?whcode=' + data,
        method: 'GET',
        cache: false,
        success: function (res) {

            if (res.length > 0) {

                res.forEach(function (ele, index) {
                    html += `<option value='${ele.code}'>`;
                    html += `${ele.code}~${ele.name_1}`;
                    html += "</option>";
                });
                $('.shelf_select2').html(html);
                $('.shelf_select2').removeAttr('disabled');
                $('.shelf_select2').select2();
            }


        },
        error: function (res) {
            console.log(res)
        },
    });
}


function _getShList4() {
    var data = $('#defualt_wh_code').val();
    var html = "";
    $.ajax({
        url: serverURL + 'getShList?whcode=' + data,
        method: 'GET',
        cache: false,
        success: function (res) {

            if (res.length > 0) {

                res.forEach(function (ele, index) {
                    html += `<option value='${ele.code}'>`;
                    html += `${ele.code}~${ele.name_1}`;
                    html += "</option>";
                });
                $('#defualt_shelf_code').html(html);
                $('#defualt_shelf_code').removeAttr('disabled');
                $('#defualt_shelf_code').select2();
            }


        },
        error: function (res) {
            console.log(res)
        },
    });
}

function _getShList5() {
    var data = $('#defualt_to_wh_code').val();
    var html = "";
    $.ajax({
        url: serverURL + 'getShList?whcode=' + data,
        method: 'GET',
        cache: false,
        success: function (res) {

            if (res.length > 0) {

                res.forEach(function (ele, index) {
                    html += `<option value='${ele.code}'>`;
                    html += `${ele.code}~${ele.name_1}`;
                    html += "</option>";
                });
                $('#defualt_to_shelf_code').html(html);
                $('#defualt_to_shelf_code').removeAttr('disabled');
                $('#defualt_to_shelf_code').select2();
            }


        },
        error: function (res) {
            console.log(res)
        },
    });
}

function _getShList6() {
    var data = $('#defualt_direct_wh_code').val();
    var html = "";
    $.ajax({
        url: serverURL + 'getShList?whcode=' + data,
        method: 'GET',
        cache: false,
        success: function (res) {

            if (res.length > 0) {

                res.forEach(function (ele, index) {
                    html += `<option value='${ele.code}'>`;
                    html += `${ele.code}~${ele.name_1}`;
                    html += "</option>";
                });
                $('#defualt_direct_shelf_code').html(html);
                $('#defualt_direct_shelf_code').removeAttr('disabled');
                $('#defualt_direct_shelf_code').select2();
            }


        },
        error: function (res) {
            console.log(res)
        },
    });
}

function _getShList() {
    var data = $('.wh_select').val();
    var html = "";
    $.ajax({
        url: serverURL + 'getShList?whcode=' + data,
        method: 'GET',
        cache: false,
        success: function (res) {

            if (res.length > 0) {

                res.forEach(function (ele, index) {
                    html += `<option value='${ele.code}'>`;
                    html += `${ele.code}~${ele.name_1}`;
                    html += "</option>";
                });
                $('.shelf_select').html(html);
                $('.shelf_select').removeAttr('disabled');
                $('.shelf_select').select2();
            }


        },
        error: function (res) {
            console.log(res)
        },
    });
}

function _getUserList() {
    var search_name = $('#search_name').val()
    console.log(search_name)
    var html = "";
    $.ajax({
        url: serverURL + 'getUserList?search=' + search_name,
        method: 'GET',
        cache: false,
        success: function (res) {
            if (res.length > 0) {
                res.forEach(function (ele, index) {
                    html += `<tr>`;
                    html += `<td class="text-center"><i class="fa fa-edit" data-code="${ele.code}" data-name="${ele.name_1}" style="color:orange" role="button"></i></td>`;
                    html += `<td>${ele.code}~${ele.name_1}</td>`;
                    html += `<td>${ele.branch_code}</td>`;
                    html += `<td>${ele.wh_code}</td>`;
                    html += `<td>${ele.shelf_code}</td>`;
                    html += `<td>${ele.to_branch_code}</td>`;
                    html += `<td>${ele.to_wh_code}</td>`;
                    html += `<td>${ele.to_shelf_code}</td>`;
                    html += `<td>${ele.rev_branch_code}</td>`;
                    html += `<td>${ele.rev_wh_code}</td>`;
                    html += `<td>${ele.rev_shelf_code}</td>`;

                    html += "</tr>";
                });
                $('#item_body').html(html);
            }


        },
        error: function (res) {
            console.log(res)
        },
    });
}

function _searchItem() {
    var search_name = $('#search_name').val()
    console.log(search_name)

    $.ajax({
        url: serverURL + 'search_item?name=' + search_name,
        method: 'GET',
        cache: false,
        success: function (res) {
            $('#list_search_item').html(res)

        },
        error: function (res) {
            console.log(res)
        },
    });
}
function _addLine() {
    item_detail.push({
        item_code: '',
        item_name: '',
        unit_code: '',
        purchases: 0.00,
        cost_qty: 0.00,
        cost_weight: 0.00,
        cost_sum_weight: 0.00,
        cost_factory_price: 0.00,
        cost_sum_cost: 0.00,
        exp_discount: 0.00,
        exp_car: 0.00,
        exp_other: 0.00,
        exp_doc: 0.00,
        exp_tax: 0.00,
        exp_other2: 0.00,
        exp_each: 0.00,
        sale_sum_lao_cost: 0.00,
        sale_sum_cost: 0.00,
        sale_price: 0.00,
        sale_sum_amount: 0.00,
        sale_profit: 0.00,
        sale_percent_profit: 0.00,
        selling_price: 0.00,
        sale_discount: 0.00
    });
    _displayTable();
}



function delLine(data) {
    console.log(data)
    item_detail.splice(data, 1);
    _displayTable()

}

