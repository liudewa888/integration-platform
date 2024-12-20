var $table = $("#menus");
const menuTypeDic = {
  0: "系统",
  1: "项目",
  2: "菜单",
  3: "页面",
  4: "按钮",
};
const initTable = () => {
  const url = "/menus/tree";
  $table.bootstrapTable({
    url, //请求后台的URL（*）
    method: "get", //请求方式（*）
    idField: "menu_id",
    columns: [
      {
        field: "check",
        checkbox: true,
        formatter: function (value, row, index) {
          if (row.check == true) {
            // console.log(row.serverName);
            //设置选中
            return { checked: true };
          }
        },
      },
      { field: "menu_name", title: "名称" },
      { field: "menu_id", title: "菜单ID" },
      { field: "system_code", title: "系统ID" },
      { field: "menu_flag", title: "唯一值", align: "left" },
      { field: "menu_url", title: "路由", align: "left" },
      { field: "menu_type", title: "类型", formatter: "typeFormatter" },
      { field: "menu_icon", title: "图标" },
      { field: "menu_order", title: "排序" },
      {
        field: "operate",
        title: "操作",
        align: "center",
        events: operateEvents,
        formatter: "operateFormatter",
      },
    ],
    // bootstrap-table-treegrid.js 插件配置 -- start
    //在哪一列展开树形
    treeShowField: "menu_name",
    //指定父id列
    parentIdField: "parent_id",
    onResetView: function (data) {
      $table.treegrid({
        initialState: "collapsed", // 所有节点都折叠
        // initialState: 'expanded',// 所有节点都展开，默认展开
        treeColumn: 1,
        expanderExpandedClass: "glyphicon glyphicon-minus", //图标样式
        expanderCollapsedClass: "glyphicon glyphicon-plus",
        onChange: function () {
          $table.bootstrapTable("resetWidth");
        },
      });
      //只展开树形的第一级节点
      $table.treegrid("getRootNodes").treegrid("expand");
      //App.fixIframeCotent();//修正高度
    },
    onCheck: function (row) {
      var datas = $table.bootstrapTable("getData");
      // 勾选子类
      //selectChilds(datas,row,"menu_id","parent_id",true);
      // 勾选父类
      //selectParentChecked(datas,row,"menu_id","parent_id");

      // 刷新数据
      //$table.bootstrapTable('load', datas);
    },

    onUncheck: function (row) {
      var datas = $table.bootstrapTable("getData");
      //selectChilds(datas,row,"menu_id","parent_id",false);
      //$table.bootstrapTable('load', datas);
    },
    // bootstrap-table-treetreegrid.js 插件配置 -- end
  });
};

// 格式化按钮
function operateFormatter(value, row, index) {
  return [
    '<button type="button" class="RoleOfadd btn-small  btn-primary" style="margin-right:15px;"><i class="fa fa-plus" ></i></button>',
    '<button type="button" class="RoleOfedit btn-small   btn-primary" style="margin-right:15px;"><i class="fa fa-pencil-square-o" ></i></button>',
    '<button type="button" class="RoleOfdelete btn-small   btn-primary" style="margin-right:15px;"><i class="fa fa-trash-o" ></i></button>',
  ].join("");
}

// 格式化类型
function typeFormatter(value, row, index) {
  return menuTypeDic[value] || "-";
}
// 格式化状态
function timeFormatter(value, row, index) {
  return value ? moment(value).format("YYYY-MM-DD HH:mm:ss") : "";
}

//初始化操作按钮的方法
window.operateEvents = {
  "click .RoleOfadd": function (e, value, row, index) {
    const data = {
      parent_id: row.menu_id,
      system_code: row.system_code,
      menu_type: row.menu_type,
      menu_id: row.menu_id,
      type: "add",
    };
    add(data);
  },
  "click .RoleOfdelete": function (e, value, row, index) {
    del(row.menu_id);
  },
  "click .RoleOfedit": function (e, value, row, index) {
    var data = {
      created_at: row.created_at,
      creator_id: row.creator_id,
      is_del: row.is_del,
      menu_flag: row.menu_flag,
      menu_icon: row.menu_icon,
      menu_id: row.menu_id,
      system_code: row.system_code,
      menu_name: row.menu_name,
      menu_url: row.menu_url,
      modified_at: row.modified_at,
      modified_id: row.modified_id,
      parent_id: row.parent_id,
      menu_type: row.menu_type,
      menu_order: row.menu_order,
    };
    update(data);
  },
};
/**
 * 选中父项时，同时选中子项
 * @param datas 所有的数据
 * @param row 当前数据
 * @param id id 字段名
 * @param pid 父id字段名
 */
