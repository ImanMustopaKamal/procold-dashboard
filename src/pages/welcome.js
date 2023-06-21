import React, { useEffect, useRef, useState } from "react";
import Pusher from 'pusher-js';

import { Box, Grid, Typography } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/effect-fade';
// import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";

import useApi from "./api/libs/useApi";
import { megatron } from "./api/endpoint/megatron";

export default function IndexPage() {
  const motion = useRef();
  const shape1 = useRef();
  const shape2 = useRef();
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const megatronAPI = useApi(megatron);

  const onBeforeSlideChangeStart = (swiper) => {
    motion.current.style.display = "block";
    swiper.autoplay.pause();
    setTimeout(() => {
      motion.current.style.display = "none";
      swiper.autoplay.resume();
    }, 1000);
  }

  const loadData = () => {
    megatronAPI.request({ isSelected: 1 })
  }

  // useLayoutEffect

  useEffect(() => {
    Pusher.logToConsole = true;
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
    var channel = pusher.subscribe("procold");
    channel.bind("megatron", (data) => {
      setData(data)
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
  }, [loaded])

  useEffect(() => {
    if (megatronAPI.status) {
      setData(megatronAPI.data);
    }
  }, [megatronAPI.status, megatronAPI.data]);

  return (
    <Box>
      <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" preserveAspectRatio="none" viewBox="0 0 490 490">
        <g fill="#61DAFB">
          <polygon ref={shape1} points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
        </g>
        <g fill="#000">
          <polygon ref={shape2} points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" />
        </g>
      </svg>
      {/* <Box ref={motion} sx={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", background: "#000", display: "none", zIndex: 10 }}></Box>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        navigation={false}
        modules={[Autoplay, EffectFade]}
        className="mySwiper"
        effect="fade"
        // onSlideChange={(swiper) => console.log('slide change: ', swiper)}
        // onSlideChangeTransitionEnd={() => console.log("slideChangeTransitionEnd")}
        // onSlideChangeTransitionStart={() => console.log("slideChangeTransitionStart")}
        // onSwiper={(swiper) => console.log("swiper: ", swiper)}
        // onBeforeTransitionStart={(swiper, speed, internal) => console.log("onBeforeTransitionStart")}
        onBeforeSlideChangeStart={onBeforeSlideChangeStart}
      >
        {data.map((element, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ width: "100vw", height: "100vh", background: "url('/FrameVideoTron.png')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "bottom" }}>
              <Grid container>
                <Grid item xs={4} md={4} lg={4}>
                  <Typography variant='h2' sx={{ color: "#fff", p: 3 }}>{element.photo.message.message}</Typography>
                </Grid>
                <Grid item xs={1} md={1} lg={1}></Grid>
                <Grid item xs={7} md={7} lg={7}>
                  <Box sx={{ ml: "28px" }}>
                    <Box sx={{ width: "100%", height: "100vh", background: `url('${element.photo.photoUrl}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </Box >
  )
}