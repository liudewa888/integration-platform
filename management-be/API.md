## 接口文档

### 登录

```js
{
  url: '/login'
  methods: 'post',
  data: {
    username: 'test',
    password: 'b59c67bf196a4758191e42f76670ceba',
    is_remember: 'on',
    verify: null
  },
  success: {
    "error": 0,
  },
  error: {
    "error": 1,
    "msg": "用户名或者密码错误"
  }
}

```

### 获取菜单

```js
{
  url: '/menus/tree?order=asc'
  methods: 'get',
  success: {
    "error": 0,
    data:[{
        "menu_id": 1,
        "parent_id": 0,
        "menu_name": "我的控制台",
        "menu_url": "#",
        "menu_icon": "fa fa-dashboard",
        "creator_id": 0,
        "created_at": "2017-08-08T14:52:02.000Z",
        "modified_id": 319,
        "modified_at": "2019-05-05T14:30:57.000Z",
        "type": 0,
        "is_del": 0,
        "menu_flag": ""
    }]
  },
  error: {
    "error": 1,
  }
}

```
