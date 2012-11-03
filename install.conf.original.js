access = require('core/access.js');
options = require('options.js');
sprintf = require('sprintf').sprintf;
require('core/install.js')(
	{
		users : [
		    {
		        login : 'admin',
		        password : 'password',
		        name : 'Vasiliy',
		        surname : 'Pupkin',
		        roles : access.LEVEL_APPS,
		        profile : 'platform.admin'
            },
		    {
		        login : 'profitware',
		        password : 'profitwaresecretpwd',
		        name : 'Profitware',
		        surname : 'Group',
		        roles : access.LEVEL_APPS,
		        profile : 'app.profitware'
            },
		    {
		        login : 'eventflow',
		        password : 'eventflowsecretpassword',
		        name : 'Eventflow',
		        surname : 'User',
		        roles : access.LEVEL_APPS,
		        profile : 'app.eventflow',
		        appUser : true
            }
        ],

	    schemas : [
		    {
		        name : 'platform.common.localize',
		        level : access.LEVEL_AJAX
		    },
		    {
		        name : 'platform.common.schemalist',
		        level : access.LEVEL_AUTH
		    },
		    {
		        name : 'platform.common.getsession',
		        level : access.LEVEL_AJAX
		    },
		    {
		        name : 'platform.common.checksession',
		        level : access.LEVEL_AJAX
		    },
		    {
		        name : 'platform.common.deletesession',
		        level : access.LEVEL_AUTH
		    },
		    {
		        name : 'platform.common.heartbeat',
		        level : access.LEVEL_AJAX
		    },
		    {
		        name : 'platform.admin.adduser',
		        level : access.LEVEL_AUTH
		    },
		    {
		        name : 'platform.admin.getinfo',
		        level : access.LEVEL_AUTH
		    },
		    {
		        name : 'smsc.sendsms',
		        level : access.LEVEL_AUTH
		    },
		    {
		    	name : 'app.slovarushka.page.find',
		    	level : access.LEVEL_AJAX
		    },
		    {
		    	name : 'app.slovarushka.word.find',
		    	level : access.LEVEL_AJAX
		    },
		    {
		    	name : 'app.slovarushka.blog.find',
		    	level : access.LEVEL_AJAX
		    },
		    {
		    	name : 'app.profitware.twitter.get',
		    	level : access.LEVEL_AJAX
		    },
		    {
		    	name : 'app.profitware.company.users.find',
		    	level : access.LEVEL_AUTH
		    },
		    {
		    	name : 'app.profitware.company.users.auth',
		    	level : access.LEVEL_AUTH
		    },
		    {
		    	name : 'app.eventflow.document.add',
		    	level : access.LEVEL_AUTH
		    },
		    {
		    	name : 'app.eventflow.document.check',
		    	level : access.LEVEL_AUTH
		    },
		    {
		    	name : 'app.eventflow.document.status',
		    	level : access.LEVEL_AUTH
		    },
		    {
		    	name : 'app.eventflow.dispatch.push',
		    	level : access.LEVEL_AUTH
		    },
		    {
		    	name : 'app.eventflow.web.page.find',
		    	level : access.LEVEL_APPS
		    },
		    {
		    	name : 'app.eventflow.web.doctype.find',
		    	level : access.LEVEL_APPS
		    },
		    {
		    	name : 'app.eventflow.web.platform.session.find',
		    	level : access.LEVEL_APPS
		    },
		    {
		    	name : 'app.eventflow.mq.request',
		    	level : access.LEVEL_APPS
		    },
		    {
		    	name : 'app.eventflow.dispatch.profitware.sms',
		    	level : access.LEVEL_APPS
		    }
	    ],
	    
	    profiles : [
	        {
	        	name : 'platform.common',
	        	schemas : [
	        	           'platform.common.localize',
	        	           'platform.common.getsession',
	        	           'platform.common.checksession',
	        	           'platform.common.schemalist',
	        	           'platform.common.heartbeat',
	        	           'platform.common.deletesession'
	        	]
	        },
	        {
	        	name : 'platform.admin',
	        	schemas : [
	        	           'platform.admin.adduser',
	        	           'platform.admin.getinfo'
	        	],
	        	extends : 'platform.common'
	        },
	        {
	        	name : 'app.slovarushka',
	        	schemas : [
	        	           'app.slovarushka.page.find',
	        	           'app.slovarushka.word.find',
	        	           'app.slovarushka.blog.find'
	        	],
	        	extends : 'platform.common'
	        },
	        {
	        	name : 'app.eventflow',
	        	schemas : [
	        	           'app.eventflow.document.add',
	        	           'app.eventflow.document.check',
	        	           'app.eventflow.document.status',
	        	           'app.eventflow.dispatch.push',
	        	           'app.eventflow.web.page.find',
	        	           'app.eventflow.web.doctype.find',
	        	           'app.eventflow.web.platform.session.find',
	        	           'app.eventflow.mq.request'
	        	],
	        	extends : 'platform.common'
	        },	        
	        {
	        	name : 'app.profitware',
	        	schemas : [
	        	           'app.profitware.twitter.get',
	        	           'app.profitware.company.users.find',
	        	           'app.profitware.company.users.auth',
	        	           'app.eventflow.dispatch.profitware.sms'
	        	],
	        	extends : 'app.eventflow'
	        }
	    ],

        autoprocs : [
         /* {
		        name : 'platform.common.heartbeat',
		        params : { apikey : '' },
		        dateregex : '^.{3} .{3} \\d{2} \\d{4} \\d{2}:\\d{2}:\\d{1}[05] GMT\\+0400 \\(MSD\\)$',
		        state : db.autoprocDescription.STATE_PLAN,
		        retval : {},
		        lastmatch : '',
		        redo : true
	        } */
		],
		
		apps : [
		    {
			        name : 'slovarushka',
			        domain : 'slovarushka.ru',
			        secret : '45ghiw$%#^YYsgiu4h5'
		    },
		    {
		    		name : 'eventflow',
		    		domain : 'ef.profitware.ru',
		    		secret : '345guh9$%GS8ghw3i4fh'
		    }
		],
		
		smsSenders : [
		    {
		        login : 'profitware',
		        password : 'W$G%W#5yhsdfg4356',
		        sender : 'Profitware'
		    }
		],
		
		eventflowDoctypes : [
		    {
		    	sysid : sprintf('EventFlow [ProfitPlatform %s] (%s:%s)', options.version, options.platform_host, options.platform_port),
		    	doctype : [
		    	    {
		    	    	name : 'EF_MESSAGE',
		    	    	description : 'Сообщение пользователю EventFlow',
		    	    	fields : [
		    	    	    {
		    	    	    	name : 'phone',
		    	    	    	type : 'text',
		    	    	    	title : 'Номер телефона',
		    	    	    	description : 'Телефон в формате 7XXXXXXXXXX',
		    	    	    	regex : /^7\d{10}$/
		    	    	    },
		    	    	    {
		    	    	    	name : 'text',
		    	    	    	type : 'textarea',
		    	    	    	title : 'Текст сообщения',
		    	    	    	description : 'Сообщение для отправки',
		    	    	    	regex : /^.{1,120}$/
		    	    	    },
		    	    	    {
		    	    	    	name : 'id',
		    	    	    	type : 'in',
		    	    	    	title : 'Идентификатор сообщения в SMS центре'
		    	    	    },
		    	    	    {
		    	    	    	name : 'cnt',
		    	    	    	type : 'in',
		    	    	    	title : 'Колчество отправленных сообщений'
		    	    	    }
		    	    	],
		    	    	dispatcher : {
		    	    		accepted : 'app.eventflow.dispatch.profitware.sms'
		    	    	}
		    	    }
		    	]
		    },
		    {
		    	sysid : 'External test system',
		    	doctype : [
		    	    {
		    	    	name : 'EX_TESTDOC',
		    	    	description : 'Тестовый документ внешней системы',
		    	    	fields : [
		    	    	    {
		    	    	    	name : 'data',
		    	    	    	type : 'text',
		    	    	    	title : 'Данные',
		    	    	    	description : 'Просто какие-то данные'
		    	    	    },
		    	    	    {
		    	    	    	name : 'str',
		    	    	    	type : 'textarea',
		    	    	    	title : 'Текст сообщения',
		    	    	    	description : 'Просто сообщение'
		    	    	    }
		    	    	],
		    	    	dispatcher : {}
		    	    }
		    	]
		    }
		],

		eventflowPages : [ 
		        			{
		        	    	 	page : 'meta',
		        	    	 	vars : {
		        	    	 		title : 'EventFlow',
		        	    	 		description : 'EventFlow Admin',
		        					author : 'Сергей Собко',
		        					content : ''
		        				}
		        		    },
		        		    {
		        				page : 'styles'
		        		    },
		        		    {
		        				page : 'scripts'
		        		    },
		        		    {
		        		    	page : 'topnav',
		        		    	vars : {
		        		    		brand : 'EventFlow',
		        		    		menu : [
		        		    		        {
		        		    		        	_path : 'index',
		        		    		        	id : 'index',
		        		    		        	title : 'Главная',
		        		    		        	href : '#index',
		        		    		        	active : false
		        		    		        },
		        		    		        {
		        		    		        	_path : 'about',
		        		    		        	id : 'about',
		        		    		        	title : 'О Системе',
		        		    		        	href : '#about',
		        		    		        	active : false
		        		    		        }	    		        
		        		    		],
		        		    		loginname : '',
		        		    		page : ''
		        		    	}
		        		    },
		        		    {
		        		    	page : 'leftmenu',
		        		    	vars : {
		        		    		menu : [
		        		    		        {
		        		    		        	_path : 'platform',
		        		    		        	title : 'ProfitPlatform',
		        		    		        	menu : [
		        		    		        	        {
		        		    		        	        	_path : 'platform.stats',
		        		    		        	        	icon : 'signal',
		        		    		        	        	href : '#platform.stats',
		        		    		        	        	name : 'Статистика',
		        		    		        	        	active : false
		        		    		        	        },
		        		    		        	        {
		        		    		        	        	_path : 'platform.settings',
		        		    		        	        	icon : 'cog',
		        		    		        	        	href : '#platform.settings',
		        		    		        	        	name : 'Настройки',
		        		    		        	        	active : false
		        		    		        	        },
		        		    		        	        {
		        		    		        	        	_path : 'platform.profile',
		        		    		        	        	icon : 'user',
		        		    		        	        	href : '#platform.profile',
		        		    		        	        	name : 'Профиль',
		        		    		        	        	active : false
		        		    		        	        }
		        		    		        	]
		        		    		        },
		        		    		        {
		        		    		        	_path : 'eventflow',
		        		    		        	title : 'EventFlow',
		        		    		        	menu : [
		        		    		        	        {
		        		    		        	        	_path : 'eventflow.docs_new',
		        		    		        	        	icon : 'plus-sign',
		        		    		        	        	href : '#eventflow.docs_new',
		        		    		        	        	name : 'Создать документ',
		        		    		        	        	active : false
		        		    		        	        },
		        		    		        	        {
		        		    		        	        	_path : 'eventflow.docs_in',
		        		    		        	        	icon : 'download',
		        		    		        	        	href : '#eventflow.docs_in',
		        		    		        	        	name : 'Входящие документы',
		        		    		        	        	active : false
		        		    		        	        }
		        		    		        	]
		        		    		        }
		        		    		 ]
		        		    	}
		        		    },
		        		    {
		        		    	page : 'path',
		        		    	vars : {
		        		    		path : [{ title : 'Главная', href : 'index' }]
		        		    	}
		        		    },
		        		    {
		        		    	page : 'err403',
		        		    	vars : {
		        		    		path : [{ title : 'Главная', href : 'index' }]
		        		    	}
		        		    },
		        		    {
		        		    	page : 'content',
		        		    	vars : {
		        		    		title : '',
		        		    		content : '',
		        		    		lastPage : '',
		        		    		year : '',
		        		    		path : '',
		        		    		auth : false
		        		    	}
		        		    },
		        		    {
		        		    	page : 'platform.stats',
		        		    	vars : {
		        		    		time : '',
		        		    		sessionScroller : '',
		        		    		schemas : []
		        		    	}
		        		    },
		        		    {
		        		    	page : 'platform.profile',
		        		    	vars : {
		        		    		login : '',
		        		    		user : {}
		        		    	}
		        		    },
		        		    {
		        		    	page : 'eventflow.docs_new',
		        		    	vars : {
		        		    		ref : '550e8400-e29b-41d4-a716-446655440000',
		        		    		doctypes : [],
		        		    		fields : '',
		        		    		selecteddoctype : ''
		        		    	}
		        		    },
		        		    {
		        		    	page : 'eventflow.docs_in',
		        		    	vars : {
		        		    		ref : '',
		        		    		docsScroller : '',
		        		    		documentScroller : '',
		        		    		historyScroller : '',
		        		    		docType : {}
		        		    	}
		        		    }
		        		],
		
		slovarushkaPages : [ 
			{
	    	 	page : 'meta',
	    	 	vars : {
	    	 		title : 'СловаRUшка',
	    	 		description : 'Словарь интересных слов и словосочетаний',
					author : 'Сергей Собко',
					content : ''
				}
		    },
		    {
				page : 'styles'
		    },
		    {
				page : 'scripts'
		    },
		    {
		    	page : 'topnav',
		    	vars : {
		    		brand : 'СловаRUшка',
		    		menu : [
		    		        {
		    		        	id : 'index',
		    		        	title : 'Главная',
		    		        	href : '#index',
		    		        	active : false
		    		        },
		    		        {
		    		        	id : 'blog',
		    		        	title : 'Бложик',
		    		        	href : '#blog',
		    		        	active : false
		    		        },	
		    		        {
		    		        	id : 'about',
		    		        	title : 'О Проекте',
		    		        	href : '#about',
		    		        	active : false
		    		        }	    		        
		    		],
		    		loginname : '',
		    		page : ''
		    	}
		    },
		    {
		    	page : 'leftmenu',
		    	vars : {
		    		menu : [
		    		        {
		    		        	title : 'Словарушка',
		    		        	menu : [
		    		        	        {
		    		        	        	href : '#words',
		    		        	        	name : 'Интересные слова',
		    		        	        	content : true
		    		        	        }        	        
		    		        	        
		    		        	]
		    		        },
		    		        {
		    		        	title : 'Интересные ссылки',
		    		        	menu : [
		    		        	        {
		    		        	        	href : 'http://dovemen.ru/',
		    		        	        	name : 'Наш старший брат',
		    		        	        	content : false
		    		        	        },
		    		        	        {
		    		        	        	href : 'http://lostfilm.tv/',
		    		        	        	name : 'Что посмотреть',
		    		        	        	content : false
		    		        	        },
		    		        	        {
		    		        	        	href : 'http://z-music.ru/',
		    		        	        	name : 'Что послушать',
		    		        	        	content : false
		    		        	        },
		    		        	        {
		    		        	        	href : 'http://profitware.ru/',
		    		        	        	name : 'Разработчики',
		    		        	        	content : false
		    		        	        }    		        	        
		    		        	        
		    		        	]
		    		        }
		    		 ]
		    	}
		    },
		    {
		    	page : 'player'
		    },
		    {
		    	page : 'content',
		    	vars : {
		    		title : '',
		    		content : '',
		    		words : [],
		    		lastPage : '',
		    		year : ''
		    	}
		    }
		],
		
		slovarushkaWords : [
		         {
		        	 idnum : 1,
		        	 title : 'ПАЛЬЦЕГНУТЫЕ',
		        	 description : 'Бизнесмены разного пошиба, перепрыгнувшие сразу несколько ступеней развития человека без какого-либо осадка.'
		         },
		         {
		        	 idnum : 2,
		        	 title : 'СЛОВАРУШКА',
		        	 description : 'В зависимости от ударения:',
		        	 descrs : [
		        	           'собрание чем-то близких слов;',
		        	           'словесная заварушка.'
		        	 ]
		         },
		         {
		        	 idnum : 3,
		        	 title : 'БОМОНДАСТАЯ ГЛАМУТЬ',
		        	 description : 'Пенный слой окунувшихся в деньги и безделье по причине обогащенных родителей и всякого рода популярности.'
		         }		         
		],
		
		slovarushkaBlogposts : [
		   		         {
		   		        	 idnum : 1,
		   		        	 title : 'Первая запись',
		   		        	 content : 'Добро пожаловать в бложик :3',
		   		        	 date : new Date('2:00 1/6/2012')
		   		         },
		   		         {
		   		        	 idnum : 2,
		   		        	 title : 'Вторая запись',
		   		        	 content : 'Ололо, это вторая запись',
		   		        	 date : new Date('3:00 1/7/2012')
		   		         }
		]

	}
);
