(function (angular) {
	'use strict';
// 应用程序的主要模块
	var myApp = angular.module('todoMvc',[]);
    // 注册主控制器
    myApp.controller('MainController',['$scope',function ($scope) {
        // 文本框模型
        $scope.text = '';

        // 任务列表模型
        $scope.todos = [
            {id:1,text:'sleep',completed:true},
            {id:2,text:'study',completed:false},
            {id:3,text:'play',completed:true}
        ];

        // 添加todo
        $scope.add = function(){

            if(!$scope.text){              //如果输入为空，则不往下执行
                return;
            }

            $scope.todos.push({              //每次调用往todos数组添加一个元素
               id:Math.random(),
               text:$scope.text,
               completed:false
            });

            $scope.text = '';                 //添加完之后清空输入框
        };

        //删除todo
        $scope.remove = function(id){

            for (var i = 0;i < $scope.todos.length; i++){
                if($scope.todos[i].id === id){           //定位到id与传入id相等的元素
                    $scope.todos.splice(i,1);               //从该元素开始往后删除一个元素
                    break;
                }
            }

        }

        // 清除已完成的任务
        $scope.clearDown = function(){
            var result = [];                                //定义一个数组用来存储未完成的todo
            for (var i = 0;i < $scope.todos.length; i++){
                if(!$scope.todos[i].completed){
                    result.push($scope.todos[i]);            //把未完成的todo存入数组
                }
            }
           $scope.todos = result;                              //用新数组覆盖原来的数组
        }

        //判断是否有已完成的todo，决定是否显示clear completed按钮
        $scope.exitDown = function(){
            for (var i = 0;i < $scope.todos.length; i++){
                if($scope.todos[i].completed){
                    return true;
                }
            }
            return false;
        }

        // 单击进入可编辑状态
        $scope.currentId = -1;
        $scope.editing = function (id){   //将选中元素的id存入
            $scope.currentId = id;
        }

        // 退出编辑状态
        $scope.exitEditing = function(){
            $scope.currentId = -1;
        }

        //全选
        var now = true;
        $scope.toggleAll = function(){
            for (var i = 0;i < $scope.todos.length; i++){
                $scope.todos[i].completed = now;
            }
            now = !now;
        }

        //判断todo完成
        $scope.flag = '';
        $scope.isDown = function(flag){
            $scope.flag = flag;
        }

    }])

})(angular);
