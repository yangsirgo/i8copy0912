define("./js/template/control-selector.tpl", [], '<div class="ctrlbox" ctype="{ctype}" rowtype="1" ctrl-name="{FieldID}">\n	<div class="ctrltitle">\n		<span class="span_mustinputtag" style="visibility:{isvisible}">*</span>\n		<span class="ctitletxt">{FieldName}</span>：\n	</div>\n	<div class="ctrltxt">\n    <input type="text" class="wfd_ksn_selector" id="{FieldConfig.selectorID}" stype="{FieldConfig.sType}" value=""/>\n	</div>\n	<pre>{str_config}</pre>\n</div>\n\n');