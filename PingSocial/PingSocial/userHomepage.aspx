<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="userHomepage.aspx.cs" Inherits="PingSocial.userHomepage" %>

<%--<!DOCTYPE html>--%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="JS/jquery-1.11.3.js"></script>
    <script src="JS/userHomepageScript.js"></script>
    <title>Ping | User Home</title>
    <link href="CSS/userHomeStyle.css" rel="stylesheet" />
    <link rel="shortcut icon" href="Images/Icons/2.png" type="image/png" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="uh_preloader"></div>
        <asp:Button class="uh_top" runat="server" Text="" />
        <div id="modal_wrapper">
            <div class="post_Modal">
            <p class="post_header">Make a Post!</p>
            <div class="textboxes_cont">
                <div class="textbox_cnt" style="margin:0 0 2vh 0;">
                    <asp:TextBox class="post_title" runat="server" placeholder="Your Post Title" autocomplete="off"></asp:TextBox>
                    <span id="title_error" class="error_ms"></span>
                     <span class="user_title_img"></span>
                </div>             
                <div class="textbox_cnt">
                    <asp:TextBox class="post_box" TextMode="Multiline" runat="server" placeholder="Say Something..." autocomplete="off"></asp:TextBox>
                    <span id="pst_error" class="error_ms"></span>
                </div>
            </div>
            <div class="post_btns">
                <asp:Button id="post_confrm" class="pst_Btns" runat="server" Text="Share" />
                <asp:Button id="post_cancel" class="pst_Btns" runat="server" Text="Cancel" />
            </div>
        </div>
        </div>
        
        <div id="uh_wrapper">
            <div id="uh_cover"></div>
            <header class="header">
                <a href="userHomepage.aspx">
                    <div class="logo"></div>
                    <p class="site_name">Ping</p>
                </a>
                <div class="user_pic_hold">
                    <div class="user_pic">
                        <p class="user_name_bubble"></p>
                    </div>
                    <div class="user_pic_inner">
                        <p class="user_name"></p>
                        <div class="u_inner_left">
                            <div class="user_pic_larger">
                                <asp:FileUpload ID="FileUpload1"  runat="server" />
                                <label for="FileUpload1" class="chng_img"></label>
                            </div>
                        </div>
                        <div class="user_pic_inner_opts">
                           <%-- <asp:Button id="view_profile" class="u_i_p_links" runat="server" Text="View My Profile" />--%>
                            <asp:Button id="log_out" class="u_i_p_links" runat="server" Text="Logout" />
                        </div>
                        
                    </div>
                </div>
            </header>
            <section class="main_cont">
                <div class="main_left_cont">
                    <div class="user_ball">
                        <p class="user_ball_name"></p>
                        <div class="u_balls_cont">
                            <div id="postBtn" class="u_balls u_ball1">
                                <p class="uball_label ub_lbl1">Post</p>
                            </div>
                            <div id="feedBtn" class="u_balls u_ball2">
                                <p class="uball_label ub_lbl2">Feed</p>
                            </div>
                            <div id="profileBtn" class="u_balls u_ball3">
                                <p class="uball_label ub_lbl3" style="width:5vw;">My Profile</p>
                            </div>
                            <%--<asp:Button id="postBtn" class="u_balls u_ball1" runat="server" />--%>
                            <%--<asp:Button id="feedBtn" class="u_balls u_ball2" runat="server" />--%>
                            <%--<asp:Button id="profileBtn" class="u_balls u_ball3" runat="server" />--%>
                        </div>
                    </div>
                </div>
                <div id="posts_section" class="posts_section_cont"></div>
            </section>
        </div>
    </form>
</body>
</html>
             