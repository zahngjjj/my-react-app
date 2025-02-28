import { useState, useRef, useEffect } from 'react';
import "./song.css"

// 预置歌曲和歌词数据
const DEMO_SONG = {
  url: 'https://laoshuishushu.oss-cn-beijing.aliyuncs.com/public/love_ting.mp3', // 将你的mp3文件放在public目录
  // url: 'http://music.163.com/song/media/outer/url?id=1908673805.mp3', // 将你的mp3文件放在public目录

  
  lyrics: [
    { time: 4, text: '从那天起，你走进我生命' },
    { time: 10, text: '像春风轻轻，温暖了曾经' },
    { time: 15, text: '每一个笑容，都印在我心底' },
    { time: 20, text: '刘婷婷，你是我唯一的注定' },
    { time: 24, text: '我们一起走过风雨' },
    { time: 28, text: '手牵着手，从未分离' },
    { time: 32, text: '患难与共的点点滴滴' },
    { time: 36, text: '是岁月最美的痕迹' },
    { time: 40, text: '细水长流的爱' },
    { time: 43, text: '像时光静静流淌' },
    { time: 45, text: '无论未来多远多长' },
    { time: 47, text: '我都会在你身旁' },
    { time: 49, text: '刘婷婷，我的光' },
    { time: 52, text: '你让平凡变得闪亮' },
    { time: 54, text: '这一生有你相伴' },
    { time: 56, text: '是我最大的愿望' },
    { time: 65, text: '回忆像河流，缓缓地流淌' },
    { time: 70, text: '有你的日子，每天都晴朗' },
    { time: 74, text: '你是我疲惫时的港湾' },
    { time: 78, text: '也是我勇敢向前的力量' },
    { time: 83, text: '我们一起走过风雨' },
    { time: 86, text: '手牵着手，从未分离' },
    { time: 91, text: '患难与共的点点滴滴' },
    { time: 95, text: '是岁月最美的痕迹' },
    { time: 100, text: '细水长流的爱' },
    { time: 102, text: '像时光静静流淌' },
    { time: 104, text: '无论未来多远多长' },
    { time: 107, text: '我都会在你身旁' },
    { time: 108, text: '刘婷婷，我的光' },
    { time: 111, text: '你让平凡变得闪亮' },
    { time: 113, text: '这一生有你相伴' },
    { time: 115, text: '是我最大的愿望' },
    { time: 123, text: '就算岁月染白了发' },
    { time: 128, text: '我们依然牵手回家' },
    { time: 130, text: '这份爱像细水长流' },
    { time: 132, text: '永远都不会停下' },
    { time: 135, text: '细水长流的爱' },
    { time: 138, text: '像时光静静流淌' },
    { time: 140, text: '无论未来多远多长' },
    { time: 143, text: '我都会在你身旁' },
    { time: 145, text: '刘婷婷，我的光' },
    { time: 147, text: '你让平凡变得闪亮' },
    { time: 149, text: '这一生有你相伴' },
    { time: 151, text: '是我最大的愿望' },
    { time: 154, text: '刘婷婷，我的爱' },
    { time: 157, text: '细水长流，永不更改' },
    { time: 160, text: '这一生有你' },
    { time: 164, text: '就是最好的未来' },

  ] as Array<{ time: number; text: string }>
};

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricContainerRef = useRef<HTMLDivElement>(null);

  // 播放控制
  const togglePlay = () => {
    if (!audioRef.current) return;
    setIsPlaying(!isPlaying);
     return isPlaying ? audioRef.current.pause() : audioRef.current.play();
  };

  // 自动滚动歌词
  useEffect(() => {
    const container = lyricContainerRef.current;
    if (!container) return;

    const currentLineIndex = DEMO_SONG.lyrics.findIndex(
      (line, index) => 
        currentTime >= line.time && 
        (index === DEMO_SONG.lyrics.length - 1 || 
         currentTime < DEMO_SONG.lyrics[index + 1].time)
    );

    if (currentLineIndex > -1) {
      container.children[currentLineIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentTime]);

  return (
    <>
      <div className="player-container">
      <h3 className='title'>Love that lasts forever</h3>
       <div className="credits">
        <div className='credits-part'><span className='credits-label'>作词:</span><span>老水叔叔</span></div>
        <div className='credits-part'><span className='credits-label'>作曲:</span><span>老水叔叔</span></div>
      </div>
      <div className="player-controls">
        <audio
          ref={audioRef}
          src={DEMO_SONG.url}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        />
        

{/*         
        <div className="time-display">
          {Math.floor(currentTime)}s / { 181}s
        </div> */}

        <div className="lyrics-container" ref={lyricContainerRef}>
          {DEMO_SONG.lyrics.map((line, index) => (
            <div 
              key={index}
              className={`lyric-line ${
                currentTime >= line.time && 
                (index === DEMO_SONG.lyrics.length - 1 || 
                 currentTime < DEMO_SONG.lyrics[index + 1].time)
                  ? 'active' 
                  : ''
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>



      </div>
    </div>

    <div className='play-btn-box'>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? 
            <span className='stop'></span>
            : 
            <span className='start'></span>
            }
          </button>
        </div>
    </>
  );
}

export default MusicPlayer;