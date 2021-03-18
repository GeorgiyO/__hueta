package _tmp;

import java.io.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Kata {
    public static void main(String[] args) {
        BigDecimal ziga = new BigDecimal(3.0);
        for (int i = 0; i < 16; i++) {
            ziga = ziga.pow(3);
            System.out.println(i + 1);
        }
        try (var file = new BufferedWriter(new FileWriter("akai-akai-akai-akai-akai-amai-amai-amai-amai-amai-amai.txt"))) {
            file.write(ziga.toEngineeringString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
