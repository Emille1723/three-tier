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
    public partial class Homepage : System.Web.UI.Page
    {
        //protected void Page_Load(object sender, EventArgs e)
        //{

        //}

        [WebMethod]
        public static ArrayList getAllPosts(string y)
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


        [System.Web.Services.WebMethod]
        public static loggedUser user_Login(string uname, string pass)
        {
            //String som = "";
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

        [System.Web.Services.WebMethod]
        public static String unames_db(String uname)
        {
            String soms = "";
            int result = 0;

            String CS = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
            //String CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            CS = String.Format(CS, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
            OleDbConnection conn = new OleDbConnection();
            conn.ConnectionString = CS;

            OleDbCommand cmd = new OleDbCommand("select count(userName)from [user_Table] where userName='" + uname + "'", conn);
            conn.Open();

            result = int.Parse((cmd.ExecuteScalar().ToString()));
            if (result == 1)
            {
                soms = "false";
            }
            else
            {
                soms = "true";
            }
            conn.Close();
            return soms;
        }

        [WebMethod]
        public static void store_User(string ufirst_name, string ulast_name, string uaddress, string uhphone, string umphone, string uemail, string urstat, string ugender, string user_name, string pass_wrd, string cp)
        {
                //String cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
                String cs = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0}; Persist Security Info=false;";
                cs = String.Format(cs, HttpContext.Current.Server.MapPath("~/PingMain.accdb"));
                OleDbConnection connection;
                connection = new OleDbConnection();
                connection.ConnectionString = cs;
                connection.Open();
                User new_user = new User();
                Guid guid = Guid.NewGuid();
                String id = guid.ToString().Substring(0, 4);

                new_user.id = id;
                new_user.fname = ufirst_name;
                new_user.lname = ulast_name;
                new_user.address = uaddress;
                new_user.hphone = uhphone;
                new_user.mphone=umphone;
                new_user.email = uemail;
                new_user.rstat = urstat;
                new_user.gender = ugender;
                new_user.uname = user_name;
                new_user.pas_swrd = pass_wrd;
                new_user.cpas_swrd = cp;


                String insertQuery = "INSERT INTO [user_Table] (ID, firstName, lastName, Address, homePhone, mobilePhone, emailAddress, maritalStatus, Gender, userName, userpassw, confirmuserpassw) VALUES ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}')";

                String add_newUser = String.Format(insertQuery,
                     new_user.id,
                     new_user.fname,
                     new_user.lname,
                     new_user.address,
                     new_user.hphone,
                     new_user.mphone,
                     new_user.email,
                     new_user.rstat,
                     new_user.gender,
                     new_user.uname,
                     new_user.pas_swrd,
                     new_user.cpas_swrd
                );

                OleDbCommand cmd;
                cmd = new OleDbCommand(insertQuery, connection);
                cmd.CommandText =add_newUser;
                cmd.Connection = connection;
                cmd.ExecuteNonQuery();
                connection.Close();
        }
    }//end class
}//end namespace