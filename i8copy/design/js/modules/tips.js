define( ["./public", "../common/socket_client", "../common/i8ui", "../common/util", "../common/rootbtn"], function (a) {
    function b() {
        var a = navigator.userAgent.toLocaleLowerCase();
        if (!(a.indexOf("firefox") > -1 || a.indexOf("chrome") > -1 || a.indexOf("rv:11.0") > -1))if (a.indexOf("msie") > -1) {
            var b = a.match(/msie [0-9]\.[0-9]/);
            if (b && b.length > 0) {
                var c = parseInt(b[0].substring(5, 6));
                9 > c && $("#js_time_tps").html('<span class="red">您使用的浏览器不兼容i8，为了更好的体验，请使用谷歌、火狐，及IE9.0以上版本浏览器</span>')
            }
        } else $("#js_time_tps").html('<span class="red">您使用的浏览器不兼容i8，为了更好的体验，请使用谷歌、火狐，及IE9.0以上版本浏览器</span>')
    }

    function c() {
        k.getTipstype(function (a) {
            l = a, $.ajax({
                url: i8_session.ajaxHost + "webajax/modules/tips",
                type: "get",
                dataType: "json",
                cache: !1,
                success: function (a) {
                    a.Result ? e(a.ReturnObject || []) : n.error(a.Description)
                },
                error: function () {
                }
            })
        })
    }

    function d(a) {
        a = a || [];
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (c.NoticeID == s) {
                window.location.href.indexOf("process/task") < 0 && (c.TodoNum > 0 ? $("#js_work_tps").html(c.TodoNum > 99 ? "N" : c.TodoNum).css("display", "block") : $("#js_work_tps").html("0").hide());
                break
            }
        }
    }

    function e(a) {
        a || (a = []), r = a;
        for (var b = o.getCookies("tipscookie") || "", c = b.split(";"), d = "", e = !1, f = 0, g = 0, h = 0; h < a.length; h++) {
            var i = a[h];
            if ("f9620b58-06e9-438b-b61e-0005d7fdaa42" != i.NoticeID)if ("57d99d89-caab-482a-a0e9-a0a803eed3ba" != i.NoticeID) {
                if (i.TipNum) {
                    var j = l[i.NoticeID], k = "";
                    if (k = "workflow" == i.Type ? i8_session.wfbaseHost : i8_session.baseHost, d += '<a class="tips-msg" href="' + k + j.Url + '" noticeid="' + i.NoticeID + '"><span class="my-tips-num">' + i.TipNum + "</span>" + j.Title + "</a>", b.indexOf(i.NoticeID) < 0)e = !0; else for (var m = 0; m < c.length; m++) {
                        var n = c[m].split("|")[0];
                        if (n == i.NoticeID) {
                            var s = c[m].split("|")[1];
                            s != i.TipNum && (e = !0)
                        }
                    }
                }
            } else f = i.TodoNum; else g = i.TodoNum
        }
        f > 0 ? $("#js_notice_tps").html(f > 99 ? "N" : f).css("display", "block") : $("#js_notice_tps").html("0").hide(), g > 0 ? $("#js_report_tps").html(g > 99 ? "N" : g).css("display", "block") : $("#js_report_tps").html("0").hide(), "" != d ? (q.html(d).show(), $("li.my-message").addClass("news")) : ($("li.my-message").removeClass("news"), q.html(d).hide(), p.hide()), e ? (p.show(), o.setCookies("tipscookie", "")) : p.hide()
    }

    function f(a) {
        var b = i8_session.aid;
        switch (a.type) {
            case 0:
                a.entity = _.where(a.entity, {aid: b});
                for (var c = 0; c < a.entity.length; c++) {
                    for (var f = !0, h = a.entity[c], i = 0; i < r.length; i++) {
                        var j = r[i];
                        h.NoticeID == j.NoticeID && (r[i] = h, f = !1)
                    }
                    f && r.push(h)
                }
                d(a.entity), e(r);
                break;
            case 2:
                window.realTimeKankan && a.entity.aid == b && window.realTimeKankan(a.entity);
                break;
            case 3:
                i8_session.sid != a.entity.sid && (window.location.href = "/login?id=" + a.entity.ip);
                break;
            case 5:
                try {
                    downloadCbk(a)
                } catch (c) {
                }
                break;
            case 10:
                a.entity.aid == b && z.showScheduleHtml(a.entity);
                break;
            case 31:
                g();
                break;
            case 30:
                alert("您的帐号已被管理员禁用，3秒后将退出！"), setTimeout(function () {
                    window.location.href = i8_session.baseHost + "logout"
                }, 3e3)
        }
    }

    function g() {
        $.get(i8_session.ajaxHost + "webajax/appcom/getNewContext", {}, function (a) {
            a.Result && (i8_session = a.ReturnObject)
        }, "json")
    }

    function h() {
        $.ajax({
            url: i8_session.ajaxHost + "webajax/modules/getnoticelast",
            dataType: "json",
            type: "get",
            data: {_: _.now()},
            success: function (a) {
                if (a.result) {
                    var b = new Date(parseInt(a.data.EndTime.substring(6, 19))), c = new Date;
                    if (c >= b)return;
                    var d = '<div id="js_notice_last" class="app-head-notice tcenter">' + a.data.NoticeContent + '<span class="my-tps-close"></span></div>';
                    $(document.body).append(d), $("#js_notice_last").on("click", ".my-tps-close", function () {
                        $("#js_notice_last").remove(), o.setCookies("notice_last", "true", 1)
                    })
                }
            }
        })
    }

    function i() {
        i8_session.expire = i8_session.expire.replace(/-/g, "/");
        var a = new Date(i8_session.expire).valueOf(), b = new Date, c = b.valueOf(), d = [], e = parseInt((a - c) / 864e5);
        if (c >= a) {
            var f = "";
            i8_session.multiact && (f = '<span class="lt m-r10">跳转至</span><div class="lt app-cp-logo rel"><a id="js_show_communitys1" class="cmt-names" style="" title="' + i8_session.aname + '">' + i8_session.aname + '</a><span id="js_show_down_jt" class="spbg1 sprite-115" style="display: inline; top: 7px; left: 298px;"></span><div id="js_community_list1" class="hd-communitys" style="border:1px solid #cbcbca; bottom: 61px; top: auto; box-shadow: none; left:0.5px; border-radius: 0px; width: 320px;"></div></div>');
            var g = '<div class="time-over"><span class="time-over-bg1 lt"></span><div class="time-over-cont cl000"><a href="/logout" style="position: absolute; top: 20px; right: 20px;">退出登录</a>{if version == "senior"}<h2>服务到期提醒</h2><h3 class="bold m-b25">尊敬的用户，您在i8小时上的付费使用时间已经结束，请联系我们客服人员，及时续费，继续享受服务：{else}<h2>试用到期提醒</h2><h3 class="bold m-b25">尊敬的用户，您在i8小时上的试用时间已经结束，请联系我们客服人员，升级为付费版，享受更多服务：{/if}</h3><ul class="time-over-ul"><li><span class="bold">企业管家</span>——流程数据的深度分析，假期、预算、考勤通通搞定</li><li><span class="bold">工作流</span>——落实管理制度，永久保存流程数据，自由DIY流程设计</li><li><span class="bold">社区协作</span>——制定计划、完成任务、总结经验、分享idea</li><li><span class="bold">移动手机</span>——社区、工作流、数据带在身上，外出再不能影响您的工作</li><li><a class="ft14 bold" style="line-height: 36px;">服务热线：400-877-1181</a></li></ul>' + f + '</div></div><div class="ct-msk"></div>', h = template(g);
            if ($(document.body).append(h(i8_session.platform)), i8_session.multiact) {
                var i = $("#js_show_communitys1,#js_show_down_jt"), k = $("#js_community_list1");
                i.show(), j(i, k)
            }
            d.push("senior" != i8_session.platform.version ? '<span class="red">试用已到期，请联系i8客服升级为付费版，服务热线：400-877-1181</span>' : '<span class="red">服务已到期，请联系i8客服及时续费，服务热线：400-877-1181</span>')
        } else 30 >= e && e >= 0 && d.push("senior" != i8_session.platform.version ? '<span class="red">距离试用截止日期还有<span class="bold">' + e + "</span> 天，届时服务将会自动停止，升级为付费版，享受更多服务。服务热线：400-877-1181</span>" : '<span class="red">距离服务到期 还有 <span class="bold">' + e + "</span> 天，请联系i8客服及时续费，服务热线：400-877-1181</span>");
        $("#js_time_tps").html(d.join(""))
    }

    function j(a, b) {
        function c() {
            $.ajax({
                url: i8_session.ajaxHost + "webajax/login/getActList",
                type: "post",
                dataType: "json",
                data: {_: _.now()},
                success: function (a) {
                    if (a.Result) {
                        var c = "";
                        e = a.ReturnObject;
                        for (var d = 0; d < e.length; d++) {
                            var f = e[d], g = i8_session.aid == f.aid ? "current" : "", h = '<em title="设为默认社区" class="spbg1 sprite-117"></em>';
                            f.isdef && (h = '<em title="默认社区" class="spbg1 sprite-116"></em>'), c += '<a class="' + g + '" domain="' + f.domain + '"><span>' + f.aname + '</span><i class="spbg1 sprite-87"></i>' + h + "</a>"
                        }
                        b.html(c)
                    } else n.error(a.Description)
                },
                error: function () {
                    n.error("操作失败")
                }
            })
        }

        function d(a, b) {
            $.post(i8_session.ajaxHost + "webajax/usrdata/createauth", {jdata: a}, function (a) {
                a.Result && b && b(a.ReturnObject)
            }, "json")
        }

        var e = [];
        a.click(function () {
            $(this).attr("class").indexOf("up") >= 0 ? $(this).removeClass("up") : $(this).addClass("up"), b.toggle(), b.find("a").length <= 0 && c()
        }).show(), b.on("click", "a", function () {
            if (!$(this).hasClass("current")) {
                var a = $(this).attr("domain"), b = _.findWhere(e, {domain: a});
                if (b.dctoken) {
                    var c = n.showbox({
                        title: "进入该社区需要短信验证码",
                        cont: '<div class="valMsg-box p-t15">' + (0 == b.mobile.length ? '<div class="p10 oflow p-b10"><div class="l-hh36 fw_left"><span>*</span>绑定手机号</div><div class="p-lr-15 fw_left"><input type="text" class="w-240-h33" style="height:30px" id="txt_phoneNum"/></div></div>' : "") + '<div class="p10 oflow p-b10"><div class="l-hh36 fw_left"><span style="color:red">*</span>短信验证码</div><div class="p-lr-15 fw_left"><input type="text" class="w-128-h33" style="height:30px" id="txt_msgCode"/></div><div class="fw_left"><button class="blue-button rt" id="btn_getCode">获取验证码</button></div></div><div class="p10 m-b10 tright"><button class="blue-button" id="btn_submitmsg">确定</button>　<button class="gray-button" id="btn_cancelmsg">取消</button></div></div>'
                    });
                    $("#btn_getCode").click(function () {
                        if (!$(this).hasClass("get-disabled")) {
                            var a = $.trim($("#txt_phoneNum").val());
                            if (0 == b.mobile.length && 0 == a.length)return void n.error("您还未绑定手机号!");
                            var c = $(this), d = 59;
                            c.css({"background-color": "#bfbfbf"}).addClass("get-disabled").text("59秒后重发");
                            var e = setInterval(function () {
                                d > 0 ? (d--, c.text(d + "秒后重发")) : (d = 59, clearInterval(e), c.text("获取验证码").removeAttr("style").removeClass("get-disabled"))
                            }, 1e3);
                            b.msgCode && $.post(i8_session.ajaxHost + "webajax/appcom/getValidateCodeMsg", {
                                code: b.msgCode,
                                aid: b.aid,
                                tel: a
                            }, function (a) {
                                a.Result ? n.simpleWrite("验证码已发送成功！", c) : n.error(result.Description)
                            }, "json")
                        }
                    }), $("#btn_submitmsg").click(function () {
                        var a = b.mobile, c = $.trim($("#txt_msgCode").val());
                        return 0 != b.mobile.length || (a = $.trim($("#txt_phoneNum").val()), new RegExp("1[3-9][0-9]{9}", "g").exec(a)) ? 0 == c.length ? void n.error("请输入验手机证码！") : void $.post(i8_session.ajaxHost + "webajax/appcom/validateCode", {
                            bindTel: 0 == b.mobile.length,
                            phoneNo: a,
                            vcode: c,
                            dm: b.domain,
                            aid: b.aid
                        }, function (a) {
                            a.Result ? d(b, function (a) {
                                window.location.href = window.location.protocol + a.openurl
                            }) : (n.error(a.Description), $("#btn_getCode").text("获取验证码").removeAttr("style").removeClass("get-disabled"))
                        }, "json") : void n.error("请绑定正确的手机号码！")
                    }), $("#btn_cancelmsg").click(function () {
                        c.close()
                    }), $("#txt_phoneNum").blur(function () {
                        var a = $.trim($(this).val());
                        return new RegExp("1[3-9][0-9]{9}", "g").exec(a) ? void $.post(i8_session.ajaxHost + "/webajax/login/isJoined", {jdata: {passport: a}}, function (a) {
                            a.Result || n.error("手机号无效，可能已被占用！")
                        }, "json") : (n.error("请绑定正确的手机号码！"), void $(this).select())
                    })
                } else {
                    var f = $(this).index(), g = e[f];
                    d(g, function (a) {
                        var b = window.location.protocol + a.openurl;
                        window.location.href = b
                    })
                }
            }
        }), b.on("click", ".sprite-117", function () {
            var a = $(this).parent().index(), b = e[a];
            return $.ajax({
                url: "/webajax/login/setDefaultAccount",
                type: "post",
                dataType: "json",
                data: {jdata: {acid: b.aid}, _: _.now()},
                success: function (a) {
                    a.Result ? c() : n.error(a.Description)
                },
                error: function () {
                    n.error("操作失败")
                }
            }), !1
        })
    }

    var k = a("./public"), l = null, m = a("../common/socket_client"), n = a("../common/i8ui"), o = a("../common/util"), p = $("#js_tips_fixed"), q = $("div.tips-list-linka"), r = [], s = "b4510a44-2f13-485a-a720-0c32adc06f70", t = window.location.host, u = t.substr(t.split(".")[0].length + 1), v = window.location.hostname.replace(/^\w{0,}\./, "");
    document.domain = u, template.helper("$substrdept", function (a) {
        var b = (a || "").split("/"), c = b.length;
        b = b.slice(-2);
        var d = b.join("/");
        return c > 2 && (d = "../" + d), d
    });
    var w = function () {
        $("body").append('<iframe id="imiframe" style="display: none" src="' + window.location.protocol + "//im." + v + '/store"></iframe>')
    };
    a("../common/rootbtn"), window.updatetips = function (a) {
        $.ajax({
            url: i8_session.ajaxHost + "webajax/modules/updatetips",
            type: "get",
            dataType: "json",
            cache: !1,
            data: {noticeid: a},
            success: function (a) {
                a.Result ? c() : n.error(a.Description)
            },
            error: function () {
            }
        })
    };
    var x = function (a) {
        $.ajax({
            url: i8_session.ajaxHost + "platform/getimtoken",
            type: "get",
            dataType: "json",
            cache: !1,
            success: function (b) {
                if (200 == b.code) {
                    var c = function () {
                        w();
                        var c = (window.location.hostname.replace(/^\w{0,}\./, ""), !0), d = document.getElementById("imiframe");
                        d.onload = function () {
                            var e = d.contentWindow.store;
                            1 == b.imConfig.isfirstLoad && e.set("sessions", "");
                            var f = new NIM({
                                debug: !1,
                                appKey: b.imConfig.appKey,
                                account: i8_session.uid.replace(/-/g, ""),
                                token: b.ReturnObject,
                                db: !1,
                                autoMarkRead: !1,
                                onsessions: function (c) {
                                    var d = e.get("sessions");
                                    d ? (_.each(c, function (a) {
                                        if (a.unread > 0) {
                                            var b = _.find(d, function (b) {
                                                return b.id == a.id
                                            });
                                            b ? (b.unread = a.unread, b.updateTime = a.updateTime) : d.push(a)
                                        }
                                    }), d = _.filter(d, function (a) {
                                        return a.to != b.imConfig.i8WorkRemind
                                    }), e.set("sessions", d)) : (d = _.filter(c, function (a) {
                                        return a.to != b.imConfig.i8WorkRemind
                                    }), e.set("sessions", d));
                                    var f = 0;
                                    _.each(d, function (a) {
                                        a.unread && (f += a.unread)
                                    }), a(f ? 1 : -1)
                                },
                                onupdatesession: function (c) {
                                    if (c && c.lastMsg && "custom" == c.lastMsg.type) {
                                        var d = JSON.parse(c.lastMsg.content);
                                        if ("-1" == d.type)return
                                    }
                                    if (c.to && c.to != b.imConfig.i8WorkRemind) {
                                        var g = e.get("sessions"), h = 0, i = _.find(g, function (a) {
                                            return a.id == c.id
                                        });
                                        i ? (i.unread = c.unread, i.updateTime = c.updateTime) : g.push(c), g = f.mergeSessions([c], g), e.set("sessions", g), _.each(g, function (a) {
                                            a.unread && (h += a.unread)
                                        }), a(h ? 1 : -1)
                                    }
                                },
                                onmsg: function (a) {
                                    if (a.from != i8_session.uid.replace(/-/g, ""))"custom" != a.type; else if (a.from == b.imConfig.i8WorkRemind); else if ("custom" == a.type) {
                                        var c = JSON.parse(a.content);
                                        if ("-1" == c.type) {
                                            var d = e.get("sessions"), g = _.find(d, function (b) {
                                                return b.id == a.sessionId
                                            });
                                            g && (g.unread = 0), f.resetSessionUnread(a.sessionId)
                                        }
                                    }
                                },
                                onsysmsg: function () {
                                },
                                onloginportschange: function (b) {
                                    if (c)return void(c = !1);
                                    for (var d = 0; d < b.length; d++)if ("Web" != b[d].type && b[d].online) {
                                        for (var f = e.get("sessions"), g = 0; g < f.length; g++)f[g].unread = 0;
                                        e.set("sessions", f), a(-1);
                                        break
                                    }
                                }
                            })
                        }
                    };
                    setTimeout(c, 300)
                }
            },
            error: function () {
            }
        })
    };
    if (!window.disabledIM) {
        var y = '<div class="tips-content">                    <div class="schedule-tips">                    </div>                     <div class="im-tips">                         <a target="_blank" href="{protocol}//im.' + v + '"></a>                     </div>                 </div>';
        $("body").append(template(y)({account: i8_session.aid, protocol: window.location.protocol}))
    }
    var z = {
        transAppKey: function (a, b) {
            var c = "";
            switch (a.toLocaleLowerCase()) {
                case"app_schedule":
                    c = 1 == b ? "日程" : "会议";
                    break;
                case"app_task":
                    c = "任务"
            }
            return c
        }, refreshScheduleHtml: function (a, b) {
            var c = "app_schedule" == a.AppKey.toLocaleLowerCase() ? "calendar" : "task";
            $(".home-schedule-title").html("" + z.transAppKey(a.AppKey, a.Type) + '：<a target="_blank" href="' + i8_session.baseHost + c + "/detail/" + a.ID + '">' + a.Title + "</a>"), $(".home-schedule-time").html("app_task" == a.AppKey ? "到期时间：" + a.Time : "开始时间：" + a.Time), $(".home-schedule-index").html(b)
        }, renderScheduleHtml: function (a, b, c) {
            var d = "", e = "", f = "app_schedule" == a.AppKey.toLocaleLowerCase() ? "calendar" : "task";
            return e = "app_task" == a.AppKey ? "到期时间" : "开始时间", c && (d = '<div class="home-schedule-box" id="home_schedule_box">'), d += '<div class="rt m-t5 hide nextandprev" style="display: block;">                <span id="prev_schedule" class="spbg1 sprite-93 "></span><span id="next_schedule" class="spbg1 sprite-94 disabled"></span>            </div><div class="black bold home-schedule-title">' + z.transAppKey(a.AppKey, a.Type) + '：<a target="_blank" href="' + i8_session.baseHost + f + "/detail/" + a.ID + '">' + a.Title + '</a></div><div class="home-schedule-time">' + e + "：" + a.Time + '</div><div class="home-schedule-index-box"><span class="home-schedule-index">' + b + '                </span><span class="home-schedule-total">/' + b + '</span></div><div class="home-schedule-close"></div>', c && (d += "</div>"), d
        }, showScheduleHtml: function (a) {
            var b = {};
            if ($("#home_schedule_box").length) {
                var c = $("#home_schedule_box").data().Items, d = _.pluck(c, "ID");
                if (-1 != _.indexOf(d, a.ID))return;
                c.push(a);
                var e = c, f = z.renderScheduleHtml(a, e.length, !0);
                $("#home_schedule_box").replaceWith(f), b.Items = e, $("#home_schedule_box").data(b), z.updataBottomTipCookies(b)
            } else {
                var f = z.renderScheduleHtml(a, 1, !0);
                $(".app-content .tips-content .schedule-tips").append(f), b.Items = [a], $("#home_schedule_box").data(b), z.updataBottomTipCookies(b)
            }
            if (b.Items.length < 2)$(".nextandprev").hide(); else {
                $(".nextandprev").show();
                var g = {}, h = b.Items.length, i = b.Items;
                g.size = 0;
                var j = $("#prev_schedule"), k = $("#next_schedule");
                j.removeClass("disabled"), j.click(function () {
                    if (!(j.attr("class").indexOf("disabled") >= 0)) {
                        var a = parseInt($(".home-schedule-index").text());
                        k.removeClass("disabled"), 3 > a && j.addClass("disabled"), z.refreshScheduleHtml(i[a - 2], a - 1)
                    }
                }), k.click(function () {
                    if (!(k.attr("class").indexOf("disabled") >= 0)) {
                        var a = parseInt($(".home-schedule-index").text());
                        j.removeClass("disabled"), a > h - 2 && k.addClass("disabled"), z.refreshScheduleHtml(i[a], a + 1)
                    }
                })
            }
            $(".home-schedule-close").click(function () {
                $(".home-schedule-box").remove(), z.deleteBottomTipCookies()
            })
        }, updataBottomTipCookies: function (a) {
            a.uid = i8_session.uid, o.setCookies("bottomTipCookies", o.toJsonString(a))
        }, deleteBottomTipCookies: function () {
            o.setCookies("bottomTipCookies", "")
        }, loadBottomTips: function () {
            var a = o.getCookies("bottomTipCookies");
            if (a) {
                if (a = $.parseJSON(a), console.log(a), a.uid != i8_session.uid)return void z.deleteBottomTipCookies();
                a = a.Items || [];
                for (var b = 0; b < a.length; b++)z.showScheduleHtml(a[b])
            }
        }
    };
    $(function () {
        var a = function () {
            var a, b, c = document.title, d = function () {
                var b = "hidden"in document ? "hidden" : "webkitHidden"in document ? "webkitHidden" : "mozHidden"in document ? "mozHidden" : null;
                clearInterval(a), document[b] && (a = setInterval(function () {
                    document.title = document.title == c ? "IM新消息!" : c, document[b] || (document.title = c, clearInterval(a))
                }, 200))
            };
            x(function (a) {
                var c = $(".im-tips a");
                clearInterval(b), "1" == a ? (b = setInterval(function () {
                    c.toggleClass("hasmessage")
                }, 500), d()) : (clearInterval(b), c.removeClass("hasmessage")), c.on("click", function () {
                    clearInterval(b), c.removeClass("hasmessage")
                })
            })
        };
        if (a(), c(), i8_session.multiact) {
            var d = $("#js_show_communitys"), e = $("#js_community_list");
            d.show(), j(d, e)
        } else $("#js_show_communitys").remove();
        if (!window.disabledFloatAst) {
            var f = window.location.host.split(".");
            f[0] = "www";
            var g = f.join(".");
            f[0] = "bbs";
            var h = f.join("."), k = '<div id="js_rtbtns" class="fixed-btns"><div class="fixed-btn-op"><span class="helpbtn1"></span><div class="animate"><p style="background: #47c7ea;"></p><a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAyNTMwMl8xNjY3MDlfNDAwODc3MTE4MV8yXw" target="_blank">在线咨询</a></div></div><div class="fixed-btn-op"><span class="helpbtn2"></span><div class="animate"><p style="background: #87ce18;"></p><a href="http://' + g + '/help" target="_blank">帮助中心</a></div></div><div class="fixed-btn-op"><span class="helpbtn3"></span><div class="animate" style=""><p style="background: #fbb40e;"></p><a href="http://' + h + '/post" target="_blank">意见反馈</a></div></div><div class="fixed-btn-op"><span class="helpbtn4"></span><div class="animate" style=""><p style="background: #fa8653;"></p><a href="http://' + g + '/activity/info" target="_blank">邀请推荐</a></div></div></div>';
            $("body").append(k)
        }
        var l = function (a, b) {
            var b = b || "current", c = window.location.href;
            $(a).removeClass(b).each(function (a, d) {
                var e = $(d).attr("navkeyword");
                e && c.indexOf(e) > 0 && $(d).addClass(b)
            }), 0 == $("" + a + ".current").length && $(a).eq(0).addClass("current")
        };
        0 != $(".communityheader").length && l(".app-mapsite a"), i(), b()
    }), $(window).load(function () {
        m.initSocket({
            roomId: i8_session.uid, url: i8_session.socketio, callback: function (a) {
                console.log(a), _.isObject(a) && f(a)
            }
        }), window.location.href.indexOf("process/task") < 0 && $.ajax({
            url: i8_session.ajaxWfHost + "webajax/process/gettaskactivecount",
            type: "get",
            dataType: "json",
            data: {_: _.now()},
            success: function (a) {
                if (a.Result) {
                    var b = a.ReturnObject[0].Item1;
                    b > 0 ? $("#js_work_tps").html(b > 99 ? "N" : b).show() : $("#js_work_tps").hide()
                } else n.error(a.Description)
            },
            error: function () {
            }
        })
    }), z.loadBottomTips(), window.scheduleTip = z, p.on("click", ".my-tps-close", function () {
        var a = [];
        $(q[1]).find("a.tips-msg").each(function () {
            a.push($(this).attr("noticeid") + "|" + $(this).find("span").html())
        }), o.setCookies("tipscookie", a.join(";")), p.hide()
    }), o.getCookies("notice_last") || h(), $("#js_top_links").on("click", "a", function () {
        var a = $(this).attr("href");
        "" != a && window.location.reload(a)
    }), i8_session.utype.length > 0 || i8_session.appadmin.length > 0, $(window).scroll(function () {
        $(document).scrollTop() >= 500 ? $("#js_retun_top").show() : $("#js_retun_top").hide()
    }), $(document).on("click", "#js_retun_top", function () {
        $(document).scrollTop(0)
    }), $(window).width() <= 1200 ? $("#js_left_bg").css("margin-left", "0px") : $("#js_left_bg").css("margin-left", "-450px"), $(window).resize(function () {
        $(window).width() <= 1200 ? $("#js_left_bg").css("margin-left", "0px") : $("#js_left_bg").css("margin-left", "-450px")
    }), $(document).ready(function () {
        var a = $("div.app-lt").outerHeight() - $(window).height() + 500;
        $(window).scroll(function () {
            var b = 62, c = $(document).scrollTop();
            $("#js_left_fixed_div").css(c >= a ? {top: b, position: "fixed", zIndex: 99} : {
                top: 0,
                position: "static",
                zIndex: 0
            });
            var d = $("#js_head_nav");
            c > 100 ? (d.addClass("fixed"), $("body").css("padding-top", "115px")) : (d.removeClass("fixed"), $("body").css("padding-top", "0px"));
            var e = $("#js_home_rt_block"), f = $(e).find("div.rt-block");
            if (e.length) {
                var g = e.outerHeight();
                if (c >= g) {
                    e.css({top: b, position: "fixed"}), f.addClass("hzero");
                    var h = document.getElementById("calendar"), i = document.getElementById("taskrpt"), j = document.getElementById("birthday");
                    h && $(h).removeClass("hzero"), i && $(i).removeClass("hzero"), h && i || j && $(j).removeClass("hzero"), h || i || j || $(f[0]).removeClass("hzero")
                } else e.css({position: "inherit", width: 250}), f.removeClass("hzero")
            }
        })
    })
});