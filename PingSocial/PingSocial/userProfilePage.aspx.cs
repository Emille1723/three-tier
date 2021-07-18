using System;
using System.Collections;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Configuration;
using System.Data.OleDb;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Text.RegularExpressions;
using System.Web.Services;

namespace PingSocial
{
    public partial class userProfilePage : System.Web.UI.Page
    {
        [WebMethod]
        public static User userData(String user)
        {
            String cs = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
            cs = String.Format(cs, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = cs;
            connection.Open();
            User userProfile = new User();
            OleDbCommand user_check = new OleDbCommand("select count(username) from user_table where username='" + user + "'", connection);
            int ucheck = int.Parse((user_check.ExecuteScalar().ToString()));
            if (ucheck == 1)
            {
                OleDbDataReader reader = new OleDbCommand("select * from user_table where username='" + user + "'", connection).ExecuteReader();
                reader.Read();
                userProfile.id = reader["ID"].ToString();
                userProfile.fname = reader["firstName"].ToString();
                userProfile.lname = reader["lastName"].ToString();
                userProfile.address = reader["Address"].ToString();
                userProfile.hphone = reader["homePhone"].ToString();
                userProfile.mphone = reader["mobilePhone"].ToString();
                userProfile.email = reader["emailAddress"].ToString();
                userProfile.rstat = reader["maritalStatus"].ToString();
                userProfile.gender = reader["Gender"].ToString();
                userProfile.uname = reader["userName"].ToString();
                userProfile.pas_swrd = reader["userpassw"].ToString();
                userProfile.cpas_swrd = reader["confirmuserpassw"].ToString();
                userProfile.user_img= reader["imgsrc"].ToString();
                userProfile.user_bio = reader["bio"].ToString();
            }
            connection.Close();
            return userProfile;
        }

        [WebMethod]
        public static User updateUserData(String ID, String fname, String lname, String address, String home, String mobile, String email, String username, String pass, String cpass, String pic, String bio)
        {
            String cs = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
            cs = String.Format(cs, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = cs;
            connection.Open();
            
            User updateUser = new User();
            updateUser.fname = fname;
            updateUser.lname = lname;
            updateUser.address = address;
            updateUser.hphone = home;
            updateUser.mphone = mobile;
            updateUser.email = email;
            updateUser.uname = username;
            updateUser.pas_swrd = pass;
            updateUser.cpas_swrd = cpass;
            updateUser.user_img = pic;
            updateUser.user_bio = bio;

            String updateThisUser = "UPDATE user_Table SET firstName = '" + updateUser.fname + "', lastName = '" + updateUser.lname + "', Address = '" + updateUser.address + "', homePhone = '" + updateUser.hphone + "', mobilePhone = '" + updateUser.mphone + "', emailAddress = '" + updateUser.email + "', maritalStatus = '" + updateUser.rstat + "', Gender= '" + updateUser.gender + "', userName ='" + updateUser.uname + "', userpassw = '" + updateUser.pas_swrd + "', confirmuserpassw = '" + updateUser.cpas_swrd + "', imgsrc = '" + updateUser.user_img + "', bio = '" + updateUser.user_bio + "' WHERE ID='" + ID + "'";
            new OleDbCommand(updateThisUser, connection).ExecuteNonQuery();
            connection.Close();
            return updateUser;
        }

        //create new webstorage obj of user after data update
        [WebMethod]
        public static loggedUser upadteloggedUser(String uname, String pass)
        {
            String cs = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
            //String cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            cs = String.Format(cs, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = cs;


            connection.Open();
            loggedUser logUser = new loggedUser();
            int ucheck = 0;
            OleDbCommand user_check = new OleDbCommand("select count(*)from user_Table where userName='" + uname + "'", connection);
            ucheck = int.Parse((user_check.ExecuteScalar().ToString()));
            if (ucheck == 1)
            {
                String pass_check = "select userpassw from user_Table where userName='" + uname + "'";
                OleDbCommand check_password = new OleDbCommand(pass_check, connection);
                string pcheck = check_password.ExecuteScalar().ToString().Replace(" ", "");

                if (pcheck == pass)
                {
                    OleDbDataReader reader = new OleDbCommand("select * from user_Table where userName='" + uname + "'", connection).ExecuteReader();
                    while (reader.Read())
                    {
                        logUser.userID = reader["ID"].ToString();
                        logUser.userName = reader["userName"].ToString();
                        logUser.userImg = reader["imgsrc"].ToString();
                    }
                }
            }
            connection.Close();
            return logUser;
        }

        [WebMethod]
        public static void updateTables(String userID, String user, String img)
        {
            String cs = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
            cs = String.Format(cs, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = cs;
            connection.Open();

            updateUserinTables updatelggduser = new updateUserinTables();
            updatelggduser.userID = userID;
            updatelggduser.username = user;
            updatelggduser.userimg = img;

            String updates = "UPDATE user_Posts SET userName ='" + updatelggduser.username + "', imgsrc = '" + updatelggduser.userimg + "'WHERE userID = '" + userID + "'";
            new OleDbCommand(updates, connection).ExecuteNonQuery();

            String updates2 = "UPDATE  user_Replies SET userName ='" + updatelggduser.username + "', imgsrc = '" + updatelggduser.userimg + "'WHERE userID = '" + userID + "'";
            new OleDbCommand(updates2, connection).ExecuteNonQuery();
            connection.Close();
        }

        [WebMethod]
        public static ArrayList userPosts(String userID)
        {
            String cs = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
            cs = String.Format(cs, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = cs;
            connection.Open();

            ArrayList posts = new ArrayList();
            OleDbDataReader reader = new OleDbCommand("select * from user_Posts where userID ='" + userID + "'", connection).ExecuteReader();
            while (reader.Read())
            {
                user_Post u_post = new user_Post();
                u_post.unm = reader["userName"].ToString();
                u_post.uimg = reader["imgsrc"].ToString();
                u_post.utitle = reader["postTitle"].ToString();
                u_post.udate = reader["postDate"].ToString();
                u_post.utime = reader["postTime"].ToString();
                u_post.upost = reader["postText"].ToString();
                u_post.postid = reader["postID"].ToString();
                posts.Add(u_post);
            }
            connection.Close();
            return posts;
        }


        [WebMethod]
        public static ArrayList userPostsReplies(String postID)
        {
            String cs = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
            cs = String.Format(cs, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = cs;
            connection.Open();
            ArrayList replies = new ArrayList();
            OleDbCommand user_check = new OleDbCommand("SELECT count(postID) from user_Replies WHERE postID='" + postID + "'", connection);
            int idCheck = int.Parse((user_check.ExecuteScalar().ToString()));
            if (idCheck != 0)
            {
                OleDbDataReader reader = new OleDbCommand("SELECT * from user_Replies WHERE postID ='" + postID + "'", connection).ExecuteReader();
                while (reader.Read())
                {
                    //uchecks = reader["userReply"].ToString();
                    user_Reply u_reply = new user_Reply();
                    u_reply.postID = reader["postID"].ToString();
                    u_reply.username = reader["userName"].ToString();
                    u_reply.replyDate = reader["replyDate"].ToString();
                    u_reply.replyTime = reader["replyTime"].ToString();
                    u_reply.userReply = reader["userReply"].ToString();
                    u_reply.imgSrc = reader["imgsrc"].ToString();
                    u_reply.count = idCheck.ToString();
                    replies.Add(u_reply);
                }
            }
            connection.Close();
            return replies;
        }

        [WebMethod]
        public static String userBio(String user){
            String cs = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
            cs = String.Format(cs, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = cs;
            connection.Open();

            String userBio="";
            OleDbCommand user_check = new OleDbCommand("select count(username) from user_table where username='" + user + "'", connection);
            int ucheck = int.Parse((user_check.ExecuteScalar().ToString()));
            if (ucheck == 1)
            {
                OleDbDataReader reader = new OleDbCommand("select * from user_table where username='" + user + "'", connection).ExecuteReader();
                 reader.Read();
                 userBio = reader["bio"].ToString();
            }
            connection.Close();
            return userBio;
        }

        [WebMethod]
        public static void deleteUserPost(String postID)
        {
            String cs = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
            cs = String.Format(cs, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = cs;
            connection.Open();
            String deletefromPosts = "DELETE * FROM user_Posts WHERE postID ='" + postID + "'";
            new OleDbCommand(deletefromPosts, connection).ExecuteNonQuery();

            String deletefromReplies = "DELETE * FROM user_Replies WHERE postID ='" + postID + "'";
            new OleDbCommand(deletefromReplies, connection).ExecuteNonQuery();
            connection.Close();
        }
    }
}