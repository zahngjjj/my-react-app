import { useAppDispatch, useAppSelector } from '../store/hooks'
import { counterActions } from '../store/slices/counterSlice'
import { useState } from 'react'

type ChildProps = {
  parentText: string
  onSendToParent: (text: string) => void
}

function Child({ parentText, onSendToParent }: ChildProps) {
  const [childInput, setChildInput] = useState('')

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 14,
        background: 'var(--social-bg)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontFamily: 'var(--mono)', color: 'var(--text-h)' }}>
          父传子：{parentText}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            value={childInput}
            onChange={(e) => setChildInput(e.target.value)}
            placeholder="子组件输入后发给父组件"
            style={{
              padding: '8px 10px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--text-h)',
              minWidth: 220,
            }}
          />
          <button
            className="counter"
            onClick={() => {
              const next = childInput.trim()
              if (!next) return
              onSendToParent(next)
              setChildInput('')
            }}
          >
            子传父
          </button>
        </div>
      </div>
    </div>
  )
}

export function HomePage() {
  const dispatch = useAppDispatch()
  const count = useAppSelector((state) => state.counter.value)
  const [parentText, setParentText] = useState('你好，我是父组件传下来的值')
  const [receivedFromChild, setReceivedFromChild] = useState<string | null>(null)

  return (
    <section className="page">
      <h1>首页</h1>
      <p>这是一个带路由与布局的基础骨架，方便扩展企业模块。</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
        <button className="counter" onClick={() => dispatch(counterActions.decrement())}>
          -
        </button>
        <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-h)' }}>
          全局计数：{count}
        </span>
        <button className="counter" onClick={() => dispatch(counterActions.increment())}>
          +
        </button>
        <button className="counter" onClick={() => dispatch(counterActions.reset())}>
          Reset
        </button>
      </div>

      <section style={{ marginTop: 28 }}>
        <h2>组件传值 Demo</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-h)' }}>
              父组件当前值：{parentText}
            </span>
            <button
              className="counter"
              onClick={() => setParentText(`父组件更新时间：${new Date().toLocaleTimeString()}`)}
            >
              更新父值
            </button>
          </div>

          <Child
            parentText={parentText}
            onSendToParent={(text) => setReceivedFromChild(text)}
          />

          <div style={{ fontFamily: 'var(--mono)', color: 'var(--text-h)' }}>
            子传父结果：{receivedFromChild ?? '（暂无）'}
          </div>
        </div>
      </section>
    </section>
  )
}
