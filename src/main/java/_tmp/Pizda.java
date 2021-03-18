package _tmp;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class Pizda {
    public static void main(String[] args) {
        try {
            InetAddress ia = InetAddress.getLocalHost();
            String str = ia.getHostAddress();
            System.out.println( str);
        } catch (UnknownHostException e) {
            System.out.println(e);
        }
    }
}  