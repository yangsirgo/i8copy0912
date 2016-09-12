/**
 * Created by Xcar on 2016/8/17.
 */
define("default/javascripts/common/rootbtn", ["./i8ui"], function (a) {
    var b = a("../common/i8ui"), c = $(".rootbtn"), d = function (a, b) {
        var c = !1;
        if ("[object Array]" != Object.prototype.toString.call(a))return !1;
        for (var d = 0; d < a.length; d++)a[d].toString().toLocaleLowerCase() == b.toString().toLocaleLowerCase() && (c = !0);
        return c
    }, e = function () {
        var a = i8_session.utype, b = (i8_session.appadmin, i8_session.baseHost), c = (i8_session.wfbaseHost, "" + b + "setcenter/corp-baseinfo");
        return d(a, "20") || d(a, "4") || (c = i8_session.baseHost + "introduction/baseset"), c
    };
    b.drag(".rootbtn", null, {
        imaxLeft: 64, imaxT: "parent", upcbk: function () {
            $(".my-control").attr("_href", e());
            var a = parseInt(c.css("left"));
            a > 32 ? (c.animate({left: 64}), $(window).attr("onbeforeunload") ? (window.location.href = $(".my-control").attr("_href"), c.animate({left: 64})) : $("body").fadeOut(300, function () {
                window.location.href = $(".my-control").attr("_href")
            })) : c.animate({left: 0})
        }
    }), $(".my-control").on("click", function () {
        $(this).find(".unrootbtn").length > 0 || ($(".my-control").attr("_href", e()), c.animate({left: 74}), $(window).attr("onbeforeunload") ? (window.location.href = $(".my-control").attr("_href"), c.animate({left: 74})) : $("body").fadeOut(300, function () {
            window.location.href = $(".my-control").attr("_href")
        }))
    }), c.on("click", function (a) {
        a.stopPropagation()
    })
})