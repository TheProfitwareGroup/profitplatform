access = require('core/access.js');
options = require('options.js');
sprintf = require('sprintf').sprintf;
require('core/install.js')(
    {
        users: [
            {
                login: 'admin',
                password: 'password',
                name: 'Vasiliy',
                surname: 'Pupkin',
                roles: access.LEVEL_APPS,
                profile: 'platform.admin'
            },
            {
                login: 'eventflow',
                password: options.eventflowkey,
                name: 'Eventflow',
                surname: 'User',
                roles: access.LEVEL_APPS,
                profile: 'app.eventflow',
                appUser: true
            }
        ],

        schemas: [
            {
                name: 'platform.common.localize',
                level: access.LEVEL_AJAX
            },
            {
                name: 'platform.common.schemalist',
                level: access.LEVEL_AUTH
            },
            {
                name: 'platform.common.getsession',
                level: access.LEVEL_AJAX
            },
            {
                name: 'platform.common.checksession',
                level: access.LEVEL_AJAX
            },
            {
                name: 'platform.common.deletesession',
                level: access.LEVEL_AUTH
            },
            {
                name: 'platform.common.heartbeat',
                level: access.LEVEL_AJAX
            },
            {
                name: 'platform.admin.adduser',
                level: access.LEVEL_AUTH
            },
            {
                name: 'platform.admin.getinfo',
                level: access.LEVEL_AUTH
            },
            {
                name: 'smsc.sendsms',
                level: access.LEVEL_AUTH
            },
            {
                name: 'app.eventflow.document.add',
                level: access.LEVEL_AUTH
            },
            {
                name: 'app.eventflow.document.check',
                level: access.LEVEL_AUTH
            },
            {
                name: 'app.eventflow.document.status',
                level: access.LEVEL_AUTH
            },
            {
                name: 'app.eventflow.dispatch.push',
                level: access.LEVEL_AUTH
            },
            {
                name: 'app.eventflow.web.page.find',
                level: access.LEVEL_APPS
            },
            {
                name: 'app.eventflow.web.doctype.find',
                level: access.LEVEL_APPS
            },
            {
                name: 'app.eventflow.web.platform.session.find',
                level: access.LEVEL_APPS
            },
            {
                name: 'app.eventflow.mq.request',
                level: access.LEVEL_APPS
            },
            {
                name: 'app.eventflow.dispatch.profitware.sms',
                level: access.LEVEL_APPS
            },
            {
                name: 'app.eventflow.dispatch.profitware.zmq-db',
                level: access.LEVEL_APPS
            }
        ],

        profiles: [
            {
                name: 'platform.common',
                schemas: [
                    'platform.common.localize',
                    'platform.common.getsession',
                    'platform.common.checksession',
                    'platform.common.schemalist',
                    'platform.common.heartbeat',
                    'platform.common.deletesession'
                ]
            },
            {
                name: 'platform.admin',
                schemas: [
                    'platform.admin.adduser',
                    'platform.admin.getinfo'
                ],
                extends: 'platform.common'
            },
            {
                name: 'app.eventflow',
                schemas: [
                    'app.eventflow.document.add',
                    'app.eventflow.document.check',
                    'app.eventflow.document.status',
                    'app.eventflow.dispatch.push',
                    'app.eventflow.web.page.find',
                    'app.eventflow.web.doctype.find',
                    'app.eventflow.web.platform.session.find',
                    'app.eventflow.mq.request'
                ],
                extends: 'platform.common'
            }
        ],

        autoprocs: [
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

        apps: [
            {
                name: 'eventflow',
                domain: 'ef.profitware.ru',
                secret: '345guh9$%GS8ghw3i4fh'
            }
        ],

        smsSenders: [
            {
                login: 'profitware',
                password: 'W$G%W#5yhsdfg4356',
                sender: 'Profitware'
            }
        ],

        eventflowDoctypes: [
            {
                sysid: sprintf('EventFlow [ProfitPlatform %s] (%s:%s)', options.version, options.platform_host, options.platform_port),
                doctype: [
                    {
                        name: 'EF_MESSAGE',
                        description: 'Сообщение пользователю EventFlow',
                        fields: [
                            {
                                name: 'phone',
                                type: 'text',
                                title: 'Номер телефона',
                                description: 'Телефон в формате 7XXXXXXXXXX',
                                regex: /^7\d{10}$/
                            },
                            {
                                name: 'text',
                                type: 'textarea',
                                title: 'Текст сообщения',
                                description: 'Сообщение для отправки',
                                regex: /^.{1,120}$/
                            },
                            {
                                name: 'id',
                                type: 'in',
                                title: 'Идентификатор сообщения в SMS центре'
                            },
                            {
                                name: 'cnt',
                                type: 'in',
                                title: 'Колчество отправленных сообщений'
                            },
                            {
                                name: 'error',
                                type: 'in',
                                title: 'Ошибка'
                            },
                            {
                                name: 'error_code',
                                type: 'in',
                                title: 'Код ошибки'
                            }
                        ],
                        dispatcher: {
                            accepted: 'app.eventflow.dispatch.profitware.sms'
                        }
                    },
                    {
                        name: 'EF_DEPLOY',
                        description: 'Деплоймент из репозитария SVN',
                        fields: [
                            {
                                name: 'project',
                                type: 'select',
                                title: 'Наименование проекта',
                                description: 'Наименование проекта в SVN',
                                list: [
                                    {
                                        name: 'myrussia',
                                        value: 'Моя Россия'
                                    },
                                    {
                                        name: 'orthodoxy-world',
                                        value: 'Православный мир'
                                    },
                                    {
                                        name: 'eventflow-profitware',
                                        value: 'EventFlow @ Profitware'
                                    },
                                    {
                                        name: 'weblab-profitware',
                                        value: 'WebLab @ Profitware'
                                    }
                                ]
                            },
                            {
                                name: 'data',
                                type: 'in',
                                title: 'Данные от ZMQ-провайдера'
                            }
                        ],
                        dispatcher: {
                            accepted: 'app.eventflow.dispatch.profitware.zmq-db'
                        }
                    }
                ]
            },
            {
                sysid: 'External test system',
                doctype: [
                    {
                        name: 'EX_TESTDOC',
                        description: 'Тестовый документ внешней системы',
                        fields: [
                            {
                                name: 'data',
                                type: 'text',
                                title: 'Данные',
                                description: 'Просто какие-то данные'
                            },
                            {
                                name: 'str',
                                type: 'textarea',
                                title: 'Текст сообщения',
                                description: 'Просто сообщение'
                            }
                        ],
                        dispatcher: {}
                    }
                ]
            }
        ],

        eventflowPages: [
            {
                page: 'meta',
                vars: {
                    title: 'EventFlow',
                    description: 'EventFlow Admin',
                    author: 'Сергей Собко',
                    content: ''
                }
            },
            {
                page: 'styles'
            },
            {
                page: 'scripts'
            },
            {
                page: 'topnav',
                vars: {
                    brand: 'EventFlow',
                    menu: [
                        {
                            _path: 'index',
                            id: 'index',
                            title: 'Главная',
                            href: '#index',
                            active: false
                        },
                        {
                            _path: 'about',
                            id: 'about',
                            title: 'О Системе',
                            href: '#about',
                            active: false
                        }
                    ],
                    loginname: '',
                    page: ''
                }
            },
            {
                page: 'leftmenu',
                vars: {
                    menu: [
                        {
                            _path: 'platform',
                            title: 'ProfitPlatform',
                            menu: [
                                {
                                    _path: 'platform.stats',
                                    icon: 'signal',
                                    href: '#platform.stats',
                                    name: 'Статистика',
                                    active: false
                                },
                                {
                                    _path: 'platform.settings',
                                    icon: 'cog',
                                    href: '#platform.settings',
                                    name: 'Настройки',
                                    active: false
                                },
                                {
                                    _path: 'platform.profile',
                                    icon: 'user',
                                    href: '#platform.profile',
                                    name: 'Профиль',
                                    active: false
                                }
                            ]
                        },
                        {
                            _path: 'eventflow',
                            title: 'EventFlow',
                            menu: [
                                {
                                    _path: 'eventflow.docs_new',
                                    icon: 'plus-sign',
                                    href: '#eventflow.docs_new',
                                    name: 'Создать документ',
                                    active: false
                                },
                                {
                                    _path: 'eventflow.docs_in',
                                    icon: 'download',
                                    href: '#eventflow.docs_in',
                                    name: 'Входящие документы',
                                    active: false
                                }
                            ]
                        }
                    ]
                }
            },
            {
                page: 'path',
                vars: {
                    path: [
                        { title: 'Главная', href: 'index' }
                    ]
                }
            },
            {
                page: 'err403',
                vars: {
                    path: [
                        { title: 'Главная', href: 'index' }
                    ]
                }
            },
            {
                page: 'content',
                vars: {
                    title: '',
                    content: '',
                    lastPage: '',
                    year: '',
                    path: '',
                    auth: false
                }
            },
            {
                page: 'platform.stats',
                vars: {
                    time: '',
                    sessionScroller: '',
                    schemas: []
                }
            },
            {
                page: 'platform.profile',
                vars: {
                    login: '',
                    user: {}
                }
            },
            {
                page: 'eventflow.docs_new',
                vars: {
                    ref: '550e8400-e29b-41d4-a716-446655440000',
                    doctypes: [],
                    fields: '',
                    selecteddoctype: ''
                }
            },
            {
                page: 'eventflow.docs_in',
                vars: {
                    ref: '',
                    docsScroller: '',
                    documentScroller: '',
                    historyScroller: '',
                    docType: {}
                }
            }
        ]
    }
);
