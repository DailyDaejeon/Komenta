package com.komenta.be.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.komenta.be.service.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtService jwtService;

    public static final Logger logger = LoggerFactory.getLogger(JwtInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.info(request.getParameter("u_email")+ " " +
                request.getParameter("u_nickname")+ " " +
                request.getParameter("u_phone_number"));

        logger.info(request.getMethod() + " : " + request.getServletPath());

        // request의 parameter에서 auth_token으로 넘어온 녀석을 찾아본다.
        // String token = request.getParameter("auth_token");
        String token = request.getHeader("auth-token");
//        String test = response.getHeader("auth-token");
//        System.out.println("test : "+test);
        System.out.println("preHandle : "+token);
        if (token.length() > 0) {
            // 유효한 토큰이면 진행, 그렇지 않으면 예외를 발생시킨다.
            jwtService.checkValid(token);
            logger.info("토큰 사용 가능 : {}", token);
            return true;
        }
        else {
            System.out.println("토큰없습니다.");
//            throw new RuntimeException("인증 토큰이 없습니다.");
            return false;
        }
    }
}