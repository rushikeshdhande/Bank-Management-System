package com.bank;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class MysqlCred {
    static String username = "root";
    static String password = "rushi";
    static String url = "jdbc:mysql://localhost:3306/bankdb";

    static Connection con;
    static Statement st;

    public void setConnection(){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(url,username,password);
            st = con.createStatement();
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
    }

}
