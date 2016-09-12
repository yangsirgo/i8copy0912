/**
 * Created by Ling on 2014/11/13.
 * 知会环节JS
 */
define(function(require,exports) {
    var i8ui = require("../../common/i8ui");
    var act_common = require("./common");
    //角色级联事件
    $("#table_NotifiedRole tr select:even").live("change",function(){
        //绑定角色
        act_common.wf_bindRole($(this).val(), $(this).next());
    })

    //删除角色
    $("#table_NotifiedRole img").live("click",function(){
        var trObj = $(this).parents("#table_NotifiedRole tr");
        var trlength = $("#table_NotifiedRole tr").length; //获取一共有多少个角色
        var delNum = $("#table_NotifiedRole tr").index(trObj) + 1;//获取要删除第几个元素值
        var count = trlength - delNum; //获取删除后还有多少个角色
        if (count > 0) {//当前删除的不是最后一个角色，进行重新排列
            $("#table_NotifiedRole tr:gt("+(delNum-1)+")").each(function(i){
                $(this).find("span").html("角色&nbsp;&nbsp;"+ (delNum + i)+"&nbsp;：");
            });
        }
        $(trObj).remove();
    })

    //添加并签角色
    $("#a_AddNotifiedRole").live("click",function(){
        addRole();
    })
    function addRole(){
        //判断table对象下有多少个tr元素，一个tr元素代表一个角色
        var count = $("#table_NotifiedRole tr").length + 1;
        //添加角色元素及值
        var tr = $("<tr></tr>");
        var td = $("<td style=\"padding-left: 30px;\"></td>");
        td.append("<span>角色&nbsp;&nbsp;" + count + "&nbsp;：</span>");
        td.append("&nbsp;<select><option value='2'>专项角色</option><option value='3'>流程角色</option></select>&nbsp;");
        var select = $("<select></select>");
        td.append(select);
        td.append("&nbsp;<img src=\""+i8_session.resWfHost+"default/images/design/graph/delete.png\"/>");
        tr.append(td);
        $("#table_NotifiedRole").append(tr);
        //绑定角色
        var thisTr = $("#table_NotifiedRole tr").eq(count-1);
        act_common.wf_bindRole($(thisTr).find("select:first").val(), $(thisTr).find("select:last"));
    }

    //提交方法
    $("#txt_NotifiedSubmit").live("click",function(){
        var txt_NotifiedTitle = $("#txt_NotifiedTitle"); //判断节点名称是否为空
        var table_NotifiedRole = $("#table_NotifiedRole"); //获取角色table,
        var _txt_NotifiedTitleValue = $.trim(txt_NotifiedTitle.val());
        if (_txt_NotifiedTitleValue == "") {
            i8ui.alert({title:"环节说明不能为空!"});
            return false;
        }
        //判断table下是否存在tr元素，没有则代表没有选择角色,一个tr元素代表一个角色
        if ($("#table_NotifiedRole tr").length == 0) {
            i8ui.alert({title:"您当前尚未设置任何审批角色!"});
            return false;
        }
        var ApproverType = "";
        var Approver = "";
        var isExist = true;
        $("#table_NotifiedRole tr").each(function(){
            var roleNodes =$(this).find("select:last");//子类别
            if($(roleNodes).find("option:selected").index() == 0){
                i8ui.alert({title:"请选择一个角色!"});
                isExist = false;
                return false;
            }
            //判断是否有重复值
            if (Approver.indexOf($(roleNodes).val() + "|") >= 0) {
                i8ui.alert({title:"请确保选择的角色没有重复!"});
                isExist = false;
                return false;
            }
            //赋值
            ApproverType += $(this).find("select:first").val() + "|";
            Approver += $(roleNodes).val() + "|";
        })
        if(!isExist) return false;
        Approver = Approver.replace(" |", ""); //如果选择的是“请选择”项，则不需要存储
        ApproverType = ApproverType.substring(0, ApproverType.length - 1);
        if (Approver != "")
            Approver = Approver.substring(0, Approver.length - 1);

        //封装数据
        act_common.wf_addActity(wf_graph.getSelectionCell().id, _txt_NotifiedTitleValue, 3, 0, Approver, ApproverType, "");
        var cell = wf_graph.getSelectionCell(); //获取当前的cell
        cell.setAttribute("value", _txt_NotifiedTitleValue); //赋值
        wf_graph.refresh(); //刷新图形显示更新
        //wf_wnd.setVisible(false); //隐藏窗口
        //关闭层
        $(this).parents("div[class='ct-ly']").next().remove();
        $(this).parents("div[class='ct-ly']").remove();
    });
    //赋值方法
    function giveAct(listOrderNum){
        if (listOrderNum != -1) {//不等于代表存储过该对象，进行赋值
            var wf_ProcActity = act_common.wf_ProcActityArray;
            $("#table_NotifiedRole tr").remove();//删除
            var ApproverRoleType = wf_ProcActity[listOrderNum].RoleExpression;
            var Approver = wf_ProcActity[listOrderNum].Approver;
            if (ApproverRoleType.indexOf("|") > 0) {
                var ApproverRoleTypeList = ApproverRoleType.split('|');
                var ApproverList = Approver.split('|');
                for (var i = 0; i < ApproverRoleTypeList.length; i++) {//根据选择的角色循环赋值
                    addRole(); //动态创建角色
                    //赋值
                    var trObj = $("#table_NotifiedRole tr").eq(i);
                    var roleType = $(trObj).find("select:first");
                    var roleNodes = $(trObj).find("select:last");
                    $(roleType).val(ApproverRoleTypeList[i]);
                    act_common.wf_bindRole($(roleType).find("option:selected").val(), roleNodes); //绑定子级角色
                    $(roleNodes).val(ApproverList[i]); //给定选定值
                }
            }
            else {
                addRole(); //动态创建角色
                //赋值
                var trObj = $("#table_NotifiedRole tr:first")
                var roleType = $(trObj).find("select:first");
                var roleNodes = $(trObj).find("select:last");
                $(roleType).val(ApproverRoleType);
                act_common.wf_bindRole($(roleType).find("option:selected").val(), roleNodes); //绑定子级角色
                $(roleNodes).val(Approver); //给定选定值
            }
        }
        else {
            //代表没有进行过赋值，则初始化内容
            $("#table_NotifiedRole tr").each(function(){
                act_common.wf_bindRole($(this).find("select:first").val(),$(this).find("select:last"));//绑定子级角色
            })
        }
    }
    exports.giveAct = giveAct;//赋值方法
});