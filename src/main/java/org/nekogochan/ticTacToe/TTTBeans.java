package org.nekogochan.ticTacToe;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TTTBeans {

    @Bean
    TTTModel model() {
        return new TTTModel();
    }

    @Bean
    TTTSocket socket() {
        return new TTTSocket(model());
    }

}
