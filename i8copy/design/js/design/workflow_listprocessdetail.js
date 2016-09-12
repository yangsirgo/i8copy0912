define(function(require,explorts){
//var fw_globalConfig = require('../../common/fw_globalconfig.js');
if(typeof fw_globalConfig  === 'undefined'){
       fw_globalConfig = {};
}
var fw_selector=require("../plugins/i8selector/fw_selector");
var fw_page=require('../common/fw_pagination.js');
var _utils = require('../common/util.js');
var i8ui = require("../common/i8ui");
var path =i8_session.ajaxWfHost;
var getprocstatus = '1';//js_wf_Status;
var getprocCategoryID;
var getPageIndex = '1';
var getPageSize = 10;

var fuzzyInput=$('.fuzzy-search input');//搜索INPUT框
var batchOn=$('#batchOn');//批量上架按钮
var batchOff=$('#batchOff');//批量下架按钮


var batchOption=function(list,type){
    if(list&&list.length==0){
        i8ui.error('已无'+(type==1?'下架':'上架')+'的流程！');
        return ;
    }
    var tpl=require('../template/design/proclist.tpl');
    if(list){
        var showbox=i8ui.showbox({title:type==1?'批量上架':'批量下架',cont:template(tpl)({pList:list,type:type})});
        var $showbox=$(showbox);
    }
    $showbox.find('.set-checked-box-list').mCustomScrollbar({//添加滚动条功能
        scrollButtons: {
            enable: true
        },
        theme: "dark-thin"
    });
    $showbox.on('click','.dielog-cancel',function(){
        $showbox.find('.ct-close').trigger('click');
    });

    $showbox.on('click','.dielog-ok',function(){
        var procIds=[];
        if($showbox.find('.app-checkbox.checked[type=all]').length>0){
            $showbox.find('.app-checkbox[type=proc]').each(function(i,item){
                procIds.push($(item).attr('vid'));
            });
        }else{
            $showbox.find('.app-checkbox.checked[type=proc]').each(function(i,item){
                procIds.push($(item).attr('vid'));
            });
        }

        if(procIds.length==0){
            return i8ui.error('请至少选择一只流程！');
        }
        var loading=i8ui.showbox({cont:'<div class="ld-64-write"></div>'});
        batchUpdateProcStatus(type,procIds,function(data){
            loading.close();
            if(data.Result){
                var procLength=procIds.length;
                var errList=[];
                _.each(data.ReturnObject,function(value,key){
                    errList.push(key+':'+value);
                });
                i8ui.showbox({title:'操作结果',cont:template(require('../template/design/batch-result.tpl'))({errList:errList,procLength:procLength,type:type})})
                $('#search_process').find('.searchbtn').trigger('click');
                $showbox.find('.ct-close').trigger('click');
            }else{
                i8ui.write(data.Description);
                $showbox.find('.ct-close').trigger('click');
            }

        })

    });
}

//复选框注册
$(document).on('click','.app-checkbox,.checked-label',function(){
    var _this=$(this);
    var _parent=_this.parent();
    var _type=_parent.find('.app-checkbox').toggleClass('checked').attr('type');
    var isCheck=_parent.find('.app-checkbox').hasClass('checked');
    switch (_type){
        case 'all':isCheck?_parent.next('.app-table-list').hide().find('.app-checkbox').addClass('checked'):_parent.next('.app-table-list').show().find('.app-checkbox').removeClass('checked');
            break;
        case 'category':isCheck?_parent.next('.check-sub').find('.app-checkbox').addClass('checked'):_parent.next('.check-sub').find('.app-checkbox').removeClass('checked');
            break;
        case 'proc':
            var check_sub=_this.parents('.check-sub');
            var check_category=check_sub.prev('.check-category').eq(0);
            if(check_sub.find('.app-checkbox:not(.checked)').length==0){
                check_category.find('.app-checkbox').addClass('checked');
            }else{
                check_category.find('.app-checkbox').removeClass('checked');
            }
            break;
        default :;break;
    }
});
batchOn.on('click',function(){
    var loading=i8ui.showbox({cont:'<div class="ld-64-write"></div>'});

    getListByStatus(2,function(list){
        loading.close();
        batchOption(list,1);
    });

})

batchOff.on('click',function(){
    var loading=i8ui.showbox({cont:'<div class="ld-64-write"></div>'});
    getListByStatus(1,function(list){
        loading.close();
        batchOption(list,2);
    });
})


//显示隐藏新流程导航
$('.newprocess-design-box').hover(function(){
    $('.design-newprocess-small-nav').stop().slideDown(200);
},function(){
    $('.design-newprocess-small-nav').stop().slideUp(200);
})
function StringBuilder() {
    this._strings_ = new Array;
}
StringBuilder.prototype.append = function (str) {
    this._strings_.push(str);
};
StringBuilder.prototype.toString = function () {
    return this._strings_.join("");
};
    var sortparam={
        orderBy:'Desc',
        orderField:1
    }

function batchUpdateProcStatus(status,baseInfoID,callback){
    //$.ajax({
    //    url: path + 'webajax/design/batchUpdateProcStatus',
    //    type: 'get',
    //    dataType: 'json',
    //    data:{status:status,baseInfoID:baseInfoID},
    //    cache:false,
    //    async:true,
    //    success: function (json) {
    setTimeout(function(){
        var json = {"ReturnObject":{"切切切轻轻":"未配置流程表单信息"},"Result":true,"Code":0,"Description":null};
        callback&&callback(json)
    },100);

        //},error:function(){
        //    callback&&callback();
        //}
    //});
}
function getListByStatus(status,callback){
    var param='procStatus=' + status + '&pageIndex=' + 1 + '&pageSize=' + 15000;
    //$.ajax({
    //    url: path + 'design/ajaxGetDesignProcessList?'+param,
    //    timeout: 1000,
    //    type: 'get',
    //    dataType: 'json',
    //    async:true,
    //    timeout:30000,
    //    success: function (json) {
    if (status == 2) {
        var json = {
            "ReturnObject": {
                "Item1": 3,
                "Item2": null,
                "Item3": [{
                    "ProcName": "切切切轻轻",
                    "ProcFullName": "切切切轻轻",
                    "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                    "CategoryName": "财务",
                    "StartUrl": null,
                    "VersionID": "e9be4cc3-3b94-4a66-a5f1-7af352712ccb",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 2,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": "",
                    "MarkChar": "",
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "ecb6f353-d636-4516-9631-6def62704df4",
                    "LastUpdateTime": "2016-08-15 16:40:48",
                    "CreateTime": "2016-08-02 22:24:03",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcName": "员工转正申请单",
                    "ProcFullName": "员工转正申请单_T20150079",
                    "CategoryID": "00000000-0000-0000-0000-000000000000",
                    "CategoryName": "未分类",
                    "StartUrl": "/process/page/pro",
                    "VersionID": "3e76d81b-e696-42ef-8daf-01989e72d35b",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 2,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": null,
                    "MarkChar": null,
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "80273bac-1081-4325-982d-829037570540",
                    "LastUpdateTime": "2016-08-15 17:01:16",
                    "CreateTime": "2016-08-01 10:19:15",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcName": "采购申请单",
                    "ProcFullName": "采购申请单_T20150068",
                    "CategoryID": "e4803b0c-96c1-70f2-12c5-f53aead6aebe",
                    "CategoryName": "采购",
                    "StartUrl": "/process/page/pro",
                    "VersionID": "cf48aefd-e232-401f-8a8f-21b6fc82e91a",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 2,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": "",
                    "MarkChar": "",
                    "SortIndex": 1,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "4128555b-2cf1-4d80-b2e6-7c1aeb9fa7b6",
                    "LastUpdateTime": "2016-08-15 17:01:16",
                    "CreateTime": "2016-08-01 10:19:15",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }]
            }, "Result": true, "Code": 0, "Description": null
        };
    } else if (status == 1) {
        var json = {
            "ReturnObject": {
                "Item1": 5,
                "Item2": {
                    "ProcName": "自定义流程",
                    "ProcFullName": "自定义流程",
                    "CategoryID": "83c5bbe5-29a7-4751-83b9-09b765f46786",
                    "CategoryName": "人事类",
                    "StartUrl": "/process/page/custom",
                    "VersionID": "fc4ef14f-8360-4199-9075-779f6f9ac5c0",
                    "Version": 1,
                    "CreateUser": "00000000-0000-0000-0000-000000000000",
                    "CreateUserName": "系统",
                    "LastUpdateUser": "00000000-0000-0000-0000-000000000000",
                    "LastUpdateUserName": "未知",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 1,
                    "BindApprover": false,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": null,
                    "MarkChar": null,
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "370f7aff-17b1-449e-8728-e31e0b0d2d5f",
                    "LastUpdateTime": "2016-08-01 10:19:17",
                    "CreateTime": "2016-08-01 10:19:17",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                },
                "Item3": [{
                    "ProcName": "费用支出1",
                    "ProcFullName": "费用支出1",
                    "CategoryID": "e4803b0c-96c1-70f2-12c5-f53aead6aebe",
                    "CategoryName": "采购",
                    "StartUrl": "/process/page/pro",
                    "VersionID": "dfbd33b0-b010-4849-9947-6caea45f7723",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 1,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": "",
                    "MarkChar": "",
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": {
                        "DevCustom": true,
                        "IncludeResourceJScript": "",
                        "IncludeResourceCss": "",
                        "EnableMobileCreate": false,
                        "EnableApproverFilter": false
                    },
                    "ID": "2fcafd76-4037-4aa1-bb9b-8291e15cfeda",
                    "LastUpdateTime": "2016-08-09 17:20:27",
                    "CreateTime": "2016-08-09 17:14:28",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcName": "财务报销流程",
                    "ProcFullName": "财务报销流程",
                    "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                    "CategoryName": "财务",
                    "StartUrl": "/process/page/pro",
                    "VersionID": "053a3266-77be-4e65-8cb3-a8a013d79c8e",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 1,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": "",
                    "MarkChar": "",
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "27212ec3-4f85-4e26-a33e-a65f6f74c136",
                    "LastUpdateTime": "2016-08-01 14:10:04",
                    "CreateTime": "2016-08-01 13:41:15",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcName": "请假申请单",
                    "ProcFullName": "请假申请单_T20160004",
                    "CategoryID": "00000000-0000-0000-0000-000000000000",
                    "CategoryName": "未分类",
                    "StartUrl": "/process/page/pro",
                    "VersionID": "e7995207-833b-428c-8045-daf8bb93386a",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 1,
                    "BindApprover": false,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": null,
                    "MarkChar": null,
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "8bfb5355-7027-49ca-befc-46e247accae0",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcName": "合同审批申请单",
                    "ProcFullName": "合同审批申请单_T20150017",
                    "CategoryID": "00000000-0000-0000-0000-000000000000",
                    "CategoryName": "未分类",
                    "StartUrl": "/process/page/pro",
                    "VersionID": "cdda09b5-493a-498c-b8e7-91b388b925e0",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 1,
                    "BindApprover": false,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": null,
                    "MarkChar": null,
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "842c84db-0f36-457f-8b39-7b7974805872",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcName": "出差申请单",
                    "ProcFullName": "出差申请单_T20150148",
                    "CategoryID": "83c5bbe5-29a7-4751-83b9-09b765f46786",
                    "CategoryName": "人事类",
                    "StartUrl": "/process/page/pro",
                    "VersionID": "d3e2b816-55e6-43ba-b5af-8af0ad5a7eb0",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 1,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": "",
                    "MarkChar": "",
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "9ffaae69-e532-4058-889b-bfa2d34b7b5f",
                    "LastUpdateTime": "2016-08-15 16:42:02",
                    "CreateTime": "2016-08-01 10:19:14",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }]
            }, "Result": true, "Code": 0, "Description": null
        }
    };

    setTimeout(function(){
        if (json.Result) {

            var list= _.groupBy(json.ReturnObject.Item3,'CategoryID');
            var retList= _.map(list,function(item,key){
                return {
                    list:item,
                    cid:item[0].CategoryID,
                    cname:item[0].CategoryName
                }
            })
            callback(retList);
        }else{
            i8ui.error(json.Description);
            callback(false);
        }
    },100)

        //},error:function(){

        //}
    //});
}
$(function () {
    if (getprocstatus == 0) {
        $("#procStatusName").html("草稿流程");
        $("#draftStatus").addClass("app_checked");
    } else if (getprocstatus == 1) {
        $("#procStatusName").html("已上架流程");
        $("#activeStatus").addClass("app_checked");
    }
    else if (getprocstatus == 2) {
        $("#procStatusName").html("已下架流程");
        $("#stopStatus").addClass("app_checked");
    }


    GetprocDetailList('null', getprocstatus, 1, 10);


    $("#category_app_allprocess_filters span").live("click", function () {
        var fuzzyInput=$('.fuzzy-search input');
        var searchKey=fuzzyInput.val();//获取搜索字
        $(this).siblings().removeAttr("class");
        $(this).attr("class", "app_checked");
        var catestatus = $(this).attr("cateid");
        getprocCategoryID = catestatus;
        wf_Contacts_P.pageIndex = 1;
        GetprocDetailList(getprocCategoryID, getprocstatus, 1, 10,searchKey);
    });

    $("#procproc_app_allprocess_filters span").live("click", function () {
        var searchKey=fuzzyInput.val();//获取搜索字
        $(this).siblings().removeAttr("class");
        $(this).attr("class", "app_checked");
        var statusCode = $(this).attr("proctype");
        getprocstatus = statusCode;
        BindProcStatusText();
        wf_Contacts_P.pageIndex = 1;
        GetprocDetailList(getprocCategoryID, getprocstatus, 1, 10,searchKey);
    });
    var sortPanel=$('#process_sort');
    sortPanel.on('click',function(){
        $(this).find('.app_process_type_lists_panl').show();
        return false;
    });


    $(document).on('click',function(){
        sortPanel.find('.app_process_type_lists_panl').hide();
    });

    var sortChange=function(){
        var _this=$(this);
        _this.attr('orderBy')=='Asc'?_this.attr('orderBy','Desc'):_this.attr('orderBy','Asc');
        sortparam.orderBy=_this.attr('orderBy');
        sortparam.orderField=_this.attr('orderField');
        $('#search_process').find('.searchbtn').trigger('click');
    }

    $('.tb-sort').on('click',sortChange);

    sortPanel.on('click','.app_process_type_status_name',function(e){
        var _this=$(this);
        _this.parents('.process_sort').attr({
            orderBy:_this.attr('orderBy'),
            orderField:_this.attr('orderfield')
        }).find('span').eq(0).text(_this.text()).attr('class','order'+_this.attr('orderBy'));
        $('#search_process').find('.searchbtn').trigger('click');
        _this.parents('.app_process_type_lists_panl').hide();
        return false;
    });
});



function BindProcStatusText() {
    if (getprocstatus == "")
        $("#procStatusName").html("全部");
    else if (getprocstatus == 0) {
        $("#procStatusName").html("草稿流程");
    } else if (getprocstatus == 1) {
        $("#procStatusName").html("已上架流程");
    }
    else if (getprocstatus == 2)
        $("#procStatusName").html("已下架流程");
}


var procStatusArr = ['<span class="red">草稿</span>','已上架','<span class="gray">已下架</span>'];
    var customItem = '';

function GetprocDetailList(proccategory, procStatus, pageIndex, pageSize, searchKey) {

//console.log(customItem);
    var _tbody = '';
    var _curData = null;
    var _loadbody=("<tr ><td colspan=\"7\" align='center'><div class='list-loading'>正在加载......</div></td></tr>");
    $('.app-table-datacontainer tbody').html(_loadbody);
    $('.pagination').empty();
    getprocCategoryID = proccategory || '';
    var totalSpan=$('#totalSpan').html('');
    if(getprocCategoryID == 'custom'){
            if(!!customItem){
                _tbody=customItem;
                totalSpan.html(1);
            }
        _tbody=_tbody || '<tr><td colspan="7" align="center">您现无权限查看此分类或此分类下暂无数据</td></tr>';
        $('.app-table-datacontainer tbody').html(_tbody);
        $('.app-table-datacontainer tbody').find('.btn-edit-one').parent('td').empty();
        return;
    }
    getPageIndex = pageIndex || '1';
    getPageSize = pageSize || '10';
    var getSearchKey =encodeURIComponent($.trim(searchKey))|| '';

    var param='proccategory=' + getprocCategoryID + '&procStatus=' + getprocstatus + '&pageIndex=' + getPageIndex + '&pageSize=' + getPageSize+ '&searchKey=' + getSearchKey;

    template.helper('$stringCut', function(str,len) {

        var _str = str || '',
            _len = parseInt(len || '0');

        if(_str.length<len)
        {
            return str;
        }
        console.log(len);
        return _str.substr(0,len-2)+'..';
    });


    param+='&orderBy='+sortparam.orderBy+'&orderFiled='+sortparam.orderField;
    //$.ajax({
    //    url: path + 'design/ajaxGetDesignProcessList?'+param,
    //    timeout: 1000,
       // processData: false,
       // type: 'get',
       // dataType: 'json',
       // async:true,
       // timeout:30000,
       // success: function (json) {
    if (getprocstatus == 1) {
        if (getprocCategoryID == "00000000-0000-0000-0000-000000000000") {
            var json = {
                "ReturnObject": {
                    "Item1": 2,
                    "Item2": {
                        "ProcName": "自定义流程",
                        "ProcFullName": "自定义流程",
                        "CategoryID": "83c5bbe5-29a7-4751-83b9-09b765f46786",
                        "CategoryName": "人事类",
                        "StartUrl": "/process/page/custom",
                        "VersionID": "fc4ef14f-8360-4199-9075-779f6f9ac5c0",
                        "Version": 1,
                        "CreateUser": "00000000-0000-0000-0000-000000000000",
                        "CreateUserName": "系统",
                        "LastUpdateUser": "00000000-0000-0000-0000-000000000000",
                        "LastUpdateUserName": "未知",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 1,
                        "BindApprover": false,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": null,
                        "MarkChar": null,
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "370f7aff-17b1-449e-8728-e31e0b0d2d5f",
                        "LastUpdateTime": "2016-08-01 10:19:17",
                        "CreateTime": "2016-08-01 10:19:17",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    "Item3": [{
                        "ProcName": "请假申请单",
                        "ProcFullName": "请假申请单_T20160004",
                        "CategoryID": "00000000-0000-0000-0000-000000000000",
                        "CategoryName": "未分类",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "e7995207-833b-428c-8045-daf8bb93386a",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 1,
                        "BindApprover": false,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": null,
                        "MarkChar": null,
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "8bfb5355-7027-49ca-befc-46e247accae0",
                        "LastUpdateTime": "2016-08-01 10:19:16",
                        "CreateTime": "2016-08-01 10:19:16",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    }, {
                        "ProcName": "合同审批申请单",
                        "ProcFullName": "合同审批申请单_T20150017",
                        "CategoryID": "00000000-0000-0000-0000-000000000000",
                        "CategoryName": "未分类",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "cdda09b5-493a-498c-b8e7-91b388b925e0",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 1,
                        "BindApprover": false,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": null,
                        "MarkChar": null,
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "842c84db-0f36-457f-8b39-7b7974805872",
                        "LastUpdateTime": "2016-08-01 10:19:16",
                        "CreateTime": "2016-08-01 10:19:16",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    }]
                }, "Result": true, "Code": 0, "Description": null
            }
        } else if (getprocCategoryID == "83c5bbe5-29a7-4751-83b9-09b765f46786") {
            var json = {
                "ReturnObject": {
                    "Item1": 1,
                    "Item2": {
                        "ProcName": "自定义流程",
                        "ProcFullName": "自定义流程",
                        "CategoryID": "83c5bbe5-29a7-4751-83b9-09b765f46786",
                        "CategoryName": "人事类",
                        "StartUrl": "/process/page/custom",
                        "VersionID": "fc4ef14f-8360-4199-9075-779f6f9ac5c0",
                        "Version": 1,
                        "CreateUser": "00000000-0000-0000-0000-000000000000",
                        "CreateUserName": "系统",
                        "LastUpdateUser": "00000000-0000-0000-0000-000000000000",
                        "LastUpdateUserName": "未知",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 1,
                        "BindApprover": false,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": null,
                        "MarkChar": null,
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "370f7aff-17b1-449e-8728-e31e0b0d2d5f",
                        "LastUpdateTime": "2016-08-01 10:19:17",
                        "CreateTime": "2016-08-01 10:19:17",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    "Item3": [{
                        "ProcName": "出差申请单",
                        "ProcFullName": "出差申请单_T20150148",
                        "CategoryID": "83c5bbe5-29a7-4751-83b9-09b765f46786",
                        "CategoryName": "人事类",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "d3e2b816-55e6-43ba-b5af-8af0ad5a7eb0",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 1,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "9ffaae69-e532-4058-889b-bfa2d34b7b5f",
                        "LastUpdateTime": "2016-08-15 16:42:02",
                        "CreateTime": "2016-08-01 10:19:14",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    }]
                }, "Result": true, "Code": 0, "Description": null
            }
        } else if (getprocCategoryID == "e4803b0c-96c1-70f2-12c5-f53aead6aebe") {
            var json = {"ReturnObject":{"Item1":1,"Item2":{"ProcName":"自定义流程","ProcFullName":"自定义流程","CategoryID":"83c5bbe5-29a7-4751-83b9-09b765f46786","CategoryName":"人事类","StartUrl":"/process/page/custom","VersionID":"fc4ef14f-8360-4199-9075-779f6f9ac5c0","Version":1,"CreateUser":"00000000-0000-0000-0000-000000000000","CreateUserName":"系统","LastUpdateUser":"00000000-0000-0000-0000-000000000000","LastUpdateUserName":"未知","ActDesc":null,"FormDesc":null,"ScopeDesc":null,"ProcStatus":1,"BindApprover":false,"IsGenerate":false,"InstanceCount":0,"DelInstanceCount":0,"Icon":null,"MarkChar":null,"SortIndex":0,"IsSys":false,"ExtConfig":null,"ID":"370f7aff-17b1-449e-8728-e31e0b0d2d5f","LastUpdateTime":"2016-08-01 10:19:17","CreateTime":"2016-08-01 10:19:17","AccountID":"3a1b83cb-cca7-41c1-852c-e5fceb78df4e"},"Item3":[{"ProcName":"费用支出1","ProcFullName":"费用支出1","CategoryID":"e4803b0c-96c1-70f2-12c5-f53aead6aebe","CategoryName":"采购","StartUrl":"/process/page/pro","VersionID":"dfbd33b0-b010-4849-9947-6caea45f7723","Version":1,"CreateUser":"35acfa7f-0533-4bba-99db-d2fdd6d4c5d4","CreateUserName":"杨国超","LastUpdateUser":"35acfa7f-0533-4bba-99db-d2fdd6d4c5d4","LastUpdateUserName":"杨国超","ActDesc":null,"FormDesc":null,"ScopeDesc":null,"ProcStatus":1,"BindApprover":true,"IsGenerate":false,"InstanceCount":0,"DelInstanceCount":0,"Icon":"","MarkChar":"","SortIndex":0,"IsSys":false,"ExtConfig":{"DevCustom":true,"IncludeResourceJScript":"","IncludeResourceCss":"","EnableMobileCreate":false,"EnableApproverFilter":false},"ID":"2fcafd76-4037-4aa1-bb9b-8291e15cfeda","LastUpdateTime":"2016-08-09 17:20:27","CreateTime":"2016-08-09 17:14:28","AccountID":"3a1b83cb-cca7-41c1-852c-e5fceb78df4e"}]},"Result":true,"Code":0,"Description":null}
        } else if (getprocCategoryID == "ce9a7a3b-e740-6fc3-6271-e656dc62dde9") {
            var json = {"ReturnObject":{"Item1":0,"Item2":{"ProcName":"自定义流程","ProcFullName":"自定义流程","CategoryID":"83c5bbe5-29a7-4751-83b9-09b765f46786","CategoryName":"人事类","StartUrl":"/process/page/custom","VersionID":"fc4ef14f-8360-4199-9075-779f6f9ac5c0","Version":1,"CreateUser":"00000000-0000-0000-0000-000000000000","CreateUserName":"系统","LastUpdateUser":"00000000-0000-0000-0000-000000000000","LastUpdateUserName":"未知","ActDesc":null,"FormDesc":null,"ScopeDesc":null,"ProcStatus":1,"BindApprover":false,"IsGenerate":false,"InstanceCount":0,"DelInstanceCount":0,"Icon":null,"MarkChar":null,"SortIndex":0,"IsSys":false,"ExtConfig":null,"ID":"370f7aff-17b1-449e-8728-e31e0b0d2d5f","LastUpdateTime":"2016-08-01 10:19:17","CreateTime":"2016-08-01 10:19:17","AccountID":"3a1b83cb-cca7-41c1-852c-e5fceb78df4e"},"Item3":[]},"Result":true,"Code":0,"Description":null}
        } else if(getprocCategoryID == "8ac0a5bd-be6b-d409-8694-708d94e30830"){
            var json = {"ReturnObject":{"Item1":1,"Item2":{"ProcName":"自定义流程","ProcFullName":"自定义流程","CategoryID":"83c5bbe5-29a7-4751-83b9-09b765f46786","CategoryName":"人事类","StartUrl":"/process/page/custom","VersionID":"fc4ef14f-8360-4199-9075-779f6f9ac5c0","Version":1,"CreateUser":"00000000-0000-0000-0000-000000000000","CreateUserName":"系统","LastUpdateUser":"00000000-0000-0000-0000-000000000000","LastUpdateUserName":"未知","ActDesc":null,"FormDesc":null,"ScopeDesc":null,"ProcStatus":1,"BindApprover":false,"IsGenerate":false,"InstanceCount":0,"DelInstanceCount":0,"Icon":null,"MarkChar":null,"SortIndex":0,"IsSys":false,"ExtConfig":null,"ID":"370f7aff-17b1-449e-8728-e31e0b0d2d5f","LastUpdateTime":"2016-08-01 10:19:17","CreateTime":"2016-08-01 10:19:17","AccountID":"3a1b83cb-cca7-41c1-852c-e5fceb78df4e"},"Item3":[{"ProcName":"财务报销流程","ProcFullName":"财务报销流程","CategoryID":"8ac0a5bd-be6b-d409-8694-708d94e30830","CategoryName":"财务","StartUrl":"/process/page/pro","VersionID":"053a3266-77be-4e65-8cb3-a8a013d79c8e","Version":1,"CreateUser":"35acfa7f-0533-4bba-99db-d2fdd6d4c5d4","CreateUserName":"杨国超","LastUpdateUser":"35acfa7f-0533-4bba-99db-d2fdd6d4c5d4","LastUpdateUserName":"杨国超","ActDesc":null,"FormDesc":null,"ScopeDesc":null,"ProcStatus":1,"BindApprover":true,"IsGenerate":false,"InstanceCount":0,"DelInstanceCount":0,"Icon":"","MarkChar":"","SortIndex":0,"IsSys":false,"ExtConfig":null,"ID":"27212ec3-4f85-4e26-a33e-a65f6f74c136","LastUpdateTime":"2016-08-01 14:10:04","CreateTime":"2016-08-01 13:41:15","AccountID":"3a1b83cb-cca7-41c1-852c-e5fceb78df4e"}]},"Result":true,"Code":0,"Description":null}
        } else {
            var json = {
                "ReturnObject": {
                    "Item1": 5,
                    "Item2": {
                        "ProcName": "自定义流程",
                        "ProcFullName": "自定义流程",
                        "CategoryID": "83c5bbe5-29a7-4751-83b9-09b765f46786",
                        "CategoryName": "人事类",
                        "StartUrl": "/process/page/custom",
                        "VersionID": "fc4ef14f-8360-4199-9075-779f6f9ac5c0",
                        "Version": 1,
                        "CreateUser": "00000000-0000-0000-0000-000000000000",
                        "CreateUserName": "系统",
                        "LastUpdateUser": "00000000-0000-0000-0000-000000000000",
                        "LastUpdateUserName": "未知",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 1,
                        "BindApprover": false,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": null,
                        "MarkChar": null,
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "370f7aff-17b1-449e-8728-e31e0b0d2d5f",
                        "LastUpdateTime": "2016-08-01 10:19:17",
                        "CreateTime": "2016-08-01 10:19:17",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    "Item3": [{
                        "ProcName": "出差申请单",
                        "ProcFullName": "出差申请单_T20150148",
                        "CategoryID": "83c5bbe5-29a7-4751-83b9-09b765f46786",
                        "CategoryName": "人事类",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "d3e2b816-55e6-43ba-b5af-8af0ad5a7eb0",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 1,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "9ffaae69-e532-4058-889b-bfa2d34b7b5f",
                        "LastUpdateTime": "2016-08-15 16:42:02",
                        "CreateTime": "2016-08-01 10:19:14",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    }, {
                        "ProcName": "费用支出1",
                        "ProcFullName": "费用支出1",
                        "CategoryID": "e4803b0c-96c1-70f2-12c5-f53aead6aebe",
                        "CategoryName": "采购",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "dfbd33b0-b010-4849-9947-6caea45f7723",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 1,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": {
                            "DevCustom": true,
                            "IncludeResourceJScript": "",
                            "IncludeResourceCss": "",
                            "EnableMobileCreate": false,
                            "EnableApproverFilter": false
                        },
                        "ID": "2fcafd76-4037-4aa1-bb9b-8291e15cfeda",
                        "LastUpdateTime": "2016-08-09 17:20:27",
                        "CreateTime": "2016-08-09 17:14:28",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    }, {
                        "ProcName": "财务报销流程",
                        "ProcFullName": "财务报销流程",
                        "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                        "CategoryName": "财务",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "053a3266-77be-4e65-8cb3-a8a013d79c8e",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 1,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "27212ec3-4f85-4e26-a33e-a65f6f74c136",
                        "LastUpdateTime": "2016-08-01 14:10:04",
                        "CreateTime": "2016-08-01 13:41:15",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    }, {
                        "ProcName": "请假申请单",
                        "ProcFullName": "请假申请单_T20160004",
                        "CategoryID": "00000000-0000-0000-0000-000000000000",
                        "CategoryName": "未分类",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "e7995207-833b-428c-8045-daf8bb93386a",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 1,
                        "BindApprover": false,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": null,
                        "MarkChar": null,
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "8bfb5355-7027-49ca-befc-46e247accae0",
                        "LastUpdateTime": "2016-08-01 10:19:16",
                        "CreateTime": "2016-08-01 10:19:16",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    }, {
                        "ProcName": "合同审批申请单",
                        "ProcFullName": "合同审批申请单_T20150017",
                        "CategoryID": "00000000-0000-0000-0000-000000000000",
                        "CategoryName": "未分类",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "cdda09b5-493a-498c-b8e7-91b388b925e0",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 1,
                        "BindApprover": false,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": null,
                        "MarkChar": null,
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "842c84db-0f36-457f-8b39-7b7974805872",
                        "LastUpdateTime": "2016-08-01 10:19:16",
                        "CreateTime": "2016-08-01 10:19:16",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    }]
                }, "Result": true, "Code": 0, "Description": null
            };
        }
    } else if (getprocstatus == 2) {
        var json = {
            "ReturnObject": {
                "Item1": 3,
                "Item2": null,
                "Item3": [{
                    "ProcName": "员工转正申请单",
                    "ProcFullName": "员工转正申请单_T20150079",
                    "CategoryID": "00000000-0000-0000-0000-000000000000",
                    "CategoryName": "未分类",
                    "StartUrl": "/process/page/pro",
                    "VersionID": "3e76d81b-e696-42ef-8daf-01989e72d35b",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 2,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": null,
                    "MarkChar": null,
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "80273bac-1081-4325-982d-829037570540",
                    "LastUpdateTime": "2016-08-15 17:01:16",
                    "CreateTime": "2016-08-01 10:19:15",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcName": "采购申请单",
                    "ProcFullName": "采购申请单_T20150068",
                    "CategoryID": "e4803b0c-96c1-70f2-12c5-f53aead6aebe",
                    "CategoryName": "采购",
                    "StartUrl": "/process/page/pro",
                    "VersionID": "cf48aefd-e232-401f-8a8f-21b6fc82e91a",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 2,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": "",
                    "MarkChar": "",
                    "SortIndex": 1,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "4128555b-2cf1-4d80-b2e6-7c1aeb9fa7b6",
                    "LastUpdateTime": "2016-08-15 17:01:16",
                    "CreateTime": "2016-08-01 10:19:15",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcName": "切切切轻轻",
                    "ProcFullName": "切切切轻轻",
                    "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                    "CategoryName": "财务",
                    "StartUrl": null,
                    "VersionID": "e9be4cc3-3b94-4a66-a5f1-7af352712ccb",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 2,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": "",
                    "MarkChar": "",
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "ecb6f353-d636-4516-9631-6def62704df4",
                    "LastUpdateTime": "2016-08-15 16:40:48",
                    "CreateTime": "2016-08-02 22:24:03",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }]
            }, "Result": true, "Code": 0, "Description": null
        }
    } else if (getprocstatus == "0") {
        var json = {
            "ReturnObject": {
                "Item1": 4,
                "Item2": null,
                "Item3": [{
                    "ProcName": "zdZcdads",
                    "ProcFullName": "zdZcdads",
                    "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                    "CategoryName": "财务",
                    "StartUrl": null,
                    "VersionID": "6db90759-eba5-4ad0-9581-05757bd2cb3c",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 0,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": "",
                    "MarkChar": "",
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "8d5df111-e2e2-4ccc-ac29-228711156f57",
                    "LastUpdateTime": "2016-08-14 21:17:40",
                    "CreateTime": "2016-08-14 21:17:40",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcName": "费用支出",
                    "ProcFullName": "费用支出",
                    "CategoryID": "e4803b0c-96c1-70f2-12c5-f53aead6aebe",
                    "CategoryName": "采购",
                    "StartUrl": "/process/page/routecustom",
                    "VersionID": "bd915bed-5adb-4947-88e5-f59ce10b417e",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 0,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": "",
                    "MarkChar": "",
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "590d3db3-694d-46dc-8c77-f184269d4841",
                    "LastUpdateTime": "2016-08-09 17:09:40",
                    "CreateTime": "2016-08-09 17:09:40",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcName": "采购申请单",
                    "ProcFullName": "采购申请单",
                    "CategoryID": "e4803b0c-96c1-70f2-12c5-f53aead6aebe",
                    "CategoryName": "采购",
                    "StartUrl": "/process/page/routecustom",
                    "VersionID": "e55e1b1f-6187-433b-8334-a915895fe623",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 0,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": "",
                    "MarkChar": "",
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "0920f903-746d-4d6f-b666-33319e116e89",
                    "LastUpdateTime": "2016-08-09 16:54:16",
                    "CreateTime": "2016-08-09 16:54:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcName": "报销单报销",
                    "ProcFullName": "报销单报销",
                    "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                    "CategoryName": "财务",
                    "StartUrl": null,
                    "VersionID": "29c6a9e1-18c6-4ac7-9c8d-4f5f559e6681",
                    "Version": 1,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "CreateUserName": "杨国超",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "LastUpdateUserName": "杨国超",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 0,
                    "BindApprover": true,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": "",
                    "MarkChar": "",
                    "SortIndex": 1,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "98388045-34e4-4224-beee-ef28e1d170ba",
                    "LastUpdateTime": "2016-08-01 13:39:55",
                    "CreateTime": "2016-08-01 13:39:55",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }]
            }, "Result": true, "Code": 0, "Description": null
        }
    } else if (getprocstatus == 3) {
        var json = {
            "ReturnObject": {
                "Item1": 2,
                "Item2": null,
                "Item3": [
                    {
                        "ProcName": "空间来看据了解",
                        "ProcFullName": "空间来看据了解",
                        "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                        "CategoryName": "财务",
                        "StartUrl": null,
                        "VersionID": "d3b2f322-0bb9-4cd2-b9ce-01cd58150736",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 3,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "0184c652-600a-4298-864b-1f144a597a9d",
                        "LastUpdateTime": "2016-08-15 16:39:50",
                        "CreateTime": "2016-08-09 19:14:44",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    {
                        "ProcName": "dfashdf",
                        "ProcFullName": "dfashdf",
                        "CategoryID": "ce9a7a3b-e740-6fc3-6271-e656dc62dde9",
                        "CategoryName": "法务",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "bf7fe5a9-368a-46f6-8e7f-4d00d652d319",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 3,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "9fcbe02a-81ac-4608-af5a-52a7b6c1842c",
                        "LastUpdateTime": "2016-08-15 16:39:47",
                        "CreateTime": "2016-08-12 18:16:30",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    }
                ]
            },
            "Result": true,
            "Code": 0,
            "Description": null
        };
    } else if (getprocstatus == "") {
        var json = {
            "ReturnObject": {
                "Item1": 12,
                "Item2": {
                    "ProcName": "自定义流程",
                    "ProcFullName": "自定义流程",
                    "CategoryID": "83c5bbe5-29a7-4751-83b9-09b765f46786",
                    "CategoryName": "人事类",
                    "StartUrl": "/process/page/custom",
                    "VersionID": "fc4ef14f-8360-4199-9075-779f6f9ac5c0",
                    "Version": 1,
                    "CreateUser": "00000000-0000-0000-0000-000000000000",
                    "CreateUserName": "系统",
                    "LastUpdateUser": "00000000-0000-0000-0000-000000000000",
                    "LastUpdateUserName": "未知",
                    "ActDesc": null,
                    "FormDesc": null,
                    "ScopeDesc": null,
                    "ProcStatus": 1,
                    "BindApprover": false,
                    "IsGenerate": false,
                    "InstanceCount": 0,
                    "DelInstanceCount": 0,
                    "Icon": null,
                    "MarkChar": null,
                    "SortIndex": 0,
                    "IsSys": false,
                    "ExtConfig": null,
                    "ID": "370f7aff-17b1-449e-8728-e31e0b0d2d5f",
                    "LastUpdateTime": "2016-08-01 10:19:17",
                    "CreateTime": "2016-08-01 10:19:17",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                },
                "Item3": [
                    {
                        "ProcName": "员工转正申请单",
                        "ProcFullName": "员工转正申请单_T20150079",
                        "CategoryID": "00000000-0000-0000-0000-000000000000",
                        "CategoryName": "未分类",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "3e76d81b-e696-42ef-8daf-01989e72d35b",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 2,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": null,
                        "MarkChar": null,
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "80273bac-1081-4325-982d-829037570540",
                        "LastUpdateTime": "2016-08-15 17:01:16",
                        "CreateTime": "2016-08-01 10:19:15",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    {
                        "ProcName": "采购申请单",
                        "ProcFullName": "采购申请单_T20150068",
                        "CategoryID": "e4803b0c-96c1-70f2-12c5-f53aead6aebe",
                        "CategoryName": "采购",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "cf48aefd-e232-401f-8a8f-21b6fc82e91a",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 2,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 1,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "4128555b-2cf1-4d80-b2e6-7c1aeb9fa7b6",
                        "LastUpdateTime": "2016-08-15 17:01:16",
                        "CreateTime": "2016-08-01 10:19:15",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    {
                        "ProcName": "出差申请单",
                        "ProcFullName": "出差申请单_T20150148",
                        "CategoryID": "83c5bbe5-29a7-4751-83b9-09b765f46786",
                        "CategoryName": "人事类",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "d3e2b816-55e6-43ba-b5af-8af0ad5a7eb0",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 1,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "9ffaae69-e532-4058-889b-bfa2d34b7b5f",
                        "LastUpdateTime": "2016-08-15 16:42:02",
                        "CreateTime": "2016-08-01 10:19:14",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    {
                        "ProcName": "切切切轻轻",
                        "ProcFullName": "切切切轻轻",
                        "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                        "CategoryName": "财务",
                        "StartUrl": null,
                        "VersionID": "e9be4cc3-3b94-4a66-a5f1-7af352712ccb",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 2,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "ecb6f353-d636-4516-9631-6def62704df4",
                        "LastUpdateTime": "2016-08-15 16:40:48",
                        "CreateTime": "2016-08-02 22:24:03",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    {
                        "ProcName": "空间来看据了解",
                        "ProcFullName": "空间来看据了解",
                        "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                        "CategoryName": "财务",
                        "StartUrl": null,
                        "VersionID": "d3b2f322-0bb9-4cd2-b9ce-01cd58150736",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 3,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "0184c652-600a-4298-864b-1f144a597a9d",
                        "LastUpdateTime": "2016-08-15 16:39:50",
                        "CreateTime": "2016-08-09 19:14:44",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    {
                        "ProcName": "dfashdf",
                        "ProcFullName": "dfashdf",
                        "CategoryID": "ce9a7a3b-e740-6fc3-6271-e656dc62dde9",
                        "CategoryName": "法务",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "bf7fe5a9-368a-46f6-8e7f-4d00d652d319",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 3,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "9fcbe02a-81ac-4608-af5a-52a7b6c1842c",
                        "LastUpdateTime": "2016-08-15 16:39:47",
                        "CreateTime": "2016-08-12 18:16:30",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    {
                        "ProcName": "zdZcdads",
                        "ProcFullName": "zdZcdads",
                        "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                        "CategoryName": "财务",
                        "StartUrl": null,
                        "VersionID": "6db90759-eba5-4ad0-9581-05757bd2cb3c",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 0,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "8d5df111-e2e2-4ccc-ac29-228711156f57",
                        "LastUpdateTime": "2016-08-14 21:17:40",
                        "CreateTime": "2016-08-14 21:17:40",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    {
                        "ProcName": "撒旦法",
                        "ProcFullName": "撒旦法",
                        "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                        "CategoryName": "财务",
                        "StartUrl": null,
                        "VersionID": "d75a7c1c-9e1e-4c73-9888-81c6c9ae2b0f",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 3,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "69371c94-4f65-48a7-971a-e6429230e5dc",
                        "LastUpdateTime": "2016-08-12 10:23:33",
                        "CreateTime": "2016-08-09 19:13:09",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    {
                        "ProcName": "说的",
                        "ProcFullName": "说的",
                        "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                        "CategoryName": "财务",
                        "StartUrl": null,
                        "VersionID": "b8b7ff0a-1be3-4e2a-99e7-c1ba686102ca",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 3,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "45d8eaf4-46cb-45a6-a5ed-14f120cf2c49",
                        "LastUpdateTime": "2016-08-12 10:23:30",
                        "CreateTime": "2016-08-09 17:45:13",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    {
                        "ProcName": "个方法方法",
                        "ProcFullName": "个方法方法",
                        "CategoryID": "8ac0a5bd-be6b-d409-8694-708d94e30830",
                        "CategoryName": "财务",
                        "StartUrl": "/process/page/pro",
                        "VersionID": "749806e9-13e4-4d01-95a6-c240b93d8ce6",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": "杨国超",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": "杨国超",
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 3,
                        "BindApprover": true,
                        "IsGenerate": false,
                        "InstanceCount": 0,
                        "DelInstanceCount": 0,
                        "Icon": "",
                        "MarkChar": "",
                        "SortIndex": 0,
                        "IsSys": false,
                        "ExtConfig": null,
                        "ID": "10873528-740e-4b5a-ad68-7838c9d48acb",
                        "LastUpdateTime": "2016-08-12 09:59:32",
                        "CreateTime": "2016-08-09 19:21:08",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    }
                ]
            },
            "Result": true,
            "Code": 0,
            "Description": null
        }
    };
    //解决ajax延时问题，设置时间函数：
    setTimeout(function(){
        if (json.Result) {
            var resultData = json.ReturnObject;
            var tpl=require('../template/design/design-list.tpl');
            var render=template(tpl);
            if(!customItem&&resultData.Item2){
                resultData.Item2.CategoryName = '自定义流程';
                customItem=render({Item3:[resultData.Item2]});
            }

            //如果是全部，需要
            _tbody=render(resultData);

            var _flag = false;
            if(getprocCategoryID == 'null' && !(getSearchKey) && !!customItem){
                _tbody = customItem + _tbody;
                _flag = true;
            }
            _tbody=_tbody || '<tr><td colspan="7" align="center">您现无权限查看此分类或此分类下暂无数据</td></tr>';
            $('.app-table-datacontainer tbody').html(_tbody);

            //删除自定义流程的编辑和删除按钮
            if(_flag){
                $('.app-table-datacontainer tbody').find('tr').eq(0).find('.btn-edit-one').parent('td').empty();
            }
            totalSpan.html(resultData.Item1);
            //创建分页
            fCreateTrunPage(resultData.Item1);
        }
    },100)

        //}
    //});
}

var fCreateTrunPage = function(total){


    //分页控件绑定
    seajs.use('./js/common/fw_pagination.js', function (pn) {
        pn.pagination({
            ctr: '.pagination',
            totalPageCount: total,
            pageSize: wf_Contacts_P.pageSize,
            current: wf_Contacts_P.pageIndex,
            fun: function (new_current_page, containers) {
                wf_PageCallback(new_current_page,containers);
            }, jump: {
                text: '跳转'
            }
        });
    });
}

var wf_Contacts_P = { pageIndex: 1, pageSize: 10 };
function wf_PageCallback(index, jq) {
    wf_Contacts_P.pageIndex = index;
    var fuzzyInput=$('.fuzzy-search input');
    var searchKey=fuzzyInput.val();
    GetprocDetailList(getprocCategoryID, getprocstatus, index, getPageSize,searchKey);
}

//搜索功能
function searchfn(){

    var searchdd=$('.search-dd');
    var clear_txt_btn=$('.app_clear_txt_btn');
    clear_txt_btn.click(function(){
        fuzzyInput.val('');
        searchbtn.trigger('click');
        clear_txt_btn.hide();
    })
    var searchbtn=$('.searchbtn').click(function(){
        var searchKey=fuzzyInput.val();
        wf_Contacts_P.pageIndex = 1;
        var catestatus = $("#category_app_allprocess_filters").find('.app_checked').attr("cateid");
        getprocCategoryID = catestatus;

        var statusCode = $("#procproc_app_allprocess_filters").find('.app_checked').attr("proctype");
        getprocstatus = statusCode;
        BindProcStatusText();
        GetprocDetailList(getprocCategoryID, getprocstatus, 1, 10,searchKey);
    });
    fuzzyInput.on('keydown',function(e){
        if(e.keyCode==13){
            searchbtn.trigger('click');
        }
    });
    var _tempval='';
    fuzzyInput.on('keyup',function(ev){
        var i_val=fuzzyInput.val();
        if(i_val){
            clear_txt_btn.show();
        }else{
            clear_txt_btn.hide();
            _tempval!=i_val && ev.keyCode==8 && searchbtn.trigger('click');
        }
        _tempval= $.trim(i_val);
    })
}
    //删除流程
    $("div[class='app-table-datacontainer'] a[delid]").live("click",function() {
        var delID = $(this).attr("delid");
        //确定要删除吗?
        // "删除后，流程的相关信息都将同步删除且流程动态和@评论无<br/>法恢复。即流程发起人、审批人、收文人都无法再查看到相<br/>关流程，此功能通常用于清除测试数据及垃圾数据时使用"
        i8ui.confirm({'title':'<div class="ct-ly-tips">确定要删除吗？</div><div class="ct-ly-conts" style="text-align: left">删除后，流程的相关信息都将同步删除且流程动态和@评论无法恢复。即流程发起人、审批人、收文人都无法再查看到相关流程，此功能通常用于清除测试数据及垃圾数据时使用</div>','body':''},function(submit) {
            $.ajax({url: encodeURI(path+'webajax/design/delproc'), type: 'get', dataType: 'json',
                data: 'delID=' + delID, async: false, success: function (json) {
                    if (json.Result)
                        GetprocDetailList('null', getprocstatus, 1, 10);
                    else
                        i8ui.alert({title: "删除失败,请联系管理员!"});
                }
            });
            submit.close();
        })
    })
    //恢复流程
    $("div[class='app-table-datacontainer'] a[recoveryID]").live("click",function() {
        var recoveryID = $(this).attr("recoveryID");
        i8ui.confirm({'title':'<div class="ct-ly-tips">确定要恢复此流程吗?</div><div class="ct-ly-conts" style="text-align: left">恢复后，流程发起人、审批人、收文人可在流程记录中查看相关流程。</div>','body':''},function(submit) {
            $.ajax({url: encodeURI(path+'webajax/design/recoveryDelProc'), type: 'get', dataType: 'json',
                data: 'delID=' + recoveryID, async: false, success: function (json) {
                    if (json.Result)
                        GetprocDetailList('null', getprocstatus, 1, 10);
                    else
                        i8ui.alert({title: "删除失败,请联系管理员!"});
                }
            });
            submit.close();
        })
    })
searchfn();
})