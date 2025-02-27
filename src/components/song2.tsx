import { useState, useRef, useEffect } from 'react';

interface Acc {
  time: number;
  text: string;
}
// 示例歌词数据（LRC格式）
const sampleLyrics = `
[00:00.00] 作曲 : Jay Chou
[00:01.00] 编曲 : 钟兴民
[00:02.00] 制作人 : 周杰伦
[00:03.00] 
[00:18.00] 窗外的麻雀 在电线杆上多嘴
[00:25.00] 你说这一句 很有夏天的感觉
[00:32.00] 手中的铅笔 在纸上来来回回
[00:39.00] 我用几行字形容你是我的谁
`;

// 解析歌词函数
const parseLyrics = (lyrics) => {
  const lines = lyrics.split('\n');
  const pattern = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/;
  
  return lines.reduce((acc:Acc[], line) => {
    const match = line.match(pattern);
    if (match) {
      const min = parseInt(match[1]);
      const sec = parseInt(match[2]);
      const ms = parseInt(match[3]);
      const text = match[4].trim();
      
      acc.push({
        time: min * 60 + sec + ms / 100,
        text: text || '♪' // 空歌词显示音符符号
      });
    }
    return acc;
  }, []);
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lyrics, setLyrics] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  
  const audioRef = useRef<HTMLInputElement>(null);
  const lyricsContainerRef = useRef(null);

  // 初始化歌词
  useEffect(() => {
    setLyrics(parseLyrics(sampleLyrics));
  }, []);

  // 更新播放时间
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    
    // 查找当前歌词行
    const currentIndex = lyrics.findIndex((line, index) => {
      const nextLine = lyrics[index + 1];
      return currentTime >= line.time && 
            (!nextLine || currentTime < nextLine.time);
    });
    
    if (currentIndex !== -1 && currentIndex !== currentLine) {
      setCurrentLine(currentIndex);
    }
  };

  // 歌词滚动效果
  useEffect(() => {
    const activeLine = lyricsContainerRef.current?.children[currentLine];
    if (activeLine) {
      activeLine.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentLine]);

  // 播放/暂停控制
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 进度条控制
  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  return (
    <div className="music-player">
      {/* 音频元素 */}
      <audio
        ref={audioRef}
        src="/path/to/your-audio-file.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
      />
      
      {/* 封面和基本信息 */}
      <div className="cover">
        <img src="/path-to-cover-image.jpg" alt="专辑封面" />
      </div>
      
      {/* 播放控制 */}
      <div className="controls">
        <button onClick={togglePlay}>
          {isPlaying ? '⏸ 暂停' : '▶ 播放'}
        </button>
        
        {/* 进度条 */}
        <div className="progress-bar" onClick={handleProgressClick}>
          <div 
            className="progress" 
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      </div>
      
      {/* 歌词区域 */}
      <div className="lyrics-container" ref={lyricsContainerRef}>
        {lyrics.map((line, index) => (
          <div
            key={index}
            className={`lyric-line ${index === currentLine ? 'active' : ''}`}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;

// 样式部分
const styles = `
.music-player {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 12px;
}

.cover img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 20px;
  display: block;
}

.controls {
  text-align: center;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

.progress-bar {
  height: 4px;
  background: #ddd;
  border-radius: 2px;
  cursor: pointer;
}

.progress {
  height: 100%;
  background: #e74c3c;
  transition: width 0.1s linear;
}

.lyrics-container {
  height: 200px;
  overflow-y: auto;
  padding: 10px;
  background: white;
  border-radius: 8px;
}

.lyric-line {
  padding: 8px 0;
  color: #666;
  text-align: center;
  transition: all 0.3s ease;
}

.lyric-line.active {
  color: #e74c3c;
  font-size: 18px;
  font-weight: bold;
}
`;

// 在项目中可以通过CSS模块等方式引入样式
document.head.appendChild(document.createElement('style')).textContent = styles;