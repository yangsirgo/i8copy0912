/**
 * Created by Ling on 2014/11/17.
 */
define(function (require, exports) {
    var i8ui = require("../common/i8ui.js");
    var i8selector = require("../plugins/i8selector/fw_selector");
    var app_guid = require("../activity/app_newguid");
    var util = require('../common/util.js');
    var adv2ProcSet = null;//流程高级开发配置
    var desginBox = null;
    var select1 = null; //选人控件-收文
    var select2 = null; //选人控件-发起限制
    var procSetID;
    window.quitWindow = function () {
        window.open('/logout', "_self");
    }

    var checkDef = $.Deferred();

    //专项角色弹出框
    var check_pop = $('<div/>');

    //获取专项角色数据
    var getRoleData = function (checkDef) {
        //$.ajax({
        //    url:i8_session.ajaxWfHost+'webajax/setting/getRoleData',
        //    type: 'get',
        //    data:{pageIndex:1,pageSize:100000},
        //    dataType: 'json',
        //    success: function (data) {
        var data = {
            "Code": 0,
            "Result": true,
            "ReturnObject": {
                "Item1": 6,
                "Item2": [{
                    "RoleName": "CEO/总经理/总裁",
                    "UserID": ["35acfa7f-0533-4bba-99db-d2fdd6d4c5d4"],
                    "UserName": "杨国超",
                    "Type": 6,
                    "IsSys": true,
                    "RoleIntro": "公司的最高行政角色，通常在重要流程审批中作为最后决策环节，例如财务审批等",
                    "ID": "b36d97c9-60be-4ecb-8717-083c95dd0ba4",
                    "LastUpdateTime": "2016-08-01 14:41:32",
                    "CreateTime": "2016-08-01 10:19:13",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "RoleName": "财务专员",
                    "UserID": ["6783b50b-97b7-46eb-be22-0da57f2ddc4c"],
                    "UserName": "caiwu",
                    "Type": 2,
                    "IsSys": true,
                    "RoleIntro": "重点参与财务相关流程的审批，例如：费用报销流程、付款申请流程等",
                    "ID": "77c63c34-4c47-46cb-96c7-3129206bcc78",
                    "LastUpdateTime": "2016-08-09 16:16:22",
                    "CreateTime": "2016-08-01 10:19:13",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "RoleName": "人事专员",
                    "UserID": ["87bf4b7e-d314-48a5-91ff-1ad3d13b9320"],
                    "UserName": "renshi",
                    "Type": 1,
                    "IsSys": true,
                    "RoleIntro": "重点参与人事相关流程的审批，例如：新员工入职流程、员工离职申请等",
                    "ID": "d33d1748-f8df-4f7d-9656-6f5ae756ab81",
                    "LastUpdateTime": "2016-08-09 16:17:28",
                    "CreateTime": "2016-08-01 10:19:13",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "RoleName": "行政专员",
                    "UserID": ["c3943716-ab49-48ea-b7f3-1dc944c5792c"],
                    "UserName": "RONG",
                    "Type": 5,
                    "IsSys": true,
                    "RoleIntro": "重点参与行政相关流程的审批，例如：名片申请流程、考勤假期流程等",
                    "ID": "0514b9a0-6648-412e-99fc-57410687ede2",
                    "LastUpdateTime": "2016-08-09 16:17:16",
                    "CreateTime": "2016-08-01 10:19:13",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "RoleName": "采购专员",
                    "UserID": ["c3943716-ab49-48ea-b7f3-1dc944c5792c"],
                    "UserName": "RONG",
                    "Type": 4,
                    "IsSys": true,
                    "RoleIntro": "重点参与采购相关流程的审批，例如：采购申请流程等",
                    "ID": "d949eda3-a58c-4128-80c5-7491afa0b390",
                    "LastUpdateTime": "2016-08-09 16:17:02",
                    "CreateTime": "2016-08-01 10:19:13",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "RoleName": "法务专员",
                    "UserID": ["87bf4b7e-d314-48a5-91ff-1ad3d13b9320"],
                    "UserName": "renshi",
                    "Type": 3,
                    "IsSys": true,
                    "RoleIntro": "重点参与法务相关流程的审批，例如：合同审批流程等",
                    "ID": "dc51284c-a11c-4c52-be81-b9a5146352b2",
                    "LastUpdateTime": "2016-08-09 16:16:44",
                    "CreateTime": "2016-08-01 10:19:13",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }]
            },
            "Description": ""
        }
        if (!data.Result) {
            check_pop.html(data.Description);
            return;
        }
        if (data.ReturnObject.Item2.length == 0) {
            check_pop.html('暂无有专项角色！');
            return;
        }
        var tpl = require('../template/design/specialrole-check-pop.tpl');
        var render = template(tpl);
        var html = render(data.ReturnObject);
        check_pop.html(html);
        checkDef.resolve();
        //},error: function(e1,e2,e3){
        //    checkDef.resolve();
        //    check_pop.html('获取专项角色列表时请求超时，请检查网络！');
        //}
        //});
        return checkDef;
    }
    var getRoleDef = getRoleData(checkDef);
    $('#showspecialrole').on('click', function () {
        $('#receiptbyRole').trigger('click');
        var selectrole = $('#selectrole');
        var rolestring = '';
        selectrole.find('.app-checkbox').each(function () {
            rolestring += '#' + $(this).attr('roleID');
        });
        var special_box = i8ui.showbox({
            title: '请选择专项角色',
            cont: check_pop.html()
        });
        $special_box = $(special_box);
        $special_box.find('.set-checked-box-list').mCustomScrollbar({//添加滚动条功能
            scrollButtons: {
                enable: true
            },
            theme: "dark-thin"
        });

        $special_box.find('.checked-item').each(function () {
            var _this = $(this).find('.app-checkbox');
            if (rolestring.search(_this.attr('roleID')) > 0) {
                _this.addClass('checked');
            } else {
                _this.removeClass('checked');
            }
        });
        $special_box.on('click', '.app-checkbox,.checked-label', function () {
            $(this).parent().find('.app-checkbox').toggleClass('checked');
        });

        //关闭弹窗
        $special_box.on('click', '.ct-cancel', function () {
            special_box.close();
        });

        //确认
        $special_box.on('click', '.ct-confirm', function () {
            var selectrole_arr = [];
            $special_box.find('.app-checkbox.checked').each(function () {
                var _this = $(this);
                var roleID = _this.attr('roleID');
                var roleName = _this.attr('roleName');
                var userName = _this.attr('userName');
                selectrole_arr.push('<span>\
                    <span class="design-bg-icons3 app-checkbox checked no-float v--4" roleID="' + roleID + '" ></span>\
                    <label class="no-float app-checkbox-txt">' + roleName + '(' + userName + ')</label>\
                </span>');
            });
            selectrole.html(selectrole_arr.join(''));
            special_box.close();
        });
    })

    //第一步
    function init() {
        $("#ddl_OrgsType").setSelect({_default: true});//初始化
        $("#ddl_CategoryType").setSelect();//初始化
        SelectionControl(); //加载选人控件
        //判断是B用户还是C用户
        if ($(".design-form-nav li:last").attr("class") != "fw_hidden")//有权限代表是C用户
            $("#btn_actDraft").hide();
        //上传到模板库按钮
        if (tamplatePowerAid != i8_session.aid.replace(/-/g, ''))
            $("#btn_uploadTemplate").hide();
        //判断baseinfoID是否为空，不为空则代表修改操作。
        if (js_wf_BaseInfoID != "") {
            //$("#ddl_OrgsType").unbind("click");
            //根据baseinfoID获取流程基本信息
            //$.get(i8_session.ajaxWfHost + 'webajax/design/getdesignbaseinfo', {baseinfoid: js_wf_BaseInfoID}, function (json) {
            var json = {
                "ReturnObject": {
                    "Item1": {
                        "ProcFullName": "请假申请单_T20160004",
                        "OrgStructure": 1,
                        "StartActID": "22923d78-126a-4de5-90d6-5688f9037d32",
                        "ActivityVersion": "d9e9056f-5bf7-4f11-b40f-88d88a2eb2f8",
                        "FormID": "a53f5154-e165-478a-ae8e-1bdeb2da9ed7",
                        "GuidID": "00000000-0000-0000-0000-000000000000",
                        "Version": 1,
                        "StartUrl": "/process/page/pro",
                        "ProcType": 0,
                        "Duration": 0,
                        "ProcDesignMetaData": "<mxGraphModel><root><mxCell id=\"0\" /><mxCell id=\"1\" parent=\"0\" /><StartActivity value=\" \" Version=\"\" id=\"22923d78-126a-4de5-90d6-5688f9037d32\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/tools_start.png;rounded=true;fillColor=#93DF00;imageAlign=center;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"167\" y=\"40\" width=\"22\" height=\"22\" as=\"geometry\" /></mxCell></StartActivity><EndActivity value=\" \" Version=\"\" id=\"7958a088-aac2-4030-9bae-720ad0b51a78\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/tools_end.png;rounded=true;fillColor=#f97e76;imageAlign=center;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"795\" y=\"40\" width=\"22\" height=\"22\" as=\"geometry\" /></mxCell></EndActivity><Sequence_ReportActivity value=\"上级审批\" Version=\"2\" id=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/new_icon_1.png;gradientDirection=south;rounded=true;perimeterspacing=6;fontColor=#ffffff;fillColor=#2ca3da;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"223\" y=\"30\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_ReportActivity><mxCell id=\"27eebcb9-4cd0-4079-a958-8a02bcadea04\" value=\" \" parent=\"1\" source=\"22923d78-126a-4de5-90d6-5688f9037d32\" target=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><Sequence_RoleActivity value=\"CEO审批\" Version=\"2\" id=\"c34e1c44-753e-41af-bd2c-e8b5d56fd8c3\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/new_icon_1.1.png;gradientDirection=south;rounded=true;fontColor=#ffffff;perimeterspacing=6;fillColor=#0bb59b;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"408\" y=\"84\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_RoleActivity><mxCell id=\"07ebc81e-a6be-4d39-9282-e0e886030c1c\" value=\"　大于24小时\" style=\"strokeColor\" parent=\"1\" source=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\" target=\"c34e1c44-753e-41af-bd2c-e8b5d56fd8c3\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><Sequence_RoleActivity value=\"人事审批\" Version=\"2\" id=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/new_icon_1.1.png;gradientDirection=south;rounded=true;fontColor=#ffffff;perimeterspacing=6;fillColor=#0bb59b;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"578\" y=\"30\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_RoleActivity><mxCell id=\"28bf0545-5197-4815-a5af-29045f72e910\" value=\" \" style=\"strokeColor\" parent=\"1\" source=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\" target=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><mxCell id=\"6739661f-5115-4711-b94e-84f7a5155c0b\" value=\" \" parent=\"1\" source=\"c34e1c44-753e-41af-bd2c-e8b5d56fd8c3\" target=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><mxCell id=\"00c842c0-06b4-473e-b7d1-f7ffb10c1b79\" value=\" \" parent=\"1\" source=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\" target=\"7958a088-aac2-4030-9bae-720ad0b51a78\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell></root></mxGraphModel>",
                        "ProcStepStatus": 0,
                        "ProcStatus": 2,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "UpdateTime": "2016-08-01 10:19:16",
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "TemplateCode": "T20160004",
                        "IsSkip": true,
                        "Config": null,
                        "FieldList": null,
                        "ID": "e7995207-833b-428c-8045-daf8bb93386a",
                        "LastUpdateTime": "2016-08-16 19:28:41",
                        "CreateTime": "2016-08-01 10:19:16",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    "Item2": [],
                    "Item3": [],
                    "Item4": null,
                    "Item5": null,
                    "Item6": {
                        "ProcName": "请假申请单",
                        "ProcFullName": "请假申请单_T20160004",
                        "CategoryID": "00000000-0000-0000-0000-000000000000",
                        "CategoryName": null,
                        "StartUrl": null,
                        "VersionID": "e7995207-833b-428c-8045-daf8bb93386a",
                        "Version": 1,
                        "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "CreateUserName": null,
                        "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                        "LastUpdateUserName": null,
                        "ActDesc": null,
                        "FormDesc": null,
                        "ScopeDesc": null,
                        "ProcStatus": 2,
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
                        "LastUpdateTime": "2016-08-16 19:28:41",
                        "CreateTime": "2016-08-01 10:19:16",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    },
                    "Item7": null
                }, "Result": true, "Code": 0, "Description": ""
            }
            if (json.Result) {
                var resultData = json.ReturnObject;
                var procBaseInfo = resultData.Item1; //基本信息类
                var procRecv = resultData.Item2; //收文类
                var procAuth = resultData.Item3; //发起类
                var procGuid = resultData.Item4; //说明类
                var procCategory = resultData.Item5; //流程类别类
                var procSet = resultData.Item6; //流程类别类
                var procRule = resultData.Item7 || {};//流程编号规则设置
                if (procRule.FolioPrefix) { //存在规则
                    $('#ruleRadio').find('.app-radio[type=1]').trigger('click');
                    $('#folioPrefix').val(procRule.FolioPrefix);
                    $('#folioInit').val((Math.pow(10, procRule.FolioNumLength - 1) + '').substr(1) + procRule.InitIndex);
                    $('#folioResetType').val(procRule.ResetRule);
                }
                procSetID = procSet.ID;
                diagramMetaData = procBaseInfo.ProcDesignMetaData || ''; //设计器数据

                //流程二次开发设置加载
                if (procSet.ExtConfig) {
                    adv2ProcSet = procSet.ExtConfig;
                }
                //流程状态
                if (procBaseInfo.ProcStatus == 2) {
                    $("#btn_draft,#btn_actDraft").hide();
                }
                //更改所有连线环节的ID。改为GUID，兼容老数据。2014.4.19日后的新数据不存在此问题  容错
                if (diagramMetaData != "" && diagramMetaData != null) {
                    var designerXml = $.parseXML(diagramMetaData);
                    var lineArray = $(designerXml).find("mxCell[source]");
                    for (var i = 0; i < lineArray.length; i++) {
                        if (!Guid.IsGuid($(lineArray[i]).attr("id"))) {//不为GUId则修改
                            $(lineArray[i]).attr("id", Guid.NewGuid().ToString());
                        }
                    }
                    //兼容解析
                    var userAgent = window.navigator.userAgent.toLowerCase();
                    $.browser.msie8 = $.browser.msie && /msie 8\.0/i.test(userAgent);
                    $.browser.msie7 = $.browser.msie && /msie 7\.0/i.test(userAgent);
                    if ($.browser.msie8 || $.browser.msie7) {
                        diagramMetaData = designerXml.xml;
                    } else {
                        diagramMetaData = (new XMLSerializer()).serializeToString(designerXml);
                    }
                }
                $("#span_design,#span_custom").removeClass("checked");
                if (procBaseInfo.ProcType == 0)//自主设计流程
                    $("#span_design").addClass("checked");
                if (procBaseInfo.ProcType == 3) {//自定义流程
                    $("#span_custom").addClass("checked");
                    $("#div_mxGraphView").html("<img src='" + i8_session.resWfHost + "default/images/design/ProcCustomView.png'>");
                }
                $("#txt_name").val(procSet.ProcName); //流程名称

                $("#lbl_procTitle").text(util.stringCut(procSet.ProcName, 60));

                $("#txt_order").val(procSet.SortIndex);//流程排序
                $("#ddl_OrgsType").setValue(procBaseInfo.OrgStructure); //组织架构
                if (procCategory != null)
                    $("#ddl_CategoryType").setValue(procCategory.ID); //流程类别
                if (procGuid != null)//环节说明
                    $("#txt_Actdirections").val(procGuid.ActDesc);
                if (procRecv != "") {//收文人
                    var userData = "";
                    var roleData = "";
                    for (var i = 0; i < procRecv.length; i++) {
                        if (procRecv[i].RecvType == 0)//用户
                            userData += '"' + procRecv[i].Receiver + '",';
                        if (procRecv[i].RecvType == 1)//角色
                            roleData += procRecv[i].Receiver + ",";
                    }
                    if (userData != "") {
                        userData = '[' + userData.substring(0, userData.length - 1) + "]";
                        select1.loadData($.parseJSON(userData));
                        $('#receiptbyUser').trigger('click');
                    } else {
                        $.when(getRoleDef).done(function () {
                            var selectrole_arr = [];
                            for (var i = 0; i < procRecv.length; i++) {
                                var item = check_pop.find('span.app-checkbox[roleID="' + procRecv[i].Receiver + '"]');
                                selectrole_arr.push('<span>\
                                    <span class="design-bg-icons3 app-checkbox checked no-float v--4" roleID="' + item.attr('roleID') + '" ></span>\
                                    <label class="no-float app-checkbox-txt">' + item.attr('roleName') + '(' + item.attr('userName') + ')</label>\
                                    </span>');
                            }

                            $('#selectrole').html(selectrole_arr.join(''));
                            $('#receiptbyRole').trigger('click');
                        });
                    }
                }
                if (procAuth != "") { //发起人
                    $("#app_process_range_desc,#app_process_range_all").removeClass("checked");
                    $("#app_process_range_desc").addClass("checked");
                    $(".app_process_design_limit_control").show();
                    var data = "";
                    for (var i = 0; i < procAuth.length; i++) {
                        switch (procAuth[i].AuthType) {
                            case 0:
                                data += '{"type":"user","id":"' + procAuth[i].Authorize + '"},';
                                break;
                            case 3:
                                data += '{"type":"grp","id":"' + procAuth[i].Authorize + '"},';
                                break;
                            case 4:
                                data += '{"type":"org","id":"' + procAuth[i].Authorize + '"},';
                                break;
                        }
                    }
                    if (data != "") {
                        data = '[' + data.substring(0, data.length - 1) + ']';
                        select2.setAllselectedData($.parseJSON(data));
                    }
                }
                //审批人过滤
                if (procBaseInfo.IsSkip)
                    $("#span_skip").addClass("checked");
                //附件设置
                if (procBaseInfo.Config && procBaseInfo.Config.isRequireAttachment) {
                    $("#span_require_attach").addClass("checked");
                }
                //打印设置
                if (procBaseInfo.Config && procBaseInfo.Config.isUsePrintSet) {
                    $("#span_fixed_print").trigger('click');
                    var printSet = procBaseInfo.Config.printFields || '';
                    printSet = printSet.split('&');
                    _.each(printSet, function (item) {
                        $('[ekey=' + item + ']').addClass('checked');
                    })
                }
                //根据baseinfoID获取流程表单信息【编辑状态下加载】
                //$.get(i8_session.ajaxWfHost + 'webajax/form/getformbyprocbaseid', {baseInfoID: js_wf_BaseInfoID}, function (response) {
                var response = {
                    "ReturnObject": {
                        "ApproveUrl": "",
                        "ViewUrl": "",
                        "ExecuteUrl": "",
                        "UserDesign": false,
                        "MetaData": "<div class=\"ui-draggable fdctrl cb_col_1\" ctype=\"VacationSummaryComponent\" style=\"display: block;\"><div class=\"ctrlbox\" ctype=\"VacationSummaryComponent\" rowtype=\"0\" ctrl-name=\"QingJiaMingXi\">\n\t<div class=\"ctrltitle\">\n\t\t<span class=\"span_mustinputtag\" style=\"visibility:visible\">*</span>\n\t\t<span class=\"ctitletxt\">请假明细</span>：\n\t</div>\n\t<div class=\"ctrltxt\">\n\t <div class=\"control-vacation-container\">        <div class=\"control-vacation-header\">        <div class=\"fw_left control-vacation-title\">此次请假明细</div> <div class=\"fw_left\">&nbsp;&nbsp;<a class=\"control-vacation-view-existvacation\" href=\"javascript:void 0\">查看全部可用假期</a></div>        <div class=\"fw_right\"> <span class=\"control-vacation-unit\">单位&nbsp;</span>        <div class=\"timeset fw_right m-l20\">        <a class=\"a1 selected\">小时</a><a class=\"a2\">天</a>        </div>        </div>        </div>        <div class=\"fw_clear\"></div>        <div class=\"control-vacation-body control-vacation-summary\">        <table class=\"control-vacation-detail vacationSummary vacationsummary_data\">        <thead><tr><th class=\"vacation-header-type\">假期类型</th><th class=\"vacation-header-time\">开始时间</th><th class=\"vacation-header-time\">结束时间</th><th class=\"vacation-header-amount\">可用数量</th><th class=\"vacation-header-applytime\">申请时长</th><th class=\"vacation-header-remark\">备注</th><th class=\"vacation-header-available\">可用控制</th><th class=\"vacation-header-operate\">操作</th></tr></thead>        <tbody class=\"control-vacation-list\">        </tbody>           <tbody class=\"control-vacation-total\">            <tr><td colspan=\"3\"></td><td class=\"vacation-row-amount\" colspan=\"5\"><span class=\"vacation-total-title\">合计：</span><span class=\"vacation-datatype-amount vacation-sum-total-amount\">0</span></td></tr>            </tbody>        </table>        <table class=\"control-vacation-operate\">            <tbody><tr class=\"operatrow\">        <td>请假类型</td><td><select id=\"vacation_item\"></select></td><td>开始时间</td><td colspan=\"2\" class=\"vacation-control-begin-container\"><input type=\"text\" class=\"vacation-begindate\" onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd  HH:mm'})\"></td><td>结束时间</td><td class=\"vacation-control-end-container\" colspan=\"2\"><input type=\"text\" class=\"vacation-enddate\" onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd  HH:mm'})\"></td>                    </tr>                    <tr class=\"operatrow\">                    <td>申请时长</td><td><input type=\"text\" class=\"vacation-detail-duration\">&nbsp;<span class=\"vacation-control-vacationtype\">小时</span></td><td class=\"vacation-operation-remark\">备注</td><td colspan=\"4\"><input type=\"text\" class=\"vacation-detail-remark\"></td><td class=\"vacation-operation-save\"><a class=\"vacation-addnewrow\">增加</a> <span type=\"text\" calc_class=\"vacation-total-amount\" class=\"vacationsummary_total_inputvalue\" isparam=\"false\" valuetype=\"4\" tagctrl=\"text\" tagname=\"listSUMcol_4_applytime_QingJiaMingXi\" tagtitle=\"申请合计\" formdata=\"true\" value=\"0\"></span></td>                    </tr>                    </tbody></table>                    </div>                    </div></div>\n\t\n</div>\n\n</div><div class=\"ui-draggable fdctrl cb_col_1\" ctype=\"mutiTextBox\" style=\"display: block; position: relative;\"><div class=\"ctrlbox\" ctype=\"mutiTextBox\" rowtype=\"0\" ctrl-name=\"QingJiaShuoMing\">\n\t<div class=\"ctrltitle\">\n\t\t<span class=\"span_mustinputtag\" style=\"visibility:visible\">*</span>\n\t\t<span class=\"ctitletxt\">请假说明</span>：\n\t</div>\n\t<div class=\"ctrltxt\">\n\t\t<textarea rows=\"5\" cols=\"5\" class=\"tbox_mutiLineBox\"></textarea>\n\t</div>\n  \n</div></div><script type=\"text/javascript\" id=\"formconfigscript\">window.form_config=[{\"fieldName\":\"QingJiaMingXi\",\"totalConfig\":{\"ctype\":\"VacationSummaryComponent\",\"FieldType\":20,\"FieldID\":\"QingJiaMingXi\",\"FieldName\":\"请假明细\",\"DefaultValue\":\"\",\"DataType\":3,\"IsProcDataField\":false,\"IsBindData\":false,\"IsRequire\":true,\"DataSource\":\"\",\"FieldConfig\":\"{\\\"Tags\\\":[{\\\"key\\\":\\\"controlVersion\\\",\\\"value\\\":\\\"2\\\"}],\\\"GridConfig\\\":[{\\\"colName\\\":\\\"vacationType\\\",\\\"colText\\\":\\\"请假类型\\\",\\\"colType\\\":\\\"Dropdown\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":true,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"unlimited\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":3,\\\"DataType\\\":0},{\\\"colName\\\":\\\"beginDate\\\",\\\"colText\\\":\\\"开始时间\\\",\\\"colType\\\":\\\"DatePicker\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":true,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"unlimited\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":8,\\\"DataType\\\":5},{\\\"colName\\\":\\\"endDate\\\",\\\"colText\\\":\\\"结束时间\\\",\\\"colType\\\":\\\"DatePicker\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":true,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"unlimited\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":8,\\\"DataType\\\":5},{\\\"colName\\\":\\\"amount\\\",\\\"colText\\\":\\\"可用数量\\\",\\\"colType\\\":\\\"simpleTextBox\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":false,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"number\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":2,\\\"DataType\\\":1},{\\\"colName\\\":\\\"col_4_applytime\\\",\\\"colText\\\":\\\"申请数量\\\",\\\"colType\\\":\\\"simpleTextBox\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":true,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"number\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":0,\\\"DataType\\\":1},{\\\"colName\\\":\\\"remark\\\",\\\"colText\\\":\\\"备注\\\",\\\"colType\\\":\\\"simpleTextBox\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":false,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"unlimited\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":1,\\\"DataType\\\":0},{\\\"colName\\\":\\\"available\\\",\\\"colText\\\":\\\"可用控制\\\",\\\"colType\\\":\\\"simpleTextBox\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":false,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"unlimited\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":2,\\\"DataType\\\":0}]}\",\"SortIndex\":0,\"isvisible\":\"visible\"}},{\"fieldName\":\"listSUMcol_4_applytime_QingJiaMingXi\",\"totalConfig\":{\"ctype\":\"SumCalctor\",\"FieldType\":16,\"FieldID\":\"listSUMcol_4_applytime_QingJiaMingXi\",\"FieldName\":\"申请合计\",\"DefaultValue\":\"\",\"DataType\":1,\"IsProcDataField\":true,\"IsBindData\":false,\"IsRequire\":false,\"DataSource\":\"\",\"FieldConfig\":\"{\\\"parentField\\\":\\\"QingJiaMingXi\\\",\\\"calcField\\\": \\\"col_4_applytime\\\" ,\\\"calcIndex\\\":\\\"4\\\"}\",\"SortIndex\":1,\"isvisible\":\"hidden\"}},{\"fieldName\":\"QingJiaShuoMing\",\"totalConfig\":{\"ctype\":\"mutiTextBox\",\"FieldType\":1,\"FieldID\":\"QingJiaShuoMing\",\"FieldName\":\"请假说明\",\"DefaultValue\":\"\",\"DataType\":0,\"IsProcDataField\":false,\"IsBindData\":false,\"IsRequire\":true,\"DataSource\":\"\",\"FieldConfig\":\"{\\\"maxLength\\\":3000,\\\"minLength\\\":0,\\\"txtValueType\\\":0}\",\"SortIndex\":1,\"isvisible\":\"visible\"}}];window.form_version=\"3.0.1\";</script>",
                        "XsltMetaData": "<div class=\"ui-draggable fdctrl cb_col_1\" ctype=\"VacationSummaryComponent\" style=\"display: block;\"><div class=\"ctrlbox\" ctype=\"VacationSummaryComponent\" rowtype=\"0\" ctrl-name=\"QingJiaMingXi\">\n\t<div class=\"ctrltitle\">\n\t\t<span class=\"span_mustinputtag\" style=\"visibility:visible\">*</span>\n\t\t<span class=\"ctitletxt\">请假明细</span>：\n\t</div>\n\t<div class=\"ctrltxt\">\n\t <div class=\"control-vacation-container\">        <div class=\"control-vacation-header\">        <div class=\"fw_left control-vacation-title\">此次请假明细</div> <div class=\"fw_left\">&nbsp;&nbsp;<a class=\"control-vacation-view-existvacation\" href=\"javascript:void 0\">查看全部可用假期</a></div>        <div class=\"fw_right\"> <span class=\"control-vacation-unit\">单位&nbsp;</span>        <div class=\"timeset fw_right m-l20\">        <a class=\"a1 selected\">小时</a><a class=\"a2\">天</a>        </div>        </div>        </div>        <div class=\"fw_clear\"></div>        <div class=\"control-vacation-body control-vacation-summary\">        <table class=\"control-vacation-detail vacationSummary vacationsummary_data\">        <thead><tr><th class=\"vacation-header-type\">假期类型</th><th class=\"vacation-header-time\">开始时间</th><th class=\"vacation-header-time\">结束时间</th><th class=\"vacation-header-amount\">可用数量</th><th class=\"vacation-header-applytime\">申请时长</th><th class=\"vacation-header-remark\">备注</th><th class=\"vacation-header-available\">可用控制</th><th class=\"vacation-header-operate\">操作</th></tr></thead>        <tbody class=\"control-vacation-list\">        </tbody>           <tbody class=\"control-vacation-total\">            <tr><td colspan=\"3\"></td><td class=\"vacation-row-amount\" colspan=\"5\"><span class=\"vacation-total-title\">合计：</span><span class=\"vacation-datatype-amount vacation-sum-total-amount\">0</span></td></tr>            </tbody>        </table>        <table class=\"control-vacation-operate\">            <tbody><tr class=\"operatrow\">        <td>请假类型</td><td><select id=\"vacation_item\"></select></td><td>开始时间</td><td colspan=\"2\" class=\"vacation-control-begin-container\"><input type=\"text\" class=\"vacation-begindate\" onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd  HH:mm'})\"></td><td>结束时间</td><td class=\"vacation-control-end-container\" colspan=\"2\"><input type=\"text\" class=\"vacation-enddate\" onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd  HH:mm'})\"></td>                    </tr>                    <tr class=\"operatrow\">                    <td>申请时长</td><td><input type=\"text\" class=\"vacation-detail-duration\">&nbsp;<span class=\"vacation-control-vacationtype\">小时</span></td><td class=\"vacation-operation-remark\">备注</td><td colspan=\"4\"><input type=\"text\" class=\"vacation-detail-remark\"></td><td class=\"vacation-operation-save\"><a class=\"vacation-addnewrow\">增加</a> <span type=\"text\" calc_class=\"vacation-total-amount\" class=\"vacationsummary_total_inputvalue\" isparam=\"false\" valuetype=\"4\" tagctrl=\"text\" tagname=\"listSUMcol_4_applytime_QingJiaMingXi\" tagtitle=\"申请合计\" formdata=\"true\" value=\"0\"></span></td>                    </tr>                    </tbody></table>                    </div>                    </div></div>\n\t\n</div>\n\n</div><div class=\"ui-draggable fdctrl cb_col_1\" ctype=\"mutiTextBox\" style=\"display: block; position: relative;\"><div class=\"ctrlbox\" ctype=\"mutiTextBox\" rowtype=\"0\" ctrl-name=\"QingJiaShuoMing\">\n\t<div class=\"ctrltitle\">\n\t\t<span class=\"span_mustinputtag\" style=\"visibility:visible\">*</span>\n\t\t<span class=\"ctitletxt\">请假说明</span>：\n\t</div>\n\t<div class=\"ctrltxt\">\n\t\t<textarea rows=\"5\" cols=\"5\" class=\"tbox_mutiLineBox\"></textarea>\n\t</div>\n  \n</div></div><script type=\"text/javascript\" id=\"formconfigscript\">window.form_config=[{\"fieldName\":\"QingJiaMingXi\",\"totalConfig\":{\"ctype\":\"VacationSummaryComponent\",\"FieldType\":20,\"FieldID\":\"QingJiaMingXi\",\"FieldName\":\"请假明细\",\"DefaultValue\":\"\",\"DataType\":3,\"IsProcDataField\":false,\"IsBindData\":false,\"IsRequire\":true,\"DataSource\":\"\",\"FieldConfig\":\"{\\\"Tags\\\":[{\\\"key\\\":\\\"controlVersion\\\",\\\"value\\\":\\\"2\\\"}],\\\"GridConfig\\\":[{\\\"colName\\\":\\\"vacationType\\\",\\\"colText\\\":\\\"请假类型\\\",\\\"colType\\\":\\\"Dropdown\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":true,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"unlimited\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":3,\\\"DataType\\\":0},{\\\"colName\\\":\\\"beginDate\\\",\\\"colText\\\":\\\"开始时间\\\",\\\"colType\\\":\\\"DatePicker\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":true,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"unlimited\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":8,\\\"DataType\\\":5},{\\\"colName\\\":\\\"endDate\\\",\\\"colText\\\":\\\"结束时间\\\",\\\"colType\\\":\\\"DatePicker\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":true,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"unlimited\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":8,\\\"DataType\\\":5},{\\\"colName\\\":\\\"amount\\\",\\\"colText\\\":\\\"可用数量\\\",\\\"colType\\\":\\\"simpleTextBox\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":false,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"number\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":2,\\\"DataType\\\":1},{\\\"colName\\\":\\\"col_4_applytime\\\",\\\"colText\\\":\\\"申请数量\\\",\\\"colType\\\":\\\"simpleTextBox\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":true,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"number\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":0,\\\"DataType\\\":1},{\\\"colName\\\":\\\"remark\\\",\\\"colText\\\":\\\"备注\\\",\\\"colType\\\":\\\"simpleTextBox\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":false,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"unlimited\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":1,\\\"DataType\\\":0},{\\\"colName\\\":\\\"available\\\",\\\"colText\\\":\\\"可用控制\\\",\\\"colType\\\":\\\"simpleTextBox\\\",\\\"colWidth\\\":\\\"auto\\\",\\\"mustInput\\\":false,\\\"iscolsum\\\":false,\\\"isparam\\\":false,\\\"iscolchinese\\\":false,\\\"formula\\\":null,\\\"isSumFormula\\\":false,\\\"valuetype\\\":\\\"unlimited\\\",\\\"dataSource\\\":\\\"\\\",\\\"ControlType\\\":2,\\\"DataType\\\":0}]}\",\"SortIndex\":0,\"isvisible\":\"visible\"}},{\"fieldName\":\"listSUMcol_4_applytime_QingJiaMingXi\",\"totalConfig\":{\"ctype\":\"SumCalctor\",\"FieldType\":16,\"FieldID\":\"listSUMcol_4_applytime_QingJiaMingXi\",\"FieldName\":\"申请合计\",\"DefaultValue\":\"\",\"DataType\":1,\"IsProcDataField\":true,\"IsBindData\":false,\"IsRequire\":false,\"DataSource\":\"\",\"FieldConfig\":\"{\\\"parentField\\\":\\\"QingJiaMingXi\\\",\\\"calcField\\\": \\\"col_4_applytime\\\" ,\\\"calcIndex\\\":\\\"4\\\"}\",\"SortIndex\":1,\"isvisible\":\"hidden\"}},{\"fieldName\":\"QingJiaShuoMing\",\"totalConfig\":{\"ctype\":\"mutiTextBox\",\"FieldType\":1,\"FieldID\":\"QingJiaShuoMing\",\"FieldName\":\"请假说明\",\"DefaultValue\":\"\",\"DataType\":0,\"IsProcDataField\":false,\"IsBindData\":false,\"IsRequire\":true,\"DataSource\":\"\",\"FieldConfig\":\"{\\\"maxLength\\\":3000,\\\"minLength\\\":0,\\\"txtValueType\\\":0}\",\"SortIndex\":1,\"isvisible\":\"visible\"}}];window.form_version=\"3.0.1\";</script>",
                        "Status": 1,
                        "FormParameters": null,
                        "ID": "a53f5154-e165-478a-ae8e-1bdeb2da9ed7",
                        "LastUpdateTime": "2016-08-01 10:19:16",
                        "CreateTime": "2016-08-01 10:19:16",
                        "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                    }, "Result": true, "Code": 0, "Description": null
                }
                if (response.Result) {
                    var dataobj = response.ReturnObject;
                    var app_process_design_edit = $('#app_process_design_edit');
                    var btn_edit_form = $('#btn_edit_form').addClass('design-bg-icons3 btn-edit-two').html('编辑');
                    var btn_copyform = $('#btn_copyform').addClass('design-bg-icons3 btn-edit-two').html('复制其他流程表单');
                    $('#edit_line').html(btn_edit_form);
                    $('#edit_line').append(btn_copyform);
                    if (dataobj) {
                        app_process_design_edit.html(dataobj.XsltMetaData).attr("formID", dataobj.ID)
                            .css({"position": "relative"}).append($('<div class="controloverlayer"></div>')
                                .css({
                                    "z-index": "8",
                                    "position": "absolute",
                                    "left": "0px",
                                    "top": "0px",
                                    "height": "10000px",
                                    "width": "100%"
                                }));
                        //$('<div class="app-templete-line">\
                        //    <a id="btn_edit_form" class="design-bg-icons3 btn-edit-two" >编辑</a>\
                        //</div>').before(app_process_design_edit);
                    }
                    else {

                    }
                }
                //}, "json");
            }
            else
                alert("获取数据失败！");
            //})
        }
        else {
            $(".design-form-title").hide();
            $("#js_edit_designer").html("通过设计器设计新审批链");
        }
        //控制设定发起人范围
        if ($("#app_process_range_all").hasClass("checked"))
            $(".app_process_design_limit_control").hide(); //$("#txt__KSN_LaunchLimit").attr("readonly", "readonly");
        else
            $(".app_process_design_limit_control").show(); //$("#txt__KSN_LaunchLimit").removeAttr("readonly");

        window.onbeforeunload = function (e) {

            e = e || window.event;
            // For IE and Firefox prior to version 4
            if (e) {
                e.returnValue = "退出后数据将不在保存，确定退出吗？";
            }
            // For Safari
            return '退出后数据将不在保存，确定退出吗？';
        };
//        window.onunload = function (e) {
//            alert("asd");
//        };
    };
    //加载选人控件
    function SelectionControl() {
        select1 = i8selector.KSNSelector({model: 2, element: "#txt_KSN_Receipt", width: "398"});
        select2 = i8selector.KSNSelector({
            model: 2,
            element: "#txt__KSN_LaunchLimit",
            width: "594",
            searchType: {"org": true, "user": true, "grp": true}
        });
    }

    $('#btn_edit_form_icon').on('click', function () {
        $('#btn_edit_form').trigger('click');
    });

    //流程编号规则设置切换  系统默认和自定义规则切换
    var ruleRadio = $('#ruleRadio').on('click', '.app-radio,.app-radio-text', function () {
        ruleRadio.find('.app-radio').removeClass('checked');
        var type = $(this).parent().find('.app-radio').addClass('checked').attr('type');//0 系统 1自定义
        if (type == 1) {
            ruleRadio.find('.number-rule').show();
        } else {
            ruleRadio.find('.number-rule').hide();
        }
    });
    $('#folioInit').on('keyup', function (ev) {
        var _this = $(this);
        _this.val(_this.val().replace(/[^0-9]/g, ''));
    });
    //设定发起人切换
    $("#app_process_range_all,#app_process_range_desc").live("click", function () {
        $("#app_process_range_all,#app_process_range_desc").removeClass("checked");
        $(this).addClass("checked");
        //控制设定发起人范围
        if ($("#app_process_range_all").hasClass("checked")) {
            select2.clearData();
            $(".app_process_design_limit_control").hide();
        }
        else
            $(".app_process_design_limit_control").show();
    })
    //固定收文人切换
    var design_radio_list = $('#design_radio_list')
    design_radio_list.on('click', '.app-radio,.app-radio-text,.fw_ksntxtbox', function () {
        design_radio_list.find('.app-radio').removeClass('checked');
        design_radio_list.find('.radio-option-list').hide();
        var _radio_line = $(this).parents('.design-radio-line');
        _radio_line.find('.radio-option-list').show();
        _radio_line.find('.app-radio').addClass('checked');
    });
    //审批链设置
    $("#span_skip").live("click", function () {
        if ($(this).hasClass("checked"))
            $(this).removeClass('checked');
        else
            $(this).addClass('checked');
    })
    //附件必填设置
    $("#span_require_attach").on('click', function () {
        $(this).toggleClass('checked')
    });
    //固定打印模板
    $("#span_fixed_print").on('click', function () {
        $(this).toggleClass('checked');
        if ($(this).hasClass('checked')) {
            $('#print_box').show();
        } else {
            $('#print_box').hide();
        }
    });
    $("#print_box").on('click', '.app-checkbox', function () {
        $(this).toggleClass('checked');
    });
    //第一步，流程基础配置信息  》 下一步  提交
    $("#btn_BaseInfo").click(function () {
        var orgType = $("#ddl_OrgsType").getValue();
        var procName = $.trim($("#txt_name").val());
        if ($.trim(orgType) == "") {
            i8ui.alert({title: "暂未设置组织架构！"});
            return false;
        }
        if (!procName) {
            i8ui.alert({title: "请输入流程名称！"});
            return false;
        }
        var categoryType = $.trim($("#ddl_CategoryType").getValue());
        if (!categoryType) {
            i8ui.alert({title: "请选择流程分类！"});
            return false;
        }
        var sortIndex = $.trim($("#txt_order").val());//排序
        if (!sortIndex) {
            i8ui.alert({title: "请输入流程排序！"});
            return false;
        }
        var numberchar_reg = /^(\-?)[0-9]+(\.[0-9]+)?$/g;
        if (!numberchar_reg.test(sortIndex)) {
            i8ui.alert({title: "流程排序格式为数字整形！"});
            return false;
        }
        var receiptInfo = select1.selectedData(); //获取收文列表

        var role_arr = [];
        $('#selectrole').find('.app-checkbox').each(function () {
            role_arr.push($(this).attr('roleID'));
        });
        var receiptRoleList = role_arr.join(';');
        if ($('#receiptbyUser').hasClass('checked')) {
            receiptRoleList = '';
        } else {
            receiptInfo = '';
        }
        var launchInfo = ""; //发起人限制功能 格式{id,type;id,type}
        var launchData = select2.getAllselectedData(); //发起人限制列表
        var isSkip = $("#span_skip").hasClass("checked") ? true : false;
        var isRequireAttachment = $("#span_require_attach").hasClass("checked") ? true : false;
        var isUsePrintSet = $("#span_fixed_print").hasClass("checked") ? true : false;
        var printFields = [];
        if (isUsePrintSet) {
            $('#print_box .app-checkbox.checked').each(function (index, item) {
                printFields.push($(item).attr('ekey'))
            })
        }
        printFields = printFields.join('&');
        for (var i = 0; i < launchData.length; i++) {
            launchInfo += launchData[i].id + "," + launchData[i].type + ";";
        }
        var jsonData = {
            procName: procName,
            categoryType: categoryType,
            orgType: orgType,
            actDirections: $("#txt_Actdirections").val(),
            receiptInfo: receiptInfo,
            receiptRoleList: receiptRoleList,
            launchInfo: launchInfo,
            baseID: js_wf_BaseInfoID,
            sortIndex: sortIndex,
            isSkip: isSkip,
            Config: {
                isRequireAttachment: isRequireAttachment,
                isUsePrintSet: isUsePrintSet,
                printFields: printFields
            }
        };
        var ruletype = ruleRadio.find('.app-radio.checked').attr('type');//0 系统 1自定义
        if (ruletype == 1) {
            jsonData.folioPrefix = $('#folioPrefix').val();//默认前缀
            jsonData.folioInit = parseInt($('#folioInit').val());//初始化编号
            jsonData.folioResetType = $('#folioResetType').val();//重置规则
            jsonData.folioLength = $('#folioInit').val().length - jsonData.folioInit.toString().length + 1;
            if (!jsonData.folioPrefix) {
                i8ui.alert({title: "请输入固定前缀！"});
                $('#folioPrefix').trigger('focus');
                return false;
            }
            if (!jsonData.folioInit) {
                i8ui.alert({title: "请输入初始化编号！"});
                $('#folioInit').trigger('focus');
                return false;
            }
        }


        //$.post(i8_session.ajaxWfHost + 'webajax/design/addworkflowinfo', jsonData, function (result) {
        var result = {"Result": true, "Code": 0, "Description": ""};
        if (result.Result) {
            var data = result.ReturnObject || {};
            //鄙人增加部分,if语句为了静态页面部分
            if(data){
                data = {"Item1":"5d8c1e4d-a7ef-4b05-8508-489a4b1fd696","Item2":"11e40412-ce10-49ae-b82f-a5943f841084"};
            }

            if (data.Item1 && data.Item2) {
                procSetID = data.Item1;
                js_wf_BaseInfoID = data.Item2;
            }
            $(".design-form-nav a[showid='div_form']").click();
        }
        else {
            i8ui.alert({title: '保存失败，' + (result.Description || '请求超时！')});
        }

        //});
    });
    //第二步，表单信息   下一步 提交
    $("#btn_Form").click(function () {
        $(".design-form-nav a[showid='div_act']").click();
    })
    //第三步 ，环节设计器 保存
    $("#btn_act").click(function () {
        if ($(".design-form-nav li:last").attr("class") == "fw_hidden") {//隐藏为B方式
            $.get(i8_session.ajaxWfHost + 'webajax/design/verifyProcCount', function (json) {
                if (!json.Result)
                    i8ui.alert({title: "您已经超过流程上架数量限制，该流程已经保存为草稿状态！", type: 1});
                else
                    SaveActPerOrDraft(1);
            });
        }
        else
            SaveActPerOrDraft(0);
    })
    //第三步 ，环节设计器 草稿
    $("#btn_actDraft").click(function () {
        SaveActPerOrDraft(0);
    })
    //第三步 保存环节信息
    function SaveActPerOrDraft(procStatus) {
        if ($("#span_custom").hasClass("checked"))//自定义审批链
        {
            //更改流程上架
            //$.post(i8_session.ajaxWfHost + 'webajax/design/updateprocstatus', {
            //    baseinfoid: js_wf_BaseInfoID,
            //    status: procStatus,
            //    type: 3
            //}, function (json) {
            var json = {"ReturnObject": true, "Result": true, "Code": 0, "Description": null}
            if (json.ReturnObject) {
                if ($(".design-form-nav li:last").attr("class") == "fw_hidden") {//隐藏为B方式
                    i8ui.alert({
                        title: "保存成功!", noMask: false, cbk: function () {
                            window.onbeforeunload = null;
                            window.location.href = i8_session.wfbaseHost + 'design/list';
                        }, type: 2
                    });
                }
                else
                    $(".design-form-nav a[showid='div_auth']").click();
            }
            //}, 'json');
        }
        //自主设计
        if ($("#span_design").hasClass("checked")) {
            //$.get(i8_session.ajaxWfHost + 'webajax/design/getbasenfo', {baseinfoid: js_wf_BaseInfoID}, function (resultBase) {
            var resultBase = {
                "ReturnObject": {
                    "ProcFullName": "请假申请单_T20160004",
                    "OrgStructure": 1,
                    "StartActID": "22923d78-126a-4de5-90d6-5688f9037d32",
                    "ActivityVersion": "d9e9056f-5bf7-4f11-b40f-88d88a2eb2f8",
                    "FormID": "a53f5154-e165-478a-ae8e-1bdeb2da9ed7",
                    "GuidID": "d7a71623-45fb-4f3b-b98b-be1bc7bea3e2",
                    "Version": 1,
                    "StartUrl": "/process/page/pro",
                    "ProcType": 0,
                    "Duration": 0,
                    "ProcDesignMetaData": "<mxGraphModel><root><mxCell id=\"0\" /><mxCell id=\"1\" parent=\"0\" /><StartActivity value=\" \" Version=\"\" id=\"22923d78-126a-4de5-90d6-5688f9037d32\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/tools_start.png;rounded=true;fillColor=#93DF00;imageAlign=center;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"167\" y=\"40\" width=\"22\" height=\"22\" as=\"geometry\" /></mxCell></StartActivity><EndActivity value=\" \" Version=\"\" id=\"7958a088-aac2-4030-9bae-720ad0b51a78\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/tools_end.png;rounded=true;fillColor=#f97e76;imageAlign=center;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"795\" y=\"40\" width=\"22\" height=\"22\" as=\"geometry\" /></mxCell></EndActivity><Sequence_ReportActivity value=\"上级审批\" Version=\"2\" id=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/new_icon_1.png;gradientDirection=south;rounded=true;perimeterspacing=6;fontColor=#ffffff;fillColor=#2ca3da;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"223\" y=\"30\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_ReportActivity><mxCell id=\"27eebcb9-4cd0-4079-a958-8a02bcadea04\" value=\" \" parent=\"1\" source=\"22923d78-126a-4de5-90d6-5688f9037d32\" target=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><Sequence_RoleActivity value=\"CEO审批\" Version=\"2\" id=\"c34e1c44-753e-41af-bd2c-e8b5d56fd8c3\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/new_icon_1.1.png;gradientDirection=south;rounded=true;fontColor=#ffffff;perimeterspacing=6;fillColor=#0bb59b;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"408\" y=\"84\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_RoleActivity><mxCell id=\"07ebc81e-a6be-4d39-9282-e0e886030c1c\" value=\"　大于24小时\" style=\"strokeColor\" parent=\"1\" source=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\" target=\"c34e1c44-753e-41af-bd2c-e8b5d56fd8c3\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><Sequence_RoleActivity value=\"人事审批\" Version=\"2\" id=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/new_icon_1.1.png;gradientDirection=south;rounded=true;fontColor=#ffffff;perimeterspacing=6;fillColor=#0bb59b;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"578\" y=\"30\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_RoleActivity><mxCell id=\"28bf0545-5197-4815-a5af-29045f72e910\" value=\" \" style=\"strokeColor\" parent=\"1\" source=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\" target=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><mxCell id=\"6739661f-5115-4711-b94e-84f7a5155c0b\" value=\" \" parent=\"1\" source=\"c34e1c44-753e-41af-bd2c-e8b5d56fd8c3\" target=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><mxCell id=\"00c842c0-06b4-473e-b7d1-f7ffb10c1b79\" value=\" \" parent=\"1\" source=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\" target=\"7958a088-aac2-4030-9bae-720ad0b51a78\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell></root></mxGraphModel>",
                    "ProcStepStatus": 0,
                    "ProcStatus": 2,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "UpdateTime": "2016-08-18 18:02:02",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "TemplateCode": "T20160004",
                    "IsSkip": true,
                    "Config": {"isRequireAttachment": false, "isUsePrintSet": false, "printFields": ""},
                    "FieldList": null,
                    "ID": "e7995207-833b-428c-8045-daf8bb93386a",
                    "LastUpdateTime": "2016-08-18 18:02:02",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, "Result": true, "Code": 0, "Description": null
            }
            if (resultBase.Result) {
                var DesignerMetaData = resultBase.ReturnObject.ProcDesignMetaData; //XML数据内容
                if (DesignerMetaData == "" || DesignerMetaData == null)
                    i8ui.alert({title: "请先设计环节审批链"});
                else {
                    //更改流程上架
                    //$.post(i8_session.ajaxWfHost + 'webajax/design/updateprocstatus', {
                    //    baseinfoid: js_wf_BaseInfoID,
                    //    status: procStatus,
                    //    type: 0
                    //}, function (json) {
                    var json = {
                        "ReturnObject": {
                            "ProcFullName": "请假申请单_T20160004",
                            "OrgStructure": 1,
                            "StartActID": "22923d78-126a-4de5-90d6-5688f9037d32",
                            "ActivityVersion": "d9e9056f-5bf7-4f11-b40f-88d88a2eb2f8",
                            "FormID": "a53f5154-e165-478a-ae8e-1bdeb2da9ed7",
                            "GuidID": "d7a71623-45fb-4f3b-b98b-be1bc7bea3e2",
                            "Version": 1,
                            "StartUrl": "/process/page/pro",
                            "ProcType": 0,
                            "Duration": 0,
                            "ProcDesignMetaData": "<mxGraphModel><root><mxCell id=\"0\" /><mxCell id=\"1\" parent=\"0\" /><StartActivity value=\" \" Version=\"\" id=\"22923d78-126a-4de5-90d6-5688f9037d32\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/tools_start.png;rounded=true;fillColor=#93DF00;imageAlign=center;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"167\" y=\"40\" width=\"22\" height=\"22\" as=\"geometry\" /></mxCell></StartActivity><EndActivity value=\" \" Version=\"\" id=\"7958a088-aac2-4030-9bae-720ad0b51a78\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/tools_end.png;rounded=true;fillColor=#f97e76;imageAlign=center;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"795\" y=\"40\" width=\"22\" height=\"22\" as=\"geometry\" /></mxCell></EndActivity><Sequence_ReportActivity value=\"上级审批\" Version=\"2\" id=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/new_icon_1.png;gradientDirection=south;rounded=true;perimeterspacing=6;fontColor=#ffffff;fillColor=#2ca3da;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"223\" y=\"30\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_ReportActivity><mxCell id=\"27eebcb9-4cd0-4079-a958-8a02bcadea04\" value=\" \" parent=\"1\" source=\"22923d78-126a-4de5-90d6-5688f9037d32\" target=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><Sequence_RoleActivity value=\"CEO审批\" Version=\"2\" id=\"c34e1c44-753e-41af-bd2c-e8b5d56fd8c3\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/new_icon_1.1.png;gradientDirection=south;rounded=true;fontColor=#ffffff;perimeterspacing=6;fillColor=#0bb59b;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"408\" y=\"84\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_RoleActivity><mxCell id=\"07ebc81e-a6be-4d39-9282-e0e886030c1c\" value=\"　大于24小时\" style=\"strokeColor\" parent=\"1\" source=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\" target=\"c34e1c44-753e-41af-bd2c-e8b5d56fd8c3\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><Sequence_RoleActivity value=\"人事审批\" Version=\"2\" id=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/new_icon_1.1.png;gradientDirection=south;rounded=true;fontColor=#ffffff;perimeterspacing=6;fillColor=#0bb59b;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"578\" y=\"30\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_RoleActivity><mxCell id=\"28bf0545-5197-4815-a5af-29045f72e910\" value=\" \" style=\"strokeColor\" parent=\"1\" source=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\" target=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><mxCell id=\"6739661f-5115-4711-b94e-84f7a5155c0b\" value=\" \" parent=\"1\" source=\"c34e1c44-753e-41af-bd2c-e8b5d56fd8c3\" target=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><mxCell id=\"00c842c0-06b4-473e-b7d1-f7ffb10c1b79\" value=\" \" parent=\"1\" source=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\" target=\"7958a088-aac2-4030-9bae-720ad0b51a78\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell></root></mxGraphModel>",
                            "ProcStepStatus": 0,
                            "ProcStatus": 2,
                            "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                            "UpdateTime": "2016-08-18 18:02:02",
                            "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                            "TemplateCode": "T20160004",
                            "IsSkip": true,
                            "Config": {"isRequireAttachment": false, "isUsePrintSet": false, "printFields": ""},
                            "FieldList": null,
                            "ID": "e7995207-833b-428c-8045-daf8bb93386a",
                            "LastUpdateTime": "2016-08-18 18:02:02",
                            "CreateTime": "2016-08-01 10:19:16",
                            "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                        }, "Result": true, "Code": 0, "Description": null
                    }
                    if (json.ReturnObject) {
                        if ($(".design-form-nav li:last").attr("class") == "fw_hidden") {//隐藏为B方式
                            i8ui.alert({
                                title: "保存成功!", noMask: false, cbk: function () {
                                    window.onbeforeunload = null;
                                    window.location.href = i8_session.wfbaseHost + 'design/list';
                                }, type: 2
                            });
                        }
                        else
                            $(".design-form-nav a[showid='div_auth']").click();
                    }
                    //}, 'json');
                }
            }
            //})
        }
    }

    //第四步 ，保存权限 上架
    $("#btn_auth").live("click", function () {
//        $.get(i8_session.ajaxWfHost+ 'webajax/design/verifyProcCount',function(json){
//            if(!json.Result)
//                i8ui.alert({title: "您已经超过流程上架数量限制，该流程已经保存为草稿状态！",type:1});
//            else
        SavePerOrSaveDraft(1);
//        });
    })
    //第四步 ，保存 草稿
    $("#btn_draft").live("click", function () {
        SavePerOrSaveDraft(0);
    })
    //第四步保存上架流程
    function SavePerOrSaveDraft(proStatus) {
        var strValue = "";
        var strName = "";
        var selList = $(".app_process_setper_table select");
        for (var i = 0; i < selList.length; i++) {
            strValue += $(selList[i]).val() + ";";
            strName += $(selList[i]).attr("formName") + ";";
        }
        $.post(i8_session.ajaxWfHost + "webajax/design/saveprocperandeditstatus", {
            baseinfoid: js_wf_BaseInfoID,
            strValue: strValue,
            strName: encodeURIComponent(strName),
            proStatus: proStatus
        }, function (json) {
            if (json.ReturnObject) {
                i8ui.alert({
                    title: "保存成功!", noMask: false, cbk: function () {
                        window.onbeforeunload = null;
                        window.location.href = i8_session.wfbaseHost + 'design/list';
                    }, type: 2
                });
            }
            else
                i8ui.alert({title: "设置流程字段权限出错，请联系管理员！"});
        }, 'json');
    }

    //标签切换
    $(".design-form-nav a").click(function () {
        var opencurItem = function (item) {
            $(".design-form-nav a").removeClass("selected");
            $(item).attr("class", "selected");
            $(".app-templete-body > div").hide();
            $("#" + $(item).attr("showid")).show();
        }
        if ($(this).attr("showid") == "div_baseinfo") {/*当点击第一步*/
            opencurItem(this);
        }
        if ($(this).attr("showid") == "div_form") {/*当点击第二步*/
            if (js_wf_Status == "" && js_wf_BaseInfoID == "")
                i8ui.alert({title: "请预先配置流程基础信息！"});
            else {
                opencurItem(this);
                var designer = require('../plugins/i8formdesigner/i8designer');
                var form_name = $("#txt_name").val();

                if (util.getUrlParam("baseinfoid").length == 36) {//如果url带baseinfoid参数，就是
                    designer({
                        formname: $.trim(form_name),
                        btnLink: '#btn_edit_form',
                        action: 'edit',
                        baseinfoid: js_wf_BaseInfoID,
                        formSaveCompleted: function (data) {
                            var btn_edit_form = $('#btn_edit_form').addClass('design-bg-icons3 btn-edit-two').html('编辑');
                            $('#edit_line').append(btn_edit_form);
                            document.getElementById("app_process_design_edit").innerHTML = data.data.html();
                            console.log(data);
                            js_wf_BaseInfoID = data.newBaseInfoID;
                            $("#app_process_design_edit").css({"position": "relative"}).append($('<div class="controloverlayer"></div>').css({
                                "z-index": "8",
                                "position": "absolute",
                                "left": "0px",
                                "top": "0px",
                                "height": "10000px",
                                "width": "100%"
                            }));
                        }
                    });
                } else {
                    designer({
                        formname: $.trim(form_name),
                        btnLink: '#btn_edit_form',
                        action: 'new',
                        baseinfoid: js_wf_BaseInfoID,
                        formSaveCompleted: function (data) {
                            var btn_edit_form = $('#btn_edit_form').addClass('design-bg-icons3 btn-edit-two').html('编辑');
                            $('#edit_line').append(btn_edit_form);
                            document.getElementById("app_process_design_edit").innerHTML = data.data.html();
                            console.log(data);
                            js_wf_BaseInfoID = data.newBaseInfoID;
                            $("#app_process_design_edit").css({"position": "relative"}).append($('<div class="controloverlayer"></div>').css({
                                "z-index": "8",
                                "position": "absolute",
                                "left": "0px",
                                "top": "0px",
                                "height": "10000px",
                                "width": "100%"
                            }));
                        }
                    });
                }
            }
        }
        if ($(this).attr("showid") == "div_act") {/*当点击第三步*/
            //if (js_wf_BaseInfoID == "" || $("#app_process_design_edit .fdctrl").length == 0) {
            if (js_wf_BaseInfoID == "") {
                i8ui.alert({title: "请预先配置好流程表单信息！"});
            } else {
                opencurItem(this);
                if (diagramMetaData != null && diagramMetaData != "" && $("#div_mxGraphView div").length == 1) {
                    Load_ActDesigner(); //加载环节设计器
                }
                IsActAddOrEdit();
            }
        }
        if ($(this).attr("showid") == "div_auth") {/*当点击第四步*/
            //if (js_wf_BaseInfoID == "" || ($("#div_mxGraphView div").length == 1 && diagramMetaData == "")) {
            if (js_wf_BaseInfoID == "") {
                i8ui.alert({title: "请预先配置流程审批环节信息！"});
            } else {
                opencurItem(this);
                GetProcessFieldList();
            }
        }
    });
    //流程审批连切换
    $("#div_mxGraphView .create-form2").live("click", function () {
        if ($("#span_design").hasClass("checked")) //自主设计
            showActDesigner();
        else
            i8ui.alert({title: "当前为自定义审批链,无法设计！"});
    });
    //审批连切换样式
    $("#span_design,#span_custom").live("click", function () {
        $("#span_design,#span_custom").removeClass("checked");
        $(this).addClass("checked");
        if ($(this).attr("id") == "span_custom") {//自定义
            $("#js_edit_designer").hide();
            $("#js_copydesigner").hide();
        }
        else {
            $("#js_edit_designer").show();
            $("#js_copydesigner").show();
        }
    })
    //设计器审批链按钮
    $("#span_design").click(function () { //自主设计
        Load_ActDesigner();
    })
    //自定义审批链
    $("#span_custom").click(function () {
        $("#div_mxGraphView").html("<img src='" + i8_session.resWfHost + "default/images/design/ProcCustomView.png' />");
    })
    //通过设计器设计修改审批连
    $(document).delegate("#js_edit_designer", 'click', function () {
        if ($("#span_design").hasClass("checked")) //自主设计
            showActDesigner();
        else
            i8ui.alert({title: "当前为自定义审批链,无法设计！"});
    });

    //弹出环节设计器
    function showActDesigner() {
        if ($(window.desginBox).find("iframe").length == 0) {
            var width = $(window).width();
            var height = $(document).height();
            var _height = $(window).height();
            //var _scontent = '<iframe src="design/activity/designer?r=' + new Date().getTime() + '" frameborder="0" style="width:' + width + 'px!important; height:' + height + 'px!important;"  scrolling=\"no\">';
            var _scontent = '<iframe src="designer.html" frameborder="0" style="width:' + width + 'px!important; height:' + height + 'px!important;"  scrolling=\"no\">';
            window.desginBox = i8ui.showNoTitle({cont: _scontent});
            $(desginBox).css({border: 'none', 'box-shadow': 'none', top: '0px'});
        }
    }

    //判断流程是新增还是修改状态
    function IsActAddOrEdit() {
        if (js_wf_Status == "") {//新增
            if (diagramMetaData == "")
                $("#js_edit_designer").html("通过设计器设计新审批链");
            else
                $("#js_edit_designer").html("编辑");
        }
        else //修改
            $("#js_edit_designer").html("编辑");
    }

    //加载环节设计器内容
    function Load_ActDesigner() {
        var diagramData = "";
        if (typeof(diagramMetaData) == 'undefined')
            diagramData = parent.diagramMetaData;
        else
            diagramData = diagramMetaData;
        if (diagramData != "" && diagramData != null) {
            if ($("#div_mxGraphView").length == 0)
            //$("#div_mxGraphView", window.parent.document).html("<iframe src=\"design/activity/view\" scrolling=\"no\" style=\"border:0\"></iframe>");
                $("#div_mxGraphView", window.parent.document).html("<iframe src=\"./js/activity/view.html\" scrolling=\"no\" style=\"border:0\"></iframe>");
            else
            //$("#div_mxGraphView").html("<iframe src=\"design/activity/view\" scrolling=\"no\" style=\"border:0\"></iframe>");
                $("#div_mxGraphView").html("<iframe src=\"./js/activity/view.html\" scrolling=\"no\" style=\"border:0\"></iframe>");
        }
        else {
            if ($("#div_mxGraphView").length == 0)
                $("#div_mxGraphView", window.parent.document).html('<div class="create-form create-form2"><a >编辑创建新审批链</a></div>');
            else
                $("#div_mxGraphView").html('<div class="create-form create-form2"><a >编辑创建新审批链</a></div>');
        }

    }

    //添加流程分类
    $("#btnAddCategory").click(function () {
        window.onbeforeunload = null;
        var _scontent = '<div style="width:260px" id="show_addcategory_dialog">' +
            '<div class="oflow p-t10">' +
            '<div class="fw_left">类别名称：</div>' +
            '<div class="fw_left w-180" >' +
            '<input id="CategoryName" class="app_addnew_input_name inputh-36 w-160"   type="text" />' +
            '</div>' +
            '</div>' +
            '<div  class="oflow p-t10">' +
            '<div class="fw_left">排　　序：</div>' +
            '<div class="fw_left w-180" >' +
            '<input id="CategoryOrderBy" class="app_addnew_input_name inputh-36 w-160" type="text" />' +
            '</div>' +
            '</div>' +
            '</div>'
        i8ui.confirm({title: _scontent, btnDom: $(this), cname: ''}, function (divDom) {
            var categoryName = $("#show_addcategory_dialog #CategoryName").val();
            var CategoryOrderBy = $("#show_addcategory_dialog #CategoryOrderBy").val();
            var CategoryOrderBynum = /^[0-9]*[1-9][0-9]*$/; //数字验证
            if (categoryName == null || categoryName == "") {
                i8ui.alert({title: "请输入类别名称!"});
                return false;
            }
            if (CategoryOrderBy == "" || !CategoryOrderBynum.test(CategoryOrderBy)) {
                i8ui.alert({title: "请输入整数!"});
                return false;
            }
            $.get(i8_session.ajaxWfHost + 'webajax/design/addcategory', {
                categoryName: categoryName,
                categoryOrder: CategoryOrderBy
            }, function (json) {
                if (!json.Result) {
                    i8ui.alert({title: "添加失败,添加的类型已存在!"});
                } else {
                    $.get(i8_session.ajaxWfHost + 'webajax/design/getcategory', function (resultCategory) {
                        if (resultCategory.Result) {
                            var data = resultCategory.ReturnObject;
                            $("#ddl_CategoryType span:eq(0)").nextAll().remove();
                            var spanType = $("<span class=\"i8-sel-options\" style=\"top: 22px; display: none;\">");
                            for (var i = 0; i < data.length; i++)
                                spanType.append("<em value=\"" + data[i].ID + "\">" + data[i].CategoryName + "</em>");
                            $("#ddl_CategoryType").append(spanType);
                            //赋值
                            $("#ddl_CategoryType").setKey(categoryName);
                        }
                    });
                }
            });
            divDom.close();
        });
    });

    //第四步-加载流程字段权限
    function GetProcessFieldList() {
        //$.get(i8_session.ajaxWfHost + 'webajax/design/getprocessfield', {baseinfoid: js_wf_BaseInfoID}, function (json) {
        var json = {
            "ReturnObject": {
                "Item1": {
                    "ProcFullName": "请假申请单_T20160004",
                    "OrgStructure": 1,
                    "StartActID": "22923d78-126a-4de5-90d6-5688f9037d32",
                    "ActivityVersion": "d9e9056f-5bf7-4f11-b40f-88d88a2eb2f8",
                    "FormID": "a53f5154-e165-478a-ae8e-1bdeb2da9ed7",
                    "GuidID": "00000000-0000-0000-0000-000000000000",
                    "Version": 1,
                    "StartUrl": "/process/page/pro",
                    "ProcType": 0,
                    "Duration": 0,
                    "ProcDesignMetaData": "<mxGraphModel><root><mxCell id=\"0\" /><mxCell id=\"1\" parent=\"0\" /><StartActivity value=\" \" Version=\"\" id=\"22923d78-126a-4de5-90d6-5688f9037d32\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/tools_start.png;rounded=true;fillColor=#93DF00;imageAlign=center;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"167\" y=\"40\" width=\"22\" height=\"22\" as=\"geometry\" /></mxCell></StartActivity><EndActivity value=\" \" Version=\"\" id=\"7958a088-aac2-4030-9bae-720ad0b51a78\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/tools_end.png;rounded=true;fillColor=#f97e76;imageAlign=center;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"795\" y=\"40\" width=\"22\" height=\"22\" as=\"geometry\" /></mxCell></EndActivity><Sequence_ReportActivity value=\"上级审批\" Version=\"2\" id=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/new_icon_1.png;gradientDirection=south;rounded=true;perimeterspacing=6;fontColor=#ffffff;fillColor=#2ca3da;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"223\" y=\"30\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_ReportActivity><mxCell id=\"27eebcb9-4cd0-4079-a958-8a02bcadea04\" value=\" \" parent=\"1\" source=\"22923d78-126a-4de5-90d6-5688f9037d32\" target=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><Sequence_RoleActivity value=\"CEO审批\" Version=\"2\" id=\"c34e1c44-753e-41af-bd2c-e8b5d56fd8c3\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/new_icon_1.1.png;gradientDirection=south;rounded=true;fontColor=#ffffff;perimeterspacing=6;fillColor=#0bb59b;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"408\" y=\"84\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_RoleActivity><mxCell id=\"07ebc81e-a6be-4d39-9282-e0e886030c1c\" value=\"　大于24小时\" style=\"strokeColor\" parent=\"1\" source=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\" target=\"c34e1c44-753e-41af-bd2c-e8b5d56fd8c3\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><Sequence_RoleActivity value=\"人事审批\" Version=\"2\" id=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\"><mxCell style=\"shape=label;image=https://dn-i8res.qbox.me/public/workflow/design/icos/new_icon_1.1.png;gradientDirection=south;rounded=true;fontColor=#ffffff;perimeterspacing=6;fillColor=#0bb59b;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"578\" y=\"30\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_RoleActivity><mxCell id=\"28bf0545-5197-4815-a5af-29045f72e910\" value=\" \" style=\"strokeColor\" parent=\"1\" source=\"d472260b-001b-4bc7-8738-aa2a5ac2071b\" target=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><mxCell id=\"6739661f-5115-4711-b94e-84f7a5155c0b\" value=\" \" parent=\"1\" source=\"c34e1c44-753e-41af-bd2c-e8b5d56fd8c3\" target=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><mxCell id=\"00c842c0-06b4-473e-b7d1-f7ffb10c1b79\" value=\" \" parent=\"1\" source=\"22a272e2-4334-4aec-aa93-4c33ae4159a4\" target=\"7958a088-aac2-4030-9bae-720ad0b51a78\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell></root></mxGraphModel>",
                    "ProcStepStatus": 0,
                    "ProcStatus": 2,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "UpdateTime": "2016-08-01 10:19:16",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "TemplateCode": "T20160004",
                    "IsSkip": true,
                    "Config": null,
                    "FieldList": null,
                    "ID": "e7995207-833b-428c-8045-daf8bb93386a",
                    "LastUpdateTime": "2016-08-16 19:28:41",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                },
                "Item2": [{
                    "FieldID": "QingJiaMingXi",
                    "FieldName": "请假明细",
                    "FieldType": 20,
                    "DefaultValue": "",
                    "DataType": 3,
                    "IsProcDataField": false,
                    "IsBindData": false,
                    "IsPrint": true,
                    "IsRequire": true,
                    "DataSource": "cc30e1e7-6c4a-4667-bf4e-c8ea5d78436b",
                    "FieldConfig": {
                        "CustomGridName": null,
                        "GridHeaderConfig": null,
                        "GridConfig": [{
                            "colName": "vacationType",
                            "colText": "请假类型",
                            "colType": "Dropdown",
                            "colWidth": "auto",
                            "mustInput": true,
                            "iscolsum": false,
                            "isparam": false,
                            "iscolchinese": false,
                            "formula": null,
                            "isSumFormula": false,
                            "valuetype": "unlimited",
                            "dataSource": "",
                            "ControlType": 3,
                            "DataType": 0,
                            "valueColName": null,
                            "valueColIndex": null,
                            "isHidden": 0,
                            "parentField": null,
                            "inherit": false,
                            "objExt": null
                        }, {
                            "colName": "beginDate",
                            "colText": "开始时间",
                            "colType": "DatePicker",
                            "colWidth": "auto",
                            "mustInput": true,
                            "iscolsum": false,
                            "isparam": false,
                            "iscolchinese": false,
                            "formula": null,
                            "isSumFormula": false,
                            "valuetype": "unlimited",
                            "dataSource": "",
                            "ControlType": 8,
                            "DataType": 5,
                            "valueColName": null,
                            "valueColIndex": null,
                            "isHidden": 0,
                            "parentField": null,
                            "inherit": false,
                            "objExt": null
                        }, {
                            "colName": "endDate",
                            "colText": "结束时间",
                            "colType": "DatePicker",
                            "colWidth": "auto",
                            "mustInput": true,
                            "iscolsum": false,
                            "isparam": false,
                            "iscolchinese": false,
                            "formula": null,
                            "isSumFormula": false,
                            "valuetype": "unlimited",
                            "dataSource": "",
                            "ControlType": 8,
                            "DataType": 5,
                            "valueColName": null,
                            "valueColIndex": null,
                            "isHidden": 0,
                            "parentField": null,
                            "inherit": false,
                            "objExt": null
                        }, {
                            "colName": "amount",
                            "colText": "可用数量",
                            "colType": "simpleTextBox",
                            "colWidth": "auto",
                            "mustInput": false,
                            "iscolsum": false,
                            "isparam": false,
                            "iscolchinese": false,
                            "formula": null,
                            "isSumFormula": false,
                            "valuetype": "number",
                            "dataSource": "",
                            "ControlType": 2,
                            "DataType": 1,
                            "valueColName": null,
                            "valueColIndex": null,
                            "isHidden": 0,
                            "parentField": null,
                            "inherit": false,
                            "objExt": null
                        }, {
                            "colName": "col_4_applytime",
                            "colText": "申请数量",
                            "colType": "simpleTextBox",
                            "colWidth": "auto",
                            "mustInput": true,
                            "iscolsum": false,
                            "isparam": false,
                            "iscolchinese": false,
                            "formula": null,
                            "isSumFormula": false,
                            "valuetype": "number",
                            "dataSource": "",
                            "ControlType": 0,
                            "DataType": 1,
                            "valueColName": null,
                            "valueColIndex": null,
                            "isHidden": 0,
                            "parentField": null,
                            "inherit": false,
                            "objExt": null
                        }, {
                            "colName": "remark",
                            "colText": "备注",
                            "colType": "simpleTextBox",
                            "colWidth": "auto",
                            "mustInput": false,
                            "iscolsum": false,
                            "isparam": false,
                            "iscolchinese": false,
                            "formula": null,
                            "isSumFormula": false,
                            "valuetype": "unlimited",
                            "dataSource": "",
                            "ControlType": 1,
                            "DataType": 0,
                            "valueColName": null,
                            "valueColIndex": null,
                            "isHidden": 0,
                            "parentField": null,
                            "inherit": false,
                            "objExt": null
                        }, {
                            "colName": "available",
                            "colText": "可用控制",
                            "colType": "simpleTextBox",
                            "colWidth": "auto",
                            "mustInput": false,
                            "iscolsum": false,
                            "isparam": false,
                            "iscolchinese": false,
                            "formula": null,
                            "isSumFormula": false,
                            "valuetype": "unlimited",
                            "dataSource": "",
                            "ControlType": 2,
                            "DataType": 0,
                            "valueColName": null,
                            "valueColIndex": null,
                            "isHidden": 0,
                            "parentField": null,
                            "inherit": false,
                            "objExt": null
                        }],
                        "ExtConfig": null,
                        "Tags": [{"Key": "controlVersion", "Value": "2"}],
                        "InitRowNum": 0,
                        "parentField": null,
                        "inherit": false,
                        "objExt": null
                    },
                    "FormID": "a53f5154-e165-478a-ae8e-1bdeb2da9ed7",
                    "SortIndex": 1,
                    "ID": "cc6033f2-dda0-4960-80ca-f49031441d81",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "FieldID": "QingJiaShuoMing",
                    "FieldName": "请假说明",
                    "FieldType": 1,
                    "DefaultValue": "",
                    "DataType": 0,
                    "IsProcDataField": false,
                    "IsBindData": false,
                    "IsPrint": true,
                    "IsRequire": true,
                    "DataSource": "cc30e1e7-6c4a-4667-bf4e-c8ea5d78436b",
                    "FieldConfig": {
                        "txtValueType": "0",
                        "maxLength": 3000,
                        "minLength": 0,
                        "parentField": null,
                        "inherit": false,
                        "objExt": null
                    },
                    "FormID": "a53f5154-e165-478a-ae8e-1bdeb2da9ed7",
                    "SortIndex": 2,
                    "ID": "2bc2544f-ab9f-4de0-a800-4bbca742fd04",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }],
                "Item3": [{
                    "ActivityName": "上级审批",
                    "ActivityType": 1,
                    "Duration": 0,
                    "ApproverDesc": null,
                    "ToDoTime": 0,
                    "SkipTime": 0,
                    "Approver": "SysOriginatorID|1|-1",
                    "RoleExpression": "5",
                    "VersionID": "d9e9056f-5bf7-4f11-b40f-88d88a2eb2f8",
                    "SortIndex": 2,
                    "Config": null,
                    "ID": "d472260b-001b-4bc7-8738-aa2a5ac2071b",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ActivityName": "CEO审批",
                    "ActivityType": 1,
                    "Duration": 0,
                    "ApproverDesc": null,
                    "ToDoTime": 0,
                    "SkipTime": 0,
                    "Approver": "9252e897-e27d-4f35-ae51-6f149c498ea3",
                    "RoleExpression": "2",
                    "VersionID": "d9e9056f-5bf7-4f11-b40f-88d88a2eb2f8",
                    "SortIndex": 3,
                    "Config": null,
                    "ID": "c34e1c44-753e-41af-bd2c-e8b5d56fd8c3",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ActivityName": "人事审批",
                    "ActivityType": 1,
                    "Duration": 0,
                    "ApproverDesc": null,
                    "ToDoTime": 0,
                    "SkipTime": 0,
                    "Approver": "d33d1748-f8df-4f7d-9656-6f5ae756ab81",
                    "RoleExpression": "2",
                    "VersionID": "d9e9056f-5bf7-4f11-b40f-88d88a2eb2f8",
                    "SortIndex": 4,
                    "Config": null,
                    "ID": "22a272e2-4334-4aec-aa93-4c33ae4159a4",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }],
                "Item4": [{
                    "ProcBaseID": "e7995207-833b-428c-8045-daf8bb93386a",
                    "ActivityID": "0bc4868c-5054-4fcb-8120-3bf90afdec4e",
                    "FieldID": "QingJiaMingXi",
                    "FieldName": "请假明细",
                    "FieldType": 20,
                    "AuthType": 2,
                    "ID": "90231e40-7f0f-462b-a436-bcbcdc93bcc1",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcBaseID": "e7995207-833b-428c-8045-daf8bb93386a",
                    "ActivityID": "d472260b-001b-4bc7-8738-aa2a5ac2071b",
                    "FieldID": "QingJiaMingXi",
                    "FieldName": "请假明细",
                    "FieldType": 20,
                    "AuthType": 1,
                    "ID": "f476ae02-8507-4de0-b5d1-ccd8b6c41973",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcBaseID": "e7995207-833b-428c-8045-daf8bb93386a",
                    "ActivityID": "c34e1c44-753e-41af-bd2c-e8b5d56fd8c3",
                    "FieldID": "QingJiaMingXi",
                    "FieldName": "请假明细",
                    "FieldType": 20,
                    "AuthType": 1,
                    "ID": "56b40d12-6b71-4bd2-a7c1-84b920366a35",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcBaseID": "e7995207-833b-428c-8045-daf8bb93386a",
                    "ActivityID": "22a272e2-4334-4aec-aa93-4c33ae4159a4",
                    "FieldID": "QingJiaMingXi",
                    "FieldName": "请假明细",
                    "FieldType": 20,
                    "AuthType": 1,
                    "ID": "686cb2d0-cac9-4dd2-b632-1ec9f373be85",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcBaseID": "e7995207-833b-428c-8045-daf8bb93386a",
                    "ActivityID": "0bc4868c-5054-4fcb-8120-3bf90afdec4e",
                    "FieldID": "QingJiaShuoMing",
                    "FieldName": "请假说明",
                    "FieldType": 1,
                    "AuthType": 2,
                    "ID": "7c23f338-3a74-44ec-aa8a-9903af54abab",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcBaseID": "e7995207-833b-428c-8045-daf8bb93386a",
                    "ActivityID": "d472260b-001b-4bc7-8738-aa2a5ac2071b",
                    "FieldID": "QingJiaShuoMing",
                    "FieldName": "请假说明",
                    "FieldType": 1,
                    "AuthType": 1,
                    "ID": "751f0a1d-8a6b-4afb-850f-273c3be685e8",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcBaseID": "e7995207-833b-428c-8045-daf8bb93386a",
                    "ActivityID": "c34e1c44-753e-41af-bd2c-e8b5d56fd8c3",
                    "FieldID": "QingJiaShuoMing",
                    "FieldName": "请假说明",
                    "FieldType": 1,
                    "AuthType": 1,
                    "ID": "0e049ef3-19a3-43e9-8b2d-ced469aec578",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ProcBaseID": "e7995207-833b-428c-8045-daf8bb93386a",
                    "ActivityID": "22a272e2-4334-4aec-aa93-4c33ae4159a4",
                    "FieldID": "QingJiaShuoMing",
                    "FieldName": "请假说明",
                    "FieldType": 1,
                    "AuthType": 1,
                    "ID": "324e38c3-f818-4250-82c2-a4978b44e366",
                    "LastUpdateTime": "2016-08-01 10:19:16",
                    "CreateTime": "2016-08-01 10:19:16",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }]
            }, "Result": true, "Code": 0, "Description": null
        }
        var resultData = json.ReturnObject;
        var datafieldList = resultData.Item2; //表单字段列表
        var activityList = resultData.Item3; //环节字段列表
        var authList = resultData.Item4; //表单环节字段配置列表
        var showhtml = '<tr class="app_process_setper_title">';
        showhtml += '<td class="app_process_setper_td" style="background-color:#f8f8f8;border-top-color:#bed0e8;!important;">';
        showhtml += '<span class="app_process_setper_actname">字段名</span>';
        showhtml += '</td>';
        showhtml += '<td class="app_process_setper_td_margin" style="background-color:#f8f8f8;border-top-color:#bed0e8;!important;"><span class="app_process_setper_actname">发起人</span></td>';
        for (var i = 0; i < activityList.length; i++)
            showhtml += '<td style="background-color:#f8f8f8;border-top-color:#bed0e8;!important;"><span class="app_process_setper_actname" title="' + activityList[i].ActivityName + '">' + activityList[i].ActivityName + '</span></td>';
        showhtml += '</tr>';
        for (var i = 0; i < datafieldList.length; i++) {
            showhtml += '<tr>';
            showhtml += '<td class="app_process_setper_td"><span class="app_process_setper_fieldname" title="' + datafieldList[i].FieldName + '">' + datafieldList[i].FieldName + '</span></td>';
            showhtml += '<td class="app_process_setper_td_margin">';
            showhtml += createSelectPer("," + datafieldList[i].FieldID + "", datafieldList[i].FieldName);
            showhtml += '</td>';
            for (var j = 0; j < activityList.length; j++) {
                showhtml += '<td>';
                showhtml += createSelectPer('' + activityList[j].ID + ',' + datafieldList[i].FieldID + '', datafieldList[i].FieldName);
                showhtml += '</td>';
            }
            showhtml += '</tr>';
        }
        $(".app_process_setper_table").html(showhtml.toString());
        var selectList = $(".app_process_setper_table select");

        for (var i = 0; i < selectList.length; i++) {
            if ($(selectList[i]).val().indexOf(',,') > 0) {
                selectList.get(i).selectedIndex = 1;
                $(selectList[i]).css("color", "#00b9f0");
            }
            else {
                $(selectList[i]).css("color", "#000000");
                selectList.get(i).selectedIndex = 0;
            }
        }
        //给设置过的权限赋值
        for (var i = 0; i < authList.length; i++) {
            var actid = authList[i].ActivityID == "00000000-0000-0000-0000-000000000000" ? "," : authList[i].ActivityID + ",";
            var showValue = authList[i].AuthType + "," + actid + authList[i].FieldID;
            for (var j = 0; j < selectList.length; j++) {
                var options = $(selectList[j]).find("option");
                for (var k = 0; k < options.length; k++) {
                    if ($(options[k]).val() == showValue) {
                        if (authList[i].AuthType == 0)//隐藏
                            $(selectList[j]).css("color", "#8D848A");
                        if (authList[i].AuthType == 1)//查看
                            $(selectList[j]).css("color", "#000000");
                        if (authList[i].AuthType == 2)//编辑
                            $(selectList[j]).css("color", "#00b9f0");
                        $(selectList[j]).val(showValue);
                    }
                }
            }
        }
        //});
    }

    //第四步-创建权限列表
    function createSelectPer(objvalue, formName) {
        var selectList = '<select formName="' + formName + '"><option value="1,' + objvalue + '" style="color:#000000">查看</option><option value="2,' + objvalue + '" style="color:#00b9f0">编辑</option><option value="0,' + objvalue + '" style="color:#8D848A;">隐藏</option></select>';
        return selectList;
    }

    $(".app_process_setper_table select").live("change", function () {
        if ($(this).get(0).selectedIndex == 0)//查看
            $(this).css("color", "#000000");
        if ($(this).get(0).selectedIndex == 1)//编辑
            $(this).css("color", "#00b9f0");
        if ($(this).get(0).selectedIndex == 2)//隐藏
            $(this).css("color", "#8D848A");
    })

    var uploaderTemplate = function (loadding) {
        $.get(i8_session.ajaxWfHost + 'webajax/template_ajax/login', {
            options: {
                fun: 'ImportFromProcess',
                procSetID: procSetID
            }
        }, function (json) {
            if (json.Result == true) {//成功
                loadding.close();
                i8ui.alert({title: "上传成功！", type: 2});
            }
            else {
                loadding.close();
                i8ui.alert({title: "上传模板失败," + json.Description});
            }
        })
    }

    //上传至模板库
    $("#btn_uploadTemplate").live("click", function () {
        i8ui.confirm({title: "确定要上传至模板库吗？"}, function (divDom) {
            //流程克隆
            var loadding = i8ui.showNoTitle({cont: '<div style="width:120px; height:80px;padding:10px;"><div style="text-align: center;"><img src="' + i8_session.resWfHost + 'default/images/process/load-img1.gif"/></div><div style="font-size: 16px;font-weight: 600;text-align: center;">正在上传中...</div></div>'});

            $.get(i8_session.ajaxWfHost + 'webajax/template_ajax/login', {
                options: {
                    fun: 'ImportFromProcessCheck',
                    procSetID: procSetID
                }
            }, function (json) {
                if ($.type(json) == 'object' && json.Result) {
                    uploaderTemplate(loadding);
                } else {
                    if (json && json.Code == '12006') {
                        i8ui.confirm({title: "模板曾经导入过，是否需要覆盖？"}, function (divDom) {
                            uploaderTemplate(loadding);
                        }, function () {
                            loadding.close();
                        })

                    } else {
                        i8ui.error('模板已发布，不能重新导入!');
                        loadding.close();
                    }
                }
            });
        });
    });
    var copyType = 1;
    //复制表单流程
    $("#btn_copyform").live("click", function () {
        copyType = 1;
        copyProc();
    });
    //复制表单流程
    $("#js_copydesigner").live("click", function () {
        copyType = 2;
        copyProc();
    });

    $("#proc-go-2-adv").click(function () {
        var advBox = i8ui.showbox({
            title: '流程高级开发设置',
            cont: document.getElementById("div_advanceDev").innerHTML,
            success: function () {
                if (adv2ProcSet) {
                    $("#txt_css_uris").val(adv2ProcSet.IncludeResourceCss);
                    $("#txt_js_uris").val(adv2ProcSet.IncludeResourceJScript);
                    $(".radio-enableMS").removeClass("checked");
                    if (adv2ProcSet.EnableMobileCreate) {
                        $("#radio-enableMS-1").addClass("checked");
                    } else {
                        $("#radio-enableMS-0").addClass("checked");
                    }
                }
                show2rdSetBox();
                //选择事件
                $("#area-selector span.app-radio").live("click", function () {
                    $("#area-selector span.app-radio").removeClass("checked");
                    $(this).addClass("checked");
                });

            }

        });
        //保存第二次开发设置
        function show2rdSetBox() {
            $("#btn_save2devSet").click(function () {
                if (js_wf_BaseInfoID.length == 0) {
                    alert('请在填写完“基本信息”、“流程表单”、“流程审批链”三项内容之后，再做本项设置！')
                    return;
                }
                var css_uris = $.trim($("#txt_css_uris").val()),
                    js_uris = $.trim($("#txt_js_uris").val()),
                    enable_m = $("#radio-enableMS-0").hasClass("checked") ? false : true;
                if (css_uris.length > 0) {
                    css_uris += ';';
                    css_uris = css_uris.replace(/;{2,}/g, ";");
                    if (!/^(https?\:\/\/[^/]+\/[^;]+;)+$/g.test(css_uris)) {
                        alert('style样式地址格式不对！');
                        return;
                    }
                }
                if (js_uris.length > 0) {
                    js_uris += ';';
                    js_uris = js_uris.replace(/;{2,}/g, ";");
                    if (!/^(https?\:\/\/[^/]+\/[^;]+;)+$/g.test(js_uris)) {
                        alert('script脚本地址格式不对！');
                        return;
                    }
                }
                $.post(i8_session.ajaxWfHost + 'webajax/design/save3rdoption', {
                    'procBaseId': js_wf_BaseInfoID,
                    'jsuris': js_uris,
                    'cssuris': css_uris,
                    'enableMC': enable_m
                }, function (response) {
                    if (response.Result) {
                        i8ui.alert({title: "设置成功！", type: 2});
                        adv2ProcSet.IncludeResourceCss = css_uris;
                        adv2ProcSet.IncludeResourceJScript = js_uris;
                        adv2ProcSet.EnableMobileCreate = enable_m;
                        advBox.close();
                    } else {
                        i8ui.alert({title: "设置失败，请刷新页面再试！"});
                    }
                }, "json")
            });
        }
    })
    //复制流程
    function copyProc() {
        //获取模板
        //$.get(i8_session.resWfHost + 'default/template/design/copyproc.tpl', function (tpl) {
        var tpl = "<div style=\"display: block;width: 915px;left: 0px;top:0px;\"><span class=\"ct-close\">×</span>        <div class=\"ct-ly-h1\" id=\"div_title\"></div>            <div class=\"abs nav-search-box\" id=\"div_copysearch\">            <input type=\"text\" placeholder=\"搜索流程名称\">            <i class=\"icon icon-search-gray abs\" id=\"div_copySubmit\"></i>            <div class=\"search-border\"></div>            </div>            <div class=\"copy-fw\">            <div class=\"cate-row\" id=\"div_proclist\">            <div class=\"list-loading\">正在加载..</div>            </div>            <div class=\"clear\"></div>            </div>            <div class=\"clear\"></div>            <div class=\"h-45\" style=\"padding-right: 20px;padding-top: 10px;height:40px;\">            <span class=\"btn-blue96x32 rt\" id=\"span_copysubmit\">确定</span>            <span class=\"btn-gray96x32 m-r10 rt\" id=\"span_copycancel\">取消</span>            <span class=\"red rt copy-tip\">提示：点击确定后无法撤销复制操作</span>        </div>        </div>"
        var loadding = i8ui.showNoTitle({cont: tpl});
        if (copyType == 1)
            $("#div_title").html("复制其他流程表单  <span class=\"copy-fw-title-tip\">复制流程表单，将同步该流程的所有表单控件及其属性<span>");
        if (copyType == 2)
            $("#div_title").html("复制其他流程审批链  <span class=\"copy-fw-title-tip\">复制流程审批链，将同步该流程的所有环节控件及其属性<span>");
        //$.get(i8_session.ajaxWfHost + 'webajax/design/getCopyProc', {
        //    type: copyType,
        //    procName: "",
        //    baseinfoID: js_wf_BaseInfoID
        //}, function (json) {
        var json = {
            "ReturnObject": [{
                "Item1": "财务",
                "Item2": [{
                    "Item1": "0e2a497d-b5e1-4c2d-92e0-51fef77fd163",
                    "Item2": "是打发点"
                }, {
                    "Item1": "6db90759-eba5-4ad0-9581-05757bd2cb3c",
                    "Item2": "zdZcdads"
                }, {"Item1": "053a3266-77be-4e65-8cb3-a8a013d79c8e", "Item2": "财务报销流程"}]
            }, {
                "Item1": "采购",
                "Item2": [{
                    "Item1": "dfbd33b0-b010-4849-9947-6caea45f7723",
                    "Item2": "费用支出1"
                }, {
                    "Item1": "bd915bed-5adb-4947-88e5-f59ce10b417e",
                    "Item2": "费用支出"
                }, {
                    "Item1": "e55e1b1f-6187-433b-8334-a915895fe623",
                    "Item2": "采购申请单"
                }, {"Item1": "cf48aefd-e232-401f-8a8f-21b6fc82e91a", "Item2": "采购申请单"}]
            }, {"Item1": "人事类", "Item2": [{"Item1": "d3e2b816-55e6-43ba-b5af-8af0ad5a7eb0", "Item2": "出差申请单"}]}],
            "Result": true,
            "Code": 0,
            "Description": null
        }
        if (json.Result == true) {//成功
            var data = json.ReturnObject;
            var prochtml = "";
            for (var i = 0; i < data.length; i++) {
                var categoryName = data[i].Item1;
                var List = data[i].Item2;
                prochtml += " <div class=\"cate-body ft12\">";
                prochtml += "<div class=\"cate-title\">" + categoryName + "</div>";
                prochtml += "<ul>";
                for (var j = 0; j < List.length; j++) {
                    prochtml += "<li title='" + List[j].Item2 + "'><span class='app-radio' procID='" + List[j].Item1 + "'></span>" + List[j].Item2 + "</li>";
                }
                prochtml += "</ul>";
                prochtml += "<div class=\"clear\"></div>";
                prochtml += "</div>";
            }
            $("#div_proclist").html(prochtml);
            $('.copy-fw').mCustomScrollbar({
                theme: "dark-thin"
            });
            loadding.position();
        }
        //});
        //选择事件
        $("#div_proclist li").live("click", function () {
            $("#div_proclist li span").attr("class", "app-radio");
            $(this).find("span").attr("class", "app-radio checked");
        });
        //确定复制
        $("#span_copysubmit").live("click", function () {
            var proc = $("#div_proclist li span[class='app-radio checked']");
            if (proc.length == 0) {
                alert("请选择要复制的流程！");
                return;
            }
            var copyID = $(proc).attr("procid");
            if (copyType == 2) {//复制审批链
                if ($("#span_design").hasClass("checked")) { //自主设计
                    copyBaseInfoID = copyID;
                    //获取要复制的审批链XML
                    $.get(i8_session.ajaxWfHost + 'webajax/design/getProcBaseInfoByID', {procBaseID: copyBaseInfoID}, function (json) {
                        var procbaseinfo = json.ReturnObject;
                        diagramMetaData = procbaseinfo.ProcDesignMetaData;
                        loadding.close();
                        js_wf_Status = "edit";
                        showActDesigner();
                    })
                }
                else
                    i8ui.alert({title: "当前为自定义审批链,无法设计！"});
            }
            else {
                $.get(i8_session.ajaxWfHost + 'webajax/design/copyPorc', {
                    baseInfoID: js_wf_BaseInfoID,
                    copyID: copyID
                }, function (json) {
                    if (json.Result == true) {//成功
                        loadding.close();
                        if (copyType == 1) {
                            i8ui.alert({title: "复制成功！", type: 2});
                            $("#app_process_design_edit").html(((json.ReturnObject || {}).Item2 || {}).ReturnObject);
                            window.top.js_wf_BaseInfoID = (json.ReturnObject || {}).Item1;
                            $("#app_process_design_edit").append('<div class="controloverlayer" style="z-index: 8; position: absolute; left: 0px; top: 0px; height: 10000px; width: 100%;"></div>');
                        }
                    }
                    else {
                        loadding.close();
                        i8ui.alert({title: "复制失败,请联系管理员！"});
                    }
                })
            }
        })
        //取消复制
        $("#span_copycancel").live("click", function () {
            $('.ct-close').trigger('click');
        })
        //搜索流程
        $("#div_copySubmit").live("click", function () {
            $("#div_proclist").html("<div class=\"list-loading\">正在加载..</div>");
            var procName = $("#div_copysearch input").val();
            $.get(i8_session.ajaxWfHost + 'webajax/design/getCopyProc', {
                type: copyType,
                procName: procName,
                baseinfoID: js_wf_BaseInfoID
            }, function (json) {
                if (json.Result == true) {//成功
                    var data = json.ReturnObject;
                    var prochtml = "";
                    for (var i = 0; i < data.length; i++) {
                        var categoryName = data[i].Item1;
                        var List = data[i].Item2;
                        prochtml += " <div class=\"cate-body ft12\">";
                        prochtml += "<div class=\"cate-title\">" + categoryName + "</div>";
                        prochtml += "<ul>";
                        for (var j = 0; j < List.length; j++) {
                            prochtml += "<li title='" + List[j].Item2 + "'><span class='app-radio' procID='" + List[j].Item1 + "'></span>" + List[j].Item2 + "</li>";
                        }
                        prochtml += "</ul>";
                        prochtml += "<div class=\"clear\"></div>";
                        prochtml += "</div>";
                    }
                    $("#div_proclist").html(prochtml)
                    $('.copy-fw').mCustomScrollbar({
                        theme: "dark-thin"
                    });
                    loadding.position();
                }
            });
        })
        //});
    }

    exports.init = init;
    exports.Load_ActDesigner = Load_ActDesigner;
});