$(document).ready(function () {
    //$('.sliders').css({ "animation-play-state": "paused" });
    $('.login_form_error_prompt').fadeOut("fast");
    $('.preloader').delay(2000).fadeOut("fast");

    function PostfadeOut() {
        $('.post_title').removeClass('post_appear');
        $('.user_pro_pic').removeClass('post_appear');
        $('.user_profile_wrapper').removeClass('post_appear');
        $('.post_date').removeClass('post_appear');
        $('.post_time').removeClass('post_appear');
        $('.user_post').removeClass('post_appear');
    }

   //I'm retrieving all posts here to traverse through them
    function allPosts() {
        var y = " ";
        $.ajax({
            method: 'post',
            url: 'Homepage.aspx/getAllPosts',
            contentType: 'application/json',
            data:JSON.stringify({'y':y}),
            dataType: 'json',
            success: function (data) {

                var num2 = parseInt(Math.ceil((Math.random() * data.d.length - 1) + 0));
                printPost(num2);


                var gen = setInterval(function () {
                    var num1 = parseInt(Math.ceil((Math.random() * data.d.length - 1) + 0));
                    removePost(num1);
                    //printPost(num1);
                },15000);
                
                function removePost(num1) {
                    PostfadeOut();
                    var delayCall = setTimeout(function () {
                        printPost(num1);
                    }, 2000);
                }

                function printPost(num1) {
                    $('.user_pro_pic').css({
                        "background-image": "url(" + data.d[num1].uimg + ")",
                    }).addClass('post_appear');
                    $('.post_title').html(data.d[num1].utitle).addClass('post_appear');
                    $('.user_profile_wrapper').addClass('post_appear');
                    $('.user_profile').html(data.d[num1].unm);
                    $('.post_date').html(data.d[num1].udate).addClass('post_appear');
                    $('.post_time').html(data.d[num1].utime).addClass('post_appear');
                    $('.user_post').html(data.d[num1].upost).addClass('post_appear');
                };
            }
        });
    };
    allPosts();

    var imgs=[
        "url(Images/ParaImages/editbg.png)",
        "url(Images/ParaImages/bridge.png)",
        "url(Images/ParaImages/newyork.png)",
        "url(Images/ParaImages/paris1.png)",
        "url(Images/ParaImages/whoa.png)",
        "url(Images/ParaImages/tokyo.png)",
        "url(Images/ParaImages/bridge.png)",
        "url(Images/ParaImages/colosseum.jpg)",
        "url(Images/ParaImages/nature-wallpaper-full-hd-5wpb.jpg)",
        "url(Images/ParaImages/1e8d726bcea1bf4dcc2d275b3754ec95.jpg)",
        "url(Images/ParaImages/6771033-architecture-wallpaper.jpg)",
        "url(Images/ParaImages/737905-architecture-wallpapers.jpg)",
        "url(Images/ParaImages/737941-architecture-wallpapers.jpg)",
        "url(Images/ParaImages/architecture_style_design_rooms_buildings_48206_3840x2160.jpg)",
        "url(Images/ParaImages/cool.jpg)",
        "url(Images/ParaImages/Paris-Architecture-High-Definition-Wallpaper.jpg)"
    ];

    
    var img_startup = parseInt(Math.ceil(Math.random() * 15 ) + 0);

    $('.para_fix').css({
        "background-image": imgs[img_startup],
        "transition": "background-image 1s ease"
    });

    var bg_imgs = setInterval(function bg_images() {
        var img_index = parseInt(Math.ceil(Math.random() * 15) + 0);
        $('.para_fix').css({
            "background-image": imgs[img_index],
            "opacity": "1",
            "transition": "all 3s ease .2s"
        });
    },10000);

    $(window).load(function () {
		$('.preloader').delay().fadeOut("slow");	

		// LOGIN MODAL WINDOW
		    $('.login').click(function (event) {
		    event.preventDefault();
				$('.login_form').toggleClass('login_appear');
				$('#whole_cont').toggleClass('whole_cont');
				$('#whole_cover').toggleClass('whole_cover');
				$('#login_wrapper').toggleClass('login_wrapper');

				$('#whole_cover').click( function (){
					$('#whole_cover').removeClass('whole_cover');
					$('.login_form').removeClass('login_appear');
					$('#whole_cont').removeClass('whole_cont');
					$('#login_wrapper').removeClass('login_wrapper');
				});

				$('.log_close_link').click(function (){
					$('#whole_cover').removeClass('whole_cover');
					$('.login_form').removeClass('login_appear');
					$('#whole_cont').removeClass('whole_cont');
					$('#login_wrapper').removeClass('login_wrapper');
				});
			});
		//END LOGIN MODAL WINDOW

		// SIGN UP MODAL WINDOW
			$('.sign_up').click(function (event) {
			    event.preventDefault();
				$('.sign_up_cont').toggleClass('sign_up_appear');
				$('#whole_cont').toggleClass('whole_cont');
				$('#whole_cover').toggleClass('whole_cover');

				$('#whole_cover').click( function (){
					$('#whole_cover').removeClass('whole_cover');
					$('.sign_up_cont').removeClass('sign_up_appear');
					$('#whole_cont').removeClass('whole_cont');
				});

				$('.sign_close_link').click(function (){
					$('#whole_cover').removeClass('whole_cover');
					$('.sign_up_cont').removeClass('sign_up_appear');
					$('#whole_cont').removeClass('whole_cont');
				});
			});
	    // END SIGN UP MODAL WINDOW

	    //LOGIN MODAL SIGN IN VALIDATION
			$('.log_sign_but').click(function (e) {
			    e.preventDefault();
			    var log_valid = false;
			    var log_user_check = /^(?=.*[!@$-_])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
			    var log_pass_check = /^(?=.*[0-9])(?=.*[!@$-_])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
			    var log_username = $('.log_username').val();
			    var log_pass = $('.log_pass').val()
			    if (!log_user_check.test(log_username)) {
			        //$('#log_user_error_message').removeclass('no_error_appear');
			        //$('#log_user_error_message').addclass('error_appear');
			        $('#log_user_error_message').css({
			            "color": "rgba(220,20,60,1)",
			            "background-color": "rgba(220,20,60,.2)",
			            "opacity": "1",
			            "background-image": "url(../images/redicons/sign6.png)",
			            "text-transform": "capitalize"
			        });
			        $('#log_user_error_message').html("please enter a valid username!");
			        log_valid = false;
			    }
			    if (log_user_check.test(log_username)) {
			        //$('#log_user_error_message').removeclass('error_appear');
			        //$('#log_user_error_message').addclass('no_error_appear');
			        $('#log_user_error_message').css({
			            "color": "rgba(26,177,133,1)",
			            "background-color": "rgba(26,177,133,.2)",
			            "opacity": "1",
			            "background-image": "url(../images/greenicons/sign6.png)",
			            "text-transform": "capitalize"
			        });
			        $('#log_user_error_message').html("valid!");
			        log_valid = true;
			    }
			    if (!log_pass_check.test(log_pass)) {
			        //$('#log_pass_error_message').addclass('error_appear');
			        $('#log_pass_error_message').css({
			            "color": "rgba(220,20,60,1)",
			            "background-color": "rgba(220,20,60,.2)",
			            "opacity": "1",
			            "background-image": "url(../images/redicons/sign6.png)",
			            "text-transform": "capitalize"
			        });
			        $('#log_pass_error_message').html("please enter a valid password!");
			        log_valid = false;
			    }
			    if (log_pass_check.test(log_pass)) {
			        //$('#log_pass_error_message').removeclass('error_appear');
			        //$('#log_pass_error_message').addclass('no_error_appear');
			        $('#log_pass_error_message').css({
			            "color": "rgba(26,177,133,1)",
			            "background-color": "rgba(26,177,133,.2)",
			            "opacity": "1",
			            "background-image": "url(../images/greenicons/sign6.png)",
			            "text-transform": "capitalize"
			        });
			        $('#log_pass_error_message').html("valid!");
			        log_valid = true;
			    }
			    if (!log_user_check.test(log_username) && !log_pass_check.test(log_pass)) {
			        log_valid = false;
			    }
			    if (!log_user_check.test(log_username) || !log_pass_check.test(log_pass)) {
			        log_valid = false;
			    }
			    if (log_valid == true) {
			        $.ajax({
			            url: 'Homepage.aspx/user_Login',
			            method: 'post',
			            contentType: 'application/json',
			            data: JSON.stringify({ 'uname': log_username, 'pass': log_pass}),
			            dataType: 'json',
			            success: function (data) { 
			                function data_test(data) {
			                    $('.log_textboxes').val("");
			                    $('#log_pass_error_message').css({
			                        "color": "rgba(26,177,133,0)",
			                        "background-color": "rgba(26,177,133,0)",
			                        "opacity": "0",
			                        "background-image": "url(../images/greenicons/sign6.png)",
			                        "text-transform": "capitalize"
			                    });
			                    $('#log_user_error_message').css({
			                        "color": "rgba(26,177,133,0)",
			                        "background-color": "rgba(26,177,133,0)",
			                        "opacity": "0",
			                        "background-image": "url(../images/greenicons/sign6.png)",
			                        "text-transform": "capitalize"
			                    });
			                    var log_test = false;
			                    function callPrompt(){
			                        $('.login_form_error_prompt').fadeIn("slow").delay(100).fadeOut("slow");
			                    }
			                    if (data.d.userName != null) {
			                        log_test = true;
			                    }
			                    else{
			                        callPrompt();
			                        log_test = false;
			                    }
			                    return log_test;
			                }
			                data_test(data);
			                if (data_test(data) == true && $('#check').prop('checked') == true) {
			                    sessionStorage.removeItem("loggedUserTemp");
			                    localStorage.setItem("loggedUserPerm", JSON.stringify(data.d));
			                    window.location.href = ("UserHomepage.aspx");
			                }
			                if (data_test(data) == true && $('#check').prop('checked') == false) {
			                    localStorage.removeItem("loggedUserPerm");
			                    sessionStorage.setItem("loggedUserTemp", JSON.stringify(data.d));
			                    window.location.href = ("UserHomepage.aspx");
			               }
			            },
			            error: function (error) {
			                alert(error.d);
			            }
                    });
			    }			    
			});
        //END LOGIN MODAL SIGN IN VALIDATION

        //SIGN UP MODAL VALIDATION
			$('#undb_test').click(function () {
			    if ($('#pop_msg').css("display") == "none") {
			        $('#pop_msg').css({
			            "display": "inline-block",
			            "transition": "display 1s ease, color 0s ease"
			        });
			    }
			    else {
			        $('#pop_msg').css({
			            "display": "none",
			            "transition": "display 1s ease, color 0s ease"
			        });
			    }
			    //$('#pop_msg').toggleClass('pop_toggle');
			});

			gtext = ""; rtext = "";

			$('.gtxt').click(function () {
			    $('.gender_but').toggleClass('select_active');
			    //$('.gender_drop').toggleClass('drop_toggle');
			    $('.gdrop_options').toggleClass('grin');
			    $('.gtxt').css("color" , "rgba(255,255,255,1)");
			});

			$('.gdrop_options').click(function () {
			    gtext = $(this).text();
			    $('.gtxt').text(gtext);
			    $('.gdrop_options').removeClass('grin');
			    $('.gender_but').removeClass('select_active');
			    $('.gtxt').css({ "color": "rgba(255,255,255,1" });
			    if (gtext == "Male") {
			        $('.gtxt').css({
			            "background-image": "url(../Images/BlueIcons/male.png)",
                        "background-size" : "1.6vh"
			        });
			        //$('.gdrop_options').removeClass('grin');
			        //$('.gender_drop').removeClass('drop_toggle');
			        //$('.gender_but').removeClass('select_active');
			    }
			    else if (gtext == "Female") {
			        $('.gtxt').css({
			            "background-image": "url(../Images/BlueIcons/female.png)",
			            "background-size": "1.6vh"
			        });
			        //$('.gdrop_options').removeClass('grin');
			        //$('.gender_drop').removeClass('drop_toggle');
			    //    $('.gender_but').removeClass('select_active');
			    }
			    //alert(gtext);
			});

			$('.rtxt').click(function () {
			    $('.relation_but').toggleClass('select_active');
			    //$('.relation_drop').toggleClass('drop_toggle');
			    $('.rdrop_options').toggleClass('grin');
			    $('.rtxt').css("color", "rgba(255,255,255,1)");
			});

			$('.rdrop_options').click(function () {
			    rtext = $(this).text();
			    $('.rtxt').text(rtext);
			    $('.relation_but').removeClass('select_active');
			    $('.rdrop_options').removeClass('grin');
			    $('.rtxt').css({ "color": "rgba(255,255,255,1" });
			    if (rtext == "Single") {
			        $('.rtxt').css({
			            "background-image": "url(../Images/BlueIcons/single.png)",
			            "background-size": "2vh"
			        });			    
			    }
			    if (rtext == "In a Relationship") {
			        $('.rtxt').css({
			            "background-image": "url(../Images/BlueIcons/relationship.png)",
			            "background-size": "2vh"
			        });
			    }
			    if (rtext == "Married") {
			        $('.rtxt').css({
			            "background-image": "url(../Images/BlueIcons/married.png)",
			            "background-size": "2vh"
			        });
			    }
			    if (rtext == "Other") {
			        $('.rtxt').css({
			            "background-image": "url(../Images/BlueIcons/heart.png)",
			            "background-size": "2vh"
			        });
			    }
			    //alert(rtext);
			});

			$('.sign_username').focusin(function () { 
			    $('.sign_username').on('propertychange input',function () {
			        var sign_user_name = $('.sign_username').val();
			        //$('.sign_up_title').html("NAme: " + sign_user_name);
			        $.ajax({
			            url: 'Homepage.aspx/unames_db',
			            method: 'post',
			            contentType: 'application/json',
			            data: JSON.stringify({'uname': sign_user_name}),
			            dataType: 'json',
			            success: function (data) {
			                if (data.d == "false") {
			                    $('#undb_test').removeClass('un_good');
			                    $('#undb_test').addClass('un_bad');
			                    $('#pop_msg').html( "'"+ sign_user_name+ "'" + " is Unavailable!");
			                    $('#pop_msg').css({
			                        "color": "rgba(220,20,60,1)",
			                        //"background-color": "rgba(220,20,60,.2)"
			                    });
			                }
			                if(data.d == "true") {
			                    $('#undb_test').removeClass('un_bad');
			                    $('#undb_test').addClass('un_good');
			                    $('#pop_msg').html("'"+ sign_user_name+ "'" +" is Available!");
			                    $('#pop_msg').css({
			                        "color": "rgba(26,177,133,1)",
			                        //"background-color": "rgba(26,177,133,.2)"
			                    });
			                }
			                //$('.sign_up_title').html(data.d + "");
			            },
			            failure: function (data) {
			                alert("nope" + data.d);
			            }
			        });
			    });
			});

			var pass; var cpass;
			$('.sign_pass').focusin(function () {
			    $('.sign_pass').on('propertychange input',function () {
			        pass = $('.sign_pass').val();
			        if (pass.length == 0) {
			            $('#pass_str').css({ "color": "rgba(220,20,60,1)" });
			            $('#pass_str').html("");
			        }
			        if (pass.length > 0 && pass.length <= 6) {
			            $('#pass_str').css({"color": "rgba(220,20,60,1)"});
			            $('#pass_str').html("Password is too short!");
			        }
			        if (pass.length > 6) {
			            $('#pass_str').css({ "color": "rgba(220,20,60,1)"});
			            $('#pass_str').html("Password is weak!");
			        }
			        if (pass.length >= 10) {
			            $('#pass_str').css({ "color": "rgba(255,87,51,1)"});
			            $('#pass_str').html("Password is Medium Strength!");
			        }
			        if (pass.length >= 15) {
			            $('#pass_str').css({ "color": "rgba(26,177,133,1)" });
			            $('#pass_str').html("Password is Quite Strong!");
			        }
			        //if (cpass != pass) {
			        //    $('#cpass_str').css({ "color": "rgba(220,20,60,1)" });
			        //    $('#cpass_str').html("Passwords don't Match!");
			        //}
			    });
			});

			$('.sign_confirm_pass').focusin(function () {
			    $('.sign_confirm_pass').on('propertychange input', function (){
			        cpass = $('.sign_confirm_pass').val();
			        if (cpass.length == 0) {
			            $('#cpass_str').css({ "color": "rgba(220,20,60,1)" });
			            $('#cpass_str').html("");
			        }
			        if (cpass != pass) {
			            $('#cpass_str').css({ "color": "rgba(220,20,60,1)" });
			            $('#cpass_str').html("Passwords don't Match!");
			        }
			        if (cpass == pass) {
			            $('#cpass_str').css({ "color": "rgba(26,177,133,1)" });
			            $('#cpass_str').html("Passwords Match!");
			        }
			    });
			});

			$('.sign_up_button').click(function (event) {
			    event.preventDefault();
			    var sign_valid = false;
			    var fname = $('.first_name').val();
			    var lname = $('.last_name').val();
			    var gender = gtext;
			    var rstatus = rtext;
			    var address = $('.address').val();
			    var hphone = $('.home_phone').val();
			    var mphone = $('.mobile_phone').val();
			    var email = $('.email_address').val();
			    var sign_user = $('.sign_username').val();
			    var sign_pass = $('.sign_pass').val();
			    var sign_c_pass = $('.sign_confirm_pass').val();
			    var f_l_check = /^[a-zA-Z,-/'/]{2,30}$/;
			    var address_check = /^[a-zA-Z0-9#,. ]{10,50}$/;
			    var phone_check = /^[0-9-]{7,8}$/;
			    var email_check = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			    var s_user_check = /^(?=.*[!@$-_])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
			    var s_pass_check = /^(?=.*[0-9])(?=.*[!@$-_])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

			    if (!f_l_check.test(fname)) {
			        $('#first_name_error').removeClass('s_good_alert');
			        $('#first_name_error').addClass('s_bad_alert');
			        $('#first_name_error').html("Invalid Format!");
			        sign_valid = false;
			    }
			    if (f_l_check.test(fname)) {
			        $('#first_name_error').removeClass('s_bad_alert');
			        $('#first_name_error').addClass('s_good_alert');
			        $('#first_name_error').html("Valid!");
			        sign_valid = true;
			    }
			    if (!f_l_check.test(lname)) {
			        $('#last_name_error').removeClass('s_good_alert');
			        $('#last_name_error').addClass('s_bad_alert');
			        $('#last_name_error').html("Invalid Format!");
			        sign_valid = false;
			    }
			    if (f_l_check.test(lname)) {
			        $('#last_name_error').removeClass('s_bad_alert');
			        $('#last_name_error').addClass('s_good_alert');
			        $('#last_name_error').html("Valid!");
			        sign_valid = true;
			    }
			    function g_test() {
			        if (gender != "Male" || gender != "Female") {
			            sign_v = false;
			        }
			        if (gender == "Male" || gender == "Female") {
			            sign_v = true;
			        }
			        return sign_v;
			    };
			    if (g_test() == false) {
			        $('#gender_error').removeClass('s_good_alert');
			        $('#gender_error').addClass('s_bad_alert');
			        $('#gender_error').html("Select One!");
			        sign_valid = false;
			    }
			    if (g_test() == true) {
			        $('#gender_error').removeClass('s_bad_alert');
			        $('#gender_error').addClass('s_good_alert');
			        $('#gender_error').html("Valid!");
			        sign_valid = true;
			    }
			    function r_test() {
			        if (rstatus != "Single" || rstatus != "In a Relationship" || rstatus != "Married" || rstatus != "Other") {
			            sign_vs = false;
			        }
			        if (rstatus == "Single" || rstatus == "In a Relationship" || rstatus == "Married" || rstatus == "Other") {
			            sign_vs = true;
			        }
			        return sign_vs;
			    };
			    if (r_test() == false) {
			        $('#relation_error').removeClass('s_good_alert');
			        $('#relation_error').addClass('s_bad_alert');
			        $('#relation_error').html("Select One!");
			        sign_valid = false;
			    }
			    if (r_test() == true) {
			        $('#relation_error').removeClass('s_bad_alert');
			        $('#relation_error').addClass('s_good_alert');
			        $('#relation_error').html("Valid!");
			        sign_valid = true;
			    }
			    if (!address_check.test(address)) {
			        $('#address_error').removeClass('s_good_alert');
			        $('#address_error').addClass('s_bad_alert');
			        $('#address_error').html("Invalid Format!");
			        sign_valid = false;
			    }
			    if (address_check.test(address)) {
			        $('#address_error').removeClass('s_bad_alert');
			        $('#address_error').addClass('s_good_alert');
			        $('#address_error').html("Valid!");
			        sign_valid = true;
			    }
			    if (!phone_check.test(hphone)) {
			        $('#home_phone_error').removeClass('s_good_alert');
			        $('#home_phone_error').addClass('s_bad_alert');
			        $('#home_phone_error').html("Invalid Format!");
			        sign_valid = false;
			    }
			    if (phone_check.test(hphone)) {
			        $('#home_phone_error').removeClass('s_bad_alert');
			        $('#home_phone_error').addClass('s_good_alert');
			        $('#home_phone_error').html("Valid!");
			        sign_valid = true;
			    }
			    if (!phone_check.test(mphone)) {
			        $('#mobile_phone_error').removeClass('s_good_alert');
			        $('#mobile_phone_error').addClass('s_bad_alert');
			        $('#mobile_phone_error').html("Invalid Format!");
			        sign_valid = false;
			    }
			    if (phone_check.test(mphone)) {
			        $('#mobile_phone_error').removeClass('s_bad_alert');
			        $('#mobile_phone_error').addClass('s_good_alert');
			        $('#mobile_phone_error').html("Valid!");
			        sign_valid = true;
			    }
			    if (!email_check.test(email)) {
			        $('#email_error').removeClass('s_good_alert');
			        $('#email_error').addClass('s_bad_alert');
                    $('#email_error').html("Invalid Format!");
                    sign_valid = false;
			    }
			    if (email_check.test(email)) {
			        $('#email_error').removeClass('s_bad_alert');
			        $('#email_error').addClass('s_good_alert');
			        $('#email_error').html("Valid!");
			        sign_valid = true;
			    }
			    if (!s_user_check.test(sign_user)) {
                    $('#undb_test').addClass('un_bad');
                    $('#pop_msg').html("Username is Invalid!");
                    $('#pop_msg').css({
                        "color": "rgba(220,20,60,1)",
                        //"background-color": "rgba(2620,20,60,.2)"
                    });
			        sign_valid=false;
			    }
			    if (s_user_check.test(sign_user)) {
			        $('#undb_test').addClass('un_good');
			        $('#pop_msg').html("Valid!");
			        $('#pop_msg').css({
			            "color": "rgba(26,177,133,1)",
			            //"background-color": "rgba(26,177,133,.2)"
			        });
			        sign_valid = true;
			    }
			    if(!s_pass_check.test(sign_pass)){
			        $('#sign_pass_error').removeClass('s_good_alert');
			        $('#sign_pass_error').addClass("s_bad_alert");
			        $('#sign_pass_error').html("Invalid Format");
			        sign_valid = false;
			    }
			    if(s_pass_check.test(sign_pass)){
			        $('#sign_pass_error').removeClass('s_bad_alert');
			        $('#sign_pass_error').addClass("s_good_alert");
			        $('#sign_pass_error').html("Valid!");
			        sign_valid = true;
			    }
			    if(sign_c_pass != sign_pass || !s_pass_check.test(sign_c_pass)){
			        $('#sign_c_pass_error').removeClass('s_good_alert');
			        $('#sign_c_pass_error').addClass('s_bad_alert');
			        $('#sign_c_pass_error').html("No Match!");
			        sign_valid = false;
			    }
			    if(sign_c_pass == sign_pass){
			        $('#sign_c_pass_error').removeClass('s_bad_alert');
			        $('#sign_c_pass_error').addClass('s_good_alert');
			        $('#sign_c_pass_error').html("Match!");
			        sign_valid = true;
			    }
			    if (f_l_check.test(fname) && f_l_check.test(lname) && g_test() == true && r_test() == true && address_check.test(address) && phone_check.test(hphone) && phone_check.test(mphone) && email_check.test(email) && s_user_check.test(sign_user) && s_pass_check.test(sign_pass) && sign_c_pass == sign_pass) {
                    sign_valid=true;
			    }
			    else {
			        sign_valid = false;
			    }
			    if (sign_valid == true) {
			        $.ajax({
			            url: 'Homepage.aspx/store_User',
			            method: 'post',
			            contentType: 'application/json',
			            data: JSON.stringify({ 'ufirst_name': fname, 'ulast_name': lname, 'uaddress': address, 'uhphone': hphone, 'umphone': mphone, 'uemail': email, 'urstat': rstatus, 'ugender': gender, 'user_name': sign_user, 'pass_wrd': sign_pass, 'cp':sign_c_pass}),
			            dataType: 'json',
			            success: function (data) {
			                $('.sign_error').removeClass('s_bad_alert').removeClass('s_good_alert');
			                $('.textboxes').val("");
			                $('.rtxt').html("Marital Status");
			                $('.rtxt').css({
			                    "color": "rgba(255,255,255,.6)",
			                    "background-image": "url(../Images/BlueIcons/heart.png)",
			                    "background-size": "2vh"
			                });
			                $('.gtxt').html("Gender");
			                $('.gtxt').css({
                                "color":"rgba(255,255,255,.6)",
			                    "background-image": "url(../Images/BlueIcons/gender.png)",
			                    "background-size": "1.6vh"
			                })
			                $('#pop_msg').html("");
			                $('#pass_str').html("");
			                $('#cpass_str').html("");
			                $('.sign_up_success').css({
			                    "opacity": "1",
			                    "visibility": "visible",
			                    "transition": "visibility 0s, opacity .8s ease .2s"
			                });
			                $('.login_proceed').css({
			                    "opacity": "1",
			                    "visibility": "visible",
			                    "transform": "translateY(0%)",
			                    "transition": "visibility 0s, opacity .8s ease .2s, transform .1s ease .2s"
			                });
			                //alert("Welcome "+ data.d.uname);
			            },
			            failure: function (error) {
			                alert(error.d);
			            }
			        });
			    }		    
			});
  
			$('.login_proceed').click(function (event) {
			    event.preventDefault();
			    $('.sign_up_cont').removeClass('sign_up_appear');
			    $('.sign_up_cont').css({"transition":"all .6s ease"});
			    $('.login_form').addClass('login_appear');
			    $('.login_form').css({ "transition": "all .6s ease .4s" });
			    $('.sign_up_success').css({
			                "opacity": "0",
			                "visibility": "hidden",
			                "transition": "visibility 0s, opacity .8s ease .2s"
			            });
			    $('.login_proceed').css({
			        "opacity": "0",
			        "visibility": "hidden",
			        "transform": "translateY(0%)",
			        "transition": "visibility 0s, opacity .8s ease .2s, transform .1s ease .2s"
			    });
			    $('#whole_cover').click(function () {
			        $('#whole_cover').removeClass('whole_cover');
			        $('.login_form').removeClass('login_appear');
			        $('#whole_cont').removeClass('whole_cont');
			    });

			    $('.log_close_link').click(function () {
			        $('#whole_cover').removeClass('whole_cover');
			        $('.login_form').removeClass('login_appear');
			        $('#whole_cont').removeClass('whole_cont');
			    });
			});
        //END SIGN UP MODAL VALIDATION
    });  
});
