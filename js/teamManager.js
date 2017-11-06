$(document).ready(function(){
	/*提交的元素*/

	/*锁，避免多次运行*/
	var hover_lock=false;
	/*标题栏右边的菜单*/
	$(".person-menu").hover(function(){
		if(!hover_lock)
		{	
			hover_lock=true;
			$(".person-menu-hidden").fadeIn(50);
			$(".person-menu-hidden").animate({height:'7em'},100,function(){
				hover_lock=false;
			});
		}
	},function(){
		$(".person-menu-hidden").animate({height:'0em'},200);
		$(".person-menu-hidden").fadeOut(100);
	});
    $('#startDataPicker').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        autoclose: true,
        minView: "hour"
    }).on('changeDate',function (ev) {
        $(".start-time > span").html(ev.date.getFullYear()+"-"+ev.date.getMonth()+"-"+ev.date.getDay()+" "+ev.date.getHours()+":"+ev.date.getMinutes());
    });
    $('#stopDataPicker').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        autoclose: true,
        minView: "hour"
    }).on('changeDate',function (ev) {
        $(".stop-time > span").html(ev.date.getFullYear()+"-"+ev.date.getMonth()+"-"+ev.date.getDay()+" "+ev.date.getHours()+":"+ev.date.getMinutes());
    });
    $(".window-prompt-line1-item3").click(function () {
        $(".main-hidden").addClass("main-hidden-display");
    });
    $(".content-add-task").click(function () {
        $(".main-hidden").removeClass("main-hidden-display");
    });
    $(".window-prompt-line4").click(function () {
        var locationDate = new Date();
        $.ajax({
            url:"./php/index.php",
            type:"post",
            data:{
                class: "Team",
                action: "setTask",
                teamId: window.location.search.split("=")[1],
                date: locationDate.getFullYear()+"-"+locationDate.getMonth()+"-"+locationDate.getDay(),
                starttime:$(".start-time > span").html(),
                endtime: $(".stop-time > span").html(),
                taskname: $(".window-prompt-line1-item2").val(),
                task: $(".window-prompt-line2-item1").val(),
                importance: 3
            },
            success: function (data) {
                var JSON_data=JSON.parse(data);
                console.log(JSON_data);
                $(".main-hidden").addClass("main-hidden-display");
            },
            error:function () {
                console.log("获取用户信息失败");
            }
        })
    });

    initLoginState=function initd(state,data){
        console.log(data);
        if(state){
            $(".person-info-name").html(data.username);
            $.ajax({
                url:"./php/index.php",
                type:"post",
                data:{
                    class: "Team",
                    action: "members",
					id: window.location.search.split("=")[1]
                },
                success: function (data) {
                    var JSON_data=JSON.parse(data);
                    console.log(JSON_data);
                    if(JSON_data.state==="Success"){
                        var JSON_result=JSON_data.result;
                        for(var i=0;i<JSON_result.length;i++){
                        	var $small_member="\t\t\t\t<div class=\"content-member\">\n" +
                                "\t\t\t\t\t<img src=\"./images/teamManager/"+color[i%4]+"\" class=\"img-avatar\">\n" +
                                "\t\t\t\t\t<div class=\"content-member-infos\">\n" +
                                "\t\t\t\t\t\t<div class=\"content-member-name\">"+JSON_result.username+"</div>\n" +
                                "\t\t\t\t\t\t<div class=\"content-member-email\">"+JSON_result.email+"</div>\n" +
                                "\t\t\t\t\t</div>\n" +
                                "\t\t\t\t</div>";
                        	$(".content-members-add").append($small_member);
						}
                    }
                },
                error:function () {
                    console.log("获取用户信息失败");
                }
            })
        }
        else{
            alert("登陆失败，请重新登陆");
            window.location.href="index.html";
        }
    };
});