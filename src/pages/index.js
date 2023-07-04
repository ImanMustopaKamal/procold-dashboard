import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Pusher from "pusher-js";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { gsap } from "gsap";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// import "./styles.css";

// import required modules
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  Controller,
} from "swiper";

import useApi from "./api/libs/useApi";
import { megatron } from "./api/endpoint/megatron";

export default function Home() {
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
  const [random, setRandom] = useState(1);

  const interValRef = useRef();

  const megatronAPI = useApi(megatron);

  const loadData = () => {
    megatronAPI.request({ isSelected: 1 });
  };

  useEffect(() => {
    // Pusher.logToConsole = true;
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
    var channel = pusher.subscribe("procold");
    channel.bind("megatron", (payload) => {
      clearInterval(interValRef.current);
      motion.current.style.display = "none";
      setTimeout(() => {
        motion.current.style.display = "block";
        gsap.fromTo(
          shape1.current,
          { x: -10 },
          { duration: 1, x: 1300, delay: 0.2 }
        );
        gsap.fromTo(
          shape2.current,
          { x: -10 },
          { duration: 1, x: 1070, delay: 0.3 }
        );
        gsap.fromTo(
          shape3.current,
          { x: -10 },
          { duration: 1, x: 840, delay: 0.4 }
        );
        gsap.fromTo(
          shape4.current,
          { x: -10 },
          { duration: 1, x: 610, delay: 0.5 }
        );
        gsap.fromTo(
          shape5.current,
          { x: -10 },
          { duration: 1, x: 380, delay: 0.6 }
        );
        gsap.fromTo(
          shape6.current,
          { x: -10 },
          { duration: 1, x: 150, delay: 0.7 }
        );
        gsap.fromTo(
          shape7.current,
          { x: -10 },
          { duration: 1, x: 0, delay: 0.8 }
        );
        gsap
          .fromTo(shape8.current, { x: -10 }, { duration: 1, x: 0, delay: 0.9 })
          .then(() => {
            var result = payload
              .filter(function (o1) {
                return !data.some(function (o2) {
                  return o1.id === o2.id;
                });
              })
              .map(function (o) {
                return o;
              });
            setData(result);
            setIntervalTimer(null);
          });
      }, 2000);

      setTimeout(() => {
        gsap.fromTo(
          shape1.current,
          { x: 1300 },
          { duration: 1, x: 2000, delay: 0.2 }
        );
        gsap.fromTo(
          shape2.current,
          { x: 1070 },
          { duration: 1, x: 2000, delay: 0.3 }
        );
        gsap.fromTo(
          shape3.current,
          { x: 840 },
          { duration: 1, x: 2000, delay: 0.4 }
        );
        gsap.fromTo(
          shape4.current,
          { x: 610 },
          { duration: 1, x: 2000, delay: 0.5 }
        );
        gsap.fromTo(
          shape5.current,
          { x: 380 },
          { duration: 1, x: 2000, delay: 0.6 }
        );
        gsap.fromTo(
          shape6.current,
          { x: 150 },
          { duration: 1, x: 2000, delay: 0.7 }
        );
        gsap.fromTo(
          shape7.current,
          { x: -10 },
          { duration: 1, x: 2000, delay: 0.8 }
        );
        gsap.fromTo(
          shape8.current,
          { x: -10 },
          { duration: 1, x: 2000, delay: 0.9 }
        );
        // motion.current.style.display = "none";
      }, 5000);
    });
    setLoaded(true);
    return () => {
      pusher.unsubscribe("procold");
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      loadData();
    }
    return () => {
      clearInterval(null);
      setLoaded(false);
    };
  }, [loaded]);

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
        }, 5500);
        setIntervalTimer(interValRef.current);
      }
    }
  }, [data, intervalTimer]);

  const controlledSwiper = () => {
    const dataLength = data.length - 1;
    if (dataLength >= 0) {
      motion.current.style.display = "block";
      gsap.defaults({ overwrite: "auto" });
      gsap.fromTo(
        shape1.current,
        { x: -10 },
        { duration: 1, x: 1300, delay: 0.2 }
      );
      gsap.fromTo(
        shape2.current,
        { x: -10 },
        { duration: 1, x: 1070, delay: 0.3 }
      );
      gsap.fromTo(
        shape3.current,
        { x: -10 },
        { duration: 1, x: 840, delay: 0.4 }
      );
      gsap.fromTo(
        shape4.current,
        { x: -10 },
        { duration: 1, x: 610, delay: 0.5 }
      );
      gsap.fromTo(
        shape5.current,
        { x: -10 },
        { duration: 1, x: 380, delay: 0.6 }
      );
      gsap.fromTo(
        shape6.current,
        { x: -10 },
        { duration: 1, x: 150, delay: 0.7 }
      );
      gsap.fromTo(
        shape7.current,
        { x: -10 },
        { duration: 1, x: 0, delay: 0.8 }
      );
      gsap
        .fromTo(shape8.current, { x: -10 }, { duration: 1, x: 0, delay: 0.9 })
        .then(() => {
          const num = Math.floor(Math.random() * 6) + 1;
          setRandom(num);
          if (sliderRef.current.swiper.activeIndex === dataLength) {
            sliderRef.current.swiper.slideTo(0, 0);
          } else {
            sliderRef.current.swiper.slideNext();
          }
        });
      setTimeout(() => {
        gsap.fromTo(
          shape1.current,
          { x: 1300 },
          { duration: 1, x: 2000, delay: 0.2 }
        );
        gsap.fromTo(
          shape2.current,
          { x: 1070 },
          { duration: 1, x: 2000, delay: 0.3 }
        );
        gsap.fromTo(
          shape3.current,
          { x: 840 },
          { duration: 1, x: 2000, delay: 0.4 }
        );
        gsap.fromTo(
          shape4.current,
          { x: 610 },
          { duration: 1, x: 2000, delay: 0.5 }
        );
        gsap.fromTo(
          shape5.current,
          { x: 380 },
          { duration: 1, x: 2000, delay: 0.6 }
        );
        gsap.fromTo(
          shape6.current,
          { x: 150 },
          { duration: 1, x: 2000, delay: 0.7 }
        );
        gsap.fromTo(
          shape7.current,
          { x: -10 },
          { duration: 1, x: 2000, delay: 0.8 }
        );
        gsap.fromTo(
          shape8.current,
          { x: -10 },
          { duration: 1, x: 2000, delay: 0.9 }
        );
        setTimeout(() => {
          // motion.current.style.display = "none";
        }, 2000);
      }, 2000);
    }
  };

  return (
    <Box>
      <Box
        ref={motion}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "none",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        {/* viewBox="490 0 990 490" */}
        {/* points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" */}
        {/* points="240.112,-40 481.861,245.004 240.112,530 8.139,530 250.29,245.004 8.139,-40" fullscreen*/}
        <svg
          height="100%"
          width="100%"
          viewBox="990 0 1 490"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            height="100%"
            width="100%"
            fill="url(#paint0_linear_1_36)"
            ref={shape1}
          >
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g
            height="100%"
            width="100%"
            fill="url(#paint0_linear_1_40)"
            ref={shape2}
          >
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g
            height="100%"
            width="100%"
            fill="url(#paint0_linear_1_36)"
            ref={shape3}
          >
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g
            height="100%"
            width="100%"
            fill="url(#paint0_linear_1_40)"
            ref={shape4}
          >
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g
            height="100%"
            width="100%"
            fill="url(#paint0_linear_1_36)"
            ref={shape5}
          >
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g
            height="100%"
            width="100%"
            fill="url(#paint0_linear_1_40)"
            ref={shape6}
          >
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g
            height="100%"
            width="100%"
            fill="url(#paint0_linear_1_36)"
            ref={shape7}
          >
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <g
            height="100%"
            width="100%"
            fill="url(#paint0_linear_1_40)"
            ref={shape8}
          >
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_1_36"
              x1="10"
              y1="0"
              x2="379.5"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#CB19B2" />
              <stop offset="1" stopColor="#323A7B" />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient
              id="paint0_linear_1_40"
              x1="2"
              y1="0"
              x2="375.5"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#323A7B" />
              <stop offset="1" stopColor="#CB19B2" />
            </linearGradient>
          </defs>
        </svg>
      </Box>

      <Swiper
        ref={sliderRef}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: false,
        }}
        navigation={false}
      >
        {data.map((element, index) => (
          <SwiperSlide key={index}>
            <Grid container>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100vh",
                    background: `url('/gif/procold${random}.gif')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "left bottom",
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{ color: "#fff", p: 3, width: "450px" }}
                  >
                    {element.photo.message.message}
                  </Typography>
                </Box>
              </Grid>
              {/* <Grid item xs={6} md={6} lg={6} xl={6}> */}
              <Box
                    sx={{
                      width: "55%",
                      height: "100vh",
                      background: `url('${element.photo.photoUrl}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "absolute",
                      right: 0,
                      top: 0
                    }}
                  ></Box>
              {/* </Grid> */}
              {/* <Grid container>
                <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}> */}
                  {/* <Box
                    sx={{
                      width: "40%",
                      height: "100vh",
                      background: `url('${element.photo.photoUrl}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "absolute",
                      right: 0,
                      top: 0
                    }}
                  ></Box> */}
                {/* </Grid>
              </Grid> */}
              {/* <Grid item xs={6} md={6} lg={6} xl={6} alignItems={"end"}>
                <Box>
                </Box>
              </Grid> */}
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
