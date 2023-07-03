"use client"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Pusher from 'pusher-js';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { gsap, TimelineMax } from "gsap";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/effect-fade';
// import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation, EffectFade, Controller } from "swiper";

import useApi from "./api/libs/useApi";
import { megatron } from "./api/endpoint/megatron";

export default function IndexPage() {
  const sliderRef = useRef();
  const motion = useRef();
  const shape1 = useRef();
  const shape2 = useRef();
  const shape3 = useRef();
  const shape4 = useRef();
  const shape5 = useRef();
  const shape6 = useRef();
  const shape7 = useRef();
  const shape8 = useRef();

  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [intervalTimer, setIntervalTimer] = useState(null);

  const interValRef = useRef();

  const megatronAPI = useApi(megatron);

  const loadData = () => {
    megatronAPI.request({ isSelected: 1 })
  }

  useEffect(() => {
    // Pusher.logToConsole = true;
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
    var channel = pusher.subscribe("procold");
    channel.bind("megatron", (payload) => {
      clearInterval(interValRef.current)
      motion.current.style.display = "none";
      setTimeout(() => {
        motion.current.style.display = "block";
        gsap.fromTo(shape1.current, { x: 0 }, { duration: 1, x: 1280, delay: .2 });
        gsap.fromTo(shape2.current, { x: 0 }, { duration: 1, x: 1050, delay: .3 });
        gsap.fromTo(shape3.current, { x: 0 }, { duration: 1, x: 820, delay: .4 });
        gsap.fromTo(shape4.current, { x: 0 }, { duration: 1, x: 590, delay: .5 });
        gsap.fromTo(shape5.current, { x: 0 }, { duration: 1, x: 360, delay: .6 });
        gsap.fromTo(shape6.current, { x: 0 }, { duration: 1, x: 130, delay: .7 });
        gsap.fromTo(shape7.current, { x: 0 }, { duration: 1, x: 0, delay: .8 });
        gsap.fromTo(shape8.current, { x: 0 }, { duration: 1, x: 0, delay: .9 }).then(() => {
          var result = payload.filter(function (o1) {
            return !data.some(function (o2) {
              return o1.id === o2.id;
            });
          }).map(function (o) {
            return o;
          });
          setData(result);
          setIntervalTimer(null)
        });
      }, 2000);

      setTimeout(() => {
        gsap.fromTo(shape1.current, { x: 1280 }, { duration: 1, x: 2000, delay: .2 });
        gsap.fromTo(shape2.current, { x: 1050 }, { duration: 1, x: 2000, delay: .3 });
        gsap.fromTo(shape3.current, { x: 820 }, { duration: 1, x: 2000, delay: .4 });
        gsap.fromTo(shape4.current, { x: 590 }, { duration: 1, x: 2000, delay: .5 });
        gsap.fromTo(shape5.current, { x: 360 }, { duration: 1, x: 2000, delay: .6 });
        gsap.fromTo(shape6.current, { x: 130 }, { duration: 1, x: 2000, delay: .7 });
        gsap.fromTo(shape7.current, { x: 0 }, { duration: 1, x: 2000, delay: .8 });
        gsap.fromTo(shape8.current, { x: 0 }, { duration: 1, x: 2000, delay: .9 });
        // motion.current.style.display = "none";
      }, 5000)
    });
    setLoaded(true)
    return () => {
      pusher.unsubscribe("procold")
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      loadData()
    }
    return () => {
      clearInterval(null)
      setLoaded(false)
    }
  }, [loaded])

  useEffect(() => {
    if (megatronAPI.status) {
      setData(megatronAPI.data);
    }
  }, [megatronAPI.status, megatronAPI.data]);

  useEffect(() => {
    if (data.length !== 0) {
      if (!intervalTimer) {
        interValRef.current = setInterval(() => {
          controlledSwiper()
        }, 5000);
        setIntervalTimer(interValRef.current)
      }
    }

  }, [data, intervalTimer])

  const controlledSwiper = () => {
    const dataLength = data.length - 1;
    if (dataLength >= 0) {
      motion.current.style.display = "block";
      // gsap.defaults({ overwrite: "auto" });
      gsap.fromTo(shape1.current, { x: 0 }, { duration: 1, x: 1280, delay: .2 });
      gsap.fromTo(shape2.current, { x: 0 }, { duration: 1, x: 1050, delay: .3 });
      gsap.fromTo(shape3.current, { x: 0 }, { duration: 1, x: 820, delay: .4 });
      gsap.fromTo(shape4.current, { x: 0 }, { duration: 1, x: 590, delay: .5 });
      gsap.fromTo(shape5.current, { x: 0 }, { duration: 1, x: 360, delay: .6 });
      gsap.fromTo(shape6.current, { x: 0 }, { duration: 1, x: 130, delay: .7 });
      gsap.fromTo(shape7.current, { x: 0 }, { duration: 1, x: 0, delay: .8 });
      gsap.fromTo(shape8.current, { x: 0 }, { duration: 1, x: 0, delay: .9 });
      setTimeout(() => {
        if (sliderRef.current.swiper.activeIndex === dataLength) {
          sliderRef.current.swiper.slideTo(0, 0)
        } else {
          sliderRef.current.swiper.slideNext()
        }

        gsap.fromTo(shape1.current, { x: 1280 }, { duration: 1, x: 2000, delay: .2 });
        gsap.fromTo(shape2.current, { x: 1050 }, { duration: 1, x: 2000, delay: .3 });
        gsap.fromTo(shape3.current, { x: 820 }, { duration: 1, x: 2000, delay: .4 });
        gsap.fromTo(shape4.current, { x: 590 }, { duration: 1, x: 2000, delay: .5 });
        gsap.fromTo(shape5.current, { x: 360 }, { duration: 1, x: 2000, delay: .6 });
        gsap.fromTo(shape6.current, { x: 130 }, { duration: 1, x: 2000, delay: .7 });
        gsap.fromTo(shape7.current, { x: 0 }, { duration: 1, x: 2000, delay: .8 });
        gsap.fromTo(shape8.current, { x: 0 }, { duration: 1, x: 2000, delay: .9 });
        setTimeout(() => {
          motion.current.style.display = "none";
        }, 1800)
      }, 1800);

    }
  }

  return (
    <Box>
      <Box ref={motion} sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "none", zIndex: 10, overflow: "hidden" }}>
        {/* viewBox="490 0 990 490" */}
        {/* points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" */}
        {/* points="240.112,-40 481.861,245.004 240.112,530 8.139,530 250.29,245.004 8.139,-40" fullscreen*/}
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="990 0 1 490">
          <g height="100%" width="100%" fill="#932aad" ref={shape1}>
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g height="100%" width="100%" fill="#932aad" ref={shape2}>
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g height="100%" width="100%" fill="#932aad" ref={shape3}>
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g height="100%" width="100%" fill="#932aad" ref={shape4}>
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g height="100%" width="100%" fill="#932aad" ref={shape5}>
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g height="100%" width="100%" fill="#932aad" ref={shape6}>
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g height="100%" width="100%" fill="#932aad" ref={shape7}>
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g height="100%" width="100%" fill="#932aad" ref={shape8}>
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
        </svg>
      </Box >
      {/* {data.map((element, index) => (
        <Grid container key={index} sx={{ display: index === 0 ? "none" : "flex" }}>
          <Grid item xs={6} md={6} lg={6}>
            <Box sx={{ width: "100%", height: "100%", background: "url('/Frame.png')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "left bottom" }}>
              <Typography variant='h2' sx={{ color: "#fff", p: 3, width: "520px" }}>{element.photo.message.message}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={6} lg={6} alignItems={"end"}>
            <Box>
              <Box sx={{ width: "100%", height: "100vh", background: `url('${element.photo.photoUrl}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}></Box>
            </Box>
          </Grid>
        </Grid>
      ))} */}
      <Swiper
        ref={sliderRef}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: false,
        }}
        navigation={false}
        modules={[EffectFade, Controller]}
        className="mySwiper"
        effect="fade"
      >
        {data.map((element, index) => (
          <SwiperSlide key={index}>
            <Grid container>
              <Grid item xs={6} md={6} lg={6}>
                <Box sx={{ width: "100%", height: "100%", background: "url('/Frame.png')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "left bottom" }}>
                  <Typography variant='h2' sx={{ color: "#fff", p: 3, width: "450px" }}>{element.photo.message.message}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={6} lg={6} alignItems={"end"}>
                <Box>
                  <Box sx={{ width: "100%", height: "100vh", background: `url('${element.photo.photoUrl}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}></Box>
                </Box>
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
