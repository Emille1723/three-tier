$(document).ready(function () {
    var loguserID;
    var users;//store username from object
    //If user hasn't selected to keep them logged in.
    var tempUserOBJ = sessionStorage.getItem("loggedUserTemp");
    var tempobj = JSON.parse(tempUserOBJ);
    //END

    //IF user has selected to keep them logged in.
    var permUserOBJ = localStorage.getItem("loggedUserPerm");
    var permobj = JSON.parse(permUserOBJ);
    //END

    if (tempobj != null) {
        loguserID = tempobj.userID;
        users = tempobj.userName;
        //$('.view_name').html(tempobj.userName);
        $('.user_name_bubble').html(tempobj.userName);
        $('.user_entire_name').html(tempobj.userName);
        $('.user_name').html(tempobj.userName);
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
            $('.user_image_huge').css({
                "background-image": "url(" + tempobj.userImg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
            $('.view_img').css({
                "background-image": "url(" + tempobj.userImg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
            $('.profile_edit_section').css({
                "background-image": "url(" + tempobj.userImg + ")",
                "background-size": "cover",
                "background-position": "center center"
            });
            $('.profile_edit_section_img_blurred').css({
                "background-image": "url(" + tempobj.userImg + ")",
                "background-size": "cover",
                "background-position": "center center"
            });
        }
        //alert(JSON.stringify(tempobj) + " Temp!");
    }
    else if (permobj != null) {
        users = permobj.userName;
        loguserID = permobj.userID;
        $('.view_name').html(permobj.userName);
        $('.user_name_bubble').html(permobj.userName);
        $('.user_entire_name').html(permobj.userName);
        $('.user_name').html(permobj.userName);
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
            $('.user_image_huge').css({
                "background-image": "url(" + permobj.userImg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
            $('.view_img').css({
                "background-image": "url(" + permobj.userImg + ")",
                "background-size": "cover",
                "background-position": "top center"
            });
            $('.profile_edit_section').css({
                "background-image": "url(" + permobj.userImg + ")",
                "background-size": "cover",
                "background-position": "center center"
            });
            $('.profile_edit_section_img_blurred').css({
                "background-image": "url(" + permobj.userImg + ")",
                "background-size": "cover",
                "background-position": "center center"
            });
        }
    }
    else {
        window.location.href = ("homepage.aspx");
    }

    function userBio() {
        $.ajax({
            method: 'post',
            url: 'userProfilePage.aspx/userBio',
            contentType: 'application/json',
            data: JSON.stringify({'user':users}),
            dataType:'json',
            success:function (userBio){
                var bio = JSON.stringify(userBio.d);
                if (JSON.parse(bio).length != 0) {
                    $('.user_bio_view').html(JSON.parse(bio));
                }
                printUserPosts();
            },
            failure:function(error){
                alert(error.d);
            }
        });
    }
    userBio();

    function printUserPosts() {
        //alert("ajx function " + loguserID);
        $.ajax({
            method: 'post',
            url: 'userProfilePage.aspx/userPosts',
            contentType: 'application/json',
            data: JSON.stringify({ 'userID': loguserID }),
            dataType: 'json',
            success: function (userPosts) {
                //alert("connected");
                //alert(JSON.stringify(userPosts.d));
                $('.up_posts_wrapper').empty();
                for (i = 0; i < userPosts.d.length; i++) {
                    var user_post = $("<div class='user_post'></>");
                    var del_post = $("<button class='Xpost'></button>");
                    user_post.append(del_post);
                    var postID_wrapper = $("<div class='postID_wrapper'></div>");
                    user_post.append(postID_wrapper);
                    var postID = $("<asp:HiddenField runat='server'></asp:HiddenField>");
                    postID.val(userPosts.d[i].postid);
                    postID_wrapper.append(postID);
                    var user_post_img_wrapper = $("<div class='user_post_img_wrapper'></div>");
                    user_post.append(user_post_img_wrapper);
                    var user_post_img = $("<div class='user_post_img'></div>");
                    if (userPosts.d[i].uimg.length != 0) {
                        user_post_img.css({
                            "background-image": "url(" + userPosts.d[i].uimg + ")",
                            "background-size": "cover",
                            "background-position": "top center"
                        });
                    }
                    user_post_img_wrapper.append(user_post_img);
                    var user_post_uname = $("<p class='user_post_uname u_post_txt'></p>");
                    user_post_uname.html(userPosts.d[i].unm);
                    user_post_img_wrapper.append(user_post_uname);
                    var user_post_date = $("<p class='user_post_date u_post_txt'></p>");
                    user_post_date.html(userPosts.d[i].udate);
                    user_post_img_wrapper.append(user_post_date);
                    var user_post_time = $("<span class='user_post_time u_post_txt'></span>");
                    user_post_time.html(userPosts.d[i].utime);
                    user_post_img_wrapper.append(user_post_time);
                    var post_title = $("<p class='user_post_title'></p>");
                    post_title.html(userPosts.d[i].utitle);
                    user_post.append(post_title);
                    var post_text = $("<p class='user_post_text'></p>");
                    post_text.html(userPosts.d[i].upost);
                    user_post.append(post_text);
                    var reply_cont = $("<div class='replyCont'></div>");
                    user_post.append(reply_cont);
                    var replies_count_section = $("<div class='replies_count_section'></div>");
                    reply_cont.append(replies_count_section);
                    var replies_counter = $("<p class='replies_counter'></p>");
                    replies_count_section.append(replies_counter);
                    var reply_drop = $("<button class='replyDrop'></button>");
                    replies_count_section.append(reply_drop);
                    var user_replies = $("<div class='user_replies'>");
                    reply_cont.append(user_replies);
                    user_post.prependTo($('.up_posts_wrapper'));
                    var theID = JSON.stringify(userPosts.d[i].postid);
                    printUserPostsReplies(theID, user_replies, replies_counter);
                }
                $('.replyDrop').click(function (event) {
                    event.preventDefault();
                    var dropClicked = $(this);
                    dropClicked.parents().children('.user_replies').toggleClass('user_replies_opened');
                });
                $('.Xpost').click(function (event) {
                    event.preventDefault();
                    var x = $(this);
                    var removePost = x.parents('.user_post').children('.postID_wrapper').children().val();

                    $.ajax({
                        method: 'post',
                        url: 'userProfilePage.aspx/deleteUserPost',
                        contentType: 'application/json',
                        data: JSON.stringify({ 'postID': removePost }),
                        dataType: 'json',
                        context: ({ 'x': x }),
                        success: function () {
                            $('.up_post_wrapper').remove(x.parents('.user_post')).fadeIn(1000)  ;
                            printUserPostsDel();
                           
                        },
                        failure: function (error) {
                            alert(error.d);
                        }
                    });
                });
            },
            failure: function (error) {
                alert(error.d);
            }
        });
    };

    function printUserPostsDel() {
        //alert("ajx function " + loguserID);
        $.ajax({
            method: 'post',
            url: 'userProfilePage.aspx/userPosts',
            contentType: 'application/json',
            data: JSON.stringify({ 'userID': loguserID }),
            dataType: 'json',
            success: function (userPosts) {
                //alert("connected");
                //alert(JSON.stringify(userPosts.d));
                $('.up_posts_wrapper').empty();
                for (i = 0; i < userPosts.d.length; i++) {
                    var user_post = $("<div class='user_post'></>");
                    var del_post = $("<button class='Xpost'></button>");
                    user_post.append(del_post);
                    var postID_wrapper = $("<div class='postID_wrapper'></div>");
                    user_post.append(postID_wrapper);
                    var postID = $("<asp:HiddenField runat='server'></asp:HiddenField>");
                    postID.val(userPosts.d[i].postid);
                    postID_wrapper.append(postID);
                    var user_post_img_wrapper = $("<div class='user_post_img_wrapper'></div>");
                    user_post.append(user_post_img_wrapper);
                    var user_post_img = $("<div class='user_post_img'></div>");
                    if (userPosts.d[i].uimg.length != 0) {
                        user_post_img.css({
                            "background-image": "url(" + userPosts.d[i].uimg + ")",
                            "background-size": "cover",
                            "background-position": "top center"
                        });
                    }
                    user_post_img_wrapper.append(user_post_img);
                    var user_post_uname = $("<p class='user_post_uname u_post_txt'></p>");
                    user_post_uname.html(userPosts.d[i].unm);
                    user_post_img_wrapper.append(user_post_uname);
                    var user_post_date = $("<p class='user_post_date u_post_txt'></p>");
                    user_post_date.html(userPosts.d[i].udate);
                    user_post_img_wrapper.append(user_post_date);
                    var user_post_time = $("<span class='user_post_time u_post_txt'></span>");
                    user_post_time.html(userPosts.d[i].utime);
                    user_post_img_wrapper.append(user_post_time);
                    var post_title = $("<p class='user_post_title'></p>");
                    post_title.html(userPosts.d[i].utitle);
                    user_post.append(post_title);
                    var post_text = $("<p class='user_post_text'></p>");
                    post_text.html(userPosts.d[i].upost);
                    user_post.append(post_text);
                    var reply_cont = $("<div class='replyCont'></div>");
                    user_post.append(reply_cont);
                    var replies_count_section = $("<div class='replies_count_section'></div>");
                    reply_cont.append(replies_count_section);
                    var replies_counter = $("<p class='replies_counter'></p>");
                    replies_count_section.append(replies_counter);
                    var reply_drop = $("<button class='replyDrop'></button>");
                    replies_count_section.append(reply_drop);
                    var user_replies = $("<div class='user_replies'>");
                    reply_cont.append(user_replies);
                    user_post.prependTo($('.up_posts_wrapper'));
                    var theID = JSON.stringify(userPosts.d[i].postid);
                    printUserPostsReplies(theID, user_replies, replies_counter);
                }
                $('.replyDrop').click(function (event) {
                    event.preventDefault();
                    var dropClicked = $(this);
                    dropClicked.parents().children('.user_replies').toggleClass('user_replies_opened');
                });
                $('.Xpost').click(function (event) {
                    event.preventDefault();
                    var x = $(this);
                    var removePost = x.parents('.user_post').children('.postID_wrapper').children().val();

                    $.ajax({
                        method: 'post',
                        url: 'userProfilePage.aspx/deleteUserPost',
                        contentType: 'application/json',
                        data: JSON.stringify({ 'postID': removePost }),
                        dataType: 'json',
                        context: ({ 'x': x }),
                        success: function () {
                            $('.up_post_wrapper').remove(x.parents('.user_post')).fadeIn(1000);
                            printUserPostsDel();

                        },
                        failure: function (error) {
                            alert(error.d);
                        }
                    });
                });
                $('.Xpost').addClass('Xpost_active');
            },
            failure: function (error) {
                alert(error.d);
            }
        });
    };
    
    function printUserPostsReplies(theID, repliesContainer, repliesCounter) {
        var postID = JSON.parse(theID);
        $.ajax({
            method: 'post',
            url: 'userProfilePage.aspx/userPostsReplies',
            contentType: 'application/json',
            data: JSON.stringify({'postID':postID}),
            dataType: 'json',
            context: ({ 'repliesContainer': repliesContainer, 'repliesCounter': repliesCounter }),
            success: function (Allreplies) {
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
                    repliesCounter.html(Allreplies.d[i].count);
                    $(replies).appendTo(repliesContainer);
                    
                }
            },
            failure: function (error) {
                alert(error.d);
            }
        });
    };

    $(window).load(function () {
        //retrieve user info from db
        function userInfo() {
            $.ajax({
                method: 'post',
                url: 'userProfilePage.aspx/userData',
                contentType: 'application/json',
                data: JSON.stringify({ 'user': users }),
                dataType: 'json',
                success: function (userInfo) {
                    $('.view_name').html(userInfo.d.fname + " " + userInfo.d.lname);
                    $('#userID').val(userInfo.d.id);
                    $('.fname').val(userInfo.d.fname);
                    $('.lname').val(userInfo.d.lname);
                    $('.address').val(userInfo.d.address);
                    $('.home').val(userInfo.d.hphone);
                    $('.mobile').val(userInfo.d.mphone);
                    $('.email').val(userInfo.d.email);
                    $('.username').val(userInfo.d.uname);
                    $('.pass').val(userInfo.d.pas_swrd);
                    $('.cpass').val(userInfo.d.cpas_swrd);
                    $('.img_chng').val(userInfo.d.user_img);
                    $('.bio').val(userInfo.d.user_bio);
                    var boxes = $('.textboxes').val();
                    if (boxes.length != 0) {
                        $('.save_data').addClass('save_data_active');
                    }
                },
                failure: function (error) {
                    alert(error.d);
                }
            });
        };
        //end
        //update user info to db
        function updateInfo() {
            $.ajax({
                method: 'post',
                url: 'userProfilePage.aspx/updateUserData',
                contentType: 'application/json',
                data: JSON.stringify({
                    'ID': $('#userID').val(),
                    'fname': $('.fname').val(),
                    'lname': $('.lname').val(),
                    'address': $('.address').val(),
                    'home': $('.home').val(),
                    'mobile': $('.mobile').val(),
                    'email': $('.email').val(),
                    'username': $('.username').val(),
                    'pass': $('.pass').val(),
                    'cpass': $('.cpass').val(),
                    'pic': $('.img_chng').val(),
                    'bio': $('.bio').val()
                }),
                dataType: 'json',
                success: function (updatedInfo) {
                    //$('#userID').val(updatedInfo.d.id);
                    $('.view_name').html(updatedInfo.d.fname + " " + updatedInfo.d.lname);
                    $('.fname').val(updatedInfo.d.fname);
                    $('.lname').val(updatedInfo.d.lname);
                    $('.address').val(updatedInfo.d.address);
                    $('.home').val(updatedInfo.d.hphone);
                    $('.mobile').val(updatedInfo.d.mphone);
                    $('.email').val(updatedInfo.d.email);
                    $('.username').val(updatedInfo.d.uname);
                    $('.pass').val(updatedInfo.d.pas_swrd);
                    $('.cpass').val(updatedInfo.d.cpas_swrd);
                    $('.img_chng').val(updatedInfo.d.user_img);
                    $('.bio').val(updatedInfo.d.user_bio);

                    var updtusername = JSON.stringify(updatedInfo.d.uname);
                    var updtusername2 = JSON.stringify(updatedInfo.d.uname);
                    var updtpass = JSON.stringify(updatedInfo.d.pas_swrd);
                    var updtimg = JSON.stringify(updatedInfo.d.user_img);
                    updateloggedUser(updtusername, updtpass, updtimg);//revalidates login after data change and reassigns values to logObj
                    //updateloggedUserinPostsReplies(updtusername2, updtimg);
                },
                failure: function (error) {
                    alert(error.d);
                }
            });
        };
        function updateloggedUser(upuser,uppass,upimg) {
            var user = JSON.parse(upuser);
            var pass = JSON.parse(uppass);
            var img = JSON.parse(upimg);
            $.ajax({
                method: 'post',
                url: 'userProfilePage.aspx/upadteloggedUser',
                contentType: 'application/json',
                data: JSON.stringify({'uname':user, 'pass':pass}),
                dataType: 'json',
                success: function (updatedlog) {
                    var del_sesh = sessionStorage.getItem("loggedUserTemp");
                    var del_sesh1 = JSON.parse(del_sesh);
                   
                    var del_cook = localStorage.getItem("loggedUserPerm");
                    var del_cook1 = JSON.parse(del_cook);

                    //update session data                    
                    if (del_sesh1 != null) {
                        sessionStorage.removeItem("loggedUserTemp");
                        sessionStorage.setItem("loggedUserTemp", JSON.stringify(updatedlog.d));
                        var updatedloggedInUser = sessionStorage.getItem("loggedUserTemp");
                        var updtlUser = JSON.parse(updatedloggedInUser);
                        users = updtlUser.userName;
                        $('.user_name_bubble').html(updtlUser.userName);
                        $('.user_entire_name').html(updtlUser.userName);
                        $('.user_name').html(updtlUser.userName);
                        if (updtlUser.userImg.length != 0) {
                            $('.user_pic').css({
                                "background-image": "url(" + updtlUser.userImg + ")",
                                "background-size": "cover",
                                "background-position": "top center"
                            });
                            $('.user_pic_larger').css({
                                "background-image": "url(" + updtlUser.userImg + ")",
                                "background-size": "cover",
                                "background-position": "top center"
                            });
                            $('.user_image_huge').css({
                                "background-image": "url(" + updtlUser.userImg + ")",
                                "background-size": "cover",
                                "background-position": "top center"
                            });
                            $('.view_img').css({
                                "background-image": "url(" + updtlUser.userImg + ")",
                                "background-size": "cover",
                                "background-position": "top center"
                            });
                            $('.profile_edit_section').css({
                                "background-image": "url(" + updtlUser.userImg + ")",
                                "background-size": "cover",
                                "background-position": "center center"
                            });
                            $('.profile_edit_section_img_blurred').css({
                                "background-image": "url(" + updtlUser.userImg + ")",
                                "background-size": "cover",
                                "background-position": "center center"
                            });
                        }
                        updateloggedUserinPostsReplies(user, img);
                    }

                    //updating cookie data
                     else if (del_cook1 != null) {
                        localStorage.removeItem("loggedUserPerm");
                        localStorage.setItem("loggedUserPerm", JSON.stringify(updatedlog.d));
                        var updatedloggedInUser= localStorage.getItem("loggedUserPerm");
                        var updtlUser = JSON.parse(updatedloggedInUser);
                        users = updtlUser.userName;
                        $('.user_name_bubble').html(updtlUser.userName);
                        $('.user_entire_name').html(updtlUser.userName);
                        $('.user_name').html(updtlUser.userName);
                        if (updtlUser.userImg.length != 0) {
                            $('.user_pic').css({
                                "background-image": "url(" + updtlUser.userImg + ")",
                                "background-size": "cover",
                                "background-position": "top center"
                            });
                            $('.user_pic_larger').css({
                                "background-image": "url(" + updtlUser.userImg + ")",
                                "background-size": "cover",
                                "background-position": "top center"
                            });
                            $('.user_image_huge').css({
                                "background-image": "url(" + updtlUser.userImg + ")",
                                "background-size": "cover",
                                "background-position": "top center"
                            });
                            $('.view_img').css({
                                "background-image": "url(" + updtlUser.userImg + ")",
                                "background-size": "cover",
                                "background-position": "top center"
                            });
                            $('.profile_edit_section').css({
                                "background-image": "url(" + updtlUser.userImg + ")",
                                "background-size": "cover",
                                "background-position": "center center"
                            });
                            $('.profile_edit_section_img_blurred').css({
                                "background-image": "url(" + updtlUser.userImg + ")",
                                "background-size": "cover",
                                "background-position": "center center"
                            });  
                        }
                        updateloggedUserinPostsReplies(user, img);
                    }
                    else{
                        sessionStorage.removeItem("loggedUserTemp");
                        localStorage.removeItem("loggedUserPerm");
                        window.location.href=("Homepage.aspx");
                    }
                },
                failure : function (error) {
                    alert(error.d);
                }
            });
            alert(id + "\n" + username + "\n" + img);
        };
        function updateloggedUserinPostsReplies(upuser,upimg) {
            //var user = JSON.parse(upuser);
            //var img = JSON.parse(upimg);
            $.ajax({
                method: 'post',
                url: 'userProfilePage.aspx/updateTables',
                contentType: 'application/json',
                data: JSON.stringify({
                    'userID': $('#userID').val(),
                    'user': upuser,
                    'img': upimg
                }),
                dataType: 'json',
                success: function (updtfortables) {                       
                    userBio();
                    $('#up_wrapper').removeClass('up_wrapper');
                    $('#up_cover').removeClass('up_cover');
                    $('.edit_modal').removeClass('edit_modal_appear');
                    $('.save_data').removeClass('save_data_active');
                    $('.textboxes').val("");
                },
                failure: function (error) {
                    alert(error.d);
                }
            });
        };
        //end

        $('.up_preloader').fadeOut("slow");
        $(window).scroll(function () {
            var ypos = $(window).scrollTop();
            if (ypos > 0) {
                $('.uh_top').css({
                    "opacity": "1",
                    "cursor": "pointer"
                });
            }
            else {
                $('.uh_top').css({
                    "opacity": "0",
                    "cursor": "auto"
                });
            }
        });
        $('.up_top').click(function (event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, 600);
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
        $('.delete_post').click(function (event) {
            event.preventDefault();
            $('.Xpost').toggleClass('Xpost_active');
        });
        $('.edit_profile').click(function (event) {
            event.preventDefault();
            userInfo();
            $('.save_data').val("update");
            $('.save_data').css({
                "background-image": "url(../Images/WhiteIcons/save.png)",
                "transition": "background-image .3s ease .3s"
            });
            $('#up_wrapper').toggleClass('up_wrapper');
            $('#up_cover').toggleClass('up_cover');
            $('.edit_modal').toggleClass('edit_modal_appear');
        });
        $('.txtbox_masks').click(function () {
            var maskClicked = $(this);
            maskClicked.toggleClass('txtbox_masks_inactive');
            maskClicked.siblings('.textboxes').toggleClass('textboxes_active');
            maskClicked.siblings('.textboxes').focusin();
        });
        $('.textboxes').focusout(function () {
            var txtboxClicked = $(this);
            txtboxClicked.removeClass('textboxes_active');
            txtboxClicked.siblings('.error_check').removeClass('good');
            txtboxClicked.siblings('.error_check').removeClass('bad');
            txtboxClicked.siblings('.txtbox_masks').removeClass('txtbox_masks_inactive');
        });
        update_valid = false;
        f_l_valid = true;
        $('.fname').on('propertychange input', function() {
            var txtbox = $('.fname');
            var fnvalue = $('.fname').val();
            var f_lcheck = /^[a-zA-Z']{2,30}$/;
            if (fnvalue.length < 2) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
                f_l_valid = false;
            }
            else if (fnvalue.length > 30) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
                f_l_valid = false;
            }
            else if (!f_lcheck.test(fnvalue)) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Must Be Letters!");
                f_l_valid = false;
            }
            else {
                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
                f_l_valid = true;
            }
            //return f_l_valid;
        });
        l_valid = true;
        $('.lname').on('propertychange input ', function () {
            var txtbox = $('.lname');
            var lnvalue = $('.lname').val();
            var lcheck = /^[a-zA-Z']{2,30}$/;
            if (lnvalue.length < 2) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
                l_valid = false;
            }
            else if (lnvalue.length > 30) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
                l_valid = false;
            }
            else if (!lcheck.test(lnvalue)) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Must Be Letters!");
                l_valid = false;
            }
            else {
                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
                l_valid = true;
            }
            return l_valid;
        });
        a_valid = true;
        $('.address').on('propertychange input', function () {
            var txtbox = $('.address');
            var avalue = $('.address').val();
            var address_check = /^[a-zA-Z0-9#,. ]{3,100}$/;
            if (avalue.length < 3) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
                a_valid = false;
            }
            else if (avalue.length > 100) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
                a_valid = false;
            }
            else if (!address_check.test(avalue)) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Invalid Format!");
                a_valid = false;
            }
            else {
                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
                a_valid = true;
            }
            return a_valid;
        });
        hp_valid = true;
        $('.home').on('propertychange input', function () {
            var txtbox = $('.home');
            var hpvalue = $('.home').val();
            var phone_check = /^[0-9-]{7,8}$/;
            if (hpvalue.length < 7) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
                p_valid = false;
            }
            else if (hpvalue.length > 8) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
                p_valid = false;
            }
            else if (!phone_check.test(hpvalue)) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Invalid Format!");
                p_valid = false;
            }
            else {
                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
                p_valid = true;
            }
            return p_valid;
        });
        mp_valid = true;
        $('.mobile').on('propertychange input', function () {
            var txtbox = $('.mobile');
            var mpvalue = $('.mobile').val();
            var phone_check = /^[0-9-]{7,8}$/;
            if (mpvalue.length < 7) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
                p_valid = false;
            }
            else if (mpvalue.length > 8) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
                p_valid = false;
            }
            else if (!phone_check.test(mpvalue)) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Invalid Format!");
                p_valid = false;
            }
            else {
                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
                p_valid = true;
            }
            return p_valid;
        });
        e_valid = true;
        $('.email').on('propertychange input', function () {
            var txtbox = $('.email');
            var evalue = $('.email').val();
            var email_check = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (evalue.length < 10) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
                _valid = false;
            }
            else if (evalue.length > 100) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
                e_valid = false;
            }
            else if (!email_check.test(evalue)) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Invalid Format!");
                e_valid = false;
            }
            else {
                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
                e_valid = true;
            }
            return e_valid;
        });
        user_valid = true;
        $('.username').on('propertychange input', function () {
            var txtbox = $('.username');
            user_value = $('.username').val();
            var s_user_check = /^(?=.*[!@$-_])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            var su_valid = true;
            if (user_value.length < 6) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
                su_valid = false;
            }
            else if (user_value.length > 20) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
                su_valid = false;
            }
            else if (!s_user_check.test(user_value)) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Invalid Format!");
                su_valid = false;
            }
            else {
                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active').html("");
                su_valid = true;
            }
            return su_valid;
        });
        pass_valid = true;
        $('.pass').on('propertychange input', function () {
            var txtbox = $('.pass');
            var pvalue = $('.pass').val();
            var s_pass_check = /^(?=.*[0-9])(?=.*[!@$-_])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            if (pvalue.length < 6) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').removeClass('medium').removeClass('textboxes_active_medium').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
                sp_valid = false;
            }
            else if (pvalue.length > 6 && val.length <= 10) {
                txtbox.removeClass('textboxes_active_good').removeClass('textboxes_active_medium').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').removeClass('medium').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Weak!");
                sp_valid = true;
            }
            else if (pvalue.length > 10 && val.length <= 12) {
                txtbox.removeClass('textboxes_active_good').removeClass('textboxes_active_bad').addClass('textboxes_active_medium');
                txtbox.siblings('.error_check').removeClass('good').removeClass('bad').addClass('medium');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Medium");
                sp_valid = true;
            }
            else if (pvalue.length > 12) {
                txtbox.removeClass('textboxes_active_medium').removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                txtbox.siblings('.error_check').removeClass('bad').removeClass('medium').addClass('good')
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Strong");
                sp_valid = true;
            }
            else if (!s_pass_check.test(pvalue)) {
                txtbox.removeClass('textboxes_active_good').removeClass('textboxes_active_medium').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').removeClass('medium').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Invalid Format!");
                sp_valid = false;
            }
            else {
                txtbox.removeClass('textboxes_active_bad').removeClass('textboxes_active_medium').addClass('textboxes_active_good');
                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
                sp_valid = true;
            }
            return sp_valid;
        });
        cpass_valid = true;
        $('.cpass').on('propertychange input', function () {
            var txtbox = $('.cpass');
            var cvalue = $('.cpass').val();
            if (cvalue != $('.pass').val()) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("No Match!");
                cpass_valid = false;
            }
            else {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active');
                cpass_valid = true;
            }
            return cpass_valid;
        });
        bio_valid = true;
        $('.bio').on('propertychange input', function () {
            var txtbox = $('.bio');
            var bvalue = $('.bio').val();
            var bio_valid = true;
            var bio_check = /^[A-Za-z0-9*,.\n? !$#@]{2,140}/;
            if (bvalue.length < 2) {
                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
                cpass_valid = false;
            }
        });
        
        $('.close_modal').click(function (event) {
            event.preventDefault();
            $('#up_wrapper').removeClass('up_wrapper');
            $('#up_cover').removeClass('up_cover');
            $('.edit_modal').removeClass('edit_modal_appear');
            $('.save_data').removeClass('save_data_active');
            $('.textboxes').val("");
            $('.textboxes').focusout();
            $('.error_check_alerts').removeClass('error_check_alerts_active');
        });
        $('.save_data').click(function (event) {
            event.preventDefault();
            //alert(update_valid);
            //if (f_l_valid == true && l_valid == true && a_valid == true && hp_valid == true && mp_valid == true && e_valid == true && user_valid == true && pass_valid == true && cpass_valid == true) {
            //    update_valid == true;
            //    if (update_valid == true) {
            //        alert("good");
            //        //updateInfo();
            //    }
            //}
            //else {
            //    update_valid = false;
            //    $('.txtbox_masks').addClass('txtbox_masks_inactive');
            //    $('.txtbox_masks').siblings('.textboxes').addClass('textboxes_active');
            //    $('.txtbox_masks').siblings('.textboxes').focusin();
            //    $('.textboxes').on('propertychange input', function () {
            //        var txtbox = $(this);
            //        var val = txtbox.val();
            //        function fname() {
            //            var f_l_valid = true;
            //            var fnvalue = $('.fname').val();
            //            var f_lcheck = /^[a-zA-Z']{2,30}$/;
            //            if (fnvalue.length < 2) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
            //                f_l_valid = false;
            //            }
            //            else if (fnvalue.length > 30) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
            //                f_l_valid = false;
            //            }
            //            else if (!f_lcheck.test(fnvalue)) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Must Be Letters!");
            //                f_l_valid = false;
            //            }
            //            else {
            //                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
            //                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
            //                f_l_valid = true;
            //            }
            //            return f_l_valid;
            //        };
            //        function lname() {
            //            var l_valid = true;
            //            var lnvalue = $('.lname').val();
            //            var lcheck = /^[a-zA-Z']{2,30}$/;
            //            if (lnvalue.length < 2) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
            //                l_valid = false;
            //            }
            //            else if (lnvalue.length > 30) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
            //                l_valid = false;
            //            }
            //            else if (!lcheck.test(lnvalue)) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Must Be Letters!");
            //                l_valid = false;
            //            }
            //            else {
            //                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
            //                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
            //                l_valid = true;
            //            }
            //            return l_valid;
            //        };
            //        function address() {
            //            var a_valid = true;
            //            var avalue = $('.address').val();
            //            var address_check = /^[a-zA-Z0-9#,. ]{3,100}$/;
            //            if (avalue.length < 3) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
            //                a_valid = false;
            //            }
            //            else if (avalue.length > 100) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
            //                a_valid = false;
            //            }
            //            else if (!address_check.test(avalue)) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Invalid Format!");
            //                a_valid = false;
            //            }
            //            else {
            //                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
            //                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
            //                a_valid = true;
            //            }
            //            return a_valid;
            //        };
            //        function hphone() {
            //            var p_valid = true;
            //            var hpvalue = $('.home').val();
            //            var phone_check = /^[0-9-]{7,8}$/;
            //            if (hpvalue.length < 7) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
            //                p_valid = false;
            //            }
            //            else if (hpvalue.length > 8) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
            //                p_valid = false;
            //            }
            //            else if (!phone_check.test(hpvalue)) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Invalid Format!");
            //                p_valid = false;
            //            }
            //            else {
            //                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
            //                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
            //                p_valid = true;
            //            }
            //            return p_valid;
            //        };
            //        function mphone() {
            //            var p_valid = true;
            //            var mpvalue = $('.mobile').val();
            //            var phone_check = /^[0-9-]{7,8}$/;
            //            if (mpvalue.length < 7) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
            //                p_valid = false;
            //            }
            //            else if (mpvalue.length > 8) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
            //                p_valid = false;
            //            }
            //            else if (!phone_check.test(mpvalue)) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Invalid Format!");
            //                p_valid = false;
            //            }
            //            else {
            //                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
            //                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
            //                p_valid = true;
            //            }
            //            return p_valid;
            //        };
            //        function email() {
            //            var e_valid = true;
            //            var evalue = $('.email').val();
            //            var email_check = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            //            if (evalue.length < 10) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
            //                _valid = false;
            //            }
            //            else if (evalue.length > 100) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
            //                e_valid = false;
            //            }
            //            else if (!email_check.test(evalue)) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Invalid Format!");
            //                e_valid = false;
            //            }
            //            else {
            //                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
            //                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
            //                e_valid = true;
            //            }
            //            return e_valid;
            //        };
            //        function user_update() {
            //            user_value = $('.username').val();
            //            var s_user_check = /^(?=.*[!@$-_])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            //            var su_valid = true;
            //            if (user_value.length < 6) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
            //                su_valid = false;
            //            }
            //            else if (user_value.length > 20) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Long!");
            //                su_valid = false;
            //            }
            //            else if (!s_user_check.test(user_value)) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Invalid Format!");
            //                su_valid = false;
            //            }
            //            else {
            //                txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
            //                txtbox.siblings('.error_check').removeClass('bad').addClass('good');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active').html("");
            //                su_valid = true;
            //            }
            //            return su_valid;
            //        };
            //        //function pass() {
            //        //    var sp_check = true;
            //        //    var pvalue =  $('.pass').val();
            //        //    var s_pass_check = /^(?=.*[0-9])(?=.*[!@$-_])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            //        //    if (pvalue.length < 6) {
            //        //        txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //        //        txtbox.siblings('.error_check').removeClass('good').removeClass('medium').removeClass('textboxes_active_medium').addClass('bad');
            //        //        txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
            //        //        sp_valid = false;
            //        //    }
            //        //    else if (pvalue.length > 6 && val.length <= 10) {
            //        //        txtbox.removeClass('textboxes_active_good').removeClass('textboxes_active_medium').addClass('textboxes_active_bad');
            //        //        txtbox.siblings('.error_check').removeClass('good').removeClass('medium').addClass('bad');
            //        //        txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Weak!");
            //        //        sp_valid = true;
            //        //    }
            //        //    else if (pvalue.length > 10 && val.length <= 12) {
            //        //        txtbox.removeClass('textboxes_active_good').removeClass('textboxes_active_bad').addClass('textboxes_active_medium');
            //        //        txtbox.siblings('.error_check').removeClass('good').removeClass('bad').addClass('medium');
            //        //        txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Medium");
            //        //        sp_valid = true;
            //        //    }
            //        //    else if (pvalue.length > 12) {
            //        //        txtbox.removeClass('textboxes_active_medium').removeClass('textboxes_active_bad').addClass('textboxes_active_good');
            //        //        txtbox.siblings('.error_check').removeClass('bad').removeClass('medium').addClass('good')
            //        //        txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Strong");
            //        //        sp_valid = true;
            //        //    }
            //        //    else if (!s_pass_check.test(pvalue)) {
            //        //        txtbox.removeClass('textboxes_active_good').removeClass('textboxes_active_medium').addClass('textboxes_active_bad');
            //        //        txtbox.siblings('.error_check').removeClass('good').removeClass('medium').addClass('bad');
            //        //        txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Invalid Format!");
            //        //        sp_valid = false;
            //        //    }
            //        //    else {
            //        //        txtbox.removeClass('textboxes_active_bad').removeClass('textboxes_active_medium').addClass('textboxes_active_good');
            //        //        txtbox.siblings('.error_check').removeClass('bad').addClass('good');
            //        //        txtbox.siblings('.error_check').children('.error_check_alerts').removeClass('error_check_alerts_active');
            //        //        sp_valid = true;
            //        //    }
            //        //    return sp_valid;
            //        //};
            //        //function cpass() {
            //        //    var cpass_valid = true;
            //        //    var cvalue = $('.cpass').val();
            //        //    if (cvalue != $('.pass').val()) {
            //        //        txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //        //        txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //        //        txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("No Match!");
            //        //        cpass_valid = false;
            //        //    }
            //        //    else {
            //        //        txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //        //        txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //        //        txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active');
            //        //        cpass_valid = true;
            //        //    }
            //        //    return cpass_valid;
            //        //};
            //        function bio() {
            //            var bvalue = $('.bio').val();
            //            var bio_valid = true;
            //            var bio_check = /^[A-Za-z0-9*,.\n? !$#@]{2,140}/;
            //            if (bvalue.length < 2) {
            //                txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
            //                txtbox.siblings('.error_check').removeClass('good').addClass('bad');
            //                txtbox.siblings('.error_check').children('.error_check_alerts').addClass('error_check_alerts_active').html("Too Short!");
            //                cpass_valid = false;
            //            }
            //        };
            //        if (txtbox.hasClass('fname')) {
            //            fname();
            //        }
            //        if (txtbox.hasClass('lname')) {
            //            lname();
            //        }
            //        if (txtbox.hasClass('address')) {
            //            address();
            //        }
            //        if (txtbox.hasClass('home')) {
            //            hphone();
            //        }
            //        if (txtbox.hasClass('mobile')) {
            //            mphone();
            //        }
            //        if (txtbox.hasClass('email')) {
            //            email();
            //        }
            //        if (txtbox.hasClass('username')) {
            //            user_update();
            //        }
            //        if (txtbox.hasClass('pass')) {
            //            pass();
            //            txtbox.attr("Type", "Password");
            //        }
            //        if (txtbox.hasClass('cpass')) {
            //            cpass();
            //        }
            //        if (txtbox.hasClass('bio')) {
            //            bio();
            //        }
            //        if (fname() == true && lname() == true && address() == true && hphone() == true && mphone() == true && email() == true && user_update() == true && pass() == true && cpass() == true && bio() == true) {
            //            update_valid = true;
            //        }
            //        else {
            //            update_valid = false;
            //        }
            //        //alert(update_valid);
            //        $('.save_data').addClass('save_data_active');
            //        //return update_valid;
            //    });
            //}
            updateInfo();    
        });
        $('.textboxes').on('propertychange input', function () {
            $('.save_data').addClass('save_data_active');
        });
        $('#log_out').click(function (event) {
            event.preventDefault();
            sessionStorage.removeItem("loggedUserTemp");
            localStorage.removeItem("loggedUserPerm");
            window.location.href = ("Homepage.aspx");
        });
        $('.textboxes').focus(function () {
            var txtbox = $(this);
            var val = txtbox.val();
            function fname_lname() {
                var f_lcheck = /^[a-zA-Z,-/'/]{2,30}$/;
                if (!f_lcheck.test(val)) {
                    txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                    txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                }
                else {
                    txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                    txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                }
            }
            function address() {
                var address_check = /^[A-Za-z0-9#,. ]{10,100}$/;
                if (!address_check.test(val)) {
                    txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                    txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                }
                else {
                    txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                    txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                }
            }
            function phone() {
                var phone_check = /^[0-9-]{7,8}$/;
                if (!phone_check.test(val)) {
                    txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                    txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                }
                else {
                    txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                    txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                }
            }
            function email() {
                var email_check = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                if (!email_check.test(val)) {
                    txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                    txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                }
                else {
                    txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                    txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                }
            }
            function user_check() {
                var s_user_check = /^(?=.*[!@$-_])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
                if (!s_user_check.test(val)) {
                    txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                    txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                }
                else {
                    txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                    txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                }
            }
            function pass() {
                var s_pass_check = /^(?=.*[0-9])(?=.*[!@$-_])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
                txtbox.attr("Type", "Text");
                if (!s_pass_check.test(val)) {
                    txtbox.removeClass('textboxes_active_good').addClass('textboxes_active_bad');
                    txtbox.siblings('.error_check').removeClass('good').addClass('bad');
                }
                else {
                    txtbox.removeClass('textboxes_active_bad').addClass('textboxes_active_good');
                    txtbox.siblings('.error_check').removeClass('bad').addClass('good');
                }
            }
            if (txtbox.hasClass('fname') || txtbox.hasClass('lname')) {
                fname_lname();
            }
            if (txtbox.hasClass('address')) {
                address();
            }
            if (txtbox.hasClass('home') || txtbox.hasClass('mobile')) {
                phone();
            }
            if (txtbox.hasClass('email')) {
                email();
            }
            if (txtbox.hasClass('username')) {
                user_check();
            }
            if (txtbox.hasClass('pass')) {
                pass();
                txtbox.attr("Type", "Text");
            }
            if (txtbox.hasClass('img_chng')) {
                txtbox.css({
                    "text-transform": "lowercase"
                });
            }
            $('.save_data').addClass('save_data_active');
        });
    });//end load
});//end ready
















































//EMILLE HENRY