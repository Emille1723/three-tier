$(document).ready(function () {
    var replyVal = false;//test if replies
   
    var ID; //store userID from object
    var users;//store username from object
    //If user hasn't selected to keep them logged in.
    var tempUserOBJ = sessionStorage.getItem("loggedUserTemp");
    var tempobj = JSON.parse(tempUserOBJ);
    //END

    //IF user has selected to keep them logged in.
    var permUserOBJ = localStorage.getItem("loggedUserPerm");
    var permobj = JSON.parse(permUserOBJ);
    //END

    //TIME
    var date = new Date();
    var mnth = "";
    var hour = "";
    var corect_hour = "";
    var minutes = "";
    var dt = date.getDate();
    var month = date.getMonth();
    mnth = function setMonth() {
        if (month == 0) {
            mnth = "January";
        }
        else if (month == 1) {
            mnth = "Febuary";
        }
        else if (month == 2) {
            mnth = "March";
        }
        else if (month == 3) {
            mnth = "April";
        }
        else if (month == 4) {
            mnth = "May";
        }
        else if (month == 5) {
            mnth = "June";
        }
        else if (month == 6) {
            mnth = "July";
        }
        else if (month == 7) {
            mnth = "August";
        }
        else if (month == 8) {
            mnth = "September";
        }
        else if (month == 9) {
            mnth = "October"
        }
        else if (month == 10) {
            mnth = "November";
        }
        else {
            mnth = "December";
        }
        return mnth;
    };
    var year = date.getFullYear();
    var theDate = dt + "  " + mnth() + ", " + year;
    hour = date.getHours();
    minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (minutes == 0) {
        minutes = "00";
    }
    var theTime = hour + ":" + minutes;
    //END TIME

    //redirect if null
    if (tempobj != null) {
        users = tempobj.userName;
        $('.user_name').html(users);
        $('.user_name_bubble').html(users);
        $('.user_ball_name').html(users);
        if (tempobj.userImg.length != 0) {
            $('.user_pic').css({
                "background-image": "url(" + tempobj.userImg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
            $('.user_pic_larger').css({
                "background-image": "url(" + tempobj.userImg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
            $('.user_ball').css({
                "background-image": "url(" + tempobj.userImg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
            $('.user_title_img').css({
                "background-image": "url(" + tempobj.userImg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
        }
    }
    else  if (permobj != null) {
        users = permobj.userName;
        $('.user_name').html(users);
        $('.user_name_bubble').html(users);
        $('.user_ball_name').html(users);
        if (permobj.userImg.length != 0) {
            $('.user_pic').css({
                "background-image": "url(" + permobj.userImg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
            $('.user_pic_larger').css({
                "background-image": "url(" + permobj.userImg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
            $('.user_ball').css({
                "background-image": "url(" + permobj.userImg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
            $('.user_title_img').css({
                "background-image": "url(" + permobj.userImg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
        }
    }
    else {
        window.location.href = ("Homepage.aspx");
    }

    //display all posts and replies
    var displayAllPosts = function () {
        var yo = " ";//null value I pass to ajax request to return posts array I was getting some problems using ajax get request
        $.ajax({
            method: 'post',
            url: 'userHomepage.aspx/allPosts',
            contentType: 'application/json',
            data: JSON.stringify({ 'emille': yo }),
            dataType: 'json',
            success: function (data) {
                $('.posts_section_cont').empty();
                for (i = 0; i < data.d.length; i++) {
                    var theID = " ";
                    var u_p = $("<div class='user_post'></div>");
                    var pID = $("<div class='postID_wrapper'></div>");
                    u_p.append(pID);
                    var hiddenID = $("<asp:HiddenField runat='server'></asp:HiddenField>");
                    pID.append(hiddenID);
                    var hiddenVal = hiddenID.val(data.d[i].postid);
                    var wrapper = $("<div class='user_post_img_wrapper'></div>");
                    u_p.append(wrapper);
                    var img = $("<div class='user_post_img'></div>");
                    wrapper.append(img);
                    if (data.d[i].uimg.length != 0) {
                        img.css({
                            "background-image": "url(" + data.d[i].uimg + ")",
                            "background-size": "cover",
                            "background-position": "top center"
                        });
                    }
                    var name = $("<p class='user_post_uname u_post_txt'></p>");
                    name.html(data.d[i].unm);
                    wrapper.append(name);
                    var date = $("<p class='user_post_date u_post_txt'></p>");
                    wrapper.append(date);
                    date.html(data.d[i].udate);
                    var time = $("<span class='user_post_time u_post_txt'></span>");
                    wrapper.append(time);
                    time.html(data.d[i].utime);
                    var title = $("<p class='user_post_title'></p>");
                    u_p.append(title);
                    title.html(data.d[i].utitle);
                    var post = $("<p class='user_post_text'></p>");
                    u_p.append(post);
                    post.html(data.d[i].upost);
                    var r_c = $("<div class='replyCont'></div>");
                    u_p.append(r_c);
                    var r_c_s = $("<div class='replies_count_section'></div>");
                    r_c.append(r_c_s);
                    var r_counter_cont = $("<p class='replies_counter'></p>");
                    r_c_s.append(r_counter_cont);
                    var r_drop = $("<button class='replyDrop'></button>");
                    r_c_s.append(r_drop);
                    var u_r = $("<div class='user_replies'></div>");
                    r_c.append(u_r);
                    var r_box_cont = $("<div class='replyTxtBoxCont'></div>");
                    r_c.append(r_box_cont);
                    var r_u_i = $("<div class='r_user_img'></div>");
                    r_box_cont.append(r_u_i);
                    if (tempobj != null) {
                        if (tempobj.userImg.length != 0) {
                            r_u_i.css({
                                "background-image": "url(" + tempobj.userImg + ")",
                                "background-size": "cover",
                                "background-position": "top center",
                                "box-shadow": "0px 0px 1px 1px rgba(0,0,0,.2)"
                            });
                        }
                    }
                    if (permobj != null) {
                        if (permobj.userImg.length != 0) {
                            r_u_i.css({
                                "background-image": "url(" + permobj.userImg + ")",
                                "background-size": "cover",
                                "background-position": "top center",
                                "box-shadow": "0px 0px 1px 1px rgba(0,0,0,.2)"
                            });
                        }
                    }
                    //I was getting problems using appended aspx controls any none aspx controls used are because of this problem
                    //var r_box = $("<input type='text' class='replyTxtbox' autocomplete='off' placeholder='Write a Comment...'/>");
                    //var r_box = $('<asp:TextBox class="replyTxtbox" autocomplete="off" placeholder="Write a Comment..." TextMode="MultiLine" runat="server"></asp:TextBox>');
                    var r_box = $("<textarea class='replyTxtbox' autocomplete='off' placeholder='Write a Comment...'></textarea>");
                    r_box_cont.append(r_box);
                    var r_post = $("<button class='replyBtn'></button>");
                    r_box_cont.append(r_post);
                    var r_post_error = $("<div class='replyPrompt'></div>");
                    r_post.append(r_post_error);
                    $(u_p).prependTo('.posts_section_cont');
                    theID = JSON.stringify(data.d[i].postid);
                    displayAllReplies(theID, u_r, r_counter_cont);
                }
                $('.replyDrop').click(function (event) {
                    event.preventDefault();
                    var dropClicked = $(this);
                    dropClicked.parents().children('.user_replies').toggleClass('user_replies_opened');
                });
                $('.replyTxtbox').on('propertychange input', function replyTest(event) {
                    var txtbox = $(this);
                    var btn = txtbox.siblings('.replyBtn');
                    var userReply = txtbox.val();
                    function replyCheck() {
                        var r_valid = false;
                        var rply_check = /^[a-zA-Z0-9!@?/()#',*$^.:;\n ]{2,140}$/;
                        if (userReply.length < 2) {
                            btn.css({ "background-color": "rgba(220,20,60,1)" });
                            btn.children('.replyPrompt').addClass('replyPrompt_active').removeClass('replyPrompt_active_resize').html("Too Short!");
                            var r_valid = false;
                        }
                        else if (userReply.length > 140) {
                            btn.css({ "background-color": "rgba(220,20,60,1)" });
                            btn.children('.replyPrompt').addClass('replyPrompt_active').removeClass('replyPrompt_active_resize').html("Too Long!");
                            var r_valid = false;
                        }
                        else if (!rply_check.test(userReply)) {
                            btn.css({ "background-color": "rgba(220,20,60,1)" });
                            btn.children('.replyPrompt').addClass('replyPrompt_active').addClass('replyPrompt_active_resize').html("Invalid Format!");
                            var r_valid = false;
                        }
                        else {
                            btn.css({ "background-color": "rgba(26,177,133,1)" });
                            btn.children('.replyPrompt').removeClass('replyPrompt_active').removeClass('replyPrompt_active_resize');
                            var r_valid = true;
                        }
                        return r_valid;
                    }
                    replyCheck();
                    replyVal = replyCheck();
                });
                $('.replyTxtbox').blur(function (event) {
                    var btn = $(this).siblings('.replyBtn');
                    var userReply = $(this).val();
                    if (userReply.length == 0) {
                        btn.css({ "background-color": "rgba(58,148,178,1)" });
                        btn.children('.replyPrompt').removeClass('replyPrompt_active').removeClass('replyPrompt_active_resize');
                    }
                });
                $('.replyBtn').click(function (event) {
                    event.preventDefault();
                    var y = "";
                    var btnClicked = $(this);
                    var thePostID = btnClicked.parents('.user_post').children('.postID_wrapper').children().val();
                    if (replyVal == false) {
                        btnClicked.css({ "background-color": "rgba(220,20,60,1)" });
                    }
                    else if(replyVal == true){
                        var uReply = btnClicked.parents().children('.replyTxtbox').val();
                        var rpostID = btnClicked.parents().children('.postID_wrapper').children().val();
                        var counter_cont = btnClicked.parents().children('.replyCont').children('.replies_count_section').children('.replies_counter');
                        var username = users;
                        $.ajax({
                            method: 'post',
                            url: 'userHomepage.aspx/addReply',
                            contentType: 'application/json',
                            data: JSON.stringify({ 'postID': rpostID, 'username': username, 'rDate': theDate, 'rTime': theTime, 'Reply': uReply }),
                            dataType: 'json',
                            context:counter_cont,
                            success: function (replyData) {
                                counter_cont.html(replyData.d.count);
                                function addReply(replyData) {
                                    var replyTxt = replyData.d.userReply;
                                    var replies = $("<div class='replies'></div>");
                                    replies.addClass('replies_active');
                                    var replied_user = $(" <span class='replied_user_inactive'></span>");
                                    replied_user.addClass('replied_user');
                                    replies.append(replied_user);
                                    if (replyData.d.imgSrc.length != 0) {
                                            replied_user.css({
                                                "background-image": "url(" + replyData.d.imgSrc + ")",
                                                "background-size": "cover",
                                                "background-position": "top center"
                                            });
                                    }
                                    var replied_user_name = $("<p class='replied_user_name'></p>");
                                    replied_user_name.html(replyData.d.username);
                                    replies.append(replied_user_name);
                                    var reply = $("<p class='reply_inactive'></p>");
                                    reply.addClass('reply');
                                    reply.html(replyTxt);
                                    replies.append(reply);
                                    var r_date_time = $("<span class='reply_date_time_inactive'></span>");
                                    r_date_time.addClass('reply_date_time');
                                    r_date_time.html(replyData.d.replyDate + " @ " + replyData.d.replyTime);
                                    replies.append(r_date_time);
                                    $(replies).fadeIn(600).appendTo(btnClicked.parent().siblings('.user_replies'));
                                    btnClicked.parent().siblings('.user_replies').addClass('user_replies_opened');
                                    var replyHolder = btnClicked.parent().siblings('.user_replies_opened');
                                    var items = replyHolder[0].scrollHeight;
                                    replyHolder.animate({
                                        scrollTop: items
                                    }, 600);
                                    btnClicked.siblings('.replyTxtbox').val("");
                                    btnClicked.css({ "background-color": "rgba(58,148,178,1)" });
                                    replyVal = false;
                                };
                                addReply(replyData);
                                replyVal == false;
                            },
                            failure: function (error) {
                                alert(error.d);
                            }
                        });
                    }
                });
            },
            error: function (error) {
                alert("nop");
                alert(error.d);
            }
        });
    };
    displayAllPosts();
    var displayAllReplies = function (postID, replyContainer, replyCounter) {
        var thepostID = JSON.parse(postID);
        $.ajax({
            method: 'post',
            url: 'userHomepage.aspx/allReplies',
            contentType: 'application/json',
            data: JSON.stringify({ 'postID': thepostID }),
            dataType: 'json',
            context: {'replyContainer':replyContainer, 'replyCounter':replyCounter},
            success: function (Allreplies) {
                //alert("replies hit!");
                for (i = 0; i < Allreplies.d.length; i++) {
                    var replies = $("<div class='replies'></div>");
                    replies.addClass('replies_active');
                    var replied_user = $(" <span class='replied_user_inactive'></span>");
                    replied_user.addClass('replied_user');
                    replies.append(replied_user);
                    if (Allreplies.d[i].imgSrc.length != 0) {
                        replied_user.css({
                            "background-image": "url(" + Allreplies.d[i].imgSrc + ")",
                            "background-size": "cover",
                            "background-position": "top center"
                        });
                    }
                    var replied_user_name = $("<p class='replied_user_name'></p>");
                    replied_user_name.html(Allreplies.d[i].username);
                    replies.append(replied_user_name);
                    var reply = $("<p class='reply_inactive'></p>");
                    reply.addClass('reply');
                    reply.html(Allreplies.d[i].userReply);
                    replies.append(reply);
                    var r_date_time = $("<span class='reply_date_time_inactive'></span>");
                    r_date_time.addClass('reply_date_time');
                    r_date_time.html(Allreplies.d[i].replyDate + " @ " + Allreplies.d[i].replyTime);
                    replies.append(r_date_time);
                    replyCounter.html(Allreplies.d[i].count);
                    $(replies).appendTo(replyContainer);
                }
            },
            failure: function (error) {
                alert(error.d);
            }
        });
    };
    var addPost = function (suc) {
        var u_p = $("<div class='user_post'></div>");
        var pID = $("<div class='postID_wrapper'></div>");
        u_p.append(pID);
        var hiddenID = $("<asp:HiddenField runat='server'></asp:HiddenField>")
        pID.append(hiddenID);
        var hiddenVal = hiddenID.val(suc.d.id);
        var wrapper = $("<div class='user_post_img_wrapper'></div>");
        u_p.append(wrapper);
        var img = $("<div class='user_post_img'></div>");
        wrapper.append(img);
        if (suc.d.uimg.length != 0) {
            img.css({
                "background-image": "url(" + suc.d.uimg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
        }
        var name = $("<p class='user_post_uname u_post_txt'></p>");
        wrapper.append(name);
        name.html(suc.d.unm);
        var date = $("<p class='user_post_date u_post_txt'></p>");
        wrapper.append(date);
        date.html(suc.d.udate);
        var time = $("<span class='user_post_time u_post_txt'></span>");
        wrapper.append(time);
        time.html(suc.d.utime);
        var title = $("<p class='user_post_title'></p>");
        u_p.append(title);
        title.html(suc.d.utitle);
        var post = $("<p class='user_post_text'></p>");
        u_p.append(post);
        post.html(suc.d.upost);
        var r_c = $("<div class='replyCont'></div>");
        u_p.append(r_c);
        var r_c_s = $("<div class='replies_count_section'></div>");
        r_c.append(r_c_s);
        var r_counter = $("<p class='replies_counter'></p>");
        r_counter.html();
        var r_drop = $("<button class='replyDrop'></button>");
        r_c_s.append(r_drop);
        var r_box_cont = $("<div class='replyTxtBoxCont'></div>");
        r_c.append(r_box_cont);
        var r_u_i = $("<div class='r_user_img'></div>");
        r_box_cont.append(r_u_i);
        if (tempobj != null) {
            if (tempobj.userImg.length != 0) {
                r_u_i.css({
                    "background-image": "url(" + tempobj.userImg + ")",
                    "background-size": "cover",
                    "background-position": "top center",
                    "box-shadow": "0px 0px 1px 1px rgba(0,0,0,.2)"
                });
            }
        }
        if (permobj != null) {
            if (permobj.userImg.length != 0) {
                r_u_i.css({
                    "background-image": "url(" + permobj.userImg + ")",
                    "background-size": "cover",
                    "background-position": "top center",
                    "box-shadow": "0px 0px 1px 1px rgba(0,0,0,.2)"
                });
            }
        }
        var r_box = $("<textarea class='replyTxtbox' autocomplete='off' placeholder='Write a Comment...'></textarea>");
        r_box_cont.append(r_box);
        var r_post = $("<button class='replyBtn'></button>");
        r_box_cont.append(r_post);
        $(u_p).fadeIn(600).prependTo("#posts_section");
    };
   
    //I'm refreshing the posts every 30 seconds
    var pageRefresh = setInterval(function () {
        displayAllPosts();
    }, 500000);
    //end display all posts

    $(window).load(function () {
        $('.uh_preloader').delay(1500).fadeOut("slow");
        $(window).scroll(function () {
            var ypos = $(window).scrollTop();
            if (ypos > 0) {
                $('.uh_top').css({
                    "opacity": "1",
                    "cursor":"pointer"
                });
            }
            else {
                $('.uh_top').css({
                    "opacity": "0",
                    "cursor":"auto"
                });
            }
        });
        $('.uh_top').click(function (event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, 600);
        });
        $('#postBtn').click(function (event) {
            event.preventDefault();
            $('#uh_wrapper').toggleClass('uh_wrapper');
            $('#uh_cover').toggleClass('uh_cover');
            $('#modal_wrapper').toggleClass('modal_wrapper');
            $('.post_Modal').toggleClass('post_Modal_appear');
            $('#uh_cover').click(function () {
                $('#uh_wrapper').removeClass('uh_wrapper');
                $('#uh_cover').removeClass('uh_cover');
                $('#modal_wrapper').removeClass('modal_wrapper');
                $('.post_Modal').removeClass('post_Modal_appear');
            });
            $('.post_box').focusin(function () {
                $('.post_box').on('propertychange input', function () {
                    $('#post_confirm').css({
                        "pointer-events": "auto",
                        "background-color": "rgba(58,148,)"
                    });
                });
            });
            $('#post_cancel').click(function (e) {
                e.preventDefault();
                $('#uh_wrapper').removeClass('uh_wrapper');
                $('#uh_cover').removeClass('uh_cover');
                $('#modal_wrapper').removeClass('modal_wrapper');
                $('.post_Modal').removeClass('post_Modal_appear');
                $('.post_title').val("");    
                $('.post_box').val("");
                $('#title_error').removeClass('error_bad');
                $('#title_error').removeClass('error_good');
                $('#pst_error').removeClass('error_good');
                $('#pst_error').removeClass('error_bad');
            });
        });
        post_valid = false;
        $('#post_confrm').click(function (event) {
            event.preventDefault();
            ttl = $('.post_title').val();
            pst = $('.post_box').val();
            var ttl_check = /^['a-zA-Z0-9!@?/()#,*$^.:; ]{2,30}$/;
            var pst_check = /^[a-zA-Z0-9!@?/()#',*$^.:;\n ]{2,140}$/;
            if (!ttl_check.test(ttl)) {
                $('#title_error').removeClass('error_good');
                $('#title_error').addClass('error_bad');
                post_valid = false;
            }
            if (ttl_check.test(ttl)) {
                $('#title_error').removeClass('error_bad');
                $('#title_error').addClass('error_good');
                post_valid = true;
            }
            if (!pst_check.test(pst)) {
                $('#pst_error').removeClass('error_good');
                $('#pst_error').addClass('error_bad');
                $('#pst_error').html("Invalid Format!");
                post_valid = false;
            }
            if (pst_check.test(pst)) {
                $('#pst_error').removeClass('error_bad');
                $('#pst_error').addClass('error_good');
                $('#pst_error').html("");
                post_valid = true;
            }
            if (ttl_check.test(ttl) && pst_check.test(pst)) {
                post_valid = true;
                if (post_valid == true) {
                    $.ajax({
                        method: 'post',
                        url: 'UserHomepage.aspx/addPost',
                        contentType: 'application/json',
                        data: JSON.stringify({ 'user': users, 'date': theDate, 'time': theTime, 'title': ttl, 'post': pst }),
                        dataType: 'json',
                        success: function (suc) {
                            $('#uh_wrapper').removeClass('uh_wrapper');
                            $('#uh_cover').removeClass('uh_cover');
                            $('#modal_wrapper').removeClass('modal_wrapper');
                            $('.post_Modal').removeClass('post_Modal_appear');
                            $('.post_title').val("");
                            $('.post_box').val("");
                            $('#title_error').removeClass('error_bad');
                            $('#title_error').removeClass('error_good');
                            $('#pst_error').removeClass('error_good');
                            $('#pst_error').removeClass('error_bad');
                            addPost(suc);
                            displayAllPosts();
                            //$('.replyDrop').click(function (event) {
                            //    event.preventDefault();
                            //    var dropClicked = $(this);
                            //    dropClicked.parent().siblings('.user_replies').toggleClass('user_replies_opened');
                            //});
                            //$('.replyTxtbox').on('propertychange input', function replyTest(event) {
                            //    var btn = $(this).siblings('.replyBtn');
                            //    var userReply = $(this).val();
                            //    function replyCheck() {
                            //        var r_valid = false;
                            //        var rply_check = /^[a-zA-Z0-9!@?/()#',*$^.:;\n ]{2,140}$/;
                            //        if (userReply.length < 2) {
                            //            btn.css({ "background-color": "rgba(220,20,60,1)" });
                            //            var r_valid = false;
                            //        }
                            //        else if (userReply.length > 140) {
                            //            btn.css({ "background-color": "rgba(220,20,60,1)" });
                            //            var r_valid = false;
                            //        }
                            //        else if (!rply_check.test(userReply)) {
                            //            btn.css({ "background-color": "rgba(220,20,60,1)" });
                            //            var r_valid = false;
                            //        }
                            //        else {
                            //            btn.css({ "background-color": "rgba(26,177,133,1)" });
                            //            var r_valid = true;
                            //        }
                            //        return r_valid;
                            //    }
                            //    replyCheck();
                            //    replyVal = replyCheck();
                            //});
                            //$('.replyTxtbox').blur(function (event) {
                            //    var btn = $(this).siblings('.replyBtn');
                            //    var userReply = $(this).val();
                            //    if (userReply.length == 0) {
                            //        btn.css({ "background-color": "rgba(58,148,178,1)" });
                            //    }
                            //});
                            //$('.replyBtn').click(function (event) {
                            //    event.preventDefault();
                            //    var y = "";
                            //    alert($(this).parents().children('.postID_wrapper').children().val());
                            //    var btnClicked = $(this);
                            //    var thePostID = btnClicked.parents('.user_post').children('.postID_wrapper').children().val();
                            //    if (replyVal == false) {
                            //        btnClicked.css({ "background-color": "rgba(220,20,60,1)" });
                            //    }
                            //    else if (replyVal == true) {
                            //        var uReply = btnClicked.parents().children('.replyTxtbox').val();
                            //        var rpostID = btnClicked.parents().children('.postID_wrapper').children().val();
                            //        var counter_cont = btnClicked.parents().children('.replyCont').children('.replies_count_section').children('.replies_counter');
                            //        var username = users;
                            //        var rdate = theDate;
                            //        var rtime = theTime;
                            //        alert(rpostID + " id");
                            //        $.ajax({
                            //            method: 'post',
                            //            url: 'userHomepage.aspx/addReply',
                            //            contentType: 'application/json',
                            //            data: JSON.stringify({ 'postID': rpostID, 'username': username, 'rDate': rdate, 'rTime': rtime, 'Reply': uReply }),
                            //            dataType: 'json',
                            //            context: counter_cont,
                            //            success: function (replyData) {
                            //                alert(replyData.d.count);
                            //                //$(this).parents().children('.replies_counter').html(replyData.d.count);
                            //                //counter_cont.html(replyData.d.count);
                            //                function addReply(replyData) {
                            //                    var replyTxt = replyData.d.userReply;
                            //                    var replies = $("<div class='replies'></div>");
                            //                    replies.addClass('replies_active');
                            //                    var replied_user = $(" <span class='replied_user_inactive'></span>");
                            //                    replied_user.addClass('replied_user');
                            //                    replies.append(replied_user);
                            //                    if (replyData.d.imgSrc.length != 0) {
                            //                        replied_user.css({
                            //                            "background-image": "url(" + replyData.d.imgSrc + ")",
                            //                            "background-size": "cover",
                            //                            "background-position": "top center"
                            //                        });
                            //                    }
                            //                    var reply = $("<p class='reply_inactive'></p>");
                            //                    reply.addClass('reply');
                            //                    reply.html(replyTxt);
                            //                    replies.append(reply);
                            //                    var r_date_time = $("<span class='reply_date_time_inactive'></span>");
                            //                    r_date_time.addClass('reply_date_time');
                            //                    r_date_time.html(replyData.d.replyDate + " @ " + replyData.d.replyTime);
                            //                    replies.append(r_date_time);
                            //                    $(replies).fadeIn(600).appendTo(btnClicked.parent().siblings('.user_replies'));
                            //                    btnClicked.parent().siblings('.user_replies').addClass('user_replies_opened');
                            //                    var replyHolder = btnClicked.parent().siblings('.user_replies_opened');
                            //                    var items = replyHolder[0].scrollHeight;
                            //                    replyHolder.animate({
                            //                        scrollTop: items
                            //                    }, 600);
                            //                    btnClicked.siblings('.replyTxtbox').val("");
                            //                    btnClicked.css({ "background-color": "rgba(58,148,178,1)" });
                            //                }
                            //                addReply(replyData);
                            //                replyVal == false;
                            //            },
                            //            failure: function (error) {
                            //                alert(error.d);
                            //            }
                            //        });
                            //    }
                            //});
                        },
                        failure: function (error) {
                            alert("Doesn't Work!");
                        }
                    });
                }
            }
            else { post_valid = false; }
        });
        $('#feedBtn').click(function (event) {
            event.preventDefault();
        });
        $('.user_pic').click(function () {
            if ($('.user_pic_inner').css("visibility") == "hidden") {
                $('.user_pic_inner').css({
                    "visibility": "visible",
                    "opacity": "1",
                    "transition": "visibility .0s ease, opacity .4s ease",
                });
            }
            else {
                $('.user_pic_inner').css({
                    "visibility": "hidden",
                    "opacity": "0",
                    "transition": "visibility .0s ease .4s, opacity .4s ease"
                });
            }
            $('.main_cont').click(function () {
                $('.user_pic_inner').css({
                    "visibility": "hidden",
                    "opacity": "0",
                    "transition": "visibility .0s ease .4s, opacity .4s ease"
                });
            });
            //$('.header').click(function () {
            //    $('.user_pic_inner').css({
            //        "visibility": "hidden",
            //        "opacity": "0",
            //        "transition": "visibility .0s ease .4s, opacity .4s ease"
            //    });
            //});
        });
        $('#profileBtn').click(function (event) {
            event.preventDefault();
            //if (tempobj != null) {
            //    sessionStorage.setItem("currUserTemp", users);
            //}
            //else if (permobj != null) {
            //    localStorage.setItem("currUserPerm",);
            //}
            window.location.href = ("userProfilePage.aspx");
        });
        $('#log_out').click(function (event) {
            event.preventDefault();
            sessionStorage.removeItem("loggedUserTemp");
            localStorage.removeItem("loggedUserPerm");
            window.location.href = ("Homepage.aspx");
        });
        //$('.replyDrop').click(function (event) {
        //    event.preventdefault();
        //    var dropclicked = $(this);
        //    dropclicked.parent().siblings('.user_replies').toggleclass('user_replies_opened');
        //    //dropclicked.parent().siblings().children('.replies').toggleclass('replies_active');
        //    //dropclicked.parent().siblings('.user_replies').children('.replies_active').toggleclass('hidden');
        //});
        //$('.replyTxtbox').on('propertychange input', function replytest(event) {
        //    var btn = $(this).siblings('.replybtn');
        //    var userreply = $(this).val();
        //    function replycheck() {
        //        var r_valid = false;
        //        var rply_check = /^[a-za-z0-9!@?/()#',*$^.:;\n ]{2,140}$/;
        //        if (userreply.length < 2) {
        //            btn.css({ "background-color": "rgba(220,20,60,1)" });
        //            var r_valid = false;
        //        }
        //        else if (userreply.length > 140) {
        //            btn.css({ "background-color": "rgba(220,20,60,1)" });
        //            var r_valid = false;
        //        }
        //        else if (!rply_check.test(userreply)) {
        //            btn.css({ "background-color": "rgba(220,20,60,1)" });
        //            var r_valid = false;
        //        }
        //        else {
        //            btn.css({ "background-color": "rgba(26,177,133,1)" });
        //            var r_valid = true;
        //        }
        //        return r_valid;
        //    }
        //    replycheck();
        //    replyval = replycheck();
        //});
        //$('.replyTxtbox').blur(function (event) {
        //    var btn = $(this).siblings('.replybtn');
        //    var userreply = $(this).val();
        //    if (userreply.length == 0) {
        //        btn.css({ "background-color": "rgba(58,148,178,1)" });
        //    }
        //});
        //$('.replyBtn').click(function (event) {
        //    event.preventdefault();
        //    alert("hey");
        //    var btnclicked = $(this);
        //    var thepostid = btnclicked.parents('.user_post').children('.postid_wrapper').children().val();
        //    thepostid = "emille!";
        //    if (replyval == false) {
        //        btnclicked.css({ "background-color": "rgba(220,20,60,1)" });
        //    }
        //    else {
        //        var replytxt = btnclicked.parent().children('.replytxtbox').val();
        //        var replies = $("<div class='replies'></div>");
        //        replies.addclass('replies_active');
        //        var replied_user = $(" <span class='replied_user_inactive'></span>");
        //        replied_user.addclass('replied_user');
        //        replies.append(replied_user);
        //        var reply = $("<p class='reply_inactive'></p>");
        //        reply.addclass('reply');
        //        reply.html(replytxt);
        //        replies.append(reply);
        //        var r_date_time = $("<span class='reply_date_time_inactive'></span>");
        //        r_date_time.addclass('reply_date_time');
        //        r_date_time.html("id: " + thepostid + " " + thedate + " @ " + thetime);
        //        replies.append(r_date_time);
        //        $(replies).fadein(600).appendto(btnclicked.parent().siblings('.user_replies'));
        //        btnclicked.parent().siblings('.user_replies').addclass('user_replies_opened');
        //        var replyholder = btnclicked.parent().siblings('.user_replies_opened');
        //        var items = replyholder[0].scrollheight;
        //        replyholder.animate({
        //            scrolltop: items
        //        }, 600);
        //        btnclicked.siblings('.replytxtbox').val("");
        //        btnclicked.css({ "background-color": "rgba(58,148,178,1)" });
        //        replyval = false;
        //        $.ajax({
        //            method: 'post',
        //            url: '',
        //            contenttype: 'application/json',
        //            data: json.stringify({ 'userreply': replytxt }),
        //            datatype: 'json',
        //            success: function (replysuccess) {
        //                var replies = $("<div class='replies'></div>");
        //                replies.addclass('replies_active');
        //                var replied_user = $(" <span class='replied_user_inactive'></span>");
        //                replied_user.addclass('replied_user');
        //                replies.append(replied_user);
        //                var reply = $("<p class='reply_inactive'></p>");
        //                reply.addclass('reply');
        //                reply.html(replytxt);
        //                replies.append(reply);
        //                var r_date_time = $("<span class='reply_date_time_inactive'></span>");
        //                r_date_time.addclass('reply_date_time');
        //                r_date_time.html(thedate + " @ " + thetime);
        //                replies.append(r_date_time);
        //                $(replies).fadein(600).appendto(btnclicked.parent().siblings('.user_replies'));
        //                btnclicked.parent().siblings('.user_replies').addclass('user_replies_opened');
        //                var replyholder = btnclicked.parent().siblings('.user_replies_opened');
        //                var items = replyholder[0].scrollheight;
        //                replyholder.animate({
        //                    scrolltop: items
        //                }, 600);
        //                btnclicked.siblings('.replytxtbox').val("");
        //                btnclicked.css({ "background-color": "rgba(58,148,178,1)" });
        //            },
        //            failure: function (error) {
        //                alert(error);
        //            }
        //        });
        //    } 
        //});
    });//end load 
});//end ready