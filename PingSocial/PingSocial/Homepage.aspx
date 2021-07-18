<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Homepage.aspx.cs" Inherits="PingSocial.Homepage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="JS/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="JS/homeScript.js"></script>
    <link href="CSS/homeStyle.css" rel="stylesheet" />
    <title>Welcome to Ping | Login or SignUp</title>
    <link rel="shortcut icon" href="Images/Icons/2.png" type="image/png" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="preloader"></div>
        
	<!-- START LOGIN MODAL -->
        <div id="login_wrapper">
            <div class="login_form">
            <span class="login_form_error_prompt">
                <span class="db_prompt" style="top:0;margin:.3vh 0 0 0;">Username may be incorrect!</span>
                <span class="db_prompt" style="bottom:0;margin:0 0 .3vh 0;">  Password may be incorrect!</span>
            </span>
			<div class="login_form_top">
				<p class="login_form_top_desc">
					SIGN IN TO YOUR PING ACCOUNT
				</p>
				<a href="#" onclick="return false" class="log_close_link">
					<div id="log_close" class="login_form_close"></div>
				</a>
			</div>
			<div class="login_textboxes_cont">
                <div class="textbox_cont">
                    <asp:TextBox id="login_username" class="log_textboxes log_username" autocomplete="off" placeholder="Username" runat="server"></asp:TextBox>
                    <%--<%=log_user_test %>--%>
                    <span id="log_user_error_message" class="error"></span> 
                    <span id="invalid_user"></span>                       
                </div>
                <div class="textbox_cont">
                    <asp:TextBox TextMode="password" id="login_pass" class="log_textboxes log_pass" autocomplete="off" placeholder="Password" runat="server"></asp:TextBox>
                    <%--<%=log_pass_test %>--%>
                    <span id="log_pass_error_message" class="error"></span>
                    <span id="invalid_pass"></span> 
                </div>
				<input type="checkbox" id="check" class="checkboxes" name="chkbox"/>
				<label for="check" id="l_chk" class="l_check"></label>
				<label for="l_chk" class="log_labels">REMEMBER ME</label>
        
				<div class="sign_in_link">
                    <asp:Button ID="homepage_login_button" class="log_sign_but" Text="Sign In" runat="server" />
				</div>
			</div>
			<div class="login_form_bot">
				<p class="login_form_bot_desc">
					FORGOT YOUR <a href="#" onclick="return false" class="log_forgot">USERNAME</a> OR YOUR <a href="#" onclick="return false" class="log_forgot">PASSWORD</a> ?
				</p>
			</div>
        </div>
        </div>
<!-- END LOGIN MODAL -->


<!-- START SIGNUP MODAL -->
    <div id="sign_wrapper">
        <div class="sign_up_cont">				
		<p class="sign_up_title">Sign Up to Ping today!</p>
		<a href="#" onclick="return false" class="sign_close_link">
			<div id="sign_close" class="sign_form_close"></div>
		</a>
		<div class="sign_form">
			<!-- Col1 -->
				<div class="columns col1">
                    <asp:Label runat="server" class="column_labels" Text="Personal Information"></asp:Label>
                    <div class="sign_textbox_cont">
                        <asp:TextBox ID="TextBox1" class="textboxes first_name" autocomplete="off"  placeholder="First Name" runat="server"></asp:TextBox>
                        <span id="first_name_error" class="sign_error"></span>
                    </div>
                    <div class="sign_textbox_cont">
                        <asp:TextBox ID="TextBox2" class="textboxes last_name" autocomplete="off"  placeholder="Last Name" runat="server"></asp:TextBox>
                        <span id="last_name_error" class="sign_error"></span>
                    </div>
                    <div class="sign_textbox_cont">
                        <div class="textboxes gender_but">
                            <p class="gtxt">Gender</p>
                            <ul class="gender_drop">
                                <li id="male" class="gdrop_options male">Male</li>
                                <li class="gdrop_options female">Female</li>
                            </ul>
                        </div>
                        <span id="gender_error" class="sign_error"></span>
                    </div>

                    <div class="sign_textbox_cont">
                        <div class="textboxes relation_but">
                            <p class="rtxt">Marital Status</p>
                            <ul class="relation_drop">
                                <li class="rdrop_options single">Single</li>
                                <li class="rdrop_options relationship">In a Relationship</li>
                                <li class="rdrop_options married">Married</li>
                                <li class="rdrop_options other">Other</li>
                            </ul>
                        </div>
                            <span id="relation_error" class="sign_error"></span>
                    </div>
				</div>
			<!-- end Col1 -->

			<!-- Col2 -->
				<div class="columns col2">
                <asp:Label runat="server" class="column_labels" Text="Contact Information"></asp:Label>
                <div class="sign_textbox_cont">
                    <asp:TextBox ID="TextBox3" class="textboxes address" autocomplete="off" placeholder="Address" runat="server"></asp:TextBox>
                    <span id="address_error" class="sign_error"></span>
                </div>
                <div class="sign_textbox_cont">
					<asp:TextBox ID="TextBox4" class="textboxes home_phone"  autocomplete="off" placeholder="Home Phone" runat="server"></asp:TextBox>
                    <span id="home_phone_error" class="sign_error"></span>
                </div>
                <div class="sign_textbox_cont">
					<asp:TextBox ID="TextBox5" class="textboxes mobile_phone" autocomplete="off" placeholder="Mobile Phone" runat="server"></asp:TextBox>
                    <span id="mobile_phone_error" class="sign_error"></span>
                </div>
                <div class="sign_textbox_cont">
					<asp:TextBox ID="TextBox6" class="textboxes email_address" autocomplete="off" placeholder="Email Address" runat="server"></asp:TextBox>
                    <span id="email_error" class="sign_error"></span>
                </div>
			</div>
			<!-- end Col2 -->

			<!-- Col3 -->
				<div class="columns col3">
                <asp:Label runat="server" class="column_labels" Text="Account Information"></asp:Label>
                <div class="sign_textbox_cont">
					<asp:TextBox ID="TextBox7"  class="textboxes sign_username"  autocomplete="off" placeholder="Username" runat="server"></asp:TextBox>
                    <span id="sign_user_error" class="sign_error"></span>
                    <span id="undb_test">
                        <p id="pop_msg" class="on_input_alerts">
                            <span id="pop_msg_inner"></span>
                        </p>
                    </span>
                </div>
                <div class="sign_textbox_cont">
					<asp:TextBox ID="TextBox8" TextMode="password" class="textboxes sign_pass" autocomplete="off" placeholder="Password" runat="server"></asp:TextBox>
                    <span id="sign_pass_error" class="sign_error"></span>
                    <span id="pass_str" class="on_input_alerts"></span>
                </div>
                <div class="sign_textbox_cont">
					<asp:TextBox ID="TextBox9" TextMode="password"  class="textboxes sign_confirm_pass" autocomplete="off" placeholder="Confirm Password" runat="server"></asp:TextBox>
                    <span id="sign_c_pass_error" class="sign_error"></span>
                    <span id="cpass_str" class="on_input_alerts"></span>
                </div>
                <div class="sign_textbox_cont sign_suc">
                    <span class="sign_up_success">
                        <%-- Sign Up Successful! --%> 
                        <asp:Button class="login_proceed" runat="server" Text="Proceed To Login" />
                    </span>
                            
                </div>
			</div>
			<!-- end Col3 -->
            <p class="sign_text">By clicking signup you are <span class="ping_name">agreeing</span> to our <span class="ping_name">terms</span>, <span class="ping_name">conditions</span>,<span class="ping_name"> privacy</span> AND <span class="ping_name">cookie</span> policies.</p>
            <asp:Button class="submit_but sign_up_button" runat="server" Text="sign up" />
		</div>
	</div>
    </div>
	
