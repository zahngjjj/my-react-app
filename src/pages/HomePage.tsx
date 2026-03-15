import { useAppDispatch, useAppSelector } from '../store/hooks'
import { counterActions } from '../store/slices/counterSlice'

export function HomePage() {
  const dispatch = useAppDispatch()
  const count = useAppSelector((state) => state.counter.value)

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
    </section>
  )
}
