/**
 * Created by Xcar on 2016/8/17.
 */
define("default/javascripts/modules/public", [], function (a, b) {
    function c(a) {
        var b = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22], c = new Date(a.replace(/-/g, "/")), d = c.getMonth() + 1, e = c.getDate();
        return "Ħ��ˮƿ˫������ţ˫�Ӿ�зʨ�Ӵ�Ů�����Ы����Ħ��".substr(2 * d - (e < b[d - 1] ? 2 : 0), 2) + "��"
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