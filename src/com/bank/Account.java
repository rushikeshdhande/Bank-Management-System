package com.bank;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Scanner;

import static com.bank.MysqlCred.con;
import static com.bank.MysqlCred.st;


public class Account {
    private String fullName;
    private String username;
    private String password;
    private String confirmPassword;
    private long contact;
    private String email;
    private double balance;

    Scanner sc = new Scanner(System.in);


    public void homePage(String username, String password){
        for(;;){
            System.out.println("\n*** Home Page ***\n");
            System.out.println("1. Deposit Money");
            System.out.println("2. Withdrawal Money");
            System.out.println("3. Check Balance");
            System.out.println("4. Forget Password");
            System.out.println("5. Bank To Bank");
            System.out.println("6. Logout");
            System.out.print("Enter option : ");
            int opt = sc.nextInt();
            switch(opt){
                case 1 -> depositeMoney(username, password);
                case 2 -> withdrawMoney(username, password);
                case 3 -> checkBalance();
                case 4 -> forgetPassword(username,password);
                case 5 -> bankTransfer(username,password);
                case 6 -> BankDriver.info();
                default -> System.out.println("INVALID OPTION");
            }
        }
    }
    public void createAccount(){
        boolean flag = true;
        while(flag){
            System.out.println("\n Welcome to create account\n");
            System.out.println("1. Continue to create account");
            System.out.println("2. Back to main menu");
            int opt = sc.nextInt();
            switch(opt){
                case 1 -> flag=false;
                case 2 -> BankDriver.info();
                default -> System.out.println("INVALID OPTION");
            }
        }

        System.out.println("\n*** CREATE ACCOUNT MODULE ***\n");
        System.out.print("Enter Full Name : ");
        sc.nextLine();
        fullName = sc.nextLine();
        System.out.print("Enter Username : ");
        username = sc.next();

//        Matching the password
        for(;;){
            System.out.print("Enter Password : ");
            sc.nextLine();
            password = sc.nextLine();
            System.out.print("Enter Confirm Password : ");
            confirmPassword = sc.next();
            if(password.equals(confirmPassword)){
                break;
            }
            System.out.println("\nPassword doest not match try again!!!");
        }
        for(;;){
            System.out.print("Enter Contact : ");
            contact = sc.nextLong();
            if(((contact+"").startsWith("9") || (contact+"").startsWith("8") || (contact+"").startsWith("7") || (contact+"").startsWith("6")) && ((contact+"").length()==10))
                break;
            System.out.println("Enter valid mobile number");
        }
        System.out.print("Enter Email : ");
        email = sc.next();

        if(!email.contains("@gmail.com")){
            email = email+"@gmail.com";
        }

        for(;;){
            System.out.print("Enter Opening Balance : ");
            balance = sc.nextDouble();
            if(balance>0) break;
            System.out.println("Enter greater than 0");
        }

        System.out.println("Thank you");

        System.out.println(st);
        System.out.println(con);

        try{
            String sql = "INSERT INTO accounts(username,full_name,password,email,phone,balance) VALUES('"+username+"','"+fullName+"','"+password+"','"+email+"','"+contact+"',"+balance+")";
            PreparedStatement pt = con.prepareStatement(sql);
            int rowsAffected = pt.executeUpdate();
            String resp = rowsAffected>0 ? "ACCOUNT CREATED SUCCESSFULLY!!" : "ACCOUNT NOT CREATED";
            System.out.println(resp);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }


    }

