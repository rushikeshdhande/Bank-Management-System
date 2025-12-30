package com.bank;

import java.util.Scanner;

public class BankDriver {
    static Account account;

    public static void info(){
        Scanner sc = new Scanner(System.in);
        for(;;){
            System.out.println("\n*** Login/SignUp ***\n");
            System.out.println("1. Login");
            System.out.println("2. SignUp");
            System.out.println("3. Exit");
            System.out.print("Enter your option : ");
            int opt = sc.nextInt();
            switch(opt){
                case 1 -> account.login();
                case 2 -> account.createAccount();
                case 3 -> System.exit(0);
                default -> System.out.println("INVALID OPTION");
            }
        }
    }



    public static void main(String[] args) {
        MysqlCred msc = new MysqlCred();
        msc.setConnection();
        account = new Account();
        info();
    }
}
