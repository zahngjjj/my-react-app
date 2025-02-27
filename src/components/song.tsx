import { useState, useRef, useEffect } from 'react';
import "./song.css"

// 预置歌曲和歌词数据
const DEMO_SONG = {
  // url: '/demo-song.mp3', // 将你的mp3文件放在public目录
  url: 'http://music.163.com/song/media/outer/url?id=1908673805.mp3', // 将你的mp3文件放在public目录

  
  lyrics: [
    { time: 0, text: '♪ 音乐正在加载...' },
    { time: 5, text: '这是第一句歌词' },
    { time: 10, text: '第二句歌词开始' },
    { time: 15, text: '副歌部分歌词' },
    { time: 20, text: '最歌词' },
    { time: 22, text: '一句歌词' },
    { time: 24, text: '最后一' },
    { time: 26, text: '最歌词' },
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
    <div className="player-container">
      <h1>音乐播放器</h1>
      
      <div className="player-controls">
        <audio
          ref={audioRef}
          src={DEMO_SONG.url}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        />
        
        <button onClick={togglePlay}>
          {isPlaying ? '⏸ 暂停' : '▶ 播放'}
        </button>
        
        <div className="time-display">
          {Math.floor(currentTime)}s / {DEMO_SONG.lyrics[DEMO_SONG.lyrics.length - 1]?.time || 0}s
        </div>

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
  );
}

export default MusicPlayer;