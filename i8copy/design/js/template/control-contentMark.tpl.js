define("./js/template/control-contentMark.tpl", [], '<div class="ctrlbox" ctype="{ctype}" rowtype="1" ctrl-name="{FieldID}">\n  <div class="ctrltxt">  \n    <p class="content-mark" sel_index="{FieldConfig.selIndex}" style="padding:4px;color:{FieldConfig.FontColor};font-size:{FieldConfig.FontSize};">{=FieldConfig.Content}</p>\n  </div>\n  <pre>{str_config}</pre>\n</div>\n');