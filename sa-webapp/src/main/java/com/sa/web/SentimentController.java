package com.sa.web;

import javax.ws.rs.InternalServerErrorException;

import com.sa.web.dto.SentenceDto;
import com.sa.web.dto.SentimentDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "*")
@RestController
public class SentimentController {

    @Value("${sa.logic.api.url}")
    private String saLogicApiUrl;

    private boolean destroyed = false;

    @PostMapping("/sentiment")
    public SentimentDto sentimentAnalysis(@RequestBody SentenceDto sentenceDto) {
        if (destroyed)
            throw new InternalServerErrorException("Failure");
        
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.postForEntity(saLogicApiUrl + "/analyse/sentiment",
                sentenceDto, SentimentDto.class)
                .getBody();
    }

    @GetMapping("/health")
    public String testHealth() {
        if (destroyed)
            throw new InternalServerErrorException("Failure");
        
        return "SA-Web-App is healthy";
    }

    @GetMapping("/ready")
    public String testReadiness() {
        if (destroyed)
            throw new InternalServerErrorException("Failure");
        
        return "SA-Web-App is ready to recieve requests";
    }

    @GetMapping("/destroy")
    public String destroy() {
        destroyed = true;
        return "SA-Web-App is destroyed";
    }

    @GetMapping("/delay/{seconds}")
    public String delay(@PathVariable(name = "seconds") int seconds) throws InterruptedException {  
        Thread.sleep(seconds*1000);
  
        return "Slept for " + seconds + " seconds.";
    }
}