<!-- END SIGNUP MODAL -->


<div id="whole_cont">
	<div id="whole_cover"></div>
	<!-- START HEADER -->
		<div class="header">
			<div class="header_top">
				<div class="header_top_cont">
					<div class="lang_button">
						<a href="#" onclick="return false" class="active_lang">ENGLISH</a>
						<ul class="lang_menu">
							<li>
								<%--<a href="#" onclick="return false" class="langs">ESPANOL</a>--%>
                                <a href="#" onclick="return false" class="langs">ENGLISH</a>
							</li>

							<li>
								<%--<a href="#" onclick="return false" class="langs">FRANCAIS</a>--%>
                                <a href="#" onclick="return false" class="langs">ENGLISH</a>
							</li>

<%--									<li>
								<a href="#" onclick="return false" class="langs">ITALIANO</a>
							</li>

							<li>
								<a href="#" onclick="return false" class="langs">DEUSTCH</a>
							</li>--%>
						</ul>
					</div>

					<div class="call_cont">
						<p href="#" onclick="return false" class="call_desc">CALL US :  +44 161 496 0683</p>
					</div>

					<div class="supp_cont">
						<p href="#" onclick="return false" class="supp_desc">SUPPORT : pingsupport@gmail.com</p>
					</div>

					<div class="log_cont">
						<a href="#" onclick="return false" class="login">LOGIN</a>
					</div>
				</div>
			</div>
			<div class="header_main">
				<!-- <div class="logo"></div> -->
				<div class="links_cont">
					<a href="homepage.html" onclick="return false" class="links home_link">HOME</a>
					<a href="#" onclick="return false" class="links ourteam_link">OUR TEAM</a>
					<a href="#" onclick="return false" class="links about_link">ABOUT</a>
					<!-- <a href="#" onclick="return false" class="links history_link">HISTORY</a> -->
					<a href="#" onclick="return false" class="links contact_link">CONTACT US</a>
				</div>
			</div>
		</div>
	<!-- END HEADER -->

	<!-- START MAIN CONTENT -->
		<div class="main">
			<div class="para_abso">
				<div class="para_fix">
					<%--<div class="parallax_blur"></div>--%>
				</div>
			</div>
			<div class="main_cont"> 
				<div class="user_blog">
                    <div class="user_pro_pic"></div> 
					<div class="user_post_info">
                        <div class="user_profile_wrapper">
                            <a href="#" onclick="return false" class="user_profile"></a>
                        </div>
						<p class="post_date"></p>
                        <p class="post_time"></p>
					</div>
					<p class="post_title"></p>
					<p class="user_post"></p>
				</div>
                <p class="sign_up_but_label" runat="server" Text="">Don't Have an Account?</p>
                <input type="button" class="submit_but sign_up" value="Sign Up" />
			</div>
			<div class="footer">
				<p class="footer_text">
					<!-- Registered &#174; --> Copyright &copy; 2015 Powered By <span class="ping_name">Ping Social Network Emille Henry</span> - All Rights Reserved
				</p>
			</div>
		</div>
		<!-- END MAIN CONTENT -->
	</div>
    </form>
</body>
</html>