function selectChilds(datas, row, id, pid, checked) {
  for (var i in datas) {
    if (datas[i][pid] == row[id]) {
      datas[i].check = checked;
      selectChilds(datas, datas[i], id, pid, checked);
    }
  }
}

function selectParentChecked(datas, row, id, pid) {
  for (var i in datas) {
    if (datas[i][id] == row[pid]) {
      datas[i].check = true;
      selectParentChecked(datas, datas[i], id, pid);
    }
  }
}

function getSelections() {
  var selRows = $table.bootstrapTable("getSelections");
  if (selRows.length == 0) {
    new Noty({
      type: "warning",
      layout: "topCenter",
      text: "请选择一条记录",
      timeout: "2000",
    }).show();
    return;
  }

  var postData = [];
  $.each(selRows, function (i) {
    postData.push(this.menu_id);
  });
  return postData;
}

function add(data) {
  const modal = $("#e-dialog-menu");
  $("#e-dialog-menu").modal({
    keyboard: true,
  });
  initForm(modal, data);
}
function del(id) {
  removeData(id);
}
function update(data) {
  const modal = $("#e-dialog-menu");
  $("#e-dialog-menu").modal({
    keyboard: true,
  });
  initForm(modal, data);
}
const initSystemSelect = function () {
  let url = `/menus/tree?tree=0&menu_type=0`;
  $.ajax({
    type: "get",
    url,
    asyc: false,
    error: function (error) {
      new Noty({
        type: "error",
        layout: "topCenter",
        text: "内部错误，请稍后再试",
        timeout: "5000",
      }).show();
    },
    success: function (result) {
      if (result.error) {
        new Noty({
          type: "error",
          layout: "topCenter",
          text: result.msg,
          timeout: "5000",
        }).show();
      } else {
        var res = result.data;
        var auxArr = [];
        auxArr[0] = "<option value='0'>全部系统</option>";
        // 添加选项
        for (var i = 0; i < res.length; i++) {
          const system_code = res[i]["system_code"];
          auxArr[i + 1] =
            "<option value='" +
            system_code +
            "'>" +
            res[i]["menu_name"] +
            "</option>";
        }
        $("#e_system_code").html(auxArr.join(""));
      }
    },
  });
};

var initForm = function (modal, data) {
  let url = `/menus/tree?tree=1&system_code=${data.system_code}&menu_type=${data.menu_type}`;
  if (data.type === "add") {
    url = `/menus/tree?tree=2&menu_id=${data.menu_id}`;
    data.menu_id = 0
  }
  $.ajax({
    type: "get",
    url,
    asyc: false,
    error: function (error) {
      new Noty({
        type: "error",
        layout: "topCenter",
        text: "内部错误，请稍后再试",
        timeout: "5000",
      }).show();
    },
    success: function (result) {
      if (result.error) {
        new Noty({
          type: "error",
          layout: "topCenter",
          text: result.msg || "保存角色失败",
          timeout: "5000",
        }).show();
      } else {
        var res = result.data;
        const auxArr = [];
        auxArr[0] = "<option value='0'>==请选择父级菜单==</option>";

        // 添加选项
        for (let i = 0; i < res.length; i++) {
          const menu_id = res[i]["menu_id"];
          auxArr[i + 1] =
            "<option value='" +
            menu_id +
            "'>" +
            res[i]["menu_name"] +
            "</option>";
        }
        $("#e_parent_id").empty();
        $("#e_parent_id").append($(auxArr.join("")));
        if (data) {
          modal.find(".modal-body input#e_id").val(data.menu_id || 0);
          modal
            .find(".modal-body input#e_system_code")
            .val(data.system_code || "");
          modal.find(".modal-body input#e_menu_name").val(data.menu_name || "");
          modal.find(".modal-body input#e_menu_url").val(data.menu_url || "");
          modal.find(".modal-body input#e_menu_icon").val(data.menu_icon || "");
          modal.find(".modal-body input#e_menu_flag").val(data.menu_flag || "");
          modal.find(".modal-body select#e_type").val(data.menu_type || 0);
          modal
            .find(".modal-body input#e_menu_order")
            .val(data.menu_order || 0);
          // 设置默认选项
          modal.find(".modal-body select#e_parent_id").val(data.parent_id || 0);
        } else {
          modal.find(".modal-body form input").val("");
          modal.find(".modal-body form select").val("0");
        }
      }
    },
  });
};

