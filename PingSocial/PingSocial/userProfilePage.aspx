<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="userProfilePage.aspx.cs" Inherits="PingSocial.userProfilePage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="JS/jquery-1.11.3.js"></script>
    <script src="JS/userProfilePage.js"></script>
    <title>Ping | Profile</title>
    <link href="CSS/userProfileStyle.css" rel="stylesheet" />
    <link rel="shortcut icon" href="Images/Icons/2.png" type="image/png" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="up_preloader"></div>
        <div id="up_cover">
            <div class="edit_modal">
                <div class="modal_wrapper">
                    <div class="view_img_name">
                        <div class="view_img"></div>
                        <p class="view_name"></p>
                    </div>
                    <p class="edit_modal_lbl">edit your profile</p>
                    <p class="edit_modal_lbl">Personal Information</p>
                    <div class="modal_edit_sections">
                        <div class="textbox_conts" style="margin:0;">
                            <asp:TextBox class="textboxes fname" placeholder="First Name" autocomplete="off" runat="server"></asp:TextBox>
                            <div class="txtbox_masks">
                                <div id="fname" class="mask_img fname_img">
                                     <div class="mask_img_lbl">First Name</div>
                                </div>
                                &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                            </div>
                             <span class="error_check">
                                 <span class="error_check_alerts"></span>
                             </span>
                        </div>
                        <div class="textbox_conts">
                            <asp:TextBox class="textboxes lname" placeholder="Last Name" autocomplete="off" runat="server"></asp:TextBox>
                            <div class="txtbox_masks">
                                <div class="mask_img lname_img">
                                     <div class="mask_img_lbl">Last Name</div>
                                </div>
                                &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                            </div>
                            <span class="error_check">
                                <span class="error_check_alerts"></span>
                            </span>
                        </div>
                        <div class="textbox_conts"></div>
                        <div class="textbox_conts"></div>
                    </div>
                    <p class="edit_modal_lbl">Contact Information</p>
                    <div class="modal_edit_sections">
                        <div class="textbox_conts" style="margin:0;">
                            <asp:TextBox class="textboxes address" placeholder="Address" autocomplete="off" runat="server"></asp:TextBox>
                            <div class="txtbox_masks">
                                <div class="mask_img address_img">
                                     <div class="mask_img_lbl">Home Address</div>
                                </div>
                                &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                            </div>
                            <span class="error_check">
                                <span class="error_check_alerts"></span>
                            </span>
                        </div>
                        <div class="textbox_conts">
                            <asp:TextBox class="textboxes home" placeholder="Home Phone" autocomplete="off"  runat="server"></asp:TextBox>
                            <div class="txtbox_masks">
                                <div class="mask_img home_img">
                                     <div class="mask_img_lbl">Home Phone</div>
                                </div>
                                &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                            </div>
                            <span class="error_check">
                                <span class="error_check_alerts"></span>
                            </span>
                        </div>
                        <div class="textbox_conts">
                             <asp:TextBox class="textboxes mobile" placeholder="Mobile Phone" autocomplete="off"  runat="server"></asp:TextBox>
                            <div class="txtbox_masks">
                                <div class="mask_img mobile_img">
                                     <div class="mask_img_lbl">Mobile Phone</div>
                                </div>
                                &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                            </div>
                            <span class="error_check">
                                <span class="error_check_alerts"></span>
                            </span>
                        </div>
                        <div class="textbox_conts">
                             <asp:TextBox class="textboxes email" placeholder="Email Address" autocomplete="off" runat="server"></asp:TextBox>
                            <div class="txtbox_masks">
                                <div class="mask_img email_img">
                                    <div class="mask_img_lbl">Email Address</div>
                                </div>
                                &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                            </div>
                            <span class="error_check">
                                <span class="error_check_alerts"></span>
                            </span>
                        </div>
                    </div>
                    <p class="edit_modal_lbl">Account Information</p>
                    <div class="modal_edit_sections">
                        <div class="textbox_conts" style="margin:0;">
                            <asp:TextBox class="textboxes username" placeholder="Username" autocomplete="off" runat="server"></asp:TextBox>
                            <div class="txtbox_masks">
                                <div class="mask_img username_img">
                                     <div class="mask_img_lbl">Username</div>
                                </div>
                                &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                            </div>
                            <span class="error_check">
                                <span class="error_check_alerts"></span>
                            </span>
                        </div>
                        <div class="textbox_conts">
                            <asp:TextBox TextMode="password" class="textboxes pass" placeholder="Password" autocomplete="off" runat="server"></asp:TextBox>
                            <div class="txtbox_masks">
                                <div class="mask_img pass_img">
                                     <div class="mask_img_lbl">Password</div>
                                </div>
                                &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                            </div>
                            <span class="error_check">
                                <span class="error_check_alerts"></span>
                            </span>
                        </div>
                        <div class="textbox_conts">
                            <asp:TextBox class="textboxes cpass" placeholder="Confirm Password" autocomplete="off" runat="server"></asp:TextBox>
                            <div class="txtbox_masks">
                                <div class="mask_img cpass_img">
                                     <div class="mask_img_lbl">Confirm Password</div>
                                </div>
                                &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                            </div>
                            <span class="error_check">
                                <span class="error_check_alerts"></span>
                            </span>
                        </div>
                        <div class="textbox_conts">
                            <asp:TextBox class="textboxes img_chng" placeholder="Profile Picture" autocomplete="off" runat="server"></asp:TextBox>
                            <div class="txtbox_masks">
                                <div class="mask_img img_chng_img">
                                     <div class="mask_img_lbl">Profile Picture</div>
                                </div>
                                &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                            </div>
                        </div>
                    </div>
                    <p class="edit_modal_lbl">Biography Section</p>
                    <div class="modal_edit_sections">
                        <div class="textbox_conts" style="margin:0;width:100%;">
                             <asp:TextBox class="textboxes bio" placeholder="Your Biography" TextMode="MultiLine" runat="server"></asp:TextBox>
                            <div class="txtbox_masks">
                                <div class="mask_img bio_img">
                                     <div class="mask_img_lbl">Biography</div>
                                </div>
                                &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                            </div>
                             <span class="error_check">
                                <span class="error_check_alerts"></span>
                            </span>
                        </div>
                        <asp:HiddenField id="userID" runat="server" />
                    </div>
                </div>
                <asp:Button class="close_modal" runat="server" Text="Cancel" />
                <asp:Button class="save_data" runat="server" Text="Update" />
            </div>
        </div>
        <div id="up_wrapper"> 
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
            <div class="main_cont">
                <div class="main_center">
                    <div class="profile_edit_section">
                        <div class="profile_edit_section_img_blurred"></div>
                        <div class="user_image_huge"></div> 
                        <div class="profile_edit_section_inner">
                            <p class="user_entire_name">Your User Name Here!</p>
                            <p class="user_bio_view">Your Biography Goes Here!</p>
                             
                             <div class="delete_wrapper">
                                 <asp:Button class="delete_post" runat="server" Text="D" />
                                 <p class="delete_lbl">Delete Post</p>
                             </div>
                             <asp:Button class="edit_profile" runat="server" Text="Edit My Profile" />    
                          <%-- <p class="edit_section_lbl">Personal Information</p>
                            <div class="edit_personal_cont edit_conts">
                                <div class="edit_fields" style="margin:0;">
                                    <div class="field_img fname_img"></div>
                                   &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                </div>
                                <div class="edit_fields">
                                     <div class="field_img lname_img"></div>
                                   &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                </div>
                                <div class="edit_fields">
                                     <div class="field_img gender_img"></div>
                                   &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                </div>
                                <div class="edit_fields">
                                     <div class="field_img status_img"></div>
                                   &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                </div>
                            </div>
                            <p class="edit_section_lbl">Contact Information</p>
                            <div class="edit_personal_cont edit_conts">
                                <div class="edit_fields" style="margin:0;">
                                    <div class="field_img address_img"></div>
                                   &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                </div>
                                <div class="edit_fields">
                                     <div class="field_img home_img"></div>
                                   &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                </div>
                                <div class="edit_fields">
                                     <div class="field_img mobile_img"></div>
                                   &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                </div>
                                <div class="edit_fields">
                                     <div class="field_img email_img"></div>
                                   &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                </div>
                            </div>
                            <p class="edit_section_lbl">Account Information</p>
                            <div class="edit_personal_cont edit_conts">
                                <div class="edit_fields" style="margin:0;">
                                    <div class="field_img username_img"></div>
                                   &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                </div>
                                <div class="edit_fields">
                                     <div class="field_img pass_img"></div>
                                   &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                </div>
                                <div class="edit_fields">
                                     <div class="field_img cpass_img"></div>
                                   &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                </div>
                                <asp:Button class="edit_profile" runat="server" Text="Edit My Profile" />
                            </div>--%>
                        </div>
                    </div>
                    <div class="up_posts_wrapper"></div>
                </div>
            </div>
        </div>    
    </form>
</body>
</html>

