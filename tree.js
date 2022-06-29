define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'tree/index' + location.search,
                    add_url: 'tree/add',
                    add_url: 'tree/tianj',
                    edit_url: 'tree/edit',
                    del_url: 'tree/del',
                    multi_url: 'tree/multi',
                    import_url: 'tree/import',
                    table: 'tree',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                fixedColumns: true,
                fixedRightNumber: 1,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('id')},
                        {field: 'pid', title: __('Pid')},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'tongji', title: __('Tongji'), operate: 'LIKE'},
                        {field: 'info', title: __('Info'), operate: 'LIKE'},
                        {field: 'operate', title: __('Operate'), 
                            table: table, 
                            events: Table.api.events.operate, 
                            formatter: Table.api.formatter.operate,
                            buttons:[
                                        {
                                            name: 'butadd',
                                            classname: 'btn btn-xs btn-success btn-dialog',
                                            icon: 'fa fa-plus',
                                            url: 'tree/add',
                                            //设置弹出窗口大小                                        
                                            extend:'data-aree=\'["300px","200px"]\'',//受css影响此处不起作用
                                            //$(".btn-add").data("area", ["200px","150px"]);
                                            callback: function (data) {
                                                Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                            },
                                            visible: function (row) {
                                                //返回true时按钮显示,返回false隐藏
                                                return true;
                                            },
                                        },
                                    ],

                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

        },
        add: function () {
            //Fast.config.openArea = ['200px', '150px']; //设置弹出窗口大小,在这里不起作用,不知道要放到哪里
              
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {

                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});

