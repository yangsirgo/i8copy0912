
define(function (require) {

    var control_prototype = {
        ctype: 'VacationSummaryComponent',
        ipos: '0px -689px',
        name: '请假组件(假期应用)',
        propertyHtml: function () {
            return require('../template/property-vacationSummaryComponent.tpl');
        },
        opened: function () {
            $("#ck_procNode").hide();
            $("label[for='ck_procNode']").hide();
        },
        updateBoxShowed: function () {
            $("#ck_procNode").hide();
           $("label[for='ck_procNode']").hide();
        },
        filled: function (ctrl) {
            //var config = $.parseJSON($.trim($("pre", ctrl).html()));
            //var ksnSelectUser = require('/resource/default/common/js/workflow/formdesigner/plugin/app_wfform_vacation_plugin.js');
           // var count = $("#fd_designArea div.ctrlbox[ctype='VacationSummaryComponent']").length;
            var count = $('.control-vacation-detail').length;
            var _$userInfoComponent = _$userInfoComponent = $('.user_info_sel').parents('.ctrlbox');
            if(_$userInfoComponent.length>0){
                var _userInfoConfigText = _$userInfoComponent.find('pre').text();
                var _userInfoConfig = {};
                try{
                    _userInfoConfig =  $.parseJSON(_userInfoConfigText);
                }catch(e){
                    _userInfoConfig ={};
                }
                if(!!_userInfoConfig.IsDelegate){
                    alert('请假和销假无法代理发起，请先去掉员工信息中的代理设置！');
                    ctrl.remove();
                }
            }

            if (count > 0) {
                alert('该表单已使用了假期组件!');
                ctrl.remove();
            } else {
                var config = $.parseJSON($.trim($("pre", ctrl).text()));
                var VCTMode=1;
                var Tags=(config.FieldConfig.Tags||[]);
                if(Tags.length>0)
                {
                    for(var t=0;t<Tags.length;t++){
                        if(Tags[t].key=="Mode")
                        {
                            VCTMode =parseInt(Tags[t].value) ;
                        }
                    }

                }

                var htmlContent = $.fn.VacationSummary.GetInitHtml(this.mustinput,VCTMode,{'tagName':config.FieldID});
                $(".ctrltxt", ctrl).append(htmlContent);
            }
        },
        inputs: function () {
            this.VCTMode = $("#vct_mode").val();
        },
        ckInputs: function () { return true; },
        cformat: function () {
            var ctrl_tpl = require('../template/control-vacationSummaryComponent.tpl');
            var render = template(ctrl_tpl);
            var config = {
                ctype: arguments[0],
                FieldType: 20,//数据应用假期组件
                FieldID: this.fieldID(),
                FieldName: this.title,
                DefaultValue: '',
                DataType: 3,
                IsProcDataField: this.isparam,
                IsBindData: false,
                IsRequire: this.mustinput,
                IsPrint: this.isPrint,
                DataSource: '',
                FieldConfig: {
                 Tags:[{key:'controlVersion',value:'2'}],
                    "GridConfig" : [
                        {
                            "colName" : "vacationType",
                            "colText" : "请假类型",
                            "colType" : "selectoption",
                            "colWidth" : "auto",
                            "mustInput" : true,
                            "iscolsum" : false,
                            "isparam" : true,
                            "iscolchinese" : false,
                            "formula" : null,
                            "isSumFormula" : false,
                            "valuetype" : "unlimited",
                            "dataSource" : "",
                            "ControlType" : 3,
                            "DataType" : 0
                        },
                        {
                            "colName" : "beginDate",
                            "colText" : "开始时间",
                            "colType" : "DatePicker",
                            "colWidth" : "auto",
                            "mustInput" : true,
                            "iscolsum" : false,
                            "isparam" : false,
                            "iscolchinese" : false,
                            "formula" : null,
                            "isSumFormula" : false,
                            "valuetype" : "unlimited",
                            "dataSource" : "",
                            "ControlType" : 8,
                            "DataType" : 5
                        },
                        {
                            "colName" : "endDate",
                            "colText" : "结束时间",
                            "colType" : "DatePicker",
                            "colWidth" : "auto",
                            "mustInput" : true,
                            "iscolsum" : false,
                            "isparam" : false,
                            "iscolchinese" : false,
                            "formula" : null,
                            "isSumFormula" : false,
                            "valuetype" : "unlimited",
                            "dataSource" : "",
                            "ControlType" : 8,
                            "DataType" : 5
                        },
                        {
                            "colName" : "amount",
                            "colText" : "可用数量",
                            "colType" : "simpleTextBox",
                            "colWidth" : "auto",
                            "mustInput" : false,
                            "iscolsum" : false,
                            "isparam" : false,
                            "iscolchinese" : false,
                            "formula" : null,
                            "isSumFormula" : false,
                            "valuetype" : "number",
                            "dataSource" : "",
                            "ControlType" : 2,
                            "DataType" : 1
                        },
                        {
                            "colName" : "col_4_applytime",
                            "colText" : "申请数量",
                            "colType" : "simpleTextBox",
                            "colWidth" : "auto",
                            "mustInput" : true,
                            "iscolsum" : false,
                            "isparam" : false,
                            "iscolchinese" : false,
                            "formula" : null,
                            "isSumFormula" : false,
                            "valuetype" : "number",
                            "dataSource" : "",
                            "ControlType" : 0,
                            "DataType" : 1
                        },
                        {
                            "colName" : "remark",
                            "colText" : "备注",
                            "colType" : "simpleTextBox",
                            "colWidth" : "auto",
                            "mustInput" : false,
                            "iscolsum" : false,
                            "isparam" : false,
                            "iscolchinese" : false,
                            "formula" : null,
                            "isSumFormula" : false,
                            "valuetype" : "unlimited",
                            "dataSource" : "",
                            "ControlType" : 1,
                            "DataType" : 0
                        },
                        {
                            "colName" : "available",
                            "colText" : "可用",
                            "colType" : "simpleTextBox",
                            "colWidth" : "auto",
                            "mustInput" : false,
                            "iscolsum" : false,
                            "isparam" : false,
                            "iscolchinese" : false,
                            "formula" : null,
                            "isSumFormula" : false,
                            "valuetype" : "unlimited",
                            "dataSource" : "",
                            "ControlType" : 2,
                            "DataType" : 0
                        }
                        ]

                },

        SortIndex: 0,
        isvisible: (this.mustinput ? "visible" : "hidden")
    };
//            config.ProcDataFieldConfig =  [{
//                ctype: 'selectoption',
//                FieldType: 3,
//                FieldID: this.fieldID()+'_vacationtype',
//                FieldName:"假期类型",
//                DataType: 0,//DataType为1，表示该值类型为整型数字类型
//                IsProcDataField: true,
//                IsBindData: false,
//                IsRequire: false,
//                DataSource: '',
//                ParentField:this.fieldID(),
//                // FieldConfig: '{parentField:"'+_tableName+'",calcField:"'+_colName+'",calcIndex:"'+_colIndex+'"}',
//                FieldConfig: {"parentField":this.fieldID(),"calcField": "vacationType" ,"calcIndex":"0"},
//                SortIndex: 0,
//                isvisible: "hidden"
//            }];

        config.str_config = $.JSONString(config);
            return render(config);
        },
        getUpdateBox: function (_ctype, _ctrlobj, builder) {
            var updateBox = $((new builder(_ctype)).toBoxString());
            var _original_config = $.parseJSON($.trim($("pre", _ctrlobj).text()));
            if (typeof _original_config == 'object') {
                $("#txt_ctrlTitleName", updateBox).val(_original_config.FieldName);
                $("#ck_procNode", updateBox).prop({ checked: _original_config.IsProcDataField });
                $("#ck_mustchecked", updateBox).prop({ checked: _original_config.IsRequire });

                var VCTMode=1;
                var controlVersion = 1;
                var Tags=(_original_config.FieldConfig.Tags||[]);
                if(Tags.length>0)
                {
                    for(var t=0;t<Tags.length;t++){
                        //if(Tags[t].key=="Mode")
                        //{
                        //    VCTMode =parseInt(Tags[t].value);
                        //    // controlVersion = parseInt(Tags[t].controlVersion);
                        //}
                        if(Tags[t].key=='controlVersion'){
                            controlVersion = parseInt(Tags[t].controlVersion);
                        }
                    }

                }
                //  $("#vct_mode option[value='"+VCTMode+"']", updateBox).prop({ selected: true });
            }
            return updateBox;
        }
    };
    return control_prototype;
})
//define(function (require) {
//
//    var control_prototype = {
//        ctype: 'VacationSummaryComponent',
//        ipos: '0px -326px',
//        name: '假期预算组件(数据应用)',
//        propertyHtml: function () {
//            return require('../template/property-vacationSummaryComponent.tpl');
//        },
//        opened: function () {
//            $("#ck_procNode").hide();
//            $("label[for='ck_procNode']").hide();
//        },
//        updateBoxShowed: function () {
//            $("#ck_procNode").hide();
//            $("label[for='ck_procNode']").hide();
//        },
//        filled: function (ctrl) {
//            //var config = $.parseJSON($.trim($("pre", ctrl).html()));
//            //var ksnSelectUser = require('/resource/default/common/js/workflow/formdesigner/plugin/app_wfform_vacation_plugin.js');
//            var count = $("#fd_designArea div.ctrlbox[ctype='VacationSummaryComponent']").length;
//            if (count > 1) {
//                alert('该表单已使用了假期预算组件!');
//                ctrl.remove();
//            } else {
//                var config = $.parseJSON($.trim($("pre", ctrl).html()));
//                var VCTMode=1;
//                var Tags=(config.FieldConfig.Tags||[]);
//                if(Tags.length>0)
//                {
//                    for(var t=0;t<Tags.length;t++){
//                        if(Tags[t].key=="Mode")
//                        {
//                            VCTMode =parseInt(Tags[t].value) ;
//                        }
//                    }
//
//                }
//
//                var htmlContent = $.fn.VacationSummary.GetInitHtml(this.mustinput,VCTMode,{'tagName':config.FieldID});
//                $(".ctrltxt", ctrl).append(htmlContent);
//            }
//        },
//        inputs: function () {
//            this.VCTMode = $("#vct_mode").val();
//        },
//        ckInputs: function () { return true; },
//        cformat: function () {
//            var ctrl_tpl = require('../template/control-vacationSummaryComponent.tpl');
//            var render = template(ctrl_tpl);
//            var config = {
//                ctype: arguments[0],
//                FieldType: 20,//数据应用假期组件
//                FieldID: this.fieldID(),
//                FieldName: this.title,
//                DefaultValue: '',
//                DataType: 3,
//                IsProcDataField: this.isparam,
//                IsBindData: false,
//                IsRequire: this.mustinput,
//                DataSource: '',
//                FieldConfig: {
//                    Tags:[{key:'Mode',value:this.VCTMode},{key:'controlVersion',value:'2'}]
//                },
//                SortIndex: 0,
//                isvisible: (this.mustinput ? "visible" : "hidden")
//            };
//            config.str_config = $.JSONString(config);
//            return render(config);
//        },
//        getUpdateBox: function (_ctype, _ctrlobj, builder) {
//            var updateBox = $((new builder(_ctype)).toBoxString());
//            var _original_config = $.parseJSON($.trim($("pre", _ctrlobj).text()));
//            if (typeof _original_config == 'object') {
//                $("#txt_ctrlTitleName", updateBox).val(_original_config.FieldName);
//                $("#ck_procNode", updateBox).prop({ checked: _original_config.IsProcDataField });
//                $("#ck_mustchecked", updateBox).prop({ checked: _original_config.IsRequire });
//
//                var VCTMode=1;
//                var controlVersion = 1;
//                var Tags=(_original_config.FieldConfig.Tags||[]);
//                if(Tags.length>0)
//                {
//                    for(var t=0;t<Tags.length;t++){
//                        if(Tags[t].key=="Mode")
//                        {
//                            VCTMode =parseInt(Tags[t].value);
//                           // controlVersion = parseInt(Tags[t].controlVersion);
//                        }
//                        if(Tags[t].key=='controlVersion'){
//                            controlVersion = parseInt(Tags[t].controlVersion);
//                        }
//                    }
//
//                }
//                $("#vct_mode option[value='"+VCTMode+"']", updateBox).prop({ selected: true });
//            }
//            return updateBox;
//        }
//    };
//    return control_prototype;
//})