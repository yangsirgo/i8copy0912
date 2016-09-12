/**
 * Created by Xcar on 2016/8/17.
 */
define("default/javascripts/modules/public", [], function (a, b) {
    function c(a) {
        var b = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22], c = new Date(a.replace(/-/g, "/")), d = c.getMonth() + 1, e = c.getDate();
        return "摩羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯".substr(2 * d - (e < b[d - 1] ? 2 : 0), 2) + "座"
    }

    function d(a) {
        $.ajax({
            url: i8_session.ajaxHost + "webajax/modules/gettpstype",
            type: "post",
            dataType: "json",
            cache: !1,
            success: function (b) {
                b.Result && a(b.ReturnObject)
            }
        })
    }

    b.getXingZuo = c, b.getTipstype = d
})