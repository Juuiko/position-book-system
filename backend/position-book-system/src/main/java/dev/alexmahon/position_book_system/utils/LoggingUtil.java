package dev.alexmahon.position_book_system.utils;

import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Arrays;
import java.util.Objects;

@Aspect
@Component
public class LoggingUtil {

    @Autowired
    private final KafkaTemplate<String, String> kafkaTemplate;

    public LoggingUtil(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
    public void restController() {}

    @Around("restController()")
    public Object logApiCall(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request =
                ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes()))
                        .getRequest();

        String method = request.getMethod();
        String uri = request.getRequestURI();
        String clientIP = request.getRemoteAddr();
        String controllerMethod = joinPoint.getSignature().toShortString();
        String args = Arrays.toString(joinPoint.getArgs());

        long start = System.currentTimeMillis();
        String logMessage;
        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - start;
            logMessage = String.format("[SUCCESS] %s %s | %s | IP: %s | Args: %s | Duration: %dms",
                    method, uri, controllerMethod, clientIP, args, duration);

            kafkaTemplate.send("api-logs", logMessage);
            return result;
        } catch (Exception e) {
            long duration = System.currentTimeMillis() - start;
            logMessage = String.format("[ERROR] %s %s | %s | IP: %s | Args: %s | Duration: %dms | Error: %s",
                    method, uri, controllerMethod, clientIP, args, duration, e.getMessage());

            kafkaTemplate.send("api-logs", logMessage);
            throw e;
        }
    }

}