    public void login()
    {
        boolean flag = true;
        while(flag){
            System.out.println("\n Welcome To Login \n");
            System.out.println("1. Continue to Login");
            System.out.println("2. Back to main menu");
            int opt = sc.nextInt();
            switch(opt){
                case 1 -> flag=false;
                case 2 -> BankDriver.info();
                default -> System.out.println("INVALID OPTION");
            }
        }

        System.out.println("\n*** WELCOME LOGIN MODULE ***\n");
        System.out.print("Enter Username : ");
        String username = sc.next();
        System.out.print("Enter Password : ");
        String password = sc.next();

        try{
            String sql = "SELECT * FROM accounts WHERE username=? AND password=?";

            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1,username);
            ps.setString(2,password);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                System.out.println("LOGIN SUCCESSFUL");
                homePage(username,password);
            }else{
                System.out.println("LOGIN UNSUCCESSFUL");
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
        }

    }


    public void checkBalance(){
        boolean flag = true;
        while(flag){
            System.out.println("\n Welcome To Check Balance \n");
            System.out.println("1. Continue to Check Balance");
            System.out.println("2. Back to main menu");
            int opt = sc.nextInt();
            switch(opt){
                case 1 -> flag=false;
                case 2 -> BankDriver.info();
                default -> System.out.println("INVALID OPTION");
            }
        }

        System.out.println("\n*** Check Balance Module ***\n");
        System.out.print("Enter your Password : ");
        String password = sc.next();

        try{
            String sql = "SELECT balance FROM accounts WHERE password=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1,password);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                System.out.println("Balance : " + rs.getString("balance"));
            }else{
                System.out.println("Password is Incorrect");
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
    }

    public void depositeMoney(String username, String password){
        boolean flag = true;
        while(flag){
            System.out.println("\n Welcome To Deposite Money \n");
            System.out.println("1. Continue to Deposite Money");
            System.out.println("2. Back to main menu");
            int opt = sc.nextInt();
            switch(opt){
                case 1 -> flag=false;
                case 2 -> BankDriver.info();
                default -> System.out.println("INVALID OPTION");
            }
        }

        for(;;){
            System.out.println("\n*** DEPOSIT MONEY MODULE ***\n");
            System.out.print("Enter Amount : ");
            double amount = sc.nextDouble();

            try{
                String fetchBalance = "SELECT balance FROM accounts WHERE username=? AND password=?";
                PreparedStatement ps1 = con.prepareStatement(fetchBalance);
                ps1.setString(1,username);
                ps1.setString(2,password);
                ResultSet rs1 = ps1.executeQuery();
                Double preBalance = 0.0;
                if(rs1.next()){
                    preBalance = rs1.getDouble("balance");
                }

                String sql = "UPDATE accounts SET balance=? WHERE username=? AND password=?";
                PreparedStatement ps = con.prepareStatement(sql);
                ps.setDouble(1,(amount+preBalance));
                ps.setString(2,username);
                ps.setString(3,password);
                int affectedRows = ps.executeUpdate();
                if(affectedRows>0){
                    System.out.println(amount+ " Deposited Successfully");
                    System.out.println();
                    System.out.println("Updated balance : " + (preBalance+amount));
                    return;
                }else{
                    System.out.println("Amount Does not deposited");
                }

            }catch(Exception e){
                System.out.println(e.getMessage());
            }
        }
    }

    public void withdrawMoney(String username, String password){
        boolean flag = true;
        while(flag){
            System.out.println("\n Welcome To Withdraw Money \n");
            System.out.println("1. Continue to Withdraw Money");
            System.out.println("2. Back to main menu");
            int opt = sc.nextInt();
            switch(opt){
                case 1 -> flag=false;
                case 2 -> BankDriver.info();
                default -> System.out.println("INVALID OPTION");
            }
        }

        for(;;){
            System.out.println("\n*** WithDraw MONEY MODULE ***\n");
            System.out.print("Enter Amount : ");
            double amount = sc.nextDouble();

            try{
                String fetchBalance = "SELECT balance FROM accounts WHERE username=? AND password=?";
                PreparedStatement ps1 = con.prepareStatement(fetchBalance);
                ps1.setString(1,username);
                ps1.setString(2,password);
                ResultSet rs1 = ps1.executeQuery();
                Double preBalance = 0.0;
                if(rs1.next()){
                    preBalance = rs1.getDouble("balance");
                }
//                10000 - 4000
                if(amount<preBalance){
                    String sql = "UPDATE accounts SET balance=? WHERE username=? AND password=?";
                    PreparedStatement ps = con.prepareStatement(sql);
                    ps.setDouble(1,(preBalance-amount));
                    ps.setString(2,username);
                    ps.setString(3,password);
                    int affectedRows = ps.executeUpdate();
                    if(affectedRows>0){
                        System.out.println(amount+ " Deposited Successfully");
                        System.out.println();
                        System.out.println("Updated balance : " + (preBalance-amount));
                        return;
                    }else{
                        System.out.println("Amount Does not deposited");
                    }
                }else{
                    System.out.println("INSUFFICIENT BALANCE");
                    System.out.println("Balance : " + preBalance);
                }



            }catch(Exception e){
                System.out.println(e.getMessage());
            }
        }
    }

    public void forgetPassword(String username, String password){
        boolean flag = true;
        while(flag){
            System.out.println("\n Welcome To Forget Password \n");
            System.out.println("1. Continue to Forget Password");
            System.out.println("2. Back to main menu");
            int opt = sc.nextInt();
            switch(opt){
                case 1 -> flag=false;
                case 2 -> BankDriver.info();
                default -> System.out.println("INVALID OPTION");
            }
        }

        System.out.print("Enter New Password : ");
        String newPassword = sc.next();

        try{
            String sql = "UPDATE accounts SET password=? WHERE username=? AND password=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1,newPassword);
            ps.setString(2,username);
            ps.setString(3,password);
            int rowsAffected = ps.executeUpdate();
            if(rowsAffected>0){
                System.out.println("Password Reset Successfully");
            }else{
                System.out.println("Password Reset Unsuccessfully");
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
    }

    public void bankTransfer(String username, String password)
    {
        boolean flag = true;
        while(flag){
            System.out.println("\n Welcome To bank transfer money  \n");
            System.out.println("1. Continue to Withdraw Money");
            System.out.println("2. Back to main menu");
            int opt = sc.nextInt();
            switch(opt){
                case 1 -> flag=false;
                case 2 -> BankDriver.info();
                default -> System.out.println("INVALID OPTION");
            }
        }

        System.out.println("\n*** WELCOME TO BANK TO BANK TRANSFER ***\n");
        System.out.print("Enter Account Number : ");
        long acc = sc.nextLong();
        System.out.print("Enter Amount : ");
        double amount = sc.nextDouble();

        try{
//            find own account

            String fetchAccount = "SELECT * FROM accounts WHERE username=? AND password=?";
            PreparedStatement ps = con.prepareStatement(fetchAccount);
            ps.setString(1,username);
            ps.setString(2,password);
            ResultSet rs = ps.executeQuery();
            long ownAccount = 0;
            double ownBalance = 0.0;
            if(rs.next()){
                ownAccount = rs.getLong("account_no");
                ownBalance = rs.getDouble("balance");
            }

//          Find opponent Account

            String matchAccount = "SELECT * FROM accounts WHERE account_no=?";
            PreparedStatement ps1 = con.prepareStatement(matchAccount);
            ps1.setLong(1,acc);
            ResultSet rs1 = ps1.executeQuery();
            if(rs1.next()){
                String fetchBal = "SELECT balance FROM accounts WHERE account_no=?";
                PreparedStatement ps3 = con.prepareStatement(fetchBal);
                ps3.setLong(1,acc);
                ResultSet rs3 = ps3.executeQuery();
                double prevOpoBal = 0.0;
                if(rs3.next()){
                    prevOpoBal = rs3.getDouble("balance");
                }else {
                    System.out.println("Invalid account number!");
                    return;
                }

//                Deduct Amount from own account

                String sql2 = "UPDATE accounts SET balance=? WHERE account_no=?";
                PreparedStatement ps4 = con.prepareStatement(sql2);
                ps4.setDouble(1,(ownBalance-amount));
                ps4.setLong(2,ownAccount);
                int rowsAffected1 = ps4.executeUpdate();

                if(rowsAffected1>0){
 //                 Transfer amount to bank

                    String sql = "UPDATE accounts SET balance=? WHERE account_no=?";
                    PreparedStatement ps2 = con.prepareStatement(sql);
                    ps2.setDouble(1,(amount+prevOpoBal));
                    ps2.setLong(2,acc);
                    int rowsAffected = ps2.executeUpdate();
                    if(rowsAffected>0){
                        System.out.println("Amount Transfer Successfully");
                    }else{
                        System.out.println("Amount Does Not Transfer");
                    }
                }
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
    }



}
//signup
//login
//check balance
//deposit money
//withdrawal money
//password forget
//bank to bank
//transaction