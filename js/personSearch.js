$(document).ready(function(){

	/*提交的元素*/
	var submitEL=[];
	var page=1;
	var total=1;
	/*锁，避免多次运行*/
	var hover_lock=false;
	var login_lock=false;


    submit();

	/*标题栏右边的菜单*/
	$(".person-menu").hover(function(){
		if(login_lock){
            if(!hover_lock)
            {
                hover_lock=true;

                $(".person-menu-hidden").fadeIn(50);
                $(".person-menu-hidden").animate({height:'7em'},100,function(){
                    hover_lock=false;
                });
            }
		}
	},function(){
		$(".person-menu-hidden").animate({height:'0em'},200);
		$(".person-menu-hidden").fadeOut(100);
	});

	$(".flag-page-catalog").hover(function () {
		$(".flag-page-catalog").removeClass("flag-page-catalog-active");
        var $active_class="flag-page-items-"+$(this).attr("data-save");
		$(this).addClass("flag-page-catalog-active");
		$(".flag-page-items").removeClass("flag-page-items-active");
		$("."+$active_class).addClass("flag-page-items-active");
    });
	
	$(".radio").click(function () {
		if($(this).attr("class").length===5){
			$(this).addClass("radio-active");
			submitEL.push($(this).next().html());
		}
		else{
            $(this).removeClass("radio-active");
            let submitSingle=$(this).next().html();
            submitEL=submitEL.filter(function (v) {
				if(v===submitSingle){
					return false;
				}
				else{
					return true;
				}
            });
		}
		submit();
    });
	$(".page-search-icon").click(function () {
		submit();
    });

	function submit(){
		$.ajax({
            url:"./php/index.php",
            type:"post",
            data:{
                class: "User",
                action: "findPerson",
				key: $("#person-search-123").val()||"",
				page: page,
                selections:JSON.stringify(submitEL)
            },
			success: function (data) {
                $(".person-search").html("");
				var JSON_data=JSON.parse(data);
				console.log(JSON_data);
				if(JSON_data.state==="Success"){
					var JSON_users=JSON_data.result.users;
					page=JSON_data.result.cur_page;
					total=JSON_data.result.total_page;
					pageButtons(page,total);
					if(JSON_users.length){
                        for(var i=0;i<JSON_users.length;i++){
                            var $small_card="<div class=\"person-card\">\n" +
                                "\t\t\t\t<div class=\"person-card-line\">\n" +
                                "\t\t\t\t\t<div class=\"person-name\">"+(JSON_users[i].username||"匿名")+"</div>\n" +
                                "\t\t\t\t\t<div class=\"person-hot\"></div>\n" +
                                "\t\t\t\t\t\t<div id=\"star"+i+"\" class=\""+(JSON_users[i].favorite==="yes"?"person-collection":"person-collection-inactive")+"\"></div>\n" +
                                "\t\t\t\t</div>\n" +
                                "\t\t\t\t<div class=\"person-extra-info\">\n" +
                                "\t\t\t\t\t<div class=\"person-gender\">女</div>\n" +
                                "\t\t\t\t\t<div class=\"person-school\">"+JSON_users[i].school+"</div>\n" +
                                "\t\t\t\t</div>\n" +
                                "\t\t\t\t<div class=\"person-info-special-name\">个人特长</div>\n" +
                                "\t\t\t\t<div class=\"person-info-special\">"+JSON_users[i].other+"</div>\n" +
                                "\t\t\t\t<div class=\"person-info-special-name\">个人经历</div>\n" +
                                "\t\t\t\t<div class=\"person-info-experience\">"+JSON_users[i].experience+"</div>\n" +
                                "\t\t\t\t<div class=\"person-info-special-name\">联系方式</div>\n" +
                                "\t\t\t\t<div class=\"person-info-email\">"+JSON_users[i].email+"</div>\n" +
                                "\t\t\t</div>";
                            $(".person-search").append($small_card);
                            $("#star"+i).on("click",["user",JSON_users[i].id,i],function (event) {
                                $.ajax({
                                    url:"./php/index.php",
                                    type:"post",
                                    data:{
                                        class: "User",
                                        action: "favoriteChange",
                                        type: event.data[0],
                                        id: event.data[1]
                                    },
                                    success: function(data){
                                        var JSON_data=JSON.parse(data);
                                        console.log(JSON_data);
                                        console.log("#star"+event.data[2]);
                                        if($("#star"+event.data[2]).attr("class")==="person-collection-inactive"){
                                            $("#star"+event.data[2]).addClass("person-collection");
                                            $("#star"+event.data[2]).removeClass("person-collection-inactive");
                                        }else{
                                            $("#star"+event.data[2]).removeClass("person-collection");
                                            $("#star"+event.data[2]).addClass("person-collection-inactive");
                                        }
                                    },
                                    error: function (data) {
                                        console.log("添加失败");
                                    }
                                })
                            })
                        }
					}
					else{
						var $small_card="<div class=\"person-card\">\n" +
							"\t\t\t\t<div class=\"person-card-line\">\n" +
							"\t\t\t\t\t<div class=\"person-name\">"+(JSON_users.username||"匿名")+"</div>\n" +
							"\t\t\t\t\t<div class=\"person-hot\"></div>\n" +
                            "\t\t\t\t\t\t<div id=\"star\""+0+" class=\""+(JSON_users.favorite==="yes"?"person-collection":"person-collection-inactive")+"\"></div>\n" +
							"\t\t\t\t</div>\n" +
							"\t\t\t\t<div class=\"person-extra-info\">\n" +
							"\t\t\t\t\t<div class=\"person-gender\">女</div>\n" +
							"\t\t\t\t\t<div class=\"person-school\">"+JSON_users.school+"</div>\n" +
							"\t\t\t\t</div>\n" +
							"\t\t\t\t<div class=\"person-info-special-name\">个人特长</div>\n" +
							"\t\t\t\t<div class=\"person-info-special\">"+JSON_users.other+"</div>\n" +
							"\t\t\t\t<div class=\"person-info-special-name\">个人经历</div>\n" +
							"\t\t\t\t<div class=\"person-info-experience\">"+JSON_users.experience+"</div>\n" +
							"\t\t\t\t<div class=\"person-info-special-name\">联系方式</div>\n" +
							"\t\t\t\t<div class=\"person-info-email\">"+JSON_users.email+"</div>\n" +
							"\t\t\t</div>";
						$(".person-search").append($small_card);
                        $("#star"+0).on("click",["user",JSON_users.id,0],function (event) {
                            $.ajax({
                                url:"./php/index.php",
                                type:"post",
                                data:{
                                    class: "User",
                                    action: "favoriteChange",
                                    type: event.data[0],
                                    id: event.data[1]
                                },
                                success: function(data){
                                    var JSON_data=JSON.parse(data);
                                    console.log(JSON_data);
                                    if($("#star"+event.data[2]).attr("class")==="person-collection-inactive"){
                                        $("#star"+event.data[2]).addClass("person-collection");
                                        $("#star"+event.data[2]).removeClass("person-collection-inactive");
                                    }else{
                                        $("#star"+event.data[2]).removeClass("person-collection");
                                        $("#star"+event.data[2]).addClass("person-collection-inactive");
                                    }
                                },
                                error: function (data) {
                                    console.log("添加失败");
                                }
                            })
                        })
					}
				}
            },
			error: function () {
				console.log("false");
            }
		});
	}

	function pageButtons(current,total){
        $(".page-changes").html("");
        var len=(total>=8)?10:total+2;
        var stop_current=total-7;
        if(current==1||current==2||current==3){
        	var start_flag=0;
		}
		else{
            if(total>8)
                var start_flag=(current-2>=stop_current?stop_current-1:current-3);
            else
                var start_flag=0;
		}
        for(var i=start_flag;i<len+start_flag;i++){
        	if(i===start_flag){
				$(".page-changes").append("<div class=\"page-change-item\">"+"<"+"</div>\n");
			}
			else if(i===len+start_flag-1){
                $(".page-changes").append("<div class=\"page-change-item\">"+">"+"</div>\n");
        	}
			else{
                if(i!=current)
                	$(".page-changes").append("<div class=\"page-change-item\">"+i+"</div>\n");
                else
                    $(".page-changes").append("<div class=\"page-change-item page-change-item-active\">"+i+"</div>\n");
			}
        }
        $(".page-change-item").on("click",pageSwitch);
	}

	function pageSwitch(){
		if($(this).html()=="&lt;"){
			if(page>1)
				page=page-0-1;
		}
		else if($(this).html()=="&gt;"){
			if(page<total)
                page=page-0+1;
		}
		else{
			page=$(this).html();
		}
		submit();
	}

    initLoginState=function initd(state,data){
        console.log(data);
        if(state){
        	login_lock=true;
            $(".person-info-name").html(data.username);
        }
        else{
        	login_lock=false;
            $(".person-info-name").html("登录");
            $(".person-info-name").on("click",function () {
				window.location.href="signup.html";
            });
            $(".person-info-logo").hide();
        }
    };
});