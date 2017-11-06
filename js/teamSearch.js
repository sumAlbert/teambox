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
        if(login_lock)
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


    function submit(){
        $.ajax({
            url:"./php/index.php",
            type:"post",
            data:{
                class: "Team",
                action: "findTeam",
                key: "",
                page: page,
                selections:JSON.stringify(submitEL)
            },
            success: function (data) {
                $(".person-search").html("");
                var JSON_data=JSON.parse(data);
                console.log(JSON_data);
                if(JSON_data.state==="Success"){
                    var JSON_users=JSON_data.result.teams;
                    page=JSON_data.result.cur_page;
                    total=JSON_data.result.total_page;
                    pageButtons(page,total);
                    if(JSON_users.length){
                        for(var i=0;i<JSON_users.length;i++){
                            console.log(JSON_users[i].favorite==="yes"?"person-collection":"person-collection-inactive");
                            var $small_card="<div class=\"content-main-person-teams\">\n" +
                                "\t\t\t\t<div class=\"team-card\">\n" +
                                "\t\t\t\t\t<div class=\"team-card-line\">\n" +
                                "\t\t\t\t\t\t<div class=\"team-name\">"+JSON_users[i].projectname.substr(0,8)+"</div>\n" +
                                "\t\t\t\t\t\t<div id=\"star"+i+"\" class=\""+(JSON_users[i].favorite==="yes"?"team-collection":"team-collection-inactive")+"\"></div>\n" +
                                "\t\t\t\t\t</div>\n" +
                                "\t\t\t\t\t<div class=\"team-extra-info\">\n" +
                                "\t\t\t\t\t\t<div class=\"team-date\">"+(JSON_users[i].data||"")+"</div>\n" +
                                "\t\t\t\t\t\t<div class=\"team-aim\">"+JSON_users[i].aim+"</div>\n" +
                                "\t\t\t\t\t</div>\n" +
                                "\t\t\t\t\t<div class=\"team-info-special-name\">项目介绍</div>\n" +
                                "\t\t\t\t\t<div class=\"team-info-intro\">"+JSON_users[i].introduction+"</div>\n" +
                                "\t\t\t\t\t<div class=\"team-info-special-name\">项目需求</div>\n" +
                                "\t\t\t\t\t<div class=\"team-info-need\">"+JSON_users[i].requirement+"</div>\n" +
                                "\t\t\t\t\t<div class=\"team-info-special-name\">联系方式</div>\n" +
                                "\t\t\t\t\t<div class=\"team-info-email\">"+JSON_users[i].email+"</div>\n" +
                                "\t\t\t\t\t<div class=\"team-info-tel\">"+JSON_users[i].phone+"</div>\n" +
                                "\t\t\t\t</div>\n" +
                                "\t\t\t</div>";
                            $(".person-search").append($small_card);
                            $("#star"+i).on("click",["team",JSON_users[i].id,i],function (event) {
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
                                        if($("#star"+event.data[2]).attr("class")==="team-collection-inactive"){
                                            $("#star"+event.data[2]).addClass("team-collection");
                                            $("#star"+event.data[2]).removeClass("team-collection-inactive");
                                        }else{
                                            $("#star"+event.data[2]).removeClass("team-collection");
                                            $("#star"+event.data[2]).addClass("team-collection-inactive");
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
                        console.log(JSON_users.favorite);
                        var $small_card="<div class=\"content-main-person-teams\">\n" +
                            "\t\t\t\t<div class=\"team-card\">\n" +
                            "\t\t\t\t\t<div class=\"team-card-line\">\n" +
                            "\t\t\t\t\t\t<div class=\"team-name\">"+JSON_users.projectname.substr(0,8)+"</div>\n" +
                            "\t\t\t\t\t\t<div id=\"star\""+0+" class=\""+(JSON_users.favorite==="yes"?"team-collection":"team-collection-inactive")+"\"></div>\n" +
                            "\t\t\t\t\t</div>\n" +
                            "\t\t\t\t\t<div class=\"team-extra-info\">\n" +
                            "\t\t\t\t\t\t<div class=\"team-date\">"+(JSON_users.data||"")+"</div>\n" +
                            "\t\t\t\t\t\t<div class=\"team-aim\">"+JSON_users.aim+"</div>\n" +
                            "\t\t\t\t\t</div>\n" +
                            "\t\t\t\t\t<div class=\"team-info-special-name\">项目介绍</div>\n" +
                            "\t\t\t\t\t<div class=\"team-info-intro\">"+JSON_users.introduction+"</div>\n" +
                            "\t\t\t\t\t<div class=\"team-info-special-name\">项目需求</div>\n" +
                            "\t\t\t\t\t<div class=\"team-info-need\">"+JSON_users.requirement+"</div>\n" +
                            "\t\t\t\t\t<div class=\"team-info-special-name\">联系方式</div>\n" +
                            "\t\t\t\t\t<div class=\"team-info-email\">"+JSON_users.email+"</div>\n" +
                            "\t\t\t\t\t<div class=\"team-info-tel\">"+JSON_users.phone+"</div>\n" +
                            "\t\t\t\t</div>\n" +
                            "\t\t\t</div>";
                        $(".person-search").append($small_card);
                        $("#star0").on("click",["team",JSON_users.id,0],function (event) {
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
                                    if($("#star"+event.data[2]).attr("class")==="team-collection-inactive"){
                                        $("#star"+event.data[2]).addClass("team-collection");
                                        $("#star"+event.data[2]).removeClass("team-collection-inactive");
                                    }else{
                                        $("#star"+event.data[2]).removeClass("team-collection");
                                        $("#star"+event.data[2]).addClass("team-collection-inactive");
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