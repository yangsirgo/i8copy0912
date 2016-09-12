/**
 * Created by Ling on 2014/11/5.
 */
define(function (require, exports) {
    var i8ui = require("../common/i8ui.js");
    //打印设置
    if (processDataInfo.Config && processDataInfo.Config.isUsePrintSet) {
        $("#span_fixed_print").trigger('click');
        var printSet = processDataInfo.Config.printFields || '';
        printSet = printSet.split('&');
        _.each(printSet, function (item) {
            $('[ekey=' + item + ']').addClass('checked');
        })
    }
    //加载
    $(document).ready(function () {
        //表单
        //$.get(i8_session.ajaxWfHost+'webajax/form/getformbyprocbaseid', { baseInfoID: out_procbaseInfoID }, function (response) {
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
        };
        if (response != null) {
            if (response.Result) {
                var dataobj = response.ReturnObject;
                if (dataobj != null) {
                    $("#app_process_design_panl_edit").html(dataobj.XsltMetaData).attr("formID", dataobj.ID);
                    $("#app_process_design_panl_edit").css({"position": "relative"}).append($('<div class="controloverlayer"></div>').css({
                        "z-index": "88",
                        "position": "absolute",
                        "left": "0px",
                        "top": "0px",
                        "height": $("#app_process_design_panl_edit").height(),
                        "width": "100%"
                    }));
                }
            }
        }
        //}, "json");
        //权限
        //$.get(i8_session.ajaxWfHost + 'webajax/design/getprocessfield', {baseinfoid: out_procbaseInfoID}, function (json) {
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
        if (json) {
            var resultData = json.ReturnObject;
            var datafieldList = resultData.Item2; //表单字段列表
            var activityList = resultData.Item3; //环节字段列表
            var authList = resultData.Item4; //表单环节字段配置列表
            var showHtml = '<table class="app_process_setper_tableview">';
            showHtml += '<tr class="app_process_setper_titleview">';
            showHtml += '<td class="app_process_setper_tdview"><span class="app_process_setper_actnameview">字段名</span></td>';
            showHtml += '<td class="app_process_setper_tdview_margin"><span class="app_process_setper_actnameview">发起人</span></td>';
            for (var i = 0; i < activityList.length; i++)
                showHtml += '<td><span class="app_process_setper_actnameview" title="' + activityList[i].ActivityName + '">' + activityList[i].ActivityName + '</span></td>';
            showHtml += '</tr>';
            if (datafieldList != null) {
                for (var i = 0; i < datafieldList.length; i++) {
                    showHtml += '<tr>';
                    showHtml += '<td class="app_process_setper_tdview"><span class="app_process_setper_fieldnameview" title="' + datafieldList[i].FieldName + '">' + datafieldList[i].FieldName + '</span></td>';
                    showHtml += '<td class="app_process_setper_tdview_margin">';
                    var authType = "";
                    for (var j = 0; j < authList.length; j++) {
                        if (authList[j].FieldID == datafieldList[i].FieldID && authList[j].ActivityID == "00000000-0000-0000-0000-000000000000")
                            authType = SelectVal(authList[j].AuthType);
                    }
                    if (authType != "")//记录是否有值  有
                        showHtml += authType;
                    else
                        showHtml += SelectVal(2);
                    showHtml += '</td>';
                    for (var j = 0; j < activityList.length; j++) {
                        showHtml += '<td>';
                        var authTypeValue = "";
                        for (var k = 0; k < authList.length; k++) {
                            if (authList[k].FieldID == datafieldList[i].FieldID && authList[k].ActivityID == activityList[j].ID)
                                authTypeValue = SelectVal(authList[k].AuthType);
                        }
                        if (authTypeValue != "") //记录是否有值  有
                            showHtml += authTypeValue;
                        else
                            showHtml += SelectVal(1);
                        showHtml += '</td>';
                    }
                    showHtml += '</tr>';
                }
                showHtml += '</table>';
            }
            $("#div_authAcitity").html(showHtml);
        }
        //}, "json");
    })
    function SelectVal(objvalue) {
        var result = "未知";
        switch (objvalue) {
            case 0:
                result = "<label style='color:#8D848A;'>隐藏</label>";
                break;
            case 1:
                result = "查看";
                break;
            case 2:
                result = "<label style='color:#00b9f0;'>编辑</label>";
                break;
        }
        return result;
    }

    //编辑流程
    $("#a_edit").click(function () {
        out_procStatus = out_procStatus * 1;
        if (out_procStatus == 1) {//上架流程
            i8ui.confirm({title: "编辑时会暂时将流程下架,确定要编辑吗？"}, function (divDom) {
                //window.location.href = i8_session.ajaxWfHost + 'design/dev?baseinfoid=' + out_procbaseInfoID;
                window.location.href = i8_session.ajaxWfHost + 'design/devEditor.html';
            });
        }
        else
            window.location.href = i8_session.ajaxWfHost + 'design/dev?baseinfoid=' + out_procbaseInfoID;
    })
    //上下架流程
    $("#a_edit_status").click(function () {
        if (out_procStatus != 1) {
            if ((diagramMetaData == null || diagramMetaData == "") && $("#app_process_design_panl_edit .fdctrl").length == 0) {
                i8ui.alert({title: "请先补充完整流程表单和审批环节才可以上架！"});
                return;
            }
            if ($("#app_process_design_panl_edit .fdctrl").length == 0) {
                i8ui.alert({title: "请先补充完整流程表单才可以上架！"});
                return;
            }
            if (diagramMetaData == null || diagramMetaData == "") {
                i8ui.alert({title: "请先补充完整流程审批环节才可以上架！"});
                return;
            }
        }
        var str = "";
        if (out_procStatus == 1)
            str = "下架";
        else
            str = "上架";
        if (str == "上架") {
            updateStatus(str);
            //$.get(i8_session.ajaxWfHost+ 'webajax/design/verifyProcCount',function(json){
            //    if(!json.Result)
            //        i8ui.alert({title: "您已经超过流程上架数量限制，请联系i8客服",type:1});
            //    else
            //        updateStatus(str);
            //});
        }
        else
            updateStatus(str);
    })
    function updateStatus(str) {
        if (out_procStatus == 1)
            out_procStatus = 2;
        else
            out_procStatus = 1;
        i8ui.confirm({title: '确定要' + str + '流程吗？'}, function (divDom) {
            //更改流程上架
            $.post(i8_session.ajaxWfHost + 'webajax/design/updateprocstatus', {
                baseinfoid: out_procbaseInfoID,
                status: out_procStatus,
                type: out_procDesignType
            }, function (json) {
                if (json.ReturnObject) {
                    if (out_procStatus == 1) {
                        $("#a_edit_status").html("下架流程");
                        i8ui.alert({title: "已上架", type: 2});
                    }
                    else {
                        $("#a_edit_status").html("上架流程");
                        i8ui.alert({title: "已下架", type: 2});
                    }
                }
            }, 'json');
            divDom.close();
        });
    }
});