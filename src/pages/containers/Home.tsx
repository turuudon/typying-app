import React, { useState, useEffect, useRef } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// import logo from ".././images/typeee-logo.svg";

import SuccessModal from "../components/SuccessModal";
import Discription from "../components/Discription";
import ResetButton from "../components/ResetButton";
import timeFormatting from "../util/time_formatting";
import styled from "@emotion/styled";

// import Dictionary from "../util/dictionary";
// const dictionary = Dictionary;

import Sentense from "../util/sentenses.json";
const sentenses: string[] = Sentense.sentense_dict;

const Logo = styled('img')({
  width: "480px",
});

const InputBox = styled('div')({
  padding: "30px",
  margin: "30px",
});

const GreenFont = styled(Typography)({
  color: "#689f38",
  display: 'inline',
  fontFamily: "Times New Roman",
  fontSize: "50px",
});

const RedFont = styled(Typography)({
  color: "#e0e0e0",
  display: 'inline',
  fontFamily: "Times New Roman",
  fontSize: "50px",
});

const GrayFont = styled(Typography)({
  color: "gray",
  display: 'inline',
  fontFamily: "Times New Roman",
  fontSize: "50px",
});

const BlackFont = styled(Typography)({
  color: "#e0e0e0",
  display: 'inline',
  fontFamily: "Times New Roman",
  fontSize: "50px",
});

const WhiteFont = styled(Typography)({
  color: "white",
  display: 'inline',
  fontFamily: "Times New Roman",
  fontSize: "50px",
});

const Stat = styled(Typography)({
  display: 'inline',
  fontSize: "20px",
  fontFamily: 'Meiryo',
  margin: "0 30",
});


function Home() {
  const [typingString, setTypingString] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMisstype, setIsMisstype] = useState(false);
  const [missCount, setMissCount] = useState(0);
  const [countSentense, setCountSentense] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [timeOfTyping, setTimeOfTyping] = useState(0);
  const [timelimit, setTimelimit] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [audioFile, setAudioFile] = useState("");
  const timer = useRef<NodeJS.Timeout>();
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setLoading(true);
    setCurrentIndex(0);
    // let ts = "";
    const num: number = Math.floor(Math.random() * 100);
    let word: string = sentenses[num-1];
    setCountSentense(c => c + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTypingString(word);
    const filePath: string = "/vocal-file/" + num.toString() + "output.mp3";
    setLoading(false);
    setAudioFile(filePath);
  }, [refresh]);

  const finishFunc = () => {
    clearInterval(timer.current);
    setFinished(true);
    setModalOpen(true);
  };

  const playAudio = () => {
    audio.current?.play();
    console.log("ok");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (finished) return;
    if (!started) {
      setStarted(true);
      setCountSentense(0);
      const startTime = new Date();
      startTime.setMinutes(startTime.getMinutes() + timelimit);
      timer.current = setTimeout(finishFunc, timelimit * 60000)
      timer.current = setInterval(() => {
        setTimeOfTyping(startTime.getTime() - new Date().getTime());
      }, 10);
    }
    if (e.key === " ") playAudio();
    if (typingString[currentIndex+1] === ' ' || typingString[currentIndex+1] === " ") {
      setCurrentIndex(currentIndex + 2);
      return;
    }
    if (e.key === typingString[currentIndex]) {
      setIsMisstype(false);
      setCurrentIndex(currentIndex + 1);
      if (currentIndex + 1 >= typingString.length) {
        // finishFunc();
        setRefresh(Math.random());
      }
    } else {
      setIsMisstype(true);
      setMissCount(missCount + 1);
    }
  };

  const refreshAll: React.MouseEventHandler<HTMLButtonElement> = () => {
    clearInterval(timer.current);
    setModalOpen(false);
    // setCurrentIndex(0);
    setIsMisstype(false);
    setMissCount(0);
    setFinished(false);
    setStarted(false);
    setTimeOfTyping(0);
    setRefresh(Math.random());
  };

  return loading ? (
    <p></p>
  ) : (
    <div text-align="center">
      {/* <Logo src={logo} alt="logo" /> */}
      <Discription />
      <audio ref={audio} src={audioFile}></audio>
      <InputBox
        onKeyDown={(e) => handleKeyPress(e)}
        tabIndex={0}
      >
        <GreenFont>
          {typingString.slice(0, currentIndex)}
        </GreenFont>
        {isMisstype ? (
          <RedFont>
            {typingString[currentIndex]}
          </RedFont>
        ) : (
          <BlackFont>
            {typingString[currentIndex]}
          </BlackFont>
        )}

        <WhiteFont>
          {typingString.slice(currentIndex + 1, typingString.length)}
        </WhiteFont>
      </InputBox>
      <Box display="flex" justifyContent="center">
        <Stat>
          ミスタイプ: {missCount}回
        </Stat>
        <Stat>
          タイム： {timeFormatting(timeOfTyping)}
        </Stat>
      </Box>
      <Box margin="50px">
        <ResetButton refreshAll={refreshAll} />
      </Box>
      <SuccessModal
        result={{
          timelimit,
          missCount,
          charLength: countSentense,
        }}
        modalOpen={modalOpen}
        modalClose={() => setModalOpen(false)}
        refreshAll={refreshAll}
      />
    </div>
  );
}

export default Home;