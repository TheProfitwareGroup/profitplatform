var fp = document.location.origin ? document.location.origin + '/' :
    (document.location.protocol + '//' + document.location.host + '/');

if (location.hash.substr(0, 1) == '#') {
    document.location = fp + location.hash.substr(1);
}

$(document).ready(function () {
    var foptions = {
        dataType: 'json',
        clearForm: true,
        resetForm: true,
        success: function (x) {
            if (x.state != undefined) {
                if (x.state == 'success') {
                    $('#lform').replaceWith('<p class="pull-right navbar-text">Вы вошли как <a class="p-text" href="#platform.profile">' + x.loginname + '</a> | <a href="#logout">Выход</a></p>');
                    $.get('/leftmenu?ajax', function (d) {
                        $('div.container-fluid > div.row-fluid').prepend(d);
                        $('div.span12').removeClass('span12').addClass('span9');
                        try {
                            document.location = new RegExp(/^((?!#).)*$/ig).exec(document.location)[0] + '#index';
                        } catch (e) {
                        }
                    });
                } else {
                    $('input[name="login"]').focus();
                }
            }
        }
    };
    var docs_new_options = {
        dataType: 'json',
        clearForm: true,
        resetForm: true,
        success: function (x) {
            console.log(x);
            if (x.session != 'ok') {
                alert('Cессия завершена!');
                document.location.href = fp;
            }
            if (x.docstatus == 'error') {
                if (!(/\<div.*\/div\>/.test(x.message)))
                    x.message = '<div class="alert alert-error fade in"><a class="close" data-dismiss="alert">×</a>' + x.message + '</div>';
                $(x.message).prependTo($('form#docs_new').parent());
                $('.alert').alert();
                if ($('select#doctype').length > 0 && self.lastdoctype) {
                    $('select#doctype').val(self.lastdoctype);
                }
            }
            if (x.docref) {
                var n = fp + '#eventflow.docs_in/' + x.docref;
                if (document.location.href == n)
                    self.parseurl();
                else
                    document.location.href = n;

            }
        }
    }
    $('#lform').submit(function () {
        $(this).ajaxSubmit(foptions);
        return false;
    });
    var
        self = this;
    self.docnew = function (x) {
        if ($('select#doctype').length > 0) {
            var p = $('select#doctype').val();
            self.lastdoctype = p;
            if (p != '-') {
                document.location.href = '#eventflow.docs_new/' + p;
            } else {
                document.location.href = '#eventflow.docs_new';
            }
        }
    };
    self.topmenu = function (ma) {
        $('ul.nav > li.active').removeClass('active');
        if (ma !== null)
            $('ul.nav > li#' + ma).addClass('active');
    };
    self.parseurl = function (event) {
        var lc = $(location).attr('href'),
            ma = new RegExp(/#([\._\/a-z0-9\-]+)$/ig).exec(lc);
        if (ma === null) {
            return null;
        } else {
            ma = ma[1];
        }
        if (ma == 'logout') {
            $('div.container-fluid > p.pull-right').replaceWith('<form class="pull-right navbar-form" method="POST" action="/login" id="lform"><input name="login" type="text" class="input-small" placeholder="Логин" />&nbsp;<input name="pwd" type="password" class="input-small" placeholder="Пароль" />&nbsp;<button type="submit" class="btn">Войти</button></form>');
            $('#lform').submit(function () {
                $(this).ajaxSubmit(foptions);
                return false;
            });
            $('div.row-fluid > div.span3').remove();
            $('div.row-fluid > div#mcontent').removeClass('span9').addClass('span12');
            //document.location.href = fp + '#'
            //document.location.href = '#';
        }
        $.get('/' + ma + '?ajax', function (data) {
            //var spw = ($('div.span9').length == 0) ? 12 : 9;
            $.getJSON('/checkapikey', function (xs) {
                if (xs.session == 'ok' || $('form.navbar-form').length > 0) {
                    $('div#mcontent').fadeOut(function () {
                        $('div#mcontent').html(data);
                        if ((/eventflow\.docs_new/.test(ma)) || (/eventflow\.docs_in/.test(ma))) {
                            if (/eventflow\.docs_new/.test(ma))
                                $('select#doctype').change(self.docnew);
                            $('form#docs_new').submit(function () {
                                $(this).ajaxSubmit(docs_new_options);
                                return false;
                            });
                        }
                        self.topmenu(ma);
                        $('li.nav-header > li > a').removeClass('active');
                        $('a[href="#' + ma + '"]:not(.p-text)').parent().removeClass().addClass('active');
                    }).fadeIn();
                } else {
                    alert('Cессия завершена!');
                    document.location.href = fp;
                }
            });
        });
    };
    $(window).bind('hashchange', self.parseurl);
    self.parseurl(null);
    self.docnew(null);
});