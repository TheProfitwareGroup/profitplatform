if (location.hash.substr(0, 1) == '#'){
	document.location = 'http://slovarushka.ru/' + location.hash.substr(1);
}

$(document).ready(function(){
	/* $('#lform').popover({
		placement : 'bottom',
		trigger : 'manual',
		delay: 100,
		title : 'СловаRUшка',
		content : 'Логин или пароль неверны.<br />Введите правильные данные или<br />свяжитесь с автором сайта.'
	}); */
	var foptions = {
			dataType : 'json',
			clearForm : true,
			resetForm : true,
			success : function(x) {
				if(x.state != undefined) {
					if(x.state == 'success'){
						$('#lform').replaceWith('<p class="pull-right">Вы вошли как <a href="#profile">' + x.loginname + '</a> | <a href="#logout">Выход</a></p>');
					} else {
						$('input[name="login"]').focus();
						/* $('#lform').popover('toggle'); */
					}
				}
			}
	};
    $('#lform').submit(function() { 
        $(this).ajaxSubmit(foptions); 
        return false; 
    }); 
	var
		self = this;
	self.topmenu = function(ma){
		$('ul.nav > li.active').removeClass('active');
		if (ma !== null )
			$('ul.nav > li#' + ma).addClass('active');
	};
	self.parseurl = function(event){
		var lc = $(location).attr('href'),
			ma = new RegExp(/#([\/a-z0-9]+)$/ig).exec(lc);
		if(ma === null){
			return null;
		}else{
			ma = ma[1];
		}
		if(ma == 'logout'){
			$('div.container-fluid > p.pull-right').replaceWith('<form class="pull-right form-search" method="POST" action="/login" id="lform"><input name="login" type="text" class="input-small" placeholder="Логин" />&nbsp;<input name="pwd" type="password" class="input-small" placeholder="Пароль" />&nbsp;<button type="submit" class="btn">Войти</button></form>');
		    $('#lform').submit(function() { 
		        $(this).ajaxSubmit(foptions); 
		        return false; 
		    }); 
		    document.location.href = '#';
		}
		$.get('/' + ma + '?ajax', function(data){
			$('div.content').fadeOut(function(){
				$('div.content').html(data);
				self.topmenu(ma);
			}).fadeIn();
		});
	};
	$(window).bind('hashchange', self.parseurl);
	self.parseurl(null);
});