$("#e-dialog-menu")
  .find(".modal-footer #saveMenu")
  .click(function () {
    console.log(
      $("#e-menu-form").serialize(),
      ' $("#e-menu-form").serialize()'
    );
    $.ajax({
      type: "get",
      url: "/menus/save",
      asyc: false,
      data: $("#e-menu-form").serialize(),
      error: function (error) {
        new Noty({
          type: "error",
          layout: "topCenter",
          text: "内部错误，请稍后再试",
          timeout: "5000",
        }).show();
      },
      success: function (result) {
        if (result.error) {
          new Noty({
            type: "error",
            layout: "topCenter",
            text: result.msg || "保存菜单失败",
            timeout: "2000",
          }).show();
        } else {
          new Noty({
            type: "success",
            layout: "topCenter",
            text: result.msg || "保存成功",
            timeout: "2000",
          }).show();
          $("#e-dialog-menu").modal("hide");
          $table.bootstrapTable("refresh");
          showSidebarMenu();
        }
      },
    });
  });
$("#menu_refresh").on("click", function () {
  $table.bootstrapTable("refresh");
  initSystemSelect();
});

$("#menu_add").on("click", function () {
  $("#e-menu-form")[0].reset();
  $("#e_id").val("0");
  $("#e_parent_id").empty();
  $("#e_parent_id").val("0");
  $("#exampleModalLabel").text("新增系统");
  $("#e-dialog-menu").modal({
    keyboard: true,
  });
});
$("#menu_edit").on("click", function () {
  var ids = getSelections();
  if (ids.length != 1) {
    new Noty({
      type: "warning",
      layout: "topCenter",
      text: "请选择一条记录",
      timeout: "2000",
    }).show();
    return;
  }
  var id = ids[0];
  $.ajax({
    type: "get",
    url: "/menus/detail?menu_id=" + id,
    asyc: false,
    error: function (error) {
      new Noty({
        type: "error",
        layout: "topCenter",
        text: "内部错误，请稍后再试",
        timeout: "5000",
      }).show();
    },
    success: function (result) {
      if (result.error) {
        new Noty({
          type: "error",
          layout: "topCenter",
          text: result.msg || "获取菜单详情失败",
          timeout: "2000",
        }).show();
      } else {
        var modal = $("#e-dialog-menu");
        $("#e-dialog-menu").modal({
          keyboard: true,
        });
        initForm(modal, result.data);
      }
    },
  });
});
var deleteMenuData = function (ids) {
  $.ajax({
    type: "delete",
    url: "/menus/delete",
    asyc: false,
    data: { ids: ids },
    error: function (error) {
      new Noty({
        type: "error",
        layout: "topCenter",
        text: "内部错误，请稍后再试",
        timeout: "5000",
      }).show();
    },
    success: function (result) {
      if (result.error) {
        new Noty({
          type: "error",
          layout: "topCenter",
          text: result.msg || "删除菜单失败",
          timeout: "2000",
        }).show();
      } else {
        new Noty({
          type: "success",
          layout: "topCenter",
          text: result.msg || "删除菜单成功",
          timeout: "2000",
        }).show();
        $table.bootstrapTable("refresh");
      }
    },
  });
};
//批量删除
$("#menu_batch_remove").on("click", function () {
  var ids = getIds();
  if (ids.length == 0) {
    new Noty({
      type: "warning",
      layout: "topCenter",
      text: "至少要选择一条记录",
      timeout: "2000",
    }).show();
    return;
  }
  removeData(ids.join(","));
});

$("#e_system_code").on("change", function () {
  const system_code = $(this).val();
  let url = "/menus/tree";
  if (Number(system_code)) {
    url = `/menus/tree?system_code=${system_code}`;
  }
  $table.bootstrapTable("refresh", {
    url,
    silent: true,
  });
});
var removeData = function (id) {
  var n = new Noty({
    text: "你要继续吗?",
    type: "info",
    closeWith: ["button"],
    layout: "topCenter",
    buttons: [
      Noty.button(
        "YES",
        "btn btn-success",
        function () {
          deleteMenuData(id);
          n.close();
        },
        { id: "button1", "data-status": "ok" }
      ),

      Noty.button("NO", "btn btn-error btn-confirm", function () {
        n.close();
      }),
    ],
  }).show();
};

$(function () {
  initSystemSelect();
  initTable();
});
