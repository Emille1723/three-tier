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
    public partial class userHomepage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static ArrayList allPosts(string emille)
        {
            string c = "Emille";

            String cs = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
            cs = String.Format(cs, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = cs;
            connection.Open();

            ArrayList posts = new ArrayList();
            OleDbDataReader reader = new OleDbCommand("select * from user_Posts", connection).ExecuteReader();
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
        public static ArrayList allReplies(String postID)
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
        public static user_Post addPost(string user, string date, string time, string title, string post)
        {
            String src = "";
            String userID = "";
            String cs = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
            cs = String.Format(cs, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = cs;


            connection.Open();
            OleDbCommand user_check = new OleDbCommand("select count(username) from user_table where username='" + user + "'", connection);
            int ucheck = int.Parse((user_check.ExecuteScalar().ToString()));
            if (ucheck == 1)
            {
                OleDbDataReader reader = new OleDbCommand("select * from user_table where username='" + user + "'", connection).ExecuteReader();
                reader.Read();
                src = reader["imgsrc"].ToString();
                userID = reader["ID"].ToString();
            }
            connection.Close();
            connection.Open();
            Guid guid = Guid.NewGuid();
            String postid = guid.ToString().Substring(0, 4);
            user_Post newpost = new user_Post();
            newpost.unm = user;
            newpost.udate = date;
            newpost.utime = time;
            newpost.utitle = title;
            newpost.upost = post;
            newpost.uimg = src;
            newpost.postid = postid;
            newpost.userid = userID;
            String insert_post = "INSERT INTO [user_Posts] (userName, postTitle, postDate, postTime, postText, imgsrc, postID, userID) VALUES ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}')";
            String add_post = String.Format(insert_post,
                newpost.unm,
                newpost.utitle,
                newpost.udate,
                newpost.utime,
                newpost.upost,
                newpost.uimg,
                newpost.postid,
                newpost.userid
            );
            OleDbCommand cmd;
            cmd = new OleDbCommand(insert_post, connection);
            cmd.CommandText = add_post;
            cmd.Connection = connection;
            cmd.ExecuteNonQuery();
            connection.Close();
            return newpost;
        }//end 

        [WebMethod]
        public static user_Reply addReply(String postID, String username, String rDate, String rTime, String Reply)
        {
            String src = "";
            String userID = "";
            String cs = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
            cs = String.Format(cs, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = cs;
            int counter = 0;
            connection.Open();
            OleDbCommand user_check = new OleDbCommand("select count(username) from user_table where username='" + username + "'", connection);
            int ucheck = int.Parse((user_check.ExecuteScalar().ToString()));
            if (ucheck == 1)
            {
                OleDbDataReader reader2 = new OleDbCommand("select * from user_table where username='" + username + "'", connection).ExecuteReader();
                reader2.Read();
                src = reader2["imgsrc"].ToString();
                userID = reader2["ID"].ToString();
            }
            connection.Close();
            connection.Open();
            user_Reply userReply = new user_Reply();
            userReply.postID = postID;
            userReply.username=username;
            userReply.replyDate = rDate;
            userReply.replyTime = rTime;
            userReply.userReply = Reply;
            userReply.imgSrc = src;
            userReply.userID = userID;
            String insert_reply = "INSERT INTO [user_Replies] (postID, userName, replyDate, replyTime, userReply, imgsrc, userID) VALUES ('{0}','{1}','{2}','{3}','{4}','{5}','{6}')";
            String add_reply = String.Format(insert_reply,
                userReply.postID,
                userReply.username,
                userReply.replyDate,
                userReply.replyTime,
                userReply.userReply,
                userReply.imgSrc,
                userReply.userID
            );
            OleDbCommand cmd;
            cmd = new OleDbCommand(insert_reply, connection);
            cmd.CommandText = add_reply;
            cmd.Connection = connection;
            cmd.ExecuteNonQuery();
            OleDbDataReader reader = new OleDbCommand("select postID from user_Replies where postID='" + postID + "'", connection).ExecuteReader();
            while (reader.Read())
            {
                if (postID == reader["postID"].ToString())
                {
                    counter++;
                }
            }
            userReply.count = counter.ToString();
            //String insert_replyCount = "INSERT into [user_Replies] (replyCount) VALUES('{0}')";
            //String add_replyCount = String.Format(insert_reply, 
            //    userReply.count
            //);
            //OleDbCommand cmd2;
            //cmd2= new OleDbCommand(insert_replyCount, connection);
            //cmd2.CommandText = add_replyCount;
            //cmd2.Connection = connection;
            //cmd2.ExecuteNonQuery();
            connection.Close();
            return userReply;
        }
    }//end
}//end