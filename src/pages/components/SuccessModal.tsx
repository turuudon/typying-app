import React from "react";
import { styled } from '@mui/system';
import Modal from '@mui/material/Modal';
// import { Backdrop } from "@mui/material";
import { Fade } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";

// import logo from ".././images/typeee-logo.svg"
import { timeFormatting, cpmToRank, cpmToDiscription } from "../util/util";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { TwitterShareButton, TwitterIcon } from "react-share"

const CustomModal = styled(Modal)({
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
});

const Paper = styled('div')(({ theme }) => ({
  backgroundColor: "white",
  textAlign: "center",
  border: "2px solid #000",
}));

const Logo = styled('img')({
  width: 150,
  marginBottom: 20,
});

const Content = styled(Typography)({
  fontSize: 20,
  fontFamily: "Miryo",
});

type SuccessModalProps = {
  result: {
    timelimit: number,
    missCount: number,
    charLength: number,
  }
  modalOpen: boolean
  modalClose: () => void
  refreshAll: React.MouseEventHandler<HTMLButtonElement>
}

const SuccessModal = (props: SuccessModalProps) => {
  const result = props.result;
  const cpm: number =
    result.charLength === 0 || result.timelimit === 0
    ? -1
    : ((result.charLength / result.timelimit) * 1000 * 60);

  return (
    <div>
      <CustomModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.modalOpen}
        onClose={props.modalClose}
        closeAfterTransition
      >
        <Fade in={props.modalOpen}>
          <Paper>
            {/* <Logo src={logo} alt="logo" /> */}
            <div id="transition-modal-descrioption">
              <Content>
                文字数: {result.charLength}e
                <br />
                タイム: {timeFormatting(result.timelimit)}
                <br />
                精度:{" "}
                {(
                  (result.charLength / (result.charLength + result.missCount)) * 100).toFixed(1)
                }
                %<br />
                CPM(１分間あたりの入力文字数): {cpm}
                <br />
                CPM(１分間あたりの入力文字数): {cpm}
                <br />
              </Content>
              <Box marginTop="20px">
                <Typography style={{ display: "inline", fontSize: "20px"}}>
                  あなたは・・・
                </Typography>
                <Typography
                  style={{
                    display: "inline",
                    fontSize: "28px",
                    fontWeight: "bold",
                  }}
                >
                  {cpmToRank(cpm)}
                </Typography>
              </Box>
              <Box marginTop="20px" maxWidth="500px">
                <Typography style={{ fontSize: "18px" }}>
                  {" "}
                  {cpmToDiscription(cpm)}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" m={4}>
                <Button
                  onClick={props.refreshAll}
                  color="primary"
                  variant="contained"
                >
                  もう一度
                </Button>
                <Box marginLeft="50px">
                  <Tooltip title="結果を投稿する" placement="top">
                    <div>
                    <TwitterShareButton
                        url="https://shintaro-hirose.github.io/typeee/"
                        title={`typeee!でタイピング速度を計測しました！ ${
                          result.charLength
                        }文字, ${timeFormatting(result.timelimit)}秒, 精度 ${(
                          (result.charLength /
                            (result.charLength + result.missCount)) *
                          100
                        ).toFixed(1)} %, ${cpm} CPM, 評価は "${cpmToRank(
                          cpm
                        )}" でした。`}
                        hashtags={["typeee"]}
                      >
                        <TwitterIcon size={40} round={true} />
                      </TwitterShareButton>
                      </div>
                  </Tooltip>
                </Box>
              </Box>
            </div>
          </Paper>
        </Fade>
      </CustomModal>
    </div>
  );
}

export default SuccessModal;