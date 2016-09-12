/**
 * Created by Ling on 2014/11/14.
 */
define(function (require, exports) {
    var act_common = require('./common');

    function getDesignerData() {
        var baseinfoid = parent.copyBaseInfoID == '' ? parent.js_wf_BaseInfoID : parent.copyBaseInfoID;//parent.js_wf_BaseInfoID;
        var isCopy = parent.copyBaseInfoID == '' ? false : true;
        if (isCopy)//复制流程功能
            wf_isChange = true;
        //获取XML数据
        //$.ajax({url:i8_session.ajaxWfHost+ 'webajax/design/activity/getprocdiagram', type: 'get', data: 'baseinfoid=' + baseinfoid + '&isCopy=' + isCopy, dataType: 'json', async: false, success: function (json) {
        var json = {
            "ReturnObject": {
                "LineID": 0,
                "LineName": null,
                "LinePriority": 0,
                "LineStartID": 0,
                "LineFinishID": 0,
                "LineConditionType": null,
                "LineExpression": null,
                "LineExpressionCode": null,
                "ActID": 0,
                "ActName": null,
                "ActType": null,
                "ActDuration": 0,
                "ActApproverRoleType": null,
                "ActApprover": null,
                "ActApproverDesc": null,
                "XML": null,
                "Activitys": [{
                    "ActivityName": "上级审批",
                    "ActivityType": 1,
                    "Duration": 0,
                    "ApproverDesc": null,
                    "ToDoTime": 0,
                    "SkipTime": 0,
                    "Approver": "SysOriginatorID|1|-1",
                    "RoleExpression": "5",
                    "VersionID": "d4748bcb-bb91-4b56-bbe8-e1f710e9301a",
                    "SortIndex": 2,
                    "Config": null,
                    "ID": "b3a0086b-69ea-4ab4-ab5a-9cd8f17a6b9f",
                    "LastUpdateTime": "2016-08-01 10:19:15",
                    "CreateTime": "2016-08-01 10:19:15",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ActivityName": "采购审核",
                    "ActivityType": 1,
                    "Duration": 0,
                    "ApproverDesc": null,
                    "ToDoTime": 0,
                    "SkipTime": 0,
                    "Approver": "d949eda3-a58c-4128-80c5-7491afa0b390",
                    "RoleExpression": "2",
                    "VersionID": "d4748bcb-bb91-4b56-bbe8-e1f710e9301a",
                    "SortIndex": 3,
                    "Config": null,
                    "ID": "095bf449-9c95-4b32-9af0-e61cedde902d",
                    "LastUpdateTime": "2016-08-01 10:19:15",
                    "CreateTime": "2016-08-01 10:19:15",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ActivityName": "行政审核",
                    "ActivityType": 1,
                    "Duration": 0,
                    "ApproverDesc": null,
                    "ToDoTime": 0,
                    "SkipTime": 0,
                    "Approver": "0514b9a0-6648-412e-99fc-57410687ede2",
                    "RoleExpression": "2",
                    "VersionID": "d4748bcb-bb91-4b56-bbe8-e1f710e9301a",
                    "SortIndex": 4,
                    "Config": null,
                    "ID": "bbf6296f-c053-4844-b478-15c68271d607",
                    "LastUpdateTime": "2016-08-01 10:19:15",
                    "CreateTime": "2016-08-01 10:19:15",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }, {
                    "ActivityName": "采购审核",
                    "ActivityType": 1,
                    "Duration": 0,
                    "ApproverDesc": null,
                    "ToDoTime": 0,
                    "SkipTime": 0,
                    "Approver": "d949eda3-a58c-4128-80c5-7491afa0b390",
                    "RoleExpression": "2",
                    "VersionID": "d4748bcb-bb91-4b56-bbe8-e1f710e9301a",
                    "SortIndex": 6,
                    "Config": null,
                    "ID": "e1bc2d47-ed1c-4248-b5c6-6ef4435cdd2c",
                    "LastUpdateTime": "2016-08-01 10:19:15",
                    "CreateTime": "2016-08-01 10:19:15",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }],
                "Activitys_MultiRole": [],
                "Activitys_Relation": [{
                    "ActivityID": "b3a0086b-69ea-4ab4-ab5a-9cd8f17a6b9f",
                    "RoleType": 3,
                    "RoleValue": "SysOriginatorID",
                    "StartWith": 1,
                    "EndWith": -1,
                    "ID": "fd595eaa-89ee-4876-8e72-0b9aa3b85092",
                    "LastUpdateTime": "2016-08-01 10:19:15",
                    "CreateTime": "2016-08-01 10:19:15",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }],
                "Lines": [{
                    "LineName": "　",
                    "Priority": 2,
                    "StartActivity": "b3a0086b-69ea-4ab4-ab5a-9cd8f17a6b9f",
                    "FinishActivity": "095bf449-9c95-4b32-9af0-e61cedde902d",
                    "ConditionType": 0,
                    "Expression": "CaiGouLeiXing,=,'固定资产采购'",
                    "ExpressionCode": "[CaiGouLeiXing] = '固定资产采购'",
                    "ExpressionRule": null,
                    "Desc": "",
                    "VersionID": "d4748bcb-bb91-4b56-bbe8-e1f710e9301a",
                    "ID": "0abf6326-ac77-40b0-9e4c-f145cb8cd480",
                    "LastUpdateTime": "2016-08-01 10:19:15",
                    "CreateTime": "2016-08-01 10:19:15",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                }],
                "ProcBaseInfo": {
                    "ProcFullName": "采购申请单_T20150068",
                    "OrgStructure": 1,
                    "StartActID": "8f2dd0d2-1d25-4fb3-bc7e-ba5503bbf075",
                    "ActivityVersion": "d4748bcb-bb91-4b56-bbe8-e1f710e9301a",
                    "FormID": "749b12c8-6796-4ec6-b03a-b93c629249e4",
                    "GuidID": "a449a1cd-9587-484e-b03a-b7cfe7ec70e9",
                    "Version": 1,
                    "StartUrl": "/process/page/pro",
                    "ProcType": 0,
                    "Duration": 0,
                    "ProcDesignMetaData": "<mxGraphModel><root><mxCell id=\"0\" /><mxCell id=\"1\" parent=\"0\" /><StartActivity value=\" \" Version=\"\" id=\"8f2dd0d2-1d25-4fb3-bc7e-ba5503bbf075\"><mxCell style=\"shape=label;image=http://res.i8oa.com/workflow/default/images/design/graph/tools_start.png;rounded=true;fillColor=#93DF00;imageAlign=center;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"80\" y=\"99.5\" width=\"22\" height=\"22\" as=\"geometry\" /></mxCell></StartActivity><EndActivity value=\" \" Version=\"\" id=\"d5547526-15e1-4a89-9c7b-d3f79b0061b8\"><mxCell style=\"shape=label;image=http://res.i8oa.com/workflow/default/images/design/graph/tools_end.png;rounded=true;fillColor=#f97e76;imageAlign=center;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"889\" y=\"121.5\" width=\"22\" height=\"22\" as=\"geometry\" /></mxCell></EndActivity><Sequence_ReportActivity value=\"上级审批\" Version=\"2\" id=\"b3a0086b-69ea-4ab4-ab5a-9cd8f17a6b9f\"><mxCell style=\"shape=label;image=http://res.i8oa.com/workflow/default/images/design/graph/new_icon_1.png;gradientDirection=south;rounded=true;perimeterspacing=6;fontColor=#ffffff;fillColor=#2ca3da;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"134\" y=\"87\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_ReportActivity><mxCell id=\"68043e43-44f3-4f1b-9bf7-b0c54bf8452c\" value=\" \" parent=\"1\" source=\"8f2dd0d2-1d25-4fb3-bc7e-ba5503bbf075\" target=\"b3a0086b-69ea-4ab4-ab5a-9cd8f17a6b9f\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><mxCell id=\"0abf6326-ac77-40b0-9e4c-f145cb8cd480\" value=\" \" style=\"strokeColor\" parent=\"1\" source=\"b3a0086b-69ea-4ab4-ab5a-9cd8f17a6b9f\" target=\"095bf449-9c95-4b32-9af0-e61cedde902d\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><Sequence_RoleActivity value=\"行政审核\" Version=\"2\" id=\"bbf6296f-c053-4844-b478-15c68271d607\"><mxCell style=\"shape=label;image=http://res.i8oa.com/workflow/default/images/design/graph/new_icon_1.1.png;gradientDirection=south;rounded=true;fontColor=#ffffff;perimeterspacing=6;fillColor=#0bb59b;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"519\" y=\"40\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_RoleActivity><Sequence_RoleActivity value=\"采购审核\" Version=\"2\" id=\"e1bc2d47-ed1c-4248-b5c6-6ef4435cdd2c\"><mxCell style=\"shape=label;image=http://res.i8oa.com/workflow/default/images/design/graph/new_icon_1.1.png;gradientDirection=south;rounded=true;fontColor=#ffffff;perimeterspacing=6;fillColor=#0bb59b;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"319\" y=\"153.5\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_RoleActivity><mxCell id=\"2b43bce2-2247-41cb-9529-8d6d4b07916b\" value=\" \" style=\"strokeColor\" parent=\"1\" source=\"b3a0086b-69ea-4ab4-ab5a-9cd8f17a6b9f\" target=\"e1bc2d47-ed1c-4248-b5c6-6ef4435cdd2c\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><mxCell id=\"cebbc5b0-278c-4396-acb2-0b7e8b069553\" value=\" \" parent=\"1\" source=\"bbf6296f-c053-4844-b478-15c68271d607\" target=\"d5547526-15e1-4a89-9c7b-d3f79b0061b8\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell><mxCell id=\"729fc4a8-cca6-480d-b4c6-6e8b163a9c47\" value=\" \" parent=\"1\" source=\"e1bc2d47-ed1c-4248-b5c6-6ef4435cdd2c\" target=\"d5547526-15e1-4a89-9c7b-d3f79b0061b8\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\"><Array as=\"points\"><mxPoint x=\"779\" y=\"143.5\" /></Array></mxGeometry></mxCell><Sequence_RoleActivity value=\"采购审核\" Version=\"2\" id=\"095bf449-9c95-4b32-9af0-e61cedde902d\"><mxCell style=\"shape=label;image=http://res.i8oa.com/workflow/default/images/design/graph/new_icon_1.1.png;gradientDirection=south;rounded=true;fontColor=#ffffff;perimeterspacing=6;fillColor=#0bb59b;\" parent=\"1\" vertex=\"1\"><mxGeometry x=\"319\" y=\"40\" width=\"140\" height=\"47\" as=\"geometry\" /></mxCell></Sequence_RoleActivity><mxCell id=\"76803caf-6820-4c55-88f8-efd14438ff94\" value=\" \" parent=\"1\" source=\"095bf449-9c95-4b32-9af0-e61cedde902d\" target=\"bbf6296f-c053-4844-b478-15c68271d607\" edge=\"1\"><mxGeometry relative=\"1\" as=\"geometry\" /></mxCell></root></mxGraphModel>",
                    "ProcStepStatus": 0,
                    "ProcStatus": 2,
                    "CreateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "UpdateTime": "2016-08-15 17:01:16",
                    "LastUpdateUser": "35acfa7f-0533-4bba-99db-d2fdd6d4c5d4",
                    "TemplateCode": "T20150068",
                    "IsSkip": true,
                    "Config": {"isRequireAttachment": false, "isUsePrintSet": false, "printFields": ""},
                    "FieldList": null,
                    "ID": "cf48aefd-e232-401f-8a8f-21b6fc82e91a",
                    "LastUpdateTime": "2016-08-15 17:01:16",
                    "CreateTime": "2016-08-01 10:19:15",
                    "AccountID": "3a1b83cb-cca7-41c1-852c-e5fceb78df4e"
                },
                "ID": "fd68ab2a-14df-464d-b4db-76ed8689a5b7",
                "LastUpdateTime": "2016-08-22 11:32:22",
                "CreateTime": "2016-08-22 11:32:22",
                "AccountID": "00000000-0000-0000-0000-000000000000"
            }, "Result": true, "Code": 0, "Description": null
        };
        if (json.Result) {
            var resultData = json.ReturnObject;
            var ActivityList = resultData.Activitys; //获取Activity集合
            var Activity_MultiRoleList = resultData.Activitys_MultiRole; //获取Activitys_MultiRole循环审批集合
            var Activitys_RelationList = resultData.Activitys_Relation; //获取Activitys_Relation循环审批集合
            var LineList = resultData.Lines; //获取Line集合
            var ProcBaseInfo = resultData.ProcBaseInfo; //获取ProcBaseInfo,流程基本信息
            //填充数据.根据类型存在到不同的数组里面
            if (ActivityList.length > 0) {
                for (var i = 0; i < ActivityList.length; i++) {
                    var obj = new Object();
                    obj.ID = ActivityList[i].ID;
                    obj.ActivityName = ActivityList[i].ActivityName;
                    obj.ActivityType = ActivityList[i].ActivityType;
                    obj.Duration = ActivityList[i].Duration;
                    obj.ToDoTime = ActivityList[i].ToDoTime;
                    obj.SkipTime = ActivityList[i].SkipTime;
                    obj.Config = ActivityList[i].Config;
                    switch (ActivityList[i].ActivityType) {
                        case 1://循环审批
                            if (Activitys_RelationList != null) {//循环审批角色
                                var isExit = false;
                                for (var j = 0; j < Activitys_RelationList.length; j++) {
                                    if (Activitys_RelationList[j].ActivityID == ActivityList[i].ID) {
                                        isExit = true;
                                        obj.RoleExpression = Activitys_RelationList[j].RoleType;
                                        obj.Approver = Activitys_RelationList[j].RoleValue + "|";
                                        obj.Approver += Activitys_RelationList[j].StartWith + "|";
                                        obj.Approver += Activitys_RelationList[j].EndWith;
                                    }
                                }
                            }
                            if (!isExit) {
                                obj.RoleExpression = ActivityList[i].RoleExpression; //审批类型
                                obj.Approver = ActivityList[i].Approver;
                            }
                            break;
                        case 2://多角色审批
                            var roleTypeList = "";
                            var roleTypeValueList = "";
                            if (Activity_MultiRoleList != null) {
                                for (var j = 0; j < Activity_MultiRoleList.length; j++) {
                                    if (Activity_MultiRoleList[j].ActivityID == ActivityList[i].ID) {
                                        roleTypeList += Activity_MultiRoleList[j].RoleType + "|";
                                        roleTypeValueList += Activity_MultiRoleList[j].RoleValue + "|";
                                    }
                                }
                            }
                            if (roleTypeList != "" && roleTypeValueList != "") {
                                roleTypeList = roleTypeList.substring(0, roleTypeList.length - 1);
                                roleTypeValueList = roleTypeValueList.substring(0, roleTypeValueList.length - 1);
                            }
                            else {
                                roleTypeList = ActivityList[i].RoleExpression; //审批类型
                                roleTypeValueList = ActivityList[i].Approver;
                            }
                            obj.RoleExpression = roleTypeList; //审批类型
                            obj.Approver = roleTypeValueList;
                            break;
                        default:
                            obj.RoleExpression = ActivityList[i].RoleExpression; //审批类型
                            obj.Approver = ActivityList[i].Approver;
                            break;

                    }
                    obj.ApproverDesc = ActivityList[i].ApproverDesc;
                    act_common.wf_ProcActityArray.push(obj);
                }
            }
            //填充数据.连接
            if (LineList.length > 0) {
                for (var i = 0; i < LineList.length; i++) {
                    var objLine = new Object();
                    objLine.ID = LineList[i].ID;
                    objLine.LineName = LineList[i].LineName == '' ? "　" : LineList[i].LineName;
                    objLine.Priority = LineList[i].Priority;
                    objLine.StartActivity = LineList[i].StartActivity; //开始环节ID
                    objLine.FinishActivity = LineList[i].FinishActivity; //结束环节ID
                    objLine.ConditionType = LineList[i].ConditionType;
                    objLine.Expression = LineList[i].Expression;
                    objLine.ExpressionCode = LineList[i].ExpressionCode;
                    objLine.ExpressionRule = LineList[i].ExpressionRule;
                    act_common.wf_ArrayLineArray.push(objLine);

                }
            }
            parent.copyBaseInfoID = '';
        }
        //}
        //}

        //);
    }

    exports.getDesignerData = getDesignerData;
//获取数据
})
;