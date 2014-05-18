package com.trendocean.controller;

import com.trendocean.TrendoceanResponse;
import org.springframework.web.bind.annotation.*;

public interface IUserController {

    @RequestMapping(value = "user/helloTrendocean")
    public @ResponseBody
    TrendoceanResponse helloTrendocean(@RequestParam(value = "name", required = false, defaultValue = "World") String name) throws Exception;


    @RequestMapping(value = "user/{username}", method= RequestMethod.GET)
    public @ResponseBody
    TrendoceanResponse getUser(@PathVariable("username") String username) throws Exception;

    @RequestMapping(value = "user/getTrend", method= RequestMethod.GET)
    public @ResponseBody
    TrendoceanResponse getTrend(@RequestParam String username) throws Exception;


    @RequestMapping(value = "user/follow", method= RequestMethod.GET)
    public @ResponseBody
    TrendoceanResponse followOtherUser(@RequestParam String otherUsername) throws Exception;


    @RequestMapping(value = "user/listAsked", method= RequestMethod.GET)
    public @ResponseBody
    TrendoceanResponse listAsked(@RequestParam String username) throws Exception;

    @RequestMapping(value = "user/listAnswered", method= RequestMethod.GET)
    public @ResponseBody
    TrendoceanResponse listAnswered(@RequestParam String username) throws Exception;

    @RequestMapping(value = "user/listFaved", method= RequestMethod.GET)
    public @ResponseBody
    TrendoceanResponse listFaved(@RequestParam String username) throws Exception;

    @RequestMapping(value = "user/listPublicMsg", method= RequestMethod.GET)
    public @ResponseBody
    TrendoceanResponse listPublicMsg(@RequestParam String username) throws Exception;


}
