// shadow 
import React, { useState, useEffect, useCallback } from "react";
import * as styles from "./map.module.css";
import { MarkdownText, Button, Heading } from "gatsby-theme-landing-page";

export default function Map({ heading, secondaryHeading, content }) {
  const [serverStatus, setServerStatus] = useState('');
  const [online, setOnline] = useState(false);
  const [serverPlayers, setServerPlayers] = useState(0);
  const [serverPlayersMax, setServerPlayersMax] = useState(0);
  const [lastChecked, setLastChecked] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchServerStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://mcapi.us/server/status?ip=152.70.247.28');
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      const t = new Date(Number(data.last_updated)*1000)
      console.log(data.last_updated)

      setServerStatus(data.status);
      setOnline(data.online);
      setServerPlayers(data.players.now);
      setServerPlayersMax(data.players.max);
      setLastChecked(t.toLocaleString())
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    fetchServerStatus();
  }, [fetchServerStatus]);

  return (
    <>
      <section className={styles.root}>
        <Heading center>{heading}</Heading>
        <Heading secondary center>
          {secondaryHeading}
        </Heading>
        <div>
          {content.map((c) => (
            <Content key={c.id} {...c} />
          ))}
        </div>
      </section>
      <section className={styles.root}>
        <Heading center>라이브 서버 상황</Heading>
        {isLoading ? 
          <Heading secondary center>
            로딩중
          </Heading>
          : error || serverStatus !== 'success' ?
          <>
            <Heading secondary center>
              서버와의 통신에서 에러가 발생했습니다.
            </Heading> 
            <div className={styles.buttons}>
              <Button onClick={fetchServerStatus} href={'nolink'} text = {'서버 재확인'} />
            </div>
          </> 
          : online ? 
            <>
              <Heading secondary center>
                서버 오픈
              </Heading> {console.log(lastChecked)}
              <Heading secondary center>
                현재 인원 수: {serverPlayers} / {serverPlayersMax} 
              </Heading>
              <Heading secondary center>
                
                Last Updated: {lastChecked}
              </Heading>
              <div className={styles.buttons}>
                <Button href={'http://152.70.247.28:8123/'} text = {'Live Map'} />
                <Button onClick={fetchServerStatus} href={'nolink'} text = {'서버 재확인'} />
              </div>
            </>
         : 
         <>
          <Heading secondary center>
            서버가 종료되었습니다.
          </Heading>
          <div className={styles.buttons}>
            <Button onClick={fetchServerStatus} href={'nolink'}  text = {'서버 재확인'} />
          </div>
         </>

        }
      </section>
      <section className={styles.root}>
        <Heading center>Stats</Heading>
        <Heading secondary center>
            준비중
        </Heading>
      </section>
    </>

  );
}

function Content({ primaryText, links = [] }) {
  return (
    <div className={styles.content}>
      <div className={styles.buttons}>
        {links && links.map((link) => <Button key={link.id} {...link} />)}
      </div>
      <MarkdownText {...primaryText} />
    </div>
  );
}