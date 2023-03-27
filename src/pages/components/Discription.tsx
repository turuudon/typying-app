import React from 'react';
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material';

const Root = styled('div')({
  width: "80%",
  margin: "30px",
});

const Content = styled(Typography)({
  fontSize: 16,
  fontFamily: "Meiryo",
  display: 'inline',
  textAlign: 'center'
});

function Discription() {
  // const classes = useStyles();
  return (
    <Root>
      <Content>
        <b>あなたの英単語タイピング速度はどのくらいでしょう？</b> <br />
        CPM(Characters Per Minute):１分間あたりに入力できる文字数から判定します <br />
        単語の間はスペースを入力してください。<br />
        下の英文のどこかをクリックした後にスタートできます <br />
      </Content>
    </Root>
  )
}

export default Discription;